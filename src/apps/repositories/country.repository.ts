import { Country } from '../entities';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CountryRepository {
  constructor(
    @Inject('COUNTRY_REPOSITORY')
    private countryRepository: Repository<Country>,
  ) {}

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  findOne(id: string): Promise<Country> {
    return this.countryRepository.findOne(id);
  }
}
