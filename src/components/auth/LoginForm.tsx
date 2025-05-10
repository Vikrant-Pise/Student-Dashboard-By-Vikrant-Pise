
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { LoginSchema } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { toast } from 'react-hot-toast';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setFieldError }: FormikHelpers<LoginFormValues>
  ) => {
    setIsSubmitting(true);

    try {
      await login(values.email, values.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setFieldError('email', 'Invalid email or password');
        setFieldError('password', 'Invalid email or password');
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    toast.success('Using demo credentials');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Card className="p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Dashboard</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to manage students</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, getFieldProps }) => (
          <Form className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Email-admin@123.com & Password-123456"
              error={touched.email && errors.email ? errors.email : undefined}
              {...getFieldProps('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={touched.password && errors.password ? errors.password : undefined}
              {...getFieldProps('password')}
            />
            <div className="pt-2">
              <Button type="submit" fullWidth isLoading={isSubmitting}>
                Sign In
              </Button>
            </div>
            <div className="text-center mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="secondary"
                fullWidth
                className="mt-4"
                onClick={handleDemoLogin}
              >
                Demo Credentials
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LoginForm;
