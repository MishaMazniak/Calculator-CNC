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
      coefAe: number
      coefAp: number
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
  let z: number = reduxInput.z
  let q: number = reduxInput.q
  let vcMin: number = reduxInput.vcMin
  let vcMax: number = reduxInput.vcMax
  let coefAe: number = reduxInput.coefAe
  let coefAp: number = reduxInput.coefAp
  let typeMaterial: string = reduxInput.typeMaterial
  let typeTool: string = reduxInput.typeTool
  let typeMachining: string = reduxInput.typeMachining

  // show in "info catalog"
  // 'Vc' tools for "info catalog" from catalog
  let toolInMaterialVcMin: number = vcMin
  let toolInMaterialVcMax: number = vcMax
  // 'f' for "info catalog" from catalog
  let millF: number
  let millRorate: number
  // d correct for table database
  let diametr: number

  // for select catalog f-mill-carbide
  let typeProces: string

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
      // condition for tool hss and carbide
      if (typeTool === "toolhss" || typeTool === "toolcarbide") {
        // data cost cap for databace
        if (typeTool === "toolhss" && d === 1) diametr = 2
        else if (typeTool === "toolhss" && d > 28) diametr = 28
        else if (typeTool === "toolcarbide" && d > 20) diametr = 20
        else diametr = Math.floor(d)
        // select typeProces for database
        if (typeTool === "toolhss") {
          typeProces = typeMachining
        } else if (typeTool === "toolcarbide") {
          typeProces = "main"
        }
        const fetchMillData = async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/f-mill-${typeTool}-${typeProces}/${diametr}/${typeMaterial}`
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
          // 'f' for "info catalog"
          millRorate = Number((millF * z).toFixed(2))
          // Resoult
          // 'S' for "info catalog"
          rotateMin = Math.floor((toolInMaterialVcMin * 1000) / (d * 3.14))
          rotateMax = Math.floor((toolInMaterialVcMax * 1000) / (d * 3.14))
          // 'F' for "info catalog"
          servingMin = Math.floor(rotateMin * millF * z * coefAe * coefAp)
          servingMax = Math.floor(rotateMax * millF * z * coefAe * coefAp)
          // millF = 180 / rotateMin / 4

          dispatch(
            addOutputData({
              // info for catalog
              vcMin: toolInMaterialVcMin,
              vcMax: toolInMaterialVcMax,
              fk: millRorate,
              //resoult
              sMin: rotateMin,
              sMax: rotateMax,
              fMin: servingMin,
              fMax: servingMax
            })
          )
        }
        fetchMillData()
      }
      // condition for tool folding
      if (typeTool === "toolfolding") {
        const fetchMillFolding = async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/f-mill-${typeTool}/${typeMaterial}`
            )
            const data = await response.json()
            millF = data[0].toolfolding
          } catch (error) {
            console.error("Error333", error)
          }
          // // 'f' for "info catalog"
          // millRorate = Number((millF * z).toFixed(2))
          // // Resoult
          // // 'S' for "info catalog"
          // rotateMin = Math.floor((toolInMaterialVcMin * 1000) / (d * 3.14))
          // rotateMax = Math.floor((toolInMaterialVcMax * 1000) / (d * 3.14))
          // // 'F' for "info catalog"
          // servingMin = Math.floor(rotateMin * millF * z * coefAe * coefAp)
          // servingMax = Math.floor(rotateMax * millF * z * coefAe * coefAp)
          // // millF = 180 / rotateMin / 4

          // dispatch(
          //   addOutputData({
          //     // info for catalog
          //     vcMin: toolInMaterialVcMin,
          //     vcMax: toolInMaterialVcMax,
          //     fk: millRorate,
          //     //resoult
          //     sMin: rotateMin,
          //     sMax: rotateMax,
          //     fMin: servingMin,
          //     fMax: servingMax
          //   })
          // )
        }
        fetchMillFolding()
      }
    }
  }, [infoRedux])

  return <div></div>
}
export default LogicCalcMill
