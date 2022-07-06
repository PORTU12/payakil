import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1649347289058 implements MigrationInterface {
  name = 'Version1649347289058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_locked"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_locked" boolean DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_locked"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_locked" character varying DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
