# Paradise City

Holiday houses above Lake Ypacaraí in Altos / San Bernardino, Paraguay.

This site replaces the old Jimdo page with a modern rustic layout. The teal, cream, and stone colors come from the original site and from the houses themselves.

## What you can do here

- See the three houses: Rustico, Sunset, and Romantico
- Read current rates and what the stay includes
- Browse photos from the property
- See current Facebook photos (copied once a day, no Facebook cookies)
- Send an inquiry by email, phone, or WhatsApp
- Switch the text between German, English, and Spanish

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43421](http://127.0.0.1:43421).

The contact form opens your email app and writes to `paradise.city.py@gmail.com`. There is no booking backend.

## Daily Facebook photos

The site copies public photos from [Paradise City Saloon](https://www.facebook.com/ParadiseCitySaloon) and [Paradise-City Paraguay](https://www.facebook.com/paradisecity.paraguay). Visitors load the copies from this server. The browser does not open Facebook and does not set Facebook cookies.

Refresh the copies:

```bash
npm run feed:refresh
```

Chrome or Chromium must be installed. On the Hetzner host, run this once a day:

```bash
0 7 * * * curl -fsS http://127.0.0.1:43421/api/cron/facebook-feed
```

Set `CRON_SECRET` if you want the cron route to require `Authorization: Bearer <secret>`.

## Source

Copy and photos come from [paradise-city-paraguay.jimdofree.com](https://paradise-city-paraguay.jimdofree.com/) and from the public Facebook pages above.
