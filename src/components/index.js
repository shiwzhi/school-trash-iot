import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    indexDiv: {
        display: 'flex',
        flexDirection: "column",
        marginTop: theme.spacing.unit*20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indexItem: {
        marginTop: theme.spacing.unit*2
    },
    indexItemName: {
        marginTop: theme.spacing.unit*3,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: "column",
        width:"11%",
        marginTop: theme.spacing.unit*3
    }
});




function IndexPage(props) {
    const { classes } = props;
    return (
    <div className={classes.indexDiv}>
        <Typography className={classes.indexItem} variant="h6">欢迎访问物联网平台</Typography>
        <div className={classes.buttonGroup}>
        <Button variant="outlined" color="primary" className={classes.indexItem}>查看数据</Button>
        <Button variant="outlined" color="primary" className={classes.indexItem} onClick={()=>{
            props.history.push("/admin")
        }}>后台管理</Button>
        </div>
        <Typography className={classes.indexItemName} >by 计科15 石伟志</Typography>
    </div>
    )
}


export default withStyles(styles, { withTheme: true })(IndexPage);