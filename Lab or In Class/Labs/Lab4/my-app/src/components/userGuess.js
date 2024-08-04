import React from 'react';

class GuessButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {finalscore: ''};
        this.calculateScore = this.calculateScore.bind(this);
        this.hexToDecimal = this.hexToDecimal.bind(this);
    }

    hexToDecimal(color) {
        return parseInt(color, 16);
    }

    calculateScore() {
        // ((255 - abs(actual_red - guessed_red)) + (255 - abs(actual_green - guessed_green)) + (255 - abs(actual_blue - gussed_blue))) * floor(seconds_remaining) * (1000 * (101 - seconds_selected))
        let userin = this.props.userInputState;
        let answer_color = this.props.userInputState.answer.match(/.{1,2}/g);
        let red_score = 255 - Math.abs(this.hexToDecimal(answer_color[0]) - userin.attempt_red);
        let green_score = 255 - Math.abs(this.hexToDecimal(answer_color[1]) - userin.attempt_green);
        let blue_score = 255 - Math.abs(this.hexToDecimal(answer_color[2]) - userin.attempt_blue);
        if(isNaN(parseInt(userin.starttime)) || parseInt(userin.starttime) < 1)
            userin.starttime = '60';
        let score = (red_score + green_score + blue_score) * Math.floor(userin.starttime-userin.currtime) * (1000 * (101 - userin.starttime));
        this.setState({finalscore: score});
        document.getElementById('name').innerHTML= "Game Ended! Press 'Restart' to start a new game!";
        document.getElementById('time').innerHTML= "";
        document.getElementById('guess').innerHTML = 'Restart'
        document.getElementById('guess').onclick = function(){window.location.reload();};
        this.props.returnScore(score);
    }
    render() {
        return (
            <div className="container">
                <button id="guess" onClick={this.calculateScore}>Guess!</button>
                <div className="container" id="score"></div>
            </div>
        )
    }


}
export default GuessButton;