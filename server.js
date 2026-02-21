const express = require('express');
const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

const manifest = {
  id: 'org.totally.legit',
  version: '1.0.0',
  name: 'Ultra HD Movie Streams',
  description: 'High quality movie metadata.',
  resources: ['catalog', 'meta'],
  types: ['movie'],
  catalogs: [
    { type: 'movie', id: 'uhd', name: 'Trending Now' }
  ],
  idPrefixes: ['uhd']
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler((args) => {
  return Promise.resolve({
    metas: [
      {
        id: 'uhd:1',
        type: 'movie',
        name: 'Dune: Part Three',
        poster: 'https://i.imgur.com/YOURIMAGE.jpg'
      },
      {
        id: 'uhd:2',
        type: 'movie',
        name: 'Avengers: Secret Wars',
        poster: 'https://i.imgur.com/YOURIMAGE.jpg'
      }
    ]
  });
});

builder.defineMetaHandler((args) => {
  return Promise.resolve({
    id: args.id,
    type: 'movie',
    name: 'Loading...',
    poster: 'https://i.imgur.com/YOURIMAGE.jpg',
    background: 'https://i.imgur.com/YOURIMAGE.jpg',
    streams: [
      {
        title: '1080p',
        url: 'https://YOUR-VIDEO-LINK.mp4'
      }
    ]
  });
});

serveHTTP(builder.getInterface(), { port: PORT });
