import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658723639976 implements MigrationInterface {
    name = 'default1658723639976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "income" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" integer NOT NULL, "wallet_id" integer NOT NULL, CONSTRAINT "PK_29a10f17b97568f70cee8586d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" integer NOT NULL, "wallet_id" integer NOT NULL, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_9075147ba4bb2ead8bac71ccc83" UNIQUE ("refreshToken"), CONSTRAINT "REL_e50ca89d635960fda2ffeb1763" UNIQUE ("user_id"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "income" ADD CONSTRAINT "FK_a607de16c829e476070c3d5f4d5" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_49202cacdedb09abda1a71768cc" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_49202cacdedb09abda1a71768cc"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"`);
        await queryRunner.query(`ALTER TABLE "income" DROP CONSTRAINT "FK_a607de16c829e476070c3d5f4d5"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "income"`);
    }

}
