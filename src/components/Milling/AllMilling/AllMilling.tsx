import "./Milling.scss"
import ImgArrow from "../../../assets/left-arrow.png"
import {useDispatch} from "react-redux"
import {switchPage, switchMilling} from "../../../redux/calculatorData"
import drillHss from "../../../assets/wiertla-hss.jpg"
import drillPlate from "../../../assets/wiertla-plytka.png"

function AllMilling() {
  const dispatch = useDispatch()

  // show the main page
  function mainPage() {
    dispatch(
      switchPage({
        choosOperation: ""
      })
    )
  }
  // come on the AllMilling page
  function millingPage(id: string) {
    dispatch(
      switchMilling({
        choosMillingPage: id
      })
    )
  }

  return (
    <div className="milling">
      <header className="row ms-md-5 my-nav">
        <div className="col-2 col-md-2 me-3 mt-2 arrow" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-3 offset-md-2 mb-5 mt-2">Frezowanie</h1>
      </header>
      <div className="row type-cutters">
        <div
          className="col-12 col-md-6 roughing"
          id="hss-milling"
          onClick={(e) => millingPage((e.currentTarget as HTMLDivElement).id)}
        >
          <img src={drillHss}></img>
          <h6>Frezy palcowe</h6>
        </div>
        <div
          className="col-12 col-md-6"
          id="folding-milling"
          onClick={(e) => millingPage((e.currentTarget as HTMLDivElement).id)}
        >
          <img src={drillPlate}></img>
          <h6>Głowica</h6>
        </div>
      </div>
    </div>
  )
}
export default AllMilling
