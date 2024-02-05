import React, { useState } from 'react'
import "./Orders.css"
import { useStateValue } from './StateProvider';

const Orders = () => {

  const [{basket, user}, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  // use

  return (
    <div class="orders">
      <h1>Your orders</h1>
    </div>
  )
}

export default Orders
