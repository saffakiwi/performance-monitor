// ██╗    ██╗███████╗██████╗     ███████╗████████╗ █████╗ ████████╗██╗   ██╗███████╗
// ██║    ██║██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██║   ██║██╔════╝
// ██║ █╗ ██║█████╗  ██████╔╝    ███████╗   ██║   ███████║   ██║   ██║   ██║███████╗
// ██║███╗██║██╔══╝  ██╔══██╗    ╚════██║   ██║   ██╔══██║   ██║   ██║   ██║╚════██║
// ╚███╔███╔╝███████╗██████╔╝    ███████║   ██║   ██║  ██║   ██║   ╚██████╔╝███████║
//  ╚══╝╚══╝ ╚══════╝╚═════╝     ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝


import Card from "@material-ui/core/Card"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        dislay: "flex",
        flexDirection: "row",
        width: "100%",
        margin: "auto",
    },
    circle1: {
        display: "flex",
        borderRadius: "50%",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
        backgroundColor: "#EA6A6A",
    },
    circle2: {
        display: "flex",
        borderRadius: "50%",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
        backgroundColor: "#f5ab49",
    },
    circle3: {
        display: "flex",
        borderRadius: "50%",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
        backgroundColor: "#cc71de",
    },
    circle4: {
        display: "flex",
        borderRadius: "50%",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
        backgroundColor: "#45bf6e",
    },
    numbers: {
        display: "flex",
        margin: "auto",
        height: "110px",
        alignItems: "center"
    },
    text: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },
}));

function WebsiteStatus() {

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.container}>
                    <Card className={classes.circle1}>
                        <Typography className={classes.numbers}>1</Typography>
                    </Card>
                    <Typography className={classes.text}>Down</Typography>
                </Grid>

                <Grid item xs={3}>
                    <Card className={classes.circle2}>
                        <Typography className={classes.numbers}>2</Typography>
                    </Card>
                    <Typography className={classes.text}>Critical</Typography>
                </Grid>

                <Grid item xs={3}>
                    <Card className={classes.circle3}>
                        <Typography className={classes.numbers}>3</Typography>
                    </Card>
                    <Typography className={classes.text}>Trouble</Typography>
                </Grid>

                <Grid item xs={3}>
                    <Card className={classes.circle4}>
                        <Typography className={classes.numbers}>4</Typography>
                    </Card>
                    <Typography className={classes.text}>Up</Typography>
                </Grid>
            </Grid>
        </Container>
    )
};

export default WebsiteStatus