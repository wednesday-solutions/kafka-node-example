import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useCreatePost from "@/hooks/useCreatePosts";

export default function MultilineTextFields() {
    const [value, setValue] = React.useState("");
    const [userName, setUserName] = React.useState("Tousif");
    const [newPost, createPost] = useCreatePost();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const submitPost = () => {
        if (value.length > 2) {
            createPost({ title: value, userName });
            setValue("");
        }
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
                <Button
                    disabled={value.length < 2 && true}
                    sx={{ marginTop: "0.5rem" }}
                    onClick={submitPost}
                    variant="contained"
                >
                    Submit
                </Button>
            </div>
        </Box>
    );
}
