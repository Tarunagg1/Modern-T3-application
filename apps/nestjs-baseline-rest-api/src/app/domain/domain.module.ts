import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { DBModule } from '@dev/database';
import { UserModule } from './users/user.module';

@Module({
    imports: [
        DBModule.forRoot({
            entities: [UserModule]
        }),
    ],
    providers: [],
    controllers: []
})


export class DomainModule { }