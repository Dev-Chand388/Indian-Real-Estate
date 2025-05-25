import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Upload, AlertCircle } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import Button from '../components/common/Button';

const AddProperty: React.FC = () => {
  const { addProperty, error } = useProperty();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    features: [''],
    location: {
      address: '',
      city: '',
      state: ''
    }
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPropertyData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setPropertyData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...propertyData.features];
    updatedFeatures[index] = value;
    setPropertyData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const addFeatureField = () => {
    setPropertyData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeatureField = (index: number) => {
    const updatedFeatures = [...propertyData.features];
    updatedFeatures.splice(index, 1);
    setPropertyData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setImages(prev => [...prev, ...newImages]);

    // Create previews
    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setImagesPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagesPreviews];
    
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagesPreviews(newPreviews);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!propertyData.title.trim()) errors.title = 'Title is required';
    if (!propertyData.description.trim()) errors.description = 'Description is required';
    if (!propertyData.price) errors.price = 'Price is required';
    if (!propertyData.type) errors.type = 'Property type is required';
    if (!propertyData.bedrooms) errors.bedrooms = 'Number of bedrooms is required';
    if (!propertyData.bathrooms) errors.bathrooms = 'Number of bathrooms is required';
    if (!propertyData.area) errors.area = 'Area is required';
    if (!propertyData.location.address.trim()) errors['location.address'] = 'Address is required';
    if (!propertyData.location.city.trim()) errors['location.city'] = 'City is required';
    if (!propertyData.location.state.trim()) errors['location.state'] = 'State is required';
    if (images.length === 0) errors.images = 'At least one image is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const formData = new FormData();
        
        // Add property data
        formData.append('title', propertyData.title);
        formData.append('description', propertyData.description);
        formData.append('price', propertyData.price);
        formData.append('type', propertyData.type);
        formData.append('bedrooms', propertyData.bedrooms);
        formData.append('bathrooms', propertyData.bathrooms);
        formData.append('area', propertyData.area);
        
        // Add location data
        formData.append('location[address]', propertyData.location.address);
        formData.append('location[city]', propertyData.location.city);
        formData.append('location[state]', propertyData.location.state);
        
        // Add features (filter out empty ones)
        const nonEmptyFeatures = propertyData.features.filter(feature => feature.trim() !== '');
        nonEmptyFeatures.forEach((feature, index) => {
          formData.append(`features[${index}]`, feature);
        });
        
        // Add images
        images.forEach(image => {
          formData.append('images', image);
        });
        
        await addProperty(formData);
        navigate('/dashboard');
      } catch (err) {
        console.error('Error adding property:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Property</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Property Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={propertyData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., 3 BHK Apartment in Bandra"
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type*
              </label>
              <select
                id="type"
                name="type"
                value={propertyData.type}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.type ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
              {formErrors.type && (
                <p className="mt-1 text-sm text-red-600">{formErrors.type}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={propertyData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="Describe your property in detail..."
              ></textarea>
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <input
                type="text"
                id="location.address"
                name="location.address"
                value={propertyData.location.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors['location.address'] ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="Street address"
              />
              {formErrors['location.address'] && (
                <p className="mt-1 text-sm text-red-600">{formErrors['location.address']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                id="location.city"
                name="location.city"
                value={propertyData.location.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors['location.city'] ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., Mumbai"
              />
              {formErrors['location.city'] && (
                <p className="mt-1 text-sm text-red-600">{formErrors['location.city']}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location.state" className="block text-sm font-medium text-gray-700 mb-1">
                State*
              </label>
              <input
                type="text"
                id="location.state"
                name="location.state"
                value={propertyData.location.state}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors['location.state'] ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., Maharashtra"
              />
              {formErrors['location.state'] && (
                <p className="mt-1 text-sm text-red-600">{formErrors['location.state']}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={propertyData.price}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.price ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., 5000000"
              />
              {formErrors.price && (
                <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms*
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={propertyData.bedrooms}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.bedrooms ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., 3"
              />
              {formErrors.bedrooms && (
                <p className="mt-1 text-sm text-red-600">{formErrors.bedrooms}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms*
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={propertyData.bathrooms}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.bathrooms ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., 2"
              />
              {formErrors.bathrooms && (
                <p className="mt-1 text-sm text-red-600">{formErrors.bathrooms}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq.ft)*
              </label>
              <input
                type="number"
                id="area"
                name="area"
                value={propertyData.area}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  formErrors.area ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-[#B22222] focus:border-[#B22222]`}
                placeholder="e.g., 1200"
              />
              {formErrors.area && (
                <p className="mt-1 text-sm text-red-600">{formErrors.area}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features & Amenities</h2>
          
          {propertyData.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B22222] focus:border-[#B22222]"
                placeholder="e.g., Swimming Pool, Gym, 24/7 Security"
              />
              {propertyData.features.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeFeatureField(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          
          <button 
            type="button"
            onClick={addFeatureField}
            className="flex items-center text-[#B22222] hover:text-[#8B0000] font-medium"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Feature
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Images</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label 
              htmlFor="images"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-600">
                Click to upload images or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG or GIF (Max. 5MB each)
              </p>
            </label>
          </div>
          
          {formErrors.images && (
            <p className="mt-1 text-sm text-red-600">{formErrors.images}</p>
          )}
          
          {imagesPreviews.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Uploaded Images ({imagesPreviews.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagesPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index}`} 
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Adding Property...
              </div>
            ) : (
              'Add Property'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;