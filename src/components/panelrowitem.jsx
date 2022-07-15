import {
    Grid
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
                {props.title}
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