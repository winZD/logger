import Login from "./components/Login/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppShellLayout from "./components/AppShellLayout/AppShellLayout";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Customer from "./components/Customer/Customer";

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
          index: true,

          element: <Customer />,
        },
        {
          path: "/:id",
          element: (
            <div>
              <h1>hello</h1>
            </div>
          ),
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
