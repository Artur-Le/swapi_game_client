import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { SwapiService } from './swapi.service';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { ElementsResponse } from 'src/app/shared/models/elements-response';
import { PersonResponse } from 'src/app/shared/models/person-response';
import { Person } from 'src/app/shared/models/person';

describe('SwapiService', () => {
    let service: SwapiService;
    let httpClientMock: HttpClient;

    const apiUrl = 'https://www.swapi.tech/api';
    const receivedIds: Partial<ElementsResponse> = { results: [ { name: 'Yoda', uid: '1', url: '' } ] };
    const receivedPerson: Partial<PersonResponse> = { result:
        {
            uid: '1',
            description: '',
            properties: {
                name: 'Yoda',
                birth_year: '1',
                height: '1',
                mass: '1',
                created: '',
                edited: '',
                eye_color: '',
                gender: 'male',
                hair_color: '',
                homeworld: '',
                skin_color: '',
                url: ''
            } } };

    beforeEach(() => {
        httpClientMock = mock(HttpClient);

        when(httpClientMock.get(`${apiUrl}/people?page=1&limit=100`)).thenReturn(of(receivedIds));
        when(httpClientMock.get(`${apiUrl}/people/1`)).thenReturn(of(receivedPerson));

        TestBed.configureTestingModule({
            providers: [
                SwapiService,
                { provide: HttpClient, useValue: instance(httpClientMock) }
            ]
        });
        service = TestBed.inject(SwapiService);
    });

    it('should get available persons IDs', () => {
        // Given
        let ids: number[] = [];

        // When
        service.getPeopleIds().subscribe((result) => {
            ids = result;
        });

        // Then
        expect(ids).toEqual([1]);
    });

    it('should get person', () => {
        // Given
        let person: Person = { birthYear: '', gender: '', height: '', mass: '', name: '' };
        const expectedPerson = { birthYear: '1', gender: 'male', height: '1', mass: '1', name: 'Yoda' };

        // When
        service.getPerson(1).subscribe((result) => {
            person = result;
        });

        // Then
        expect(person).toEqual(expectedPerson);
    });
});
