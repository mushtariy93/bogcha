import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Invalid token format');
    }

    const payload = this.jwtService.decode(token);

    if (payload['role'] !== 'superadmin') {
      throw new ForbiddenException('Access denied: Not a creator');
    }

    request.user = payload;
    return true;
  }
}
