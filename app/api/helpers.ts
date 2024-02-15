export const responseError404 = (message = "Error") =>
  new Response(message, { status: 404 });

export const responseError500 = (message: string = "Internal Server Error") =>
  new Response(message, { status: 500 });

export const responseSuccess = (payload: string) =>
  new Response(payload, { status: 200 });
