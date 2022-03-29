/* eslint-disable max-nested-callbacks */
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import supertest, { SuperTest, Test } from "supertest";
import faker from "@faker-js/faker";
import Application from "@/application";
import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import gql from "graphql-tag";
import { clearDatabase, loadFixtures, sleep } from "@/utils/helpers";
import { createSubscriptionObservable } from "@/utils/helpers/graphqlWSClient";
import config from "@/config";

const port = faker.internet.port();

let request: SuperTest<Test>;
let app: Application;
let em: EntityManager<IDatabaseDriver<Connection>>;
let pubSub: KafkaPubSub;

describe("Post tests", () => {
    let client;
    beforeAll(async () => {
        app = new Application(port);
        const { pubsub } = await app.init();
        pubSub = pubsub;
        em = app.orm.em.fork();

        request = supertest(app.server);
    });

    beforeEach(async () => {
        await clearDatabase(app.orm);
        await loadFixtures(em);
    });

    afterAll(async () => {
        app.orm.close();
        app.server.close();
    });

    describe("getPosts query", () => {
        it("should get all posts", async () => {
            const response = await request
                .post("/graphql")
                .send({
                    query: `query {
                    getPosts(sortBy: "createdAt") {
                      id title userName createdAt
                    }
                  }
                `,
                })
                .expect(200);
            expect(response.body.data.getPosts).toEqual(expect.toBeArray());
            expect(response.body.data.getPosts[0]).toMatchObject({
                id: expect.toBeString(),
                title: expect.toBeString(),
                userName: expect.toBeString(),
                createdAt: expect.toBeString(),
            });
        });
    });

    describe("subscription query", () => {
        it("should get new posts", async () => {
            const newPost = {
                id: faker.datatype.uuid(),
                userName: faker.name.findName(),
                title: faker.lorem.sentences(2),
                createdAt: faker.date.recent().toISOString(),
            };
            const query = gql`
                subscription {
                    newPosts {
                        id
                        createdAt
                        updatedAt
                        title
                        userName
                    }
                }
            `;
            const posts = [];
            const client = createSubscriptionObservable(port, query);

            const subscription = client.subscribe((event) => {
                posts.push(event.data.newPosts);
            });
            await sleep(500);
            await pubSub.publish(config.graphqlChannels.NEW_POST, JSON.stringify(newPost));
            await sleep(500);

            subscription.unsubscribe();
            expect(posts.length).toBe(1);
            expect(posts[0]).toMatchObject(newPost);
        });
    });
});
