import "./Milling.scss"
import ImgArrow from "../../../assets/left-arrow.png"
import ImgHome from "../../../assets/home.png"
import imgApDrilling from "../../../assets/Ap-Ae-Drilling.png"
import imgApMilling from "../../../assets/Ap-Ae-Milling.png"
import {useDispatch} from "react-redux"
import {switchPage, switchMilling} from "../../../redux/calculatorData"
import {useState, useEffect} from "react"

function HssRoughing() {
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
        <h1 className="col-8 col-md-5 offset-md-1">Frezowanie frez palcowy</h1>
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
          <div className="row mb-4">
            <div className="col-6 form-check">
              <input
                className="me-2"
                type="radio"
                name="flexRadioDefault"
                id="radio-hss"
                defaultChecked
                onChange={(e) => {
                  setChackType((e.currentTarget as HTMLButtonElement).id)
                }}
              ></input>
              <label className="" htmlFor="radio-hss">
                HSS
              </label>
            </div>
            <div className="col-6 form-check">
              <input
                className="me-2"
                type="radio"
                name="flexRadioDefault"
                id="radio-carbide"
                onChange={(e) => {
                  setChackType((e.currentTarget as HTMLButtonElement).id)
                }}
              ></input>
              <label className="" htmlFor="radio-carbide">
                Carbide
              </label>
            </div>
          </div>
        </div>
        <div className="col-8 offset-2 col-md-4 d-md-flex">
          <img className="me-md-4 mb-4" src={imgApDrilling}></img>
          <img className="mb-4" src={imgApMilling}></img>
        </div>
      </form>
    </div>
  )
}
export default HssRoughing
