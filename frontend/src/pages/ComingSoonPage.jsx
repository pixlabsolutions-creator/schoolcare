import { Clock, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoonPage = ({ pageName = "This Page" }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={48} className="text-blue-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-200">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium mb-2">
              PixLab Solutions
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Toskia Jamat Iva</h2>
            <p className="text-gray-600">Student ID: 568723</p>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
            <p className="text-yellow-800">
              <span className="font-bold">{pageName}</span> is currently under development.
              We're working hard to bring you this feature soon!
            </p>
          </div>
          
          <p className="text-gray-600 mb-8">
            Wait until development is complete. Our team is working on creating 
            an amazing experience for you. Check back later for updates!
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Home size={20} />
              Go to Home
            </Link>
            
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Notify Me When Ready
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Expected launch: Q4 2025</p>
          <p className="mt-1">Contact support for more information</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;