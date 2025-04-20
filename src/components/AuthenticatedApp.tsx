import { RouterProvider } from 'react-router-dom';
import { DevTools } from 'jotai-devtools';
import { router } from '@/routes';




export const AuthenticatedApp = () => {
  return (
    <>
      <DevTools />
      <RouterProvider router={router} />
    </>
  );
};  