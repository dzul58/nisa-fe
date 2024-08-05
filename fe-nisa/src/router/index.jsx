import { createBrowserRouter, redirect } from 'react-router-dom';
import Parent from "../pages/Parent";
import Home from "../pages/Home";
import CreateHomepass from '../pages/CreateHomepass';
import EditHomepass from '../pages/EditHomepass';
import DetailHomepass from '../pages/DetailHomepass';
import Login from '../pages/Login';
import UpdateHomepass from '../pages/UpdateHomepass';
import AutoLogin from '../pages/AutoLogin';
import ErrorPage from '../pages/ErrorPage';
import UpdateSurveyHomepass from '../pages/UpdateSurveyHomepass';
import UpdateTaken from '../pages/UpdateTaken';


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
      path: "/auto-login",
      element: <AutoLogin />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: aunthAfterLogin,
    },
    {
      element: <Parent />,
      children: [
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
        {
          path: "/updatesurvey/:id",
          element: <UpdateSurveyHomepass />,
        },
        {
          path: "/untaken-homepass-moving-address-response_hpm_status",
          element: <UpdateTaken />,
        },
      ],
      loader: aunthBeforeLogin,
    },
  ]);
  
  export default router;