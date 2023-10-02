import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GameService } from 'src/app/core/services/game.service';
import { Person } from 'src/app/shared/models/person';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent {
    public gameData$: Observable<Person[]>;
    public compareParameter = 'mass';
    public message = '';

    public player1Score = 0;
    public player2Score = 0;

    public parameters = ['mass', 'height'];

    public constructor(
        private readonly gameService: GameService
    ) {
        this.gameData$ = gameService.gameData$.pipe(
            tap((gameData): void => { this.checkWinner(gameData); })
        );
    }

    public play(): void {
        this.message = '';
        this.gameService.play();
    }

    private checkWinner(gameData: Person[]): void {
        const player1Score = Number(gameData[0][this.compareParameter]);
        const player2Score = Number(gameData[1][this.compareParameter]);

        if ((isNaN(player1Score)) && isNaN(player2Score)) {
            this.message = 'Draw!';
        } else if (player1Score > player2Score || isNaN(player2Score)) {
            this.message = 'Player 1 Won!';
            this.player1Score++;
        } else if (player2Score > player1Score || isNaN(player1Score)) {
            this.message = 'Player 2 Won!';
            this.player2Score++;
        } else if (player1Score && player2Score) {
            this.message = 'Draw!';
        }
    }
}

