import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '12345',
  database: 'trainingdb',
  autoLoadModels: true, // Auto-carica tutti i modelli
  synchronize: true,
  logging: console.log,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: false,
  },
  
  // Pool di connessioni (ottimizzazione)
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};