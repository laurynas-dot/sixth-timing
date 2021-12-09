import React, { Component } from "react";
import FaderText from "./components/FaderText"

import timingR1 from "./assets/timingR1.mp3"
import timingR2 from "./assets/timingR2.mp3"
import timingR3 from "./assets/timingR3.mp3"
import timingR4 from "./assets/timingR4.mp3"
import timingR5 from "./assets/timingR5.mp3"
import timingR6 from "./assets/timingR6.mp3"
import timingR7 from "./assets/timingR7.mp3"
import timingR8 from "./assets/timingR8.mp3"

import timingD1 from "./assets/timingD1.mp3"
import timingD2 from "./assets/timingD2.mp3"
import timingD3 from "./assets/timingD3.mp3"
import timingD4 from "./assets/timingD4.mp3"
import timingD5 from "./assets/timingD5.mp3"
import timingD6 from "./assets/timingD6.mp3"
import timingD7 from "./assets/timingD7.mp3"
import timingD8 from "./assets/timingD8.mp3"

class App extends Component {
  constructor(props) {
    super(props);
    this._message = React.createRef();
  }

  _mpb = 500;

  _message;
  _currentLevelPoints = 0;
  _isRushing = true;
  _isPlaying = false;

  state = {
    audio: new Audio(this._firstTrack),
    health: 5,
    level: 1,
    difference: 250,
    score: 0,
  };

  _tracks = [
    {r: timingR1, d: timingD1},
    {r: timingR2, d: timingD2},
    {r: timingR3, d: timingD3},
    {r: timingR4, d: timingD4},
    {r: timingR5, d: timingD5},
    {r: timingR6, d: timingD6},
    {r: timingR7, d: timingD7},
    {r: timingR8, d: timingD8},
  ];

  getRandomAudio = () => {
    let level = this.state.level;
    this._isRushing = Math.random() < 0.5;

    if (level > 8)
      level = 8;

    const levelTracks = this._tracks[level - 1];
    const track = this._isRushing ? levelTracks.r : levelTracks.d;
    return new Audio(track);
  }

  adjustLevel = (isCorrect) => {
    if (!isCorrect) {
      
      return;
    }
  }

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    if (this.state.audio)
      this.state.audio.pause();

    this.setState({audio: this.getRandomAudio()});
    const power = this.state.level <= 8 ? this.state.level : 8;
    const dividor = Math.pow(2, power);
    this.setState({difference: this._mpb / dividor});
  }

  play = () => {
    this.setState({ _isPlaying: !this._isPlaying });

    this.state.audio.currentTime = 0;
    this.state.audio.play();
  };

  processCorrect = () => {
    this._message.current.displayCorrect();
    this.setState({score: this.state.score + this.state.level});
    this._currentLevelPoints++;
    if (this._currentLevelPoints === 3) {
      this.setState({level: this.state.level + 1 });
      this._currentLevelPoints = 0;
    }
    this.reset();
  }

  processIncorrect = () => {
    this.setState({health: this.state.health - 1});
    if (this.state.level > 1)
      this.setState({level: this.state.level - 1});
    this._currentLevelPoints = 0;

    this._message.current.displayIncorrect();
    this.reset();
  }

  onRush = () => {
    this.state.audio.pause();
    if (this._isRushing)
      this.processCorrect();
    else 
      this.processIncorrect();
  }

  onLag = () => {
    this.state.audio.pause();
    if (!this._isRushing)
      this.processCorrect();
    else 
      this.processIncorrect();
  }

  render() { 
    return(
    <div className="App">
      <div className="timmingPage">
        <div className="topBar">
          <span className="level">Level {this.state.level}</span>
          <span className="health">Health: {this.state.health}</span>
        </div>
        <div className="topMinibar">
          <span>Difference: {this.state.difference}ms</span>
          <span>Score: {this.state.score}</span>
        </div>
        <div className="message">
          <FaderText ref={this._message}></FaderText>
        </div>
        <div className="message">
          <span className="gameOverMessage" hidden={this.state.health > 0}>GAME OVER</span>
        </div>
        <div className="controls">
          <button onClick={this.onRush} disabled={this.state.health <= 0}>Rushing</button>
          <button onClick={this.play} disabled={this.state.health <= 0}>Play</button>
          <button onClick={this.onLag} disabled={this.state.health <= 0}>Dragging</button>
        </div>
      </div>
    </div>
  );
  }
}

export default App;