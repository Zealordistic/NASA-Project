import React from 'react';

class GenerateRandomColor extends React.Component  {
    constructor(props) {
      super(props);
      this.state = {color: ''}
      this.generateColor = this.generateColor.bind(this);
    }
    // const [color,setColor] = useState("")
    generateColor() {
        let result = Math.random().toString(16).substr(-6);
        this.setState({color: "#" + result});
        this.props.callBackAnswer(result);
        // console.log(this.props.callBackAnswer);
    };
    
    componentDidMount() {
      this.generateColor();
      // console.log(this.state.color);
      // this.props.callBackAnswer(this.state.color);
    }

    render() {
      return (
        <div>
        {/* <button className="colorButton" onClick={}>
          Generate random color
        </button> */}
        <div className="colorBox" id="color-answer"
          style={{backgroundColor: this.state.color}}
        ></div>
        </div>
      )
    }
    // {color,generateColor};
      
};

export default GenerateRandomColor;

