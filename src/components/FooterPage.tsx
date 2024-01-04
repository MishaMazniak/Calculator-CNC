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
      fk: number
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
  let myTool: string

  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  const [typeMaterial, setTypeMaterial] = useState("steel")
  const [typeSelectTool, setTypeSelectTool] = useState("toolhss")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/vc-drilling/${typeMaterial}/${typeSelectTool}`
        )
        const data = await response.json()
        typeSelectTool === "toolhss"
          ? (myTool = data[0].toolhss)
          : typeSelectTool === "toolcarbide"
          ? (myTool = data[0].toolcarbide)
          : typeSelectTool === "toolfolding"
          ? (myTool = data[0].toolfolding)
          : NaN
        dispatch(
          addMatAndTool({
            typeMaterial: typeMaterial,
            typeTool: typeSelectTool,
            vc: myTool
          })
        )
      } catch (error) {
        console.error("Error", error)
      }
    }

    fetchData()
    console.log(infoOfTool)
  }, [typeMaterial, typeSelectTool, dispatch, infoOfTool])

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
          id="toolhss"
          defaultChecked
          onChange={(e) => {
            setTypeSelectTool((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="toolhss">HSS</label>
        <input
          type="radio"
          name="typeTools"
          id="toolcarbide"
          onChange={(e) => {
            setTypeSelectTool((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="toolcarbide">Węglikowy</label>
        <input
          type="radio"
          name="typeTools"
          id="toolfolding"
          onChange={(e) => {
            setTypeSelectTool((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="toolfolding">Płytkowe</label>
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
          f = <span>{infoOfTool.outputData.fk}</span> mm/ob
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
