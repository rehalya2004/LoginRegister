import React from 'react';
import Header from '../FormsUI/Header';
import { Formik, Form } from 'formik';
import axios from "axios"
import { useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {
  Container,Box,
  Grid,
  Typography
} from '@mui/material';
import Textfield from '../FormsUI/Textfield';
import Button from '../FormsUI/Button';


const INITIAL_FORM_STATE = {

  password : '',
  email: '',

};

const FORM_VALIDATION = Yup.object().shape({
  
  password: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
});

const Login= () => {

  const history = useNavigate();
  
  async function handleSubmit(value){
    
    try{
        const { email,password} = value
        await axios.post("http://localhost:8000/",{
            email,password
        })
        .then(res => {
            if(res.data.msg === "exist"){
              history("/home",{state:{id:email}})
              localStorage.setItem("token",res.data.data)

            }else if(res.data === "not exist"){
                alert ("User have not signup")
            }
        })
        .catch(e=>{
            alert("Wrong Details");
            console.log(e)
        })
       }
       catch(e){
         console.log(e)
        }

  }

  return (
    <Grid container>

      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={6}>

        <Container maxWidth="md" > 
          <div>
          <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width:400
            
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
                    <Typography>
                      REGISTER
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
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
                    <Button>
                       Submit
                    </Button>
                  </Grid>

                  
                </Grid>

              </Form>
            </Formik>
          </Box>
          </div>
           
          </Container>
      </Grid>
    </Grid>
  );
};

export default Login;