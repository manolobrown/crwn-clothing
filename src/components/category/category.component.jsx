import CategoryItem from "../category-item/category-item.component";

import { CategoryContainer } from "./category.styles";

const Category = ({ categories }) => {
  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </CategoryContainer>
  );
};

export default Category;
