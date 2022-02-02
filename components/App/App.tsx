import { text } from "../../content/en-us";
import { Auth } from "../Auth /Auth";
import Header from "../Header/Header";
import { Tracks } from "../Tracks/Tracks";

import styles from "./App.module.scss";

export const App = () => {
  return (
    <main className={styles.app}>
      <Header title={text.header.title} description={text.header.description} />
      <Auth>
        <Tracks />
      </Auth>
    </main>
  );
};
