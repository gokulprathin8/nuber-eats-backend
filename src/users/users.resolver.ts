import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccoutnOutput } from "./dto/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccoutnOutput)
    async createAccount(
        @Args('input') createAccountInput: CreateAccountInput
    ): Promise<CreateAccoutnOutput> {
        try {
            const {ok, error} = await this.userService.createAccount(createAccountInput);
            return {
                ok: ok,
                error: error,
            }
        } catch(e) {
            return {
                ok: false,
            }
        }
    }
}