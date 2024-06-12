// import axios from "axios";
// import decode from "jwt-decode";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// function Home() {

//   const store = localStorage.getItem("token")
//   var data = decode(store)

//   const [name, changeName] = useState(data.name)
//   const [email, changeEmail] = useState(data.email)
//   const [phno, changePhno] = useState(data.phno)
//   const [address, changeAddress] = useState(data.address)

//   const navigate = useNavigate();
//   const Link = () => {
//     localStorage.removeItem("token")
//     navigate('/')

//   }

//   const auth = {
//     method: "DELETE",
//     headers: { 'Authorization': `Bearer ${store}` }
//   }

//   const remove = (email) => {
//     axios.delete(`http://localhost:8000/delete/${email}`, auth)
//       .then(res => {
//         console.log(res.data);
//         changeName("")
//         changeEmail("")
//         changePhno("")
//         changeAddress("")
//       })
//       .catch(err => console.log(err))
//   }


//   const auth2 = {
//     method: "PUT",
//     headers: { 'Authorization': `Bearer ${store}` }
//   }

//   const edit = (id) => {

//     const handleChange1 = (e) => {
//       changeName(e.target.value);
//       <button>Save</button>
//     }
//     const handleChange2 = (e) => {
//       changePhno(e.target.value);
//       <button>Save</button>
//     }
//     const handleChange3 = (e) => {
//       changeAddress(e.target.value);
//       <button>Save</button>
//     }

//     changeName(<input type="text" name="name" value={data.name} id="name" onChange={(e) => handleChange1(e)} />)
//     changePhno(<input type="text" name="phno" value={data.phno} id="name" onChange={(e) => handleChange2(e)} />)
//     changeAddress(<input type="text" name="address" value={data.address} id="name" onChange={(e) => handleChange3(e)} />)

//     axios.put(`http://localhost:8000/update/${id}`, auth2)
//       .then(res => {

//       })
//       .catch(err => console.log(err))
//   }

//   return (
//     <div className="cardcard">
//       Name:{name}<br></br>
//       Email:{email}<br></br>
//       Address:{address}<br></br>
//       Phone No:{phno}<br></br><br></br>
//       <button onClick={() => edit(data._id)}>Edit</button> <button onClick={() => remove(email)}>Delete</button><br></br><br></br>
//       <button type="button" class="submit_btn" onClick={Link}>LOG OUT</button>
//     </div>


//   );
// }
// export default Home



import React, { useState} from "react";
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Login.css"


function Login() {

  const history = useNavigate();

  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

 
 
  async function submit(e){
    e.preventDefault();

    try{
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
    <div className="container">
    <div className="box">
      <h1>Login</h1>
      <form action = "POST">

        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} 
         name = "email" id ="email" placeholder="Email"/>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}}
         name="password" id="password" placeholder="Password"/>
        
        <input type = "submit" onClick = {submit}  className= "button"/>
    </form>

    <br/>
    Create New Account ? 
    <Link to = "/signup" className="Link"> Signup </Link>
    </div>
    </div>
  )
}

export default Login


// import { useEffect,useState } from "react";
// import {faTrash} from "@fortawesome/free-solid-svg-icons"
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// function Info(){
//     const [data,setData]=useState([]);

//     useEffect(()=>{
//         getAllUser();
//     },[])

//     const getAllUser=()=>{
//         fetch("http://localhost:8000/users",{
//             method:"GET"
//         }).then(res=>res.json())
//         .then(data=>{
//             console.log(data,"userData")
//             setData(data.data)
//         })
//     }

//     const deleteUser=(id,name)=>{
//         if(window.confirm(`Are you sure you want to delete ${name}`)){
//             fetch("http://localhost:8000/deleteUser",{
//                 method:"POST",
//                 crossDomain:true,
//                 headers:{
//                     "Content-Type":"application/json",
//                     Accept:"application/json",
//                     "Access-Control-Allow-Origin":"*",
//                 },
//                 body:JSON.stringify({
//                     userid:id
//                 }),
//             })
//             .then(res=>res.json())
//             .then(data=>{
//                 alert(data.data);
//                 getAllUser();
//             });
//         }else{

//         }
//     }

//     return(
//         <div>
//         <h1 style={{"width":"auto"}}>Users</h1>
//         <table style={{"width":"500px"}}>
//             <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Address</th>
//                 <th>Mobile Number</th>
//                 <th>Delete</th>
//                 <th></th>
//             </tr>
//             </thead>
//             {data.map(i=>{
//                 return (
//                     <tr>
//                         <td>{i.name}</td>
//                         <td>{i.email}</td>
//                         <td>{i.address}</td>
//                         <td>{i.phno}</td>
//                         <td>
//                             <FontAwesomeIcon 
//                             icon={faTrash} 
//                             onClick={()=>deleteUser(i._id,i.name)}/>
//                         </td>
//                     </tr>
//                 )
//             })}
//         </table>
//         </div>
//     )
// }
// export default Info;