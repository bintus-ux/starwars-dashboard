const BASE_URL = "https://swapi.dev/api/";

async function fetchResource(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  return res.json();
}

export async function fetchFilms() {
  return fetchResource("films/");
}

export async function fetchFilm(id: string) {
  return fetchResource(`films/${id}/`);
}

export async function fetchStarships() {
  return fetchResource("starships/");
}

export async function fetchStarship(id: string) {
  return fetchResource(`starships/${id}/`);
}

export async function fetchPeople() {
  return fetchResource("people/");
}

export async function fetchPerson(id: string) {
  return fetchResource(`people/${id}/`);
}

export async function fetchSpecies() {
  return fetchResource("species/");
}

export async function fetchSpecie(id: string) {
  return fetchResource(`species/${id}/`);
}

export async function fetchResourceCounts() {
  try {
    const [films, starships, people, species] = await Promise.all([
      fetchFilms(),
      fetchStarships(),
      fetchPeople(),
      fetchSpecies(),
    ]);

    return {
      films: films.count,
      starships: starships.count,
      people: people.count,
      species: species.count,
    };
  } catch (error) {
    console.error("Error fetching resource counts:", error);
    return {
      films: 0,
      starships: 0,
      people: 0,
      species: 0,
    };
  }
}
