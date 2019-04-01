import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TimeList from './deviceTimeList'
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
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
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
                    label="时间"
                    margin="normal"
                />
            </div>

        </form>
    );
}


DeviceForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceForm);
