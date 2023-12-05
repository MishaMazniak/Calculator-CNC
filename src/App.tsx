import "./App.css"
import {useSelector} from "react-redux"

import HomePage from "./components/HomePage"
import Drilling from "./components/Drilling/Drilling"
import FooterPage from "./components/FooterPage"
import Milling from "./components/Milling/Milling"

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
      ) : (
        NaN
      )}
    </div>
  )
}

export default App
