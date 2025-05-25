import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, Home as HomeIcon, Building2, ArrowRight } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { featuredProperties, loading } = useProperty();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?location=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularCities = [
    { name: 'Mumbai', image: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg', count: 2345 },
    { name: 'Delhi', image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg', count: 1876 },
    { name: 'Bangalore', image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg', count: 1523 },
    { name: 'Hyderabad', image: 'https://images.pexels.com/photos/10506899/pexels-photo-10506899.jpeg', count: 1245 }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg)',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Find Your Dream Home in India
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Discover the perfect property across top Indian cities with GharDekho
          </p>

          <form 
            onSubmit={handleSearch}
            className="w-full max-w-3xl bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row"
          >
            <div className="flex-grow relative mb-2 md:mb-0 md:mr-2">
              <input
                type="text"
                placeholder="Search by city, locality or landmark..."
                className="w-full pl-10 pr-4 py-3 rounded-md text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button 
              type="submit"
              className="bg-[#B22222] text-white px-6 py-3 rounded-md font-medium hover:bg-[#8B0000] transition duration-200"
            >
              <Search className="h-5 w-5 inline mr-2" />
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link 
              to="/properties?type=Apartment" 
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full backdrop-blur-sm transition duration-200"
            >
              <Building className="h-5 w-5 mr-2" />
              Apartments
            </Link>
            <Link 
              to="/properties?type=House" 
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full backdrop-blur-sm transition duration-200"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Houses
            </Link>
            <Link 
              to="/properties?type=Villa" 
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full backdrop-blur-sm transition duration-200"
            >
              <Building2 className="h-5 w-5 mr-2" />
              Villas
            </Link>
            <Link 
              to="/properties?type=Commercial" 
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full backdrop-blur-sm transition duration-200"
            >
              <Building className="h-5 w-5 mr-2" />
              Commercial
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Properties</h2>
          <Link 
            to="/properties" 
            className="text-[#B22222] hover:text-[#8B0000] flex items-center"
          >
            View All
            <ArrowRight className="h-5 w-5 ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B22222]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.length > 0 ? (
              featuredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">No properties available yet.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Popular Cities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCities.map((city) => (
              <Link 
                key={city.name}
                to={`/properties?location=${encodeURIComponent(city.name)}`}
                className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{city.name}</h3>
                  <p className="text-sm">{city.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose GharDekho</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#B22222] rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Range of Properties</h3>
            <p className="text-gray-600">
              Explore thousands of properties across major Indian cities tailored to your preferences.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#DAA520] rounded-full flex items-center justify-center">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600">
              All our listings are verified to ensure authentic information and hassle-free experience.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#B22222] rounded-full flex items-center justify-center">
              <HomeIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-gray-600">
              Get expert advice on property investment, home loans, and legal assistance.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="primary" size="lg">
            <Link to="/properties">Start Exploring</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "GharDekho made finding my dream home so easy. The detailed listings and neighborhood information helped me make the right decision."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <img 
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 10}.jpg`} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Customer {item}</h4>
                    <p className="text-sm text-gray-500">Mumbai</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#B22222] to-[#8B0000] rounded-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property with GharDekho.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg"
            >
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#B22222]"
            >
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;