import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
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

  public isLoading = signal(true);

  private appRef = inject(ApplicationRef);

  private $appState = this.appRef.isStable.subscribe( isStable => {
    console.log(isStable);
  })

  ngOnInit(): void {
    // title
    // Meta-tags
    // Stable
    // setTimeout( () => {
    //   this.isLoading.set(false);
    // }, 5000)
  }

  // ngOnDestroy(): void {
  //   console.log('destroy!');
  //   this.$appState.unsubscribe();
  // }

}
