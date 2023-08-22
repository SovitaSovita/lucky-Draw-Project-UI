import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enabled : false
}
export const SwitchSlice = createSlice({
    name: "SwitchSlice",
    initialState,
    reducers: {
      setEnabled: (state,action) => {
          state.enabled = action.payload;
      },
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { setEnabled} = SwitchSlice.actions
  
  export default SwitchSlice.reducer;