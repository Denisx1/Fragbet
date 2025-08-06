import { Injectable } from "@nestjs/common";

import { EmailService } from "src/common/email/email.service";
import { AuthRepository } from "../auth.repository";
import { UserRepository } from "src/modules/user/user.repository";
import { PasswordService } from "src/common/auth/password/password.service";
import { TokenService } from "src/common/auth/token/token.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { AdditionalData, IAuthData } from "../auth.interfaces";
import { CustomException } from "src/common/exceptions/custom.exception";
import { ErrorCodes } from "src/enums/exception.enums";
import { UserDto } from "../dto/user.dto";
import { AuthUserDto, LoginUserDto } from "../dto/auth.user.dto";
import { RolesRepository } from "src/modules/roles/roles.repository";
import { RolesEnum } from "src/enums/roles.enum";
import { ModuleType } from "src/common/exceptions/enums";
import { AuthExceptionCodes } from "../enums/authEnum";
import { CustomerStripeRepository } from "src/modules/stripe/repositories/customer-stripe-repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly rolesRepository: RolesRepository,
    private readonly customerStripeRepository: CustomerStripeRepository
  ) {}

  async register(
    createUserDto: CreateUserDto,
    additionalData: AdditionalData
  ): Promise<IAuthData> {
    try {
      const { email, password } = createUserDto;

      const existingUser = await this.userRepository.findByEmail(email);

      if (existingUser) {
        throw new CustomException({
          message: `User already exists`,
          statusCode: 409,
          errorCode: AuthExceptionCodes.USER_ALREADY_EXISTS,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const hashPassword = await this.passwordService.hashPassword(password);

      const role = await this.rolesRepository.getRoleByValue(RolesEnum.SUPER_ADMIN);

      if (!role) {
        throw new CustomException({
          message: `Role with this value: ${RolesEnum.USER} not found`,
          statusCode: 404,
          errorCode: AuthExceptionCodes.ROLE_NOT_FOUND,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const stripeCustomer =
        await this.customerStripeRepository.createCustomer(email);

      const user = await this.userRepository.create({
        email,
        password: hashPassword,
        customerStripeId: stripeCustomer.id,
      });

      await user.$set("roles", [role.id]);

      const tokenPair = this.tokenService.generateTokenPair({ email });

      const loginedUser = await this.authRepository.login(
        user.id,
        tokenPair,
        additionalData
      );

      const userDto = new UserDto();
      userDto.setData(user);
      return loginedUser;
    } catch (error) {
      throw error;
    }
  }

  async login(
    authUserDto: AuthUserDto,
    additionalData: AdditionalData
  ): Promise<IAuthData> {
    try {
      const { email, password } = authUserDto;
      const usersEmail = await this.userRepository.findByEmail(email);
      if (!usersEmail) {
        throw new CustomException({
          message: `User with this email: ${email} not found`,
          statusCode: 404,
          errorCode: AuthExceptionCodes.USER_NOT_FOUND,
          module: ModuleType.AUTH_MODULE,
        });
      }
      const isPasswordValid = await this.passwordService.comparePasswords(
        password,
        usersEmail.password
      );
      if (!isPasswordValid) {
        throw new CustomException({
          message: `Wrong password`,
          statusCode: 403,
          errorCode: AuthExceptionCodes.WRONG_PASSWORD,
          module: ModuleType.AUTH_MODULE,
          details: { password: `this password: ${password} is wrong` },
        });
      }
      const tokenPair = this.tokenService.generateTokenPair({ email });
      const newUser = await this.authRepository.login(
        usersEmail.id,
        tokenPair,
        additionalData
      );
      const loginDto = new LoginUserDto();
      loginDto.setData(newUser);
      return loginDto;
    } catch (error) {
      throw error;
    }
  }
  async logout(authedUser: IAuthData): Promise<number> {
    try {
      const deleted = await this.authRepository.logout({ id: authedUser.id });
      return deleted;
    } catch (error) {
      throw error;
    }
  }
  async refresh(
    authedUser: Pick<IAuthData, "id" | "userId">,
    additionalData: AdditionalData
  ): Promise<IAuthData> {
    try {
      const tokenPair = this.tokenService.generateTokenPair({
        id: authedUser.id!,
      });
      const newUser = await this.authRepository.refresh(
        authedUser,
        tokenPair,
        additionalData
      );
      const loginDto = new LoginUserDto();
      loginDto.setData(newUser);
      return loginDto;
    } catch (error) {
      throw error;
    }
  }
}
