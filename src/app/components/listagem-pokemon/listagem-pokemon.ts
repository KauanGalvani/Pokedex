import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, switchMap } from 'rxjs'; // usamos o switcmap quando temos uma chamada externa, quando nao temos usamos o map

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

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  protected readonly ObjetoResposta = toSignal(
    this.http.get<ObjetoRespostaHttp>(this.apiUrl).pipe(
      switchMap((obj) => {
        const requisicoes = obj.results.map((r) => this.http.get(r.url));

        return forkJoin(requisicoes);
      }),
    ),
    {
      initialValue: null,
    },
  );
}

//acesso a apis externas
