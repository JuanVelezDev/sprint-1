import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //usa passport-jwt para validar el token
      //extrae el token del header Authorization: Bearer <token>
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'), //La valida en el .env
    });
  }

  async validate(payload: any) {
    // Este método se ejecuta automáticamente si el token es válido.
    // Lo que retorne se adjunta a req.user
    return { userId: payload.sub, email: payload.email };
  }
}
