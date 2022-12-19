import Login from "./components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShellLayout from "./components/AppShellLayout/AppShellLayout";
import { ProtectedRoute } from "./utils/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <ProtectedRoute user={"user"} redirectPath="login">
          {" "}
          <AppShellLayout />
        </ProtectedRoute>
      ),
      errorElement: <div>Nothing found</div>,
      children: [
        {
          path: "by-customer",
          element: <h1>Hello customer</h1>,
        },
        {
          path: "unpaid",
          element: <h1>Hello unpaid</h1>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
