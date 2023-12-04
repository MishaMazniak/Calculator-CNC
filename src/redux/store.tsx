import {configureStore} from "@reduxjs/toolkit"
import dataCalculator from "./calculatorData.tsx"

export default configureStore({
  reducer: {
    calculatorData: dataCalculator
  }
})
