import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ormConfig } from "./data-source";
import { AppController } from "./app.controller";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return ormConfig;
      }
    }),
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
