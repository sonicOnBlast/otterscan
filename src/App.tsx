import { QueryClientProvider } from "@tanstack/react-query";
import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Await,
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunction,
  Outlet,
  Route,
  RouterProvider,
  useLoaderData,
} from "react-router";
import ErrorFallback from "./components/ErrorFallback";
import ConnectionErrorPanel from "./ConnectionErrorPanel";
import Footer from "./Footer";
import Home from "./Home";
import Main from "./Main";
import { queryClient } from "./queryClient";
import { loader as searchLoader } from "./Search";
import { populateChainInfo } from "./useChainInfo";
import { createRuntime, RuntimeContext } from "./useRuntime";
import WarningHeader from "./WarningHeader";
import { OtterscanConfig } from "./useConfig";  // ensure this type is imported

const config: OtterscanConfig = {
  erigonURL: "https://virtual.sonic.rpc.tenderly.co/5a4b6992-4677-4310-87fd-c39a2bf0aa88",
  beaconAPI: null,
  experimentalFixedChainId: 220303012009,
  chainInfo: {
    name: "Tenderly Fork (Mainnet)",
    faucets: [],
    nativeCurrency: {
      name: "Sonic",
      symbol: "S",
      decimals: 18,
    },
  },
  sourcify: {
    sources: {
      "Sourcify Servers": {
        url: "https://repo.sourcify.dev",
        backendFormat: "RepositoryV1",
      },
    },
  },
};

const runtime = populateChainInfo(createRuntime(Promise.resolve(config)));

const loader: LoaderFunction = async () => ({
  config,
  rt: runtime,
});

const Layout: FC = () => {
  const data: any = useLoaderData();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Await resolve={data.rt}>
        {(runtime) => (
          <QueryClientProvider client={queryClient}>
            <RuntimeContext.Provider value={runtime}>
              <div className="flex h-screen flex-col">
                <WarningHeader />
                <Outlet />
                <Footer />
              </div>
            </RuntimeContext.Provider>
          </QueryClientProvider>
        )}
      </Await>
    </ErrorBoundary>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} loader={loader}>
      <Route index element={<Home />} />
      <Route path="/search" loader={searchLoader} />
      <Route path="*" element={<Main />} />
    </Route>,
  ),
);

const App = () => <RouterProvider router={router} />;

export default App;
