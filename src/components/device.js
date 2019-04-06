import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TimeList from './deviceTimeList'
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
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
        marginTop: theme.spacing.unit * 2,
    },
    testData: {
        marginTop: theme.spacing.unit * 3
    }
});





function DeviceForm(props) {
    const { classes } = props;
    let { deviceid } = props.match.params

    let [deviceinfo, setDeviceInfo] = useState({ deviceinfo: "hi" })

    function loadDeviceData(deviceid) {
        axios.get("/device?deviceid=" + deviceid).then((res) => {
            setDeviceInfo(res.data)
        })
    }

    useEffect(() => {
        loadDeviceData(deviceid)
    }, [])

    function updateDevice() {
        axios.post("/updatedevice", { device: deviceinfo }).then((res) => {
            console.log(res)
        })
    }


    function sortDeviceData() {
        try {
            console.log(deviceinfo)
            deviceinfo.sensor_data.sort((a, b) => {
                if (a.datatime > b.datatime) return -1
                if (a.datatime < b.datatime) return 1
                return 0
            })
            var data = deviceinfo.sensor_data.slice(0, 5)

            data.map(function(item){
                var d = new Date(0);
                d.setUTCSeconds(parseInt(item.datatime));
                item.stringDatatime = d.toLocaleString()
                return item
            })   
            return data         

        } catch (error) {
            console.log("not loaded")
            return [{stringDatatime: "hi"}]
        }
    }

    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.textFieldGroup}>
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
                    <TextField
                        className={classes.textField}
                        value={function () {
                            var d = new Date(0);
                            d.setUTCSeconds(parseInt(deviceinfo.latestRegTime));
                            return d.toLocaleString()
                        }()}
                        label="最新时间"
                        margin="normal"
                    />
                </div>

                <div className={classes.textFieldGroup}>
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

                </div>

                <Button variant="contained" color="primary" className={classes.button} onClick={updateDevice}>
                    更新
            </Button>

            </form>

            <div className={classes.testData}>
            <Typography>测试数据</Typography>
            <List>
                { sortDeviceData().map((item) => (
                    <ListItem button>
                        <ListItemText>
                            {item.stringDatatime+" "+item.data}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            </div>
            
        </div>

    );
}


DeviceForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceForm);
