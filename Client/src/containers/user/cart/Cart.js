import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';




function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Cart() {
  const queryParams = useQuery();
  const [cartdetails, setCartDetails] = useState(null);
  // Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

 function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm/>
    </Elements>
  );
};

  useEffect(() => {
    getCartByUser();
    console.log(cartdetails);
  }, []);

  function getCartByUser() {
    //console.log(cartdetails);
    axios.get("http://localhost:1217/cartdetails?id=" + queryParams.get("id")).then((d) => {

      setCartDetails(d.data.catData);
    });
  }
  function renderCartDetails() {
    return cartdetails?.map((item) => {
      return (
        <tr>
          <th>
            <img src={"http://localhost:1217/" + item.product.images[0]}
              height="150"
              width="150"></img>
          </th>
          <th>{item.product.name}</th>
          <th>{item.product.description}</th>
          <th>{item.product.qty}</th>
          <th>{item.product.price}</th>
          <th>
            <button className='btn btn-success' onClick={() => {
               }}>Summary</button>
          </th>

        </tr>
      );
    });
  }
  return (

    <div>
      <Navbar></Navbar>
      <h2>cart</h2>
      <table className='table table-bordered table-hover table-stripped'>
        <thead>
          <tr>
            <th>Images</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderCartDetails()}
        </tbody>
      </table>
    </div>
  )
}

export default Cart;