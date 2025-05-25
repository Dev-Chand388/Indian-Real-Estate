import express from 'express';
import { properties } from '../mockData.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   GET api/properties
// @desc    Get all properties with optional filters
// @access  Public
router.get('/', (req, res) => {
  try {
    let filteredProperties = [...properties];
    
    // Apply filters if any
    const { location, type, minPrice, maxPrice, bedrooms } = req.query;
    
    if (location) {
      const locationLower = location.toLowerCase();
      filteredProperties = filteredProperties.filter(
        property => 
          property.location.city.toLowerCase().includes(locationLower) ||
          property.location.state.toLowerCase().includes(locationLower) ||
          property.location.address.toLowerCase().includes(locationLower)
      );
    }
    
    if (type) {
      filteredProperties = filteredProperties.filter(
        property => property.type === type
      );
    }
    
    if (minPrice) {
      filteredProperties = filteredProperties.filter(
        property => property.price >= parseInt(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredProperties = filteredProperties.filter(
        property => property.price <= parseInt(maxPrice)
      );
    }
    
    if (bedrooms) {
      filteredProperties = filteredProperties.filter(
        property => property.bedrooms >= parseInt(bedrooms)
      );
    }
    
    res.json(filteredProperties);
  } catch (err) {
    console.error('Get properties error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const property = properties.find(p => p._id === req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (err) {
    console.error('Get property error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/properties
// @desc    Create a property
// @access  Private
router.post('/', auth, (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      features,
    } = req.body;
    
    // In a real app, we would handle image uploads here
    // For this demo, we'll use placeholder images
    const images = [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
    ];
    
    const newProperty = {
      _id: Date.now().toString(),
      title,
      description,
      price: parseInt(price),
      location,
      type,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      area: parseInt(area),
      features: Array.isArray(features) ? features : [features],
      images,
      postedBy: req.user.id,
      createdAt: new Date().toISOString()
    };
    
    properties.push(newProperty);
    
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('Create property error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Additional routes for update and delete would be added in a real application

export default router;