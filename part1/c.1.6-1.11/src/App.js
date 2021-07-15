import React, { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        <p>No feed back given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <td>
        <tr>
          {props.textGood} {props.good}
        </tr>
        <tr>
          {props.textNeutral} {props.neutral}
        </tr>
        <tr>
          {props.textBad} {props.bad}
        </tr>

        <tr>
          {props.textAll} {props.all}
        </tr>
        <tr>
          {props.textAverage} {props.average}
        </tr>
        <tr>
          {props.textPositive} {props.positive}%
        </tr>
      </td>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const average = all / 3;
  const positive = (good * 1) / 100;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <tr>
          <td>
            <Button handleClick={() => setGood(good + 1)} text="good" />
          </td>
          <td>
            <Button
              handleClick={() => setNeutral(neutral + 1)}
              text="neutral"
            />
          </td>
          <td>
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
          </td>
        </tr>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        positive={positive}
        average={average}
        textGood="Good"
        textBad="Bad"
        textNeutral="Neutal"
        textAll="All"
        textAverage="Average"
        textPositive="Positive"
      />
    </div>
  );
};

export default App;
