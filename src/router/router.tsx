import {
  RouterProvider,
  Router,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

import HomePage from "../pages/HomePage";
import AddRecipePage from "../pages/AddRecipePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignUpPage";
import RootLayout from "../components/RootLayout";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});

const addRecipeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-recipe",
  component: AddRecipePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signupRoute,
  addRecipeRoute,
]);

export const router = new Router({ routeTree });

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;