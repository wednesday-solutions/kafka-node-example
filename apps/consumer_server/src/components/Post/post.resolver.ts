import { Arg, Ctx, Info, Root, Query, Resolver, Subscription } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { Post } from "@/components/Post/post.entity";
import { MyContext } from "@/utils/interfaces/context.interface";
import config from "@/config";

@Resolver(() => Post)
export class PostResolver {
    @Query(() => [Post])
    public async getPosts(
        @Arg("sortBy") sortBy: string,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post[]> {
        return ctx.em.getRepository(Post).findAll({
            orderBy: { [sortBy]: "desc" },
            cache: true,
        });
    }

    @Query(() => Post, { nullable: true })
    public async getPost(
        @Arg("id") id: string,
        @Ctx() ctx: MyContext,
        @Info() info: GraphQLResolveInfo
    ): Promise<Post | null> {
        return ctx.em.getRepository(Post).findOne({ id }, { cache: true });
    }

    @Subscription(() => Post, {
        topics: config.graphqlChannels.NEW_POST,
    })
    public newPosts(@Root() newPost: NewPostPayload): NewPostPayload {
        return newPost;
    }
}

export interface NewPostPayload {
    id: string;
    userName: string;
    createdAt: Date;
    updatedAt?: Date;
    title: string;
}
