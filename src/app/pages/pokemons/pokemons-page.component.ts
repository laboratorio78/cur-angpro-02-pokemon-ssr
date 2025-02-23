import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
// import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'pokemons-page',
  imports: [
    PokemonListComponent,
    // PokemonListSkeletonComponent,
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log(isStable);
  // })

  ngOnInit(): void {
    this.loadPokemons();
    // title
    // Meta-tags
    // Stable
    // setTimeout( () => {
    //   this.isLoading.set(false);
    // }, 5000)
  }

  public loadPokemons(page = 0) {

    this.pokemonsService.loadPage(page)
      .subscribe({
        next: (pokemons) => {
          this.pokemons.set(pokemons);
        },
        error: (err) => { },
        complete: () => { }
      })

  }

  // ngOnDestroy(): void {
  //   console.log('destroy!');
  //   this.$appState.unsubscribe();
  // }

}
