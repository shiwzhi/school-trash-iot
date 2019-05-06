import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    indexDiv: {
        display: 'flex',
        flexDirection: "column",
        marginTop: theme.spacing.unit * 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indexItem: {
        marginTop: theme.spacing.unit * 2
    },
    indexItemName: {
        marginTop: theme.spacing.unit * 3,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: "column",
        width: "11%",
        marginTop: theme.spacing.unit * 3
    }
});


function IndexPage(props) {
    const { classes } = props;
    return (

        <Grid container spcing={24}>
            <Grid item xs={12} style={{backgroundColor: 'red'}}>
                <Grid alignContent={"flex-end"} style={{backgroundColor: 'blue'}}>
                    <Typography variant="h6">欢迎访问物联网平台</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" color="primary" className={classes.indexItem} onClick={() => {
                    props.history.push("/admin")
                }}>后台管理</Button>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.indexItemName} >by 计科15 石伟志</Typography>
            </Grid>
        </Grid>
    )
}


export default withStyles(styles, { withTheme: true })(IndexPage);