import { InjectModel } from "@nestjs/sequelize";
import { ActionToken, ActionTokenCreationAttrs } from "./action-token.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ActionTokenRepository {
  constructor(
    @InjectModel(ActionToken) private actionTokenModel: typeof ActionToken
  ) {}

  async create(actionToken: ActionTokenCreationAttrs): Promise<ActionToken> {
    const token = await this.actionTokenModel.create(actionToken);
    return token;
  }

  async findByToken(token: string): Promise<ActionToken | null> {
    const actionToken = await this.actionTokenModel.findOne({
      where: { token },
    });
    return actionToken;
  }
  async delete(id: number): Promise<number> {
    const deleted = await this.actionTokenModel.destroy({
      where: { id },
    });
    return deleted;
  }
}
