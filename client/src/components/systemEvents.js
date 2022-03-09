// ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗    ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
// ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║    ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
// ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║    █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
// ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║    ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
// ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║    ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
// ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝    ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

//imports
import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect, useRef } from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from 'axios';

//styling for components
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    pEvents: {
        display: "flex",
        flexDirection: "column",
        height: "600px",
        backgroundColor: 'rgba(240, 240, 240, 0.4)',
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: '5px',
            marginRight: "20px"
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            marginRight: "20px",
            backgroundColor: "#F0F0F0",

        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b482cf',
            marginRight: "20px",
            borderRadius: "20px",
            width: "15px"
        }
    },
    paperEvents: {
        display: "flex",
        width: "97%",
        flexDirection: "row",
        margin: "auto",
        marginTop: "10px",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: 'rgba(240, 240, 240, 0.4)',
    },
    paperEventsContents: {
        display: "flex",
        width: "97%",
        flexDirection: "row",
        margin: "auto",
        marginTop: "10px",
        padding: "5px",
        borderRadius: "10px",
    },
    eType: {
        width: "25%",
        color: "#5C076A"
    },
    eMessage: {
        width: "50%",
        color: "#5C076A"
    },
    bPaper: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: 'rgba(240, 240, 240, 0.4)',
        marginTop: "10px",
        width: "97%",
        margin: "auto"
    },
    fbutton: {
        width: "25%",
        justifyContent: "start",
    },
}));

function Events() {

    //useState and useRef
    const classes = useStyles();
    const [eventLog, setEventLog] = useState([]);
    const nativeClient = useRef(null);
    const eventType = useRef();
    const eventSubType = useRef();
    const system = useRef();

    // Getting data from server for high severity events
    useEffect(() => {
        const getEventLog = async () => {
            try {
                const res = await axios.get("http://localhost:7000/eventlog/severity?");
                setEventLog(response => res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getEventLog()
    }, []);

    //selects inputs using useRef and then adds it to the url string (access point from server)
    function updateClient(_id) {
        setTimeout(() => {
            var url = 'http://localhost:7000/eventlog/severity?';

            if (nativeClient.current.querySelector("input").value !== 'client') {
                url += 'nativeClient=' + nativeClient.current.querySelector("input").value + "&"
            } 
            if (eventType.current.querySelector("input").value !== '') {
                url += 'eventType=' + eventType.current.querySelector("input").value + "&"
            }
            if (eventSubType.current.querySelector("input").value !== '') {
                url += 'eventSubType=' + eventSubType.current.querySelector("input").value + "&"
            }
            if (system.current.querySelector("input").value !== '') {
                url += 'system=' + system.current.querySelector("input").value + "&"
            }
            axios.get(url)
                .then((response) => {
                    setEventLog(response.data);
                    console.log(response.data)
                })
                .catch((err) => console.error("there has been an error pulling data"))
        }, 100);
    };

    return (

        <div>
            <Paper elevation={0} className={classes.bPaper}>

                {/*filters on the critical events component*/}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        ref={nativeClient}
                        onChange={updateClient}>
                        <MenuItem value='client'>All</MenuItem>
                        <MenuItem value='Meta'>Meta</MenuItem>
                        <MenuItem value='Microsoft'>Microsoft</MenuItem>
                        <MenuItem value='Alphabet'>Alphabet</MenuItem>
                        <MenuItem value='Miele'>Miele</MenuItem>
                        <MenuItem value='Sonos'>Sonos</MenuItem>
                        <MenuItem value='Audi'>Audi</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Event</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        ref={eventType}
                        onChange={updateClient}>
                        <MenuItem value=''>All</MenuItem>
                        <MenuItem value="Error">Error</MenuItem>
                        <MenuItem value="Info">Info</MenuItem>
                        <MenuItem value="Performance">Performance</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subtype</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        ref={eventSubType}
                        onChange={updateClient}>
                        <MenuItem value=''>All</MenuItem>
                        <MenuItem value="Stats">Stats</MenuItem>
                        <MenuItem value="Razor">Razor</MenuItem>
                        <MenuItem value="Login">Login</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">System</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        ref={system}
                        onChange={updateClient}>
                        <MenuItem value=''>All</MenuItem>
                        <MenuItem value="web">Web</MenuItem>
                        <MenuItem value="IIS">IIS</MenuItem>
                        <MenuItem value="database">Database</MenuItem>
                    </Select>
                </FormControl>
            </Paper>

            <Paper className={classes.pEvents} elevation={0} key={eventLog._id}>
                {/*creates cards if they have a field of high severity*/}
                {eventLog.map(eventLog => (
                    <Paper className={classes.paperEvents} elevation={1}>
                        <div className={classes.paperEventsContents}>
                            <Typography className={classes.eType}>{eventLog.nativeClient}</Typography>
                            <Typography className={classes.eType}>{eventLog.eventType} </Typography>
                            <Typography className={classes.eType}>{eventLog.eventSubType}</Typography>
                            <Typography className={classes.eMessage}>{eventLog.eventMessage}</Typography>
                        </div>
                    </Paper>
                ))}
            </Paper>
        </div>

    )
}

export default Events