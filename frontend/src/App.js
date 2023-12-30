import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './pages/ErrorPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
import ImagesPage from './pages/ImagesPage';
import ProfilePage from './pages/ProfilePage';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",  
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/images",
      element: (
          <ImagesPage />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element: (
          <ProfilePage />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <ErrorPage />,
    },
  ]);
  
  
  return (
    <div >
      <main>
      <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
