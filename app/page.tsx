import Link from "next/link";
import styles from "./page.module.css";
import { fetchAllPolls } from "@/utils/helper";
import { ListPolls } from "@/components";

export default async function Home() {
  const pollsList = await fetchAllPolls();

  return (
    <main className={styles.main}>
      <div>
        <ListPolls pollsList={pollsList} />
      </div>
    </main>
  );
}
