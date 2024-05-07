import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { EmailModule } from './modules/email/email.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UserSubscriptionModule } from './modules/user_subscription/user_subscription.module';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // StripeModule.forRoot({
    //   apiKey: process.env.STRIPE_SECRET_KEY,
    //   apiVersion: '2020-08-27',
    // }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    TodosModule,
    SubscriptionsModule,
    UserSubscriptionModule,
    StripeModule,
  ],
})
export class AppModule {}
