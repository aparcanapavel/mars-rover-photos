# mars-rover-photos

Using https://api.nasa.gov/

UI for Photos from the mars rover. Inspired by LinkedIn and Instagram.

## The Stack

- Next.js v14
  - React 18 new hooks
- TailwindCSS
- Jest + React Testing Library

## Starting the Project

Get a NASA API key at [https://api.nasa.gov/](https://api.nasa.gov/) or use `DEMO_KEY`. The Demo key is heavily rate limited, so it's tecomended to create and use your own keys.

- Pull/Clone the project
- `nvm use && npm ci`
- create a `.env.local` file and add two keys:
  - `NASA_ROVER_DATA_ENDPOINT=https://api.nasa.gov/mars-photos/api/v1/`
  -  `NASA_API_KEY=<YOUR_KEY | DEMO_KEY>`
- `npm run build`
- `npm run start`
- check `localhost:3000`


## Deploying

- This project has been deployed to Netlify.


