import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const StudentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  course: Yup.string()
    .required('Course is required'),
  enrollmentDate: Yup.date()
    .required('Enrollment date is required')
    .max(new Date(), 'Enrollment date cannot be in the future'),
  grade: Yup.string()
    .nullable(),
  avatar: Yup.string()
    .url('Must be a valid URL')
    .nullable(),
});

export const COURSES = [
  'Computer Science',
  'Data Science',
  'Business Administration',
  'Marketing',
  'Graphic Design',
  'Psychology',
  'Economics',
  'Mathematics',
  'Physics',
  'English Literature'
];