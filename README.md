# My very first Next App

I've created this project to learns new modern technologies like:

- Tailwind CSS
- Typescript
- React.js
- Next.js
- Prisma
- BCrypt.js

## Configuration

`Next.js` project initialization:

```bash
pnpx create-next-app@latest
```

`Prisma ORM` install:

```bash
pnpx prisma init --datasource-provider mysql
pnpx prisma migrate dev --name init
pnpm install @prisma/client
```

`BCrypt.js` install:

```bash
pnpm install bcrypt
```

`Jose` install:

```bash
pnpm install jose
```

`eslint-plugin-tailwindcss` install:

```bash
pnpm i -D eslint-plugin-tailwindcss
```

## Todo

My toto list for Simple Task.

### Pages

- [ ] `Auth`
  - Authentification system
    - [x] Create a `hash method` for password
    - [ ] Create a `loader` for submit button

  - [ ] Other
    - [ ] Comprendre pourquoi les logs sont en double : mode strict ?

- [ ] `Dashboard`
  - [x] Fetch task list from database
  - [ ] Get the `fetch user id` from `user session`

### Components

`Header`

- [ ] Faire un `hover glissant`

### Global features

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

- [ ] Dark mode
  - [ ] Bouton toggle mode
  - [ ] Appliquer des variables globales à tous les styles existants

- [ ] Github project link button

- [ ] Langage selector
  - [ ] Auto select with locale
  - [ ] Define langage preference into user account

- [ ] Create a type file to share type across the app
