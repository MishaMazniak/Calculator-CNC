import "./HomePage.scss"
import drillHss from "../assets/wiertla-hss.jpg"
import drillPlate from "../assets/wiertla-plytka.png"
import millingCutter from "../assets/frez.png"
import millingHead from "../assets/glowica.jpg"
import boringBarRough from "../assets/wytaczadlo_zgrubne.png"
import finishingBoringBar from "../assets/wytaczadlo-wyk.png"
import {useDispatch} from "react-redux"
import {switchPage, calculationPage} from "../redux/calculatorData"

function HomePage() {
  const dispatch = useDispatch()

  function mainPage(id: string) {
    dispatch(
      switchPage({
        choosOperation: id
      })
    )
    if (id === "drilling") {
      dispatch(
        calculationPage({
          pageDrilling: true,
          pageMilling: false
        })
      )
    } else if (id === "milling") {
      dispatch(
        calculationPage({
          pageDrilling: false,
          pageMilling: true
        })
      )
    }
  }

  return (
    <div className="home-page">
      <div className="lang">
        <span>Ua</span>
        <span>Pl</span>
        <span>En</span>
      </div>
      <h1>Calculator CNC</h1>
      <div className="row operation">
        <div className="col-12 col-md-4 offset-md-2">
          <h2>Wiercenie</h2>
          <button
            className="drilling"
            id="drilling"
            onClick={(e) => mainPage((e.currentTarget as HTMLButtonElement).id)}
          >
            <img src={drillHss}></img>
            <img src={drillPlate}></img>
          </button>
        </div>
        <div className="col-12 col-md-4">
          <h2>Frezowanie</h2>
          <button
            className="milling"
            id="milling"
            onClick={(e) => mainPage((e.currentTarget as HTMLButtonElement).id)}
          >
            <img src={millingCutter}></img>
            <img src={millingHead}></img>
          </button>
        </div>
        <div className="col-12 col-md-4 offset-md-4">
          <h2>Wytaczanie</h2>
          <button
            className="boring"
            id="boring"
            onClick={(e) => mainPage((e.currentTarget as HTMLButtonElement).id)}
          >
            <img src={boringBarRough}></img>
            <img src={finishingBoringBar}></img>
          </button>
        </div>
      </div>
    </div>
  )
}
export default HomePage
