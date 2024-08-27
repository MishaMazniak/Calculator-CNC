import "./Screws.scss"
import ImgArrow from "../../assets/left-arrow.png"
import {useDispatch, useSelector} from "react-redux"
import {switchPage, calculationPage} from "../../redux/calculatorData"
import {useState, useEffect} from "react"
import MainInfoM from "./MainInfoM"
import MainInfoG from "./MainInfoG"

interface Screw {
  id_screw: number
  type: string
  size: string
  diameter_hole: string
  thread_pitch: string
}
interface RootState {
  calculatorData: {
    myLang: string
  }
}

function Screws() {
  const dispatch = useDispatch()
  // data from redux
  let infoOfTool = useSelector((state: RootState) => state.calculatorData)
  let lang: string = infoOfTool.myLang
  // text for differents language
  const [nameTitle, setNameTitle] = useState("")
  const [nameTypeM, setNameTypeM] = useState("")
  const [nameTypeG, setNameTypeG] = useState("")
  const [nameType, setNameType] = useState("")
  const [nameSize, setNameSize] = useState("")

  const sizeMetrikScrews = [
    "1",
    "1.2",
    "1.4",
    "1.6",
    "1.8",
    "2",
    "2.2",
    "2.5",
    "3",
    "3.5",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "27",
    "30",
    "33",
    "36",
    "39",
    "42",
    "45",
    "48",
    "52",
    "56",
    "60",
    "64",
    "68"
  ]

  const sizeShaftScrews = [
    "1/16",
    "1/8",
    "1/4",
    "3/8",
    "1/2",
    "5/8",
    "3/4",
    "7/8",
    "1",
    "1_1/8",
    "1_1/4",
    "1_3/8",
    "1_1/2",
    "1_5/8",
    "1_3/4",
    "2",
    "2_1/4",
    "2_3/8",
    "2_1/2",
    "2_3/4",
    "3",
    "3_1/4",
    "3_1/2",
    "3_3/4",
    "4"
  ]
  const [typeScrews, setTypeScrews] = useState(sizeMetrikScrews)
  const [chairScrew, setChairScrew] = useState("M")
  const [selectSize, setSelectSize] = useState("1")
  const [filterScrewsToM, setFilterScrewsToM] = useState<Screw[]>([])
  const [filterScrewsToMf, setFilterScrewsToMf] = useState<Screw[]>([])
  const [filterScrewsToG, setFilterScrewsToG] = useState<Screw[]>([])
  let codingSize: string

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

  function selectTypeScrew(el: string) {
    if (el === "screwM") {
      setTypeScrews(sizeMetrikScrews)
      setChairScrew("M")
      setSelectSize("1")
    } else {
      setTypeScrews(sizeShaftScrews)
      setChairScrew("G")
      setSelectSize("1/16")
    }
  }
  useEffect(() => {
    codingSize = encodeURIComponent(selectSize)
    const fetchDataScrews = async () => {
      try {
        const response = await fetch(
          `https://calculator-cnc.pl/screws/${codingSize}`
        )
        const data = await response.json()
        setFilterScrewsToM(data.filter((screw: Screw) => screw.type === "m"))
        setFilterScrewsToMf(data.filter((screw: Screw) => screw.type === "mf"))
        setFilterScrewsToG(data.filter((screw: Screw) => screw.type === "g"))
        console.log(data)
      } catch (error) {
        console.error("Error", error)
      }
    }
    fetchDataScrews()
    // text for differents language
    if (lang === "Pl") {
      setNameTitle("Określenie otworu pod gwint")
      setNameType("Typ gwintu")
      setNameSize("Wymiar")
      setNameTypeM("Metryczny")
      setNameTypeG("Rurowy")
    } else if (lang === "Ua") {
      setNameTitle("Визначення отвору під різьбу")
      setNameType("Тип різьби")
      setNameSize("Розмір")
      setNameTypeM("Метрична")
      setNameTypeG("Трубна")
    } else if (lang === "En") {
      setNameTitle("Determination of the tapping hole size")
      setNameType("Type")
      setNameSize("Size")
      setNameTypeM("Metric")
      setNameTypeG("Pipe")
    }
  }, [typeScrews, selectSize])

  return (
    <div className="tolerance">
      <header className="row ms-md-5 pt-3 mb-3 my-nav">
        <div className="col-2 col-md-2 arrow mx-2" onClick={mainPage}>
          <img src={ImgArrow}></img>
        </div>
        <h1 className="col-8 col-md-5 offset-md-1 pb-2">{nameTitle}</h1>
      </header>
      <form>
        <div className="col-10 offset-1 col-md-6 offset-md-3">
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text my_span">{nameType}</span>

            <select
              className="form-select form-select-lg"
              aria-label="Large select example"
              onChange={(e) => {
                selectTypeScrew((e.currentTarget as HTMLSelectElement).value)
              }}
            >
              <option value="screwM">{nameTypeM} (M)</option>
              <option value="screwG">{nameTypeG} (G)</option>
            </select>
          </div>
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text my_span">{nameSize}</span>
            <select
              className="form-select form-select-lg"
              aria-label="Large select example"
              value={selectSize}
              onChange={(e) => {
                setSelectSize(e.target.value)
              }}
            >
              {typeScrews.map((sizeScrews, index) => (
                <option key={index} value={sizeScrews}>
                  {chairScrew} {sizeScrews}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <div className="mt-3">
        <div className="col-10 offset-1 col-md-6 offset-md-3">
          {chairScrew === "M" && filterScrewsToM.length > 0 && (
            <MainInfoM
              chairScrew={chairScrew}
              selectSize={selectSize}
              filterScrewsToMf={filterScrewsToMf}
              filterScrewsToM={filterScrewsToM[0]}
            />
          )}
          {chairScrew === "G" && filterScrewsToG.length > 0 && (
            <MainInfoG
              chairScrew={chairScrew}
              selectSize={selectSize}
              filterScrewsToG={filterScrewsToG[0]}
            />
          )}
          <div className="col-12 img-taping border border-black"></div>
        </div>
      </div>
    </div>
  )
}
export default Screws
