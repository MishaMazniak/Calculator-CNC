import "./HomePage.scss"

import matAlum from "../assets/iso-n-al.jpg"
import matStal from "../assets/iso-p-stal.jpg"
import matStalN from "../assets/iso-m-nier.jpg"
import matZel from "../assets/iso-k-zel.jpg"
import ImgInfo from "../../src/assets/info.png"

import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {addMatAndTool, addInputPlate} from "../redux/calculatorData"

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
    inputData: {
      typeMachining: string
      plate: string
    }
    inputPlate: {
      ap_Min: number
      ap_Max: number
      f_Min: number
      f_Max: number
      hardness: number
      website: string
    }
    inputDataBoring: {
      R_plate: number
      ap_Min: number
      ap_Max: number
    }
    pageDrilling: boolean
    pageMilling: boolean
    pageBoring: boolean
    cleanMyInput: boolean
    myLang: string
  }
}

function FooterPage() {
  const dispatch = useDispatch()
  let myVcMin: string
  let myVcMax: string

  let infoOfTool = useSelector((state: RootState) => state.calculatorData)

  let typeMachining: string = infoOfTool.inputData.typeMachining
  let typePlate: string = infoOfTool.inputData.plate
  let lang: string = infoOfTool.myLang

  let ap_Min = infoOfTool.inputPlate.ap_Min
  let ap_Max = infoOfTool.inputPlate.ap_Max
  let f_Min = infoOfTool.inputPlate.f_Min
  let f_Max = infoOfTool.inputPlate.f_Max
  let hardness = infoOfTool.inputPlate.hardness
  let website = infoOfTool.inputPlate.website

  // text for differents language
  const [nameTypeTool, setNameTypeTool] = useState("")
  const [nameTypeMaterial, setNameTypeMaterial] = useState("")
  const [nameDataCatalo, setNameDataCatalo] = useState("")
  const [nameDataCalcul, setNameDataCalcul] = useState("")
  const [nameRev, setNameRev] = useState("")
  const [namePlate, setNamePlate] = useState("")
  const [nameHardness, setNameHardness] = useState("")
  const [nameImgPlate, setNameImgPlate] = useState("")

  // name and material for show in accordion
  const [nameTool, setNameTool] = useState("HSS")
  const [iconMaterial, setIconMaterial] = useState(matStal)

  const [typeMaterial, setTypeMaterial] = useState("steel")
  const [typeSelectTool, setTypeSelectTool] = useState("toolhss")

  useEffect(() => {
    // name tools for accordion
    typeSelectTool === "toolhss"
      ? setNameTool("HSS")
      : typeSelectTool === "toolcarbide"
      ? setNameTool("VHM")
      : setNameTool("Płytkowe")
    // icon material for accordion
    typeMaterial === "steel"
      ? setIconMaterial(matStal)
      : typeMaterial === "aluminum"
      ? setIconMaterial(matAlum)
      : typeMaterial === "stainles"
      ? setIconMaterial(matStalN)
      : setIconMaterial(matZel)
    if (infoOfTool.pageDrilling) {
      // data base Vc for drilling
      const fetchDrillData = async () => {
        try {
          const response = await fetch(
            `https://calculator-cnc.pl/vc_drilling/${typeMaterial}/${typeSelectTool}`
            // `http://localhost:5000/vc_drilling/${typeMaterial}/${typeSelectTool}`
          )
          const data = await response.json()
          saveFetch(data)
        } catch (error) {
          console.error("Error", error)
        }
      }
      fetchDrillData()
    }
    if (infoOfTool.pageMilling) {
      // data base Vc for milling
      if (typeSelectTool === "toolhss" && typeMachining === "rough") {
        // data base Vc for milling rough tool hss
        const fetchMillData = async () => {
          try {
            const response = await fetch(
              `https://calculator-cnc.pl/vc_milling_rough/${typeMaterial}/${typeSelectTool}`
              // `http://localhost:5000/vc_milling_rough/${typeMaterial}/${typeSelectTool}`
            )
            const data = await response.json()
            saveFetch(data)
          } catch (error) {
            console.error("Error", error)
          }
        }
        fetchMillData()
      } else if (
        (typeSelectTool === "toolhss" && typeMachining === "finishing") ||
        typeSelectTool === "toolcarbide"
      ) {
        // data base Vc for milling tool carbide and hss finishing
        const fetchMillData = async () => {
          try {
            const response = await fetch(
              `https://calculator-cnc.pl/vc_milling/${typeMaterial}/${typeSelectTool}`
              // `http://localhost:5000/vc_milling/${typeMaterial}/${typeSelectTool}`
            )
            const data = await response.json()
            saveFetch(data)
          } catch (error) {
            console.error("Error", error)
          }
        }
        fetchMillData()
      } else if (typeSelectTool === "toolfolding") {
        // database for plate tool folding
        const fetchMillData = async () => {
          try {
            const response = await fetch(
              `https://calculator-cnc.pl/milling_plates/${typeMaterial}/${typePlate}`
              // `http://localhost:5000/milling_plates/${typeMaterial}/${typePlate}`
            )
            const data = await response.json()
            dispatch(
              addMatAndTool({
                typeMaterial: typeMaterial,
                typeTool: typeSelectTool,
                vcMin: data[0].vc_Min,
                vcMax: data[0].vc_Max
              })
            )
            dispatch(
              addInputPlate({
                ap_Max: data[0].ap_Max,
                ap_Min: data[0].ap_Min,
                f_Max: data[0].f_Max,
                f_Min: data[0].f_Min,
                hardness: data[0].hardness,
                name: data[0].name,
                type: data[0].type,
                vc_Max: data[0].vc_Max,
                vc_Min: data[0].vc_Min,
                website: data[0].website
              })
            )
          } catch (error) {
            alert("Tej płyty nie używa się do materiału - " + typeMaterial)
            console.error("Error", error)
          }
        }
        fetchMillData()
      }
    }
    if (infoOfTool.pageBoring) {
      dispatch(
        addMatAndTool({
          typeMaterial: typeMaterial
        })
      )
    }
    if (lang === "Pl") {
      setNameTypeTool("Typ narzędzia")
      setNameTypeMaterial("Typ materiału")
      setNameDataCatalo("Dane katalogowe")
      setNameDataCalcul("Obliczanie według katalogu")
      setNameRev("ob")
      setNamePlate("Płytkowe")
      setNameHardness("Twardość")
      if (nameTool === "Płytkowe") {
        setNameImgPlate("Płytkowe")
      }
    } else if (lang === "Ua") {
      setNameTypeTool("Тип інструменту")
      setNameTypeMaterial("Тип матеріалу")
      setNameDataCatalo("Дані з каталогу")
      setNameDataCalcul("Обрахунок згідно з каталогом")
      setNameRev("об")
      setNamePlate("Твердосплав")
      setNameHardness("Твердість")
      if (nameTool === "Płytkowe") {
        setNameImgPlate("Твердосплав")
      }
    } else if (lang === "En") {
      setNameTypeTool("Type tool")
      setNameTypeMaterial("Type material")
      setNameDataCatalo("Data from the catalog")
      setNameDataCalcul("Calculation")
      setNameRev("rev")
      setNamePlate("Plate")
      setNameHardness("Hardness")
      if (nameTool === "Płytkowe") {
        setNameImgPlate("Plate")
      }
    }
  }, [typeMaterial, typeSelectTool, typeMachining, dispatch, infoOfTool, lang])

  // get value from data base
  function saveFetch(data: any) {
    if (typeSelectTool === "toolhss") {
      myVcMin = data[0].toolhss
      myVcMax = data[0].toolhssMax
    } else if (typeSelectTool === "toolcarbide") {
      myVcMin = data[0].toolcarbide
      myVcMax = data[0].toolcarbideMax
    } else if (typeSelectTool === "toolfolding") {
      myVcMin = data[0].toolfolding
      myVcMax = data[0].toolfoldingMax
    }
    dispatch(
      addMatAndTool({
        typeMaterial: typeMaterial,
        typeTool: typeSelectTool,
        vcMin: myVcMin,
        vcMax: myVcMax
      })
    )
  }

  return (
    <div className="footer-page">
      {infoOfTool.pageDrilling ? (
        <LogicCalcDrill></LogicCalcDrill>
      ) : infoOfTool.pageMilling ? (
        <LogicCalcMill></LogicCalcMill>
      ) : (
        ""
      )}
      {/* _________________ Type tools________________ */}
      {!infoOfTool.pageBoring ? (
        <div className="accordion mx-4 row" id="accordionExample">
          <div className="accordion-item col-12 my_accordion">
            <h2 className="accordion-header my_accordion_hd">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOff"
              >
                {nameTypeTool} -{" "}
                {nameTool === "Płytkowe" ? nameImgPlate : nameTool}
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body row my_accordion_bt">
                <div className="form-check my-2 ms-3 my-radio-tools">
                  <input
                    type="radio"
                    name="typeTools"
                    id="toolhss"
                    defaultChecked
                    onChange={(e) => {
                      setTypeSelectTool(
                        (e.currentTarget as HTMLButtonElement).id
                      )
                    }}
                  ></input>
                  <label htmlFor="toolhss">HSS</label>
                  <input
                    type="radio"
                    name="typeTools"
                    id="toolcarbide"
                    onChange={(e) => {
                      setTypeSelectTool(
                        (e.currentTarget as HTMLButtonElement).id
                      )
                    }}
                  ></input>
                  <label htmlFor="toolcarbide">VHM</label>
                  <input
                    type="radio"
                    name="typeTools"
                    id="toolfolding"
                    onChange={(e) => {
                      setTypeSelectTool(
                        (e.currentTarget as HTMLButtonElement).id
                      )
                    }}
                  ></input>
                  <label htmlFor="toolfolding">{namePlate}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* _________________ Type materials________________ */}
      <div className="accordion mx-4 row" id="accordionExample">
        <div className="accordion-item col-12 my_accordion">
          <h2 className="accordion-header my_accordion_hd">
            <button
              className="accordion-button my_mat_bt"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseOff"
            >
              {nameTypeMaterial} -{" "}
              <img
                src={iconMaterial}
                className="icon_material"
                alt="icon Materials"
                title="material ISO"
              ></img>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body row my_accordion_bt">
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
                    <img
                      src={matStal}
                      alt="ISO Materials"
                      title="Carbide steel"
                    ></img>
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
                    <img
                      src={matAlum}
                      alt="ISO Materials"
                      title="Aluminum"
                    ></img>
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
                    <img
                      src={matStalN}
                      alt="ISO Materials"
                      title="Stainless"
                    ></img>
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
                    <img
                      src={matZel}
                      alt="ISO Materials"
                      title="Cast iron"
                    ></img>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* _______________ info catalog _______________ */}
      <div className="row mt-1 info-choosed">
        {/* select img */}
        {typeSelectTool === "toolfolding" && infoOfTool.pageMilling ? (
          <h4 className="web_info">
            {nameDataCatalo}
            <a href={website}>
              <img
                src={ImgInfo}
                className="imgInfo"
                alt="info icon"
                title="more info"
              ></img>
            </a>
          </h4>
        ) : (
          <h4>{nameDataCatalo}</h4>
        )}
        <div>
          Vc = <span>{infoOfTool.outputData.vcMin}</span> -{" "}
          <span>{infoOfTool.outputData.vcMax}</span> m/min
        </div>
        <div>
          f = <span>{infoOfTool.outputData.fk}</span> mm/{nameRev}
        </div>
        {/* show data from catalog for folding tools */}
        {typeSelectTool === "toolfolding" && infoOfTool.pageMilling ? (
          <div>
            <div>
              fz = <span className="text-danger">{f_Min}</span> -{" "}
              <span className="text-warning">{f_Max}</span> mm/z
            </div>
            <div>
              ap = <span className="text-warning">{ap_Min}</span> -{" "}
              <span className="text-danger">{ap_Max}</span> mm
            </div>
            <div>
              {nameHardness} = <span className="text-info">{hardness}</span> HB
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* show data from catalog for boring tools */}
        {infoOfTool.pageBoring ? (
          <div>
            <div>
              fk = <span>{f_Min}</span> - <span>{f_Max}</span> mm/{nameRev}
            </div>
            <div>
              ap = <span>{infoOfTool.inputDataBoring.ap_Min}</span> -{" "}
              <span>{infoOfTool.inputDataBoring.ap_Max}</span> mm
            </div>
            <div>
              R = <span>{infoOfTool.inputDataBoring.R_plate}</span> mm
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="col-10 offset-1 mt-2 border"></div>
      </div>
      {/* ____________ Parameters ____________ */}
      <div className="row mt-1 resoult">
        <h4>{nameDataCalcul}</h4>
        <div className="col-6 col-md-4 offset-md-1 offset-3 mt-1">
          <p>
            S = <span>{infoOfTool.outputData.sMin}</span> -{" "}
            <span>{infoOfTool.outputData.sMax}</span> {nameRev}/min
          </p>
        </div>
        <div className="col-6 col-md-4 offset-md-2 offset-3 mt-1">
          <p>
            F = <span>{infoOfTool.outputData.fMin}</span> -{" "}
            <span>{infoOfTool.outputData.fMax}</span> mm/min
          </p>
        </div>
      </div>
    </div>
  )
}
export default FooterPage
