import imgHole from "../../assets/diamete-hole.png"
import imgScrew from "../../assets/screw.png"

interface MainInfoProps {
  chairScrew: string
  selectSize: string
  filterScrewsToG: {
    id_screw: number
    type: string
    size: string
    diameter_hole: string
    thread_pitch: string
  }
}

export default function MainInfoG(props: MainInfoProps) {
  return (
    <div>
      <div className="border border-black bg-white text-dark fs-4">
        <div className="bg-light py-3 border-bottom">
          <div className="row">
            <div className="col-6 text-center">
              <img className="icon-res" src={imgScrew} alt="Screw" />
            </div>
            <div className="col-6 text-center">
              <img className="icon-res" src={imgHole} alt="Hole" />
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="row mb-2">
            <div className="col-6 text-primary">
              {props.chairScrew}
              {props.selectSize}x{props.filterScrewsToG.thread_pitch}
            </div>
            <div className="col-6 text-primary">
              {props.filterScrewsToG.diameter_hole} mm
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
