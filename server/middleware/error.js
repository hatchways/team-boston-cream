const createError = require("http-errors");

exports.notFound = (req, res, next) => {
  next(createError(404));
};

exports.errorHandler = (err, req, res, next) => {
  //  set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};


  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // TO set the status code to 422
  
  if(err.message.includes("validation")){
    res.status(400);
  }
  // Theres no data in the database --> User don't have upcoming schedules
  else if(err.message.includes("not defined")){
    res.status(404);
  }
  else{
    res.status(statusCode);
  }
  
  res.json({ error: err.message });
};
