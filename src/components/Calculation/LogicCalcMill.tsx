import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {addOutputData} from "../../redux/calculatorData"

interface RootState {
  calculatorData: {
    inputData: {
      typeMaterial: string
      typeTool: string
      typeMachining: string
      d: number
      z: number
      ap: number
      ae: number
      q: number
      vcMin: number
      vcMax: number
    }
    pageMilling: boolean
  }
}

function LogicCalcMill() {
  const dispatch = useDispatch()

  let infoRedux = useSelector((state: RootState) => state.calculatorData)
  let reduxInput = infoRedux.inputData

  // data from redux
  let d: number = reduxInput.d
  let q: number = reduxInput.q
  let vcMin: number = reduxInput.vcMin
  let vcMax: number = reduxInput.vcMax
  let typeMaterial: string = reduxInput.typeMaterial
  let typeTool: string = reduxInput.typeTool

  // show in "info catalog"
  // 'Vc' tools for "info catalog" from catalog
  let toolInMaterialVcMin: number = vcMin
  let toolInMaterialVcMax: number = vcMax
  // 'f' for "info catalog" from catalog
  let millF: number

  // Resoult
  // 'S' resoult from FooterPage
  let rotateMin: number
  let rotateMax: number
  // 'F' resoult from FooterPage
  let servingMin: number
  let servingMax: number

  useEffect(() => {
    console.log(infoRedux)
    if (infoRedux.pageMilling && reduxInput.d !== 0) {
      const fetchMillData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/f-mill-toolhss-rough/${d}/${typeMaterial}`
          )
          const data = await response.json()
          typeMaterial === "steel"
            ? (millF = data[0].steel)
            : typeMaterial === "aluminum"
            ? (millF = data[0].aluminum)
            : typeMaterial === "stainles"
            ? (millF = data[0].stainles)
            : typeMaterial === "iron"
            ? (millF = data[0].iron)
            : NaN
        } catch (error) {
          console.error("Error", error)
        }
        // Resoult
        // 'S' for "info catalog"
        rotateMin = Math.floor((toolInMaterialVcMin * 1000) / (d * 3.14))
        rotateMax = Math.floor((toolInMaterialVcMax * 1000) / (d * 3.14))
        // 'F' for "info catalog"
        servingMin = millF
        servingMax = millF

        dispatch(
          addOutputData({
            vcMin: toolInMaterialVcMin,
            vcMax: toolInMaterialVcMax,
            fk: 0,
            sMin: rotateMin,
            sMax: rotateMax,
            fMin: servingMin,
            fMax: servingMax
          })
        )
      }
      fetchMillData()
    }
  }, [infoRedux])

  return <div></div>
}
export default LogicCalcMill
