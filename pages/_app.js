import { Layout } from "@/components/core/Layout";
import { AppProvider } from "@/components/providers/AppProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
  
}
