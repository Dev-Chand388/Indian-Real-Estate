import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';

const SavedProperties: React.FC = () => {
  const { getSavedProperties, loading } = useProperty();
  const [savedProperties, setSavedProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      const properties = await getSavedProperties();
      setSavedProperties(properties);
    };

    fetchSavedProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Saved Properties</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B22222]"></div>
        </div>
      ) : (
        <>
          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <div key={property._id} className="relative">
                  <PropertyCard property={property} />
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    title="Remove from saved"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No saved properties yet</h3>
              <p className="text-gray-600 mb-6">
                Start exploring and save properties that interest you.
              </p>
              <Link 
                to="/properties" 
                className="px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#8B0000] transition duration-200"
              >
                Browse Properties
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedProperties;