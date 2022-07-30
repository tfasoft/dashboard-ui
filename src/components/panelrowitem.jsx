import {
    Box,
    Grid, Typography
} from "@mui/material";

const TwoInRow = (props) => {
    return (
        <Grid
            columns={{ xs: 6, md:12 }}
            spacing={2}
            container
        >
            <Grid
                xs={6}
                item
            >
                <Typography
                    color={props.color}
                    variant="body1"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                    gutterBottom
                >
                    {props.title}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                    gutterBottom
                >
                    {props.details}
                </Typography>
            </Grid>
            <Grid
                xs={6}
                item
            >
                {props.content}
            </Grid>
        </Grid>
    );
}

export default TwoInRow;