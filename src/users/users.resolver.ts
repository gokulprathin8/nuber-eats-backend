import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccoutnOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth-user.decorator';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccoutnOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccoutnOutput> {
    try {
      const { ok, error } = await this.userService.createAccount(
        createAccountInput,
      );
      return {
        ok: ok,
        error: error,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, token, error } = await this.userService.login(loginInput);
      return {
        ok: ok,
        error: error,
        token: token,
      };
    } catch (error) {}
  }

  @UseGuards(AuthGuard)
  @Query((returns) => Boolean)
  me(@AuthUser() authUser: User) {
    return authUser;
  }
}
