export interface ElementsResponse {
    message: string;
    next: string;
    previous: string;
    results: [{
        name: string;
        uid: string;
        url: string;
    }
    ];
    total_pages: number;
    total_records: number;
}
