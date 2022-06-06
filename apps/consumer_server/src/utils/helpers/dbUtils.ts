import { MikroORM, EntityManager } from "@mikro-orm/core";
import faker from "@faker-js/faker";
import { Post } from "@/components/Post/post.entity";
import { createSimpleUuid } from "./index";

export const clearDatabase = async (orm: MikroORM): Promise<void> => {
    await orm.getSchemaGenerator().dropSchema({ wrap: true });
    const migrator = orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();
    if (migrations && migrations.length > 0) {
        await migrator.up();
    }

    // Additional sync for development
    // this way we can just create 1 migration after development
    await orm.getSchemaGenerator().updateSchema();
};

export const loadFixtures = async (em: EntityManager): Promise<void> => {
    try {
        const posts = await Promise.all(
            [...Array.from({ length: 5 })].map(async (_, index) => {
                const user = new Post({
                    userName: `user ${index + 1}`,
                    title: faker.lorem.sentences(2),
                });

                // Setting temporary id for test purposes
                user.id = createSimpleUuid(index + 1);

                em.persist(user);
                return user;
            })
        );

        await em.flush();
    } catch (error) {
        console.error("📌 Could not load fixtures", error);
    }
};
