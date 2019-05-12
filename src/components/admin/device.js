import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import SnackBar from './snackbar'

import { Container, Row, Col } from 'react-bootstrap'


const axios = require('axios')


const styles = theme => ({
    container: {
        display: 'block',
        flexWrap: 'wrap',
    },
    textFieldGroup: {

    },
    textField: {
        margin: theme.spacing.unit,
        width: 200
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit * 10,
        marginTop: theme.spacing.unit * 2,
    },
    testData: {
        marginTop: theme.spacing.unit * 3
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    }
});





function DeviceForm(props) {
    const { classes } = props;
    let { deviceid } = props.match.params
    let [deviceinfo, setDeviceInfo] = useState({
        trash_data: [],
        ota: false
    })

    let [snackState, setSnackState] = useState({
        message: "null",
        open: false,
        variant: "success"
    })

    function handleSnack(status, message = "", variant = "success") {
        setSnackState(state => ({
            ...state,
            open: status,
            message: message,
            variant: variant
        }))
    }


    function loadDeviceData(deviceid) {
        axios.get("/api/device/info?deviceid=" + deviceid).then((res) => {
            var device = res.data

            device.trash_data.sort((a, b) => {
                if (a.time > b.time) {
                    return -1
                }
                if (a.time < b.time) {
                    return 1
                }
                return 0
            })

            var d = new Date(0)
            d.setUTCSeconds(parseInt(device.trash_data[0].time))
            device.regTimeLocal = d.toLocaleDateString() + " " + d.toLocaleTimeString()

            var box_height = parseInt(device.cal_empty) - parseInt(device.cal_full)
            device.data = ((box_height - (parseInt(device.trash_data[0].data))) / box_height * 100) + "%"



            setDeviceInfo(device)
        })
    }

    useEffect(() => {
        loadDeviceData(deviceid)
    }, [])

    function updateDevice() {
        axios.post("/api/device/update", { device: deviceinfo }).then((res) => {
            console.log(res)
            alert(res.data)
        })
    }

    function deleteDevice() {
        axios.post("/deldevice", {
            device: {
                deviceid: deviceinfo.deviceid
            }
        }).then(result => {
            handleSnack(true, "已删除", "success")
        })
    }


    return (
        <Container>
            <Row>
                <TextField
                    className={classes.textField}
                    value={deviceinfo.deviceinfo || ""}
                    onChange={(e) => {
                        e.persist()
                        setDeviceInfo(device => (
                            { ...device, deviceinfo: e.target.value }
                        ))
                    }}
                    label="设备"
                />
            </Row>
            
            <Row>
                <TextField
                    className={classes.textField}
                    label="校准(满)"
                    onChange={(e) => {
                        e.persist()
                        setDeviceInfo(device => (
                            { ...device, cal_full: e.target.value }
                        ))
                    }}
                    value={deviceinfo.cal_full || ""}
                />
            </Row>
            <Row>
                <TextField
                    className={classes.textField}
                    label="校准(空)"
                    onChange={(e) => {
                        e.persist()
                        setDeviceInfo(device => (
                            { ...device, cal_empty: e.target.value }
                        ))
                    }}
                    value={deviceinfo.cal_empty || ""}
                />
            </Row>
            <Row>
                <TextField
                    className={classes.textField}
                    label="睡眠时间(分钟)"
                    onChange={(e) => {
                        e.persist()
                        setDeviceInfo(device => (
                            { ...device, sleep_h: e.target.value }
                        ))
                    }}
                    value={deviceinfo.sleep_h || ""}
                />
            </Row>

            <Row>
                <Button variant="contained" color="primary" className={classes.button} onClick={updateDevice}>
                    更新
            </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={deleteDevice}>
                    删除
            </Button>
            </Row>

            <div className={classes.testData}>
                <Typography>测试数据</Typography>
                <List className={classes.listRoot}>
                    {deviceinfo.trash_data.map((data) => {
                        var d = new Date(0)
                        d.setUTCSeconds(parseInt(data.time))
                        return (
                            <ListItem button key={data.time}>
                                <ListItemText>
                                    {d.toLocaleDateString() + " " + d.toLocaleTimeString() + " " + data.data}
                                </ListItemText>
                            </ListItem>)
                    })}
                </List>
            </div>
            <SnackBar snackState={snackState} handleClose={handleSnack} />
        </Container>





    );
}


DeviceForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceForm);
