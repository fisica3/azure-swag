const https = require('https');

const unplashApi = 'https://source.unsplash.com/1600x900?dream';
const quotes = [
  'Wherever you go, no matter what the weather, always bring your own sunshine.',
  'Tú\ eres asombroso.',
  'La felicidad es la unica cosa que se multiplica cuando la compartes.',
  'Siempre parece imposible hasta que esta hecho.',
  'Deja que tu energia positiva inspire confianza en los demas.',
  'Lo mejor esta por venir.',
  'You\'re capable of more than you can even dream.',
  'Mereces lo mejor.',
  'Keep going, you\'re doing well.',
  'Permanece positivo; permanece con esperanzas'
];

async function getImage() {
  return new Promise((resolve, reject) => {
    https.get(unplashApi, (response) => {
      // API returns a HTTP 302 code, we only want the final image URL
      resolve(response.headers.location);
    }).on('error', (error) => {
      reject(error.message);
    });
  });
}

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const image = await getImage();
  const text = quotes[Math.floor(Math.random() * quotes.length)];

  context.res = {
    body: {
      image,
      text
    }
  };
};
