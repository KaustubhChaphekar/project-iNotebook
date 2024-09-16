import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import AuthPage from './components/AuthPage';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AuthRedirect = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/home" /> : element;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><ProtectedRoute element={<Home />} /></Layout>,
    },
    {
      path: "/home",
      element: <Layout><ProtectedRoute element={<Home />} /></Layout>,
    },
    {
      path: "/about",
      element: <Layout><ProtectedRoute element={<About />} /></Layout>,
    },
    {
      path: "/login",
      element: <Layout><AuthRedirect element={<AuthPage />} /></Layout>,
    },
    {
      path: "/signup",
      element: <Layout><AuthRedirect element={<AuthPage />} /></Layout>,
    },
  ], {
    basename: process.env.REACT_APP_FRONTEND_URL || '/'
  });

  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
