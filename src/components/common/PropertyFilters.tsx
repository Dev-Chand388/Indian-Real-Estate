import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from './Button';

interface FilterValues {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

interface PropertyFiltersProps {
  onFilter: (filters: FilterValues) => void;
  initialValues?: FilterValues;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilter, initialValues = {} }) => {
  const [filters, setFilters] = useState<FilterValues>(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-[#B22222]"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
          <span className="ml-1">{isOpen ? 'Close' : 'Open'}</span>
        </button>
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`${isOpen || window.innerWidth >= 768 ? 'block' : 'hidden'} md:block`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location || ''}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="type"
              name="type"
              value={filters.type || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price (₹)
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice || ''}
              onChange={handleChange}
              placeholder="Minimum"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price (₹)
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice || ''}
              onChange={handleChange}
              placeholder="Maximum"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
            />
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            type="button"
          >
            Reset
          </Button>
          <Button 
            variant="primary" 
            type="submit"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilters;