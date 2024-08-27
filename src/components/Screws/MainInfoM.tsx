import imgHole from "../../assets/diamete-hole.png"
import imgScrew from "../../assets/screw.png"

interface Screw {
  id_screw: number
  type: string
  size: string
  diameter_hole: string
  thread_pitch: string
}

interface MainInfoProps {
  chairScrew: string
  selectSize: string
  filterScrewsToM: Screw
  filterScrewsToMf: Screw[]
}

export default function MainInfoM(props: MainInfoProps) {
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
              {props.selectSize}x{props.filterScrewsToM.thread_pitch}
            </div>
            <div className="col-6 text-primary">
              {props.filterScrewsToM.diameter_hole} mm
            </div>
          </div>

          {props.filterScrewsToMf.length > 0 &&
            props.filterScrewsToMf.map((screw) => (
              <div className="row" key={screw.id_screw}>
                <div className="col-6">
                  {props.chairScrew}
                  {props.selectSize}x{screw.thread_pitch}
                </div>
                <div className="col-6">{screw.diameter_hole} mm</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
