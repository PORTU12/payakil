import { AbstractEntity } from '../abstract-entity/abstract-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'merchant_service' })
export class MerchantServiceEntity extends AbstractEntity {
  @Column()
  label: string;

  @Column()
  logo: string;

  @Column({
    type: 'varchar',
    name: 'client_secret',
    nullable: false,
  })
  clientSecret: string;

  @ManyToOne(() => CompanyEntity, (Company) => Company, {
    eager: true,
    nullable: true,
  })
  company: CompanyEntity;
}
