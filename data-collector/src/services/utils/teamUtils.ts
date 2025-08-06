// import {
//   ICountyDetails,
//   IRegionDetails,
//   ITeamData,
// } from "../../interfaces/teamInterfaces";
// import { CountryCreationAttributes } from "../../models/teamModels/countryModel";
// import { TeamCreationAttributes } from "../../models/teamModels/teamModel";
// import { IUtilsTEamDependencies } from "../lowLevelServices/interfaces/teamFillerInterface";
// import { countryToRegionMap } from "./mappps";

// export function getUniqueData(
//   country: ICountyDetails[],
//   region: IRegionDetails[]
// ): { uniqueRegions: IRegionDetails[]; uniqueCountries: ICountyDetails[] } {
//   // Фильтруем регионы: без пустых и "мусорных" slug
//   const filteredRegions = region.filter(
//     (item) => item.slug && item.slug !== "unknown-region"
//   );

//   // Удаляем дубликаты регионов по slug
//   const uniqueRegions = Array.from(
//     new Map(filteredRegions.map((item) => [item.slug, item])).values()
//   );

//   // Фильтруем страны: без пустых кодов и названий
//   const filteredCountries = country.filter((item) => item.code && item.name);

//   // Удаляем дубликаты стран по коду
//   const uniqueCountries = Array.from(
//     new Map(filteredCountries.map((item) => [item.code, item])).values()
//   );

//   return { uniqueRegions, uniqueCountries };
// }

// export async function compareRegionCountry(
//   countries: ICountyDetails[],
//   dependency: IUtilsTEamDependencies
// ): Promise<CountryCreationAttributes[]> {
//   // Создаём Map для slug → region.id
//   const existingRegions = await dependency.regionRepo.findAllRegions();
//   const regionMap = new Map<string, number>(
//     existingRegions.map((region) => [region.slug, region.id ?? 0])
//   );
//   // Мапим страны с добавлением region_id
//   return countries
//     .map((country: ICountyDetails) => {
//       const regionSlug = countryToRegionMap[country.code];

//       if (!regionSlug) {
//         console.warn(`region for country's code ${country.code}`);
//         return null;
//       }

//       return {
//         ...country,
//         region_id: regionMap.get(regionSlug) ?? null,
//       };
//     })
//     .filter((item): item is CountryCreationAttributes => item !== null);
// }

// export function matchTeamAndCountry(
//   teams: Omit<ITeamData, "players" | "id">[],
//   countries: ICountyDetails[]
// ): Omit<ITeamData, "players" | "country" | "id">[] {
//   const countryMap = new Map(countries.map((c) => [c.code, c.id]));

//   const mappTEam = teams.map(
//     ({ country, ...team }: Omit<ITeamData, "players" | "id">) => ({
//       ...team,
//       country_id: countryMap.get(country.code), // Добавляем country_id
//     })
//   );
//   return mappTEam;
// }
