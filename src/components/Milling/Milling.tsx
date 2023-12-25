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

  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  // Data parameters
  const [d, setD] = useState(0)
  const [z, setZ] = useState(0)
  const [ap, setAp] = useState(0)
  const [ae, setAe] = useState(0)
  // Ap and Ae placeholder
  const [apPlace, setApPlace] = useState("")
  const [aePlace, setAePlace] = useState("")

  let q: number

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
  // clean data Ap and Ae after change D
  function changeD(val: number) {
    setD(val)
    setAp(0)
    setAe(0)
  }
  // calculate Ap and Ae after input own data Ap or Ae
  function changeA(val: number, typeA: string) {
    if (d !== 0) {
      if (typeMachining === "rough") {
        q = d * d * 0.25 // processing area
        if (typeA === "type-ap") {
          setAp(val)
          setAe(Number((q / val).toFixed(2)))
        } else if (typeA === "type-ae") {
          setAe(val)
          setAp(q / val)
        }
      } else if (typeMachining === "finishing") {
        q = d * d * 0.1 // processing area
        if (typeA === "type-ap") {
          setAp(val)
          setAe(Number((q / val).toFixed(2)))
        } else if (typeA === "type-ae") {
          setAe(val)
          setAp(q / val)
        }
      }
    }
  }

  useEffect(() => {
    if (d !== 0) {
      if (typeMachining === "rough") {
        q = d * d * 0.25 // processing area
        setApPlace((1 * d).toString())
        setAePlace((0.25 * d).toString())
      } else if (typeMachining === "finishing") {
        q = d * d * 0.1 // processing area
        setApPlace((1 * d).toString())
        setAePlace((0.1 * d).toString())
      }
    }

    dispatch(
      addInputData({
        d: d,
        z: z,
        ap: ap,
        ae: ae,
        q: q,
        typeMachining: typeMachining
      })
    )
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
              onChange={(e) => setZ(parseFloat(e.target.value))}
            ></input>
            <span className="input-group-text"> szt</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ap = </span>
            <input
              type="number"
              className="form-control"
              placeholder={apPlace}
              value={ap === 0 ? "" : ap}
              id="type-ap"
              onChange={(e) => changeA(parseFloat(e.target.value), e.target.id)}
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ae = </span>
            <input
              type="number"
              className="form-control"
              placeholder={aePlace}
              value={ae === 0 ? "" : ae}
              id="type-ae"
              onChange={(e) => changeA(parseFloat(e.target.value), e.target.id)}
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="row mb-4"></div>
        </div>
        <div className="col-8 offset-2 col-md-4">
          {typeMachining === "rough" &&
          infoOfTool.inputData.typeTool === "tool-hss" ? (
            <div className=" d-md-flex">
              <img className="me-md-4 mb-4" src={imgApDrillRough}></img>
              <img className="mb-4" src={imgApMillRough}></img>
            </div>
          ) : (typeMachining === "rough" || typeMachining === "finishing") &&
            infoOfTool.inputData.typeTool !== "tool-folding" ? (
            <div className=" d-md-flex">
              <img className="me-md-4 mb-4" src={imgApDrilling}></img>
              <img className="mb-4" src={imgApMilling}></img>
            </div>
          ) : (typeMachining === "rough" || typeMachining === "finishing") &&
            infoOfTool.inputData.typeTool === "tool-folding" ? (
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
