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
  /* <div>
      <header> cart img</header>
      <main>
        <section>
          <h1>Menu</h1>
          <MainMenuList list={menusData?.items} />
        </section>
        <section>
          <h1>Dep</h1>
          <DipList list={menusData?.items} />
        </section>
        <section>
          <h1>Drinks</h1>
          <DrinkList list={menusData?.items} />
        </section>
      </main>
    </div> */
}

export default App;
