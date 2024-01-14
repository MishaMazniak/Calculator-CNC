import {createSlice} from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "calculatorData",
  initialState: {
    inputData: {
      typeMaterial: "steel",
      typeTool: "toolhss",
      typeMachining: "rough",
      d: 0,
      z: 0,
      ap: 0,
      ae: 0,
      q: 0,
      vcMin: 0,
      vcMax: 0
    },
    choosOperation: "",
    outputData: {
      vcMin: 0,
      vcMax: 0,
      fk: 0,
      sMin: 0,
      sMax: 0,
      fMin: 0,
      fMax: 0
    },
    pageDrilling: false,
    pageMilling: false
  },
  reducers: {
    switchPage: (state, action) => {
      state.choosOperation = action.payload.choosOperation
    },
    calculationPage: (state, action) => {
      state.pageDrilling = action.payload.pageDrilling
      state.pageMilling = action.payload.pageMilling
    },
    addD: (state, action) => {
      state.inputData.d = action.payload.diameter
    },
    addMatAndTool: (state, action) => {
      state.inputData.typeMaterial = action.payload.typeMaterial
      state.inputData.typeTool = action.payload.typeTool
      state.inputData.vcMin = action.payload.vcMin
      state.inputData.vcMax = action.payload.vcMax
    },
    addInputData: (state, action) => {
      state.inputData.typeMachining = action.payload.typeMachining
      state.inputData.d = action.payload.d
      state.inputData.z = action.payload.z
      state.inputData.ap = action.payload.ap
      state.inputData.ae = action.payload.ae
      state.inputData.q = action.payload.q
    },
    addOutputData: (state, action) => {
      state.outputData.vcMin = action.payload.vcMin
      state.outputData.vcMax = action.payload.vcMax

      state.outputData.fk = action.payload.fk

      state.outputData.sMin = action.payload.sMin
      state.outputData.sMax = action.payload.sMax

      state.outputData.fMin = action.payload.fMin
      state.outputData.fMax = action.payload.fMax
    }
  }
})

export const {
  switchPage,
  addInputData,
  addOutputData,
  calculationPage,
  addD,
  addMatAndTool
} = dataSlice.actions
export default dataSlice.reducer
