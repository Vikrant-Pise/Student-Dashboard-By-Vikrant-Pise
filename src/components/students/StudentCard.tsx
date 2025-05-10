import React from 'react';
import { Mail, BookOpen, Calendar, Award } from 'lucide-react';
import Card from '../ui/Card';
import { Student } from '../../types';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { name, email, course, enrollmentDate, grade, avatar } = student;


  const formattedDate = new Date(enrollmentDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative">
            <img
              src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Mail size={14} className="mr-1" />
              <span>{email}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <BookOpen size={16} className="mr-2" />
            <span className="text-sm">{course}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">Enrolled: {formattedDate}</span>
          </div>
          
          {grade && (
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Award size={16} className="mr-2" />
              <span className="text-sm">
                Grade: <span className="font-medium">{grade}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;