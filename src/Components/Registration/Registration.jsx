// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebase";
// import { doc, setDoc } from "firebase/firestore";
// import styles from "./Registration.module.css";

// const RegisterModal = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         email: user.email,
//         roles: ["user"],
//       });

//       console.log("User registered successfully:", user);
//      // Close modal after successful registration
//     } catch (err) {
//       setError(err.message);
//       console.error("Registration failed:", err);
//     }
//   };

//   return (
//     <div>
//       {/* Registration Button */}
//       <button className={styles.registrationButton}>
//         Register
//       </button>

//         <div className={styles.overlay}>
//           <div className={styles.modal}>
//             <div className={styles.container}>
//               <div className={styles.leftSide}>
//                 <h1>Create your account</h1>
//                 <span className={styles.lineBreak}></span>
//                 <p>Join the community and start your journey!</p>
//               </div>
//               <button
//                 className={styles.closeButton}

//               >
//                 &times;
//               </button>

//               {/* Registration Form */}
//               <form className={styles.form} onSubmit={handleRegister}>
//                 <div className={styles.rightSide}>
//                   <h3>Register</h3>
//                   <div className={styles.inputContainer}>
//                     <label className={styles.label}></label>
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       className={styles.input}
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className={styles.inputContainer}>
//                     <label className={styles.label}></label>
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       className={styles.input}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   {error && <p className={styles.error}>{error}</p>}
//                   <button type="submit" className={styles.button}>
//                     Register
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//     </div>
//   );
// };

// export default RegisterModal;
