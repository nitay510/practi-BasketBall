
import DrillPreviewCoach from "./drill-preview-coach";
import {DrillModel} from '../../Models/DrillModel';

// Props for the HistoryPage component
interface drillListSingleProps {
  token: string;
  category: string
  drillList: DrillModel[]
  uniqueDrills: string[]
}

/* 
  This view is the drill list for coach
*/
function DrillListForCoach({ token,category,drillList,uniqueDrills }: drillListSingleProps) {




  return (
          <div className="drill-list">
            {uniqueDrills.map((drillName)=>
                <DrillPreviewCoach
                drillName={drillName}
                token={token}
                category={category}
                drillList={drillList}
                />)}
        </div>
    )
}

export default DrillListForCoach