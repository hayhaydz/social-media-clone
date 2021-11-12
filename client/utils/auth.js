import { Component } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import webRoutes from "./webRoutes";
import { post } from './apiHandler';

let inMemory;

const login = async ({ access_token, access_token_expiry }, noRedirect) => {
  inMemory = {
    token: access_token,
    expiry: access_token_expiry,
  };

  if (!noRedirect) return Router.push(webRoutes.homepage);
};

const logout = async () => {
  inMemory = null;
  const url = "/api/logout";
  // call logout post request

  // logout of all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

const subMinutes = (dt, minutes) => {
  return new Date(dt.getTime() - minutes * 60000);
};

const withAuthSync = (WrappedComponent) => {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = await auth(ctx);
      if (!inMemory) {
        inMemory = token;
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, accessToken: inMemory };
    }

    constructor(props) {
      super(props);
      this.syncLogout = this.syncLogout.bind(this);
    }

    async componentDidMount() {
      this.interval = setInterval(async () => {
        if (inMemory) {
          if (
            subMinutes(new Date(inMemory.expiry), 1) <=
            new Date(inMemory.expiry)
          ) {
            inMemory = null;
            const token = await auth();
            inMemory = token;
          } else {
            const token = await auth();
            inMemory = token;
          }
        }
      }, 60000);

      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event) {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const auth = async (ctx) => {
    if (!inMemory) {
        // SSR cookie refresh authentication
        // lets try and refresh the access token
        // if refresh is unsuccessful because there is no refresh token
        // we redirect to the login page
        const headers = ctx && ctx.req ? {
            'Cookie': ctx.req.headers.cookie
        } : {}
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify({})
            });

            if(response.status === 200) {
                const { access_token, access_token_expiry } = await response.json();
                await login({ access_token, access_token_expiry }, true);
            } else {
                const { message } = await response.json();
                let error = new Error(message);
                error.response = response;
                throw error;
            }
        } catch (error) {
            console.log(error);
            if(ctx && ctx.req) {
                ctx.res.redirect('/login');
            }
            Router.push('/login');
        }
    }

  const jwt_token = inMemory;

  if (!jwt_token) {
    Router.push("/login");
  }

  return jwt_token;
};

const getToken = () => {
  return inMemory;
};

const getCurrentPath = (originalURL) => {
  if (typeof window === "object") {
    return window.location.host;
  } else {
    return originalURL;
  }
};

export { login, logout, withAuthSync, auth, getToken, getCurrentPath };
