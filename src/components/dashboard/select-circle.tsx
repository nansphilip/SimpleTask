import styles from '@styles/Select-circle.module.css';

export default function SelectCircle({ active }: {
    active: boolean
}) {

    let addActive = '';

    if (active) addActive = styles.active;

    return <div className={`${styles.circleAround} ${addActive} flex items-center justify-center`}>
        <div className={styles.circleSelected}></div>
    </div>
}