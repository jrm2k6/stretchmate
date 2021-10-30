import { Sequelize } from 'sequelize-typescript'
import { Step } from './step.model'
import { Stretch } from './stretch.model'
import { DatabaseHandler } from './types';

let db: DatabaseHandler | null = null

export default function connectToPostgres(): DatabaseHandler {
  if (!db) {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '', 10) || 5432,
      ssl: process.env.USE_SSL === 'true',
    })

    sequelize.addModels([Stretch, Step])

    db = {
      Sequelize: Sequelize,
      sequelize: sequelize,
    }
  }

  return db;
}