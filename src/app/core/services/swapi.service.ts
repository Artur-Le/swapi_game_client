import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ElementsResponse } from '../../shared/models/elements-response';
import { PersonResponse } from '../../shared/models/person-response';
import { Person } from 'src/app/shared/models/person';

@Injectable()
export class SwapiService {
    private readonly apiUrl = 'https://www.swapi.tech/api';

    public constructor(private readonly httpClient: HttpClient) {}

    public getPeopleIds(): Observable<number[]> {
        return this.httpClient.get<ElementsResponse>(`${this.apiUrl}/people?page=1&limit=100`)
            .pipe(
                map((response): number[] => response.results.map((result): number => Number(result.uid)))
            );
    }

    public getPerson(id: number): Observable<Person> {
        return this.httpClient.get<PersonResponse>(`${this.apiUrl}/people/${id}`)
            .pipe(
                map((response): Person => {
                    const properties = response.result.properties;
                    return {
                        birthYear: properties.birth_year,
                        gender: properties.gender,
                        height: properties.height,
                        mass: properties.mass,
                        name: properties.name
                    };
                })
            );
    }
}
