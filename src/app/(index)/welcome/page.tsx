import { Metadata } from "next";
import WelcomeHeader from "../components/WelcomeHeader"
import WelcomePage from "../components/WelcomePage"
import styles from "./page.module.css";

export const metadata : Metadata = {
  title: "Welcome",
  description: "Welcome page of blog app"
}

export default function Home() {
  return (
    <main className={`${styles.welcomePage} y-axis-flex full-body`}>
      <WelcomeHeader />
      <WelcomePage />
    </main>
  )
}
