import { withIronSession } from "next-iron-session"

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { user, password } = req.body;

      if (user === process.env.AUTH_USER && password === process.env.AUTH_PASSWD) {
        req.session.set("user", { user });
        await req.session.save();
        return res.status(201).send("");
      }

      return res.status(403).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: process.env.AUTH_COOKIE,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.AUTH_SECRET
  }
);