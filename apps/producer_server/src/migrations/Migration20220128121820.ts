import { Migration } from "@mikro-orm/migrations";

export class Migration20220128121820 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "post" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "title" varchar(255) not null, "user_name" varchar(255) not null);'
        );
        this.addSql('alter table "post" add constraint "post_pkey" primary key ("id");');
    }
}
