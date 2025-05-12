import React, { useState } from "react";
import { register_api, login_api } from "./api/api.ts";
import Cookies from "js-cookie"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [inlogin, setInlogin] = useState(true);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const update_login = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const verify_register = async () => {
    try {
      const res = await register_api(register);
      console.log(res);
      setInlogin(true);
    } catch (error) {
      console.error(error);
    }
  };

  const verify_login = async () => {
    try {
      const res = await login_api(login);
      console.log(res);
      Cookies.set("JWT Token", res.data.jwt_token)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">
              {inlogin ? "Login" : "Register"}
            </h3>
            {inlogin ? (
              <>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={update_login}
                    value={login.email}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={update_login}
                    value={login.password}
                  />
                </div>
                <button className="btn btn-primary w-100 mb-2" onClick={verify_login}>
                  Login
                </button>
                <div className="text-center">
                  <span>Don't have an account?</span>{" "}
                  <button className="btn btn-link p-0" onClick={() => setInlogin(false)}>
                    Sign up
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    onChange={update}
                    value={register.name}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={update}
                    value={register.email}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={update}
                    value={register.password}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile"
                    name="mobile"
                    onChange={update}
                    value={register.mobile}
                  />
                </div>
                <button className="btn btn-success w-100 mb-2" onClick={verify_register}>
                  Register
                </button>
                <div className="text-center">
                  <span>Already have an account?</span>{" "}
                  <button className="btn btn-link p-0" onClick={() => setInlogin(true)}>
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
