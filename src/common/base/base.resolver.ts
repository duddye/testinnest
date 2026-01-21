import { Type } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BaseService } from './base.service';

/*

meglio non usare classRe.name perche' in fase di minificazione il nome della classe puo' cambiare
e quindi le query/mutation generate dinamicamente non corrisponderebbero piu' alla realta', meglio options.
*/ 
export function BaseResolver<T, CreateDto, UpdateDto>(classRef: Type<T>, createDto: Type<CreateDto>, updateDto: Type<UpdateDto>): any {
    @Resolver({ isAbstract: true })
    abstract class BaseResolverHost {
        constructor(protected readonly baseService: BaseService<any>) {}

        @Query(() => [classRef], { name: `getAll${classRef.name}s` }) 
        async getAll(): Promise<T[]> {
            return this.baseService.getAll();
        }

        @Query(() => classRef, { name: `get${classRef.name}ById` })
        async getById(@Args('id', { type: () => Int }) id: number): Promise<T> {
            return this.baseService.getById(id);
        }

        @Query(() => classRef, { name: `get${classRef.name}ByField` })
        async getByField(@Args('fieldname', { type: () => String }) fieldname: string, @Args('fieldvalue', { type: () => String }) fieldvalue: string): Promise<T | T[] | null> {
            return this.baseService.getByField(fieldname, fieldvalue);
        }

        @Mutation(() => classRef, { name: `create${classRef.name}` })
        async create(@Args('input', { type: () => createDto }) createDto: CreateDto): Promise<T> {
            return this.baseService.create(createDto);
        }

        @Mutation(() => classRef, { name: `update${classRef.name}` })
        async update(@Args('id', { type: () => Int }) id: number, @Args('input', { type: () => updateDto }) updateDto: UpdateDto): Promise<T> {
            return this.baseService.updateById(id, updateDto);
        }

        @Mutation(() => Boolean, { name: `delete${classRef.name}` })
        async remove(@Args('id', { type: () => Int }) id: number, @Args('force', { type: () => Boolean, defaultValue: false }) force: boolean): Promise<boolean> {
            return this.baseService.deleteById(id, force);
        }

        @Mutation(() => classRef, { name: `restore${classRef.name}` })
        async restore(@Args('id', { type: () => Int }) id: number): Promise<T> {
            return this.baseService.restore(id);
        }
    }
    return BaseResolverHost;
}