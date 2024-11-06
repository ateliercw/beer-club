import { BeerResult } from "~/server/Beer.js";
import { beerClubs } from "~/server/BeerClubs.js";

export default defineEventHandler((event: any) => {
  const clubId = parseInt(event.context.params.club) as number;
  const beerId = parseInt(event.context.params.beer) as number;

  const club = beerClubs[clubId];
  const beer = club.beers[beerId - 1];

  if (beer == null) {
    return null;
  }

  let prev: String | null;
  if (beerId > 1) {
    prev = `/club/${clubId}/beer/${beerId - 1}/`;
  } else {
    prev = null;
  }
  let next: String | null;
  if (beerId < club.beers.length) {
    next = `/club/${clubId}/beer/${beerId + 1}/`;
  } else {
    next = null;
  }
  const result: BeerResult = {
    url: beer.url,
    name: beer.name,
    brewery: beer.brewery,
    summary: beer.summary,
    image: beer.image,
    abv: beer.abv,
    country: beer.country,
    type: beer.type,
    volume: beer.volume,
    club: `/club/${clubId}/`,
    previous: prev,
    next: next,
  };

  return result;
});
