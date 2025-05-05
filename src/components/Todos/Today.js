import styles from "./Today.module.css";
import ToggleTheme from "../UI/ToggleTheme";

function Today() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = new Date().toLocaleDateString('en-UK', options);

    return (
        <div className={styles.todayContainer}>
            <ToggleTheme />
            <h2 className={styles.todayDate}>Today</h2>
            <p className={styles.todayDate}>{formatted}</p>
        </div>
    );
}

export default Today;