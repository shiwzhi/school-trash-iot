import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import AddUser from './add_user'
import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import axios from '../../js/axios';


const styles = theme => ({
    margin: {
        marginTop: theme.spacing.unit*2
    }
});


export default withStyles(styles)((props) => {

    let [users, setUsers] = useState([])

    let [refresh, setRefresh] = useState(false)
    
    function tryRefresh() {
        console.log("refresh")
        setRefresh(!refresh)
    }

    useEffect(()=>{
        axios.get('/api/user/all').then(res=>{
            var users = res.data
            if (users.length > 0) {
                setUsers(users)
            }
        })
    }, [refresh])

    let [addUserShow, setAddUserShow] = useState(false)


    let columns = [
        {
            name: 'username',
            label: '用户名'
        },
        {
            name: 'regTime',
            label: '注册时间'
        },
        {
            name: 'loginTIme',
            label: '登录时间'
        },

    ]

    const options = {
        filterType: 'checkbox',
        // onRowClick: (rowData, rowMeta) => {
        //     console.log(rowData)
        //     var deviceid = rowData[1]
        //     props.history.push('/admin/trashcan/device/' + deviceid)
        // }
        print: false,
        download: false,
        onRowsDelete: (array)=>{
            console.log(array)
        },

        onRowClick: (rowData, rowMeta) => {
            console.log(rowData)
            var username = rowData[0]
            props.history.push({
                pathname: '/admin/user',
                state: {
                    user: username
                }
            })
            // props.history.push('/admin/trashcan/device/' + deviceid)
        },
    };

    let  { classes } = props;

    return (
        <div>
            <Button color="primary" variant="outlined" onClick={() => {
                setAddUserShow(true)
            }}>添加用户</Button>
            <AddUser open={addUserShow} setOpen={setAddUserShow} refresh={tryRefresh} />
            <div className={classes.margin}>
            </div>
            <MUIDataTable title="用户列表"
                columns={columns}
                options={options}
                data={users} />
        </div>
    )
})