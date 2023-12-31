import WelcomeHeader from "./components/WelcomeHeader"
import WelcomePage from "./components/WelcomePage"
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={`${styles.welcomePage} y-axis-flex full-body`}>
      <WelcomeHeader />
      <WelcomePage />
    </main>
  )
}
