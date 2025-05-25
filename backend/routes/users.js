import express from 'express';
import { users, properties, savedProperties } from '../mockData.js';
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

// @route   POST api/users/saved-properties
// @desc    Save a property
// @access  Private
router.post('/saved-properties', auth, (req, res) => {
  try {
    const { propertyId } = req.body;
    
    // Check if property exists
    const property = properties.find(p => p._id === propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if already saved
    const alreadySaved = savedProperties.find(
      sp => sp.userId === req.user.id && sp.propertyId === propertyId
    );
    
    if (alreadySaved) {
      return res.status(400).json({ message: 'Property already saved' });
    }
    
    // Save property
    savedProperties.push({
      _id: Date.now().toString(),
      userId: req.user.id,
      propertyId,
      savedAt: new Date().toISOString()
    });
    
    res.status(201).json({ message: 'Property saved successfully' });
  } catch (err) {
    console.error('Save property error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/saved-properties
// @desc    Get all saved properties
// @access  Private
router.get('/saved-properties', auth, (req, res) => {
  try {
    // Get all saved property IDs for the user
    const userSavedProperties = savedProperties.filter(
      sp => sp.userId === req.user.id
    );
    
    // Get the full property details for each saved property
    const savedPropertyDetails = userSavedProperties.map(sp => {
      const property = properties.find(p => p._id === sp.propertyId);
      return property;
    }).filter(Boolean); // Filter out any null/undefined values
    
    res.json(savedPropertyDetails);
  } catch (err) {
    console.error('Get saved properties error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/users/saved-properties/:id
// @desc    Remove a saved property
// @access  Private
router.delete('/saved-properties/:id', auth, (req, res) => {
  try {
    const propertyId = req.params.id;
    
    // Find the index of the saved property
    const savedPropertyIndex = savedProperties.findIndex(
      sp => sp.userId === req.user.id && sp.propertyId === propertyId
    );
    
    if (savedPropertyIndex === -1) {
      return res.status(404).json({ message: 'Saved property not found' });
    }
    
    // Remove the saved property
    savedProperties.splice(savedPropertyIndex, 1);
    
    res.json({ message: 'Property removed from saved list' });
  } catch (err) {
    console.error('Remove saved property error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;