import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import StuList from "./StuList";

const db = firebase.firestore();

function PrintStu({ student, style, stuList, code }) {
  const handleKick = () => {
    alert("roll num: " + student.rollNo);

    // deleting from class list
    const newList = stuList.filter((stu) => stu.rollNo !== student.rollNo);
    const docRef1 = db
      .collection("classes")
      .doc(code)
      .collection("details")
      .doc("stuList");
    docRef1
      .update({ studentsList: newList })
      .then(() => {
        alert("successfully kicked");
      })
      .catch((err) => alert(err.message));

    // deleting document created
    const docRef2 = db.collection("students").doc(student.email);

    docRef2
      .delete()
      .then(() => {
        alert("student document deleted");
      })
      .catch((err) => {
        alert(err.message);
      });

    // removing user authentication
    // ...
  };

  return (
    <tr style={style}>
      <td style={style}>{student.rollNo}</td>
      <td style={style}>{student.name}</td>
      <td style={style}>{student.email}</td>
      <td style={{ ...style, cursor: "pointer" }} onClick={handleKick}>
        ❌
      </td>
    </tr>
  );
}

export default PrintStu;
