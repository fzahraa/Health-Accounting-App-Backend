import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const reqToken = request.headers['x-request-api-token'];
    const envToken = this.configService.get('REQUEST_API_TOKEN');

    if (reqToken != envToken)
      throw new AppException(
        'Invalid Request Token',
        'Authentication Error',
        HttpStatus.UNAUTHORIZED,
        true,
      );

    return true;
  }
}
