import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { withIronSession } from "next-iron-session";
import Footer from "../components/footer"

const SignInPage = ({ user }) => {
    useEffect(() => {
        if (user) {
          router.push("/home")
        }
      }, []);
    const router = useRouter();
    const userInput = useRef();
    const passwordInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = userInput.current.value;
        const password = passwordInput.current.value;

        const response = await fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, password })
        });

        if (response.ok) {
            return router.push("/home");
        }
    }

    return (
        <main className="absolute w-full h-full">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-900  border-0">
                  <div className="rounded-t flex-auto px-4 lg:px-10 py-10">
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-50 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                          type="email"
                          className="px-3 py-3 bg-gray-700 placeholder-gray-400 text-gray-100 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Username"
                          style={{ transition: "all .15s ease" }}
                          ref={userInput}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-50 text-xs pt-5 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 bg-gray-700 placeholder-gray-400 text-gray-100 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          ref={passwordInput}
                        />
                      </div>

                      <div className="text-center mt-6 pt-5 ">
                        <button
                          className="bg-blue-400 text-blue-900 hover:bg-blue-500 active:bg-blue-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer absolute />
        </main>
    )
}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
      const user = req.session.get("user");
  
      if (!user) {
        // res.statusCode = 404;
        // res.end();
        return { props: {} };
      }
  
      return {
        props: { user }
      };
    },
    {
      cookieName: process.env.AUTH_COOKIE,
      cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
      },
      password: process.env.AUTH_SECRET
    }
  );

export default SignInPage;