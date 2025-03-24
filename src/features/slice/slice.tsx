import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

// Define the initial state
interface PageState {
  currentPage: string;
}

const initialState: PageState = {
  currentPage: "home", // Default page
};

// Create a slice
const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setCurrentPage: (state: PageState, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

// Export actions
export const { setCurrentPage } = pageSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
  },
});

// Export the store and RootState type
export type RootState = ReturnType<typeof store.getState>;
export default store;
