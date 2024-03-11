import styles from "./App.module.css";

import { Weather } from "./components/Weather.component";

function App() {
  return (
    <section className={styles.appContainer}>
      <Weather />
    </section>
  );
}

export default App;
