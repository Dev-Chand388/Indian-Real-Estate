// Mock data for development

export const users = [];
export const properties = [];
export const savedProperties = [];

export const createMockData = () => {
  // Create mock users if not already created
  if (users.length === 0) {
    users.push({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '$2a$10$XJRxpEJsx9OTHQEaDKs5J.zxmDRg1LKBcjQIvODfSo5nzCvWJvGla', // password123
      role: 'user',
      createdAt: '2023-01-01T00:00:00.000Z'
    });
    
    users.push({
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '$2a$10$XJRxpEJsx9OTHQEaDKs5J.zxmDRg1LKBcjQIvODfSo5nzCvWJvGla', // password123
      role: 'agent',
      createdAt: '2023-01-02T00:00:00.000Z'
    });
  }
  
  // Create mock properties if not already created
  if (properties.length === 0) {
    properties.push({
      _id: '1',
      title: '3 BHK Luxury Apartment in Bandra',
      description: 'Beautiful 3 bedroom apartment with modern amenities. Located in the heart of Bandra with easy access to shopping centers, schools, and public transportation. The apartment features a spacious living room, modern kitchen, and a large balcony with stunning city views.\n\nThe community includes a swimming pool, gym, children\'s play area, and 24/7 security.',
      price: 9500000,
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        address: '123 Linking Road, Bandra West'
      },
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      features: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Power Backup', 'Lift'],
      images: [
        'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
      ],
      postedBy: '2',
      createdAt: '2023-04-15T10:30:00.000Z'
    });
    
    properties.push({
      _id: '2',
      title: 'Modern 4 BHK Villa in Whitefield',
      description: 'Spacious 4 bedroom villa in a gated community. This beautiful property features high ceilings, large windows, and premium finishes throughout. The open-concept kitchen includes stainless steel appliances and granite countertops.\n\nThe master bedroom has a walk-in closet and an ensuite bathroom with a soaking tub. The landscaped garden provides a perfect space for outdoor entertainment.',
      price: 15000000,
      location: {
        city: 'Bangalore',
        state: 'Karnataka',
        address: '45 Green Valley, Whitefield'
      },
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      features: ['Gated Community', 'Garden', 'Modular Kitchen', 'CCTV', 'Club House', 'Children\'s Play Area'],
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
        'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
      ],
      postedBy: '2',
      createdAt: '2023-04-20T14:45:00.000Z'
    });
    
    properties.push({
      _id: '3',
      title: '2 BHK Apartment Near Metro Station',
      description: 'Well-maintained 2 bedroom apartment close to the metro station. Perfect for young professionals or small families. The apartment is in a safe neighborhood with good connectivity to IT parks and shopping centers.\n\nThe kitchen comes with built-in cabinets and a breakfast counter. Both bedrooms have attached bathrooms and adequate storage space.',
      price: 4500000,
      location: {
        city: 'Delhi',
        state: 'Delhi NCR',
        address: '78 Rajouri Garden'
      },
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      features: ['Near Metro', 'Security', 'Car Parking', 'Power Backup', 'Visitor Parking'],
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
      ],
      postedBy: '2',
      createdAt: '2023-05-05T09:15:00.000Z'
    });
    
    properties.push({
      _id: '4',
      title: 'Commercial Space in Hitec City',
      description: 'Prime commercial space available in the heart of Hitec City. Ideal for offices, retail, or restaurants. The property features an open floor plan that can be customized to meet your business needs.\n\nThe building has 24/7 security, ample parking, and backup power. High visibility location with excellent foot traffic.',
      price: 30000000,
      location: {
        city: 'Hyderabad',
        state: 'Telangana',
        address: '22 Cyber Towers, Hitec City'
      },
      type: 'Commercial',
      bedrooms: 0,
      bathrooms: 2,
      area: 3500,
      features: ['High Ceiling', 'Fire Safety', 'Cafeteria', 'Conference Room', 'Parking', '24/7 Access'],
      images: [
        'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg',
        'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg',
        'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg'
      ],
      postedBy: '2',
      createdAt: '2023-05-12T11:00:00.000Z'
    });
    
    properties.push({
      _id: '5',
      title: 'Residential Plot in Kothrud',
      description: 'RERA approved residential plot in a developing area of Kothrud. This is a great investment opportunity with high appreciation potential. The plot is in a planned development with proper roads and all utilities in place.\n\nThe plot has clear title documentation and is ready for immediate construction. Nearby amenities include schools, hospitals, and shopping centers.',
      price: 7000000,
      location: {
        city: 'Pune',
        state: 'Maharashtra',
        address: '10 New Colony, Kothrud'
      },
      type: 'Plot',
      bedrooms: 0,
      bathrooms: 0,
      area: 2400,
      features: ['RERA Approved', 'Corner Plot', 'East Facing', 'Electricity', 'Water Connection', 'Clear Title'],
      images: [
        'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
        'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg',
        'https://images.pexels.com/photos/8092/pexels-photo.jpg'
      ],
      postedBy: '2',
      createdAt: '2023-05-18T16:30:00.000Z'
    });
    
    properties.push({
      _id: '6',
      title: 'Luxury 5 BHK Duplex in South Delhi',
      description: 'Exquisite 5 bedroom duplex in one of South Delhi\'s most prestigious neighborhoods. This property offers the perfect blend of luxury, comfort, and convenience. The thoughtfully designed floor plan features spacious living areas, a formal dining room, and a state-of-the-art kitchen.\n\nThe upper level includes a master suite with a private balcony and a lavish bathroom. The property also includes staff quarters and a private terrace garden.',
      price: 65000000,
      location: {
        city: 'Delhi',
        state: 'Delhi NCR',
        address: '7 Defence Colony'
      },
      type: 'House',
      bedrooms: 5,
      bathrooms: 5,
      area: 4500,
      features: ['Terrace Garden', 'Modular Kitchen', 'Italian Marble Flooring', 'Home Theatre', 'Staff Quarters', 'Private Lift'],
      images: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
      ],
      postedBy: '2',
      createdAt: '2023-05-25T13:45:00.000Z'
    });
  }
  
  // Create mock saved properties if not already created
  if (savedProperties.length === 0) {
    savedProperties.push({
      _id: '1',
      userId: '1',
      propertyId: '2',
      savedAt: '2023-06-01T10:00:00.000Z'
    });
    
    savedProperties.push({
      _id: '2',
      userId: '1',
      propertyId: '5',
      savedAt: '2023-06-05T15:30:00.000Z'
    });
  }
  
  console.log('Mock data created:', {
    users: users.length,
    properties: properties.length,
    savedProperties: savedProperties.length
  });
};