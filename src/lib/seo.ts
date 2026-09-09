import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { languageUrls } from "@/lib/locale";
import { shots } from "@/lib/photos";

export const SITE_URL = (process.env.SITE_URL ?? "https://paradise-city.me").replace(/\/$/, "");

export const OG_IMAGE = shots.brandHero;

const homeTitle = "Ferienhäuser in Altos, Paraguay";
const homeDescription =
  "Drei Ferienhäuser in Ybu, Altos, über dem Ypacaraí-See bei San Bernardino. Rustico, Sunset und Romantico für zwei Personen. Langzeitmiete möglich. Deutsch, Englisch und Spanisch vor Ort.";

export const pageSeo = {
  home: {
    title: homeTitle,
    description: homeDescription,
    path: "/",
  },
  houses: {
    title: "Ferienhäuser Rustico, Sunset und Romantico",
    description:
      "Ferienhäuser in Altos, Paraguay: Rustico (Erdhaus), Sunset (Terrasse und See) und Romantico (klein und ruhig). Jedes Haus für zwei Personen, mit Pool und Saloon.",
    path: "/haeuser",
  },
  location: {
    title: "Lage in Ybu, Altos am Ypacaraí-See",
    description:
      "Paradise City liegt in Ybu, 3240 Altos, Paraguay, über dem See von San Bernardino. 45 Minuten vom Flughafen Asunción. Erdstrasse, 4,5 km von Altos.",
    path: "/lage",
  },
  gallery: {
    title: "Fotos der Ferienhäuser in Altos",
    description:
      "Galerie von Paradise City in Altos, Paraguay: Gelände, Palmen, Pool, Rustico, Sunset, Romantico und Paradise City Saloon.",
    path: "/galerie",
  },
  contact: {
    title: "Ferienhaus in Altos anfragen",
    description:
      "Anfrage für ein Ferienhaus in Paradise City, Altos, Paraguay. E-Mail, Telefon oder WhatsApp. Wir antworten auf Deutsch, Englisch und Spanisch.",
    path: "/kontakt",
  },
  privacy: {
    title: "Datenschutz",
    description: "Paradise City setzt keine Cookies, kein Tracking und kein Cookie-Banner.",
    path: "/datenschutz",
  },
} as const;

export function pageMetadata(page: (typeof pageSeo)[keyof typeof pageSeo]): Metadata {
  const url = `${SITE_URL}${page.path}`;
  const languages = languageUrls(page.path, SITE_URL);
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": url,
      },
    },
    openGraph: {
      title: `${page.title} · ${SITE.name}`,
      description: page.description,
      url,
    },
  };
}

export function lodgingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE.name,
        description: homeDescription,
        url: SITE_URL,
        email: SITE.email,
        telephone: SITE.phones.map((phone) => phone.href.replace("tel:", "")),
        image: [OG_IMAGE, shots.lakeSunset, shots.saloonSign],
        slogan: SITE.motto,
        priceRange: "PYG",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ybu",
          addressLocality: "Altos",
          postalCode: "3240",
          addressCountry: "PY",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.coords.lat,
          longitude: SITE.coords.lng,
        },
        sameAs: [
          SITE.facebook,
          SITE.facebookParaguay,
          SITE.airbnb.rustico,
          SITE.airbnb.sunset,
          SITE.airbnb.romantico,
        ],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "WLAN", value: true },
          { "@type": "LocationFeatureSpecification", name: "Klimaanlage", value: true },
          { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
          { "@type": "LocationFeatureSpecification", name: "Grillstelle", value: true },
          { "@type": "LocationFeatureSpecification", name: "Waschküche", value: true },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ferienhäuser",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Accommodation", name: "Rustico", url: SITE.airbnb.rustico },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Accommodation", name: "Sunset", url: SITE.airbnb.sunset },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Accommodation", name: "Romantico", url: SITE.airbnb.romantico },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        inLanguage: "de",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}
