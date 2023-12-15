import { useDispatch, useSelector } from "react-redux";
import { noteAPI } from "../api/noteAPI";
import { setNotes } from "../store/noteSlice";
import { useAuthStore } from "./useAuthStore";

export const useNoteStore = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.note);
  const { user } = useAuthStore();

  const createNote = async (title, content, categories) => {
    try {
      const { data } = await noteAPI.post("notes/create", {
        username: user.username,
        title,
        content,
        categories,
      });
    } catch (error) {}
  };

  const deleteNote = async (id) => {
    try {
      await noteAPI.delete(`notes/${id}`);
    } catch (error) {}
  };

  const updateNote = async (id, title, content, categories) => {
    try {
      await noteAPI.put(`notes/update/${id}`, {
        title,
        content,
        categories,
      });
    } catch (error) {}
  };

  const toggleArchive = async (id) => {
    try {
      await noteAPI.put(`notes/toggle/${id}`);
    } catch (error) {}
  };

  const getNotesByUser = async (id) => {
    try {
      const { data } = await noteAPI.get(`notes/user/${id}`);
      dispatch(setNotes(data));
    } catch (error) {}
  };

  const clearNotes = () => {
    dispatch(setNotes([]));
  };

  return { notes, createNote, deleteNote, updateNote, toggleArchive, getNotesByUser, clearNotes };
};
