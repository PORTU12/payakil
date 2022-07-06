import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1646840039733 implements MigrationInterface {
  name = 'Version1646840039733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "processing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "processing_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "requesting_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "requesting_date" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "requesting_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "requesting_date" character varying(191) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "processing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "processing_date" character varying(191) NOT NULL`,
    );
  }
}
