import {createSlice} from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "calculatorData",
  initialState: {
    choosOperation: "",
    typeMaterial: "",
    toolData: {typeTool: "", d: 0, z: 0, ap: 0, ae: 0}
  },
  reducers: {
    switchPage: (state, action) => {
      state.choosOperation = action.payload.choosOperation
    },
    choosMaterial: (state, action) => {
      state.typeMaterial = action.payload.typeMaterial
    },
    addDataTool: (state, action) => {
      state.toolData.typeTool = action.payload.typeTool
      state.toolData.d = action.payload.diameter
      state.toolData.z = action.payload.teeth
      state.toolData.ap = action.payload.ap
      state.toolData.ae = action.payload.ae
    }
  }
})

export const {switchPage, choosMaterial, addDataTool} = dataSlice.actions
export default dataSlice.reducer
