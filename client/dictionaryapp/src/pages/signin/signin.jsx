import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = () => {
    navigate('/signup');
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fetch the data from http://localhost:8080/users using GET method
    // fetch('/login')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const user = data.find((user) => user.email === email && user.password === password);
    //     if (user) {
    //       // Save the token to local storage
    //       localStorage.setItem('token', JSON.stringify(user.id));
    //       alert('You are logged in!');
    //       navigate('/loader');
    //     } else {
    //       alert('Invalid credentials! ');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     alert('An error occurred. Please try again.');
    //   });

    const res = await fetch('/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });

    const data = await res.json();
      if (res.ok) {
      toast.success("Login Success!!",{
        icon: '😎'
      });
      localStorage.setItem("token", JSON.stringify(data.token));
      setTimeout(() => {
        navigate("/loader");
      },1000);
    } else {
      toast.error("Login Failed");
    }    
  };


  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=740&t=st=1688373892~exp=1688374492~hmac=500432d90645362c38f5d0b80217786042288f326b9a917dda46ecf9eb4a638b"
             className="img-fluid rounded"
              alt="error"
              // style={{ height: '550px' }}
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 " style={{ paddingTop: '45px' }}>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">SignIn</p>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="faFacebookF"><FontAwesomeIcon icon={faFacebookF}/></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter"><FontAwesomeIcon icon={faTwitter} /></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-linkedin-in"><FontAwesomeIcon icon={faLinkedinIn} /></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <div className="form-outline mb-4">
              {/* <label className="form-label" htmlFor="email">
                  Email address
                </label> */}
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
              </div>

              <div className="form-outline mb-3">
              {/* <label className="form-label" htmlFor="password">
                  Password
                </label> */}
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me                 
                  </label>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <a onClick={handleSignup} style={{color:"red"}}>Register</a>
                </p>       
                </div>
                {/* <a href="#!" className="text-body">
                  Forgot password?
                </a> */}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <Toaster />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
