import React from 'react'
import "./Product.css"

function Product() {
  return (
    <div className='product'>
        <div className="product__info">
            <p>The lean startup</p>
            <p className="product__price">
                <small>S</small>
                <strong>19.99</strong>
            </p>
        </div>
            <div className="product__rating">
                <p>⭐</p>
                <p>⭐</p>
                <p>⭐</p>
            </div>

            <img src="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg" alt="prod_img" />
        
            <button>Add to Basket</button>
    </div>
  )
}

export default Product