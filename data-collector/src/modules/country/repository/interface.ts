import {
  Country,
  CountryCreationAttributes,
} from "../../../models/teamModels/countryModel";

export interface ICountryRepository {
  createCountry(country: CountryCreationAttributes[]): Promise<Country[]>;
  getCountries(): Promise<Country[]>;
  findCountryByCode(code: string): Promise<Country | null>;
}
