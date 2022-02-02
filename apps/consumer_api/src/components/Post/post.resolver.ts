import { Arg, Ctx, Info, Root, Args, Query, Resolver, Subscription } from "type-graphql";
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
}
