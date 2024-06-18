import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { addItemToCart, removeItemToCart, clearItemFromCart } =
    useContext(CartContext);
  const increaseQuantity = () => addItemToCart(cartItem);
  const decreaseQuantity = () => removeItemToCart(cartItem);
  const removeItem = () => clearItemFromCart(cartItem);
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <span className="name">{name}</span>
      <Quantity>
        <div className="arrow" onClick={decreaseQuantity}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseQuantity}>
          &#10095;
        </div>
      </Quantity>
      <span className="price">{price}</span>
      <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
