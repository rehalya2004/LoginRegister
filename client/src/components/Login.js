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
import Button from '../FormsUI/Button';


const INITIAL_FORM_STATE = {

  password : '',
  email: '',

};

const FORM_VALIDATION = Yup.object().shape({
  
  password: Yup.string()
    .required('Required'),
  email: Yup.string()
    .required('Required').email('Invalid email.')
});

const Login= () => {

  const history = useNavigate();
  
  async function handleSubmit(value){
    
    try{
        const { email,password} = value
        await axios.post("http://localhost:8000/login",{
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
    <div>

    <Grid item xs={12}>
    <Header />
    </Grid>

    <Grid container component="main" sx={{ height: '100vh' }} >

      <Grid
          item
          xs={4}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >

        <Container maxWidth="md" > 
          <div>
          <Box
          sx={{
            my: 20,
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
                      LOGIN
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
    </div>
  );
};

export default Login;