import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ErrorPage from '../components/ErrorPage';
import HomePage from '../components/pages/Home';
import ContactUs from '@/components/pages/ContactUs';
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