import { useDispatch, useSelector } from "react-redux";
import { noteAPI } from "../api/noteAPI";
import { setNotes } from "../store/noteSlice";
import { useAuthStore } from "./useAuthStore";

export const useNoteStore = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.note);
  const { user } = useAuthStore();

  const createNote = async (title, content) => {
    try {
      const { data } = await noteAPI.post("note", {
        username: user.username,
        title,
        content,
      });
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

  const updateNote = async (id, title, content) => {
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
      await noteAPI.put(`notes/toggle/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotesByUser = async () => {
    try {
      const { data } = await noteAPI.get(`notes/user/1`);
      dispatch(setNotes(data));
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  };

  return { notes, createNote, deleteNote, updateNote, toggleArchive, getNotesByUser };
};
