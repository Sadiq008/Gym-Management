import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Add this import

// Create a Context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (supplement) => {
    setCartItems((prevItems) => [...prevItems, supplement]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Add PropTypes validation
CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Add this line
};
