import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CountryRepository } from '../repositories';

@Injectable()
export class CountryService {
  private logger = new Logger();

  constructor(private countryRepository: CountryRepository) {}

  async getCountries() {
    try {
      const countries = await this.countryRepository.findAll();

      return countries;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  async getCountry(id: string) {
    try {
      const country = await this.countryRepository.findOne(id);
      if (!country) {
        throw new HttpException(
          'The country does not exist !',
          HttpStatus.NOT_FOUND,
        );
      }
      return country;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
}
