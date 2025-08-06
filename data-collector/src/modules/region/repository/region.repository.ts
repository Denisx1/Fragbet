import { Region, RegionCreationAttributes } from "../model/region.model";
import { IRegionRepository } from "./interface";

export class RegionRepository implements IRegionRepository {
  async createRegion(region: RegionCreationAttributes[]): Promise<Region[]> {
    const createdRegions = await Region.bulkCreate(region, {
      updateOnDuplicate: ["slug"],
    });
    return createdRegions;
  }
  async findAllRegions(): Promise<Region[]> {
    try {
      const existingRegions = await Region.findAll({
        attributes: ["slug", "id"], // Получаем только slug для ускорения поиска
      });
      return existingRegions;
    } catch (error) {
      throw error;
    }
  }
  async findRegionBySlug(slug: string): Promise<Region | null> {
    try {
      const existingRegion = await Region.findOne({
        where: { slug },
      });
      return existingRegion;
    } catch (error) {
      throw error;
    }
  }
}
