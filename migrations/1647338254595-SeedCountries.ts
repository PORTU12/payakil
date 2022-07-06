import { Country } from '../src/apps/entities/country.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCountries1647338254595 implements MigrationInterface {
  name = 'SeedCountries1647338254595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save([
      queryRunner.manager.create<Country>(Country, {
        name: 'France',
      }),
      queryRunner.manager.create<Country>(Country, {
        name: "Côte d'ivoire",
      }),
      queryRunner.manager.create<Country>(Country, {
        name: 'Burkina Faso',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM country`);
  }
}
