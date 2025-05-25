import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Bed, Bath, Square, Home, Calendar, Heart, Share, Phone, Mail } from 'lucide-react';
import Button from '../components/common/Button';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    state: string;
    address: string;
  };
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  images: string[];
  postedBy: string;
  createdAt: string;
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProperty, saveProperty } = useProperty();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me with more information.'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (id) {
        const propertyData = await getProperty(id);
        if (propertyData) {
          setProperty(propertyData);
        }
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleSaveProperty = async () => {
    if (!isAuthenticated) {
      alert('Please login to save properties');
      return;
    }
    
    try {
      if (property) {
        await saveProperty(property._id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: 'Check out this property on GharDekho',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to the backend
    console.log('Contact form submitted:', contactForm);
    setFormSubmitted(true);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B22222]"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
        <p className="text-gray-600 mb-6">The property you are looking for does not exist or has been removed.</p>
        <Link to="/properties">
          <Button variant="primary">Browse Other Properties</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-[#B22222]">Home</Link>
        <span className="mx-2">›</span>
        <Link to="/properties" className="hover:text-[#B22222]">Properties</Link>
        <span className="mx-2">›</span>
        <span>{property.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Property Title and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{property.title}</h1>
            <div className="flex space-x-3">
              <button 
                onClick={handleSaveProperty}
                className={`flex items-center px-3 py-1.5 rounded-md ${
                  isSaved ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Heart className={`h-5 w-5 mr-1 ${isSaved && 'fill-current'}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <Share className="h-5 w-5 mr-1" />
                Share
              </button>
            </div>
          </div>

          {/* Property Location */}
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="h-5 w-5 mr-1 text-[#B22222]" />
            <p>{property.location.address}, {property.location.city}, {property.location.state}</p>
          </div>

          {/* Property Images */}
          <div className="mb-8">
            <div className="h-96 overflow-hidden rounded-lg mb-2">
              <img 
                src={property.images[activeImage] || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-20 w-32 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-[#B22222]' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'} 
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4 mb-8">
            <div className="text-center">
              <div className="flex justify-center">
                <Bed className="h-6 w-6 text-[#B22222]" />
              </div>
              <p className="text-gray-600 mt-1">Bedrooms</p>
              <p className="font-semibold text-lg">{property.bedrooms}</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Bath className="h-6 w-6 text-[#B22222]" />
              </div>
              <p className="text-gray-600 mt-1">Bathrooms</p>
              <p className="font-semibold text-lg">{property.bathrooms}</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Square className="h-6 w-6 text-[#B22222]" />
              </div>
              <p className="text-gray-600 mt-1">Area</p>
              <p className="font-semibold text-lg">{property.area} sq.ft</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Home className="h-6 w-6 text-[#B22222]" />
              </div>
              <p className="text-gray-600 mt-1">Type</p>
              <p className="font-semibold text-lg">{property.type}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-[#B22222] rounded-full mr-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posted Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#B22222]" />
            <p className="text-gray-600">
              Posted on {new Date(property.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Right Column - Contact Form and Price */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <div className="text-3xl font-bold text-[#B22222]">{formatPrice(property.price)}</div>
              <p className="text-sm text-gray-600 mt-1">
                {(property.price / property.area).toFixed(2)} per sq.ft
              </p>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {formSubmitted ? (
              <div className="text-center py-4">
                <div className="mb-4 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Inquiry Sent!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your interest. The property owner will contact you soon.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-[#B22222] hover:text-[#8B0000] font-medium"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
                    ></textarea>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    type="submit"
                    fullWidth
                  >
                    Send Inquiry
                  </Button>
                </form>

                <div className="mt-6 flex justify-center space-x-4">
                  <a
                    href={`tel:+911234567890`}
                    className="flex items-center text-[#B22222] hover:text-[#8B0000]"
                  >
                    <Phone className="h-5 w-5 mr-1" />
                    Call
                  </a>
                  <a
                    href={`mailto:contact@ghardekho.com?subject=Inquiry about ${property.title}`}
                    className="flex items-center text-[#B22222] hover:text-[#8B0000]"
                  >
                    <Mail className="h-5 w-5 mr-1" />
                    Email
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;