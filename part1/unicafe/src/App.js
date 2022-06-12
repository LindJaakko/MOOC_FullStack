import { useState } from "react";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / sum;
  const positive = props.good / sum;
  if (sum === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} percent={"%"} />
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      {props.percent && <td>{props.percent}</td>}
    </tr>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => {
    console.log("value now", newValue);
    setGood(newValue);
  };

  const setToNeutral = (newValue) => {
    console.log("value now", newValue);
    setNeutral(newValue);
  };

  const setToBad = (newValue) => {
    console.log("value now", newValue);
    setBad(newValue);
  };

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
