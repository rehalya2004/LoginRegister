import { useEffect, useState } from "react";
import { IconButton,Button} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Textfield from '../FormsUI/Textfield';
import {
    Grid, Box, Container
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';


function Info() {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [userId, setUserId] = useState(null)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Required!")
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
        address: Yup.string()
            .required("Required!"),
        mobile: Yup.string()
            .required("Required!")
            .min(10, "Invalid Number!")
            .max(10, "Invalid Nummber!")
            .matches(/^\d+$/, "Only digits are allowed"),
    })

    useEffect(() => {
        getAllUser();
    }, [])

    const Logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const getAllUser = () => {
        fetch("http://localhost:8000/users", {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                console.log(data, "userData")
                setData(data.data)
                setName("")
                setAddress("")
                setMobile("")
            })
    }

    const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            fetch("http://localhost:8000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id
                }),
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.data);
                    getAllUser();
                });
        } else {

        }
    }


    function selectUser(index) {
        handleClickOpen()
        const item = data[index]
        setName(item.name)
        setAddress(item.address)
        setMobile(item.phno)
        setUserId(item._id)
    }

    function updateUser(values) {
        console.warn(name, address, mobile, userId)
        fetch(`http://localhost:8000/update/${userId}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                address: values.address,
                mobile: values.mobile
            })
        }).then((result) => {
            result.json().then(resp => {
                console.warn(resp)
                handleClose();
                getAllUser();
            })
        })
    }

    return (
        <div>
            <h1 style={{ "width": "auto" }}>Users</h1>
            <table style={{ "width": "500px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                {data.map((i, index) => {
                    return (
                        <tr key={index}>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>{i.address}</td>
                            <td>{i.phno}</td>
                            <td>
                                <IconButton
                                    onClick={() => selectUser(index)}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </td>

                            <td>
                                 <IconButton
                                    onClick={() => deleteUser(i._id, i.name)}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </td>

                        </tr>
                    )
                })}
            </table>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit </DialogTitle>
                <DialogContent>
                    <Container maxWidth="lg" >
                        <div>
                            <Box
                                sx={{
                                    marginTop: 6,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: 400

                                }}
                            >
                                <div>
                                    <Formik
                                        initialValues={{ name, address, mobile }}
                                        validationSchema={validationSchema}
                                        onSubmit={updateUser}
                                    >
                                        <Form>
                                            <Grid container spacing={1.5} >


                                                <Grid item xs={6} >
                                                    <Textfield
                                                        id="name"
                                                        name="name"
                                                        label="name"
                                                    />
                                                </Grid>


                                                <Grid item xs={6} >
                                                    <Textfield
                                                        id="mobile"
                                                        name="mobile"
                                                        label="Phone"
                                                    />
                                                </Grid>

                                                <Grid item xs={12} >
                                                    <Textfield
                                                        name="address"
                                                        label="Address"
                                                        multiline={true}
                                                        rows={4}
                                                    />
                                                </Grid>



                                                <Grid item xs={12} >
                                                    <DialogActions> 
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button type= "submit">Save</Button>
                                                     </DialogActions>
                                                </Grid>



                                            </Grid>
                                        </Form>
                                    </Formik>
                                </div>
                            </Box>
                        </div>

                    </Container>
                </DialogContent>
            </Dialog>

            <br></br>

            <Button onClick={Logout}> Logout</Button>
        </div>
    )
}
export default Info;