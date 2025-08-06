import { RegionCreationAttributes } from "../../../models/teamModels/regionModel";
import { Region } from "../model/region.model";

export interface IRegionRepository {
  createRegion(region: RegionCreationAttributes[]): Promise<Region[]>;
  findAllRegions(): Promise<Region[]>;
  findRegionBySlug(slug: string): Promise<Region | null>;
}
