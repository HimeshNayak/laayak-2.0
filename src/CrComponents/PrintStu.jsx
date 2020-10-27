import React from "react";
import firebase from "../firebase";

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
    // const docRef2 = db.collection("students").doc(student.email);

    // docRef2
    //   .delete()
    //   .then(() => {
    //     alert("student document deleted");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });

    // removing user authentication
    // ...
  };

  return (
    <tr>
      <td>{student.rollNo}</td>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td><img onClick={handleKick} width="20px" style={{ cursor: "pointer" }} src="https://cdn4.iconfinder.com/data/icons/web-basics-vol-05/512/user_human_person_avatar_minus_close_delete-512.png" alt="kick" /></td>
    </tr>
  );
}

export default PrintStu;
