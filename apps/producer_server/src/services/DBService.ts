import { MikroORM, Options } from "@mikro-orm/core";
import mikroOrmConfig from "@/orm.config";

export class DBService {
    public orm: MikroORM;
    private ormConfig: Options;

    public constructor(ormConfig = mikroOrmConfig) {
        this.ormConfig = ormConfig;
    }

    public async init() {
        const orm = await MikroORM.init(this.ormConfig);
        this.orm = orm;
        const migrator = orm.getMigrator();
        const migrations = await migrator.getPendingMigrations();
        if (migrations && migrations.length > 0) {
            await migrator.up();
        }

        return orm;
    }
}
