import { DataSource, Repository } from 'typeorm';
import { HojaOrmEntity } from '../databases/hoja.orm-entity';
import { HojaEntity } from '../../domain/entities/hoja.entity';
import { IHojaRepository } from '../../domain/repositories/hoja.repository,interface';
import { UpdateHojaDto } from '../../application/dto/hojas/update-hoja.dto';
export declare class HojasRepositoryImpl implements IHojaRepository {
    private readonly dataSource;
    private readonly hojaRepo;
    constructor(dataSource: DataSource, hojaRepo: Repository<HojaOrmEntity>);
    create(hoja: HojaEntity): Promise<HojaEntity>;
    findAll(): Promise<HojaEntity[]>;
    findByUuid(uuid: string): Promise<HojaEntity | null>;
    update(dto: UpdateHojaDto, uuid: string): Promise<HojaEntity | string>;
    delete(uuid: string): Promise<void>;
}
