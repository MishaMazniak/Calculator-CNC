import {createSlice} from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "calculatorData",
  initialState: {
    choosOperation: "",
    choosMillingPage: ""
  },
  reducers: {
    switchPage: (state, action) => {
      state.choosOperation = action.payload.choosOperation
    },
    switchMilling: (state, action) => {
      state.choosMillingPage = action.payload.choosMillingPage
    }
  }
})

export const {switchPage, switchMilling} = dataSlice.actions
export default dataSlice.reducer
