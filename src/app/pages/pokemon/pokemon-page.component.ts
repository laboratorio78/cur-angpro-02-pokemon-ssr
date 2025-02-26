import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;

    this.pokemonsService.loadPokemon(id)
      .pipe(
        tap( ({name, id}) => {

          const pageTitle = `#${ id } - ${ name }`;
          const pageDescription = `Página del pokemon ${ name }`;
          this.title.setTitle(pageTitle);

          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescription });
          this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png` });

        })
      )
      .subscribe(this.pokemon.set);
  }

}
