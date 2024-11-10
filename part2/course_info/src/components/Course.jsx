const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>
        <b>total of {totalExercises} exercises</b>
      </p>
    </div>
  );
};

export default Course;
