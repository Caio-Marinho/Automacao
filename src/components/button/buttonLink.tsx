"use client";
import Link from "next/link";
import styles from "./button.module.css";
import { BotaoLinkProps } from "@/types";

export default function BotaoLink({ irPara, children }: BotaoLinkProps) {
  return (
    <Link href={irPara} className={styles.botaoLink}>
      {children}
    </Link>
  );
}
