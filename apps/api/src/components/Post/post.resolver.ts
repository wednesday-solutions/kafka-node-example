import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import PostValidator from "@/components/Post/post.validator";
import { Post } from "@/components/Post/post.entity";
import { MyContext } from "@/utils/interfaces/context.interface";

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
        return post;
    }

    @Mutation(() => Post)
    public async updatePost(
        @Arg("input") input: PostValidator,
        @Arg("id") id: string,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post> {
        const post = await ctx.em.getRepository(Post).findOneOrFail({ id });
        post.assign(input);

        await ctx.em.persist(post).flush();

        return post;
    }

    @Mutation(() => Boolean)
    public async deletePost(@Arg("id") id: string, @Ctx() ctx: MyContext): Promise<boolean> {
        const post = await ctx.em.getRepository(Post).findOneOrFail({ id });
        await ctx.em.getRepository(Post).remove(post).flush();

        return true;
    }
}
