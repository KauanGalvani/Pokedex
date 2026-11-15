import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // usamos o switcmap quando temos uma chamada externa, quando nao temos usamos o map
import { PokemonService } from '../data/pokemon.service';
import { Pokemon } from '../pokemon.model';

interface PokemonTypeModel {
  readonly name: string;
  readonly desplayName: string;
}

interface PokemonCardViewModel {
  readonly id: number;
  readonly desplayName: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly type: readonly PokemonTypeModel[];
}

export function paraTitleCase(texto: string): string {
  // este regex (/\b\w/g) vatte o texto procurando a primeira letra de cada palavra
  return texto.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

function paraCardViewModel(dto: Pokemon): PokemonCardViewModel {
  return {
    id: 0,
    desplayName: '',
    imageUrl: null,
    imageAlt: '',
    type: [],
  };
}

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  protected readonly pokemonService = inject(PokemonService);

  protected readonly Pokemon = toSignal(this.pokemonService.listar(), {
    initialValue: [] as Pokemon[],
  });

  protected readonly paraTitleCase = paraTitleCase;
}

//acesso a apis externas
//lembrar de melhorar a estilzação
