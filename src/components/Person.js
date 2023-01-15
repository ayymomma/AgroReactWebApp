import React from "react";
import { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import { Button, TextField, Pagination, PaginationItem, Stack } from "@mui/material";
import "./Person.css";
import { Add, AllInbox, Delete, Edit, ShowChart, ArrowBack, ArrowForward } from "@mui/icons-material";
import Form from "react-bootstrap/Form"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
const url = "http://localhost:8000/api/person";

const buttonStyle= {
    backgroundColor: "#20df7f",
    border: "none",
    color: "white",
    fontFamily: "Lexend Deca, sans-serif",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 600,
    marginLeft: "20px",
    marginRight: "10px",
    marginTop: "10px",
    cursor: "pointer",
    maxHeight: "40px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
}

export default function PersonPage() {
    const [persons, setPersons] = useState([]);
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [area, setArea] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cnp, setCnp] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [fullname, setFullname] = useState("");
    const [date, setDate] = useState(new Date());
    const [quantityReceipt, setQuantityReceipt] = useState(0);
    const [person_id, setPerson_id] = useState(0);
    const [pages, setPages] = useState(0);
    const [current_page, setCurrentPage] = useState(0);

    var no_per_page = 5;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(url + "/add", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "person_id": 0,
                "first_name": first_name,
                "last_name": last_name,
                "phone": phone,
                "area": area,
                "quantity": quantity,
                "cnp": cnp
            }),
            method: "POST"
        });
        setShowResults(!showResults);
        alert("Person added successfully!");
        fetchPersons();
    }

    const validateForm = () => {
        return first_name.length > 0 && last_name.length > 0 && phone.length > 0 && area.length > 0 && quantity.length > 0 && cnp.length > 0;
    }

    const onClick = () => {
        setShowResults(!showResults);
    }
    
    const fetchPersons = () => {
        fetch(url + "/get/" + current_page + "/" + no_per_page,{
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPersons(data);
        });
    }

    function fetchPages(){
        fetch(url + "/get_no_pages/" + no_per_page,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPages(data.pages);
        });
    }
    
    useEffect(() => {
        fetchPages()
    }, [])

    useEffect(() => {
        fetchPersons()
    }, [current_page])

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogOpen = (person) => {
        setFullname(person.first_name + " " + person.last_name);
        setPerson_id(person.person_id);
        setOpenDialog(true);
    }

    const handleDialogAdd = () => {
        fetch(url + "/add_receipt", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": fullname,
                "date": date,
                "amount": quantityReceipt,
                "person_id": person_id
            }),
            method: "POST"
        });
        setOpenDialog(false);
    }
 
    return (
        <div className="PersonsPage">
            <Sidenav/>
            <main>
                <Button startIcon={<Add/>} variant="contained" style={buttonStyle} onClick={onClick}>Add new person</Button>

                { showResults ? <Form onSubmit={handleSubmit} className = "formAdd">
                    <Form.Group controlId="first_name" className="group">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="last_name" className="group">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="phone" className="group">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="area" className="group">
                        <Form.Label>Area</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="quantity" className="group">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="cnp" className="group">
                        <Form.Label>CNP</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={cnp}
                            onChange={(e) => setCnp(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="contained" style={buttonStyle} disabled={!validateForm()}>Add</Button>
                </Form> : null }

                <h1>All person</h1>
                <div className="container">
                    {
                        persons.map((person) => (
                            <div key={person.person_id} className="person">
                                <div className="personData">
                                    <p>{person.first_name + " " + person.last_name}</p>
                                    <p>Area: {person.area} ha</p>
                                    <p>Remained quantity: {(parseFloat(person.area) * parseFloat(person.quantity)).toFixed(2)} kg</p>
                                    <p>Phone: {person.phone}</p>
                                    <div className="receiptButtons">
                                        <Button startIcon={<Add/>} variant="contained" style={buttonStyle} onClick={() => handleDialogOpen(person)}>New receipt</Button>
                                        <Button startIcon={<AllInbox/>} variant="contained" style={buttonStyle}>All receipts</Button>
                                    </div>
                                </div>
                                <div className="personButtons">
                                        <Button startIcon={<Edit/>} variant="contained" style={buttonStyle}>Edit</Button>
                                        <Button startIcon={<Delete/>} variant="contained" style={buttonStyle}>Delete</Button>
                                        <Button startIcon={<ShowChart/>} variant="contained" style={buttonStyle}>Show </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Stack spacing={2} alignItems="center">
                    <Pagination
                        count={pages}
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                            slots={{ previous: ArrowBack, next: ArrowForward }}
                            {...item}
                            />
                        )}
                        onChange={(event, number) => setCurrentPage(number-1)}
                    />
                </Stack>

                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Add new receipt</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={fullname}
                            label="Full name"
                            type="text"
                            fullWidth
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="quantity"
                            label="Quantity"
                            type="number"
                            value={quantityReceipt}
                            fullWidth
                            onChange={(e) => setQuantityReceipt(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"   
                            label="Date"
                            type="date"
                            value={date}
                            fullWidth
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} style={buttonStyle}>Cancel</Button>
                        <Button onClick={handleDialogAdd} style={buttonStyle}>Add</Button>
                    </DialogActions>
                </Dialog>
            </main>
        </div>
    );
}