## backend_dmp

### Requirement:
* Node JS version 20.14.0
* NPM version 10.7.0

### How to run this Server?
1. Setting your .env copy/rename it from .env.example (Setting DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, JWT_SECRET )
2. Run <code>npm install</code>, this would install dependencies and devDependencies (nodemon, and sequelize-cli)
3. Run <code>npx sequelize db:migrate</code> (if your .env correct, this command would create User's Table on Database)
4. Run <code>npx sequelize db:seed:all</code> (if your .env correct, this command would create User's Seeder on Database)
5. Run <code>npm run start</code>. Your server will be active on port 3000 (same like .env PORT=3000)

### What Api this server serve
| Route              | Method | Body               | Headers | Query                           | Param |
| -------------      |:------:| :-----------------:|---------|-------------------------------- |-------|
| /api/1/auth/login  | POST   | username, password |         |                                 |       |
| /api/1/auth/signup | POST   | username, password |         |                                 |       |
| /api/1/job         | GET    |                    | token   |description, location, full_time |       |
| /api/1/job/:id     | GET    |                    | token   |                                 | id    |
