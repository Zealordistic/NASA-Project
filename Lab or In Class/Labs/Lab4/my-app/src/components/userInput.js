import React from 'react';
import GenerateRandomColor from './targetColor';
import Timer from './Timer';
import Slider from './sliderBar';
import GuessButton from './userGuess';

class UserInput extends React.Component {
    // useState()
    constructor(props) {
        super(props);
        this.state = {name: '',
                    starttime: '',
                    currtime: '',
                    submitted: false,
                    attempt_red: '',
                    attempt_green: '',
                    attempt_blue: '',
                    answer: '',
                    score : ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleFinalTime = this.handleFinalTime.bind(this);
        this.handleSliderRed = this.handleSliderRed.bind(this);
        this.handleSliderGreen = this.handleSliderGreen.bind(this);
        this.handleSliderBlue = this.handleSliderBlue.bind(this);
        this.handleScore = this.handleScore.bind(this);
    }

    handleScore(response) {
        this.setState({score: response});
    }
    handleSliderRed(response) {
        // console.log(response);
        this.setState({attempt_red: response});
    }
    handleSliderGreen(response) {
        this.setState({attempt_green: response});
    }
    handleSliderBlue(response) {
        this.setState({attempt_blue: response});
    }

    handleAnswer(response) {
        this.setState({answer: response});
    }

    handleChangeTime(event) {
        this.setState({starttime: (parseInt(event.target.value) > 100) ? 100 : event.target.value});
    }

    handleFinalTime(response) {
        this.setState({currtime: response});
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        document.getElementById('name').innerHTML = "Username: "+this.state.name;
        if(this.state.starttime === '' || isNaN(parseInt(this.state.starttime)))
            document.getElementById('time').innerHTML = "Game time: 60 seconds";
        else
            document.getElementById('time').innerHTML = "Game time: "+this.state.starttime+" seconds";
        document.getElementById('user-name').style.display = "none";
        document.getElementById('user-seconds').style.display = "none";
        document.getElementById('submitbutton').style.display = "none";
        this.setState({submitted: true});
        event.preventDefault();
    }
    

    render() {
        return (
            <div className="container" id="submission">
                <h1 id="name">Welcome to Hexed!</h1>
                <h1 id="time">Please input your name and desired game time below:</h1>
                <div className="container" id="user-name">
                    <div className="row g-3 align-items-center">
                        <section className = "col-lg-3"></section>
                        <div className="col-lg-2">
                            <label htmlFor="inputName" className="col-form-label">New Name</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" id="inputName" className="form-control" placeholder = "Enter username here" value={this.state.name} onChange={this.handleChangeName}/>
                        </div>
                    </div>
                </div>
                <div className="container" id="user-seconds">
                    <div className="row g-3 align-items-center">
                        <section className = "col-lg-3"></section>
                        <div className="col-lg-2">
                            <label htmlFor="inputTime" className="col-form-label">Seconds</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" id="inputTime" className="form-control" placeholder = "Must be 1-100 seconds long" value={this.state.starttime} onChange={this.handleChangeTime}/>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" id = "submitbutton" onClick={this.handleSubmit}>Submit</button>
                {this.state.submitted === true && <GenerateRandomColor callBackAnswer = {this.handleAnswer} />}
                {this.state.submitted === true && <Timer userTime = {this.state.starttime} callBackTime = {this.handleFinalTime} shouldStop = {this.state.score}/>}
                {this.state.submitted === true && <Slider callBackRed = {this.handleSliderRed} callBackBlue = {this.handleSliderBlue} callBackGreen = {this.handleSliderGreen}/>}
                {this.state.submitted === true && <GuessButton userInputState = {this.state} returnScore = {this.handleScore}/>}
            </div>
            //  callBackBlue = {this.handleSliderBlue} callBackGreen = {this.handleSliderGreen}
            
            
        )
    }
}

export default UserInput;