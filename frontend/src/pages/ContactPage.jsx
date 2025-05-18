import  { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            Have questions, feedback, or just want to say hello? We would love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-primary rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-textSecondary mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-textSecondary mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-textSecondary mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-textSecondary mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="input-field w-full resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="inline-block h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></span>
                ) : null}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="bg-primary rounded-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-textSecondary">info@gosaarmovies.com</p>
                    <p className="text-textSecondary">support@gosaarmovies.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                    <FaPhone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-textSecondary">+1 (555) 123-4567</p>
                    <p className="text-textSecondary">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent bg-opacity-20 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visit Us</h3>
                    <p className="text-textSecondary">123 Movie Lane</p>
                    <p className="text-textSecondary">Hollywood, CA 90028</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
            <div className="bg-primary rounded-xl p-8">
              <div className="flex space-x-4">
                <a href="#" className="bg-accent bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all">
                  <FaTwitter className="text-accent" size={24} />
                </a>
                <a href="#" className="bg-accent bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all">
                  <FaFacebook className="text-accent" size={24} />
                </a>
                <a href="#" className="bg-accent bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all">
                  <FaInstagram className="text-accent" size={24} />
                </a>
              </div>
              <p className="mt-6 text-textSecondary">
                Stay connected with us on social media for the latest updates, movie recommendations, and behind-the-scenes content.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-primary rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-2">How do I create an account?</h3>
              <p className="text-textSecondary">
                Creating an account is easy! Simply click on the "Login" button in the top right corner, then select "Register" and follow the instructions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Is Gosaar Movies free to use?</h3>
              <p className="text-textSecondary">
                Yes, basic access to Gosaar Movies is completely free. We also offer premium features for subscribers.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How can I submit a movie review?</h3>
              <p className="text-textSecondary">
                Once you're logged in, navigate to any movie page and you'll find a "Write Review" button. Click it to share your thoughts!
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">I found an error in a movie listing. How can I report it?</h3>
              <p className="text-textSecondary">
                We appreciate your help in keeping our database accurate. Please use the contact form above to report any errors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;