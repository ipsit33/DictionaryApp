import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = async() => {
    if (name !== '' && email !== '' && password !== '') {
      const obj = {
        name: name,
        email: email,
        password: password,
      };

      const res = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      if(data.status === 422 || !data){
        toast.error('Invalid Registration');
      }
      else{
          toast.success('Account created successfully');
          setTimeout( () =>{
            navigate('/');
          },1000);
      }

    } else {
      toast.error('Fill in all the fields', {
        icon: '😱'
      });
    }
  };

  
  // Post data through MONGODB
  // const PostData = async (e) => {
  //   e.preventDefault();
    
  //   const {name,email,pass} = user;
  //   const req = await fetch("/register",{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(user)
  //   });
    
  //   const res = await req.json();
  //   if(res.status === 422 || !res){
  //     alert('Invalid Registration');
  //   }else{
  //     alert("Registration Success");
  //   }
  // }

  return (
    <section
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#eee', overflow: 'hidden' }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <p className="text-center h1 fw-bold mb-5">Sign up</p>
                <form>
                  <div className="mb-4">
                    <i className="fas fa-user fa-lg me-3"></i>
                    <input
                      type="text"
                      id="form3Example1c"
                      className="form-control"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-envelope fa-lg me-3"></i>
                    <input
                      type="email"
                      id="form3Example3c"
                      className="form-control"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-lock fa-lg me-3"></i>
                    <input
                      type="password"
                      id="form3Example4c"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <i className="fas fa-key fa-lg me-3"></i>
                    <input
                      type="password"
                      id="form3Example4cd"
                      className="form-control"
                      placeholder="Repeat Password"
                    />
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3c">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary btn-lg" onClick={submitData}>
                      Register
                    </button>
                    <Toaster />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1688373447~exp=1688374047~hmac=786b084bba576f980a7074e6bec8ff57c9a80a3b60e9e8aa1406080e61f13819"
              className="img-fluid"
              alt="error"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;


// Subarna Code
// import React, { useState } from "react";


// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");


//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Send registration request to the server
//     const response = await fetch("http://localhost:5001/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password, email }),
//     });

//     // const data = await response.json();

//     if (response.ok) {
//       // Registration success
 
//       setUsername("");
//       setPassword("");
//       setEmail("");
//       // Show an alert
//       alert("Registration successful");
//     } else {
//       // Registration failed
//       alert("Invalid credentials");
//     }
//   };

//   return (
 
//           <>
//             <div className="login-container animated fadeInDown bootstrap snippets bootdeys">
//               <div className="loginbox border">
//                 <div className="loginbox-title">REGISTER</div> <hr />
//                 <div className="loginbox-textbox">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Name"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginbox-textbox">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginbox-textbox">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginbox-forgot">
//                   <a href="">Forgot Password?</a>
//                 </div>
//                 <div className="loginbox-submit">
//                   <button className="btn btn-info" onClick={handleRegister}>Register</button>
//                 </div>
//                 <div className="loginbox-signup">
//                   <a href="#register.html">Login</a>
//                 </div>
//               </div>
//             </div>
//           </>
//         );
//       };

// export default Register;