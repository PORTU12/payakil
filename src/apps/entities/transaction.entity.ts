import { AbstractEntity } from '../abstract-entity/abstract-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MerchantServiceEntity } from './merchant-service.entity';
import { PaymentMode } from './payment-mode.entity';

@Entity({ name: 'transaction' })
export class TransactionEntity extends AbstractEntity {
  @Column()
  reference: string;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  description: string;

  @Column({
    type: 'varchar',
    name: 'notification_url',
    length: 191,
    nullable: false,
  })
  notificationUrl: string;

  @Column({ type: 'varchar', name: 'return_url', length: 191, nullable: false })
  returnUrl: string;

  @Column({ type: 'varchar', name: 'cancel_url', length: 191, nullable: false })
  cancelUrl: string;

  @Column({
    type: 'varchar',
    name: 'type_operation',
    length: 191,
    nullable: false,
  })
  typeOperation: string;

  @Column()
  status: string;

  @ManyToOne(() => MerchantServiceEntity, (service) => service, {
    eager: true,
    nullable: true,
  })
  service: MerchantServiceEntity;

  @ManyToOne(() => PaymentMode, (paymentMode) => paymentMode, {
    eager: true,
    nullable: true,
  })
  paymentMode: PaymentMode;
}
