import { create } from "zustand";
import getCurrentTime from "./utils/components/CardForm/getCurrentTime.js";

const useStore = create((set) => ({
  isCreateMode: false,
  setIsCreateMode: (value) => set({ isCreateMode: value }),
  isEditMode: false,
  setIsEditMode: (value) => set({ isEditMode: value }),
  handleCreateClick: () => set({ isCreateMode: true }),
  handleCloseClick: () => set({ isCreateMode: false }),
  handleEditClick: () => set({ isEditMode: true }),
  showDayPicker: false,
  setShowDayPicker: (value) => set({ showDayPicker: value }),
  selectedTime: getCurrentTime(),
  setSelectedTime: (value) => set({ selectedTime: value }),
  selectedCategory: "",
  setSelectedCategory: (value) => set({ selectedCategory: value }),
  selectedDate: null,
  setSelectedDate: (value) => set({ selectedDate: value }),
}));

export default useStore;
