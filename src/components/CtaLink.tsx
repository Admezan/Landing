"use client";
import type { ReactNode } from "react";
import { ctaTikla } from "@/lib/analytics";

/*
 * Dis giris/kayit baglantisi.
 *
 * Tum donusum baglantilari bu bilesenden gecer; boylece "kac kisi giris
 * baglantisina basti" sorusu tek bir olay adiyla ("cta_tikla") yanitlanir ve
 * konum ozelligi sayesinde hangi bolumun donusturdugu ayrisir.
 *
 * href disaridan gecirilir - adres cozumlemesi mevcut davranisla ayni kalsin diye.
 */
export default function CtaLink({
  href,
  eylem,
  konum,
  className,
  children,
}: {
  href: string;
  /** Baglantinin hedefi: uye girisi mi, yeni kayit mi */
  eylem: "giris" | "kayit";
  /** Sayfadaki yeri - ornek: "header", "hero", "bonus-bolumu" */
  konum: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => ctaTikla(eylem, konum)}
    >
      {children}
    </a>
  );
}
