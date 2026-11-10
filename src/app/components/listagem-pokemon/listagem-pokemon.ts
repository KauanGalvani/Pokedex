import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, switchMap } from 'rxjs'; // usamos o switcmap quando temos uma chamada externa, quando nao temos usamos o map

interface ObjetoRespostaHttp {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultadoObjetoHttp[];
}

interface ResultadoObjetoHttp {
  name: string;
  url: string;
}

interface TipoPokemonRespostahttp {
  type: {
    name: string;
  };
}

interface PokemonRespostaHttp {
  id: number;
  name: string;
  types: TipoPokemonRespostahttp[];
  sprites: {
    front_default: string | null;
  };
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string | null;
}

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  protected readonly Pokemon = toSignal(
    this.http.get<ObjetoRespostaHttp>(this.apiUrl).pipe(
      switchMap((obj) => {
        const requisicoes = obj.results.map((r) => this.http.get<PokemonRespostaHttp>(r.url));

        return forkJoin(requisicoes);
      }),
      map((detalhes: PokemonRespostaHttp[]): Pokemon[] =>
        detalhes.map((detalhes) => ({
          id: detalhes.id,
          name: detalhes.name,
          types: detalhes.types.map((item) => item.type.name),
          sprite: detalhes.sprites.front_default,
        })),
      ),
    ),
    {
      initialValue: null,
    },
  );

  protected paraTitleCase(texto: string): string {
    return texto.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  }
}

//acesso a apis externas
