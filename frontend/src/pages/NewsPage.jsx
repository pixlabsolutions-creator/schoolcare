import { Newspaper } from 'lucide-react';

const NewsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Newspaper size={24} />
        News & Announcements
      </h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">School Announcements</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Annual Sports Day</h3>
            <p className="text-gray-700">Annual sports day will be held on December 25, 2025. All students must participate.</p>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Parent-Teacher Meeting</h3>
            <p className="text-gray-700">Quarterly parent-teacher meeting scheduled for November 15, 2025 at 10:00 AM.</p>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Holiday Announcement</h3>
            <p className="text-gray-700">School will remain closed on December 16, 2025 for Victory Day.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;