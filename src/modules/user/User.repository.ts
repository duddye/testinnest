import { Injectable } from '@nestjs/common';
import { User } from './User' 
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/common/base/base.repository';
import { UpdateUserCredDto } from './user-dto/UpdateUserCredDto';
import { Device } from '../device/Device';

@Injectable()
export class UserRepository extends BaseRepository<User> {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {
        super(userModel)
    }


    async getAll(): Promise<User[]> {
        return this.userModel.findAll({
            include: [{ 
                model: Device,
                through: { attributes: ['ownerStartDate', 'ownerEndDate'] } 
            }]
        });
    }

    async getById(id: number): Promise<User | null> {
        return this.userModel.findByPk(id, { include: [{ model: Device}]});
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({where: {email: email}});
    }

    async updateCred(id: number, credDto: UpdateUserCredDto): Promise<User | null> {
        const updateData: any = {};
        if (credDto.email) updateData.email = credDto.email.toLowerCase();
        if (credDto.password) updateData.password = credDto.password;

        return this.update(id, updateData);
    }
}

