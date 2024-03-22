import "./Tolerance.scss"
import ImgArrow from "../../assets/left-arrow.png"
import {useDispatch} from "react-redux"
import {switchPage, calculationPage} from "../../redux/calculatorData"
import {useState, useEffect} from "react"

function Tolerance() {
  const dispatch = useDispatch()
  const [holeShaft, setHoleShaft] = useState("hole")
  const [diameter, setDiameter] = useState(1)
  const [classTol, setClassTol] = useState("H")
  const [valTol, setValTol] = useState("6")
  const [selectOptions, setSelectOptions] = useState<string[]>([])
  const [valOptions, setvalOptions] = useState<string[]>([])
  // symbol for holes
  const holeOptions = [
    "H",
    "K",
    "J",
    "G",
    "M",
    "N",
    "R",
    "S",
    "E",
    "F",
    "U",
    "D",
    "A",
    "B"
  ]
  // symbol for shaft
  const shaftOptions = [
    "h",
    "k",
    "j",
    "g",
    "m",
    "n",
    "r",
    "s",
    "e",
    "f",
    "u",
    "d",
    "a",
    "b",
    "p"
  ]
  // value for options HOLE
  const tolH = ["6", "7", "8", "9", "10", "11", "12"]
  const tolGN = ["6", "7"]
  const tolJK = ["6", "7", "8"]
  const tolM = ["6"]
  const tolRS = ["7"]
  const tolEU = ["8"]
  const tolF = ["8", "9"]
  const tolD = ["9", "10", "11"]
  const tolA = ["11"]
  const tolB = ["11", "12"]

  // value for options shaft
  const tol_h = ["5", "6", "7", "8", "9", "10", "11"]
  const tol_g = ["5", "6"]
  const tol_k = ["5", "6", "7"]
  const tol_m = ["5"]
  const tol_jn = ["6", "7"]
  const tol_pr = ["6"]
  const tol_f = ["7", "9"]
  const tol_s = ["7"]
  const tol_e = ["8"]
  const tol_u = ["7", "8"]
  const tol_d = ["9", "10", "11"]
  const tol_ab = ["11"]

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
        pageMilling: false,
        pageBoring: false
      })
    )
  }
  // select start data
  function funcHoleShaft(el: string) {
    setHoleShaft(el)
    console.log(el)
    if (el === "hole") {
      const options = holeOptions
      setSelectOptions(options)
      setClassTol("H")
      setValTol("6")
    } else if (el === "shaft") {
      const options = shaftOptions
      setSelectOptions(options)
      setClassTol("h")
      setValTol("5")
    }
  }

  useEffect(() => {
    const options = holeShaft === "hole" ? holeOptions : shaftOptions
    setSelectOptions(options)
    // chack data from input 'diameter'
    diameter === 0 || isNaN(diameter) ? setDiameter(1) : NaN
    // choose list with tolerance for class
    classTol === "h"
      ? setvalOptions(tol_h)
      : classTol === "g"
      ? setvalOptions(tol_g)
      : classTol === "k"
      ? setvalOptions(tol_k)
      : classTol === "m"
      ? setvalOptions(tol_m)
      : classTol === "j" || classTol === "n"
      ? setvalOptions(tol_jn)
      : classTol === "p" || classTol === "r"
      ? setvalOptions(tol_pr)
      : classTol === "f"
      ? setvalOptions(tol_f)
      : classTol === "s"
      ? setvalOptions(tol_s)
      : classTol === "e"
      ? setvalOptions(tol_e)
      : classTol === "u"
      ? setvalOptions(tol_u)
      : classTol === "d"
      ? setvalOptions(tol_d)
      : classTol === "a" || classTol === "b"
      ? setvalOptions(tol_ab)
      : classTol === "H"
      ? setvalOptions(tolH)
      : classTol === "J" || classTol === "K"
      ? setvalOptions(tolJK)
      : classTol === "G" || classTol === "N"
      ? setvalOptions(tolGN)
      : classTol === "M"
      ? setvalOptions(tolM)
      : classTol === "R" || classTol === "S"
      ? setvalOptions(tolRS)
      : classTol === "E" || classTol === "U"
      ? setvalOptions(tolEU)
      : classTol === "F"
      ? setvalOptions(tolF)
      : classTol === "D"
      ? setvalOptions(tolD)
      : classTol === "A"
      ? setvalOptions(tolA)
      : classTol === "B"
      ? setvalOptions(tolB)
      : ""
  }, [classTol, valTol, diameter])
  return (
    <div className="milling">
      <header className="row ms-md-5 pt-3 mb-3 my-nav">
        <div className="col-2 col-md-2 arrow mx-2" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-3 offset-md-2">Tolerancji wymiarów</h1>
      </header>
      <div className="col-8 offset-2 col-md-4 offset-md-4">
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">Rodzaj: </span>

          <select
            className="form-select form-select-lg"
            aria-label="Large select example"
            value={holeShaft}
            onChange={(e) => {
              funcHoleShaft((e.currentTarget as HTMLSelectElement).value)
            }}
          >
            <option value="hole">Otwor</option>
            <option value="shaft">Wałek</option>
          </select>
        </div>
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">Średnica: </span>
          <input
            type="number"
            className="form-control py-2 fs-5"
            placeholder={String(diameter)}
            onChange={(e) => setDiameter(Math.abs(parseFloat(e.target.value)))}
          ></input>
          <span className="input-group-text"> mm</span>
        </div>

        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">Odchyłka: </span>
          <select
            className="form-select form-select-lg"
            aria-label="Large select example"
            value={classTol}
            onChange={(e) => {
              setClassTol((e.currentTarget as HTMLSelectElement).value)
            }}
          >
            {/* list with symbol for holes or shaft */}
            {selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">Pole toler.: </span>
          <select
            className="form-select form-select-lg"
            aria-label="Large select example"
            value={valTol}
            onChange={(e) => {
              setValTol((e.currentTarget as HTMLSelectElement).value)
            }}
          >
            {/* List of value tolerance */}
            {valOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
export default Tolerance
