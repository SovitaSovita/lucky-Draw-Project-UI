import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};


export const LoadingSlice = createSlice({
  name: "LoadingSlice",
  initialState,
  reducers: {
    setLoading: (state,action) => {
        state.value = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setLoading} = LoadingSlice.actions

export default LoadingSlice.reducer;