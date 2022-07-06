import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1647690457288 implements MigrationInterface {
  name = 'Version1647690457288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchant_service" RENAME COLUMN "status" TO "client_secret"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchant_service" RENAME COLUMN "client_secret" TO "status"`,
    );
  }
}
