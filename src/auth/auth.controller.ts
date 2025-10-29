import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';




@ApiTags('Auth') //  Agrupa tus endpoints en Swagger bajo la categoría "Auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto }) //  Swagger muestra los campos del body aquí
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto }) //  Swagger ahora muestra email y password
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}


