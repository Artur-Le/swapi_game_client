import { Injectable } from '@angular/core';
import { SwapiService } from './swapi.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Person } from 'src/app/shared/models/person';

@Injectable()
export class GameService {
    private availablePeopleIds: number[] = [];

    private readonly gameData: Person[] = [
        { birthYear: '', gender: '', height: '', mass: '', name: '' },
        { birthYear: '', gender: '', height: '', mass: '', name: '' }
    ];

    private readonly _gameData$ = new BehaviorSubject<Person[]>(this.gameData);

    public get gameData$(): Observable<Person[]> { return this._gameData$; }

    public constructor(private readonly swapiService: SwapiService) {
        this.swapiService.getPeopleIds()
            .pipe(takeUntilDestroyed())
            .subscribe((ids): void => {
                this.availablePeopleIds = ids;
            });
    }

    public play(): void {
        const firstPerson = this.swapiService.getPerson(this.rollRandomId());
        const secondPerson = this.swapiService.getPerson(this.rollRandomId());

        combineLatest([firstPerson, secondPerson]).subscribe((persons): void => {
            this._gameData$.next(persons);
        });
    }

    private rollRandomId(): number {
        return this.availablePeopleIds[Math.floor(Math.random() * this.availablePeopleIds.length)];
    }
}
