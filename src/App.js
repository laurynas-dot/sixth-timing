import React, { Component } from "react";
import timingR1 from "./assets/timingR1.mp3"

class App extends Component {
  state = {
    audio: new Audio(timingR1),
    isPlaying: false
  };

  isRushing = true;
  health = 5;
  
  setup = () => {
    if (this.state.audio)
      this.state.audio.pause();

    this.state.audio = timingR1;
    this.isRushing = true;
    this.replay();
  }

  replay = () => {

    const isPlaying = this.state.isPlaying;

    this.state.audio.currentTime = 0;
    this.state.audio.play();

    this.setState({ isPlaying: !isPlaying });
  };

  proccessCorrect = () => {

  }

  proccessIncorrect = () => {
    --this.health;
  }

  onRush = () => {
    if (this.isRushing)
      this.proccessCorrect();
    else 
      this.proccessIncorrect();
  }

  onLag = () => {
    if (!this.isRushing)
      this.proccessCorrect();
    else 
      this.proccessIncorrect();
  }

  render() { return(
    <div className="App">
      <div className="timmingPage">
        <div className="topBar">
          <span className="level">Level 1</span>
          <span className="health">Health: 5</span>
        </div>
        <div className="difference">
          <span>Difference: 500ms</span>
        </div>
        <div className="message">
          <span>Incorrect</span>
        </div>
        <div className="controls">
          <button>Rushing</button>
          <button onClick={this.replay}>Replay</button>
          <button>Draging</button>
        </div>
      </div>
    </div>
  );
  }
}

export default App;