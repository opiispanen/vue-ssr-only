# vue-ssr-only

A proof of concept using Vue only as a server-side rendering framework. I was reading the Vue 3 server-side rendering [tutorial](https://vuejs.org/guide/scaling-up/ssr.html) and thought, what if I didn't do the hydration round? Code like it was 2004 with Vue.

## Installation

You'll need NodeJS and npm installed on your machine. Just like any npm project, run `npm install` first.

This app uses SQLite as a database, so run these commands after npm installation:

1. Create the database itself: `node ./db/createDB.js`
2. Create some mock data as an example (optional): `node ./db/createMockData.js`

## How it works

The program uses Vue components for rendering, but no JS is sent to the client. The user interface consists of classic HTML links and `<form>` `POST` messages. State is managed through `GET` and `POST` parameters.

It was surprising that the Vue `computed` value calculates one round on the server and how helpful it is with filtering database data.
