import React, {useEffect, useState, useRef} from 'react';
import PPSearchSelection from './pp-search-selection';
import ClimateSearchSelection from './climate-search-selection';
// import Textboxes from './textboxes';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const Textboxes = ({value}) => {
    return (
        <div class="mb-3" id="textboxes">
            <label for={value} class="form-label">{value}</label>
            <input type="text" class="form-control" id={value}/>
        </div>
    )
}


const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div id="calendar">
        Date:
        <DatePicker class="calendar" selected={startDate} onChange={(date) => setStartDate(date)}/>
    </div>
  );
};

const Tab = ({which_tab}) => {
    const [inputList, setinputList] = useState([]);

    const onCheckClick = (ischecked, box_name) => {
        if(ischecked === true) {
            if(box_name === "Date") {
                setinputList(inputList.concat(
                    <Calendar value = {box_name} key={box_name}></Calendar>
                ))
            } else {
                setinputList(inputList.concat(
                    <Textboxes value = {box_name} key={box_name}></Textboxes>
                ))
            }
        } else {
            const newList = inputList.filter((item) => item.key !== box_name);
            setinputList(newList);
        }
        
    }

    if(which_tab === "power plant")
    {
        return (
            <div className="container" id="power-plant">
                <PPSearchSelection onCheckClick={onCheckClick}/>
                {inputList.length === 0 ? <p id="default-pp">Looks like there's nothing to see here...</p>
                : inputList}

            </div>
        )
    }
    else if(which_tab === "climate")
    {
        return (
            <div className="container" id="climate">
                <ClimateSearchSelection onCheckClick={onCheckClick}/>
                {inputList.length === 0 ? <p id="default-climate">Looks like there's nothing to see here...</p>
                : inputList}

            </div>
        )
    }
    
}

export default Tab;