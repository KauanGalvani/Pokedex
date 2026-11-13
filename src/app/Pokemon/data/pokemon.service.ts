import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ObjetoRespostaHttp, PokemonRespostaHttp } from './pokemon.dto';
import { Pokemon } from '../pokemon.model';

export const POKE_API_URL = new InjectionToken<string>('POKE_API_URL');

function mapearRespostaPokemon(dto: PokemonRespostaHttp): Pokemon {
  return {
    id: dto.id,
    name: dto.name,
    types: dto.types.map((item) => item.type.name),
    sprite: dto.sprites.front_default,
  };
}

@Injectable({ providedIn: 'root' }) // quando a aplciação carregar ela injeta automaticamente na memoria o serviço
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(POKE_API_URL);

  listar(): Observable<Pokemon[]> {
    // O primeiro GET traz apenas os nomes e as URLs dos Pokémon
    return this.http.get<ObjetoRespostaHttp>(this.apiUrl).pipe(
      switchMap((obj) => {
        // Criamos uma requisição de detalhe para cada Pokémon da listagem
        const requisicoes = obj.results.map((r) => this.http.get<PokemonRespostaHttp>(r.url));

        // forkJoin espera todas as requisições terminarem e emite um array
        // com as respostas na mesma ordem das requisições
        return forkJoin(requisicoes);
      }),
      // Este map é do RxJS: transfotma a emissão do Oberservable.
      map((detalhes: PokemonRespostaHttp[]): Pokemon[] =>
        // Este map é do array: transforma cada resposta vruta em Pokémon.
        detalhes.map(mapearRespostaPokemon),
      ),
    );
  }
}

// ideia principal do nosso s3erviço e obter e mapear os dados da nossa aplicação, e  o componente vai apresentar os dados da forma que ele precisa
