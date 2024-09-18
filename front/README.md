## FRONTEND GRAPHQL TODO LIST

### Folders structure

```
src
├── infra               #-- infra layer (Configurações GraphQL)
├── presentation        #-- presentation layer (React)
│   ├── assets          #-- assets (imagens, fontes, etc)
│   ├── components      #-- components
│   ├── hooks           #-- hooks
│   ├── modals          #-- implementações de modais gerenciado pelo ModalsProvider
│   └── pages           #-- pages
├── providers           #-- providers (Context API)
└── utils
```

### Technologies used

- React
- Typescript
- [Vite](https://vitejs.dev/) -- for fast development
- [Apollo Client](https://www.apollographql.com/) -- for GraphQL client
- [Shadcn](https://ui.shadcn.com/) -- for UI components
- React-Toastify -- for toast messages
- [Tailwind CSS](https://tailwindcss.com/) -- for styling

### Features

- [x] List todos
- [x] Create todo
- [x] Update todo
- [x] Delete todo
- [x] Mark todo as done
- [x] Mark todo as undone
- [x] Filter todos by name
- [x] Markdown support on todo description
- [x] Toast messages
- [x] Modals management


