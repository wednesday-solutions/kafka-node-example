import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useReadPosts, useSubscribePosts, PostInterface } from "@/hooks/useReadPosts";

interface PostCardProps {
    title: string;
    userName: string;
}

const PostCard = ({ title, userName }: PostCardProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography data-test="postTitle" gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography data-test="userName" variant="body2" color="text.secondary">
                    {userName}
                </Typography>
            </CardContent>
        </Card>
    );
};

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
                    <PostCard userName={item.userName} title={item.title} />
                </Grid>
            ))}
        </Grid>
    );
}
