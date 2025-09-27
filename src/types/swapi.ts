import { UseFormRegisterReturn } from "react-hook-form";

export interface ResourceCounts {
  films: number;
  starships: number;
  people: number;
  species: number;
}

export interface Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

export interface Person {
  name: string;
  height: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  gender: string;
}

export interface Species {
  name: string;
  designation: string;
  language: string;
  eye_colors: string;
  average_lifespan: string;
}

export interface Starship {
  name: string;
  model: string;
  starship_class: string;
  passengers: string;
  pilots: [];
}

export type FloatingInputProps = {
  label: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
};
