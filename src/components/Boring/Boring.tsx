import "./Boring.scss"
import {useSelector} from "react-redux"
import ImgArrow from "../../assets/left-arrow.png"
import imgWytaczak from "../../assets/wytaczak-info.png"
import imgWytaczakWyk from "../../assets/wytaczakWyk.png"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {
  switchPage,
  addD,
  calculationPage,
  addOutputData,
  addInputDataBoring
} from "../../redux/calculatorData"

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

  let material = infoOfTool.inputData.typeMaterial

  // Data machining type
  const [typeMachining, setTypeMachining] = useState("rough")

  // calculate according to your own parameters
  const [yourVc, setYourVc] = useState(0)
  const [yourFz, setYourFz] = useState(0)
  const [yourS, setYourS] = useState(0)
  const [yourF, setYourF] = useState(0)
  let mathVc: number

  // Data parameters
  const [diameter, setDiameter] = useState(0)
  const [d_mandrel, setD_mandrel] = useState(0)
  const [l_mandrel, setL_mandrel] = useState(0)
  const [inputVc, setInputVc] = useState(0)
  let tableD: number
  let tableCoef: number
  let coefD: number

  let dbVc_Min: number
  let dbVc_Max: number
  let dbF_Min: number
  let dbF_Max: number
  let dbAp_Min: number
  let dbAp_Max: number
  let dbR_plate: number

  // Resoult
  // 'S' resoult from FooterPage
  let rotateMin: number
  let rotateMax: number
  // 'F' resoult from FooterPage
  let servingMin: number
  let servingMax: number

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
  function calcData() {
    // dbVc_Min = data.vc_Min
    // dbVc_Max = data[0].vc_Max
    // dbF_Min = data[0].f_Min
    // dbF_Max = data[0].f_Max
    // dbAp_Min = data[0].ap_Min
    // dbAp_Max = data[0].ap_Max
    // dbR_plate = data[0].R_plate
    // Resoult
    setInputVc(dbVc_Min)
    // 'S' for "info catalog"
    rotateMin = Math.floor((dbVc_Min * 1000) / (diameter * 3.14))
    rotateMax = Math.floor((dbVc_Max * 1000) / (diameter * 3.14))
    // 'F' for "info catalog"
    servingMin = Math.floor(rotateMin * dbF_Min)
    servingMax = Math.floor(rotateMax * dbF_Max)
    dispatch(
      addD({
        diameter: diameter
      })
    )
    dispatch(
      addInputDataBoring({
        typeMachining: typeMachining,
        R_plate: dbR_plate,
        f_Min: dbF_Min,
        f_Max: dbF_Max,
        ap_Min: dbAp_Min,
        ap_Max: dbAp_Max
      })
    )
    dispatch(
      addOutputData({
        // info for catalog
        vcMin: dbVc_Min,
        vcMax: dbVc_Max,
        fk: dbF_Min,
        //resoult
        sMin: rotateMin,
        sMax: rotateMax,
        fMin: servingMin,
        fMax: servingMax
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

    if (d_mandrel !== 0 && l_mandrel !== 0 && diameter !== 0) {
      coefD = l_mandrel / d_mandrel
      coefD < 4
        ? (tableCoef = 2.5)
        : coefD < 6.3
        ? (tableCoef = 4)
        : coefD > 6.3
        ? (tableCoef = 6.3)
        : ""
      // get data from from table "boring_rough"
      if (typeMachining === "rough") {
        diameter <= 37
          ? (tableD = 37)
          : diameter > 37 && diameter <= 120
          ? (tableD = 120)
          : diameter > 120
          ? (tableD = 121)
          : ""
        const fetchMillData = async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/boring_rough/${material}/${tableD}/${tableCoef}`
            )
            const data = await response.json()
            // setInputVc(data[0].vc_Min)
            dbVc_Min = data[0].vc_Min
            dbVc_Max = data[0].vc_Max
            dbF_Min = data[0].f_Min
            dbF_Max = data[0].f_Max
            dbAp_Min = data[0].ap_Min
            dbAp_Max = data[0].ap_Max
            dbR_plate = data[0].R_plate
            calcData()
          } catch (error) {
            console.error("Error", error)
          }
        }
        fetchMillData()
      } else if (typeMachining === "finishing") {
        const fetchMillData = async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/boring_finishing/${material}/${tableCoef}`
            )
            const data = await response.json()
            dbVc_Min = data[0].vc_Min
            dbVc_Max = data[0].vc_Max
            dbF_Min = data[0].f_Min
            dbF_Max = data[0].f_Max
            dbAp_Min = data[0].ap_Min
            dbAp_Max = data[0].ap_Max
            dbR_plate = data[0].R_plate
            calcData()
          } catch (error) {
            console.error("Error", error)
          }
        }
        fetchMillData()
      }
    }
  }, [diameter, d_mandrel, l_mandrel, material, yourVc, yourFz, typeMachining])

  return (
    <div className="drilling">
      <header className="row ms-md-5 pt-3 mb-3 my-nav">
        <div className="col-2 col-md-2 arrow mx-2" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-3 offset-md-2">Rozwiercanie</h1>
      </header>
      <div className="form-check my-4">
        {/* _________ Select typ machining "rough" or "finishing" for tools HSS _________*/}
        <input
          className="mx-2"
          type="radio"
          name="typeOperation"
          id="rough"
          defaultChecked
          onChange={(e) => {
            setTypeMachining((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label className="me-5" htmlFor="rough">
          Wstępne
        </label>
        <input
          className="mx-2"
          type="radio"
          name="typeOperation"
          id="finishing"
          onChange={(e) => {
            setTypeMachining((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="finishing">Wykańczające</label>
      </div>
      <div className="col-8 offset-2 col-md-4 offset-md-4">
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">D = </span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> mm</span>
        </div>
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">d = </span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setD_mandrel(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> mm</span>
        </div>
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">L = </span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setL_mandrel(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> mm</span>
        </div>
        <div className="input-group mb-3">
          {/* _________ input form for your data "Vc" and "fz" _________ */}
          <span className="input-group-text">vc = </span>
          <input
            type="number"
            className="form-control"
            placeholder={diameter !== 0 ? String(inputVc) : "0"}
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
      <div className="col-12">
        <div className="accordion mx-4 row" id="accordionExample">
          <div className="accordion-item col-12 my_accordion">
            <h2 className="accordion-header my_accordion_hd">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseOff"
              >
                {typeMachining === "rough" ? "Wstępne" : "Wykańczające"}
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse show mt-4"
              data-bs-parent="#accordionExample"
            >
              {typeMachining === "rough" ? (
                <img className="me-md-4 mb-4 my_boring" src={imgWytaczak}></img>
              ) : (
                <img
                  className="me-md-4 mb-4 my_boring"
                  src={imgWytaczakWyk}
                ></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Drilling
