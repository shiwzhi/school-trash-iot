import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import SearchBar from './search_bar'
const axios = require('axios');

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    divRoot: {
        display: "flex",
        marginTop: theme.spacing.unit,
        justifyContent: "space-between"
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        margin: theme.spacing.unit
    },
    buttonGroup: {
        marginTop: 25
    }
});


let columns = [
    "设备信息",
    "设备id",
    "上线时间",
    "状态",
    "数据"
]


function SimpleTable(props) {
    const { classes } = props;

    let [tableData, setTableData] = useState({
        sort: 'dec',
        data: []
    })

    function sortBySensorData() {
        setTableData(state => ({
            ...state, data: tableData.data.sort((a, b) => {
                if (a.latestData.data > b.latestData.data) {
                    return 1
                }
                if (a.latestData.data < b.latestData.data) {
                    return -1
                }
                return 0
            })
        }))
    }

    function sortByTime() {
        setTableData(state => ({
            ...state, data: tableData.data.sort((a, b) => {
                if (a.latestRegTime > b.latestRegTime) {
                    return -1
                }
                if (a.latestRegTime < b.latestRegTime) {
                    return 1
                }
                return 0
            })
        }))
    }

    useEffect(() => {
        axios.get("http://localhost:3001/devices").then((res) => {
            res.data.sort((a, b) => {
                if (a.latestRegTime > b.latestRegTime) {
                    return -1
                }
                if (a.latestRegTime < b.latestRegTime) {
                    return 1
                }
                return 0
            })
            setTableData(state => ({ ...state, data: res.data }))
        })
    }, [])


    // function toggleOfflineDevice() {
    //     setTableData(state=>({...state, data: res.data}))
    //     setTableData(tableData.data.filter(item => item.devicestatus !== "离线"))
    // }

    function resetDeviceTable() {
        axios.get("http://localhost:3001/devices").then((res) => {
            setTableData(state => ({ ...state, data: res.data }))
            sortBySensorData()
        })
    }



    return (
        <div >
            <div className={classes.divRoot}>
                <div className={classes.buttonGroup}>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={sortBySensorData}>数据优先</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={sortByTime}>时间优先</Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={resetDeviceTable}>刷新</Button>
                    <Button variant="outlined" color="primary" className={classes.button} >离线设备</Button>
                </div>
                <SearchBar />
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns.map((item, index) => (
                                <TableCell align={index > 0 ? "left" : ""}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.data.map((item, index) => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Link to={"/admin/trashcan/device/" + item.deviceid}>
                                        {item.deviceinfo}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{item.deviceid}</TableCell>
                                <TableCell align="left">{function () {
                                    var d = new Date(0);
                                    d.setUTCSeconds(parseInt(item.latestRegTime));
                                    return d.toLocaleString()
                                }()}</TableCell>
                                <TableCell align="left">{item.devicestatus}</TableCell>
                                <TableCell align="left">{item.latestData.data}</TableCell>
                            </TableRow>

                        ))}
                        {/* {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
                    </TableBody>
                </Table>
            </Paper>


        </div>

    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);