import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  UserPrediction,
  UserPredictionCreationAttrs,
} from "./user_prediction.modele";
import { Op } from "sequelize";

@Injectable()
export class UserPredictionRepository {
  constructor(
    @InjectModel(UserPrediction)
    private userPredictionModel: typeof UserPrediction
  ) {}
  async createPrediction(userPredictionData: UserPredictionCreationAttrs) {
    return await this.userPredictionModel.create(userPredictionData);
  }
  async getAllPredictions() {
    return await this.userPredictionModel.findAll();
  }
  async getByUserId(userId: number): Promise<UserPrediction | null> {
    return await this.userPredictionModel.findByPk(userId);
  }
  
  async countPredictions(userId: number, time: Date): Promise<number> {
    return await this.userPredictionModel.count({
      where: {
        user_id: userId,
        created_at: {
          [Op.gte]: time,
        },
      },
    });
  }
}
