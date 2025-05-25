import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProperty } from '../../context/PropertyContext';

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    price: number;
    location: {
      city: string;
      state: string;
      address: string;
    };
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string[];
    type: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isAuthenticated } = useAuth();
  const { saveProperty } = useProperty();
  const [isSaved, setIsSaved] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProperty = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to save properties');
      return;
    }
    
    try {
      setIsSaving(true);
      await saveProperty(property._id);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setIsSaving(false);
    }
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

  return (
    <Link to={`/properties/${property._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={property.images[0] || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'} 
            alt={property.title}
            className="w-full h-56 object-cover"
          />
          <button 
            onClick={handleSaveProperty}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isSaved ? 'bg-red-500' : 'bg-white'
            }`}
          >
            <Heart 
              className={`h-5 w-5 ${isSaved ? 'text-white fill-current' : 'text-gray-600'}`} 
            />
          </button>
          <div className="absolute bottom-0 left-0 bg-[#B22222] text-white px-3 py-1 rounded-tr-lg">
            {property.type}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold line-clamp-1">{property.title}</h3>
          
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="text-sm line-clamp-1">
              {property.location.address}, {property.location.city}, {property.location.state}
            </p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="flex items-center text-gray-700">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area} sq.ft</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-xl font-bold text-[#B22222]">{formatPrice(property.price)}</div>
            <button className="text-[#DAA520] hover:text-[#B8860B] font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;