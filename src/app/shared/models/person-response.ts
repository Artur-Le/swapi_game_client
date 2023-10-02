export interface PersonResponse {
    message: string;
    result: {
        description: string;
        properties: {
            birth_year: string;
            created: string;
            edited: string;
            eye_color: string;
            gender: string;
            hair_color: string;
            height: string;
            homeworld: string;
            mass: string;
            name: string;
            skin_color: string;
            url: string;
        };
        uid: string;
    };
    __v: number;
    _id: string;
}
