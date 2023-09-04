import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PokemonEntity } from "../entity/pokemon.entity";
import { LeagueEntity } from "../entity/league.entity";
import { Repository } from "typeorm";

@Injectable()

export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity) private readonly PookemonRepository,
        @InjectRepository(LeagueEntity) private readonly LeagueRepository: Repository<LeagueEntity>
    ) { }

    async createPokemonService(data: any) {
        const pokemon = await this.PookemonRepository.create();
        pokemon.name = data.name;
        pokemon.type = data.type;
        return pokemon.save();
    }

    async deletePokemonService(id: string) {
        const pokemon = await this.PookemonRepository.findOne({ where: { id: id } });
        await this.PookemonRepository.delete(id);
        return pokemon;
    }

    async updatePokemonService(id: string, data: any) {
        const pokemon = await this.PookemonRepository.findOne({ where: { id: id } });

        pokemon.name = data.name;
        pokemon.type = data.type;
        await pokemon.save();
        return pokemon;
    }

    async getPokemonByIdService(id: string) {
        return this.PookemonRepository.findById(id);
    }

    async getAllPokemonsService() {
        return this.PookemonRepository.find({});
    }

    async asignLeague(id: string, leagueId: string) {
        const pokemon = await this.PookemonRepository.findOne({ where: { id } });
        const league = await this.LeagueRepository.findOne({ where: { id } });

        pokemon.league = league;
        await pokemon.save();
        return pokemon;
    }

}