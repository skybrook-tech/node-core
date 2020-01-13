import { Request, Response, NextFunction } from "express";
import createRecord from "./create-record";
import findOneRecord from "./find-one-record";
import findAllRecords from "./find-all-records";
import updateRecord from "./update-record";
import destroyRecord from "./destroy-record";

const createCrudMiddlware = (Model: any) => {
  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locals } = res;
      const { body } = req;

      const data = await createRecord({ Model, locals, body });

      res.locals.response = { data };

      next();
    } catch (error) {
      return next(error);
    }
  };

  const findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locals } = res;
      const { body, params } = req;

      const data = await findOneRecord({ Model, body, params, locals });

      res.locals.response = { data };

      next();
    } catch (error) {
      return next(error);
    }
  };

  const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locals } = res;
      const { body } = req;

      const data = await findAllRecords({ Model, locals, body });

      res.locals.response = { data };

      next();
    } catch (error) {
      return next(error);
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { locals } = res;
      const { body, params } = req;

      const data = await updateRecord({ Model, body, locals, params });

      res.locals.response = { data };

      next();
    } catch (error) {
      return next(error);
    }
  };

  const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await destroyRecord({ Model, params: req.params });

      res.locals.response = { success: true };

      next();
    } catch (error) {
      return next(error);
    }
  };

  return { create, findOne, findAll, update, destroy };
};

export default createCrudMiddlware;
