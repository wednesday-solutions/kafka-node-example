import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import PostValidator from "@/components/Post/post.validator";
import { Post } from "@/components/Post/post.entity";
import { MyContext } from "@/utils/interfaces/context.interface";
import config from "@/config";

@Resolver(() => Post)
export class PostResolver {
    @Query(() => [Post])
    public async getPosts(
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post[]> {
        return ctx.em.getRepository(Post).findAll();
    }

    @Query(() => Post, { nullable: true })
    public async getPost(
        @Arg("id") id: string,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post | null> {
        return ctx.em.getRepository(Post).findOne({ id });
    }

    @Mutation(() => Post)
    public async addPost(
        @Arg("input") input: PostValidator,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post> {
        const post = new Post(input);

        await ctx.em.persist(post).flush();
        if (post.title.length < 25) {
            ctx.kafkaProducer.send({
                topic: config.kafka.topic,
                messages: [{ key: "small", value: JSON.stringify(post) }],
            });
        } else {
            ctx.kafkaProducer.send({
                topic: config.kafka.topic,
                messages: [{ key: "big", value: JSON.stringify(post) }],
            });
        }

        return post;
    }
}
