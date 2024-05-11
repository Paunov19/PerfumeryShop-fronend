import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { handleUnauthorized } from "./services/HttpService";

const MAX_RETRIES = 6;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (failureCount > MAX_RETRIES) {
                    return false;
                }

                if (
                    isAxiosError(error) &&
                    HTTP_STATUS_TO_NOT_RETRY.includes(
                        error.response?.status ?? 0
                    )
                ) {
                    console.log(
                        `Aborting retry due to ${error.response?.status} status`
                    );

                    if (error.response?.status === 401) {
                        handleUnauthorized();
                    }

                    return false;
                }

                return true;
            }
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
