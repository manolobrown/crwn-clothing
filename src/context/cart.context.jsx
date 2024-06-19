import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  IS_CART_OPEN: "IS_CART_OPEN",
  CART_ITEMS: "CART_ITEMS",
  CART_COUNT: "CART_COUNT",
  CART_TOTAL: "CART_TOTAL",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };
    case CART_ACTION_TYPES.CART_TOTAL:
      return {
        ...state,
        cartTotal: payload,
      };
    default:
      throw new Error(`Unsupported action type: ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  const setIsCartOpen = (isOpen) => {
    dispatch({ type: CART_ACTION_TYPES.IS_CART_OPEN, payload: isOpen });
  };
  const setCartItems = (cartItem) => {
    dispatch({ type: CART_ACTION_TYPES.CART_ITEMS, payload: cartItem });
  };
  const setCartCount = (cartCount) => {
    dispatch({ type: CART_ACTION_TYPES.CART_COUNT, payload: cartCount });
  };
  const setCartTotal = (cartTotal) => {
    dispatch({ type: CART_ACTION_TYPES.CART_TOTAL, payload: cartTotal });
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
