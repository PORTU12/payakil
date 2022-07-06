import { AbstractEntity } from '../abstract-entity/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'payment_mode' })
export class PaymentMode extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ type: 'varchar', name: 'img_url', length: 191, nullable: false })
  imgUrl: string;

  @Column()
  status: string;
}
