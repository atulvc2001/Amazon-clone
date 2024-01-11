import React from "react";
import "./Header.css";
import Amazon_logo from "./images/Amazon-Symbol.jpg";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { NavLink } from "react-router-dom";



function Header() {
  return (
    <div className="header">
      {/* Header */}
      <NavLink to="/" >
        <img
          src={Amazon_logo}
          className="header__logo"
          alt="header_img"
          />
      </NavLink>
        {/* Logo */}
      <div className="header__search">
        {/* Search */}
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">

        <div className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <NavLink to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon/>
            <span className="header__optionLineTwo header__basketCount" >
              0
            </span>
          </div>
        </NavLink>

      </div>
    </div>
  );
}

export default Header;
