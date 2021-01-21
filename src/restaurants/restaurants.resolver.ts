import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(of => Restaurant)
export class RestaurantsResolver {
    @Query(returns => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly: boolean ): Restaurant[] {
        return [];
    }
    
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() createRestaurantInput: CreateRestaurantDto
    ): Boolean {
        return true;
    }
}