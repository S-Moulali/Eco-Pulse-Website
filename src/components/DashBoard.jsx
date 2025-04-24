import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinned, AlertTriangle, Leaf, Moon } from 'lucide-react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = '', ...props }) => (
  <div className={`border rounded-xl shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [reportCount, setReportCount] = useState(0);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reports'));
        setReportCount(snapshot.size);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReportCount();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-r from-[#181818] via-[#222] to-[#444]' : 'bg-gradient-to-r from-[#f0f4f8] to-[#ffffff]'} font-sans transition-all duration-300`}>
      <header className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-[#444]' : 'border-[#ddd]'}`}>
        <div className="flex items-center space-x-2">
          <Leaf className={darkMode ? 'text-green-300' : 'text-green-600'} />
          <span className={`font-bold text-xl ${darkMode ? 'text-white' : ''}`}>EcoAlert</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <button className={`${darkMode ? 'text-white' : 'text-[#222]'} hover:text-[#1aff66]`} onClick={() => navigate("/")}>Home</button>
          <button className={`${darkMode ? 'text-white' : 'text-[#222]'} hover:text-[#1aff66]`} onClick={() => navigate("/report")}>Report</button>
          <button className={`${darkMode ? 'text-white' : 'text-[#222]'} hover:text-[#1aff66]`} onClick={() => navigate("/map")}>Map</button>
          <button className={`${darkMode ? 'text-white' : 'text-[#222]'} hover:text-[#1aff66]`} onClick={() => navigate("/eco-tips")}>Tips</button>
          <Button onClick={toggleDarkMode} className={`${darkMode ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'} border`}>
            <Moon className="h-5 w-5" />
          </Button>
        </nav>
      </header>

      <main className={`max-w-6xl mx-auto px-4 py-8 text-center ${darkMode ? 'text-white' : 'text-[#222]'}`}>
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>EcoAlert Network</h1>
        <p className={`text-gray-600 mb-6 text-sm sm:text-base ${darkMode ? 'text-gray-300' : ''}`}>
          Report and track environmental issues in your community. Together we can make a difference.
        </p>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <Button onClick={() => navigate("/report")} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> Report an Issue
          </Button>
          <Button onClick={() => navigate("/map") } className="border border-gray-300 flex items-center gap-1">
            <MapPinned className="h-4 w-4" /> View Issues Map
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Card className={`${darkMode ? 'bg-[#333]' : 'bg-white'}`}>
            <CardContent>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : ''}`}>Total Reports</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Community issue reports</p>
              <p className="text-2xl font-bold mt-2">{reportCount}</p>
            </CardContent>
          </Card>
          <Card className={`${darkMode ? 'bg-[#333]' : 'bg-white'}`}>
            <CardContent>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : ''}`}>Resolved Issues</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Successfully addressed</p>
              <p className="text-2xl font-bold mt-2">0</p>
            </CardContent>
          </Card>
          <Card className={`${darkMode ? 'bg-[#333]' : 'bg-white'}`}>
            <CardContent>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : ''}`}>Average Impact</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Severity assessment</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-bold">78</p>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div className="h-full bg-red-500 rounded-full w-[78%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border rounded-xl bg-orange-50 text-left shadow-sm overflow-hidden">
          <div className="p-4 border-b border-orange-100">
            <h2 className="font-semibold text-xl">Highest Impact Issue</h2>
            <p className="text-sm text-orange-800">This issue requires urgent attention</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">Clear Cutting on North Hill</h3>
            <p className="text-sm text-gray-600 mb-4">
              Several acres of forest being cleared without proper permits. Wildlife habitat destruction observed.
            </p>
            <div className="flex justify-between items-center">
              <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full border border-orange-200">
                Score: 92
              </span>
              <Button className="border border-gray-300 text-sm">View on Map</Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <Button  className="border border-gray-300 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> Recent Reports
          </Button>
          <Button className="border border-gray-300 flex items-center gap-1">
            <Leaf className="h-4 w-4" /> Tips & Challenges
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;