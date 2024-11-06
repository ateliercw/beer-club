import { BeerLink, ClubResult } from "~/server/Beer.js";
import { beerClubs } from "~/server/BeerClubs.js";

export default defineEventHandler((event: any) => {
  const clubId = parseInt(event.context.params.club) as number;

  let allKeys: Array<number> = Object.entries(beerClubs)
    .flatMap((item) => {
      return parseInt(item[0]);
    })
    .sort();

  const clubIndex = allKeys.indexOf(clubId);

  let prev: String | null;
  if (clubIndex > 0) {
    prev = `/club/${allKeys[clubIndex - 1]}/`;
  } else {
    prev = null;
  }
  let next: String | null;
  if (clubIndex < allKeys.length - 1) {
    next = `/club/${allKeys[clubIndex + 1]}/`;
  } else {
    next = null;
  }

  const club = beerClubs[clubId];

  const beers: Array<BeerLink> = club.beers.map((value, index) => {
    return {
      url: value.url,
      name: value.name,
      brewery: value.brewery,
      summary: value.summary,
      image: value.image,
      abv: value.abv,
      country: value.country,
      type: value.type,
      volume: value.volume,
      link: `/club/${clubId}/beer/${index + 1}/`,
    };
  });

  const result: ClubResult = {
    name: club.name,
    date: club.date,
    beers: beers,
    previous: prev,
    next: next,
  };

  return result;
});
