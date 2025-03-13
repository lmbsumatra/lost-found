const validate = async (data, schema) => {
  const errors = [];

  for (const field in schema) {
    const validateFunc = schema[field]; 

    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push({ field, message: `Forgot to pass ${field}` });
    } else {
      const error = await validateFunc(data[field]); 
      if (error) errors.push({ field, message: error });
    }
  }

  return errors; 
};

module.exports = validate;
