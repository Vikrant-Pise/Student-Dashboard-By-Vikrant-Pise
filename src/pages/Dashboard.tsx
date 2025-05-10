import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';
import StudentFilter from '../components/students/StudentFilter';
import { Student } from '../types';
import { getStudents, getCourses, addStudent } from '../services/api';
import { toast } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  //data fech kiya
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [studentsData, coursesData] = await Promise.all([
          getStudents(),
          getCourses()
        ]);
        
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load students data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  
  const filteredStudents = selectedCourse
    ? students.filter(student => student.course === selectedCourse)
    : students;


  const handleAddStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      const newStudent = await addStudent(studentData);
      setStudents(prevStudents => [...prevStudents, newStudent]);
      setShowAddForm(false);
      toast.success('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Failed to add student');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor student information
          </p>
        </div>
        
        <Button 
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
          className="flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Student
        </Button>
      </div>
      
      {/* ye Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <Users size={24} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Total Students
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isLoading ? '...' : students.length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <BarChart size={24} className="text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Courses
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isLoading ? '...' : courses.length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <BookOpen size={24} className="text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Active Course
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedCourse || 'All Courses'}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Add Student Form */}
      {showAddForm && (
        <div className="mb-6">
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
      
      {/* Filters hai */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <StudentFilter
            courses={courses}
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourse}
          />
        </div>
        
        <StudentList
          students={filteredStudents}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;

import { BookOpen } from 'lucide-react';