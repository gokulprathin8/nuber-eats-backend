import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantsResolver {
    constructor(private readonly restrauntService: RestaurantService ) {}

    @Query(returns => [Restaurant])
    restaurants(): Promise<Restaurant[]> {
        return this.restrauntService.getAll();
    }
    
    @Mutation(returns => Boolean)
    async createRestaurant(
        @Args('input') createRestaurantInput: CreateRestaurantDto
    ): Promise<Boolean> {
        try {
            await this.restrauntService.createRestraunt(createRestaurantInput);
            return true;
        } catch {
            return false;
        }
    }
 
    @Mutation(returns => Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto: UpdateRestaurantDto
    ): Promise<Boolean> {
        try {
            await this.restrauntService.updateRestraunt(updateRestaurantDto);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}