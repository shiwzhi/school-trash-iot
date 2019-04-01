import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SearchButton from './searchButton'
import Button from '@material-ui/core/Button';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
        marginBottom: 20
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    searchButton: {
        height: '35px',
        marginLeft: theme.spacing.unit*3.5,
        marginTop: 11
    },
    searchBar:{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        width: 300,
        marginRight: 100
    }
});



class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.searchBar}>
                <TextField
                    id="standard-search"
                    label="请输入搜索的内容..."
                    type="search"
                    className={classes.textField}
                    margin="normal"
                />
                <Button className={classes.searchButton} variant="outlined">
                    搜索
                </Button>
            </div>

        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);