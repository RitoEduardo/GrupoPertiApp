
export interface IMovieDetail{
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: any;
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    officialSite: string;
    schedule: any;
    rating: any;
    weight: number;
    network: any;
    webChannel: any;
    dvdCountry: any;
    externals: any;
    image: any;
    summary: string;
    updated: number;
    _links: any;
}

export interface IMovieInfo{
    airdate: string;
    airstamp: string;
    airtime: string;
    id: number;
    image: any;
    name: string;
    number: number;
    runtime: number;
    season: number;
    summary: any;
    type: string;
    url: string;
    language?: string;
}

export interface IMovieShow{
    score: number;
    show: IMovieInfo;
}