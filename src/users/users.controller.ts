import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Session,
  // UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.intercptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// import { SerializerInterceptor } from '../interceptors/serialize.intercptor';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }
  // consigo ver o que foi guardado nos cookies confrome chave que eu escolhi
  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }
  // a session contem o contexto do nest em que retornar as inforações da requisição + as chaves e opções colocadas na sessão
  /*
  sessionCookies: [Cookies],
      sessionOptions: {},
      sessionKey: 'express:sess',
      session: [Getter/Setter],
      @Get('/quemSouEu')
      quemSouEu(@Session() session: any) {
        return this.usersService.findOne(session.userId);
      }
  */

  @Post('/signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('cookieUser');
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: { cookieUser?: number },
  ) {
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
    session.cookieUser = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() createUserDto: CreateUserDto,
    @Session() session: { cookieUser?: number },
  ) {
    const user = await this.authService.signin(
      createUserDto.email,
      createUserDto.password,
    );
    session.cookieUser = user.id;
    return user;
  }

  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findEmail(email);
  }

  @Get('quemsoueu')
  quemsoueu(@CurrentUser() user: Users) {
    return user;
  }

  // @UseInterceptors(new SerializerInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }
    return user;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(Number(id), dto);
  }
}
