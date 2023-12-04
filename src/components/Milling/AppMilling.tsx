import {useSelector} from "react-redux"
import AllMilling from "./AllMilling/AllMilling"
import HssRoughing from "./AllMilling/HssRoughing"
import MillingFolding from "./AllMilling/MillingFolding"
import DataOnAllPage from "../DataOnAllPage"

// action with pages
interface RootState {
  calculatorData: {
    choosOperation: string
    choosMillingPage: string
  }
}

function AppMilling() {
  let propsRedux = useSelector((state: RootState) => state.calculatorData)

  return (
    <div className="container text-center">
      {propsRedux.choosMillingPage === "" ? (
        <AllMilling></AllMilling>
      ) : propsRedux.choosMillingPage === "hss-milling" ? (
        <>
          <HssRoughing></HssRoughing>
          <DataOnAllPage></DataOnAllPage>
        </>
      ) : propsRedux.choosMillingPage === "folding-milling" ? (
        <>
          <MillingFolding></MillingFolding>
          <DataOnAllPage></DataOnAllPage>
        </>
      ) : (
        NaN
      )}
    </div>
  )
}

export default AppMilling
