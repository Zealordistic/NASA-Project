import React, {useEffect, useState, useRef} from 'react';
import Checkbox from './checkboxes';

const ClimateSearchSelection = ({onCheckClick}) => {
    const searchCheckClick = (event) => {
        onCheckClick(event.target.checked, event.target.name);
    }

    return (
        <div className="container" id="select-search">
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Data Inputs
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                        <div class="container text-center">
            
                            <div class="row">
                                <div className="col">
                                    <Checkbox value="Longitude" callBackCheck={searchCheckClick}/>
                                </div>
                                <div className="col">
                                    <Checkbox value="Latitude" callBackCheck={searchCheckClick}/>
                                </div>
                                <div className="col">
                                    <Checkbox value="Address" callBackCheck={searchCheckClick}/>
                                </div>
                                <div className="col">
                                    <Checkbox value="City" callBackCheck={searchCheckClick}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Checkbox value="State" callBackCheck={searchCheckClick}/>
                                </div>
                                <div className="col">
                                    <Checkbox value="Zip Code" callBackCheck={searchCheckClick}/>
                                </div>
                                <div className="col">
                                    <Checkbox value="Precipitation" callBackCheck={searchCheckClick}/>
                                </div>
                                <div className="col">
                                    <Checkbox value="Date" callBackCheck={searchCheckClick}/>
                                </div>
                            </div>
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default ClimateSearchSelection;