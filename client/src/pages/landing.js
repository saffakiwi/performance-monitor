// ██╗      ██████╗  ██████╗ ██╗███╗   ██╗    ██████╗  █████╗  ██████╗ ███████╗
// ██║     ██╔═══██╗██╔════╝ ██║████╗  ██║    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
// ██║     ██║   ██║██║  ███╗██║██╔██╗ ██║    ██████╔╝███████║██║  ███╗█████╗  
// ██║     ██║   ██║██║   ██║██║██║╚██╗██║    ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
// ███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║    ██║     ██║  ██║╚██████╔╝███████╗
// ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝


//imports
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Typography, Card, Button, Divider, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../styling/landing.css';

//Styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    topgrid: {
        display: "flex",
        height: "800px",
        margin: "auto",
        flexDirection: "column"
    },
    logingrid: {
        display: "flex",
        width: "500px",
        margin: "auto",
        flexDirection: "column"
    },
    logo: {
        height: "100px",
        width: "100px",
        margin: "auto",
        marginBottom: "10px",
    },
    login: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "100%",
        margin: "auto",
        height: "330px",
        overflow: "hidden"
    },
    lbutton: {
        width: "100px",
        height: "30px",
        backgroundColor: "#19A2AB",
        marginTop: "10px",
    },
    ltext: {
        margin: "auto",
    },
    inputs: {
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        margin: "auto",
    },
    inputtext: {
        display: "flex",
        marginTop: "10px",
        marginBottom: "5px"
    },
    circle1: {
        position: "absolute",
        width: "4em",
        height: "4em",
        border: "1px solid",
        borderRadius: "100%",
        top: "10em",
        right: "15%",
        background: "#b482cf",
        borderColor: "#b482cf",
    },
    circle1ripple: {
        position: "absolute",
        width: "4em",
        height: "4em",
        border: "1px solid",
        borderRadius: "100%",
        top: "10em",
        right: "15%",
        background: "none",
        borderColor: "#b482cf",
        transform: "scale(2)",
        animationName: "rippleAnimation",
        animationDuration: "1.5s",
        animationIterationCount: "infinite",
    },
    circle2: {
        position: "absolute",
        width: "4em",
        height: "4em",
        border: "1px solid",
        borderRadius: "100%",
        bottom: "10em",
        left: "5%",
        background: "#b482cf",
        borderColor: "#b482cf",
    },
    circle2ripple: {
        position: "absolute",
        width: "4em",
        height: "4em",
        border: "1px solid",
        borderRadius: "100%",
        bottom: "10em",
        left: "5%",
        background: "none",
        borderColor: "#b482cf",
        transform: "scale(2)",
        animationName: "rippleAnimation",
        animationDuration: "1.5s",
        animationIterationCount: "infinite",
    },
    circle3: {
        position: "absolute",
        width: "6em",
        height: "6em",
        border: "1px solid",
        borderRadius: "100%",
        bottom: "10em",
        right: "15%",
        background: "#19A2AB",
        borderColor: "#19A2AB",
    },
    circle3ripple: {
        position: "absolute",
        width: "6em",
        height: "6em",
        border: "1px solid",
        borderRadius: "100%",
        bottom: "10em",
        right: "15%",
        background: "none",
        borderColor: "#19A2AB",
        transform: "scale(2)",
        animationName: "rippleAnimation",
        animationDuration: "1.5s",
        animationIterationCount: "infinite",
    },
    circle4: {
        position: "absolute",
        width: "6em",
        height: "6em",
        border: "1px solid",
        borderRadius: "100%",
        top: "8em",
        left: "10%",
        background: "#19A2AB",
        borderColor: "#19A2AB",
    },
    circle4ripple: {
        position: "absolute",
        width: "6em",
        height: "6em",
        border: "1px solid",
        borderRadius: "100%",
        top: "8em",
        left: "10%",
        background: "none",
        borderColor: "#19A2AB",
        transform: "scale(2)",
        animationName: "rippleAnimation",
        animationDuration: "1.5s",
        animationIterationCount: "infinite",
    },
    links: {
        color: 'inherit',
        textDecoration: 'inherit'
    }
}));

const Landing = () => {

    const classes = useStyles();

    return (
        <div className={classes.topgrid}>

            <motion.div animate={{ opacity: [0, 1] }}>
                <div className={classes.circle1} />
                <div className={classes.circle1ripple} />
                <div className={classes.circle2} />
                <div className={classes.circle2ripple} />
                <div className={classes.circle3} />
                <div className={classes.circle3ripple} />
                <div className={classes.circle4} />
                <div className={classes.circle4ripple} />
            </motion.div>

            <div className={classes.logingrid}>
                <img src="native logo.png" alt="logo" className={classes.logo} />
                <Card className={classes.login}
                    elevation={5}>
                    <Typography variant="h4" className={classes.ltext}>Login</Typography>
                    <Divider />
                    <Box
                        component="form"
                        className={classes.login}
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off">
                        <div className={classes.inputs}>
                            <Typography className={classes.inputtext}>Username:</Typography>
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                variant="outlined" />
                            <Typography className={classes.inputtext}>Password:</Typography>
                            <TextField
                                id="outlined-required"
                                variant="outlined"
                                label="Required"
                                type="password"
                                autoComplete="current-password" />
                            <Link to="/home" className={classes.links}>
                                <Button variant="contained" color="inherit" className={classes.lbutton}>Login</Button>
                            </Link>
                        </div>
                    </Box>
                </Card>
            </div>
        </div>
    )
}

export default Landing

