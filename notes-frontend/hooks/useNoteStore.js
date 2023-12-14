import { useDispatch, useSelector } from "react-redux";
import { noteAPI } from "../api/noteAPI";
import { setTitle, setContent } from "../store/noteSlice";

export const useNoteStore = () => {
  const dispatch = useDispatch();
  const { title, content, id } = useSelector((state) => state.note);

  const createNote = async () => {
    try {
      const { data } = await noteAPI.post("note", {
        title,
        content,
      });
      dispatch(setTitle(""));
      dispatch(setContent(""));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await noteAPI.delete(`notes/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (id) => {
    try {
      await noteAPI.put(`notes/${id}`, {
        title,
        content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleArchive = async (id) => {
    try {
      await noteAPI.patch(`notes/toggle/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotesByUser = async () => {
    try {
      const { data } = await noteAPI.get(`user/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { title, content, id, createNote, deleteNote, updateNote, toggleArchive, getNotesByUser };
};
