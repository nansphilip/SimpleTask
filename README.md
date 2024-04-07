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

## Todo

Header

- [ ] Faire un `hover glissant`

Features

- [ ] Create a `notification` to give a feedback to user
  - [x] Create UI design
  - [x] Create system
  - [ ] Move notification to `layout.tsx` file and give context to make it cross-pages

- [x] Create a `hash method` for password
- [ ] Create a `loader` for submit button

- [ ] Create an `user session` and store data
  - [x] Use a middleware to update the session on every request
  - [ ] Move to database session ?

- [ ] Create an `universal fetch method`

- [ ] `Dashboard`
  - [x] Fetch task list from database
  - [ ] Get the `fetch user id` from `user session`

- [ ] Create an `email validation` by sending a token
  - [ ] Use nodemailer
  - [ ] Use crypto
  - [ ] Use Ethereal

- [ ] Rédiger les `JSDoc` pour les fonctions / composants

- [ ] Dark mode
  - [ ] Bouton toggle mode
  - [ ] Appliquer des variables globales à tous les styles existants

- [ ] Github project link
- [ ] Create a type file to share type across the app
