import { BeerLink, ClubLink } from "~/server/Beer.js";
import { beerClubs } from "~/server/BeerClubs.js";

export default defineEventHandler((event: any) => {
  let allKeys: Array<number> = Object.entries(beerClubs)
    .flatMap((item) => {
      return parseInt(item[0]);
    })
    .sort();

  const result: Array<ClubLink> = allKeys.map((clubIndex) => {
    const club = beerClubs[clubIndex];

    const beers: Array<BeerLink> = club.beers.map((beer, beerIndex) => {
      return {
        url: beer.url,
        name: beer.name,
        brewery: beer.brewery,
        summary: beer.summary,
        image: beer.image,
        abv: beer.abv,
        country: beer.country,
        type: beer.type,
        volume: beer.volume,
        link: `/club/${clubIndex}/beer/${beerIndex + 1}/`,
      };
    });

    let link: ClubLink = {
      name: club.name,
      date: club.date,
      link: `/club/${clubIndex}/`,
      beers: beers,
    };
    return link;
  });

  return result;
});
