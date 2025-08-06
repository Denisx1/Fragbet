import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async createUser() {
   
  }
  async getAllUsers() {
    return this.userRepository.findAll();
  }
}
