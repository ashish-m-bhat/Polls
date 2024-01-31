import styles from "./page.module.css";
import { fetchAllPolls } from "@/utils/helper";
import { HomePage } from "@/components";

export default async function Home() {
  const pollsList = await fetchAllPolls();

  return (
    <main className={styles.main}>
      <div>
        <HomePage pollsList={pollsList} />
      </div>
    </main>
  );
}
