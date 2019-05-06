import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from '../../images/logo.png'
import CardMedia from '@material-ui/core/CardMedia';


import axios from '../../js/axios'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    mediaDiv: {
        backgroundColor: '#0945a5',
        margin: '10%',
        borderRadius: "10px"
    },
    media: {
        margin: '2%',
        paddingRight: '9%',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%'
    }
});

function SignIn(props) {
    const { classes } = props;
    let [userName, setUserName] = useState("")
    let [userPassword, setUserPassword] = useState("")

    function tryLogin() {
        axios('/api/user/login', {
            method: 'post',
            data: { username: userName, password: userPassword },
            withCredentials: true
        }).then((res) => {
            props.history.push('/admin')
        })
    }

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                {/* <Avatar className={classes.avatar}> */}
                <div className={classes.mediaDiv}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.media}
                        image={logo}
                        title="logo"
                    />

                </div>

                {/* </Avatar> */}
                <Typography component="h1" variant="h5">
                    物联网平台
        </Typography>
                <form className={classes.form} onSubmit={(e)=>{
                    e.preventDefault()
                    tryLogin()
                }}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">用户名</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus onChange={(e) => {
                            setUserName(e.target.value)
                        }} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">密码</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={(e) => {
                            setUserPassword(e.target.value)
                        }} />
                    </FormControl>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        type="submit"
                    >
                        登录
          </Button>
                </form>
            </Paper>
        </main>
    );
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);