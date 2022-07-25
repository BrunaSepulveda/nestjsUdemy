import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  find() {
    return this.repo.find();
  }

  findEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }
    return this.repo.remove(user);
  }
}
