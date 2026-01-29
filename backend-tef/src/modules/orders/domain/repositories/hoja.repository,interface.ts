import { HojaEntity } from "../entities/hoja.entity";
export const HOJA_REPO = Symbol('HOJA_REPO');

export interface IHojaRepository {
  create(hoja: HojaEntity): Promise<HojaEntity>;
  findAll(): Promise<HojaEntity[]>;
  findByUuid(uuid: string): Promise<HojaEntity | null>;
  delete(uuid: string): Promise<void>;
}
