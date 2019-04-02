import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import TextField from '@material-ui/core/TextField'
import color from '@material-ui/core/colors/teal';

const styles = theme => (
    {
        root: {
            margin: theme.spacing.unit,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // width: 400,
            // height: 30,
            // backgroundColor: color[200]
        },
        input: {
            marginLeft: 8,
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            width: 1,
            height: 28,
            margin: 4,
        },
        textField: {
            // marginLeft: theme.spacing.unit,
            // marginRight: theme.spacing.unit,
            width: 300,
            // height: 10
        },

    }

)

function CustomizedInputBase(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-email-input"
                label="搜索设备"
                className={classes.textField}
                type="text"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
            />
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton>
        </div>



    );
}

CustomizedInputBase.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);