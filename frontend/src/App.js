import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout';
import AddStudents from './pages/AddStudents';
import MyStudents from './pages/MyStudents';
import Submission from './pages/Submission';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout>
      <AddStudents />
    </Layout>,
  },
  {
    path: "/mystudents",
    element: <Layout><MyStudents /></Layout>,
  },
  {
    path: "/submissions",
    element: <Layout><Submission /></Layout>,
  },
  {
    path: "/*",
    element: <div>404 not found</div>
  }
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
