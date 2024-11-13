import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/Home";

import "./App.css";
import CartPage from "./pages/Cart/Cart";
import EtaPage from "./pages/Eta/Eta";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/cart", element: <CartPage /> },
  { path: "/eta", element: <EtaPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
