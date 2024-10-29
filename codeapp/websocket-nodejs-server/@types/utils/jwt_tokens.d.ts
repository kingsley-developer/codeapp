import { Response, Request } from "express";
export default class JWT_Token {
    static createAccess(userId: number): string;
    static createRefresh(userId: number): string;
    static sendAccess(req: Request, res: Response, accessToken: string): void;
    static sendRefresh(res: Response, refreshToken: string): void;
}
//# sourceMappingURL=jwt_tokens.d.ts.map