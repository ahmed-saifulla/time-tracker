import { useState } from 'react';
import './App.css';
import Modal from './Modal';
import Tasks from './Tasks';
import Timer from './Timer';

function App() {

  const [liveStopWatch, setLiveStopWatch] = useState({ hh: 0, mm: 0, ss: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tasks, setTasks] = useState([])

  return (
    <>
      <div className="App">

        <Timer
          liveStopWatch={liveStopWatch}
          onUpdateLiveStopWatch={(tempLiveStopWatch) => {
            setLiveStopWatch(tempLiveStopWatch)
          }}
          onModalOpen={() => {
            setIsModalOpen(true)
          }}
        />

        <Tasks tasks={tasks} onClear={() => {
          setTasks([])
        }} />

      </div>

      {isModalOpen ?
        <Modal
          liveStopWatch={liveStopWatch}
          onCancel={() => {
            setIsModalOpen(false)
          }}
          onSave={(task) => {
            setTasks([...tasks, task])
          }}
        />
        : null}
    </>
  );
}

export default App;
