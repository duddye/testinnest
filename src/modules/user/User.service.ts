import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { User } from "./User";
import { UpdateUserCredDto } from "./user-dto/UpdateUserCredDto";
import { UserRepository } from "./User.repository";


@Injectable()
export class UserService extends BaseService<User> {
    constructor(protected readonly userRepository: UserRepository) {
        super(userRepository);
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new NotFoundException(`User with email '${email}' not found`);
        return user;
    }

    async updateUserCred(id: number, dto: UpdateUserCredDto): Promise<User | null> {
        const user = await this.userRepository.updateCred(id, dto);
        if (!user) throw new NotFoundException(`User with id '${id}' not found`);
        return user;
    }
}