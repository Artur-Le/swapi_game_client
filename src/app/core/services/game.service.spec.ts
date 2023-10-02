import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { SwapiService } from './swapi.service';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { of } from 'rxjs';
import { Person } from 'src/app/shared/models/person';

describe('GameService', () => {
    let service: GameService;
    let swapiServiceMock: SwapiService;

    const receivedPerson = { birthYear: '1', gender: 'male', height: '1', mass: '1', name: 'First' };

    beforeEach(() => {
        swapiServiceMock = mock(SwapiService);
        when(swapiServiceMock.getPeopleIds()).thenReturn(of([1]));
        when(swapiServiceMock.getPerson(1)).thenReturn(of(receivedPerson));

        TestBed.configureTestingModule({
            providers: [
                GameService,
                { provide: SwapiService, useValue: instance(swapiServiceMock) }
            ]
        });
        service = TestBed.inject(GameService);
    });

    it('should roll persons two time and pass data by Subject when play', () => {
        // Given
        let data: Person[] = [];
        service.gameData$.subscribe((receivedData) => {
            data = receivedData;
        });

        // When
        service.play();

        // Then
        verify(swapiServiceMock.getPerson(anything())).twice();
        expect(data).toEqual([receivedPerson, receivedPerson]);
    });
});
