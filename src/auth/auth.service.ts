import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterDto): Promise<{user: User; token: string}> {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) throw new ConflictException('Email ya registrado');
    
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({...dto, password: hashed});
        const token = await this.jwtService.sign({sub: user.id, email: user.email}) //jwtService.sign Crea el JWT Token con payload 

        return {user, token}; //se retorna para ser guardado en el front
    }

    async login (dto: LoginDto): Promise<{user: User; token: string}> {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Credenciales invalidas');
        
        const isMath = await  bcrypt.compare(dto.password, user.password);
        if (!isMath) throw new UnauthorizedException('Credenciales invalidas');

        const token = await this.jwtService.sign({sub: user.id, email: user.email});

        return { user, token };
    }
}
