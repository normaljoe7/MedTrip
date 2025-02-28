
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Mail, User, MapPin, Calendar, Phone, Globe, Clock, Save, Edit, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ProfileData {
  full_name: string | null;
  email: string | null;
  age: number | null;
  country: string | null;
  phone: string | null;
  address: string | null;
  gender: string | null;
  blood_type: string | null;
  allergies: string | null;
  medical_conditions: string | null;
}

interface DbProfileData {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  full_name: string | null;
  email: string | null;
  age?: number | null;
  country?: string | null;
  phone?: string | null;
  address?: string | null;
  gender?: string | null;
  blood_type?: string | null;
  allergies?: string | null;
  medical_conditions?: string | null;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editableData, setEditableData] = useState<ProfileData | null>(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        navigate('/signin');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: 'Error fetching profile',
            description: error.message,
            variant: 'destructive',
          });
          return;
        }
        
        // Convert database profile data to ProfileData format
        const dbData = data as DbProfileData;
        const profileDataConverted: ProfileData = {
          full_name: dbData.full_name,
          email: dbData.email,
          age: dbData.age || null,
          country: dbData.country || null,
          phone: dbData.phone || null,
          address: dbData.address || null,
          gender: dbData.gender || null,
          blood_type: dbData.blood_type || null,
          allergies: dbData.allergies || null,
          medical_conditions: dbData.medical_conditions || null
        };
        
        setProfileData(profileDataConverted);
        setEditableData(profileDataConverted);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user, navigate]);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Discard changes
      setEditableData(profileData);
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableData(prev => ({
      ...prev!,
      [name]: value,
    }));
  };
  
  const handleSaveProfile = async () => {
    if (!user || !editableData) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editableData.full_name,
          age: editableData.age,
          country: editableData.country,
          phone: editableData.phone,
          address: editableData.address,
          gender: editableData.gender,
          blood_type: editableData.blood_type,
          allergies: editableData.allergies,
          medical_conditions: editableData.medical_conditions,
        })
        .eq('id', user.id);
        
      if (error) {
        toast({
          title: 'Error updating profile',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      setProfileData(editableData);
      setIsEditing(false);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medictrip-600"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Default values if profile data is incomplete
  const defaultData: ProfileData = {
    full_name: user.user_metadata?.full_name || '',
    email: user.email || '',
    age: null,
    country: null,
    phone: null,
    address: null,
    gender: null,
    blood_type: null,
    allergies: null,
    medical_conditions: null,
  };
  
  // Use profile data if available, otherwise use default data
  const displayData = profileData || defaultData;
  const editData = editableData || defaultData;

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="medictrip-container">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <button
              onClick={handleEditToggle}
              className={`medictrip-button-${isEditing ? 'secondary' : 'primary'} mt-4 sm:mt-0 flex items-center`}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel Editing
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
          
          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-medictrip-100 flex items-center justify-center text-medictrip-600 mb-4">
                    <User className="w-16 h-16" />
                  </div>
                  <h2 className="text-xl font-semibold text-center">{displayData.full_name}</h2>
                  <p className="text-gray-500 text-center">{displayData.email}</p>
                </div>
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{displayData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={editData.phone || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                            placeholder="Your phone number"
                          />
                        ) : (
                          displayData.phone || 'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">
                        {isEditing ? (
                          <input
                            type="number"
                            name="age"
                            value={editData.age || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                            placeholder="Your age"
                          />
                        ) : (
                          displayData.age || 'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">
                        {isEditing ? (
                          <input
                            type="text"
                            name="country"
                            value={editData.country || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                            placeholder="Your country"
                          />
                        ) : (
                          displayData.country || 'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={editData.address || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                            placeholder="Your address"
                            rows={3}
                          />
                        ) : (
                          displayData.address || 'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="full_name"
                        value={editData.full_name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="Your full name"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{displayData.full_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900 font-medium">{displayData.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={editData.gender || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium capitalize">{displayData.gender || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type
                    </label>
                    {isEditing ? (
                      <select
                        name="blood_type"
                        value={editData.blood_type || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium">{displayData.blood_type || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Medical Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allergies
                    </label>
                    {isEditing ? (
                      <textarea
                        name="allergies"
                        value={editData.allergies || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="List any allergies you have"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900">{displayData.allergies || 'None reported'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medical Conditions
                    </label>
                    {isEditing ? (
                      <textarea
                        name="medical_conditions"
                        value={editData.medical_conditions || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="List any medical conditions you have"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900">{displayData.medical_conditions || 'None reported'}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="medictrip-button-primary flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Treatment History (Placeholder) */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Treatment History</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't had any treatments yet.</p>
                <button className="medictrip-button-primary">
                  Find Treatments
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
