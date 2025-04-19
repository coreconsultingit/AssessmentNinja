import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ErrorPage from '../components/ErrorPage';
import HomePage from '../components/pages/Home';
import ContactUs from '@/components/pages/ContactUs';
import StudentsPage from '@/components/pages/StudentsPage';
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { 
          path: 'Home', // Matches /DotNetInterview/Home
          element: <HomePage /> 
        },
        { 
          index: true, // Redirect root to Home
          element: <Navigate to="Home" replace /> 
        }
        ,
        { 
          path: 'Student', // Matches /DotNetInterview/Home
          element: <StudentsPage /> 
        },
        { 
          path: 'ContactUs', // Matches /DotNetInterview/Home
          element: <ContactUs /> 
        },
        {
          path: '*',
          element: <ErrorPage />
        }
      ],
    }
  ],
  {
    basename: import.meta.env.BASE_URL // Critical for subfolder routing
  }
);