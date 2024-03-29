import React, { useEffect, useState } from 'react'
import "./Payment.css"
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { NavLink, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";

const Payment = () => {

  const [{ basket,user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate stripe secret to allow us to charge a customer
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          // Stripe expects the total in currency subunits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error.message);
        // Handle the error as needed, e.g., show an error message to the user
      }
    };
  
    getClientSecret();
  }, [basket]);

  console.log("The secret is >>>>", clientSecret)
  console.log("this is the user  ",user)

  const handleSubmit = async (event) => {
    // does the processing stuff

    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent, error }) => {
      // paymentIntent = payment confirmation
      if (error) {
        console.error("Error confirming card payment: ", error.message);
        setProcessing(false);
        setError(`Payment failed: ${error.message}`);
      } else {
        console.log("This is the payment Intent >>>> ", paymentIntent);
    
        // Check if paymentIntent is defined before accessing its properties
        if (paymentIntent) {
          db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
            });
        }
    
        setSucceeded(true);
        setError(null);
        setProcessing(false);
    
        dispatch({
          type: "EMPTY_BASKET"
        });
    
        navigate('/orders', { replace: true });
      }
    })
    .catch(error => {
      console.error('Error confirming card payment:', error.message);
      setProcessing(false);
      setError(`The payment has failed: ${error.message}`);
    });

  }

  const handleChange = event => {
    // listen for changes in the CardElement
    // and display any errors as teh customer types their card details

    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
        <div className="payment__container">

          <h1>
            Checkout 
            (
              <NavLink to="/checkout"> {basket?.length} items</NavLink>
            )
          </h1>

          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Banglore, Karnataka</p>
            </div>

          </div>


          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div> 
            <div className="payment__items">
              {basket.map(item => (
                <CheckoutProduct 
                  id = {item.id}
                  title = {item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
            

          </div>


          <div className="payment__section">
            {/* Payment method */}
              <div className="payment__title">
                <h3>Payment Method</h3>
              </div>
              <div className="payment__details">
                {/* Stripe payment */}
                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />

                  <div className="payment__priceContainer">
                  <CurrencyFormat 
                        renderText={
                          (value)=>(
                            <>
                              <h3>Order Total: {value}</h3>
                            </>
                          )
                        }
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                  </div>
                </form>
              </div>

                        {/* ERROR */}
                        {error && <div>{error}</div>}
          </div>

        </div>
    </div>
  )
}

export default Payment
