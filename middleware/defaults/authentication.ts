import dotenv from "dotenv";
import passport from "passport";
import * as Sequelize from "express";
import passportJWT from "passport-jwt";
import errors from "../../errors";

interface JwtPayload {
  id: number;
}

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtAlgorithm = process.env.ALGORITHIM;
const jwtExpiresIn = "6h";

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm],
  jwtExpiresIn,
  passReqToCallback: true
};

passport.use(
  new passportJWT.Strategy(jwtOptions, async (req: any, jwtPayload: JwtPayload, next: any) => {
    try {
      if (jwtPayload) {
        next(null, jwtPayload);
      }
    } catch (error) {
      next(error);
    }
  })
);

const jwtErrorSwitch = (message: string) => {
  switch (message) {
    case "No auth token":
      console.log(errors.authentication.AUTH_NO_TOKEN);
      return errors.authentication.AUTH_NO_TOKEN;

    case "invalid token":
      return errors.authentication.AUTH_INVALID_TOKEN;

    default:
      return { message, status: 401, code: "N/A" };
  }
};

const requireJwt = (
  req: Sequelize.Request,
  res: Sequelize.Response,
  next: Sequelize.NextFunction
) => {
  if (req.headers["internal-auth"] === process.env.INTERNAL_SERVICE_AUTH) {
    return next();
  }

  passport.authenticate("jwt", { session: false }, (err: any, user: any, failuresOrInfo: any) => {
    if (failuresOrInfo) {
      const message = failuresOrInfo.message;
      const error = jwtErrorSwitch(message);

      return next(error);
    }

    if (!user) {
      res.locals.currentUser = null;
      return next(errors.authentication.AUTH_USER_NOT_FOUND);
    }

    if (user) {
      res.locals.currentUser = user;
      return next();
    }
  })(req, res, next);
};

const authenticationMiddlewares = {
  initializePassport: passport.initialize(),
  requireJwt
};

export default authenticationMiddlewares;
