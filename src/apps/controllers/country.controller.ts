import {
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountryService } from '../services';
import { Public } from '../../shared/decorators/public.decorator';

@ApiTags('Country')
@Controller('countries')
export class CountryController {
  private logger = new Logger(CountryController.name);
  constructor(private countryService: CountryService) {}
  @Get()
  @Public()
  @ApiOperation({ summary: 'get countries' })
  async getCountries() {
    try {
      const countries = await this.countryService.getCountries();
      this.logger.log({
        message: `/Get /countries - Works with success`,
      });
      return countries;
    } catch (e) {
      this.logger.error({
        message: 'Something went wrong',
        errors: e,
      });
      throw new HttpException(e.message, e.status);
    }
  }
  @Get('/:id')
  @Public()
  @ApiOperation({ summary: 'get country' })
  async getCountry(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const country = await this.countryService.getCountry(id);
      this.logger.log({
        message: `/Get /countries/${id} - Works with success`,
      });
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
