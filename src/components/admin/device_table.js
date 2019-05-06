import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

import axios from '../../js/axios'

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
    {
        name: 'deviceinfo',
        label: '设备信息'
    },
    {
        name: 'deviceid',
        label: '设备id'
    },
    {
        name: 'devicestatus',
        label: '设备状态'
    },

    {
        name: 'data',
        label: '数据'
    },
    {
        name: 'dataTime',
        label: '数据上传时间'
    }
]

function SimpleTable(props) {

    let [devicesData, setDevicesData] = useState([])

    useEffect(() => {
        axios.get("/api/device/all").then((res) => {
            var devices = res.data
            console.log(devices)
            try {
                devices.forEach(device => {
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
                    device.dataTime = d.toLocaleDateString() + " " + d.toLocaleTimeString()
                    

                    var full = parseInt(device.cal_full)
                    var empty = parseInt(device.cal_empty)
                    var box_height = empty - full
                    var measure = parseInt(device.trash_data[0].data)


                    console.log(box_height)
                    device.data = Math.floor( ((box_height - (measure - full)) / box_height * 100) )+ "%"
                    
                });
                setDevicesData(devices)
            } catch (error) {
                setDevicesData(devices)
            }
        })
    }, [])

    const options = {
        filterType: 'checkbox',
        onRowClick: (rowData, rowMeta) => {
            console.log(rowData)
            var deviceid = rowData[1]
            props.history.push('/admin/trashcan/device/' + deviceid)
        },
        print: false,
        download: false
    };

    return (
        <div >
            <MUIDataTable
                title={"设备列表"}
                data={devicesData}
                columns={columns}
                options={options}
            />

        </div>

    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);