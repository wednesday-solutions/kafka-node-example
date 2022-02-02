import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from "@mikro-orm/core";
import PostValidator from "@/components/Post/post.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "@/components/base.entity";

@ObjectType()
@Entity()
export class Post extends Base<Post> {
    @Field()
    @Property()
    public title: string;

    @Field()
    @Property()
    public userName: string;

    public constructor(body: PostValidator) {
        super(body);
    }
}
