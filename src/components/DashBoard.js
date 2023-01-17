import React from 'react';
import Sidenav from './Sidenav';
import "./DashBoard.css";
import { Grid, Box } from '@mui/material';
import MyCard from '../lib/MyCard';

export default function DashBoard() {
    
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
                        <MyCard value="100ha" title="Total area" description="All time area" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                        <MyCard value="10" title="Lease given" description="This year" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                        <MyCard value="10" title="New tenants" description="This year" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                        <MyCard value="12.1ha" title="New area" description="This year" image="https://static-00.iconduck.com/assets.00/results-icon-256x256-cb2c2kkw.png"/>
                    </Grid>
                </Box>
            </main>
        </div>
    )
}
