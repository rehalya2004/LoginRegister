import { useEffect, useState } from "react";
import Header from '../FormsUI/Header';
import { IconButton, Button, Fab, Divider } from "@mui/material";
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
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, tableCellClasses } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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
        <Grid container>

            <Grid item xs={12}>
                <Header />
            </Grid>

            <Grid item xs={12}>
                <Container maxWidth="md" >
                    <div>
                        <Box
                            sx={{
                                marginTop: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',

                            }}
                        >
                            <TableContainer component={Paper} sx={{ height: 270 }}>
                                <Table stickyHeader aria-label="sticky table" sx={{ height: "max-content" }}>
                                    <TableHead>
                                        <StyledTableRow >
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Address</StyledTableCell>
                                            <StyledTableCell align="center">Phone number</StyledTableCell>
                                            <StyledTableCell align="center">Edit</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </StyledTableRow >
                                    </TableHead>

                                    <TableBody>

                                        {data.map((i, index) => {
                                            return (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{i.name}</StyledTableCell>
                                                    <StyledTableCell align="center">{i.phno}</StyledTableCell>
                                                    <StyledTableCell align="center">{i.address}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton
                                                            onClick={() => selectUser(index)}
                                                            color="success"
                                                            aria-label="menu"
                                                        >
                                                            <EditIcon style={{ color: "green" }} />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton
                                                            onClick={() => deleteUser(i._id, i.name)}
                                                            edge="start"
                                                            color="error"
                                                            aria-label="menu"
                                                        >
                                                            <DeleteIcon style={{ color: "red" }} />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow >
                                            )
                                        })}

                                    </TableBody>
                                </Table>

                            </TableContainer>


                            <Dialog open={open} onClose={handleClose}>

                                <DialogTitle variant="h5" align="center" color="primary">EDIT DETAILS</DialogTitle>
                                <Divider variant="middle" color="secondary" />
                                <DialogContent>
                                    <Container maxWidth="md" >
                                        <div>
                                            <Box
                                                sx={{
                                                    marginTop: 2,
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
                                                                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                                                                        <Button type="submit" variant="outlined" color="success">Save</Button>
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

                            <Fab onClick={Logout} variant="extended" color="primary"> Logout</Fab>
                        </Box>
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}
export default Info;