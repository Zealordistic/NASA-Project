import React from 'react';

class Timer extends React.Component {
    constructor(props) {
      super(props);
      if(isNaN(parseInt(this.props.userTime)) || parseInt(this.props.userTime) < 1){
        this.state = {seconds: 60};
      }
      else this.state = { seconds: parseInt(this.props.userTime)};
      this.props.callBackTime(this.props.userTime);
    }
  

    tick() {
      if(this.state.seconds === 0)
      {
        clearInterval(this.interval);
        this.setState( ({
          seconds: 0
        }));
        return;
      }
      this.setState(state => ({
        seconds: state.seconds - 1
      }));
      this.props.callBackTime(this.state.seconds - 1);
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }

  
    render() {
      if (this.state.seconds <= 0 && this.props.shouldStop === '') {
        clearInterval(this.interval);
        return (
            <div>
              You Lost!
            </div>
        );
      }
      else if(this.state.seconds >= 0 && this.props.shouldStop !== '') {
        return (
          <div>
            Score: {this.props.shouldStop}
          </div>
        )
      }
      else {
        return (
        <div>
            Seconds: {this.state.seconds}
        </div>
        );
      }
    }
  }


  export default Timer;