import React from 'react';
import { Filter } from 'lucide-react';

interface StudentFilterProps {
  courses: string[];
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
}

const StudentFilter: React.FC<StudentFilterProps> = ({ 
  courses, 
  selectedCourse, 
  onSelectCourse 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 py-2">
      <div className="flex items-center text-gray-700 dark:text-gray-300">
        <Filter size={18} className="mr-2" />
        <span className="text-sm font-medium">Filter by Course:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCourse === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => onSelectCourse('')}
        >
          All
        </button>
        
        {courses.map((course) => (
          <button
            key={course}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCourse === course
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => onSelectCourse(course)}
          >
            {course}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentFilter;