
import DrillPreview from "./drill-preview";
import {DrillModel} from '../../Models/DrillModel';

// Props for the HistoryPage component
interface drillListSingleProps {
  token: string;
  category: string
  setTopic: (topic: string) => void;
  drillList: DrillModel[]
  uniqueDrills: string[]
}

/* 
  This view is the history of the single drills for user
*/
function DrillListSingle({ token,category,setTopic,drillList,uniqueDrills }: drillListSingleProps) {




  return (
          <div className="drill-list">
            {uniqueDrills.map((drillName)=>
                <DrillPreview
                drillName={drillName}
                token={token}
                category={category}
                setTopic={setTopic}
                drillList={drillList}
                />)}
        </div>
    )
}

export default DrillListSingle;
