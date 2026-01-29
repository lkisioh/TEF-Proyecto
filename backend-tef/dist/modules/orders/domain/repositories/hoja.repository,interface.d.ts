import { HojaEntity } from "../entities/hoja.entity";
export declare const HOJA_REPO: unique symbol;
export interface IHojaRepository {
    create(hoja: HojaEntity): Promise<HojaEntity>;
    findAll(): Promise<HojaEntity[]>;
    findByUuid(uuid: string): Promise<HojaEntity | null>;
    delete(uuid: string): Promise<void>;
}
