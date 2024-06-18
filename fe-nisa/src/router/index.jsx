import { createBrowserRouter, redirect } from 'react-router-dom';
import Parent from "../pages/Parent";
import Home from "../pages/Home";
import CreateHomepass from '../pages/CreateHomepass';
import EditHomepass from '../pages/EditHomepass';
import Template from '../pages/Template';
import DetailHomepass from '../pages/DetailHomepass';
import Login from '../pages/Login';
import UpdateHomepass from '../pages/UpdateHomepass';


const aunthBeforeLogin = () => {
  const access_token = localStorage.access_token;
  if (!access_token) {
    throw redirect("/login");
  }
  return null;
};

const aunthAfterLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token) {
    throw redirect("/");
  }
  return null;
};


const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      loader: aunthAfterLogin,
    },
    {
      element: <Parent />,
      children: [
        {
          path: "/tes",
          element: <Template />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/createhomepass",
          element: <CreateHomepass />,
        },
        {
          path: "/hmpdetails/:id",
          element: <DetailHomepass />,
        },
        {
          path: "/edithomepass/:id",
          element: <EditHomepass />,
        },
        {
          path: "/updatehomepass/:id",
          element: <UpdateHomepass />,
        },
      ],
      loader: aunthBeforeLogin,
    },
  ]);
  
  export default router;