import { HojasService } from '../../application/services/hojas.services';
import { CreateHojaDto } from '../../application/dto/hojas/create-hoja.dto';
import { UpdateHojaDto } from '../../application/dto/hojas/update-hoja.dto';
export declare class HojasController {
    private readonly hojasService;
    constructor(hojasService: HojasService);
    create(createHojaDto: CreateHojaDto): Promise<import("../../domain/entities/hoja.entity").HojaEntity>;
    findAll(): Promise<import("../../domain/entities/hoja.entity").HojaEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/hoja.entity").HojaEntity>;
    update(uuid: string, updateHojaDto: UpdateHojaDto): string;
    remove(uuid: string): Promise<void>;
}
