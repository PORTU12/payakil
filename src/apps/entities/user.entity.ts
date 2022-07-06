import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { JwtService } from '@nestjs/jwt';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'last_name', length: 191, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', name: 'first_name', length: 191, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', name: 'password', length: 191, nullable: false })
  password: string;

  @Column({
    type: 'bool',
    name: 'is_enabled',
    nullable: false,
    default: false,
  })
  isEnabled?: boolean;

  @Column({
    type: 'varchar',
    name: 'email',
    unique: true,
    length: 191,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'bool',
    name: 'is_locked',
    default: false,
    nullable: true,
  })
  isLocked: boolean;

  @Column({
    type: 'varchar',
    name: 'role',
    nullable: true,
  })
  role: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => CompanyEntity, (company) => company, {
    nullable: true,
  })
  company: CompanyEntity;

  comparePassword(attempt: string) {
    return this.decodePassword(this.password) === attempt;
  }

  private getJwtService() {
    const jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
    return jwtService;
  }

  private decodePassword(password: string) {
    const jwtService = this.getJwtService();
    const realPassword = jwtService.decode(password) as {
      pwd: string;
    };
    return realPassword.pwd;
  }
  async encodeToken(user: UserEntity) {
    const jwtService = this.getJwtService();

    const jwt = await jwtService.sign({
      id: user.id,
      email: user.email,
    });
    return jwt;
  }
}