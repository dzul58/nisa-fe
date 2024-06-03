import { createBrowserRouter } from 'react-router-dom';
import Parent from "../pages/Parent";
import Home from "../pages/Home";
import HpmDetail from '../pages/HpmDetail';
import CreateHomepass from '../pages/CreateHomepass';
import EditHomepass from '../pages/EditHomepass';


const router = createBrowserRouter([
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
          path: "/hmpdetail/:id",
          element: <HpmDetail />,
        },
        {
          path: "/updatehomepass/:id",
          element: <EditHomepass />,
        },
      ],
    },
  ]);
  
  export default router;