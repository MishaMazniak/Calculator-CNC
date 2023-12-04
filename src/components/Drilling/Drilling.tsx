import "./Drilling.scss"
import ImgArrow from "../../assets/left-arrow.png"
import drillHss from "../../assets/wiertla-hss.jpg"
import drillPlate from "../../assets/wiertla-plytka.png"
import matAlum from "../../assets/iso-n-al.jpg"
import matStal from "../../assets/iso-p-stal.jpg"
import matStalN from "../../assets/iso-m-nier.jpg"
import matZel from "../../assets/iso-k-zel.jpg"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {switchPage} from "../../redux/calculatorData"

function Drilling() {
  const dispatch = useDispatch()
  // Data parameters
  const [diameter, setDiameter] = useState(0)
  const [typeDrill, setTypeDrill] = useState("hss")
  const [typeMaterial, setTypeMaterial] = useState("steel")
  // data 'Vc' drills from catalog
  let drillVcMin: number
  let drillVcMax: number
  let drillFMin: number
  let drillFMax: number
  // data 'Vc' drills in materials from catalog
  let materialVcMin: number
  let materialVcMax: number
  // Show the catalog 'Vc' on screen before the calculation
  const [cuttingSpeedMin, setCuttingSpeedMin] = useState(0)
  const [cuttingSpeedMax, setCuttingSpeedMax] = useState(0)
  // Show the catalog 'f' on screen before the calculation
  const [feedPerToothMin, setFeedPerToothMin] = useState(0)
  const [feedPerToothMax, setFeedPerToothMax] = useState(0)
  // Resoult data from calculate
  const [rotateMin, setRotateMin] = useState(0)
  const [rotateMax, setRotateMax] = useState(0)
  const [servingMin, setServingMin] = useState(0)
  const [servingMax, setServingMax] = useState(0)
  // Return to the main page
  function mainPage() {
    dispatch(
      switchPage({
        choosOperation: ""
      })
    )
  }
  useEffect(() => {
    if (diameter !== 0) {
      // seleckt data Vc from catalog for different drills
      switch (typeDrill) {
        case "hss":
          drillVcMin = 20
          drillVcMax = 30
          break
        case "carbide":
          drillVcMin = 50
          drillVcMax = 70
          break
        case "folding":
          drillVcMin = 130
          drillVcMax = 180
          break
        default:
          console.log("End")
      }
      // seleckt data Vc drills in different material from catalog
      switch (typeMaterial) {
        case "steel":
          materialVcMin = drillVcMin * 1
          materialVcMax = drillVcMax * 1
          setCuttingSpeedMin(materialVcMin)
          setCuttingSpeedMax(materialVcMax)
          break
        case "aluminum":
          materialVcMin = drillVcMin * 2
          materialVcMax = drillVcMax * 2
          setCuttingSpeedMin(materialVcMin)
          setCuttingSpeedMax(materialVcMax)
          break
        case "stainless-steel":
          materialVcMin = drillVcMin * 0.5
          materialVcMax = drillVcMax * 0.5
          setCuttingSpeedMin(materialVcMin)
          setCuttingSpeedMax(materialVcMax)
          break
        case "cast-iron":
          materialVcMin = drillVcMin * 1.2
          materialVcMax = drillVcMax * 1.2
          setCuttingSpeedMin(materialVcMin)
          setCuttingSpeedMax(materialVcMax)
          break
      }
      setRotateMin(Math.floor((materialVcMin * 1000) / (diameter * 3.14)))
      setRotateMax(Math.floor((materialVcMax * 1000) / (diameter * 3.14)))

      drillFMin = diameter * 0.012
      drillFMax = diameter * 0.02
      setFeedPerToothMin(drillFMin)
      setFeedPerToothMax(drillFMax)

      setServingMin(Math.floor(rotateMin * drillFMin))
      setServingMax(Math.floor(rotateMax * drillFMax))
    }
  }, [diameter, typeDrill, typeMaterial])

  return (
    <div className="drilling">
      <header className="row ms-md-5 my-nav">
        <div className="col-2 col-md-2 arrow" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-3 offset-md-2">Wiercenie</h1>
      </header>
      <div className="input-diameter">
        <h4>Średnica wiertła</h4>
        <span>
          d ={" "}
          <input
            type="number"
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
          ></input>{" "}
          mm
        </span>
      </div>
      <div className="row type-tools">
        <h4>Typ wiertła</h4>
        <div
          className="col-6 col-md-4"
          id="hss"
          onClick={(e) => setTypeDrill((e.currentTarget as HTMLDivElement).id)}
        >
          <img src={drillHss}></img>
          <h6>HSS</h6>
        </div>
        <div
          className="col-6 col-md-4"
          id="carbide"
          onClick={(e) => setTypeDrill((e.currentTarget as HTMLDivElement).id)}
        >
          <img src={drillHss}></img>
          <h6>Węglikowe</h6>
        </div>
        <div
          className="col-12 col-md-4"
          id="folding"
          onClick={(e) => setTypeDrill((e.currentTarget as HTMLDivElement).id)}
        >
          <img src={drillPlate}></img>
          <h6>Składane</h6>
        </div>
      </div>
    </div>
  )
}
export default Drilling

// function Drilling() {
//   const dispatch = useDispatch()
//   // Data parameters
//   const [diameter, setDiameter] = useState(0)
//   const [typeDrill, setTypeDrill] = useState("hss")
//   const [typeMaterial, setTypeMaterial] = useState("steel")
//   // data 'Vc' drills from catalog
//   let drillVcMin: number
//   let drillVcMax: number
//   let drillFMin: number
//   let drillFMax: number
//   // data 'Vc' drills in materials from catalog
//   let materialVcMin: number
//   let materialVcMax: number
//   // Show the catalog 'Vc' on screen before the calculation
//   const [cuttingSpeedMin, setCuttingSpeedMin] = useState(0)
//   const [cuttingSpeedMax, setCuttingSpeedMax] = useState(0)
//   // Show the catalog 'f' on screen before the calculation
//   const [feedPerToothMin, setFeedPerToothMin] = useState(0)
//   const [feedPerToothMax, setFeedPerToothMax] = useState(0)
//   // Resoult data from calculate
//   const [rotateMin, setRotateMin] = useState(0)
//   const [rotateMax, setRotateMax] = useState(0)
//   const [servingMin, setServingMin] = useState(0)
//   const [servingMax, setServingMax] = useState(0)
//   // Return to the main page
//   function mainPage() {
//     dispatch(
//       switchPage({
//         choosOperation: ""
//       })
//     )
//   }
//   useEffect(() => {
//     if (diameter !== 0) {
//       // seleckt data Vc from catalog for different drills
//       switch (typeDrill) {
//         case "hss":
//           drillVcMin = 20
//           drillVcMax = 30
//           break
//         case "carbide":
//           drillVcMin = 50
//           drillVcMax = 70
//           break
//         case "folding":
//           drillVcMin = 130
//           drillVcMax = 180
//           break
//         default:
//           console.log("End")
//       }
//       // seleckt data Vc drills in different material from catalog
//       switch (typeMaterial) {
//         case "steel":
//           materialVcMin = drillVcMin * 1
//           materialVcMax = drillVcMax * 1
//           setCuttingSpeedMin(materialVcMin)
//           setCuttingSpeedMax(materialVcMax)
//           break
//         case "aluminum":
//           materialVcMin = drillVcMin * 2
//           materialVcMax = drillVcMax * 2
//           setCuttingSpeedMin(materialVcMin)
//           setCuttingSpeedMax(materialVcMax)
//           break
//         case "stainless-steel":
//           materialVcMin = drillVcMin * 0.5
//           materialVcMax = drillVcMax * 0.5
//           setCuttingSpeedMin(materialVcMin)
//           setCuttingSpeedMax(materialVcMax)
//           break
//         case "cast-iron":
//           materialVcMin = drillVcMin * 1.2
//           materialVcMax = drillVcMax * 1.2
//           setCuttingSpeedMin(materialVcMin)
//           setCuttingSpeedMax(materialVcMax)
//           break
//       }
//       setRotateMin(Math.floor((materialVcMin * 1000) / (diameter * 3.14)))
//       setRotateMax(Math.floor((materialVcMax * 1000) / (diameter * 3.14)))

//       drillFMin = diameter * 0.012
//       drillFMax = diameter * 0.02
//       setFeedPerToothMin(drillFMin)
//       setFeedPerToothMax(drillFMax)

//       setServingMin(Math.floor(rotateMin * drillFMin))
//       setServingMax(Math.floor(rotateMax * drillFMax))
//     }
//   }, [diameter, typeDrill, typeMaterial])

//   return (
//     <div className="drilling">
//       <header className="row ms-md-5 my-nav">
//         <div className="col-2 col-md-2 arrow" onClick={mainPage}>
//           <img src={ImgArrow}></img>
//         </div>
//         <h1 className="col-8 col-md-3 offset-md-2">Wiercenie</h1>
//       </header>
//       <div className="input-diameter">
//         <h4>Średnica wiertła</h4>
//         <span>
//           d ={" "}
//           <input
//             type="number"
//             onChange={(e) => setDiameter(parseFloat(e.target.value))}
//           ></input>{" "}
//           mm
//         </span>
//       </div>
//       <div className="row type-tools">
//         <h4>Typ wiertła</h4>
//         <div
//           className="col-6 col-md-4"
//           id="hss"
//           onClick={(e) => setTypeDrill((e.currentTarget as HTMLDivElement).id)}
//         >
//           <img src={drillHss}></img>
//           <h6>HSS</h6>
//         </div>
//         <div
//           className="col-6 col-md-4"
//           id="carbide"
//           onClick={(e) => setTypeDrill((e.currentTarget as HTMLDivElement).id)}
//         >
//           <img src={drillHss}></img>
//           <h6>Węglikowe</h6>
//         </div>
//         <div
//           className="col-12 col-md-4"
//           id="folding"
//           onClick={(e) => setTypeDrill((e.currentTarget as HTMLDivElement).id)}
//         >
//           <img src={drillPlate}></img>
//           <h6>Składane</h6>
//         </div>
//       </div>
//       <div className="row type-material">
//         <h4>Materiał obróbki</h4>
//         <div
//           className="col-6 col-md-3"
//           id="steel"
//           onClick={(e) =>
//             setTypeMaterial((e.currentTarget as HTMLDivElement).id)
//           }
//         >
//           <img src={matStal}></img>
//           <h6>Stal</h6>
//         </div>
//         <div
//           className="col-6 col-md-3"
//           id="aluminum"
//           onClick={(e) =>
//             setTypeMaterial((e.currentTarget as HTMLDivElement).id)
//           }
//         >
//           <img src={matAlum}></img>
//           <h6>Aluminium</h6>
//         </div>
//         <div
//           className="col-6 col-md-3"
//           id="stainless-steel"
//           onClick={(e) =>
//             setTypeMaterial((e.currentTarget as HTMLDivElement).id)
//           }
//         >
//           <img src={matStalN}></img>
//           <h6>Stal nierdzewna</h6>
//         </div>
//         <div
//           className="col-6 col-md-3"
//           id="cast-iron"
//           onClick={(e) =>
//             setTypeMaterial((e.currentTarget as HTMLDivElement).id)
//           }
//         >
//           <img src={matZel}></img>
//           <h6>Żeliwo</h6>
//         </div>
//       </div>
//       <div className="row info-choosed">
//         <div className="col-10 offset-1 mb-2 border"></div>
//         <h4>Dane katalogowe</h4>
//         <div>
//           Vc = <span>{cuttingSpeedMin}</span>-<span>{cuttingSpeedMax}</span>{" "}
//           m/min
//         </div>
//         <div>
//           f = <span>{feedPerToothMin}</span>-<span>{feedPerToothMax}</span>{" "}
//           mm/zb
//         </div>
//         <div className="col-10 offset-1 mt-2 border"></div>
//       </div>
//       <div className="row resoult">
//         <h4>Optymalne parametry</h4>
//         <div className="col-6 col-md-4 offset-md-1 offset-3 mt-2">
//           <p>
//             S = <span>{rotateMin}</span>-<span>{rotateMax}</span> ob/min
//           </p>
//         </div>
//         <div className="col-6 col-md-4 offset-md-2 offset-3 mt-2">
//           <p>
//             F = <span>{servingMin}</span>-<span>{servingMax}</span> mm/min
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Drilling
