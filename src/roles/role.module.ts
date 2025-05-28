import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Role } from "src/roles/role.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class RoleModule {}