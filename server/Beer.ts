export interface Beer {
  url: String;
  name: String;
  brewery: String;
  summary: String;
  image: String;
  abv: Number;
  country: String;
  type: String;
  volume: String;
}

export interface ClubResult {
  name: String;
  date: Date;
  beers: Array<BeerLink>;
  previous: String | null;
  next: String | null;
}

export interface ClubLink {
  name: String;
  date: Date;
  beers: Array<BeerLink>;
  link: String;
}

export interface BeerLink extends Beer {
  link: String;
}

export interface BeerResult extends Beer {
  club: String;
  previous: String | null;
  next: String | null;
}

export interface BeerClub {
  name: String;
  date: Date;
  beers: Array<Beer>;
}
