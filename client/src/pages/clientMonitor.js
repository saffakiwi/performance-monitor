//imports
import React from "react";
import Card from '@material-ui/core/Card';
import Dashboard from "../components/dashboard";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Select, MenuItem, Paper, Grid, Divider, Input, InputLabel, FormControl } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

//Styling for components
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mheader: {
        height: "200px",
        width: "95%",
        margin: "auto",
        backgroundColor: "#19A2AB",
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
    },
    clheader: {

        backgroundColor: "#084a54",
        width: "95%",
        height: "920px",
        margin: "auto",
        marginBottom: "50px",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: '20px',
            marginRight: "20px"
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            marginRight: "20px",
            backgroundColor: "#084a54",
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#19A2AB',
            marginRight: "20px",
            width: "15px"
        }
    },
    clientHeading: {
        width: "100%",
        height: "20%",
        margin: "auto",
        display: "flex",
        marginTop: "5px",
    },
    clientCard: {
        width: "95%",
        display: "flex",
        margin: "auto",
        marginBottom: "10px",
        marginTop: "20px",
        borderRadius: "20px"
    },
    accor1: {
        width: "90%",
        padding: "10px",
    },
    accor2: {
        width: "70%",
        padding: "10px",
    },
    theadings: {
        display: "flex",
        color: "white",
        marginTop: "5px",
        margin: "auto",
    },
    select: {
        width: "70%",
        padding: "5px",
        color: "white",
    },
    searchdiv: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    search: {
        display: "flex",
        width: "65%",
        padding: "5px",
        color: "white",
        marginTop: "15px",
    },
    searchicon: {
        color: "white",
        display: "flex",
        marginRight: "10px",
        marginTop: "20px",
    },
    filter: {
        display: "flex",
        flexDirection: "row",
        width: "95%",
        margin: "auto",
        alignContent: "center",
        marginBottom: "30px"
    },
    filterGrid: {
        display: "flex",
        flexDirection: "column",
    },
}));

const ClientMonitor = () => {

    //set states and useRefs*
    const classes = useStyles();
    const [eventLog, setEventLog] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [checked, setChecked] = useState(false);
    const InputEl = useRef();
    const nativeClient = useRef()
    const customerWebsite = useRef();
    const server = useRef();
    const environment = useRef();
    const eventType = useRef();
    const eventSubType = useRef();
    const system = useRef();

    // endpoint to pull all data from db/ used for the search input filter
    useEffect(() => {
        axios.get("http://localhost:7000/eventlog")
            .then((response) => {
                setEventLog(response.data)
                console.log(response.data)
            })
            .catch((err) => console.error("there has been an error pulling data"))
    }, []);

    //logic for the search input - only takes one parameter 
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = eventLog.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
            })
            setFilteredResults(filteredData)
            console.log(filteredData)
        }
        else {
            setFilteredResults(eventLog)
            console.log(eventLog)
        }
    };

    //Logic for front end filter - function picks select values using useRef and appends to the api end point for data and filters
    function updateClient(id) {
        setTimeout(() => {
            var url = 'http://localhost:7000/eventlog?';

            if (nativeClient.current.querySelector("input").value !== 'client') {
                url += 'nativeClient=' + nativeClient.current.querySelector("input").value + "&"
            } 
            if (customerWebsite.current.querySelector("input").value !== '') {
                url += 'customerWebsite=' + customerWebsite.current.querySelector("input").value + "&"
            }
            if (server.current.querySelector("input").value.toLowerCase() !== '') {
                url += 'server=' + server.current.querySelector("input").value + "&"
            }
            if (environment.current.querySelector("input").value !== '') {
                url += 'environment=' + environment.current.querySelector("input").value + "&"
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
    }

    const handleChange = (event, _id) => {
        setChecked(event.target.checked);  
    };

    
    function updateTask(id,) {

        const newTicketStatus = !checked

        axios.put("http://localhost:7000/update", { newTicketStatus: newTicketStatus, id: id })
            .then(() => {
                setEventLog(eventLog.map((eventLog) => {
                    return eventLog._id === id ? { id: id, newTicketStatus: newTicketStatus } : eventLog;
                }))
                .then(() => {
                    let temp = {...newTicketStatus}

                        if (Object.keys(temp).includes(eventLog._id)) {
                          temp.remove(eventLog._id)
                        }
                        setEventLog(temp)
                }, [])
            })
    };

    

    // const onRemove = (id) => {
    //     let temp = {...newTicketStatus}

    //     if (Object.keys(temp).includes(eventLog._id)) {
    //       temp.remove(eventLog._id)
    //     } else {
    //       let date = eventLog.eventDate;
    //       date = new Date(date)
    //       console.log(date)
    //       temp[eventLog._id] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    //     }

    //     console.log(temp)
    //     setEventLog(temp)
    //   }

    //logic to change from date format on db to a human readable date
    const getHumanDate = (dateToChange) => {
        const date = new Date(dateToChange)
        const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return (
            <div>
                <Typography>{days[date.getDay()]} {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}</Typography>
                <Typography>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</Typography>
            </div>
        )
    };

    return (
        <div>
            <Dashboard />
            <Paper elevation={7} className={classes.mheader}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.clientHeading}>
                        <Typography className={classes.theadings} variant="h4">Client Monitor</Typography>
                    </Grid>

                    <div className={classes.filter}>
                        <Grid item xs={3} className={classes.filterGrid}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select className={classes.select} displayEmpty label="Client"
                                    key={eventLog._id} selected="" placeholder="client"
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
                                <InputLabel id="demo-simple-select-label">Customer Website</InputLabel>
                                <Select className={classes.select}
                                    key={eventLog._id}
                                    ref={customerWebsite}
                                    onChange={updateClient}>
                                    <MenuItem value=''>All</MenuItem>
                                    <MenuItem value="Facebook">Facebook</MenuItem>
                                    <MenuItem value="Azure">Azure</MenuItem>
                                    <MenuItem value="Google">Google</MenuItem>
                                    <MenuItem value="Miele">Miele</MenuItem>
                                    <MenuItem value="Sonos">Sonos</MenuItem>
                                    <MenuItem value="Audi">Audi</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={3} className={classes.filterGrid}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Server</InputLabel>
                                <Select className={classes.select}
                                    ref={server}
                                    onChange={updateClient}>
                                    <MenuItem value="All" disabled>Server</MenuItem>
                                    <MenuItem value=''>All</MenuItem>
                                    <MenuItem value="w2">W2</MenuItem>
                                    <MenuItem value="w3">VT3</MenuItem>
                                    <MenuItem value="w5">W5</MenuItem>
                                    <MenuItem value="w6">W6</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Environment</InputLabel>
                                <Select className={classes.select}
                                    ref={environment}
                                    onChange={updateClient} >
                                    <MenuItem value="All" disabled>Environment</MenuItem>
                                    <MenuItem value=''>All</MenuItem>
                                    <MenuItem value="dev">Dev</MenuItem>
                                    <MenuItem value="production">Production</MenuItem>
                                    <MenuItem value="live">Live</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} className={classes.filterGrid}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                                <Select className={classes.select}
                                    ref={eventType}
                                    onChange={updateClient} >
                                    <MenuItem value="All" disabled>Event Type</MenuItem>
                                    <MenuItem value=''>All</MenuItem>
                                    <MenuItem value="Info">Info</MenuItem>
                                    <MenuItem value="Performance">Performance</MenuItem>
                                    <MenuItem value="Error">Error</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">System</InputLabel>
                                <Select className={classes.select}
                                    ref={system}
                                    onChange={updateClient} >
                                    <MenuItem value="All" disabled>System</MenuItem>
                                    <MenuItem value=''>All</MenuItem>
                                    <MenuItem value="web">Web</MenuItem>
                                    <MenuItem value="IIS">IIS</MenuItem>
                                    <MenuItem value="database">Database</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} className={classes.filterGrid}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Event Subtype</InputLabel>
                                <Select
                                    className={classes.select}
                                    ref={eventSubType}
                                    onChange={updateClient}>
                                    <MenuItem value="All" disabled>Subtype</MenuItem>
                                    <MenuItem value='esubtype'>All</MenuItem>
                                    <MenuItem value="Razor">Razor</MenuItem>
                                    <MenuItem value="Stats">Stats</MenuItem>
                                    <MenuItem value="Login">Login</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={classes.searchdiv}>

                                <Input className={classes.search}
                                    placeholder='Search...'
                                    ref={InputEl}
                                    type="text"
                                    onChange={(e) => searchItems(e.target.value)}>
                                </Input>
                                <SearchIcon />
                            </div>

                        </Grid>
                    </div>


                </Grid>
            </Paper>

            <Paper className={classes.clheader}>
                {/*sets display information pulled from the db. Creates cards as more information gets pushed through*/}
                {searchInput.length > 0 ? (
                    filteredResults.map((filteredResults) => {
                        return (
                            <Card className={classes.clientCard}>
                                <Grid container={true} spacing={2}>
                                    <Grid item={true} xs={2}>
                                        <Typography className={classes.accor1}>CLIENT: <br /> {filteredResults.nativeClient} </Typography>
                                        <Typography className={classes.accor1}>WEBSITE: <br /> {filteredResults.customerWebsite}</Typography>
                                        <Typography className={classes.accor2}>SERVER: <br />{filteredResults.server}</Typography>
                                    </Grid>

                                    <Divider orientation="vertical" />

                                    <Grid item={true} xs={2}>
                                        <Typography className={classes.accor1}>ENVIRONMENT: <br />{filteredResults.environment} </Typography>
                                        <Typography className={classes.accor1}>EVENT TYPE: <br />{filteredResults.eventType}</Typography>
                                        <Typography className={classes.accor2}>EVENT SUBTYPE:<br /> {filteredResults.eventSubType}</Typography>
                                    </Grid>

                                    <Divider orientation="vertical" />

                                    <Grid item={true} xs={5}>
                                        <Typography className={classes.accor1}>SYSTEM:<br />{filteredResults.system} </Typography>
                                        <Typography className={classes.accor1}>WEB URL: <br />{filteredResults.webUrl}</Typography>
                                        <Typography className={classes.accor2}>MESSAGE:<br /> {filteredResults.eventMessage}</Typography>
                                    </Grid>

                                    <Divider orientation="vertical" />

                                    <Grid item={true} xs={2}>
                                        <Switch key={eventLog._id}
                                            onChange={(_id) => handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            onClick={() => updateTask(eventLog._id)} />
                                        <Typography className={classes.accor2}></Typography>
                                        <Typography className={classes.accor2}>DATE:{getHumanDate(filteredResults.eventDate)}</Typography>
                                        <Typography className={classes.accor2} >SEVERITY: <br /> {eventLog.severity}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    })
                ) : (
                    eventLog.map((eventLog) => {
                        return (
                            <Card className={classes.clientCard}>
                                <Grid container={true} spacing={2}>
                                    <Grid item={true} xs={2}>
                                        <Typography className={classes.accor1}>CLIENT: <br /> {eventLog.nativeClient} </Typography>
                                        <Typography className={classes.accor1}>WEBSITE: <br /> {eventLog.customerWebsite}</Typography>
                                        <Typography className={classes.accor2}>SERVER: <br />{eventLog.server}</Typography>
                                    </Grid>

                                    <Divider orientation="vertical" />

                                    <Grid item={true} xs={2}>
                                        <Typography className={classes.accor1}>ENVIRONMENT: <br />{eventLog.environment} </Typography>
                                        <Typography className={classes.accor1}>EVENT TYPE: <br />{eventLog.eventType}</Typography>
                                        <Typography className={classes.accor2}>EVENT SUBTYPE:<br /> {eventLog.eventSubType}</Typography>
                                    </Grid>

                                    <Divider orientation="vertical" />

                                    <Grid item={true} xs={5}>
                                        <Typography className={classes.accor1}>SYSTEM:<br />{eventLog.system} </Typography>
                                        <Typography className={classes.accor1}>WEB URL: <br />{eventLog.webUrl}</Typography>
                                        <Typography className={classes.accor2}>MESSAGE:<br /> {eventLog.eventMessage}</Typography>
                                    </Grid>

                                    <Divider orientation="vertical" />

                                    <Grid item={true} xs={2}>
                                        <Switch key={eventLog._id}
                    
                                            onChange={(_id) => handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            onClick={() => updateTask(eventLog._id)}  />
                                           
                                        <Typography className={classes.accor2}></Typography>
                                        <Typography className={classes.accor2}>DATE:{getHumanDate(eventLog.eventDate)}</Typography>
                                        <Typography className={classes.accor2} >SEVERITY: <br /> {eventLog.severity}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    })
                )}
            </Paper>
        </div>
    )
};

export default ClientMonitor