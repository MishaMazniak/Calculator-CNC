import {createSlice} from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "calculatorData",
  initialState: {
    inputData: {
      typeMaterial: "steel",
      typeTool: "toolhss",
      typeMachining: "rough",
      plate: "adkt",
      d: 0,
      z: 0,
      ap: 0,
      ae: 0,
      vcMin: 0,
      vcMax: 0,
      coefAe: 0,
      coefAp: 0
    },
    inputPlate: {
      ap_Max: 0,
      ap_Min: 0,
      f_Max: 0,
      f_Min: 0,
      hardness: 0,
      name: "",
      type: "",
      vc_Max: 0,
      vc_Min: 0,
      website: ""
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
    inputDataBoring: {
      R_plate: 0,
      ap_Min: 0,
      ap_Max: 0
    },
    pageDrilling: false,
    pageMilling: false,
    pageBoring: false
  },
  reducers: {
    switchPage: (state, action) => {
      state.choosOperation = action.payload.choosOperation
    },
    calculationPage: (state, action) => {
      state.pageDrilling = action.payload.pageDrilling
      state.pageMilling = action.payload.pageMilling
      state.pageBoring = action.payload.pageBoring
    },
    addD: (state, action) => {
      state.inputData.d = action.payload.diameter
    },
    addInputDataBoring: (state, action) => {
      state.inputDataBoring.R_plate = action.payload.R_plate
      state.inputData.typeMachining = action.payload.typeMachining
      state.inputPlate.f_Max = action.payload.f_Max
      state.inputPlate.f_Min = action.payload.f_Min
      state.inputDataBoring.ap_Max = action.payload.ap_Max
      state.inputDataBoring.ap_Min = action.payload.ap_Min
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
      state.inputData.coefAe = action.payload.coefAe
      state.inputData.coefAp = action.payload.coefAp
      state.inputData.plate = action.payload.plate
    },
    addInputPlate: (state, action) => {
      state.inputPlate.ap_Max = action.payload.ap_Max
      state.inputPlate.ap_Min = action.payload.ap_Min
      state.inputPlate.f_Max = action.payload.f_Max
      state.inputPlate.f_Min = action.payload.f_Min
      state.inputPlate.hardness = action.payload.hardness
      state.inputPlate.name = action.payload.name
      state.inputPlate.type = action.payload.type
      state.inputPlate.vc_Max = action.payload.vc_Max
      state.inputPlate.vc_Min = action.payload.vc_Min
      state.inputPlate.website = action.payload.website
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
  addInputPlate,
  addOutputData,
  calculationPage,
  addD,
  addMatAndTool,
  addInputDataBoring
} = dataSlice.actions
export default dataSlice.reducer
