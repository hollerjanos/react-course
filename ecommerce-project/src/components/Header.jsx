import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import './Header.css';

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");

  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  }

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  }

  let TotalQuantity = 0;

  cart.forEach((cartItem) => {
    TotalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"
          data-testid="header-search-bar"
          value={search} onChange={updateSearchInput}/>

        <button className="search-button"
          data-testid="header-search-button"
          onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon}/>
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders"
          data-testid="header-orders-link">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout"
          data-testid="header-cart-link">
          <img className="cart-icon" src={CartIcon}/>
          <div className="cart-quantity">{TotalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}