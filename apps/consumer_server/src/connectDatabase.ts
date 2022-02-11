import { MikroORM, IDatabaseDriver, Connection } from "@mikro-orm/core";
import ormConfig from "@/orm.config";

export const connectDatabase = async (): Promise<MikroORM<IDatabaseDriver<Connection>>> => {
    const orm = await MikroORM.init(ormConfig);
    const migrator = orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();
    if (migrations && migrations.length > 0) {
        await migrator.up();
    }
    return orm;
};

export default connectDatabase;
