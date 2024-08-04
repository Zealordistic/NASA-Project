import React, {useEffect, useState, useRef} from 'react';
import Tab from './tab';

const MainWindow = () => {

    return (
        <div className="container" id="search-section">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                        Power Plant Data
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                        Climate Data
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <p id="directions">Use the user input check list to enter in the data you have.</p>

                <Tab
                    which_tab = "power plant"
                >
                </Tab>
            </div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <p id="directions">Use the user input check list to enter in the data you have.</p>

                <Tab
                        which_tab = "climate"
                ></Tab>
            </div>
            </div>
        </div>
    )
}

export default MainWindow;