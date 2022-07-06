import { AbstractEntity } from '../abstract-entity/abstract-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('withdrawal')
export class WithdrawalEntity extends AbstractEntity {
  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  typeOperations: string;

  @Column()
  number: string;

  @Column({ name: 'processing_date', nullable: true })
  processingDate: string | null;

  @Column({ name: 'requesting_date', nullable: true })
  requestingDate: string;

  @ManyToOne(() => CompanyEntity, (company) => company, {
    eager: true,
    nullable: true,
  })
  company: CompanyEntity;
}
