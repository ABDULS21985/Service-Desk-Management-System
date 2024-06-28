import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: LoginDto, examples: {
    a: {
      summary: 'Example login payload',
      description: 'A standard example of a login payload',
      value: {
        username: 'john_doe',
        password: 'strongPassword123',
      },
    },
  }})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: RegisterDto, examples: {
    a: {
      summary: 'Example register payload',
      description: 'A standard example of a register payload',
      value: {
        username: 'john_doe',
        password: 'strongPassword123',
        email: 'john_doe@example.com',
        role: 'user',
      },
    },
  }})
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
