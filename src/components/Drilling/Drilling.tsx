import "./Drilling.scss"
import {useSelector} from "react-redux"
import ImgArrow from "../../assets/left-arrow.png"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {switchPage, addD, calculationPage} from "../../redux/calculatorData"

interface RootState {
  calculatorData: {
    inputData: {
      typeTool: string
      typeMaterial: string
      z: number
      vcMin: number
    }
    outputData: {
      fk: number
    }
  }
}

function Drilling() {
  const dispatch = useDispatch()

  // data from redux
  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  // Data parameters
  const [diameter, setDiameter] = useState(0)
  // calculate according to your own parameters
  const [yourVc, setYourVc] = useState(0)
  const [yourFz, setYourFz] = useState(0)
  const [yourS, setYourS] = useState(0)
  const [yourF, setYourF] = useState(0)
  let mathVc: number

  // Return to the main page
  function mainPage() {
    dispatch(
      switchPage({
        choosOperation: ""
      })
    )
    dispatch(
      calculationPage({
        pageDrilling: false,
        pageMilling: false,
        pageBoring: false
      })
    )
  }
  useEffect(() => {
    // calculations according to your parameters Vc
    if (yourVc !== 0) {
      mathVc = Math.floor((yourVc * 1000) / (diameter * 3.14))
      setYourS(mathVc)
    }
    if (yourFz !== 0) setYourF(Math.floor(mathVc * yourFz))
    dispatch(
      addD({
        diameter: diameter
      })
    )
  }, [diameter, yourVc, yourFz])

  return (
    <div className="drilling">
      <header className="row ms-md-5 pt-3 mb-3 my-nav">
        <div className="col-2 col-md-2 arrow mx-2" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-3 offset-md-2">Wiercenie</h1>
      </header>
      <div className="col-8 offset-2 col-md-4 offset-md-4">
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text">d = </span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> mm</span>
        </div>
        <div className="input-group mb-3">
          {/* _________ input form for your data "Vc" and "fz" _________ */}
          <span className="input-group-text">vc = </span>
          <input
            type="number"
            className="form-control"
            placeholder={
              diameter !== 0 ? String(infoOfTool.inputData.vcMin) : "0"
            }
            onChange={(e) => setYourVc(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> m/min</span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">f = </span>
          <input
            type="number"
            className="form-control"
            placeholder={String(infoOfTool.outputData.fk)}
            onChange={(e) => setYourFz(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> mm/ob</span>
        </div>
        {/* _________ show resoult to your parameters "Vc" and "fz" _________ */}
        {yourVc !== 0 || yourFz !== 0 ? (
          <div>
            <span>Obliczanie twoich danych:</span>
            <div>
              <span>S = {yourS} ob/min</span>
            </div>
            <div>
              <span>F = {yourF} mm/min</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default Drilling
