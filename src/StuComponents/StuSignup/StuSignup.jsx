import React, { useState, useEffect } from "react";
import "./StuSignup.css";
import firebase from "../../firebase";

const db = firebase.firestore();

function StuSignup() {
  const [code, setCode] = useState(""),
    [email, setEmail] = useState(""),
    [name, setName] = useState(""),
    [rno, setRno] = useState(null),
    [pass, setPass] = useState(""),
    [list, setList] = useState([]);

  useEffect(() => {
    if (code) {
      const checkRef = db.collection("classes").doc(code);
      checkRef.get().then((doc) => {
        if (doc.exists) {
          getCurrentList();
        }
      });
    }
  }, [code]);

  const obj = {
    classCode: code,
    email,
    name,
    rollNo: Number(rno),
    verified: false,
  };

  const getCurrentList = () => {
    const docRef = db
      .collection("classes")
      .doc(code)
      .collection("details")
      .doc("stuList");
    docRef.onSnapshot((doc) => {
      if (doc.data) setList([...doc.data().studentsList]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkDetails();
  };

  const checkDetails = () => {
    const docCheck = db.collection("classes").doc(code);
    docCheck
      .get()
      .then(function (doc) {
        if (doc.exists) {
          getCurrentList();
          createUser();
          createDoc();
          alert("yo! class found - correct alert 1");

          addToCRList();
        } else {
          alert("Wrong class code was entered, please recheck the entry!");
        }
      })
      .catch(function (error) {
        alert("Catch Error in finding the class:\n" + error.message);
      });
  };

  const createUser = () => {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        alert("you are successfully registered");
      })
      .catch((err) => {
        alert("Error while registering you!\n" + err.message);
      });
  };

  const createDoc = () => {
    const docRef = db.collection("students").doc(email);
    docRef.set(obj);
  };

  const addToCRList = () => {
    const docRef = db
      .collection("classes")
      .doc(code)
      .collection("details")
      .doc("stuList");
    const user = {
      rollNo: obj.rollNo,
      name: obj.name,
      email: obj.email,
    };
    let data = [...list, user];

    docRef
      .update({ studentsList: data })
      .then(() => {
        alert("done");
      })
      .catch((err) => {
        alert(`catch: ${err.message}`);
      });
  };

  return (
    <div>
      <h1>Student sign up page!</h1>
      <form onSubmit={handleSubmit}>
        <label>Class code by cr:</label>
        <input
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Name:</label>
        <input type="text" required onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Roll Number:</label>
        <input
          type="number"
          required
          onChange={(e) => setRno(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default StuSignup;
