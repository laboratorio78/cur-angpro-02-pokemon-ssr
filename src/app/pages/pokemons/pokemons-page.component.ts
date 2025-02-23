import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
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
          console.log('On Init');
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
