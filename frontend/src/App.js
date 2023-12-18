import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import RootLayoutPage from "./pages/RootLayout.js";
import ErrorPage from './pages/ErrorPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth loginPath="/login">
          <RootLayoutPage />
        </RequireAuth>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
      ],
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
