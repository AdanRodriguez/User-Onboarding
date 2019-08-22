import React from "react";
import axios from "axios";
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";

const LoginForm = (errors, touched) => {
    return (
    <div>
        <Form>
            <div>
                {touched.username && errors.username && (
                    <p className="error">{errors.username}</p>
                )}
                <Field type="text" name="username" placeholder="Username" />
            </div>
            
            <div>
                {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            
            <div>
                {touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
                <Field type="password" name="password" placeholder="Password" />
            </div>

            <button>Submit!</button>
        </Form>
    </div>
      );
    };

const FormikForm = withFormik({
    mapPropsToValues({username, email, password}){
        return {
            username: username || "",
            email: email || "",
            password: password || ""

        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required("Enter Your Username"),
        email: Yup.string().email("Email Not Valid").required("Email is Required"),
        password: Yup.string().min(6, "Password must be 6 characters or longer").required("Password is required")
        }),

    handleSubmit(values) {
        console.log(values);
    }
})(LoginForm);


export default FormikForm;