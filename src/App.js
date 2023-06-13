import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Prdouct/ProductDetails";
import Product from "./component/Prdouct/Product.js";
import Search from "./component/Prdouct/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js"; 
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Product} />
        <Route path="/products/:keyword" Component={Product} />

        <Route exact path="/search" Component={Search} />
        <Route exact path="/account" Component={Profile} />
        <Route exact path="/me/update" Component={UpdateProfile} />
        <Route exact path="/password/update" Component={UpdatePassword} />
        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />

        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/shipping" Component={Shipping} />
        <Route exact path="/order/confirm" Component={ConfirmOrder} />
        <Route exact path="/success" Component={OrderSuccess} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/> }>
          <Route path="/success" element= {<OrderSuccess />} />
        </Route>


        {stripeApiKey && <Route
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute isAuthenticated={isAuthenticated}  />
            </Elements>
          }
        >
          <Route path="/process/payment" element={<Payment />} />
        </Route>}

        <Route exact path="/login" Component={LoginSignUp} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
