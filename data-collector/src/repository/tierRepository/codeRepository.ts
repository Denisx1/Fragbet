import { ICodeRepository } from "./interfaces/codeInterfaces";
import {
  Code,
  CodeCreationAttributes,
} from "../../models/tierModels/code";

export class CodeRepository implements ICodeRepository {
  constructor(private codeModel: typeof Code) {}
  async createCode(code: CodeCreationAttributes[]): Promise<Code[]> {
    return this.codeModel.bulkCreate(code, {
      updateOnDuplicate: ["codeValue"],
    });
  }
  async findByValue(
    value: string
  ): Promise<{ codeId: number; tierId: number, codeValue: string } | null> {
    const code = await this.codeModel.findOne({
      where: { codeValue: value },
      attributes: ["codeId", "tierId", "codeValue"], // Выбираем только нужные поля
    });
    return code ? { codeId: code.codeId, tierId: code.tierId, codeValue: code.codeValue } : null;
  }
}
