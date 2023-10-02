import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameComponent } from './ui/game/game.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [AppComponent, MockComponent(GameComponent)]
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
