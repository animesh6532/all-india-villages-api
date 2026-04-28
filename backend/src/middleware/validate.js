const ApiError = require("../utils/apiError");

function validate(schema, source = "body") {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: source !== "query"
    });

    if (error) {
      const details = error.details.map((item) => item.message);
      return next(new ApiError(400, "Validation failed", details));
    }

    req[source] = value;
    return next();
  };
}

module.exports = validate;
