const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.contents[0].exercises +
        props.contents[1].exercises +
        props.contents[2].exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.contents[0].part} {props.contents[0].exercises}
      </p>
      <p>
        {props.contents[1].part} {props.contents[1].exercises}
      </p>
      <p>
        {props.contents[2].part} {props.contents[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const contents = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />

      <Content contents={contents} />

      <Total contents={contents} />
    </div>
  );
};

export default App;
