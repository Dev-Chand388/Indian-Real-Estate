import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

interface PropertyFilters {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

interface PropertyContextType {
  properties: Property[];
  featuredProperties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: (filters?: PropertyFilters) => Promise<void>;
  getProperty: (id: string) => Promise<Property | null>;
  saveProperty: (propertyId: string) => Promise<void>;
  getSavedProperties: () => Promise<Property[]>;
  addProperty: (propertyData: FormData) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filters?: PropertyFilters) => {
    setLoading(true);
    setError(null);
    try {
      let url = 'http://localhost:5000/api/properties';
      if (filters) {
        const queryParams = new URLSearchParams();
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.type) queryParams.append('type', filters.type);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms.toString());
        
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }
      }
      
      const response = await axios.get(url);
      setProperties(response.data);
      
      // Set featured properties (first 6 or with featured flag)
      setFeaturedProperties(response.data.slice(0, 6));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProperty = async (id: string): Promise<Property | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch property details');
      setLoading(false);
      console.error('Error fetching property:', err);
      return null;
    }
  };

  const saveProperty = async (propertyId: string) => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to save properties');
      }
      
      await axios.post(
        `http://localhost:5000/api/users/saved-properties`,
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save property');
      console.error('Error saving property:', err);
      throw err;
    }
  };

  const getSavedProperties = async (): Promise<Property[]> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to view saved properties');
      }
      
      const response = await axios.get(
        `http://localhost:5000/api/users/saved-properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch saved properties');
      setLoading(false);
      console.error('Error fetching saved properties:', err);
      return [];
    }
  };

  const addProperty = async (propertyData: FormData) => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to add a property');
      }
      
      await axios.post(
        `http://localhost:5000/api/properties`,
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add property');
      console.error('Error adding property:', err);
      throw err;
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties,
        loading,
        error,
        fetchProperties,
        getProperty,
        saveProperty,
        getSavedProperties,
        addProperty
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};