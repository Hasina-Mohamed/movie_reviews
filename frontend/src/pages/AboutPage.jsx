//import React from 'react';
import { FaFilm, FaStar, FaUsers, FaGlobe } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Gosaar Movies</h1>
          <p className="text-xl text-textSecondary max-w-3xl mx-auto">
            Your ultimate destination for discovering, reviewing, and discussing the best films from around the world.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-20">
          <div className="bg-primary rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              At Gosaar Movies, we believe that great films have the power to inspire, educate, and transform. Our mission is to create a community where film enthusiasts can discover new movies, share their thoughts, and connect with others who share their passion.
            </p>
            <p className="text-lg">
              We strive to provide a platform that celebrates the diversity of cinema, from blockbuster hits to independent gems, and everything in between. Our goal is to make the world of film accessible to everyone, regardless of their background or experience.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-primary rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaFilm size={40} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Extensive Library</h3>
              <p className="text-textSecondary">
                Access to thousands of movies from all genres, eras, and countries.
              </p>
            </div>
            
            <div className="bg-primary rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaStar size={40} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Reviews</h3>
              <p className="text-textSecondary">
                Share your thoughts and read reviews from other movie enthusiasts.
              </p>
            </div>
            
            <div className="bg-primary rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaUsers size={40} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-textSecondary">
                Connect with like-minded film lovers and discover new perspectives.
              </p>
            </div>
            
            <div className="bg-primary rounded-xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaGlobe size={40} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Cinema</h3>
              <p className="text-textSecondary">
                Explore films from different cultures and expand your horizons.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-primary rounded-xl overflow-hidden">
              <img 
                src="/public/images/team-1.jpg" 
                alt="Team Member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Hasina Goosaar</h3>
                <p className="text-accent mb-3">Founder & CEO</p>
                <p className="text-textSecondary">
                  Film enthusiast with a passion for bringing quality cinema to a wider audience.
                </p>
              </div>
            </div>
            
            <div className="bg-primary rounded-xl overflow-hidden">
              <img 
                src="/public/images/team-2.jpg" 
                alt="Team Member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">John Doe</h3>
                <p className="text-accent mb-3">Lead Developer</p>
                <p className="text-textSecondary">
                  Tech wizard who ensures our platform runs smoothly and securely.
                </p>
              </div>
            </div>
            
            <div className="bg-primary rounded-xl overflow-hidden">
              <img 
                src="/public/images/team-3.jpg" 
                alt="Team Member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Jane Smith</h3>
                <p className="text-accent mb-3">Content Curator</p>
                <p className="text-textSecondary">
                  Film critic with an eye for discovering hidden gems and emerging talent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="bg-primary rounded-xl p-8 md:p-12">
            <p className="text-lg mb-6">
              Gosaar Movies was founded in 2023 with a simple idea: to create a space where movie lovers could come together to celebrate the art of cinema. What started as a small blog has grown into a thriving community with thousands of members from around the world.
            </p>
            <p className="text-lg mb-6">
              Over the years, we have expanded our offerings to include a comprehensive movie database, user reviews, watchlists, and more. We've partnered with film festivals, studios, and independent filmmakers to bring exclusive content to our users.
            </p>
            <p className="text-lg">
              Today, we continue to grow and evolve, always with our core mission in mind: to share our love of movies with the world and to help others discover the films that will move, inspire, and entertain them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
