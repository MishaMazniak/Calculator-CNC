import "./Milling.scss"
import ImgArrow from "../../assets/left-arrow.png"
import imgApDrilling from "../../assets/Ap-Ae-Drilling.png"
import imgApMilling from "../../assets/Ap-Ae-Milling.png"
import imgApMillRough from "../../assets/Ap-Ae-Mill-rough.png"
import imgApDrillRough from "../../assets/Ap-Ae_drill-rough..png"
import imgApDrillFold from "../../assets/Ap-Ae-Folding.png"
import imgApDrillFold2 from "../../assets/Ap-Ae-Folding2.png"
import {useDispatch, useSelector} from "react-redux"
import {useState, useEffect} from "react"
import {
  switchPage,
  addInputData,
  calculationPage
} from "../../redux/calculatorData"

interface RootState {
  calculatorData: {
    inputData: {
      typeTool: string
    }
  }
}

function HssRoughing() {
  const dispatch = useDispatch()
  // data from redux
  let infoOfTool = useSelector((state: RootState) => state.calculatorData)
  let typeTool = infoOfTool.inputData.typeTool

  // Data parameters
  const [d, setD] = useState(0)
  const [z, setZ] = useState(0)
  const [ap, setAp] = useState(0)
  const [ae, setAe] = useState(0)

  let q: number
  // coef Ae and Ap
  let coefAe: number = 1
  let coefAp: number = 1

  // Data machining type
  const [typeMachining, setTypeMachining] = useState("rough")

  // show the main page
  function mainPage() {
    dispatch(
      switchPage({
        choosOperation: ""
      })
    )
    dispatch(
      calculationPage({
        pageDrilling: false,
        pageMilling: false
      })
    )
  }
  // show z, ap, ae after input d
  function changeD(d: number) {
    setD(d)
    setAp(d)
    setAe(d * 0.1)
    // show Z
    if (typeTool === "toolhss" || typeTool === "toolcarbide") {
      if (d <= 20) setZ(4)
      else if (d > 20 && d <= 40) setZ(6)
      else if (d > 40) setZ(8)
    } else setZ(0)
  }

  useEffect(() => {
    // choose a coefficient "Ae" for different types of cuttings
    if (d !== 0) {
      q = d * d * 0.1
      if (typeMachining === "rough" && typeTool === "toolhss") {
        // dependense about "ae"
        ae <= 0.25 * d
          ? (coefAe = 1)
          : ae > 0.25 * d && ae <= 0.5 * d
          ? (coefAe = 0.75)
          : ae === d
          ? (coefAe = 0.5)
          : (coefAe = 0.5)
        // dependense about "ap"
        ap > d && ap < 2 * d
          ? (coefAp = 0.5)
          : ap > 2 * d
          ? (coefAp = 0.25)
          : (coefAp = 1)
      } else if (
        (typeMachining === "finishing" && typeTool === "toolhss") ||
        typeTool === "toolcarbide"
      ) {
        // dependense about "ae"
        ae <= 0.1 * d
          ? (coefAe = 1)
          : ae > 0.1 * d && ae <= 0.5 * d
          ? (coefAe = 0.65)
          : ae === d
          ? (coefAe = 0.4)
          : (coefAe = 0.4)
        // dependense about "ae"
        ap > d && ap < 2 * d
          ? (coefAp = 0.5)
          : ap > 2 * d
          ? (coefAp = 0.25)
          : (coefAp = 1)
      }
      dispatch(
        addInputData({
          d: d,
          z: z,
          ap: ap,
          ae: ae,
          q: q,
          typeMachining: typeMachining,
          coefAe: coefAe,
          coefAp: coefAp
        })
      )
    }
  }, [d, z, ap, ae, typeMachining])

  return (
    <div className="milling">
      <header className="row ms-md-5 my-nav">
        <div className="col-2 col-md-2 me-1 arrow" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-5 offset-md-1">Frezowanie</h1>
      </header>
      <div className="form-check my-4">
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
          Zgrubne
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
      <form className="row mt-md-4">
        <div className="col-8 offset-2 col-md-3 mt-4">
          <div className="input-group mb-3">
            <span className="input-group-text">d = </span>
            <input
              type="number"
              className="form-control"
              onChange={(e) => changeD(parseFloat(e.target.value))}
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">z = </span>
            <input
              type="number"
              className="form-control"
              value={z}
              onChange={(e) => setZ(parseFloat(e.target.value))}
            ></input>
            <span className="input-group-text"> szt</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ap = </span>
            <input
              type="number"
              className="form-control"
              value={ap}
              id="type-ap"
              onChange={(e) => setAp(parseFloat(e.target.value))}
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ae = </span>
            <input
              type="number"
              className="form-control"
              value={ae}
              id="type-ae"
              onChange={(e) => setAe(parseFloat(e.target.value))}
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="row mb-4"></div>
        </div>
        <div className="col-8 offset-2 col-md-4">
          {/* Select img for tools*/}
          {typeMachining === "rough" &&
          infoOfTool.inputData.typeTool === "toolhss" ? (
            <div className=" d-md-flex">
              <img className="me-md-4 mb-4" src={imgApDrillRough}></img>
              <img className="mb-4" src={imgApMillRough}></img>
            </div>
          ) : (typeMachining === "rough" || typeMachining === "finishing") &&
            infoOfTool.inputData.typeTool !== "toolfolding" ? (
            <div className=" d-md-flex">
              <img className="me-md-4 mb-4" src={imgApDrilling}></img>
              <img className="mb-4" src={imgApMilling}></img>
            </div>
          ) : (typeMachining === "rough" || typeMachining === "finishing") &&
            infoOfTool.inputData.typeTool === "toolfolding" ? (
            <div className=" d-md-flex">
              <img className="me-md-4 mb-4" src={imgApDrillFold}></img>
              <img className="mb-4" src={imgApDrillFold2}></img>
            </div>
          ) : (
            NaN
          )}
        </div>
      </form>
    </div>
  )
}
export default HssRoughing
