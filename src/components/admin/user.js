import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import axios from '../../js/axios';

const styles = theme => ({
    rootDiv: {
        marginTop: theme.spacing.unit * 2
    }
});


export default withStyles(styles)((props) => {
    console.log(props.location)
    var user = props.location.state.user

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    useEffect(() => {
        axios.post('/api/user/info', {
            user: user
        }).then(res => {
            setUsername(res.data.username)
        })
    }, [])


    let { classes } = props


    return (
        <Grid container spacing={24} className={classes.rootDiv}>
            <Grid item xs={12}>
                <TextField
                    label="用户名"
                    value={username}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="密码"
                    onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    }
                />
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        console.log(username)
                        console.log(password)
                        axios.post('/api/user/update', {
                            username: username,
                            password: password
                        }).then(res=> {
                            console.log(res)
                            alert(res.data)
                            
                        }).catch(error=>{
                            console.log(error)
                            alert(error.data)
                        })
                    }}
                >
                    更新
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        axios.post('/api/user/del', {
                            username: username
                        }).then(res => {
                            try {
                                if (res.data.n === 1) {
                                    alert("用户删除成功")
                                } else {
                                    alert("用户删除失败")
                                }
                                props.history.push({
                                    pathname: '/admin/trashcan/user',
                                })
                            } catch (error) {
                                alert("用户删除失败")
                            }
                            props.history.push({
                                pathname: '/admin/trashcan/user',
                            })
                        })
                    }}>
                    删除
                </Button>
            </Grid>
        </Grid>
    )
})