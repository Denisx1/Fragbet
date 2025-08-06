import {
  Code,
  CodeCreationAttributes,
} from "../../../models/tierModels/code";

export interface ICodeRepository {
  createCode(code: CodeCreationAttributes[]): Promise<Code[]>;
  findByValue(
    value: string
  ): Promise<{ codeId: number; tierId: number, codeValue: string } | null>;
}
