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

Entendendo o que foi feito até agora:
- até agora o que está guiando a aplicação são dos teste -> DRIVERS
- ele utiliza algunas portas como a 'ColecaoUsuario<I>' ou 'ProvedorCriptografia<I>'
- quem é responsável por chamar as implementações 'ColecaoUsuario<I>' & 'ProvedorCriptografia<I>' com seus respectivos adaptadorres é a aplicação, já os testes são responsáveis por disparar os casos de uso (drivers).
- o uuid que está dentro da aplicação é um peso que é toleravél por ser algo que fica fixo em um unico lugar, ou seja, não será espalhado na aplicação...
- a API será outro driver para disparar os fluxos..

=======================================

npm i express jsonwebtoken
npm i -D @types/express @types/jsonwebtoken axios @types/axios
