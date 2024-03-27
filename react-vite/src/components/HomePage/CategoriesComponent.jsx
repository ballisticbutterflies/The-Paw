import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories";

function CategoriesComponent () {

  const dispatch = useDispatch();
  
  return (
    <h1>Categories</h1>
  )
}

export default CategoriesComponent;
