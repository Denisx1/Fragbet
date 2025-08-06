import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

import { IUserData, UserCreationAttrs } from "./user.interfaces";
import { CreateUserDto } from "../auth/dto/create.user.dto";
import { UpdateUserDto } from "src/zod.validator/update-user.dto";
import { Role } from "../roles/roles.model";

import { Payment } from "../payment/payment.model";
import { Subscription } from "../subscription/subscription.model";
import { Invoice } from "../invoice/invoice.model";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: UserCreationAttrs): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findAll(): Promise<IUserData[]> {
    return this.userModel.findAll({
      include: [
        {
          model: Subscription,
          include: [
            {
              model: Payment,
              include: [Invoice], // 👈 добавили инвойс внутрь платежей
            },
          ],
        },
        { model: Role },
      ],
    });
  }
  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id, {
      include: [Role],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IUserData> {
    const [updatedRows, [updatedUser]] = await this.userModel.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      }
    );
    return updatedUser;
  }
  async findByCustomerStripeId(customerId: string): Promise<User | null> {
    return this.userModel.findOne({ where: { customerStripeId: customerId } });
  }
}
