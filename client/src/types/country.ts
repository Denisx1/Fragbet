import type { IRegion } from "./region";

export interface ICountry {
  id: number;
  name: string;
  code: string;
  region: IRegion;
}
