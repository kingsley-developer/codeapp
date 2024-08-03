import { decrypt_return } from "../../@types/codeapp-server";
export default class Utils {
    static encrypt_Pass(password: string): Promise<string>;
    static decrypt_Pass(hash: string, password: string): Promise<decrypt_return>;
}
//# sourceMappingURL=utils.d.ts.map