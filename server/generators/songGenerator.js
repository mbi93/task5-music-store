const { fakerEN_US, fakerDE } = require("@faker-js/faker");
const seedrandom = require("seedrandom");
const { generateCover } = require("../generateCover");

const genres = {
  en: [
    "Rock",
    "Pop",
    "Jazz",
    "Blues",
    "Hip-Hop",
    "Electronic",
    "Country",
    "Indie",
  ],
  de: [
    "Rock",
    "Pop",
    "Jazz",
    "Blues",
    "Hip-Hop",
    "Elektronisch",
    "Volksmusik",
    "Indie",
  ],
};

function generateLikes(avgLikes, rng) {
  const whole = Math.floor(avgLikes);
  const fraction = avgLikes - whole;

  return whole + (rng() < fraction ? 1 : 0);
}

function generateSongs({
  page = 1,
  seed = 1,
  locale = "en-US",
  likes = 3.7,
  limit = 20,
}) {
  const combinedSeed = `${seed}-${page}`;

  const songRng = seedrandom(`${combinedSeed}-songs`);
  const likesRng = seedrandom(`${combinedSeed}-likes`);
  const coverRng = seedrandom(`${combinedSeed}-${locale}-cover`);

  const faker = locale === "de-DE" ? fakerDE : fakerEN_US;

  faker.seed(Math.floor(songRng() * 1000000));

  const items = [];

  for (let i = 0; i < limit; i++) {
    const index = (page - 1) * limit + i + 1;

    const title = faker.music.songName();

    const artist =
      songRng() > 0.5
        ? faker.person.fullName()
        : `${faker.word.adjective()} ${faker.word.noun()}`;

    const album = songRng() > 0.3 ? faker.music.album() : "Single";

    const genre =
      locale === "de-DE"
        ? faker.helpers.arrayElement(genres.de)
        : faker.helpers.arrayElement(genres.en);

    const cover = generateCover(title, artist, coverRng);

    items.push({
      id: `${seed}-${index}`,

      index,
      title,
      artist,
      album,
      genre,

      likes: generateLikes(Number(likes), likesRng),

      review: faker.lorem.paragraph(),

      cover,
    });
  }

  return items;
}

module.exports = {
  generateSongs,
};
