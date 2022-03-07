// ██╗  ██╗ ██████╗ ███╗   ███╗███████╗██████╗  █████╗  ██████╗ ███████╗
// ██║  ██║██╔═══██╗████╗ ████║██╔════╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝
// ███████║██║   ██║██╔████╔██║█████╗  ██████╔╝███████║██║  ███╗█████╗  
// ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
// ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██║     ██║  ██║╚██████╔╝███████╗
// ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

//imports
import React from "react";
import Dashboard from "../components/dashboard";
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Events from "../components/systemEvents";
import WebsiteStatus from "../components/websiteStatus";

//styling
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        display: "flex",
        justifyContent: "center",
        width: "98%",
        marginTop: "50px",
        margin: "auto",
    },
    critErrGrid: {
        height: "759px",
        display: "flex",
    },
    statusGrid: {
        height: "250px",
        display: "flex",
    },
    graphGrid: {
        height: "500px",
        display: "flex",
    },
    cards: {
        width: "100%",
        backgroundColor: 'rgba(240, 240, 240, 0.4)',
        borderRadius: "20px",
    },
    innerGrid: {
        display: "flex",
        marginLeft: "0px",
        marginTop: "0px",
    },
    titles: {
        marginLeft: "10px",
        marginTop: "10px",
        color: "#068FAD",
    },
}));

function Home() {

    const classes = useStyles();

    return (

        <div>
            <Dashboard />

            {/*grid layout and rendering for cards*/}
            <Grid container={true} spacing={2} className={classes.mainGrid}>
                <Grid item={true} xs={4} className={classes.critErrGrid}>
                    <Card elevation={3} className={classes.cards}>
                        <Typography className={classes.titles}>High Severity Events</Typography>
                        <Events />
                    </Card>
                </Grid>

                {/*inner grid layout to fit within main grid container. If not used, it pushes out the grid for the graph to a new row*/}
                <Grid container={true} spacing={2} xs={8} wrap className={classes.innerGrid}>
                    <Grid item={true} xs={6} className={classes.statusGrid}>
                        <Card elevation={3} className={classes.cards}>
                            <Typography className={classes.titles}>Website Status</Typography>
                            <WebsiteStatus />
                        </Card>
                    </Grid>

                    <Grid item={true} xs={6} className={classes.statusGrid}>
                        <Card elevation={3} className={classes.cards}>
                            <Typography className={classes.titles}>Zendesk Tickets</Typography>
                        </Card>
                    </Grid>

                    <Grid item={true} xs={12} className={classes.graphGrid}>
                        <Card elevation={3} className={classes.cards}>
                            <Typography className={classes.titles}>Website Response Times</Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/*three bottom cards*/}
                <Grid item={true} xs={4} className={classes.statusGrid}>
                    <Card elevation={3} className={classes.cards}>
                        <Typography className={classes.titles}>Average Response Times</Typography>
                    </Card>
                </Grid>

                <Grid item={true} xs={4} className={classes.statusGrid}>
                    <Card elevation={3} className={classes.cards}>
                        <Typography className={classes.titles}>CPU Usage</Typography>
                    </Card>
                </Grid>

                <Grid item={true} xs={4} className={classes.statusGrid}>
                    <Card elevation={3} className={classes.cards}>
                        <Typography className={classes.titles}>Memory Usage</Typography>
                    </Card>
                </Grid>
            </Grid>

        </div>
    )
};

export default Home