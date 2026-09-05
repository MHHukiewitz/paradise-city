export type PhotoCategory =
  | "grounds"
  | "rustico"
  | "sunset"
  | "romantico"
  | "saloon";

export type Photo = {
  src: string;
  alt: string;
  category: PhotoCategory;
};

export const photos: Photo[] = [
  { src: "/photos/grounds/pool.jpg", alt: "Pool and stone terrace", category: "grounds" },
  { src: "/photos/grounds/garden.jpg", alt: "Garden, palms, and houses", category: "grounds" },
  { src: "/photos/grounds/terrace-pool.jpg", alt: "Pool, thatch, and lawn", category: "grounds" },
  { src: "/photos/grounds/palms-dusk.jpg", alt: "Palms at dusk", category: "grounds" },
  { src: "/photos/grounds/lake-sunset.jpg", alt: "Sunset over Lake Ypacaraí", category: "grounds" },
  { src: "/photos/grounds/pool-house.jpg", alt: "Pool beside the stone house", category: "grounds" },
  { src: "/photos/rustico/10.jpg", alt: "Rustico kitchen and wooden table", category: "rustico" },
  { src: "/photos/rustico/02.jpg", alt: "Rustico interior", category: "rustico" },
  { src: "/photos/rustico/03.jpg", alt: "Rustico living space", category: "rustico" },
  { src: "/photos/rustico/05.jpg", alt: "Rustico terrace", category: "rustico" },
  { src: "/photos/rustico/06.jpg", alt: "Rustico room", category: "rustico" },
  { src: "/photos/rustico/08.jpg", alt: "Rustico details", category: "rustico" },
  { src: "/photos/rustico/09.jpg", alt: "Rustico outdoor space", category: "rustico" },
  { src: "/photos/rustico/11.jpg", alt: "Rustico view", category: "rustico" },
  { src: "/photos/rustico/01.jpg", alt: "Rustico earth house", category: "rustico" },
  { src: "/photos/sunset/07.jpg", alt: "Sunset house exterior", category: "sunset" },
  { src: "/photos/sunset/06.jpg", alt: "Sunset terrace and stone walls", category: "sunset" },
  { src: "/photos/sunset/03.jpg", alt: "Sunset living room", category: "sunset" },
  { src: "/photos/sunset/08.jpg", alt: "Sunset house garden", category: "sunset" },
  { src: "/photos/sunset/01.jpg", alt: "Sunset interior", category: "sunset" },
  { src: "/photos/sunset/04.jpg", alt: "Sunset house room", category: "sunset" },
  { src: "/photos/sunset/09.jpg", alt: "Sunset terrace seating", category: "sunset" },
  { src: "/photos/sunset/10.jpg", alt: "Sunset house detail", category: "sunset" },
  { src: "/photos/romantico/05.jpg", alt: "Romantico brick terrace", category: "romantico" },
  { src: "/photos/romantico/01.jpg", alt: "Romantico cottage", category: "romantico" },
  { src: "/photos/romantico/03.jpg", alt: "Romantico interior", category: "romantico" },
  { src: "/photos/romantico/04.jpg", alt: "Romantico living space", category: "romantico" },
  { src: "/photos/romantico/06.jpg", alt: "Romantico outdoor room", category: "romantico" },
  { src: "/photos/romantico/02.jpg", alt: "Romantico house", category: "romantico" },
  { src: "/photos/saloon/01.jpg", alt: "Paradise City Saloon sign", category: "saloon" },
  { src: "/photos/saloon/07.jpg", alt: "Saloon pool and tower", category: "saloon" },
  { src: "/photos/saloon/03.jpg", alt: "Saloon bar", category: "saloon" },
  { src: "/photos/saloon/06.jpg", alt: "Saloon seating", category: "saloon" },
  { src: "/photos/saloon/08.jpg", alt: "Saloon evening", category: "saloon" },
  { src: "/photos/saloon/09.jpg", alt: "Saloon garden", category: "saloon" },
  { src: "/photos/saloon/02.jpg", alt: "Saloon patio", category: "saloon" },
  { src: "/photos/saloon/05.jpg", alt: "Saloon pool party light", category: "saloon" },
];

export const houseCovers = {
  rustico: "/photos/rustico/10.jpg",
  sunset: "/photos/sunset/07.jpg",
  romantico: "/photos/romantico/05.jpg",
} as const;

export const houseGalleries = {
  rustico: photos.filter((p) => p.category === "rustico"),
  sunset: photos.filter((p) => p.category === "sunset"),
  romantico: photos.filter((p) => p.category === "romantico"),
} as const;
