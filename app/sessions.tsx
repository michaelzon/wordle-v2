// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
    mysteryWord: string;
};

type SessionFlashData = {
    error: string;
};

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            // a Cookie from `createCookie` or the CookieOptions to create one
            cookie: {
                name: "__session",

                // all of these are optional
                // door dit uit te zetten pakt ie niet een nieuw mysteryword, maar zorgt er ook voor dat het hetzelfde blijft als je refreshed
                // domain: "remix.run",
                // Expires can also be set (although maxAge overrides it when used in combination).
                // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
                //
                // expires: new Date(Date.now() + 60_000),
                httpOnly: true,
                sameSite: "lax", // klopt dit
                path: "/",
                secrets: ["s3cret1"],
                secure: true,
            },
        }
    );

export { getSession, commitSession, destroySession };
