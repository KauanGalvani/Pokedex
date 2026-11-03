import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-listagem-pokemon',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor() {
    this.http.get(this.apiUrl).subscribe((res) => {
      console.log(res);
    });
  }
}

//acesso a apis externas
// Síncrono: você fica parado esperando o lanche ficar pronto para só depois fazer outra coisa.

// Assíncrono: você faz o pedido e, enquanto o lanche é preparado, pode mexer no celular ou conversar. Quando estiver pronto, você recebe o lanche.
