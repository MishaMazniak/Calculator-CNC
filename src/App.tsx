import "./App.css"
import {useSelector} from "react-redux"

import HomePage from "./components/HomePage"
import Drilling from "./components/Drilling/Drilling"
import AppMilling from "./components/Milling/AppMilling"
import DataOnAllPage from "./components/DataOnAllPage"

interface RootState {
  calculatorData: {
    choosOperation: string
  }
}

function App() {
  let propsRedux = useSelector((state: RootState) => state.calculatorData)

  return (
    <div className="container text-center">
      {propsRedux.choosOperation === "" ? (
        <HomePage></HomePage>
      ) : propsRedux.choosOperation === "drilling" ? (
        <>
          <Drilling></Drilling>
          <DataOnAllPage></DataOnAllPage>
        </>
      ) : propsRedux.choosOperation === "milling" ? (
        <AppMilling></AppMilling>
      ) : (
        NaN
      )}
    </div>
  )
}

export default App
