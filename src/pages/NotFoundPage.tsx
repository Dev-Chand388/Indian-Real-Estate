import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-[10rem] font-bold text-[#B22222] leading-none">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button variant="primary" size="lg">
        <Link to="/" className="flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;