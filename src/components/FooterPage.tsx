import "./HomePage.scss"

import matAlum from "../assets/iso-n-al.jpg"
import matStal from "../assets/iso-p-stal.jpg"
import matStalN from "../assets/iso-m-nier.jpg"
import matZel from "../assets/iso-k-zel.jpg"

import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {addMatAndTool} from "../redux/calculatorData"

import LogicCalcDrill from "./Calculation/LogicCalcDrill"
import LogicCalcMill from "./Calculation/LogicCalcMill"

interface RootState {
  calculatorData: {
    outputData: {
      vcMin: number
      vcMax: number
      fkMin: number
      fkMax: number
      sMax: number
      sMin: number
      fMin: number
      fMax: number
    }
    pageDrilling: boolean
    pageMilling: boolean
  }
}

function FooterPage() {
  const dispatch = useDispatch()

  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  const [typeMaterial, setTypeMaterial] = useState("steel")
  const [typeSelectTool, setTypeSelectTool] = useState("tool-hss")

  useEffect(() => {
    dispatch(
      addMatAndTool({
        typeMaterial: typeMaterial,
        typeTool: typeSelectTool
      })
    )
  }, [typeMaterial, typeSelectTool, infoOfTool.outputData])

  return (
    <div className="footer-page">
      {infoOfTool.pageDrilling ? (
        <LogicCalcDrill></LogicCalcDrill>
      ) : infoOfTool.pageMilling ? (
        <LogicCalcMill></LogicCalcMill>
      ) : (
        NaN
      )}
      <h4>Typ Narzędzia</h4>
      <div className="form-check my-4 my-radio-tools">
        <input
          type="radio"
          name="typeTools"
          id="tool-hss"
          defaultChecked
          onChange={(e) => {
            setTypeSelectTool((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="tool-hss">HSS</label>
        <input
          type="radio"
          name="typeTools"
          id="tool-carbide"
          onChange={(e) => {
            setTypeSelectTool((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="tool-carbide">Węglikowy</label>
        <input
          type="radio"
          name="typeTools"
          id="tool-folding"
          onChange={(e) => {
            setTypeSelectTool((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="tool-folding">Płytkowe</label>
      </div>
      <h4>Typ materialu</h4>
      <div className="row my-radio">
        <div className="col-6 col-md-3">
          <input
            type="radio"
            name="typeMaterials"
            id="steel"
            defaultChecked
            onChange={(e) => {
              setTypeMaterial((e.currentTarget as HTMLButtonElement).id)
            }}
          ></input>
          <label htmlFor="steel">
            <img src={matStal} alt="ISO Materials" title="Carbide steel"></img>
          </label>
        </div>
        <div className="col-6 col-md-3">
          <input
            type="radio"
            name="typeMaterials"
            id="aluminum"
            onChange={(e) => {
              setTypeMaterial((e.currentTarget as HTMLButtonElement).id)
            }}
          ></input>
          <label htmlFor="aluminum">
            <img src={matAlum} alt="ISO Materials" title="Aluminum"></img>
          </label>
        </div>
        <div className="col-6 col-md-3">
          <input
            type="radio"
            name="typeMaterials"
            id="stainles"
            onChange={(e) => {
              setTypeMaterial((e.currentTarget as HTMLButtonElement).id)
            }}
          ></input>
          <label htmlFor="stainles">
            <img src={matStalN} alt="ISO Materials" title="Stainles"></img>
          </label>
        </div>
        <div className="col-6 col-md-3">
          <input
            type="radio"
            name="typeMaterials"
            id="iron"
            onChange={(e) => {
              setTypeMaterial((e.currentTarget as HTMLButtonElement).id)
            }}
          ></input>
          <label htmlFor="iron">
            <img src={matZel} alt="ISO Materials" title="Cast iron"></img>
          </label>
        </div>
      </div>
      <div className="row info-choosed">
        <div className="col-10 offset-1 mb-2 border"></div>
        {/* info catalog */}
        <h4>Dane katalogowe</h4>
        <div>
          Vc = <span>{infoOfTool.outputData.vcMin}</span>-
          <span>{infoOfTool.outputData.vcMax}</span> m/min
        </div>
        <div>
          f = <span>{infoOfTool.outputData.fkMin}</span>-
          <span>{infoOfTool.outputData.fkMax}</span> mm/ob
        </div>
        <div className="col-10 offset-1 mt-2 border"></div>
      </div>
      <div className="row resoult">
        <h4>Optymalne parametry</h4>
        <div className="col-6 col-md-4 offset-md-1 offset-3 mt-2">
          <p>
            S = <span>{infoOfTool.outputData.sMin}</span>-
            <span>{infoOfTool.outputData.sMax}</span> ob/min
          </p>
        </div>
        <div className="col-6 col-md-4 offset-md-2 offset-3 mt-2">
          <p>
            F = <span>{infoOfTool.outputData.fMin}</span>-
            <span>{infoOfTool.outputData.fMax}</span> mm/min
          </p>
        </div>
      </div>
    </div>
  )
}
export default FooterPage
