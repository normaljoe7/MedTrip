
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Users, Globe, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        {/* Hero Section */}
        <section className="py-12 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="medictrip-badge-primary mb-4">About Us</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connecting Patients with World-Class Medical Care
              </h1>
              <p className="text-lg text-gray-600">
                At MedicTrip, we believe that everyone deserves access to high-quality healthcare,
                regardless of where they live. Our mission is to bridge the gap between patients and
                medical excellence around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  MedicTrip was founded in 2020 by a team of healthcare professionals and travel
                  enthusiasts who recognized the growing demand for medical tourism but were
                  concerned about the challenges patients faced in finding reliable information and
                  services.
                </p>
                <p className="text-gray-600 mb-4">
                  What began as a simple guide to international medical facilities has evolved into
                  a comprehensive platform that connects patients with top-tier healthcare providers
                  worldwide, simplifies the planning process, and ensures a seamless experience from
                  consultation to recovery.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to have helped thousands of patients receive the care they need
                  while experiencing new cultures and destinations. Our network spans 25 countries and
                  includes partnerships with over
                  200 internationally accredited hospitals and clinics.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80"
                  alt="MedicTrip Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="medictrip-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600">
                These core principles guide everything we do and every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Patient-Centered Care",
                  description:
                    "Your health and safety are our top priorities. We only partner with medical facilities that meet the highest standards of care and patient satisfaction.",
                },
                {
                  icon: Globe,
                  title: "Global Excellence",
                  description:
                    "We believe geographical boundaries shouldn't limit access to the best medical treatments and specialists.",
                },
                {
                  icon: Users,
                  title: "Inclusive Healthcare",
                  description:
                    "Everyone deserves access to quality healthcare. We work to make medical travel accessible and affordable to more people.",
                },
                {
                  icon: Award,
                  title: "Transparency",
                  description:
                    "We provide clear, honest information about treatments, facilities, and costs to help you make informed decisions.",
                },
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                Our diverse team of healthcare professionals, travel experts, and customer support
                specialists work together to make your medical journey a success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Chen",
                  role: "Co-Founder & Medical Director",
                  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
                  bio: "Board-certified surgeon with 15+ years of experience in international healthcare.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Co-Founder & CEO",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
                  bio: "Former healthcare consultant with a passion for making quality care accessible globally.",
                },
                {
                  name: "Aisha Patel",
                  role: "Head of Patient Relations",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                  bio: "Dedicated to ensuring every patient's journey is smooth, comfortable, and successful.",
                },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-medictrip-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
