import { MigrationInterface, QueryRunner } from "typeorm";
export class CreateMigration1726469267832 implements MigrationInterface {
    name = 'CreateMigration1726469267832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "account" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "bank_name" character varying NOT NULL, "account_number" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric(12,2) NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "UQ_c91a92631ee1ccb9f29e599ba42" UNIQUE ("account_number"), CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE ("user_id"), CONSTRAINT "PK_31e2fd7720a2da3af586f17778f" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "transaction_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "transaction_type" character varying NOT NULL, "amount" numeric(12,2) NOT NULL, "description" character varying, "transaction_date" TIMESTAMP NOT NULL DEFAULT now(), "balance_after_transaction" numeric(12,2) NOT NULL, "credited_bank_account" character varying NOT NULL, "debited_bank_account" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "credited_user_id" uuid, "debited_user_id" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_af9ebe466262525facae5e72f9f" FOREIGN KEY ("credited_user_id") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_5ed208ff59f78dac3f40236cebc" FOREIGN KEY ("debited_user_id") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_5ed208ff59f78dac3f40236cebc"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_af9ebe466262525facae5e72f9f"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
