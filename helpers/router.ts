import { Request, Response, Router, RequestHandler } from "express";
import Controller from "../controllers/controller";

export default class RouterBuilder {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  /**
   * Defines a GET route with the specified path and controller.
   *
   * @remarks
   * This method allows you to define a GET route with a single controller.
   * The controller's `invoke` method will be called when the route is accessed.
   *
   * @param path - The path for the route.
   * @param controller - The controller to handle the route.
   *
   * @returns - The RouterBuilder instance for method chaining.
   */
  public get(path: string, controller: Controller): any;

  /**
   * Defines a GET route with the specified path and handlers.
   *
   * This method allows you to define a GET route with one or more handlers.
   * The handlers can be middleware functions, controllers, or a combination of both.
   * Middleware functions will be executed before the controller's `invoke` method is called.
   * The controller's `invoke` method will be called when the route is accessed.
   *
   * @param path - The path for the route.
   * @param handler - One or more handlers to handle the route.
   *   - Middleware functions: Functions that have access to the request object, the response object, and the next middleware function in the application's request-response cycle.
   *   - Controllers: Classes that implement the `Controller` interface and have an `invoke` method to handle the route.
   *
   * @returns - The RouterBuilder instance for method chaining.
   */
  public get(path: string, ...handler: Array<RequestHandler>): any;

  /**
   * Defines a GET route with the specified path and handlers.
   *
   * This method allows you to define a GET route with one or more handlers.
   * The handlers can be middleware functions, controllers, or a combination of both.
   * Middleware functions will be executed before the controller's `invoke` method is called.
   * The controller's `invoke` method will be called when the route is accessed.
   *
   * @param path - The path for the route.
   * @param handlers - One or more handlers to handle the route.
   *   - Middleware functions: Functions that have access to the request object, the response object, and the next middleware function in the application's request-response cycle.
   *   - Controllers: Classes that implement the `Controller` interface and have an `invoke` method to handle the route.
   *
   * @returns - The RouterBuilder instance for method chaining.
   */
  public get(
    path: string,
    ...handlers: Array<RequestHandler | Controller>
  ): any {
    let resultHandler: Array<RequestHandler> = [];

    for (let handler of handlers) {
      if (handler instanceof Controller) {
        resultHandler.push(async (req: Request, res: Response) => {
          return await (<Controller>handler).invoke(req, res);
        });
      } else {
        resultHandler.push(handler);
      }
    }

    this.router.get(path, ...resultHandler);

    return this;
  }

  public post(
    path: string,
    ...handlers: Array<RequestHandler | Controller>
  ): any {
    let resultHandler: Array<RequestHandler> = [];

    for (let handler of handlers) {
      if (handler instanceof Controller) {
        resultHandler.push(async (req: Request, res: Response) => {
          return await (<Controller>handler).invoke(req, res);
        });
      } else {
        resultHandler.push(handler);
      }
    }

    this.router.post(path, ...resultHandler);

    return this;
  }

  public build(): Router {
    return this.router;
  }
}
