import "./Drilling.scss"
import ImgArrow from "../../assets/left-arrow.png"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {switchPage, addD, calculationPage} from "../../redux/calculatorData"

function Drilling() {
  const dispatch = useDispatch()

  // Data parameters
  const [diameter, setDiameter] = useState(0)

  // Return to the main page
  function mainPage() {
    dispatch(
      switchPage({
        choosOperation: ""
      })
    )
    dispatch(
      calculationPage({
        pageDrilling: false,
        pageMilling: false
      })
    )
  }
  useEffect(() => {
    dispatch(
      addD({
        diameter: diameter
      })
    )
  }, [diameter])

  return (
    <div className="drilling">
      <header className="row ms-md-5 pt-3 mb-3 my-nav">
        <div className="col-2 col-md-2 arrow mx-2" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-3 offset-md-2">Wiercenie</h1>
      </header>
      <div className="col-8 offset-2 col-md-4 offset-md-4">
        <h4>Średnica wiertła</h4>
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text">d = </span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setDiameter(parseFloat(e.target.value))}
          ></input>
          <span className="input-group-text"> mm</span>
        </div>
      </div>
    </div>
  )
}
export default Drilling
