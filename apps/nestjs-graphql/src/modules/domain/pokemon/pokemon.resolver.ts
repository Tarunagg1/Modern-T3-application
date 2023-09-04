import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PokemonService } from './pokemon.service';
import { PokemonEntity } from '../entity/pokemon.entity';

export class PokemonResolver {
    constructor(private readonly pokemonService: PokemonService) { }


    @Query()
    async pokemons() {
        return await this.pokemonService.getAllPokemonsService();
    }

    @Query()
    async pokemon(@Args('id') id: string) {
        return await this.pokemonService.getPokemonByIdService(id);
    }

    @Mutation()
    async create(@Args('name') name, @Args('type') type, @Args('pokedex') pokedex,) {
        return this.pokemonService.createPokemonService({ name, type, pokedex });
    }

    @Mutation()
    async update(@Args('id') id, @Args('name') name, @Args('type') type, @Args('pokedex') pokedex) {
        return this.pokemonService.updatePokemonService(id, { name, type, pokedex });
    }

    @Mutation()
    async assign(@Args('id') id, @Args('id') leagueId) {
        return this.pokemonService.asignLeague(id, leagueId);
    }


    @Mutation()
    async delete(@Args('id') id) {
        await this.pokemonService.deletePokemonService(id);
        return { delete: true };
    }
}


