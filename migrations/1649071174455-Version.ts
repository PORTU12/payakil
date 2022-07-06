import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1649071174455 implements MigrationInterface {
  name = 'Version1649071174455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP CONSTRAINT "FK_69aedd0ef5664faddca25519324"`,
    );
    await queryRunner.query(`ALTER TABLE "withdrawal" DROP COLUMN "serviceId"`);
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "typeOperations" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "number" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "withdrawal" ADD "companyId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "processing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "processing_date" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "requesting_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "requesting_date" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD CONSTRAINT "FK_0994f25a5008a54cb4b937812f8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP CONSTRAINT "FK_0994f25a5008a54cb4b937812f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "requesting_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "requesting_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "processing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "processing_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "withdrawal" DROP COLUMN "companyId"`);
    await queryRunner.query(`ALTER TABLE "withdrawal" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "typeOperations"`,
    );
    await queryRunner.query(`ALTER TABLE "withdrawal" ADD "serviceId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD CONSTRAINT "FK_69aedd0ef5664faddca25519324" FOREIGN KEY ("serviceId") REFERENCES "merchant_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
