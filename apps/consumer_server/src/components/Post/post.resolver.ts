import { Arg, Ctx, Info, Root, Query, Resolver, Subscription } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { Post } from "@/components/Post/post.entity";
import { MyContext } from "@/utils/interfaces/context.interface";
import { KafkaMessage } from "kafkajs";
import config from "@/config";

@Resolver(() => Post)
export class PostResolver {
    @Query(() => [Post])
    public async getPosts(
        @Arg("sortBy") sortBy: string,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post[]> {
        return ctx.em.getRepository(Post).findAll({ orderBy: { [sortBy]: "desc" } });
    }

    @Query(() => Post, { nullable: true })
    public async getPost(
        @Arg("id") id: string,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post | null> {
        return ctx.em.getRepository(Post).findOne({ id });
    }

    @Subscription(() => Post, {
        topics: config.graphqlChannels.NEW_POST,
    })
    public newPosts(@Root() newPost: KafkaMessage): NewPostPayload {
        const post = JSON.parse(newPost.value.toString()) as Post;

        return {
            id: post.id,
            userName: post.userName,
            title: post.title,
            createdAt: new Date(post.createdAt),
            updatedAt: post.updatedAt ? new Date(post.updatedAt) : null,
        };
    }
}

export interface NewPostPayload {
    id: string;
    userName: string;
    createdAt: Date; // limitation of Redis/Kafka payload serialization
    updatedAt?: Date;
    title: string;
}
