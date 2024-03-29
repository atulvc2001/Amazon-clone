import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  
  const [{ basket },dispatch] = useStateValue();
  const navigate = useNavigate();
  // console.log(basket)

  return (
    <div className='subtotal'>
      <CurrencyFormat 
      
      renderText={
        (value)=>(
          <>
            <p>
              Subtotal ({ basket.length } items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="" id="" /> This order contains a gift
            </small>
          </>
        )
      }
      decimalScale={2}
      value={getBasketTotal(basket)}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
      />

      <button onClick={()=>navigate("/payment")}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal