exports.handler = async (event) => {
  try {
    const method = event?.requestContext?.http?.method;
    const queryParam = event?.queryStringParameters?.myCustomParameter;
    const body = JSON.parse(event.body);

    handleBody(body);

    const res = {
      statusCode: 200,
      body: JSON.stringify(
        `Hello from Lambda! Method: ${method}, Params: ${queryParam}`
      ),
    };
    return res;
  } catch (err) {
    console.log(err);
    const res = {
      statusCode: 400,
      body: JSON.stringify("Something went wrong!"),
    };
    return res;
  }
};
