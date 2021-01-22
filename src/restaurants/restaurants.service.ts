import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantService {
    constructor(@InjectRepository(Restaurant) private restraurant: Repository<Restaurant>) {}

    getAll(): Promise<Restaurant[]> {
        return this.restraurant.find();
    }

    createRestraunt(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const newRestraunt = this.restraurant.create(createRestaurantDto);
        return this.restraurant.save(newRestraunt);
    }

    updateRestraunt({id, data}: UpdateRestaurantDto) {
        return this.restraurant.update(id, {...data});
    }

}