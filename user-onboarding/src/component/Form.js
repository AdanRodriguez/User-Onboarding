import React,{useState, useEffect} from "react";
import axios from "axios";
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";

const LoginForm = ({errors, touched, values, status}) => {

    const [forms, setForms] =useState([]);
    useEffect(() => {
        if (status) {
            setForms([...forms, status]);
        }
    }, [status]);

    return (
    <div>
        <Form>
            <div>
                <Field type="text" name="username" placeholder="Username" />
                {touched.username && errors.username && (
                    <p className="error">{errors.username}</p>
                )}
            </div>
            
            <div>
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}
            </div>
            
            <div>
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
            </div>
                
            <Field component="select" name="membership">
                <option value="gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
            </Field>

            <label>
                <Field type="checkbox" name="tos" checked={values.tos} />
                Accept TOS
            </label>

            <button type="submit">Submit!</button>
        </Form>
        {forms.map(item => (
            <ul key={item.id}>
                <p>Username: {item.username}</p>
                <p>Email: {item.email}</p>
                <p>Password: {item.password}</p>
            </ul>
        ))}
    </div>
      );
    };

const FormikForm = withFormik({
    mapPropsToValues({username, email, password, tos, membership}){
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
            membership: membership || "silver"
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required("Enter Your Username"),
        email: Yup.string().email("Email Not Valid").required("Email is Required"),
        password: Yup.string().min(6, "Password must be 6 characters or longer").required("Password is required")
        }),

    handleSubmit(values, {setStatus}) {
        axios.post("https://reqres.in/api/users", values)
        .then(response => {setStatus(response.data)})
        .catch(err => console.log(err.response))
        console.log(values);
    }
})(LoginForm);


export default FormikForm;