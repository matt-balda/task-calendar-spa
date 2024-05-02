# Desafio Diel Energia
> Desafio Construir uma SPA de calendário de tarefas do dia utilizando uma
stack que você sinta confortável, pensando sempre em
performance, segurança e escalabilidade.

### Funcionalidades
- [x] 1. Cadastro de uma nova tarefa 
- [x] 2. Edição de tarefa 
- [x] 3. Remoção de tarefa
- [x] 4. Permitir que o usuário escolha a forma de visualização das tarefas por dia,
semana ou mês
- [x] 5. Campo de busca de tarefas pelo titulo

OBS: Funcionalidade (**4**) está 4/5 concluída, por falta de tempo, faltou ajustar o state que manipula as tasks para incluir as filtradas. Filtros são (complete, incomplete, all), (asc, desc), type date(day, week, month)


## Como executar
1. Certifique-se de ter o **Node.js** instalado em sua máquina
2. Clone este repositório em sua máquina local
3. Navegue até o diretório do projeto
4. Para o backend (Nest.js), execute os seguintes comandos
  ```
    cd backend
    npm install
    npm run start
  ```
5. Acessa API do backend pelo Swagger UI: `http://localhost:3008/api#/`
6. Para o frontend (React.js), abra uma nova janela do terminal e execute os seguintes comandos
  ```
    cd frontend
    npm install
    npm run dev
  ```
7. Acessa o frontend, numeração de porta varia`http://localhost:5173/`

**OBS:** se houver problema na migração do PRISMA para o sqlite
1. Atualizar as migrations, caso de alteração na model `npx prisma dev --name nome_da_migracao`
2. Fazer a migração para o banco de dados `npx prisma migrate dev`

### Colaboradores
- Mateus Balda Mota - https://github.com/matt-balda
