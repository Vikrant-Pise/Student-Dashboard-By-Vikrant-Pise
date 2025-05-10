import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Home, BookOpen, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile = false }) => {
  if (!isOpen && isMobile) return null;

  return (
    <aside
      className={`
        fixed left-0 top-16 bottom-0 
        w-64 bg-gray-900 text-white 
        transition-transform duration-300 ease-in-out 
        z-20
        md:translate-x-0
        ${isMobile && isOpen ? 'translate-x-0' : ''}
        ${isMobile && !isOpen ? '-translate-x-full' : ''}
      `}
    >
      <div className="p-4">
        <nav className="space-y-1 mt-5">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-sm rounded-md
              transition-colors duration-200
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <Home size={18} className="mr-3" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/students"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-sm rounded-md
              transition-colors duration-200
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <Users size={18} className="mr-3" />
            <span>Students</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/courses"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-sm rounded-md
              transition-colors duration-200
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <BookOpen size={18} className="mr-3" />
            <span>Courses</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-sm rounded-md
              transition-colors duration-200
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <Settings size={18} className="mr-3" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;