export type Locale = "de" | "en";

export const SITE = {
  name: "Paradise City",
  place: "Altos, Paraguay",
  motto: "Grillen, chillen, Bierli killen",
  email: "paradise.city.py@gmail.com",
  phones: [
    { label: "+595 983 292 948", href: "tel:+595983292948", wa: "https://wa.me/595983292948" },
    { label: "+595 984 413 469", href: "tel:+595984413469", wa: "https://wa.me/595984413469" },
  ],
  facebook: "https://www.facebook.com/ParadiseCitySaloon",
  address: "Ybu, 3240 Altos, Paraguay",
  roadNote: "Camino de tierra, 4,5 km von Altos",
  coords: { lat: -25.263605, lng: -57.279071 },
};

export const copy = {
  de: {
    nav: {
      home: "Start",
      houses: "Ferienhäuser",
      location: "Lage",
      gallery: "Galerie",
      contact: "Kontakt",
    },
    hero: {
      kicker: "Paradise City · Altos",
      title: "Drei Häuser. Ein Abendrot.",
      lead: "Rustico, Sunset und Romantico. Jedes Haus für zwei Personen. Kurz bleiben oder länger wohnen. Deutsch und Englisch vor Ort.",
      cta: "Haus anfragen",
      ctaHouses: "Die Häuser ansehen",
    },
    regionTeaser: {
      kicker: "Die Gegend",
      title: "See, Palmen, und der Weg nach Ybu",
      lead: "Mehr zur Lage, zur Anfahrt und zu Paraguay steht auf der Lage-Seite.",
      cta: "Lage und Anfahrt",
    },
    pillars: [
      {
        title: "Grillen",
        text: "Gemeinsame Grillstelle am Saloon. Abendlicht, Seeblick, und Zeit ohne Zeitplan.",
      },
      {
        title: "Chillen",
        text: "Pool, Palmen, Dachterrasse. WLAN, Klimaanlage, und ein Garten, der zur Ruhe zwingt.",
      },
      {
        title: "Bierli killen",
        text: "Bar im Saloon, kühle Getränke, Hunde im Hof. So einfach halten wir es seit Jahren.",
      },
    ],
    housesIntro: {
      kicker: "Drei Häuser",
      title: "Jedes Haus hat seinen eigenen Charakter",
      lead: "Alle Häuser sind für zwei Personen eingerichtet. Sie sind komplett ausgestattet und für Selbstversorger gedacht. Ideal auch für längere Aufenthalte.",
    },
    houses: {
      rustico: {
        name: "Rustico",
        tag: "Erdhaus",
        line: "Kamin, Küche mit Seesicht, grosse Dachterrasse",
        summary:
          "Ein einzigartiges Erdhaus mit angenehmem Klima das ganze Jahr. Rustikales Wohnzimmer mit Kamin, Küche mit Seesicht, Badezimmer im old-school Stil und eine riesige Dachterrasse.",
        points: [
          "Erdhaus mit natürlichem Klima",
          "Kamin im Wohnzimmer",
          "Küche mit Seesicht",
          "Grosse Dachterrasse",
          "Für 2 Personen",
        ],
      },
      sunset: {
        name: "Sunset",
        tag: "Terrasse",
        line: "Riesige Terrasse und Sonnenuntergang über dem See",
        summary:
          "Individuell gestaltetes Ferienhaus mit riesiger Terrasse und eigener Dachterrasse. Traumhafte Seesicht, moderne Küche mit Bar und ein einzigartiges Badezimmer.",
        points: [
          "Grosse Terrasse plus Dachterrasse",
          "Sonnenuntergänge über dem See",
          "Moderne Küche mit Bar",
          "Klimaanlage und WLAN",
          "Für 2 Personen",
        ],
      },
      romantico: {
        name: "Romantico",
        tag: "Klein & fein",
        line: "Kleines Haus, extra Zimmer, ruhige Terrasse",
        summary:
          "Unser kleines Ferienhäuschen mit überdachter Aussenterrasse, Schlafzimmer, Wohnküche, Badezimmer und einem zusätzlichen Raum als Büro oder zweites Schlafzimmer.",
        points: [
          "Überdachte Aussenterrasse",
          "Wohnküche und Schlafzimmer",
          "Zusatzraum als Büro oder Bett",
          "Günstiger bei Langzeitmiete",
          "Für 2 Personen",
        ],
      },
    },
    saloon: {
      kicker: "Gemeinschaft",
      title: "Paradise City Saloon",
      text: "Grillstelle mit mehreren Sitzplätzen, Pool und Bar. Hier treffen sich Gäste zum Essen, Trinken und zu Poolpartys. Der Saloon gehört zum Alltag hier, nicht zum Extra.",
    },
    prices: {
      kicker: "Preise",
      title: "Klar, saisonunabhängig, direkt bei uns",
      lead: "Die Häuser sind komplett ausgestattet. Ein Mietauto ist empfehlenswert. Strom und Gas rechnen wir separat ab. Kaution ist eine Monatsmiete. Wir haben auch liebe Hunde.",
      included:
        "Im Preis: WLAN, Pool, Grillstelle, Wasser, Waschküche, Gartenarbeit, Müllentsorgung und Sonnenuntergänge.",
      extra: "Endreinigung 200.000 Gs. Flughafentransfer nach Absprache 350.000 Gs.",
      rows: [
        { label: "Woche, pro Haus, bis 2 Personen", value: "1.900.000 Gs" },
        { label: "Ab einem Monat, pro Haus", value: "4.800.000 Gs" },
        { label: "Ab zwei Monaten, pro Monat", value: "4.200.000 Gs" },
        { label: "Romantico, ab zwei Monaten, pro Monat", value: "3.500.000 Gs" },
      ],
    },
    location: {
      kicker: "Anfahrt",
      title: "Ybu, über dem See von San Bernardino",
      lead: "Paradise City liegt oberhalb von San Bernardino und Altos, mit Blick auf den Ypacaraí-See. Der Weg ist eine Erdstrasse, etwa 4,5 km von Altos.",
      facts: [
        { label: "Flughafen Asunción", value: "etwa 45 Minuten" },
        { label: "Altos und San Bernardino", value: "etwa 3 km" },
        { label: "Caacupé und Shopping del Sol", value: "wenige Minuten" },
        { label: "Adresse", value: "Ybu, 3240 Altos, Paraguay" },
      ],
      paraguay:
        "Paraguay ist ein Binnenstaat zwischen Brasilien, Argentinien und Bolivien. Der Name kommt aus dem Guaraní und bedeutet Wasser, das zum Wasser geht. Wechseln Sie Euros oder Dollar erst in Paraguay in Guaraníes.",
      activities:
        "Wir helfen bei Bootstouren, Reiten, Spanischunterricht, Ausflügen zu Iguazú und Itaipú. Oder Sie bleiben einfach an der Sonne.",
      mapCta: "Karte öffnen",
    },
    gallery: {
      kicker: "Bilder",
      title: "Stein, Thatch, See, Abendrot",
      lead: "Fotos vom Gelände, den drei Häusern und dem Saloon. Mehr aktuelle Bilder finden Sie auf unserer Facebook-Seite Paradise City Saloon.",
      filters: {
        all: "Alle",
        grounds: "Gelände",
        rustico: "Rustico",
        sunset: "Sunset",
        romantico: "Romantico",
        saloon: "Saloon",
      },
      facebook: "Mehr Fotos auf Facebook",
    },
    contact: {
      kicker: "Kontakt",
      title: "Schreiben Sie uns. Wir antworten auf Deutsch und Englisch.",
      lead: "Fragen zu Terminen, Langzeitmiete oder Transfer beantworten wir per E-Mail, Telefon oder WhatsApp.",
      form: {
        name: "Name",
        email: "E-Mail",
        house: "Haus",
        houseAny: "Noch offen",
        dates: "Reisezeit",
        message: "Nachricht",
        submit: "Anfrage per E-Mail senden",
        empty: "Bitte Name, E-Mail und Nachricht ausfüllen.",
        sent: "Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage.",
      },
      imprint: "Angaben",
    },
    footer: {
      note: "Ferienhäuser über dem See von San Bernardino. Seit 2011.",
      rights: "Paradise City · Altos, Paraguay",
    },
  },
  en: {
    nav: {
      home: "Home",
      houses: "Houses",
      location: "Location",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      kicker: "Paradise City · Altos",
      title: "Three houses. One sunset.",
      lead: "Rustico, Sunset, and Romantico. Each house is for two guests. Stay a few nights or a few months. We speak German and English.",
      cta: "Ask about a house",
      ctaHouses: "See the houses",
    },
    regionTeaser: {
      kicker: "The area",
      title: "Lake, palms, and the road to Ybu",
      lead: "Read more about the location, the drive, and Paraguay on the location page.",
      cta: "Location and directions",
    },
    pillars: [
      {
        title: "Grill",
        text: "A shared barbecue at the saloon. Evening light, a lake view, and no schedule.",
      },
      {
        title: "Chill",
        text: "Pool, palms, roof terrace. Wi-Fi, air conditioning, and a garden that slows you down.",
      },
      {
        title: "Bierli",
        text: "A bar at the saloon, cold drinks, dogs in the yard. We keep it that simple.",
      },
    ],
    housesIntro: {
      kicker: "Three houses",
      title: "Each house has its own character",
      lead: "Every house is set up for two guests. They are fully furnished for self-catering and work well for long stays.",
    },
    houses: {
      rustico: {
        name: "Rustico",
        tag: "Earth house",
        line: "Fireplace, lake-view kitchen, large roof terrace",
        summary:
          "A unique earth house with a steady climate all year. A rustic living room with a fireplace, a kitchen with a lake view, an old-school bathroom, and a huge roof terrace.",
        points: [
          "Earth house with natural climate",
          "Fireplace in the living room",
          "Kitchen with lake view",
          "Large roof terrace",
          "For 2 guests",
        ],
      },
      sunset: {
        name: "Sunset",
        tag: "Terrace",
        line: "Large terrace and sunsets over the lake",
        summary:
          "A custom holiday house with a large terrace and its own roof deck. Lake views, a modern kitchen with a bar, and a distinctive bathroom.",
        points: [
          "Large terrace plus roof deck",
          "Sunsets over the lake",
          "Modern kitchen with bar",
          "Air conditioning and Wi-Fi",
          "For 2 guests",
        ],
      },
      romantico: {
        name: "Romantico",
        tag: "Small and quiet",
        line: "Small house, extra room, quiet terrace",
        summary:
          "Our small cottage with a covered outdoor terrace, bedroom, eat-in kitchen, bathroom, and an extra room for an office or a second bed.",
        points: [
          "Covered outdoor terrace",
          "Eat-in kitchen and bedroom",
          "Extra room as office or bed",
          "Lower long-stay rate",
          "For 2 guests",
        ],
      },
    },
    saloon: {
      kicker: "Shared ground",
      title: "Paradise City Saloon",
      text: "A grill with several seating spots, a pool, and a bar. Guests meet here to eat, drink, and swim. The saloon is part of daily life, not an extra.",
    },
    prices: {
      kicker: "Rates",
      title: "Clear prices, booked with us directly",
      lead: "The houses are fully equipped. A rental car is useful. Power and gas are billed separately. The deposit is one month of rent. We also have friendly dogs.",
      included:
        "Included: Wi-Fi, pool, grill, water, laundry room, garden work, waste collection, and sunsets.",
      extra: "Final cleaning 200,000 Gs. Airport transfer by arrangement 350,000 Gs.",
      rows: [
        { label: "Week, per house, up to 2 guests", value: "1,900,000 Gs" },
        { label: "From one month, per house", value: "4,800,000 Gs" },
        { label: "From two months, per month", value: "4,200,000 Gs" },
        { label: "Romantico, from two months, per month", value: "3,500,000 Gs" },
      ],
    },
    location: {
      kicker: "How to get here",
      title: "Ybu, above the lake at San Bernardino",
      lead: "Paradise City sits above San Bernardino and Altos, looking over Lake Ypacaraí. The last stretch is a dirt road, about 4.5 km from Altos.",
      facts: [
        { label: "Asunción airport", value: "about 45 minutes" },
        { label: "Altos and San Bernardino", value: "about 3 km" },
        { label: "Caacupé and Shopping del Sol", value: "a short drive" },
        { label: "Address", value: "Ybu, 3240 Altos, Paraguay" },
      ],
      paraguay:
        "Paraguay is a landlocked country between Brazil, Argentina, and Bolivia. The name comes from Guaraní and means water that goes to water. Change euros or dollars to guaraníes after you arrive.",
      activities:
        "We can help with boat trips, riding, Spanish lessons, and visits to Iguazú and Itaipú. Or you stay in the sun.",
      mapCta: "Open map",
    },
    gallery: {
      kicker: "Photos",
      title: "Stone, thatch, lake, late light",
      lead: "Photos of the grounds, the three houses, and the saloon. More recent pictures live on our Facebook page Paradise City Saloon.",
      filters: {
        all: "All",
        grounds: "Grounds",
        rustico: "Rustico",
        sunset: "Sunset",
        romantico: "Romantico",
        saloon: "Saloon",
      },
      facebook: "More photos on Facebook",
    },
    contact: {
      kicker: "Contact",
      title: "Write to us. We answer in German and English.",
      lead: "Ask about dates, long stays, or transfers by email, phone, or WhatsApp.",
      form: {
        name: "Name",
        email: "Email",
        house: "House",
        houseAny: "Not sure yet",
        dates: "Travel dates",
        message: "Message",
        submit: "Send inquiry by email",
        empty: "Please fill in name, email, and a message.",
        sent: "Your email app will open with the inquiry ready to send.",
      },
      imprint: "Details",
    },
    footer: {
      note: "Holiday houses above the lake at San Bernardino. Since 2011.",
      rights: "Paradise City · Altos, Paraguay",
    },
  },
};
