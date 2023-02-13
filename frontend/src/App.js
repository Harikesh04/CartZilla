import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import React from "react";

import Home from "./component/Home/Home.js";

import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import OrderDetails from "./component/Cart/OrderDetails.js";
import DashBoard from "./component/Admin/DashBoard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import AllOrderList from "./component/Admin/AllOrderList.js";
import UpdateOrder from "./component/Admin/UpdateOrder.js";
import Users from "./component/Admin/Users.js";
import UpdateUserRole from "./component/Admin/UpdateUserRole.js";
import AllReviews from "./component/Admin/AllReviews.js";
import MyOrder from "./component/Order/MyOrder.js";
import Contact from "./component/Contact/Contact.js"
import About from "./component/About/About.js"
import NotFound from "./component/layout/NotFound/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && user && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/login/shipping" element={<Shipping />} />

         
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route exact path="/admin/dashboard" element={<DashBoard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product" element={<NewProduct />} />
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
          <Route exact path="/admin/orders" element={<AllOrderList />} />
          <Route exact path="/admin/order/:id" element={<UpdateOrder />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/user/:id" element={<UpdateUserRole />} />
          <Route exact path="/admin/reviews" element={<AllReviews />} />
        </Route>

        <Route exact path="/Cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

     
    </Router>
  );
}

export default App;
