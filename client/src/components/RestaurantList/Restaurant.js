import styles from "./Restaurant.module.css";

export default function Restaurant({ name, cuisine, address }) {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
      <p className={styles.cuisine}>{cuisine}</p>
      <div className={styles.address}>
        <p>{address.street}</p>
        <p>{address.zipcode}</p>
      </div>
    </div>
  );
}
