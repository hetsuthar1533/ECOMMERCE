import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/components/ProductList';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Cartpage from './pages/Cartpage';
import Signuppage from './pages/Signuppage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import CheckOut from './pages/CheckOut';
// import ProductDetailpage from './features/product-list/components/ProductsDetail';
import ProductDetailpage from './pages/ProductDetailpage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/login",
    element: (
      <Loginpage />
    ),
  },
  {
    path: "/signup",
    element: (
      <Signuppage />
    ),
  },
  {
    path: "/cart",
    element: (
      <Cartpage />
    ),
  },
  {
    path: "/checkout",
    element: (
      <CheckOut />
    ),
  },
  {
    path: "/product-detail",
    element: (
      <ProductDetailpage />
    ),
  }
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
