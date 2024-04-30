# Todo

My toto list for Simple Task.

## Issues

> **Attention:** [ ] Prisma creates instances on each API call...

```bash
warn(prisma-client) This is the 10th instance of Prisma Client being started. Make sure this is intentional.
```

## Pages

- [ ] `Auth`
  - [ ] Security CSRF
    - [ ] Cookie sameSite (éviter les submits venant de domaines externes)
    - [ ] Token CSRF en session :
      - [ ] Créer un token à l’apparition du form
      - [ ] Vérifier le token en session au submit du form

  - [ ] Authentification system
    - [x] Create a `hash method` for password
    - [ ] Create a `loader` for submit button

  - [ ] Other
    - [ ] Comprendre pourquoi les logs sont en double : mode strict ?

- [ ] `Dashboard`
  - [x] Fetch task list from database
  - [x] Get the `fetch user id` from `user session`

  - [ ] Save interface preferences into session or database
  - [ ] Mobile view : side panel above task panel using blur

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

- [ ] Session management
  - [x] Create an `user session` and store data
  - [x] Use a middleware to update the session on every request
  - [ ] Middleware verification session for each page ?

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
