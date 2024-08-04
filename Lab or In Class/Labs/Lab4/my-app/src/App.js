import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';
import UserInput from './components/userInput';
import useGenerateRandomColor from './components/targetColor'


function App() {
  // const { color, generateColor } = new useGenerateRandomColor();
  return (
    <div className="App">
      <div className="App-header"> 
      <UserInput/>
      </div>

    </div>
  );
}

export default App;
