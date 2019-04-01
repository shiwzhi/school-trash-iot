import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import CardMedia from '@material-ui/core/CardMedia';

import logo from '../images/logo.png'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Status from './status'
import { red } from '@material-ui/core/colors';

import Device from './device'


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        backgroundColor: "#0f3592",
    },
    drawerHeader1: {
        marginTop: 50
    },
    drawerLogo: {
        // backgroundColor: "red",
        // padding: 10

    },
    logoImg: {
        height: 'auto',
        width: '100%'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    listItem: {
        marginTop: 20,
        marginButtom: 20
    },
    itemText: {
        display: "flex",
        justifyContent: "center"
    }
});

function DrawerTitle(props) {
    let link = props.location.pathname
    console.log(link)
    var title = ""
    switch (link) {
        case "/admin/trashcan/status":
            title = "垃圾桶状态"
            break;
        case "/admin/trashcan/maps":
            title = "垃圾桶地图"
            break;
        default:
            title = "后台管理"
            break;
    }
    return (
        <Typography variant="h6" color="inherit" noWrap>
            {title}
        </Typography>
    )
}

class PersistentDrawerLeft extends React.Component {

    menuItems = [
        { name: "垃圾桶状态", route: "/admin/trashcan/status" },
        { name: "垃圾桶地图", route: "/admin/trashcan/maps" }
    ]

    state = {
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>

                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Route path="/admin" component={DrawerTitle} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <div className={classes.drawerLogo}>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.media}
                                image={logo}
                                title="logo"
                            />
                        </div>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.listItem}>
                        {this.menuItems.map((item, index) => (
                            <Link to={item.route} style={{ textDecoration: 'none' }}>
                                <ListItem button key={item.name}>
                                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                    <ListItemText className={classes.itemText} primary={item.name} />
                                </ListItem>
                            </Link>

                        ))}
                    </List>
                    {/* <Divider /> */}
                    {/* <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List> */}
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader1}/>
                    {/* <Route exact path="/" component={Home} /> */}
                    <Route path="/admin/trashcan/status" component={Status} />
                    {/* <Route path="/admin/trashcan/maps" component={Maps} /> */}
                    <Route path="/admin/trashcan/device/:deviceid" component={Device} />
                </main>
            </div>
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);