import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1648640555172 implements MigrationInterface {
  name = 'Version1648640555172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" ADD "amount" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "amount"`);
  }
}
