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

const JIM = "https://image.jimcdn.com/app/cms/image/transf/none/path/s3dc7aa68b187a79b";

function photo(id: string, version: string) {
  return `${JIM}/image/${id}/version/${version}/image.jpg`;
}

function background(id: string, version: string) {
  return `${JIM.replace("/image/transf/none/path/", "/image/transf/dimension=2000x1500:format=jpg/path/")}/backgroundarea/${id}/version/${version}/image.jpg`;
}

export const photos: Photo[] = [
  { src: background("i5e5ed78ea577706a", "1451001290"), alt: "Pool and stone terrace", category: "grounds" },
  { src: photo("i034ce8c17ae86313", "1687717003"), alt: "Garden, palms, and houses", category: "grounds" },
  { src: photo("ic3ceee01817f6e5c", "1687715124"), alt: "Pool, thatch, and lawn", category: "grounds" },
  { src: photo("i35718ff7a8549de0", "1687715287"), alt: "Palms at dusk", category: "grounds" },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s3dc7aa68b187a79b/backgroundarea/i5ceb0f4ba4bcfb65/version/1451001290/image.jpg",
    alt: "Sunset over Lake Ypacaraí",
    category: "grounds",
  },
  {
    src: "https://image.jimcdn.com/app/cms/image/transf/none/path/s3dc7aa68b187a79b/backgroundarea/i0d5d876db0287ab4/version/1451001290/image.jpg",
    alt: "Pool beside the stone house",
    category: "grounds",
  },
  { src: photo("i0dc231749265899b", "1757381163"), alt: "Rustico kitchen and wooden table", category: "rustico" },
  { src: photo("ice625ca43cc6b819", "1757381163"), alt: "Rustico interior", category: "rustico" },
  { src: photo("ie1104edce3d1d544", "1757381163"), alt: "Rustico earth house from outside", category: "rustico" },
  { src: photo("i828c935753bf2672", "1757381163"), alt: "Rustico terrace", category: "rustico" },
  { src: photo("i9f9ab25648a03061", "1757381163"), alt: "Rustico room", category: "rustico" },
  { src: photo("iece26d9c15173d7b", "1757381163"), alt: "Rustico details", category: "rustico" },
  { src: photo("i464a5975486dc9cc", "1757381163"), alt: "Rustico outdoor space", category: "rustico" },
  { src: photo("i9dd83200a01dd1d4", "1757381164"), alt: "Rustico view", category: "rustico" },
  { src: photo("i61f1537f46847aa4", "1687714831"), alt: "Rustico earth house", category: "rustico" },
  { src: photo("iaa51a9b26307733e", "1757380120"), alt: "Sunset house exterior", category: "sunset" },
  { src: photo("i90614d6c9ec057f6", "1757380120"), alt: "Sunset terrace and stone walls", category: "sunset" },
  { src: photo("i6e310960d53e4ba5", "1687714625"), alt: "Sunset living room", category: "sunset" },
  { src: photo("i820401dca6d99f01", "1757380120"), alt: "Sunset house garden", category: "sunset" },
  { src: photo("iab8a4ef52185bc13", "1687714564"), alt: "Sunset interior", category: "sunset" },
  { src: photo("ibd618c259c708aa6", "1687714625"), alt: "Sunset house room", category: "sunset" },
  { src: photo("ie58a1859727453a0", "1684962069"), alt: "Romantico cottage from outside", category: "romantico" },
  { src: photo("ieb430b6cdf03eab1", "1684962069"), alt: "Romantico bedroom", category: "romantico" },
  { src: photo("i3c91628b7e6a0f5a", "1757381419"), alt: "Romantico brick terrace", category: "romantico" },
  { src: photo("i9a455ea1f03a6d70", "1684962069"), alt: "Romantico cottage", category: "romantico" },
  { src: photo("if7e4f64581a985dd", "1684962070"), alt: "Romantico interior", category: "romantico" },
  { src: photo("i9250a455dc342963", "1757381419"), alt: "Romantico living space", category: "romantico" },
  { src: photo("idb1cbec3fc5f6e4b", "1757381419"), alt: "Romantico outdoor room", category: "romantico" },
  { src: photo("i2926b6e8bc4d0b2e", "1684962070"), alt: "Romantico house", category: "romantico" },
  { src: photo("i35da355fd25a3dd6", "1757380238"), alt: "Paradise City Saloon sign", category: "saloon" },
  { src: photo("i186fb79c3dbbbd45", "1757381647"), alt: "Saloon pool and tower", category: "saloon" },
  { src: photo("i8b3fd89b11c87849", "1757380238"), alt: "Saloon bar", category: "saloon" },
  { src: photo("i5dcb63554ef906cb", "1757380245"), alt: "Saloon seating", category: "saloon" },
  { src: photo("ic4f1b12aa859367a", "1757381647"), alt: "Saloon evening", category: "saloon" },
  { src: photo("ifbd2b73ca0d67975", "1757381647"), alt: "Saloon garden", category: "saloon" },
  { src: photo("i527924282e0c2d14", "1757380238"), alt: "Saloon patio", category: "saloon" },
  { src: photo("i663983919d29ea1e", "1757380238"), alt: "Saloon pool party light", category: "saloon" },
];

export const shots = {
  palmsDusk: photo("i35718ff7a8549de0", "1687715287"),
  lakeSunset:
    "https://image.jimcdn.com/app/cms/image/transf/none/path/s3dc7aa68b187a79b/backgroundarea/i5ceb0f4ba4bcfb65/version/1451001290/image.jpg",
  saloonPool: photo("i186fb79c3dbbbd45", "1757381647"),
  saloonSign: photo("i35da355fd25a3dd6", "1757380238"),
  domainKitchen: photo("i9a455ea1f03a6d70", "1684962069"),
  brandLogo: "/paradise-city-logo.png",
  brandHero: "/paradise-city-hero.jpg",
} as const;

export const houseCovers = {
  rustico: photo("ie1104edce3d1d544", "1757381163"),
  sunset: photo("iaa51a9b26307733e", "1757380120"),
  romantico: photo("ie58a1859727453a0", "1684962069"),
} as const;

export const houseGalleries = {
  rustico: photos.filter((p) => p.category === "rustico" && p.src !== houseCovers.rustico),
  sunset: photos.filter((p) => p.category === "sunset" && p.src !== houseCovers.sunset),
  romantico: photos.filter((p) => p.category === "romantico" && p.src !== houseCovers.romantico),
} as const;
