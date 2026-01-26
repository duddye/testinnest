import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jose from 'jose';

@Injectable()
export class JoseAuthGuard implements CanActivate {
    private jwks: jose.JWTVerifyGetKey;


    constructor() {
        // per ora ok hardcoded
        this.jwks = jose.createRemoteJWKSet(new URL('http://localhost:8080/realms/myrealm/protocol/openid-connect/certs'));
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new UnauthorizedException('Missing Authorization header');
        }
        const [type, token] = request.headers.authorization.split(' ');
        if (type !== 'Bearer') return false;
        if (!token) throw new UnauthorizedException('Missing token');

        try {
            const {payload} = await jose.jwtVerify(token, this.jwks, {
                issuer: 'http://localhost:8080/realms/myrealm',
               // audience: 'myclient',
            });
            // (request as any).user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Not valid token');
        }
    }
}