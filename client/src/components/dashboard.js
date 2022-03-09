// ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
// ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
// ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
// ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
// ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
// ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 

//imports
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MemoryIcon from '@material-ui/icons/Memory';
import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Divider } from "@material-ui/core";

//Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#FFFFFF",
    height: "80px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#19A2AB",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    marginTop: "10px",
  },
  title: {
    flexGrow: 1,
    color: "#19A2AB",
    display: "flex",
    justifyContent: "center",
  },
  drawer: {
    backgroundColor: "#19A2AB",
    height: "100%",
    width: "300px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    marginTop: "100px",
  },
  menuBottom: {
    display: "flex",
    flexDirection: "column",
    marginTop: "350px"
  },
  menuList: {
    display: "flex",
  },
  links: {
    color: 'inherit',
    textDecoration: 'inherit'
  }
}));

function Dashboard() {
  const classes = useStyles();

  //set States
  const [isOpen, setIsOpen] = React.useState(false)

  //open drawer
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Performance Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='right'>
          {<div className={classes.drawer}>
            <List className={classes.menu}>

              <Link to="/home" className={classes.links}>
                <ListItem button className={classes.menuList}>
                  <ListItemIcon><DashboardIcon /></ListItemIcon>
                  <ListItemText className={classes.menuList}>Dashboard</ListItemText>
                </ListItem>
              </Link>

              <Link to="/client" className={classes.links} >
                <ListItem button className={classes.menuList}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText className={classes.menuList}>Client Monitor</ListItemText>
                </ListItem>
              </Link>

              <ListItem button className={classes.menuList}>
                <ListItemIcon><MemoryIcon /></ListItemIcon>
                <ListItemText className={classes.menuList}>IIS Monitor</ListItemText>
              </ListItem>

              <ListItem button className={classes.menuList}>
                <ListItemIcon><StorageIcon /></ListItemIcon>
                <ListItemText className={classes.menuList}>Database Monitor</ListItemText>
              </ListItem>

            </List>

            <Divider />

            <List className={classes.menuBottom}>
              <ListItem button className={classes.menuList}>
                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItem>

              <Link to="/" className={classes.links} >
                <ListItem button className={classes.menuList}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItem>
              </Link>

            </List>
          </div>}
        </Drawer>
      </div>
    </div>
  )
}

export default Dashboard