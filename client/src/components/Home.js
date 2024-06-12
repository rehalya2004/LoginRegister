import React from 'react';
import { Grid, Typography ,Button} from '@mui/material';
import Header from '../FormsUI/Header';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

function Home() {
  const navigate = useNavigate()
  return (
    <div> 
      <Grid item xs={12} >
        <Header />
      </Grid>     
      <Grid container component="main" sx={{ height: '100vh' }}>
     
     
      <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(https://cdn.shopify.com/s/files/1/0561/2073/7892/files/background-02.jpg?v=1641067730)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
      <div align = "center">
      <br/><br/><br/><br/><br/>
      <Typography variant="h1" color="#e0f7fa" fontFamily="Helvetica Neue" letterSpacing={2} >VISUAL  LEARNING</Typography>
      <Typography variant="h4" color="#03a9f4">Let's learn and have fun :) </Typography>
      <br/><br/><br/><br/><br/>
      <Button variant="contained" color="primary"  onClick={()=> navigate("/signup" )} 
      sx={{height: 50 , width : 350,fontSize: 25 } } 
      endIcon={<SendIcon size="large"/>}>
         GET STARTED
      </Button>
      </div>

      </Grid>
      </Grid>
    </div>
  )
}

export default Home
