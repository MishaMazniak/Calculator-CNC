import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {addOutputData} from "../../redux/calculatorData"

interface RootState {
  calculatorData: {
    inputData: {
      typeMaterial: string
      typeTool: string
      d: number
      vc: number
    }
    pageDrilling: boolean
  }
}

function LogicCalcDrill() {
  const dispatch = useDispatch()

  let infoOfToolAndPage = useSelector(
    (state: RootState) => state.calculatorData
  )
  // data from redux
  let typeMaterial: string = infoOfToolAndPage.inputData.typeMaterial
  let typeTool: string = infoOfToolAndPage.inputData.typeTool
  let d: number = infoOfToolAndPage.inputData.d
  let vc: number = infoOfToolAndPage.inputData.vc

  // show in "info catalog"
  // 'Vc' tools for "info catalog" from catalog
  let toolInMaterialVcMin: number = vc
  let toolInMaterialVcMax: number = vc * 1.5
  // 'f' for "info catalog" from catalog
  let drillF: number

  // Resoult
  // 'S' resoult from FooterPage
  let rotateMin: number
  let rotateMax: number
  // 'F' resoult from FooterPage
  let servingMin: number
  let servingMax: number

  useEffect(() => {
    if (infoOfToolAndPage.pageDrilling && d !== 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/f-drill-${typeTool}/${d}/${typeMaterial}`
          )
          const data = await response.json()
          typeMaterial === "steel"
            ? (drillF = data[0].steel)
            : typeMaterial === "aluminum"
            ? (drillF = data[0].aluminum)
            : typeMaterial === "stainles"
            ? (drillF = data[0].stainles)
            : typeMaterial === "iron"
            ? (drillF = data[0].iron)
            : NaN
        } catch (error) {
          console.error("Error", error)
        }
        // Resoult
        // 'S' for "info catalog"
        rotateMin = Math.floor((toolInMaterialVcMin * 1000) / (d * 3.14))
        rotateMax = Math.floor((toolInMaterialVcMax * 1000) / (d * 3.14))
        // 'F' for "info catalog"
        servingMin = Math.floor(rotateMin * drillF)
        servingMax = Math.floor(rotateMax * drillF)
        dispatch(
          addOutputData({
            vcMin: toolInMaterialVcMin,
            vcMax: toolInMaterialVcMax,
            fk: drillF,
            sMin: rotateMin,
            sMax: rotateMax,
            fMin: servingMin,
            fMax: servingMax
          })
        )
      }
      fetchData()
    }
  }, [infoOfToolAndPage, dispatch])

  return <div></div>
}
export default LogicCalcDrill
