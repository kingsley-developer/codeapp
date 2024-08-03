import { Express } from "express";
import "dotenv/config";
import { Server } from "socket.io";
export default class API {
    static app: Express;
    static port: string | undefined;
    static server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
    static io: Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    static Server(): Promise<void>;
}
//# sourceMappingURL=_api.d.ts.map