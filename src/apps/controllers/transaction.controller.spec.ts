import { TransactionEntity } from './../entities/transaction.entity';
import { CompanyEntity } from './../entities/company.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { TransactionService } from '../services';
import { TransactionController } from './transaction.controller';
import * as request from 'supertest';

describe('TransactionController', () => {
  let app: INestApplication;
  let transactionController: TransactionController;
  let transactionService: TransactionService;

  const mockTransactionService = {
    cashIn: jest.fn(),
  };
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    transactionController = app.get<TransactionController>(
      TransactionController,
    );
    transactionService = app.get<TransactionService>(TransactionService);
    await app.init();
  });
  it('TransactionController - should be defined', () => {
    expect(transactionController).toBeDefined();
  });
  it('TransactionService - should be defined', () => {
    expect(transactionService).toBeDefined();
  });
  describe('get all transactions of a company', () => {
    it('should return all transactions if successful', async () => {
      const expectedResult = new CompanyEntity().id;
      const transactions: TransactionEntity[] = new TransactionEntity()[1];
      const mockNumberToSatisfyParameters = '';
      jest
        .spyOn(transactionController, 'getAllTransactionsofCompany')
        .mockResolvedValue(transactions);
      expect(
        await transactionController.getAllTransactionsofCompany(
          mockNumberToSatisfyParameters,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('POST create transaction', () => {
    it('/transactions/cashin (POST) Should create a transaction', async () => {
      const createTransactionDto: CreateTransactionDto = {
        paymentMethodId: 12,
        amount: 12,
        currency: 'EUR',
        reference: 'string',
        description: 'string',
        notificationUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        status: 'string',
        merchantService: 'string',
      };
      await request(app.getHttpServer())
        .post('/transactions/cashin')
        .send(createTransactionDto)
        .expect(201);
      expect(transactionService.cashIn).toHaveBeenCalled();
      expect(transactionService.cashIn).toHaveBeenCalledWith(
        createTransactionDto,
      );
    });
  });
});
