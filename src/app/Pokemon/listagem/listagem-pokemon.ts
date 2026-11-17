import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // usamos o switcmap quando temos uma chamada externa, quando nao temos usamos o map
import { PokemonService } from '../data/pokemon.service';
import { Pokemon } from '../pokemon.model';
import { map } from 'rxjs';

interface PokemonTypeModel {
  readonly name: string;
  readonly displayName: string;
}

interface PokemonCardViewModel {
  readonly id: number;
  readonly displayName: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly types: readonly PokemonTypeModel[];
}

export function paraTitleCase(texto: string): string {
  // este regex (/\b\w/g) vatte o texto procurando a primeira letra de cada palavra
  return texto.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

function paraCardViewModel(dto: Pokemon): PokemonCardViewModel {
  const displayName = paraTitleCase(dto.name);
  const type: PokemonTypeModel[] = dto.types.map((type) => ({
    name: type,
    displayName: paraTitleCase(type),
  }));

  return {
    id: dto.id,
    displayName: displayName,
    imageUrl: dto.sprite,
    imageAlt: 'Image de ${displayName}',
    types: type,
  };
}

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  protected readonly pokemonService = inject(PokemonService);

  protected readonly Pokemon = toSignal(
    this.pokemonService.listar().pipe(map((pokemon) => pokemon.map(paraCardViewModel))),

    { initialValue: [] as PokemonCardViewModel[] },
  );

  protected readonly paraTitleCase = paraTitleCase;
}

//acesso a apis externas
