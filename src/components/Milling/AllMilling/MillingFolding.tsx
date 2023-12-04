import "./Milling.scss"
import ImgArrow from "../../../assets/left-arrow.png"
import ImgHome from "../../../assets/home.png"
import imgMillFol from "../../../assets/glowica.jpg"
import imgMillFolApAe from "../../../assets/foldingApAe.jpeg"
import {useDispatch} from "react-redux"
import {switchPage, switchMilling} from "../../../redux/calculatorData"
import {useState, useEffect} from "react"

function MillingFolding() {
  const dispatch = useDispatch()

  const [chackType, setChackType] = useState("radio-hss")
  const [typeMaterial, setTypeMaterial] = useState("steel")

  // useEffect(() => {
  //   console.log(chackType)
  // }, [chackType])

  // show the main page
  function mainPage() {
    dispatch(
      switchPage({
        choosOperation: ""
      })
    )
    dispatch(
      switchMilling({
        choosMillingPage: ""
      })
    )
  }
  // come on the AllMilling page
  function allMillingPage() {
    dispatch(
      switchMilling({
        choosMillingPage: ""
      })
    )
  }

  return (
    <div className="milling">
      <header className="row ms-md-5 my-nav">
        <div className="col-2 col-md-2 me-1 arrow" onClick={allMillingPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-5 offset-md-1">Głowicy</h1>
        <div className="col-2 col-md-2 ms-md-5 home" onClick={mainPage}>
          <img src={ImgHome}></img>
        </div>
      </header>
      <form className="row">
        <div className="col-8 offset-2 col-md-3 mt-4">
          <div className="input-group mb-3">
            <span className="input-group-text">d = </span>
            <input
              type="number"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">z = </span>
            <input
              type="number"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            ></input>
            <span className="input-group-text"> szt</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ap = </span>
            <input
              type="number"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ae = </span>
            <input
              type="number"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            ></input>
            <span className="input-group-text"> mm</span>
          </div>
          <div className="row mb-4"></div>
        </div>
        <div className="col-8 offset-2 col-md-3 offset-md-1 d-md-flex">
          <img className="me-md-4 mb-4" src={imgMillFol}></img>
          <img className="me-md-4 mb-4" src={imgMillFolApAe}></img>
        </div>
      </form>
    </div>
  )
}
export default MillingFolding
