import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useReadPosts, useSubscribePosts, PostInterface } from "@/hooks/useReadPosts";

export default function CustomCard() {
    const [posts, setPosts] = React.useState<PostInterface[]>([]);
    const { data } = useReadPosts(50);
    const [subscriptionResponse] = useSubscribePosts();
    React.useEffect(() => {
        if (data) {
            setPosts(data);
        }
        if (subscriptionResponse.data) {
            setPosts([subscriptionResponse.data.newPosts, ...posts]);
        }
    }, [data, subscriptionResponse]);

    return (
        <Grid sx={{ marginTop: "1rem" }} container justifyContent="center" spacing={2}>
            {posts?.map((item, i) => (
                <Grid item key={i}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.userName}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}