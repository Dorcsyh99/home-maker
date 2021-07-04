import { Connection } from 'mongoose';
import { HomeSchema } from './home.model';

export const homeProviders = [
    {
        provide: 'HOME_MODEL',
        useFactory: (connection: Connection) => connection.model('Home', HomeSchema),
        inject: ['DATABASE_CONNECTION',]
    },
];