import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import supertest, { SuperTest, Test } from "supertest";
import faker from "@faker-js/faker";
import Application from "@/application";
import createSimpleUuid from "@/utils/helpers/createSimpleUuid";
import { clearDatabase } from "@/utils/helpers/clearDatabase";
import { loadFixtures } from "@/utils/helpers/loadFixture";

let request: SuperTest<Test>;
let app: Application;
let em: EntityManager<IDatabaseDriver<Connection>>;

describe("Post tests", () => {
    beforeAll(async () => {
        app = new Application();
        await app.init();

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
        });
    });
});
