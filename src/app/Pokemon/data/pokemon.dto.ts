export interface ObjetoRespostaHttp {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultadoObjetoHttp[];
}

export interface ResultadoObjetoHttp {
  name: string;
  url: string;
}

export interface TipoPokemonRespostahttp {
  type: {
    name: string;
  };
}

export interface PokemonRespostaHttp {
  id: number;
  name: string;
  types: TipoPokemonRespostahttp[];
  sprites: {
    front_default: string | null;
  };
}
