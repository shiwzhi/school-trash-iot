import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
const axios = require('axios');


function TableRow(props) {
    const columns = [
        { key: "deviceinfo", name: "设备信息", editable: true},
        { key: "deviceid", name: "ID", editable: false },
        { key: "latestRegTime", name: "上线时间"},
        { key: "devicestatus", name: "状态"},
        { key: "latest_data", name: "数据"}
    ];

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/devices').then((res) => {
            res.data.map((item)=> {
                item.latest_data = item.latestData.data
            })
            setTableData(res.data)
        })
    }, [])

    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => tableData[i]}
            rowsCount={tableData.length}
            enableCellSelect={true}
            onRowClick={(e, a)=>{
                console.log(e)
                console.log(a)
            }}
        />
    );
}


export default TableRow