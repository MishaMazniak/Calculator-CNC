import "./App.css"
import {useSelector} from "react-redux"

import HomePage from "./components/HomePage"
import Drilling from "./components/Drilling/Drilling"
import Milling from "./components/Milling/Milling"
import Boring from "./components/Boring/Boring"
import Tolerance from "./components/Tolerance/Tolerance"
import FooterPage from "./components/FooterPage"

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
          <FooterPage></FooterPage>
        </>
      ) : propsRedux.choosOperation === "milling" ? (
        <>
          <Milling></Milling>
          <FooterPage></FooterPage>
        </>
      ) : propsRedux.choosOperation === "boring" ? (
        <>
          <Boring></Boring>
          <FooterPage></FooterPage>
        </>
      ) : propsRedux.choosOperation === "tolerance" ? (
        <>
          <Tolerance></Tolerance>
        </>
      ) : (
        NaN
      )}
    </div>
  )
}

export default App
