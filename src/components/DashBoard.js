import React from 'react';
import Sidenav from './Sidenav';
import "./DashBoard.css";
import { Grid, Box } from '@mui/material';
import MyCard from '../lib/MyCard';
import { useEffect } from 'react';
const url = 'http://localhost:8000/api';

export default function DashBoard() {
    const [totalArea, setTotalArea] = React.useState(0);
    const [totalReceipt, setTotalReceipt] = React.useState(0);
    const [totalTenants, setTotalTenants] = React.useState(0);
    const [totalYearArea, setTotalYearArea] = React.useState(0);

    const fetchDashboardData = () => {
        fetch(url + "/person/get_all_area", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => res.json())
        .then((data) => { 
            setTotalArea(data.area);
        })

        fetch(url + "/person/get_receipt_value", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => res.json())
        .then((data) => {
            setTotalReceipt(data.amount);
        })

        fetch(url + "/person/get_persons_and_amount", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => res.json())
        .then((val) => {
            setTotalTenants(val.persons);
            setTotalYearArea(val.amount);
        })

    }

    useEffect(() => {
        fetchDashboardData();
    }, []);
    
    return (
        <div className='dashboardPage'>
            <Sidenav/>
            <div className='dashboardText'>
                    <h1>Dashboard</h1>
                    <h1>Log out</h1>
                </div>
            <main className='dashboard'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={12}>
                        <MyCard value={totalArea + "ha"} title="Total area" description="All time area" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                        <MyCard value={totalReceipt + "kg"} title="Lease amount given" description="This year" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                        <MyCard value={totalTenants} title="New tenants" description="This year" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                        <MyCard value={totalYearArea + "ha"} title="New area" description="This year" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                    </Grid>
                </Box>
            </main>
        </div>
    )
}
