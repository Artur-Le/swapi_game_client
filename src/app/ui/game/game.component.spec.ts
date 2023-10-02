import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from 'src/app/core/services/game.service';
import { instance, mock, verify, when } from 'ts-mockito';
import { Subject } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    let gameServiceMock: GameService;
    let gameDataSubject: Subject<Person[]>;

    beforeEach(() => {
        gameServiceMock = mock(GameService);
        gameDataSubject = new Subject<Person[]>();

        when(gameServiceMock.gameData$).thenReturn(gameDataSubject);

        TestBed.configureTestingModule({
            declarations: [GameComponent],
            imports: [
                BrowserAnimationsModule,
                MatCardModule,
                MatButtonModule,
                MatSelectModule
            ],
            providers: [{ provide: GameService, useValue: instance(gameServiceMock) }]
        });
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should pick winner by highest parameter', () => {
        // Given
        const receivedData: Person[] = [
            { birthYear: '1', gender: 'male', height: '50', mass: '60', name: 'Yoda' },
            { birthYear: '2', gender: 'female', height: '120', mass: '50', name: 'Ahsoka' }
        ];
        const player1Score = fixture.debugElement.query(By.css('.player-1-score')).nativeElement;
        const player2Score = fixture.debugElement.query(By.css('.player-2-score')).nativeElement;
        const message = fixture.debugElement.query(By.css('.message')).nativeElement;

        // When
        gameDataSubject.next(receivedData);
        fixture.detectChanges();

        // Then
        expect(player1Score.innerText).toEqual('Score: 1');
        expect(player2Score.innerText).toEqual('Score: 0');
        expect(message.innerText).toEqual('Player 1 Won!');
    });

    it('should pick winner when one person has unknown parameter', () => {
        // Given
        const receivedData: Person[] = [
            { birthYear: '1', gender: 'male', height: '50', mass: 'unknown', name: 'Yoda' },
            { birthYear: '2', gender: 'female', height: '120', mass: '50', name: 'Ahsoka' }
        ];
        const player1Score = fixture.debugElement.query(By.css('.player-1-score')).nativeElement;
        const player2Score = fixture.debugElement.query(By.css('.player-2-score')).nativeElement;
        const message = fixture.debugElement.query(By.css('.message')).nativeElement;

        // When
        gameDataSubject.next(receivedData);
        fixture.detectChanges();

        // Then
        expect(player1Score.innerText).toEqual('Score: 0');
        expect(player2Score.innerText).toEqual('Score: 1');
        expect(message.innerText).toEqual('Player 2 Won!');
    });

    it('should draw when both persons have unknown parameters', () => {
        // Given
        const receivedData: Person[] = [
            { birthYear: '1', gender: 'male', height: '50', mass: 'unknown', name: 'Yoda' },
            { birthYear: '2', gender: 'female', height: '120', mass: 'unknown', name: 'Ahsoka' }
        ];
        const player1Score = fixture.debugElement.query(By.css('.player-1-score')).nativeElement;
        const player2Score = fixture.debugElement.query(By.css('.player-2-score')).nativeElement;
        const message = fixture.debugElement.query(By.css('.message')).nativeElement;

        // When
        gameDataSubject.next(receivedData);
        fixture.detectChanges();

        // Then
        expect(player1Score.innerText).toEqual('Score: 0');
        expect(player2Score.innerText).toEqual('Score: 0');
        expect(message.innerText).toEqual('Draw!');
    });

    it('should draw when both persons have the same score', () => {
        // Given
        const receivedData: Person[] = [
            { birthYear: '1', gender: 'male', height: '50', mass: '5', name: 'Yoda' },
            { birthYear: '2', gender: 'female', height: '120', mass: '5', name: 'Ahsoka' }
        ];
        const player1Score = fixture.debugElement.query(By.css('.player-1-score')).nativeElement;
        const player2Score = fixture.debugElement.query(By.css('.player-2-score')).nativeElement;
        const message = fixture.debugElement.query(By.css('.message')).nativeElement;

        // When
        gameDataSubject.next(receivedData);
        fixture.detectChanges();

        // Then
        expect(player1Score.innerText).toEqual('Score: 0');
        expect(player2Score.innerText).toEqual('Score: 0');
        expect(message.innerText).toEqual('Draw!');
    });

    it('should call service to play when user click button', () => {
        // Given
        const playButton = fixture.debugElement.query(By.css('.play-button')).nativeElement;

        // When
        playButton.click();

        // Then
        verify(gameServiceMock.play()).once();
        expect(component.message).toEqual('');
    });

    it('should display proper data on cards', () => {
        // Given
        const receivedData: Person[] = [
            { birthYear: '1', gender: 'male', height: '50', mass: '6', name: 'Yoda' },
            { birthYear: '2', gender: 'female', height: '120', mass: '5', name: 'Ahsoka' }
        ];

        // When
        gameDataSubject.next(receivedData);
        fixture.detectChanges();

        const player1Card = fixture.debugElement.queryAll(By.css('.player-card'))[0];
        const player1Name = player1Card.query(By.css('mat-card-title')).nativeElement;
        const player1BirthYear = player1Card.queryAll(By.css('span'))[0].nativeElement;
        const player1Gender = player1Card.queryAll(By.css('span'))[1].nativeElement;
        const player1Height = player1Card.queryAll(By.css('span'))[2].nativeElement;
        const player1Mass = player1Card.queryAll(By.css('span'))[3].nativeElement;


        const player2Card = fixture.debugElement.queryAll(By.css('.player-card'))[1];
        const player2Name = player2Card.query(By.css('mat-card-title')).nativeElement;
        const player2BirthYear = player2Card.queryAll(By.css('span'))[0].nativeElement;
        const player2Gender = player2Card.queryAll(By.css('span'))[1].nativeElement;
        const player2Height = player2Card.queryAll(By.css('span'))[2].nativeElement;
        const player2Mass = player2Card.queryAll(By.css('span'))[3].nativeElement;

        // Then
        expect(player1Name.innerText).toEqual('Name: Yoda');
        expect(player1BirthYear.innerText).toEqual('Birth Year: 1');
        expect(player1Gender.innerText).toEqual('Gender: male');
        expect(player1Height.innerText).toEqual('Height: 50');
        expect(player1Mass.innerText).toEqual('Mass: 6');

        expect(player2Name.innerText).toEqual('Name: Ahsoka');
        expect(player2BirthYear.innerText).toEqual('Birth Year: 2');
        expect(player2Gender.innerText).toEqual('Gender: female');
        expect(player2Height.innerText).toEqual('Height: 120');
        expect(player2Mass.innerText).toEqual('Mass: 5');
    });
});
