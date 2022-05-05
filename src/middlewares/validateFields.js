import { validationResult } from "express-validator";

export default {
  validateFields: (req, res, next) => {
    /* const errors = validationResult(req);
    if (errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next(); */
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403);
      res.send({ errors: err.array() });
    }
  },
};
