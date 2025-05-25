import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, List, Plus, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Saved Properties', value: 12, icon: <Heart className="h-6 w-6 text-[#B22222]" />, link: '/saved-properties' },
    { label: 'Property Inquiries', value: 5, icon: <List className="h-6 w-6 text-[#DAA520]" />, link: '#' },
    { label: 'Listed Properties', value: 2, icon: <Home className="h-6 w-6 text-[#B22222]" />, link: '#' },
  ];

  const recentActivity = [
    { action: 'Saved a property', property: '3 BHK Apartment in Bandra', date: '2 days ago' },
    { action: 'Inquired about', property: 'Villa in Pune', date: '1 week ago' },
    { action: 'Listed', property: '2 BHK Flat in Mumbai', date: '1 month ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Dashboard</h1>
        <div className="flex space-x-3">
          <Link to="/add-property">
            <Button variant="primary">
              <Plus className="h-5 w-5 mr-1" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
            <User className="h-10 w-10 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <div className="mt-2 flex space-x-3">
              <button className="text-sm text-[#B22222] hover:text-[#8B0000] font-medium">
                Edit Profile
              </button>
              <button 
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link 
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="bg-gray-100 rounded-full p-3">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-800">
                      <span className="font-medium">{activity.action}</span> {activity.property}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/saved-properties"
            className="bg-gray-50 rounded-lg p-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <Heart className="h-6 w-6 text-[#B22222] mr-3" />
            <span>Saved Properties</span>
          </Link>
          
          <Link 
            to="/add-property"
            className="bg-gray-50 rounded-lg p-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <Plus className="h-6 w-6 text-[#B22222] mr-3" />
            <span>Add Property</span>
          </Link>
          
          <Link 
            to="#"
            className="bg-gray-50 rounded-lg p-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <List className="h-6 w-6 text-[#B22222] mr-3" />
            <span>My Inquiries</span>
          </Link>
          
          <Link 
            to="#"
            className="bg-gray-50 rounded-lg p-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <User className="h-6 w-6 text-[#B22222] mr-3" />
            <span>Profile Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;