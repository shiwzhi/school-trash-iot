import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import axios from '../../js/axios'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

// class FullScreenDialog extends React.Component {
//     state = {
//         open: false,
//         username: "",
//         password: "",

//         snackbaropen: true,
//         duration: 6000,
//         variant: "success",
//         message: "",
//         tycolor: "default"
//     };

//     handleClickOpen = () => {
//         this.setState({ open: true });
//     };

//     handleClose = () => {
//         let setOpen = this.props.setOpen
//         let refresh = this.props.refresh
//         refresh()
//         setOpen(false)
//     };

function FullScreenDialog(props) {
    const { classes } = props;

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let [message, setMessage] = useState("")
    return (
        <div>
            <Dialog
                fullScreen
                open={props.open}
                onClose={() => {
                    console.log("dialog close")
                }}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={() => {
                            let setOpen = props.setOpen
                            let refresh = props.refresh
                            refresh()
                            setOpen(false)
                            setUsername("")
                            setPassword("")
                            setMessage("")
                        }} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            添加用户
                            </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem >
                        <TextField
                            label="用户名" onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                    </ListItem>
                    <ListItem >
                        <TextField
                            label="密码" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </ListItem>
                    <ListItem >
                        <Button variant="contained" color="primary" onClick={() => {
                            console.log(username)
                            console.log(password)
                            if (username.length > 0 && password.length > 0) {
                                axios.post('/api/user/add', {
                                    username: username,
                                    password: password
                                }).then(res => {
                                    var data = res.data
                                    setMessage(data.msg)
                                })
                            } else {
                                console.log(username.length)
                                console.log(password.length)
                                setMessage("用户名和密码不能为空")
                            }
                            
                        }}>添加</Button>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            {message}
                        </Typography>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}


FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);