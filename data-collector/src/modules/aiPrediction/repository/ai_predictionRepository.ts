import { IAiPredictionRepository } from "../repository/interface";
import {
  AiPrediction,
  AiPredictionCreationAttributes,
} from "../ai_predictionModel/ai_predictionModel";
import { Op } from "sequelize";
import { UpdatePrediction } from "../types";


export class AiPredictionRepository implements IAiPredictionRepository {
  async createPrediction(
    predictions: AiPredictionCreationAttributes
  ): Promise<AiPrediction> {
    return AiPrediction.create(predictions);
  }
  async getPrediction(): Promise<AiPrediction[]> {
    const predictions = await AiPrediction.findAll();
    return predictions;
  }
  async findPredictionByMatchId(matchId: number): Promise<AiPrediction | null> {
    try {
      const prediction = await AiPrediction.findOne({
        where: { match_id: matchId },
      });
      return prediction;
    } catch (error) {
      throw error;
    }
  }
  async findAllPredictionsWithnRange(
    matchesIds: number[]
  ): Promise<AiPredictionCreationAttributes[]> {
    try {
      const predictions = await AiPrediction.findAll({
        where: {
          match_id: {
            [Op.in]: matchesIds,
          },
        },
      });
      return predictions.map((prediction) => prediction.get({ plain: true }));
    } catch (error) {
      throw error;
    }
  }
  async bulkUpdatePredictions(
    updatedPredictions: UpdatePrediction[]
  ): Promise<void> {
    try {
      // Убедимся, что массив не пуст
      if (updatedPredictions.length > 0) {
        // Для каждого предсказания обновляем в базе
        await AiPrediction.bulkCreate(updatedPredictions, {
          updateOnDuplicate: ["prediction_winner_team_id"],
        });
        console.log(`Updated ${updatedPredictions.length} predictions.`);
      } else {
        console.warn("No predictions to update.");
      }
    } catch (error) {
      console.error("Error updating predictions:", error);
      throw error;
    }
  }
  async updatePrediction(updatedPrediction: UpdatePrediction): Promise<void> {
    try {
      await AiPrediction.update(
        {
          prediction_winner_team_id:
            updatedPrediction.prediction_winner_team_id,
        },
        {
          where: { match_id: updatedPrediction.match_id },
        }
      );
    } catch (error) {
      console.error("Error updating prediction:", error);
      throw error;
    }
  }
}
