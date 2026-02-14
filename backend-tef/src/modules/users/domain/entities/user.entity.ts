export class UserEntity {
  public readonly id: number;
  public readonly uuid: string;
  public name: string;
  public surname: string;
  public email: string;
  public address: string;
  public password: string;
  public phone: string;
  public role: string = 'user';
}
