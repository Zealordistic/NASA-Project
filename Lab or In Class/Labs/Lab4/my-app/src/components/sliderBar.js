import React from 'react';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {red: 0,
                    blue: 0,
                    green: 0};
        this.changeRed = this.changeRed.bind(this);
        this.changeBlue = this.changeBlue.bind(this);
        this.changeGreen = this.changeGreen.bind(this);
        this.intToHex = this.intToHex.bind(this);
    }
    intToHex(input) {
        if(Math.abs(input).toString(16).length === 1) 
            return '0'+Math.abs(input).toString(16);
        return  Math.abs(input).toString(16)
    }

    changeRed(event) {
        this.setState({red: event.target.value});
        this.props.callBackRed(event.target.value);
    }
    changeBlue(event) {
        this.setState({blue: event.target.value});
        this.props.callBackBlue(event.target.value);
    }
    changeGreen(event) {
        this.setState({green: event.target.value});
        this.props.callBackGreen(event.target.value);
    }

    render() {
        return (
            <div className="container">
                <h2>Slider Test</h2>
                <div className="container" id="r-slider">
                    <label htmlFor="r">R</label>
                    <input type="range" min="0" max="255" id="r" step="1" value={this.state.red} onChange={this.changeRed}/>
                    <output htmlFor="r" id="r_out">{this.intToHex(this.state.red)}</output>
                </div>
                <div className="container" id="g-slider">
                    <label htmlFor="g">G</label>
                    <input type="range" min="0" max="255" id="g" step="1" value={this.state.green} onChange={this.changeGreen}/>
                    <output htmlFor="g" id="g_out">{this.intToHex(this.state.green)}</output>
                </div>
                <div className="container" id="b-slider">
                    <label htmlFor="b">B</label>
                    <input type="range" min="0" max="255" id="b" step="1" value={this.state.blue} onChange={this.changeBlue}/>
                    <output htmlFor="b" id="b_out">{this.intToHex(this.state.blue)}</output>
                </div>
                <div>{'Current Guess: #' + this.intToHex(this.state.red) + this.intToHex(this.state.green) + this.intToHex(this.state.blue)}</div>
            </div>
        )
    }
}

export default Slider;