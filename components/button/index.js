import Link from "next/link";
import styles from "./Button.module.css";

const sizeModifier = 10;

export default function Button({ href, children, size }) {
  return (
    <Link href={href} passHref>
      <button
        style={{
          paddingTop: size * (sizeModifier / 2),
          paddingBottom: size * (sizeModifier / 2),
          paddingLeft: size * sizeModifier,
          paddingRight: size * sizeModifier,
          fontSize: 1 + size / 30 + "em",
        }}
        className={styles.button}
      >
        {children}
      </button>
    </Link>
  );
}
