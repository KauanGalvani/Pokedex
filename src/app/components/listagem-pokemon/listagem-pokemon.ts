import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';

@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  private readonly http = Inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/ability/35/';

  constructor() {
    const responsta = this.http.get(this.apiUrl);
  }
}

//acesso a apis externas
