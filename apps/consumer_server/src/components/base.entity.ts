import { PrimaryKey, Property, Entity, BaseEntity } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import hyperid from "hyperid";

@ObjectType({ isAbstract: true })
export class Base<T extends { id: string }> extends BaseEntity<T, "id"> {
    @Field(() => ID)
    @PrimaryKey({ type: "uuid" })
    public id: string = hyperid().uuid;

    @Field()
    @Property()
    public createdAt: Date = new Date();

    @Field({ nullable: true })
    @Property({ nullable: true, onUpdate: () => new Date() })
    public updatedAt?: Date;

    public constructor(body = {}) {
        super();
        this.assign(body);
    }
}
