
import React from 'react';
import Header from '../FormsUI/Header';
import { Formik, Form } from 'formik';
import axios from "axios"
import { useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {
  Container,Box,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import Textfield from '../FormsUI/Textfield';
import Checkbox from '../FormsUI/Checkbox';
import Button from '../FormsUI/Button';


const INITIAL_FORM_STATE = {
  name: '',
  password : '',
  email: '',
  phno: '',
  address: '',
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  phno: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  address: Yup.string().required('Required'),
  termsOfService: Yup.boolean()
    .oneOf([true], 'The terms and conditions must be accepted.')
    .required('The terms and conditions must be accepted.'),
});

const Register= () => {
  const history = useNavigate();
  
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
           alert("Successfully Registered !! Please Login to Continue")
           history("/login",{state:{id:name}})
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
    <div>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid container component="main" sx={{ height: '100vh' }}>

      <Grid item xs={12}sm={8} md={5} component={Paper} elevation={6} square>

        <Container maxWidth="md" > 
          <div>
          <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
          >
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}
            >
              <Form>

                <Grid container spacing={1.5} >

                  <Grid item xs={12} >
                    <Typography variant="h2" color="primary">
                      REGISTER
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="name"
                      label="name"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                    type="email"
                      name="email"
                      label="Email"
                    />
                  </Grid>

                  
                  <Grid item xs={12}>
                    <Textfield
                     type="password"
                      name="password"
                      label="Password"
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <Textfield
                      name="phno"
                      label="Phone"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="address"
                      label="Address"
                      multiline={true}
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Checkbox
                      name="termsOfService"
                      legend="Terms Of Service"
                      label="I agree"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit">
                      Submit Form
                    </Button>
                  </Grid>

                  
                </Grid>

              </Form>
            </Formik>
          </Box>
          </div>
           
          </Container>
      </Grid>
      <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1680455065~exp=1680455665~hmac=fc5a95cafbac9ad928ac6b0989c7e18b0a5396269d081cd05ebac5ba99d590e2)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      />
    </Grid>
    </div>
  );
};

export default Register;