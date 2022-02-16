import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function MultilineTextFields() {
    const [value, setValue] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                padding: "1rem",
                display: "grid",
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-multiline-flexible"
                label="Post"
                multiline
                fullWidth
                rows={4}
                value={value}
                onChange={handleChange}
            />
            <div>
                <Button sx={{ marginTop: "0.5rem" }} variant="contained">
                    Submit
                </Button>
            </div>
        </Box>
    );
}
