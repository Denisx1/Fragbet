import { Country, CountryCreationAttributes } from "../model/country.model";
import { ICountryRepository } from "./interface";

export class CountryRepository implements ICountryRepository {
  async createCountry(
    country: CountryCreationAttributes[]
  ): Promise<Country[]> {
    return Country.bulkCreate(country, {
      updateOnDuplicate: ["code"],
    });
  }
  async getCountries(): Promise<Country[]> {
    return Country.findAll({ attributes: ["name"] });
  }
  async findCountryByCode(code: string): Promise<Country | null> {
    try {
      return Country.findOne({ where: { code } });
    } catch (error) {
      throw error;
    }
  }
}
