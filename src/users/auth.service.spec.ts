import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Users } from './users.entity';
import { UsersService } from './users.service';

// describe('AuthService', () => {
//   let service: AuthService;
//   let fakeUsersService: Partial<UsersService>;

//   beforeEach(async () => {
//     fakeUsersService = {
//       findEmail: () => Promise.resolve(null),
//       create: (email: string, password: string) =>
//         Promise.resolve({ id: 1, email, password } as Users),
//     };

//     const module = await Test.createTestingModule({
//       providers: [
//         // precisamos colocar todas as dependencias e as classes que vamos testar
//         AuthService,
//         // AuthService, tem a dependencia do UsersService,
//         // então podemos criar um objeto com funções para ser o valor
//         // Logo qualquer clase dentro desse módulo que precisar
//         // da depencia de UsersService usará o objeto criado
//         { provide: UsersService, useValue: fakeUsersService },
//       ],
//     }).compile();
//     service = module.get(AuthService);
//   });

//   it('cria uma instancia do authservice', async () => {
//     expect(service).toBeDefined();
//   });

//   it('creates a new user with a salted and hashed password', async () => {
//     const user = await service.signup('bruna@gmail.com', 'blabla22');

//     expect(user.password).not.toEqual('blabla22');

//     const [salt, hash] = user.password.split('.');
//     expect(salt).toBeDefined();
//     expect(hash).toBeDefined();
//   });

//   it('throws an error if user signs up with emal thats is in use', async () => {
//     fakeUsersService.findEmail = () =>
//       Promise.resolve({ id: 1, email: 'asdf@sss.com', password: '1' } as Users);
//     await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
//       BadRequestException,
//     );
//   });
//   it('user not found', async () => {
//     await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
//       NotFoundException,
//     );
//   });

//   it('throws if an invalid password is provided', async () => {
//     fakeUsersService.findEmail = () =>
//       Promise.resolve({ id: 1, email: 'asdf@sss.com', password: '1' } as Users);
//     await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
//       BadRequestException,
//     );
//   });
// });
