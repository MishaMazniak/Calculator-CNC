import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {addOutputData} from "../../redux/calculatorData"

interface RootState {
  calculatorData: {
    inputData: {
      typeMaterial: string
      typeTool: string
      d: number
      z: number
      ap: number
      ae: number
      q: number
    }
    pageMilling: boolean
  }
}

function LogicCalcMill() {
  const dispatch = useDispatch()

  let infoRedux = useSelector((state: RootState) => state.calculatorData)
  let reduxInput = infoRedux.inputData

  let diameter: number = reduxInput.d
  let q: number = reduxInput.q

  // show in "info catalog"
  // data 'Vc' tools for "info catalog" from FooterPage
  let toolInMaterialVcMin: number
  let toolInMaterialVcMax: number
  // data 'f' for "info catalog" from FooterPage
  let drillFMin: number
  let drillFMax: number
  // data 'S' for "info catalog" from FooterPage
  let rotateMin: number
  let rotateMax: number
  // data 'F' for "info catalog" from FooterPage
  let servingMin: number
  let servingMax: number

  // math variable
  // data 'Vc' tools from catalog
  let toolsVcMin: number
  let toolsVcMax: number

  // data 'Fz' tools from catalog
  let fz_kat: number = 0.05
  let fz_in: number
  useEffect(() => {
    console.log(infoRedux)
    if (infoRedux.pageMilling && reduxInput.d !== 0) {
      // seleckt data Vc milling in different type tools from catalog
      switch (reduxInput.typeTool) {
        case "tool-hss":
          toolsVcMin = 20
          toolsVcMax = 35
          break
        case "tool-carbide":
          toolsVcMin = 50
          toolsVcMax = 70
          break
        case "tool-folding":
          toolsVcMin = 130
          toolsVcMax = 180
          break
        default:
          console.log("Not tool")
      }
      // seleckt data Vc milling in different material from catalog
      switch (reduxInput.typeMaterial) {
        case "steel":
          toolInMaterialVcMin = toolsVcMin * 1
          toolInMaterialVcMax = toolsVcMax * 1
          break
        case "aluminum":
          toolInMaterialVcMin = toolsVcMin * 3
          toolInMaterialVcMax = toolsVcMax * 5
          break
        case "stainles":
          toolInMaterialVcMin = toolsVcMin * 0.75
          toolInMaterialVcMax = toolsVcMax * 0.95
          break
        case "iron":
          toolInMaterialVcMin = toolsVcMin * 0.5
          toolInMaterialVcMax = toolsVcMax * 1.4
          break
        default:
          console.log("Not material")
      }
      if (reduxInput.ap !== 0 && reduxInput.ae !== 0) {
        // check ap and ae
        if (reduxInput.ae <= 0.25 * diameter) {
          fz_in = 1 * fz_kat
        } else if (
          reduxInput.ae > 0.25 * diameter &&
          reduxInput.ae <= 0.5 * diameter
        ) {
          fz_in = 0.8 * fz_kat
        } else if (reduxInput.ae == diameter) {
          fz_in = 0.4 * fz_kat
        }
      }
      // 'S' for "info catalog"
      rotateMin = Math.floor((toolInMaterialVcMin * 1000) / (diameter * 3.14))
      rotateMax = Math.floor((toolInMaterialVcMax * 1000) / (diameter * 3.14))
      dispatch(
        addOutputData({
          vcMin: toolInMaterialVcMin,
          vcMax: toolInMaterialVcMax,
          fkMin: drillFMin,
          fkMax: drillFMax,
          sMin: rotateMin,
          sMax: rotateMax,
          fMin: servingMin,
          fMax: servingMax
        })
      )
    }
  }, [infoRedux])

  return <div></div>
}
export default LogicCalcMill
