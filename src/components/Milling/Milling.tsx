import "./Milling.scss"
import ImgArrow from "../../assets/left-arrow.png"
import imgApDrilling from "../../assets/Ap-Ae-Drilling.png"
import imgApMilling from "../../assets/Ap-Ae-Milling.png"
import {useDispatch} from "react-redux"
import {switchPage} from "../../redux/calculatorData"
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
  }

  return (
    <div className="milling">
      <header className="row ms-md-5 my-nav">
        <div className="col-2 col-md-2 me-1 arrow" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-5 offset-md-1">Frezowanie</h1>
      </header>
      <div className="form-check my-radio">
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
        <label htmlFor="radio-hss">HSS</label>
        <input
          className="me-2"
          type="radio"
          name="flexRadioDefault"
          id="radio-carbide"
          onChange={(e) => {
            setChackType((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="radio-carbide">Węglikowy</label>
        <input
          className="me-2"
          type="radio"
          name="flexRadioDefault"
          id="mill-folding"
          onChange={(e) => {
            setChackType((e.currentTarget as HTMLButtonElement).id)
          }}
        ></input>
        <label htmlFor="mill-folding">Głowica</label>
      </div>
      <form className="row mt-md-4">
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
        <div className="col-8 offset-2 col-md-4 d-md-flex">
          <img className="me-md-4 mb-4" src={imgApDrilling}></img>
          <img className="mb-4" src={imgApMilling}></img>
        </div>
      </form>
    </div>
  )
}
export default HssRoughing
