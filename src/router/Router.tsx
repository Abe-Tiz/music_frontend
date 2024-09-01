import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Index from "../pages/ststistics/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/statistics",
    element: <Index />,
  },
]);

export default router;