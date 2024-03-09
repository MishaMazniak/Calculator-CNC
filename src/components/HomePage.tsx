import "./HomePage.scss"
import drillHss from "../assets/Drilling.png"
import millingCutter from "../assets/Milling.png"
import boringBarRough from "../assets/Tytle-wytaczdlo.png"
import {useDispatch, useSelector} from "react-redux"
import {switchPage, calculationPage, addLang} from "../redux/calculatorData"
import {useState, useEffect} from "react"

interface RootState {
  calculatorData: {
    myLang: string
  }
}

function HomePage() {
  const dispatch = useDispatch()

  let infoLang = useSelector((state: RootState) => state.calculatorData)
  let lang = infoLang.myLang
  // text for differents language
  const [mainName, setMainName] = useState("")
  const [nameDrilling, setNameDrilling] = useState("")
  const [nameMilling, setNameMilling] = useState("")
  const [nameBoring, setNameBoring] = useState("")

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
          pageMilling: false,
          pageBoring: false
        })
      )
    } else if (id === "milling") {
      dispatch(
        calculationPage({
          pageDrilling: false,
          pageMilling: true,
          pageBoring: false
        })
      )
    } else if (id === "boring") {
      dispatch(
        calculationPage({
          pageDrilling: false,
          pageMilling: false,
          pageBoring: true
        })
      )
    }
  }
  function changeLang(el: string) {
    dispatch(
      addLang({
        myLang: el
      })
    )
  }
  useEffect(() => {
    if (lang === "Pl") {
      setMainName("Kalkulator CNC")
      setNameDrilling("Wiercenie")
      setNameMilling("Frezowanie")
      setNameBoring("Wytaczanie")
    } else if (lang === "Ua") {
      setMainName("Калькулятор ЧПУ")
      setNameDrilling("Сверління")
      setNameMilling("Фрезовання")
      setNameBoring("Точення")
    } else if (lang === "En") {
      setMainName("Calculator CNC")
      setNameDrilling("Drilling")
      setNameMilling("Milling")
      setNameBoring("Boring")
    }
  }, [lang])

  return (
    <div className="home-page">
      <div className="lang">
        <span
          id="Ua"
          onClick={(e) => changeLang((e.currentTarget as HTMLButtonElement).id)}
        >
          Ua
        </span>
        <span
          id="Pl"
          onClick={(e) => changeLang((e.currentTarget as HTMLButtonElement).id)}
        >
          Pl
        </span>
        <span
          id="En"
          onClick={(e) => changeLang((e.currentTarget as HTMLButtonElement).id)}
        >
          En
        </span>
      </div>
      <h1 className="pt-3">{mainName}</h1>
      <div className="row operation">
        <div className="col-12 col-md-4 offset-md-2">
          <h2>{nameDrilling}</h2>
          <button
            className="drilling"
            id="drilling"
            onClick={(e) => mainPage((e.currentTarget as HTMLButtonElement).id)}
          >
            <img src={drillHss}></img>
          </button>
        </div>
        <div className="col-12 col-md-4">
          <h2>{nameMilling}</h2>
          <button
            className="milling"
            id="milling"
            onClick={(e) => mainPage((e.currentTarget as HTMLButtonElement).id)}
          >
            <img src={millingCutter}></img>
          </button>
        </div>
        <div className="col-12 col-md-4 offset-md-4 mb-5">
          <h2>{nameBoring}</h2>
          <button
            className="boring"
            id="boring"
            onClick={(e) => mainPage((e.currentTarget as HTMLButtonElement).id)}
          >
            <img src={boringBarRough}></img>
          </button>
        </div>
      </div>
    </div>
  )
}
export default HomePage
