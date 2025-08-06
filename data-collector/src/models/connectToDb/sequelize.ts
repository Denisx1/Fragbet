import { Sequelize } from "sequelize";

const initSequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST, // Замените на ваш хост
  port: Number(process.env.DB_PORT), // Порт PostgreSQL по умолчанию
  username: process.env.DB_USER, // Замените на ваше имя пользователя
  password: process.env.DB_PASSWORD, // Замените на ваш пароль
  database: process.env.DB_NAME, // Замените на имя вашей базы данных
  logging: false, // Отключить логирование SQL-запросов (опционально)
});

export default initSequelize;
