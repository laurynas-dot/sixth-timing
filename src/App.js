

function App() {

  return (
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
          <button>Replay</button>
          <button>Draging</button>
        </div>
      </div>
    </div>
  );
}

export default App;