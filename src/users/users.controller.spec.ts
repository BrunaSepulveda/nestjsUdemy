import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findEmail: (email: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password: 'asdf',
        } as Users);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as Users);
      },
      // remove: (id: number) => {
      //   return Promise.resolve({
      //     id,
      //     email: 'asdf@asdf.com',
      //     password: 'asdf',
      //   } as Users);
      // },
      // update: () => {},
    };
    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as Users);
      },
      // signup: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('shoud be defined', () => {
    expect(controller).toBeDefined();
  });

  it('retuns user found by email', async () => {
    const user = await controller.findByEmail('asdf@asdf.com');
    expect(user.email).toEqual('asdf@asdf.com');
  });
  it('findUsers thows an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('id')).rejects.toThrow(NotFoundException);
  });
  it('singin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'asdf@asdf', password: 'qwer1234' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
