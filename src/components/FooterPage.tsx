import "./HomePage.scss"
import matAlum from "../assets/iso-n-al.jpg"
import matStal from "../assets/iso-p-stal.jpg"
import matStalN from "../assets/iso-m-nier.jpg"
import matZel from "../assets/iso-k-zel.jpg"

import {useState, useEffect} from "react"
import {useSelector} from "react-redux"

interface RootState {
  calculatorData: {
    toolData: {typeTool: string; d: number; z: number; ap: number; ae: number}
  }
}

function FooterPage() {
  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  const [typeMaterial, setTypeMaterial] = useState("steel")

  // info about tool from redux
  const [diameter, setDiameter] = useState(0)
  const [typeTool, setTypeTool] = useState(infoOfTool.toolData.typeTool)

  useEffect(() => {
    console.log(infoOfTool.toolData.typeTool)
  }, [typeMaterial, infoOfTool.toolData.typeTool])

  return (
    <div className="footer-page">
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
        <h4>Dane katalogowe</h4>
        <div>
          Vc = <span>text</span>-<span>text</span> m/min
        </div>
        <div>
          f = <span>text</span>-<span>text</span> mm/zb
        </div>
        <div className="col-10 offset-1 mt-2 border"></div>
      </div>
      <div className="row resoult">
        <h4>Optymalne parametry</h4>
        <div className="col-6 col-md-4 offset-md-1 offset-3 mt-2">
          <p>
            S = <span>text</span>-<span>text</span> ob/min
          </p>
        </div>
        <div className="col-6 col-md-4 offset-md-2 offset-3 mt-2">
          <p>
            F = <span>text</span>-<span>text</span> mm/min
          </p>
        </div>
      </div>
    </div>
  )
}
export default FooterPage
