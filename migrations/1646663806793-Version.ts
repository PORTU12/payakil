import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1646663806793 implements MigrationInterface {
  name = 'Version1646663806793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "first_name" character varying(191) NOT NULL, "last_name" character varying(191) NOT NULL, "email" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "zip" integer NOT NULL, "adress" character varying NOT NULL, "phone" character varying NOT NULL, "deviceId" character varying NOT NULL, "ip" character varying NOT NULL, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "merchant_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "label" character varying NOT NULL, "logo" character varying NOT NULL, "status" character varying NOT NULL, "companyId" uuid, CONSTRAINT "PK_1547696105b3980c9d0eb84ea54" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_mode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "name" character varying NOT NULL, "code" character varying NOT NULL, "img_url" character varying(191) NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_28d86a39aa07b1ad6809174fbff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "reference" character varying NOT NULL, "amount" integer NOT NULL, "currency" character varying NOT NULL, "description" character varying NOT NULL, "notification_url" character varying(191) NOT NULL, "return_url" character varying(191) NOT NULL, "cancel_url" character varying(191) NOT NULL, "type_operation" character varying(191) NOT NULL, "status" character varying NOT NULL, "serviceId" uuid, "paymentModeId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(191) NOT NULL, "last_name" character varying(191) NOT NULL, "first_name" character varying(191) NOT NULL, "phone" character varying(191) NOT NULL, "password" character varying(191) NOT NULL, "salt" character varying(191) NOT NULL, "email" character varying(191), "locked" character varying NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "withdrawal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "amount" integer NOT NULL, "currency" character varying NOT NULL, "status" character varying NOT NULL, "description" character varying NOT NULL, "processing_date" character varying(191) NOT NULL, "requesting_date" character varying(191) NOT NULL, "serviceId" uuid, CONSTRAINT "PK_840e247aaad3fbd4e18129122a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "merchant_service" ADD CONSTRAINT "FK_34927497020f9512027f7568f04" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_1dfc78e97a27c758a5696343719" FOREIGN KEY ("serviceId") REFERENCES "merchant_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_01a8ac7ed429a56b2358a7ba34c" FOREIGN KEY ("paymentModeId") REFERENCES "payment_mode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD CONSTRAINT "FK_69aedd0ef5664faddca25519324" FOREIGN KEY ("serviceId") REFERENCES "merchant_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP CONSTRAINT "FK_69aedd0ef5664faddca25519324"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_01a8ac7ed429a56b2358a7ba34c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_1dfc78e97a27c758a5696343719"`,
    );
    await queryRunner.query(
      `ALTER TABLE "merchant_service" DROP CONSTRAINT "FK_34927497020f9512027f7568f04"`,
    );
    await queryRunner.query(`DROP TABLE "withdrawal"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "payment_mode"`);
    await queryRunner.query(`DROP TABLE "merchant_service"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
