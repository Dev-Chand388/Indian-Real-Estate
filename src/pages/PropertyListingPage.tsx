import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import PropertyFilters from '../components/common/PropertyFilters';

interface FilterValues {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

const PropertyListingPage: React.FC = () => {
  const { properties, loading, fetchProperties } = useProperty();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

  // Get initial filters from URL
  useEffect(() => {
    const initialFilters: FilterValues = {};
    
    const location = searchParams.get('location');
    if (location) initialFilters.location = location;
    
    const type = searchParams.get('type');
    if (type) initialFilters.type = type;
    
    const minPrice = searchParams.get('minPrice');
    if (minPrice) initialFilters.minPrice = parseInt(minPrice);
    
    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) initialFilters.maxPrice = parseInt(maxPrice);
    
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) initialFilters.bedrooms = parseInt(bedrooms);
    
    setActiveFilters(initialFilters);
    fetchProperties(initialFilters);
  }, [searchParams]);

  const handleFilter = (filters: FilterValues) => {
    // Update URL with filter params
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.type) params.set('type', filters.type);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms.toString());
    
    setSearchParams(params);
    setActiveFilters(filters);
    fetchProperties(filters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Property Listings</h1>
      
      <PropertyFilters onFilter={handleFilter} initialValues={activeFilters} />
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B22222]"></div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {properties.length} properties found
              {activeFilters.location ? ` in ${activeFilters.location}` : ''}
              {activeFilters.type ? ` • Type: ${activeFilters.type}` : ''}
              {activeFilters.bedrooms ? ` • ${activeFilters.bedrooms}+ Bedrooms` : ''}
              {activeFilters.minPrice ? ` • Min: ₹${activeFilters.minPrice.toLocaleString()}` : ''}
              {activeFilters.maxPrice ? ` • Max: ₹${activeFilters.maxPrice.toLocaleString()}` : ''}
            </p>
          </div>
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any properties matching your search criteria.
              </p>
              <button 
                onClick={() => handleFilter({})}
                className="text-[#B22222] hover:text-[#8B0000] font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyListingPage;