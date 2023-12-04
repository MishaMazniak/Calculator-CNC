import "./HomePage.scss"
import matAlum from "../assets/iso-n-al.jpg"
import matStal from "../assets/iso-p-stal.jpg"
import matStalN from "../assets/iso-m-nier.jpg"
import matZel from "../assets/iso-k-zel.jpg"

function DataOnAllPage() {
  return (
    <div className="home-page">
      <div className="row type-material">
        <h4>Materiał obróbki</h4>
        <div className="col-6 col-md-3" id="steel">
          <img src={matStal}></img>
          <h6>Stal</h6>
        </div>
        <div className="col-6 col-md-3" id="aluminum">
          <img src={matAlum}></img>
          <h6>Aluminium</h6>
        </div>
        <div className="col-6 col-md-3" id="stainless-steel">
          <img src={matStalN}></img>
          <h6>Stal nierdzewna</h6>
        </div>
        <div className="col-6 col-md-3" id="cast-iron">
          <img src={matZel}></img>
          <h6>Żeliwo</h6>
        </div>
      </div>
      <div className="row info-choosed">
        <div className="col-10 offset-1 mb-2 border"></div>
        <h4>Dane katalogowe</h4>
        <div>
          Vc = <span>text</span>-<span>text</span> m/min
        </div>
        <div>
          f = <span>text</span>-<span>text</span> mm/zb
        </div>
        <div className="col-10 offset-1 mt-2 border"></div>
      </div>
      <div className="row resoult">
        <h4>Optymalne parametry</h4>
        <div className="col-6 col-md-4 offset-md-1 offset-3 mt-2">
          <p>
            S = <span>text</span>-<span>text</span> ob/min
          </p>
        </div>
        <div className="col-6 col-md-4 offset-md-2 offset-3 mt-2">
          <p>
            F = <span>text</span>-<span>text</span> mm/min
          </p>
        </div>
      </div>
    </div>
  )
}
export default DataOnAllPage

// onClick={(e) =>
//     setTypeMaterial((e.currentTarget as HTMLDivElement).id)
//   }
