## BACKEND GRAPHQL API

### Folders structure
````
 src
  ├── domain
  │   ├── entities        #-- entidades
  │   ├── repositories    #-- repositories interfaces
  │   └── useCases        #-- use case implementations
  ├── infra                   #-- infra layer (separado por modelos de dados)
  │   └── fake                #-- implementações fake
  │       └── repositories    #-- implementações de repositories
  ├── resolvers               #-- resolvers
  └── schema.gql
````

O projeto backend foi desenvolvido utilizando a arquitetura Clean Architecture, que é uma arquitetura de software que visa separar as responsabilidades do projeto em camadas, de forma que cada camada tenha uma responsabilidade única e bem definida.

A implementação contem também testes unitários, que foram desenvolvidos utilizando a biblioteca [Jest](https://jestjs.io/).

### Tecnologias utilizadas
- Node.js
- Typescript
- [TypeGraphQl](https://typegraphql.com/) -- para criação do schema de forma dinâmica
- [Apollo Server](https://www.apollographql.com/) -- para criação do servidor GraphQL


