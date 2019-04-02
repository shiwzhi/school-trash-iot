import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TimeList from './deviceTimeList'
import Button from '@material-ui/core/Button';
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
});





function DeviceForm(props) {
    const { classes } = props;
    let { deviceid } = props.match.params

    let [deviceinfo, setDeviceInfo] = useState({ deviceinfo: "hi" })

    function loadDeviceData(deviceid) {
        axios.get("http://localhost:3001/device?deviceid=" + deviceid).then((res) => {
            setDeviceInfo(res.data)
        })
    }

    useEffect(() => {
        loadDeviceData(deviceid)
    }, [])

    function updateDevice() {
        axios.post("http://localhost:3001/updatedevice", { device: deviceinfo }).then((res) => {
            console.log(res)
        })
    }

    return (
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
    );
}


DeviceForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceForm);
