// ███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗    ███████╗██╗██╗     ████████╗███████╗██████╗ 
// ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██╔════╝██║██║     ╚══██╔══╝██╔════╝██╔══██╗
// ███████╗█████╗  ███████║██████╔╝██║     ███████║    █████╗  ██║██║        ██║   █████╗  ██████╔╝
// ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║    ██╔══╝  ██║██║        ██║   ██╔══╝  ██╔══██╗
// ███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║    ██║     ██║███████╗   ██║   ███████╗██║  ██║
// ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                                                

import React from "react";
import { useState, useEffect, useRef } from "react";
import {Select,MenuItem, Typography} from '@material-ui/core';
import {Button} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from "axios";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    filter: {
       display: "flex",
       flexDirection: "row",
       width: "95%",
       margin: "auto",
       alignContent: "center",
    },
    filterGrid: {
        display: "flex",
        flexDirection: "column",
    },
    select: {
        width: "70%",
        padding: "5px",
        color: "white",
    },
    filterButton: {
        display: "flex",
        margin: "auto",
        width: "50%",
        height: "30%",
        marginBottom: "10px",
        marginRight: "140px",
        borderRadius: "20px",
        borderColor: "#084a54",
    },
    fIcon: { 
        marginLeft: "10px",
        color: "white",
    },
    fbtext: {
        margin: "auto",
        color: "white",
    }
}));

function SearchFilter({clientMonitor}) {
    

    //set states for hooks*
    const classes = useStyles();
    const [eventLog, setEventLog] = useState([]);
    const [_id, set_Id] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [newTicketStatus, setNewTicketStatus] = useState({});
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
            else{
                setFilteredResults(eventLog)
            }
    };

    //Logic for front end filter - function picks select values using useRef and appends to the api end point for data and filters
    function updateClient(id) {
        setTimeout(()=> {
            var url = 'http://localhost:7000/eventlog?';
            
            if (nativeClient.current.querySelector("input").value !== '' && nativeClient.current.querySelector("input").value  != null) {
                url += 'nativeClient=' + nativeClient.current.querySelector("input").value  + "&"
            }
            if (customerWebsite.current.querySelector("input").value  !== '' && customerWebsite.current.querySelector("input").value  != null) {
                url += 'customerWebsite=' + customerWebsite.current.querySelector("input").value  + "&"
            }
            if (server.current.querySelector("input").value.toLowerCase()  !== '' && server.current.querySelector("input").value.toLowerCase()  != null) {
                url += 'server=' + server.current.querySelector("input").value  + "&"
            }
            if (environment.current.querySelector("input").value  !== '' && environment.current.querySelector("input").value  != null) {
                url += 'environment=' + environment.current.querySelector("input").value  + "&"
            }
            if (eventType.current.querySelector("input").value  !== '' && eventType.current.querySelector("input").value  != null) {
                url += 'eventType=' + eventType.current.querySelector("input").value  + "&"
            }
            if (eventSubType.current.querySelector("input").value  !== '' && eventSubType.current.querySelector("input").value  != null) {
                url += 'eventSubType=' + eventSubType.current.querySelector("input").value  + "&"
            }
            if (system.current.querySelector("input").value  !== '' && system.current.querySelector("input").value  != null) {
                url += 'system=' + system.current.querySelector("input").value  + "&"
            }

            axios.get(url)
            .then((response)  => {
                setEventLog(response.data);
                console.log(response.data)
            })
            .catch((err) => console.error("there has been an error pulling data"))
        }, 100);
    };

    

    return(
        <div className={classes.filter}>
        <Grid item xs={3} className={classes.filterGrid}>
        <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Client</InputLabel>
<Select className={classes.select} displayEmpty label="Client"
     key={eventLog._id} selected="" placeholder="client"
     ref={nativeClient}
     onChange={updateClient}
    //  onChange={(e) => searchItems(e.target.value)}
     >
    <MenuItem value="Client" disabled>Client</MenuItem>
    <MenuItem value={null}>All</MenuItem>
    <MenuItem value='Almax'>Almax</MenuItem>
    <MenuItem value='NZU'>NZU</MenuItem>
    <MenuItem value='Westpeak'>Westpeak</MenuItem>
    <MenuItem value='YHI'>YHI</MenuItem>
    <MenuItem value='Crave'>Crave</MenuItem>
    <MenuItem value='Avon'>Avon</MenuItem>
</Select>
</FormControl>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Customer Website</InputLabel>
<Select className={classes.select}
key={eventLog._id}
ref={customerWebsite}
     onChange={updateClient}
// onChange={(e) => searchItems(e.target.value)}
>
    <MenuItem value={null}>Customer Website</MenuItem>
    <MenuItem value="Almax">Almax</MenuItem>
    <MenuItem value="Codesports">Codesports</MenuItem>
    <MenuItem value="Westpeak">Westpeak</MenuItem>
    <MenuItem value="YHI">YHI</MenuItem>
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
    <MenuItem value="w2">W2</MenuItem>
    <MenuItem value="w3">VT3</MenuItem>
    <MenuItem value="vt2">VT2</MenuItem>
    <MenuItem value="w6">W6</MenuItem>
</Select>
</FormControl>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Environment</InputLabel>
<Select className={classes.select}
ref={environment}
onChange={updateClient} >
    <MenuItem value="All" disabled>Environment</MenuItem>
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
    <MenuItem value="Sync">Sync</MenuItem>
    <MenuItem value="IIS">IIS</MenuItem>
    <MenuItem value="Database">Database</MenuItem>
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
<SearchIcon/>
</div>

</Grid>
</div>

    )}

export default SearchFilter;