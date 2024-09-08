import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState.jsx';
import AuthPage from './components/AuthPage.jsx';

// Layout Component to include Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/home",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/about",
      element: <Layout><About /></Layout>,
    },
    {
      path: "/login",
      element: <Layout><AuthPage /></Layout>,
    },
    {
      path: "/signup",
      element: <Layout><AuthPage /></Layout>,
    },
  ]);

  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
