import { useDispatch, useSelector } from "react-redux";
import { noteAPI } from "../api/noteAPI";
import { setName } from "../store/categorySlice";

export const useCategoryStore = () => {
  const dispatch = useDispatch();
  const { name, id } = useSelector((state) => state.category);

  const createCategory = async () => {
    try {
      const { data } = await noteAPI.post("categories", {
        name,
      });
      dispatch(setName(""));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await noteAPI.delete(`categories/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id) => {
    try {
      await noteAPI.put(`categories/${id}`, {
        name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { name, id, createCategory, deleteCategory, updateCategory };
};
