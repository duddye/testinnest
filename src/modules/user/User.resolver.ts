import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './User';
import { UserService } from './User.service';
import { CreateUserDto } from './user-dto/CreateUserDto';
import { UpdateUserDto } from './user-dto/UpdateUserDto';
import { BaseResolver } from 'src/common/base/base.resolver';
import { UpdateUserCredDto } from './user-dto/UpdateUserCredDto';



@Resolver(() => User)
export class UserResolver extends BaseResolver<User, CreateUserDto, UpdateUserDto>(User, CreateUserDto, UpdateUserDto) {
    constructor(protected readonly userService: UserService) {
        super(userService);
    }

    @Mutation(() => User, { name: 'updateUserCredentials' })
    async updateUserCred(
        @Args('id', { type: () => Number }) id: number,
        @Args('input', { type: () => UpdateUserCredDto }) userDto: UpdateUserCredDto
    ): Promise<User | null> {
        return this.userService.updateUserCred(id, userDto);
    }
}