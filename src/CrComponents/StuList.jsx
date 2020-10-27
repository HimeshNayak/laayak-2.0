import React, { useState, useEffect } from "react";
import PrintStu from "./PrintStu";
import firebase from "../firebase";
import { Table } from "react-bootstrap";

const db = firebase.firestore();

function StuList({ code }) {
  const style = { border: "1px solid black", padding: 3 };

  const [stu, setStu] = useState([]);

  useEffect(() => {
    const docRef = db
      .collection("classes")
      .doc(code)
      .collection("details")
      .doc("stuList");
    docRef.onSnapshot((snap) => {
      setStu([...snap.data().studentsList]);
    });
  },);

  return (
    <div>
      <h1> this is the students list component</h1>
      <Table striped bordered responsive className="mx-auto" style={{ maxWidth: "600px" }}>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Kick</th>
          </tr>
        </thead>
        <tbody>
          {stu.map((student) => (
            <PrintStu
              student={student}
              style={style}
              key={student.rollNo}
              stuList={stu}
              code={code}
            />
          ))}          
        </tbody>
      </Table>
    </div>
  );
}

export default StuList;
