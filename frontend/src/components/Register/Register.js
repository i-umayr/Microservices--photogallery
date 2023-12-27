import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

function Register(props) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    setError("");

    try {
      const apiEndpoint = process.env.REACT_APP_AUTH_BACKEND;
      const response = await axios.post(`${apiEndpoint}/register`, values);

      signIn({
        token: response.data.token,
        userId:response.data.userId,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email,userId:response.data.userId,token: response.data.token },
      });
      localStorage.setItem("authToken", response.data.token);
      navigate("/");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };
const loginHandler=(event)=>{
  event.preventDefault()
    navigate("/login");
}
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className={`${classes.container}`}>
      <form
        onSubmit={formik.handleSubmit}
        className={` ${classes["border"]} ${classes["rounded"]} ${classes["m-5"]} ${classes["bg-light"]} ${classes["p-4"]} ${classes["square-form"]} pb-5 pt-2 px-5`}
      >
        <p className="text-danger">{error}</p>
        <h3 className="mb-3">Register</h3>
        <div className="mb-3">
          <input
            className={`form-control ${
              formik.touched.username && formik.errors.username ? "is-invalid" : ""
            }`}
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username"
            type="username"
          />
          <div className="invalid-feedback">
            {formik.touched.username && formik.errors.username}
          </div>
        </div>
        <div className="mb-3">
          <input
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            type="email"
          />
          <div className="invalid-feedback">
            {formik.touched.email && formik.errors.email}
          </div>
        </div>
        <div className="mb-3">
          <input
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            type="password"
          />
          <div className="invalid-feedback">
            {formik.touched.password && formik.errors.password}
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={formik.isSubmitting}
          style={{ width: '100%' }}
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>
        {/* <button
          className="btn btn-secondary"
          type="button"
          disabled={formik.isSubmitting}
          onClick={loginHandler}
        >Login</button> */}
      
      <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '1rem' }}>
          Already have an account?
          <a
            href=""
            onClick={loginHandler}
            // disabled={formik.isSubmitting}
            style={{ color: '#007bff', textDecoration: 'none' }}
          >
            &nbsp; Sign In.
          </a>
        </p>

        <p class="leading-normal mt-2 flex items-center justify-center">
         &#x1F512; Credentials are secure and encrypted</p>
      
      </form>
    </div>
  );
}

export default Register;
