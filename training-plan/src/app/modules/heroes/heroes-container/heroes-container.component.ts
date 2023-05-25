import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HeroesService } from '../providers/heroes.service';
import { Observable, delay } from 'rxjs';
import { Hero } from '../models/hero.model';

@Component({
  templateUrl: './heroes-container.component.html',
  styleUrls: ['./heroes-container.component.scss']
})
export class HeroesContainerComponent implements AfterViewInit, OnInit {

  students$: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.students$ = this.heroesService.getAllHeroes().pipe(delay(5000));
    this.heroesService.getAllHeroes().subscribe(h=>console.log(h))
  }

}
