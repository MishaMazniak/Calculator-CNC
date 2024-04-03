import "./Tolerance.scss"
import ImgArrow from "../../assets/left-arrow.png"
import ImgDop from "../../assets/dopuski-i-posadki5.jpg"
import {useDispatch} from "react-redux"
import {switchPage, calculationPage} from "../../redux/calculatorData"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"

interface RootState {
  calculatorData: {
    myLang: string
  }
}

function Tolerance() {
  const dispatch = useDispatch()
  // data from redux
  let infoOfTool = useSelector((state: RootState) => state.calculatorData)
  let lang: string = infoOfTool.myLang
  // text for differents language
  const [nameTitle, setNameTitle] = useState("")
  const [nameSelDeteil, setNameSelDeteil] = useState("")
  const [nameHole, setNameHole] = useState("")
  const [nameShaft, setNameShaft] = useState("")
  const [nameDiameter, setNameDiameter] = useState("")
  const [nameClass, setNameClass] = useState("")
  const [nameTolerance, setNameTolerance] = useState("")

  // input variables
  const [holeShaft, setHoleShaft] = useState("hole")
  const [diameter, setDiameter] = useState(1)
  const [valClass, setValClass] = useState("H")
  const [valTol, setValTol] = useState("6")
  // variables for lists 'class' and 'tolerance'
  const [classList, setClassList] = useState<string[]>([])
  const [tolList, setTolList] = useState<string[]>([])
  // variables for calculate
  const [valMin, setValMin] = useState(0)
  const [valMax, setValMax] = useState(0)
  const [signForMin, setSignForMin] = useState("")
  const [signForMax, setSignForMax] = useState("")
  const [diameterMin, setDiameterMin] = useState(0)
  const [diameterMax, setDiameterMax] = useState(0)
  // d correct for tabl database
  let diametrForDB: number
  let TolForDB: string

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
  // start data after choose "hole" or "shaft"
  function funcHoleShaft(el: string) {
    setHoleShaft(el)
    let options: string[]
    if (el === "hole") {
      options = holeOptions
      // showe list
      setClassList(options)
      // write value
      setValClass("H")
      setValTol("6")
    } else if (el === "shaft") {
      options = shaftOptions
      setClassList(options)
      setValClass("h")
      setValTol("5")
    }
  }
  // calculate diameter min/max
  function calculateData(el: any) {
    let calcMin: number
    let calcMax: number
    const dynamicKey = `${valClass}${valTol}_${holeShaft}`
    const dynamicKeyMax = `${dynamicKey}_max`
    calcMin = el[0][dynamicKey] / 1000
    calcMax = el[0][dynamicKeyMax] / 1000
    calcMin > 0 ? setSignForMin("+") : setSignForMin("")
    calcMax > 0 ? setSignForMax("+") : setSignForMax("")
    setValMin(calcMin)
    setValMax(calcMax)
    setDiameterMin(diameter + calcMin)
    setDiameterMax(diameter + calcMax)
  }
  // show class list and value tolerance
  function myClass(el: string) {
    setValClass(el)
    // show liste class on start work
    if (holeShaft === "hole") {
      setClassList(holeOptions)
      if (el === "H") {
        setTolList(tolH)
        TolForDB = tolH[0]
      } else if (el === "J" || el === "K") {
        setTolList(tolJK)
        TolForDB = tolJK[0]
      } else if (el === "G" || el === "N") {
        setTolList(tolGN)
        TolForDB = tolGN[0]
      } else if (el === "M") {
        setTolList(tolM)
        TolForDB = tolM[0]
      } else if (el === "R" || el === "S") {
        setTolList(tolRS)
        TolForDB = tolRS[0]
      } else if (el === "E" || el === "U") {
        setTolList(tolEU)
        TolForDB = tolEU[0]
      } else if (el === "F") {
        setTolList(tolF)
        TolForDB = tolF[0]
      } else if (el === "D") {
        setTolList(tolD)
        TolForDB = tolD[0]
      } else if (el === "A") {
        setTolList(tolA)
        TolForDB = tolA[0]
      } else if (el === "B") {
        setTolList(tolB)
        TolForDB = tolB[0]
      }
    } else {
      setClassList(shaftOptions)
      if (el === "h") {
        setTolList(tol_h)
        TolForDB = tol_h[0]
      } else if (el === "g") {
        setTolList(tol_g)
        TolForDB = tol_g[0]
      } else if (el === "k") {
        setTolList(tol_k)
        TolForDB = tol_k[0]
      } else if (el === "m") {
        setTolList(tol_m)
        TolForDB = tol_m[0]
      } else if (el === "j" || el === "n") {
        setTolList(tol_jn)
        TolForDB = tol_jn[0]
      } else if (el === "p" || el === "r") {
        setTolList(tol_pr)
        TolForDB = tol_pr[0]
      } else if (el === "f") {
        setTolList(tol_f)
        TolForDB = tol_f[0]
      } else if (el === "s") {
        setTolList(tol_s)
        TolForDB = tol_s[0]
      } else if (el === "e") {
        setTolList(tol_e)
        TolForDB = tol_e[0]
      } else if (el === "u") {
        setTolList(tol_u)
        TolForDB = tol_u[0]
      } else if (el === "d") {
        setTolList(tol_d)
        TolForDB = tol_d[0]
      } else if (el === "a" || el === "b") {
        setTolList(tol_ab)
        TolForDB = tol_ab[0]
      }
    }
    setValTol(TolForDB)
  }
  // show start class and tolerance and choos lang
  useEffect(() => {
    if (holeShaft === "hole") {
      setClassList(holeOptions)
      setTolList(tolH)
      TolForDB = tolH[0]
    } else {
      setClassList(shaftOptions)
      setTolList(tol_h)
      TolForDB = tol_h[0]
    }
    if (lang === "Pl") {
      setNameTitle("Kalkulator tolerancji")
      setNameSelDeteil("Rodzaj:")
      setNameHole("Otwór")
      setNameShaft("Wałek")
      setNameDiameter("Średnica:")
      setNameClass("Odchyłka:")
      setNameTolerance("Pole toler.:")
    } else if (lang === "Ua") {
      setNameTitle("Калькулятор посадок")
      setNameSelDeteil("Вал/Отв:")
      setNameHole("Отвір")
      setNameShaft("Вал")
      setNameDiameter("Діаметер:")
      setNameClass("Тип:")
      setNameTolerance("Допуск:")
    } else if (lang === "En") {
      setNameTitle("Calculatort tolerance")
      setNameSelDeteil("Hole/Shaft:")
      setNameHole("Hole")
      setNameShaft("Shaft")
      setNameDiameter("Diameter:")
      setNameClass("Type:")
      setNameTolerance("Tolerance:")
    }
  }, [])

  useEffect(() => {
    // chack data from input 'diameter'
    diameter === 0 || isNaN(diameter) ? setDiameter(1) : setDiameter(diameter)
    // corect diameter for table in databace
    diameter <= 3
      ? (diametrForDB = 0)
      : diameter > 3 && diameter <= 6
      ? (diametrForDB = 3)
      : diameter > 6 && diameter <= 10
      ? (diametrForDB = 6)
      : diameter > 10 && diameter <= 14
      ? (diametrForDB = 10)
      : diameter > 14 && diameter <= 18
      ? (diametrForDB = 14)
      : diameter > 18 && diameter <= 24
      ? (diametrForDB = 18)
      : diameter > 24 && diameter <= 30
      ? (diametrForDB = 24)
      : diameter > 30 && diameter <= 40
      ? (diametrForDB = 30)
      : diameter > 40 && diameter <= 50
      ? (diametrForDB = 40)
      : diameter > 50 && diameter <= 65
      ? (diametrForDB = 50)
      : diameter > 65 && diameter <= 80
      ? (diametrForDB = 65)
      : diameter > 80 && diameter <= 100
      ? (diametrForDB = 80)
      : diameter > 100 && diameter <= 120
      ? (diametrForDB = 100)
      : diameter > 120 && diameter <= 140
      ? (diametrForDB = 120)
      : diameter > 140 && diameter <= 160
      ? (diametrForDB = 140)
      : diameter > 160 && diameter <= 180
      ? (diametrForDB = 160)
      : diameter > 180 && diameter <= 200
      ? (diametrForDB = 180)
      : diameter > 200 && diameter <= 225
      ? (diametrForDB = 200)
      : diameter > 225 && diameter <= 250
      ? (diametrForDB = 225)
      : (diametrForDB = 1)
    if (diameter > 250) {
      alert("Max value is 250")
      setDiameter(250)
    }
    // data base from table 'Tolerance"
    const fetchToleranceData = async (
      diametrForDB: number,
      holeShaft: string,
      valClass: string,
      valTol: string
    ) => {
      try {
        const response = await fetch(
          `https://calculator-cnc.pl/tolerance/${diametrForDB}/${holeShaft}/${valClass}/${valTol}`
        )
        const data = await response.json()
        calculateData(data)
      } catch (error) {
        console.error("Error", error)
      }
    }
    fetchToleranceData(diametrForDB, holeShaft, valClass, valTol)
  }, [
    valClass,
    valTol,
    diameter,
    signForMin,
    signForMax,
    diameterMin,
    diameterMax
  ])

  return (
    <div className="tolerance">
      <header className="row ms-md-5 pt-3 mb-3 my-nav">
        <div className="col-2 col-md-2 arrow mx-2" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-5 offset-md-1 pb-2">{nameTitle}</h1>
      </header>
      <form>
        <div className="col-8 offset-2 col-md-4 offset-md-4">
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text my_span">{nameSelDeteil} </span>

            <select
              className="form-select form-select-lg"
              aria-label="Large select example"
              value={holeShaft}
              onChange={(e) => {
                funcHoleShaft((e.currentTarget as HTMLSelectElement).value)
              }}
            >
              <option value="hole">{nameHole}</option>
              <option value="shaft">{nameShaft}</option>
            </select>
          </div>
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text my_span">{nameDiameter} </span>
            <input
              type="number"
              className="form-control py-2 fs-5"
              placeholder={String(diameter)}
              onChange={(e) =>
                setDiameter(Math.abs(parseFloat(e.target.value)))
              }
            ></input>
            <span className="input-group-text"> mm</span>
          </div>

          <div className="input-group mb-3 mt-3">
            <span className="input-group-text my_span">{nameClass} </span>
            <select
              className="form-select form-select-lg"
              aria-label="Large select example"
              value={valClass}
              onChange={(e) => {
                myClass((e.currentTarget as HTMLSelectElement).value)
                // setValClass((e.currentTarget as HTMLSelectElement).value)
              }}
            >
              {/* list with symbol for holes or shaft */}
              {classList.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text my_span">{nameTolerance} </span>
            <select
              className="form-select form-select-lg"
              aria-label="Large select example"
              value={valTol}
              onChange={(e) => {
                setValTol((e.currentTarget as HTMLSelectElement).value)
              }}
            >
              {/* List of value tolerance */}
              {tolList.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <div className="mt-3">
        <div className="container text-center mt-3">
          <div className="row col-10 offset-1 col-md-4 offset-md-4 border border-black bg-white text-dark">
            <div className="row col-8 fs-1 text pt-md-1 pt-2">
              <div className="col-6 col-md-5">
                {valClass}
                {valTol}
              </div>
              <div className="row col">
                <div className="col-6 offset-2 text-success fw-bold">
                  {diameter}
                </div>
              </div>
            </div>
            <div className="row col">
              <div className="col-8 pt-2">
                {signForMax}
                {valMax}
              </div>
              <div className="col-8">
                {signForMin}
                {valMin}
              </div>
            </div>
            <div className="my-2">
              <span>
                ({diameterMin} ÷ {diameterMax} mm)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 col-12">
        <img className="img_toler" src={ImgDop}></img>
      </div>
    </div>
  )
}
export default Tolerance
