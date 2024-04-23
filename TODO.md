# Todo

My toto list for Simple Task.

## Issues

- [ ] Prisma creates instances on each API call...

## Pages

- [ ] `Auth`
  - Authentification system
    - [x] Create a `hash method` for password
    - [ ] Create a `loader` for submit button

  - [ ] Other
    - [ ] Comprendre pourquoi les logs sont en double : mode strict ?

- [ ] `Dashboard`
  - [x] Fetch task list from database
  - [x] Get the `fetch user id` from `user session`

  - [ ] Save interface preferences into session or database
  - [ ] Move edition to right panel
  - [ ] Make left panel filter method

## Components

`Header`

- [ ] Faire un `hover glissant`
- [ ] Responsive header
- [ ] Github project link button

- [ ] Dark mode
  - [ ] Bouton toggle mode
  - [ ] Appliquer des variables globales à tous les styles existants

- [ ] Langage selector
  - [ ] Auto select with locale
  - [ ] Define langage preference into user account

## Global features

- [x] Session management
  - [x] Create an `user session` and store data
  - [x] Use a middleware to update the session on every request

- [x] Create a `notification` to give a feedback to user
  - [x] Create UI design
  - [x] Create system
  - [x] Move notification to `layout.tsx` file and give context to make it cross-pages

- [x] Create an `universal fetch method`
  - [x] Partage des types

- [ ] Create an `email validation` by sending a token
  - [ ] Use nodemailer
  - [ ] Use crypto
  - [ ] Use Ethereal

- [ ] Rédiger les `JSDoc` pour les fonctions / composants

- [x] Create a type file to share type across the app