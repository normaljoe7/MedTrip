
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocumentUpload from '@/components/DocumentUpload';
import { useAuth } from '@/context/AuthContext';

const Documents = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !loading) {
      navigate('/signin');
    } else {
      setLoading(false);
    }
  }, [user, navigate, loading]);

  if (loading || !user) {
    return null; // Don't render anything while redirecting or loading
  }

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <DocumentUpload />
      </main>
      <Footer />
    </div>
  );
};

export default Documents;
