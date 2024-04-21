import styles from '@styles/Select-circle.module.css';

export default function SelectCircle({ active }: {
    active: boolean
}) {

    return <div className={`${styles.circleAround} flex items-center justify-center ` + (active ? styles.active : "")}>
        <div className={styles.circleSelected}></div>
    </div>
}