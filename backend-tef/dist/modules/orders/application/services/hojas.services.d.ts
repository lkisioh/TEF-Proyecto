import { HojaEntity } from '../../domain/entities/hoja.entity';
import { CreateHojaDto } from '../dto/hojas/create-hoja.dto';
import type { IHojaRepository } from '../../domain/repositories/hoja.repository,interface';
export declare class HojasService {
    private readonly hojaRepository;
    constructor(hojaRepository: IHojaRepository);
    findAll(): Promise<HojaEntity[]>;
    findOne(uuid: string): Promise<HojaEntity>;
    create(dto: CreateHojaDto): Promise<HojaEntity>;
    remove(uuid: string): Promise<void>;
}
