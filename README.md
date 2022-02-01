# Turborepo Node Kafka Graphql React

## Tools used

-   Global
    -   Node.js 16
    -   yarn
    -   docker-compose
-   API
    -   TypeGraphQL
    -   Fastify
    -   Postgres
-   Frontend
    -   react
    -   vite

## Workspaces

Workspaces can exist in these folders:

```text
apps
services
packages
```

### Predefined workspaces

In this starter kit these workspaces are defined already:

```text
apps
  - api
  - ui
services
  - message_broker
  - postgres
packages
  - config
  - tsconfig
  - ui-components
```

## Usage

-   Install dependencies using `yarn install`
-   Start the stack using `yarn dev`
-   Browse [http://localhost:3000](http://localhost:3000)

![Screenshot](assets/2022-01-12-13-49-33.png)
`yarn dev` output

![Screenshot](assets/2022-01-12-15-02-19.png)
`http://localhost:3000` output
