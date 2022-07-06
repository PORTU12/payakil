import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1647338050721 implements MigrationInterface {
  name = 'Version1647338050721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "last_name"`);
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1"`,
    );
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "zip"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "adress"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "deviceId"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "ip"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "locked"`);
    await queryRunner.query(
      `ALTER TABLE "company" ADD "sociale_raison" character varying(191) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "UQ_bf5b77e8f2377e3647e63ddd258" UNIQUE ("sociale_raison")`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "sector_of_activity" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "register_of_commerce" character varying(225)`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "phone_number" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "website" character varying(225)`,
    );
    await queryRunner.query(`ALTER TABLE "company" ADD "countryId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_enabled" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_locked" character varying DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_9731df468316e5b1a689b906240" FOREIGN KEY ("countryId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_9731df468316e5b1a689b906240"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_locked"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_enabled"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "countryId"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "website"`);
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "phone_number"`);
    await queryRunner.query(
      `ALTER TABLE "company" DROP COLUMN "register_of_commerce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP COLUMN "sector_of_activity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "UQ_bf5b77e8f2377e3647e63ddd258"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP COLUMN "sociale_raison"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "locked" character varying NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "salt" character varying(191) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phone" character varying(191) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "user_name" character varying(191) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "ip" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "deviceId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "adress" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "company" ADD "zip" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "company" ADD "city" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "country" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "last_name" character varying(191) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "first_name" character varying(191) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
