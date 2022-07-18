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
                    variant="h4"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {props.icon}
                    &nbsp;
                    {props.title}
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