import React from 'react';
import Header from '../../components/general/header';
import '../../App.css';
import './Results.css'

export default function Results() {
    return ( 
        <>
        <div className="results">
            <div class="filterHolder">
                <div class="dropdown">
                    <button class="dropbtn">Filter 1</button>
                    <div class="dropdown-content">
                        <a href="#">Thing to apply 1</a>
                        <a href="#">Thing to apply 2</a>
                        <a href="#">Thing to apply 3</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Filter 2</button>
                    <div class="dropdown-content">
                        <a href="#">Thing to apply 1</a>
                        <a href="#">Thing to apply 2</a>
                        <a href="#">Thing to apply 3</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Filter 3</button>
                    <div class="dropdown-content">
                        <a href="#">Thing to apply 1</a>
                        <a href="#">Thing to apply 2</a>
                        <a href="#">Thing to apply 3</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Filter 4</button>
                    <div class="dropdown-content">
                        <a href="#">Thing to apply 1</a>
                        <a href="#">Thing to apply 2</a>
                        <a href="#">Thing to apply 3</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Filter 5</button>
                    <div class="dropdown-content">
                        <a href="#">Thing to apply 1</a>
                        <a href="#">Thing to apply 2</a>
                        <a href="#">Thing to apply 3</a>
                    </div>
                </div>
            </div>
            <div class="resultDisplay">
                <div class="writtenResult">
                    <div class="resultBoxWritten">
                        <h3>Results 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi nullam vehicula ipsum a arcu cursus. Libero id faucibus nisl tincidunt eget nullam non nisi. Feugiat nisl pretium fusce id velit. In arcu cursus euismod quis viverra nibh. Sapien eget mi proin sed. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Eget lorem dolor sed viverra ipsum nunc. Adipiscing enim eu turpis egestas pretium aenean pharetra. Sed elementum tempus egestas sed sed risus pretium quam vulputate.</p>
                    </div>
                    <div class="resultBoxWritten">
                        <h3>Results 2</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi nullam vehicula ipsum a arcu cursus. Libero id faucibus nisl tincidunt eget nullam non nisi. Feugiat nisl pretium fusce id velit. In arcu cursus euismod quis viverra nibh. Sapien eget mi proin sed. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Eget lorem dolor sed viverra ipsum nunc. Adipiscing enim eu turpis egestas pretium aenean pharetra. Sed elementum tempus egestas sed sed risus pretium quam vulputate.</p>
                    </div>
                </div>
                <div class="visualResult">
                    <div class="resultBoxVisual">
                        <h3>GRAPH BUILT HERE (WAITING ON DATA)</h3>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}