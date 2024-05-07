import { Inter } from "next/font/google";
import { Page } from "@/components/core/Page";
import RecipeForm from "@/components/core/RecipeForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Page>
      <RecipeForm />
    </Page>
  );
}
