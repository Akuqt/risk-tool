import { Server as WebSocketServer, Socket, ServerOptions } from "socket.io";
import { Server } from "http";

type EventCallback<T> = (
  socket: Socket,
  data?: T,
  io?: WebSocketServer,
) => void;

export interface Params<T> {
  ev: string;
  callback: EventCallback<T>;
}

/* istanbul ignore next */
export class EventStack {
  private evs: Params<any>[];

  constructor() {
    this.evs = [];
  }

  /**
   * @description Add a new event handler to the Socket Event stack.
   * @note Don't use arrow funtions if you wanna have access to the socket (this).
   * @param name Name of the event
   * @param callback Callback for the event
   */
  public push<U = any>(name: string, callback: EventCallback<U>) {
    if (name === "") throw new Error("The event needs a name.");
    else this.evs.push({ callback, ev: name });
  }

  /**
   * @returns The event stack.
   */
  public get events() {
    return this.evs;
  }
}

/* istanbul ignore next */
export default class WebSocket {
  private static io: WebSocketServer;
  constructor(httpServer: Server, opts: Partial<ServerOptions>) {
    WebSocket.io = new WebSocketServer(httpServer, opts);
  }

  /**
   * Inits the web socket connection.
   *
   * @param eventStack Stack of events to start with.
   */
  public init(eventStack?: EventStack) {
    WebSocket.io.on("connection", (socket) => {
      if (eventStack) {
        if (eventStack.events.length > 0)
          for (const ev of eventStack.events) {
            socket.on(ev.ev, (data) => ev.callback(socket, data, WebSocket.io));
          }
        else throw new Error("Event stack need at least one event");
      }
    });
  }

  /**
   * Emits a new event.
   * @param ev Event name
   * @param data Data to send
   */
  public static emit<U = any>(ev: string, data?: U) {
    WebSocket.io.emit(ev, data);
  }

  /**
   * Adds a event listener.
   * @param ev Event name.
   * @param callback Callback for the event.
   */
  public static on<U = any>(ev: string, callback: EventCallback<U>) {
    WebSocket.io.on(ev, callback);
  }
}
