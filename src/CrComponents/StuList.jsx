import React, { useState, useEffect } from "react";
import PrintStu from "./PrintStu";
import firebase from "../firebase";

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
  }, []);

  const printList = () => {
    stu.map((student) => {
      return <PrintStu student={student} />;
    });
  };

  return (
    <div>
      <h1> this is the students list component</h1>
      <table style={style}>
        <thead>
          <tr style={style}>
            <th style={style}>Roll Number</th>
            <th style={style}>Name</th>
            <th style={style}>Email</th>
            <th style={style}>Kick</th>
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
      </table>
    </div>
  );
}

export default StuList;
