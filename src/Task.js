import './App.css';

function Task(props) {

  return (
    <div className="task br-8">
      <h6>{props.task?.title}</h6>
      <p>{props.task?.description}</p>
      <span className="time-taken-label"> Time Taken : </span>
      <h4> {props.task?.timeTaken.hh} : {props.task?.timeTaken.mm} : {props.task?.timeTaken.ss} </h4>
    </div>
  );
}

export default Task;
