import { createSlice } from "@reduxjs/toolkit";

const initialState = {}
export const PopupSlice = createSlice({
    name: "PopupSlice",
    initialState,
    reducers: {
      setPopup: (state,action) => {
          state.value = action.payload;
      },
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { setPopup} = PopupSlice.actions
  
  export default PopupSlice.reducer;