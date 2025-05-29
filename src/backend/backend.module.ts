import { Module } from '@nestjs/common'
import { BackendController } from './backend.controller'
import { UserModule } from '../users/user.module'

@Module({
  imports: [UserModule],
  controllers: [BackendController],
})
export class BackendModule {} 