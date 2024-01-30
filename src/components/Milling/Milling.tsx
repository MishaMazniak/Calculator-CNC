import "./Milling.scss"
import ImgArrow from "../../assets/left-arrow.png"
import ImgInfo from "../../assets/info.png"
import imgApDrilling from "../../assets/Ap-Ae-Drilling.png"
import imgApMilling from "../../assets/Ap-Ae-Milling.png"
import imgApMillRough from "../../assets/Ap-Ae-Mill-rough.png"
import imgApDrillRough from "../../assets/Ap-Ae_drill-rough..png"

import imgADKT from "../../assets/pl-ADKT.png"
import imgODMT from "../../assets/pl-ODMT.png"
import imgRDMT from "../../assets/pl-RDMT.png"
import imgSEKT from "../../assets/pl-SEKT.png"
import imgTNGX from "../../assets/pl-TNGX.png"
import imgTNGXm from "../../assets/pl-TNGX-M.png"
import imgTPKR from "../../assets/pl-TPKR.png"
import imgVCGT from "../../assets/pl-VCGT.png"

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
      typeMaterial: string
      z: number
    }
    inputPlate: {
      hardness: number
      name: string
      type: string
      website: string
      vc_Min: number
      f_Max: number
    }
  }
}

function HssRoughing() {
  const dispatch = useDispatch()
  // data from redux
  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  let typeTool: string = infoOfTool.inputData.typeTool

  let name: string = infoOfTool.inputPlate.name
  let type: string = infoOfTool.inputPlate.type
  let website: string = infoOfTool.inputPlate.website
  let vc_Min: number = infoOfTool.inputPlate.vc_Min
  let f_Max: number = infoOfTool.inputPlate.f_Max

  // Data parameters
  const [d, setD] = useState(0)
  const [z, setZ] = useState(0)
  const [ap, setAp] = useState(0)
  const [ae, setAe] = useState(0)
  const [plate, setPlate] = useState("adkt")

  // calculate according to your own parameters
  const [yourVc, setYourVc] = useState(0)
  const [yourFz, setYourFz] = useState(0)
  const [yourS, setYourS] = useState(0)
  const [yourF, setYourF] = useState(0)

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
    let valAe: number
    setD(d)
    // show ap, ae
    if (typeTool === "toolhss" || typeTool === "toolcarbide") {
      setAp(d)
      valAe = Number((d * 0.1).toFixed(2))
      setAe(valAe)
    }
    // show Z
    if (typeTool === "toolhss" || typeTool === "toolcarbide") {
      if (d <= 20) setZ(4)
      else if (d > 20 && d <= 40) setZ(6)
      else if (d > 40) setZ(8)
    } else if (typeTool === "toolfolding") {
      setZ(2)
    } else setZ(0)
  }

  useEffect(() => {
    // choose a coefficient "Ae" "Ap" for different types of cuttings
    if (d !== 0) {
      if (typeTool !== "toolfolding") {
        if (typeMachining === "rough" && typeTool === "toolhss") {
          // dependense about "ae" for rough cutting
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
          // dependense about "ae" for finishing cutting and work tool carbide
          ae <= 0.1 * d
            ? (coefAe = 1)
            : ae > 0.1 * d && ae <= 0.5 * d
            ? (coefAe = 0.65)
            : ae === d
            ? (coefAe = 0.4)
            : (coefAe = 0.4)
          // dependense about "ap"
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
            typeMachining: typeMachining,
            typeTool: infoOfTool.inputData.typeTool,
            coefAe: coefAe,
            coefAp: coefAp,
            plate: "adkt"
          })
        )
      } else if (typeTool === "toolfolding") {
        // calculations according to your parameters Vc and Fz
        yourVc !== 0 ? setYourS(Math.floor((yourVc * 1000) / (d * 3.14))) : NaN
        yourFz !== 0 ? setYourF(Math.floor(yourS * z * yourFz)) : NaN

        dispatch(
          addInputData({
            d: d,
            z: z,
            plate: plate,
            typeMachining: typeMachining
          })
        )
      }
    }
  }, [d, z, ap, ae, plate, yourVc, yourFz, typeMachining, typeTool])

  return (
    <div className="milling">
      <header className="row ms-md-5 my-nav">
        <div className="col-2 col-md-2 me-1 arrow" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-5 offset-md-1">Frezowanie</h1>
      </header>
      {infoOfTool.inputData.typeTool === "toolhss" ? (
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
      ) : (
        ""
      )}

      <form className="row mt-md-4">
        {infoOfTool.inputData.typeTool === "toolhss" ||
        infoOfTool.inputData.typeTool === "toolcarbide" ? (
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
                placeholder={String(ap)}
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
                placeholder={String(ae)}
                id="type-ae"
                onChange={(e) => setAe(parseFloat(e.target.value))}
              ></input>
              <span className="input-group-text"> mm</span>
            </div>
            <div className="row mb-4"></div>
          </div>
        ) : infoOfTool.inputData.typeTool === "toolfolding" ? (
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
              <span className="input-group-text">vc = </span>
              <input
                type="number"
                className="form-control"
                placeholder={String(vc_Min)}
                onChange={(e) => setYourVc(parseFloat(e.target.value))}
              ></input>
              <span className="input-group-text"> m/min</span>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">fz = </span>
              <input
                type="number"
                className="form-control"
                placeholder={String(f_Max)}
                onChange={(e) => setYourFz(parseFloat(e.target.value))}
              ></input>
              <span className="input-group-text"> mm/z</span>
            </div>
            {/* show your resoult */}
            {yourVc !== 0 ? (
              <div>
                <span>Resultat:</span>
                <div>
                  <span className="">S = {yourS} ob/min</span>
                </div>
                <div>
                  <span className="">F = {yourF} mm/min</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          NaN
        )}
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
          ) : infoOfTool.inputData.typeTool === "toolfolding" ? (
            <div className="row imgPlate">
              <span>
                Płytka: {name.toUpperCase()} {type}
                <a href={website}>
                  <img
                    src={ImgInfo}
                    className="imgInfo"
                    alt="info icon"
                    title="info icon"
                  ></img>
                </a>
              </span>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="adkt"
                  defaultChecked
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="adkt">
                  <img src={imgADKT} alt="type plate" title="plate adkt"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="odmt"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="odmt">
                  <img src={imgODMT} alt="type plate" title="odmt"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="rdmt"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="rdmt">
                  <img src={imgRDMT} alt="type plate" title="rdmt"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="sekt"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="sekt">
                  <img src={imgSEKT} alt="type plate" title="sekt"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="tpkr"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="tpkr">
                  <img src={imgTPKR} alt="type plate" title="tpkr"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="tngx-m"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="tngx-m">
                  <img src={imgTNGXm} alt="type plate" title="tngx-m"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="tngx"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="tngx">
                  <img src={imgTNGX} alt="type plate" title="tngx"></img>
                </label>
              </div>
              <div className="col-6 col-md-3">
                <input
                  type="radio"
                  name="typePlate"
                  id="vcgt"
                  onChange={(e) => {
                    setPlate((e.currentTarget as HTMLButtonElement).id)
                  }}
                ></input>
                <label htmlFor="vcgt">
                  <img src={imgVCGT} alt="type plate" title="vcgt"></img>
                </label>
              </div>
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
