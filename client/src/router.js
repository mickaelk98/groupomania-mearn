import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { rootLoader, fetchUsers } from "./loaders";
import IsConnected from "./components/IsConnected";
import IsNotConnected from "./components/IsNotConnected";
import Profil from "pages/Profil";
import EditProfil from "pages/EditProfil";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: (
          <IsConnected>
            <Homepage />
          </IsConnected>
        ),
      },
      {
        path: "/profil/:id",
        loader: fetchUsers,
        element: (
          <IsConnected>
            <Profil />
          </IsConnected>
        ),
      },
      {
        path: "/profil/edit/:id",
        element: (
          <IsConnected>
            <EditProfil />
          </IsConnected>
        ),
      },
      {
        path: "/signup",
        element: (
          <IsNotConnected>
            <Signup />
          </IsNotConnected>
        ),
      },
      {
        path: "/login",
        element: (
          <IsNotConnected>
            <Login />
          </IsNotConnected>
        ),
      },
    ],
  },
]);
