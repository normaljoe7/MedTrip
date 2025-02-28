
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, MessageCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending the form data
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent successfully",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        {/* Hero Section */}
        <section className="py-12 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="medictrip-badge-primary mb-4">Contact Us</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We're Here to Help
              </h1>
              <p className="text-lg text-gray-600">
                Have questions about medical treatments, travel arrangements, or anything else?
                Our team is ready to assist you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-1">For general inquiries:</p>
                      <a href="mailto:info@medictrip.com" className="text-medictrip-600 font-medium">
                        info@medictrip.com
                      </a>
                      <p className="text-gray-600 mt-2 mb-1">For patient support:</p>
                      <a href="mailto:support@medictrip.com" className="text-medictrip-600 font-medium">
                        support@medictrip.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-1">International:</p>
                      <a href="tel:+12345678901" className="text-medictrip-600 font-medium">
                        +1 (234) 567-8901
                      </a>
                      <p className="text-gray-600 mt-2 mb-1">Toll-free (US & Canada):</p>
                      <a href="tel:+18009876543" className="text-medictrip-600 font-medium">
                        1-800-987-6543
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Our Office</h3>
                      <p className="text-gray-600">
                        123 Medical Avenue<br />
                        Suite 456<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Hours of Operation</h3>
                      <p className="text-gray-600 mb-1">
                        Monday - Friday: 9:00 AM - 8:00 PM EST
                      </p>
                      <p className="text-gray-600 mb-1">
                        Saturday: 10:00 AM - 6:00 PM EST
                      </p>
                      <p className="text-gray-600">
                        Sunday: Closed
                      </p>
                      <p className="text-medictrip-600 font-medium mt-2">
                        24/7 Emergency Support Available for Current Patients
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="Treatment inquiry"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-medictrip-500 focus:border-medictrip-500"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="medictrip-button-primary w-full flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                
                <div className="mt-8 rounded-xl bg-medictrip-50 p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Need Immediate Assistance?</h3>
                      <p className="text-gray-600 mb-4">
                        Our live chat is available during business hours. For emergency support outside of business hours, 
                        current patients can use our 24/7 support line.
                      </p>
                      <button className="medictrip-button-secondary text-sm flex items-center">
                        <ArrowRight className="w-4 h-4 mr-1" />
                        Start Live Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="medictrip-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Find Us</h2>
              <p className="text-gray-600">
                Our headquarters is located in the heart of New York City. Feel free to visit us!
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.1583091352!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1630055769994!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
