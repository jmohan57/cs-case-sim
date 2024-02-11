import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();
  const existingUnboxerId = request.cookies.get("unboxerId");
  let newUnboxerId: string = crypto.randomUUID();

  // Check if the unboxerId is a valid UUID
  // If it is, use it. Otherwise, use the newly generated UUID
  if (existingUnboxerId) {
    const isValidUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        existingUnboxerId.value,
      );
    if (isValidUUID) newUnboxerId = existingUnboxerId.value;
  }

  // Refresh the unboxerId cookie
  response.cookies.set(
    "unboxerId",
    // If the unboxerId is valid, use it. Otherwise, generate a new one
    newUnboxerId,
    {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      httpOnly: true,
    },
  );

  return response;
};

export const config = {
  matcher: ["/", "/unboxed", "/inventory"],
};
