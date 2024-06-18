import { Link } from "react-router-dom";
import {
  CategoryItemContainer,
  BackgroundImage,
  CategoryBodyContainer,
} from "./category-item.styles";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryBodyContainer>
        <Link to={`/shop/${title}`}>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Link>
      </CategoryBodyContainer>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
