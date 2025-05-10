import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
   
    checkIfMobile();
    
    
    window.addEventListener('resize', checkIfMobile);
    

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        const navbar = document.getElementById('navbar');
        
        if (
          sidebar && 
          !sidebar.contains(event.target as Node) && 
          navbar && 
          !navbar.contains(event.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div id="navbar">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      
      <div className="flex flex-1 pt-16">
        <div id="sidebar" className="hidden md:block">
          <Sidebar isOpen={true} />
        </div>
        
        {/* Mobile sidebar */}
        {isMobile && (
          <div id="mobile-sidebar">
            <Sidebar isOpen={isSidebarOpen} isMobile={true} />
          </div>
        )}
        
        <main className={`flex-1 p-4 sm:p-6 md:p-8 transition-all duration-300 ${isMobile ? 'ml-0' : 'md:ml-64'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;