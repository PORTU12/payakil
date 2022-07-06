import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract-entity/abstract-entity';
import { Country } from './country.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends AbstractEntity {
  @Column({
    type: 'varchar',
    name: 'sociale_raison',
    length: 191,
    unique: true,
    nullable: false,
  })
  socialeRaison;

  @Column({
    type: 'varchar',
    name: 'sector_of_activity',
    nullable: true,
  })
  sectorOfActivity;

  @Column({
    type: 'varchar',
    name: 'register_of_commerce',
    length: 225,
    nullable: true,
  })
  registerOfCommerce;

  @Column({ default: 0 })
  amount: number;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    nullable: true,
  })
  phoneNumber;

  @Column({ type: 'varchar', length: 225, nullable: true })
  website;

  @ManyToOne(() => Country, (country) => country, {
    nullable: true,
  })
  country: Country;
}