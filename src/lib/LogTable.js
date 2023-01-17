import React, { useEffect } from 'react';
import "./LogTable.css";
import { Pagination, PaginationItem, Stack} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function LogTable() {
    const [logs, setLogs] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pages, setPages] = React.useState(0);
    var logsPerPage = 10;

    const fetchLogs = () => {
        fetch('http://localhost:8000/api/user/logs/' + currentPage + '/' + logsPerPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => res.json())
        .then((data) => {
            setLogs(data);
        })
    }

    const getPages = () => {
        fetch('http://localhost:8000/api/user/logs/pages/' + logsPerPage + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => res.json())
        .then((data) => {
            setPages(data.pages);
        })
    }

    useEffect(() => {
        fetchLogs();
    }, [currentPage]);

    useEffect(() => {
        getPages();
    }, []);


    return (
        <div>
          <table>
            <thead>
              <tr>
                  <th>Index</th>
                  <th>Date</th>
                  <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{log.date}</td>
                  <td>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      );
}