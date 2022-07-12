import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassContructor {
  new (...args: any[]): Record<string, any>;
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Eu executo antes das funções do controller serem executadas

    return handler.handle().pipe(
      map((data: any) => {
        /*
        Eu executo antes da resposta ser enviada, por padrão a
        resposta do controller não é exposta, nada! Por isso o
        DTO deve informar o que deve ser exposto. O data é uma
        instância da entidade que está trabalhando ou a 
        resposta do controller.A excludeExtraneousValues: true
        garante que o que não está no DTO e nem com o decoretor
        de Expose não será retornado. Não basta apenas está no
        DTO. O que for retornado é a resposta
         */
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
