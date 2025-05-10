import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { StudentSchema, COURSES } from '../../utils/validation';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Student } from '../../types';
import { X } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (student: Omit<Student, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, onCancel }) => {
  const initialValues: Omit<Student, 'id'> = {
    name: '',
    email: '',
    course: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    grade: '',
    avatar: '',
  };

  const handleSubmit = async (
    values: Omit<Student, 'id'>,
    { resetForm }: FormikHelpers<Omit<Student, 'id'>>
  ) => {
    try {
      await onSubmit(values);
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

 
  const courseOptions = COURSES.map(course => ({
    value: course,
    label: course,
  }));

  return (
    <Card className="overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Add New Student
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={StudentSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, getFieldProps, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  error={touched.name && errors.name ? errors.name : undefined}
                  {...getFieldProps('name')}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john.doe@example.com"
                  error={touched.email && errors.email ? errors.email : undefined}
                  {...getFieldProps('email')}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Course"
                  options={courseOptions}
                  error={touched.course && errors.course ? errors.course : undefined}
                  {...getFieldProps('course')}
                />
                
                <Input
                  label="Enrollment Date"
                  type="date"
                  error={touched.enrollmentDate && errors.enrollmentDate ? errors.enrollmentDate : undefined}
                  {...getFieldProps('enrollmentDate')}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Grade (Optional)"
                  placeholder="A, B+, C, etc."
                  error={touched.grade && errors.grade ? errors.grade : undefined}
                  {...getFieldProps('grade')}
                />
                
                <Input
                  label="Avatar URL (Optional)"
                  placeholder="https://example.com/avatar.jpg"
                  error={touched.avatar && errors.avatar ? errors.avatar : undefined}
                  {...getFieldProps('avatar')}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save Student
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
};

export default StudentForm;