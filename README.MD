npm init -y
npm i -D typescript
npx tsc --init
npm i -D jest ts-jest @types/jest @types/node
npm i -D ts-node-dev
npx ts-jest config:init
npm run build
npm i bcrypt
npm i -D @types/bcrypt
npm i knex pg
npm i dotenv
npm run migrate:make criar_tabela_usuario
npm run migrate:down
npm run migrate:up
npm i uuid
npm i -D @types/uuid