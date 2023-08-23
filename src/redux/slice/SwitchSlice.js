import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enabled : false,
    isDefault : false
}
export const SwitchSlice = createSlice({
    name: "SwitchSlice",
    initialState,
    reducers: {
      setEnabled: (state,action) => {
          state.enabled = action.payload;
      },
      setIsDefault: (state,action) => {
          state.isDefault = action.payload;
      },
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { setEnabled , setIsDefault} = SwitchSlice.actions
  
  export default SwitchSlice.reducer;