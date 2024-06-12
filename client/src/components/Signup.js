import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Signup.css"

const Signup = () => {
  const history = useNavigate();

  const initialValues = { name: '', email: '' ,password:"" , phno:"", address: ''}

  const signupSchema = Yup.object({
    name: Yup.string()
      .min(3,"Must be 3 characters or more")
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    phno: Yup.string().required("Required")
      .min(10,"Invalid Phone Number").max(10,"Invalid Phone Number")
      .matches(/^[0-9]/,"Only numbers are allowed"),
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().required("Required"),
    address: Yup.string().required("Required"),

  })

  async function handleSubmit(values){
    try{
      const { name ,email,password,phno ,address} = values
      async function link (e){

      await axios.post("http://localhost:8000/signup",{
         name ,email,password,phno ,address
     })
     .then(res => {

         if(res.data === "exist"){
           alert("User already exist")
           
         }else if(res.data === "not exist"){
           history("/home",{state:{id:name}})
         }
     })
     .catch(e=>{
         alert("Wrong Details");
         console.log(e)
     })

    }
    link()   
   }
    catch(e){
      console.log(e)
   }

  }

  return (
    <div className='container02'>
     <div className='box02'>
      <h1>Signup</h1>
      <Formik
      initialValues={initialValues}
      validationSchema= {signupSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        
        <Field id="name" name="name" type="text" placeholder= "Name" className="input02"/>
        <ErrorMessage name="name" render={msg => <div className="error">{msg}</div>}/>
        
        <Field  id= "email" name="email" type="email" placeholder= "Email"  className="input02"/>
        <ErrorMessage name="email" render={msg => <div className="error">{msg}</div>}/>
        
        
        <Field  id= "phno" name="phno" type="phno" placeholder= "phno"  className="input02"/>
        <ErrorMessage name="phno" render={msg => <div className="error">{msg}</div>}/>

        <Field  id= "address" name="address" type="address" placeholder= "address"  className="input02"/>
        <ErrorMessage name="address" render={msg => <div className="error">{msg}</div>}/>
        
        <Field  id = "password" name="password" type="password" placeholder= "Password"  className="input02" />
        <ErrorMessage name="password" render={msg => <div className="error">{msg}</div>}/>

        <button type="submit" className='button02'>Submit</button>
        <br/><br/>
        
        Already have an account ?  <Link to = "/" className="Link">Login</Link>

      </Form>

     

    </Formik>
      </div>
    </div>

  );
};

export default Signup

