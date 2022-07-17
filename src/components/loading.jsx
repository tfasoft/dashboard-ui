import {
    Box,
    CircularProgress
} from "@mui/material";

const LoadingBox = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default LoadingBox;