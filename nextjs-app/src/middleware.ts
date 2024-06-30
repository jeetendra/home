import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log("Log from middleware:",request);
  console.log(">>",request.url);
  // return NextResponse.json({"name": "Jeetendra Singh"})
  // return NextResponse.next()

  //return NextResponse.redirect(new URL("/", request.url));
}
  
// export const config = {  
//   matcher: "/(.*)",
// };
