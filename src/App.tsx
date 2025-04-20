import { RouterProvider } from 'react-router-dom';
import { DevTools } from 'jotai-devtools';
import { router } from './routes';



const App: React.FC = () => {
  return (
    <>
    <DevTools />
    <RouterProvider router={router} />
  </>
  );
};

export default App;
