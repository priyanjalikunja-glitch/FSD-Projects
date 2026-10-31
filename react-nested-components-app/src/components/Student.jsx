function Student(props) {
  return (
    <div style={{
      border: "1px solid black",
      padding: "20px",
      margin: "10px",
      borderRadius: "10px"
    }}>
      <h2>Student Details</h2>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

export default Student;