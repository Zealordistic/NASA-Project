import React, {useEffect, useState, useRef} from 'react';
import Checkboxes from './checkboxes';

const SearchSelection = () => {
    return (
        <div className="container" id="select-search">
            <h1>Search Parameters:</h1>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Accordion Item #1
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <div class="container text-center">
                                <div class="row">
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Latitude">
                                        </Checkboxes>
                                    </div>
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Longtitude">
                                        </Checkboxes>
                                    </div>
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Address">
                                        </Checkboxes>
                                    </div>
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Zip Code">
                                        </Checkboxes>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col">
                                        <Checkboxes 
                                        value = "State">
                                        </Checkboxes>
                                    </div>
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Plant Code">
                                        </Checkboxes>
                                    </div>
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Plant Name">
                                        </Checkboxes>
                                    </div>
                                    <div class="col">
                                        <Checkboxes 
                                        value = "Plant Type">
                                        </Checkboxes>
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

export default SearchSelection;