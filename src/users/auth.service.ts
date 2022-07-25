import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _srcypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_srcypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async passwordInHash(password: string, salt: string): Promise<string> {
    // gera uma hash de 32 caracteres
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hash.toString('hex');
  }

  async signup(email: string, password: string) {
    const userFound = await this.usersService.findEmail(email);
    if (userFound) {
      throw new BadRequestException('Usuário já cadastrado');
    }
    // gera uma chave de 16 caracteres
    const salt = randomBytes(8).toString('hex');
    const hash = await this.passwordInHash(password, salt);
    const result = salt + '.' + hash;
    const user = await this.usersService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const [salt, hash] = user.password.split('.');

    const hashPassword = await this.passwordInHash(password, salt);

    if (hash !== hashPassword) {
      throw new BadRequestException('Senha errada');
    } else {
      return user;
    }
  }
}
