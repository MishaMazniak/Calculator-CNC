import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {addOutputData} from "../../redux/calculatorData"

interface RootState {
  calculatorData: {
    inputData: {
      typeMaterial: string
      typeTool: string
      d: number
    }
    pageDrilling: boolean
  }
}

function LogicCalcDrill() {
  const dispatch = useDispatch()

  let infoOfToolAndPage = useSelector(
    (state: RootState) => state.calculatorData
  )

  let diameter: number = infoOfToolAndPage.inputData.d

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

  useEffect(() => {
    if (infoOfToolAndPage.pageDrilling && infoOfToolAndPage.inputData.d !== 0) {
      switch (infoOfToolAndPage.inputData.typeTool) {
        case "tool-hss":
          toolsVcMin = 20
          toolsVcMax = 30
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
      // seleckt data Vc drills in different material from catalog
      switch (infoOfToolAndPage.inputData.typeMaterial) {
        case "steel":
          toolInMaterialVcMin = toolsVcMin * 1
          toolInMaterialVcMax = toolsVcMax * 1
          break
        case "aluminum":
          toolInMaterialVcMin = toolsVcMin * 2
          toolInMaterialVcMax = toolsVcMax * 2
          break
        case "stainles":
          toolInMaterialVcMin = toolsVcMin * 0.5
          toolInMaterialVcMax = toolsVcMax * 0.5
          break
        case "iron":
          toolInMaterialVcMin = toolsVcMin * 1.2
          toolInMaterialVcMax = toolsVcMax * 1.2
          break
        default:
          console.log("Not material")
      }
      // 'fk' for "info catalog"
      drillFMin = Number((diameter * 0.012).toFixed(3))
      drillFMax = diameter * 0.02
      // 'S' for "info catalog"
      rotateMin = Math.floor((toolInMaterialVcMin * 1000) / (diameter * 3.14))
      rotateMax = Math.floor((toolInMaterialVcMax * 1000) / (diameter * 3.14))
      // 'F' for "info catalog"
      servingMin = Math.floor(rotateMin * drillFMin)
      servingMax = Math.floor(rotateMax * drillFMax)
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
  }, [infoOfToolAndPage])

  return <div></div>
}
export default LogicCalcDrill
