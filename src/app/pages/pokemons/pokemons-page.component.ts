import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
// import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  private route = inject(ActivatedRoute);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page)),
    )
  );

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log(isStable);
  // })

  ngOnInit(): void {

    // this.route.queryParamMap.subscribe(console.log);
    console.log(this.currentPage());


    this.loadPokemons();
    // title
    // Meta-tags
    // Stable
    // setTimeout( () => {
    //   this.isLoading.set(false);
    // }, 5000)
  }

  public loadPokemons(page = 0) {

    const pageToLoad = this.currentPage()! + page;

    // console.log({pageToLoad, currentPage: this.currentPage()});


    this.pokemonsService.loadPage(pageToLoad)
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
