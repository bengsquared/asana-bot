import React, { useEffect } from "react"
import { useRouter } from "next/router";
import { withIronSession } from "next-iron-session";

// import Menu from '../components/Menu'
import WebhooksPage from "../scenes/webhooks"

import useBreakpoint from '../hooks/useBreakpoint'

const HomeScene = ({ user }) => {
  const router = useRouter();
  // const [isClosed, setClosed] = React.useState(true)
  // const isStatic = useBreakpoint('sm')
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, []);
  return user ? (
    // <Menu isStatic={isStatic} isClosed={isClosed} setClosed={setClosed}>
      <WebhooksPage />
    // </Menu>
  ) : <div />
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

export default HomeScene