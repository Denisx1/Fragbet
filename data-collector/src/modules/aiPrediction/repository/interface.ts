
import {
  AiPrediction,
  AiPredictionCreationAttributes,
} from "../ai_predictionModel/ai_predictionModel";
import { UpdatePrediction } from "../types";

export interface IAiPredictionRepository {
  createPrediction: (
    predictions: AiPredictionCreationAttributes
  ) => Promise<AiPrediction>;
  getPrediction: () => Promise<AiPrediction[]>;
  findPredictionByMatchId: (matchId: number) => Promise<AiPrediction | null>;
  findAllPredictionsWithnRange: (
    matchesIds: number[]
  ) => Promise<AiPredictionCreationAttributes[]>;
  bulkUpdatePredictions: (
    updatedPredictions: UpdatePrediction[]
  ) => Promise<void>;
  updatePrediction: (
    updatedPrediction: UpdatePrediction
  ) => Promise<void>;
}
