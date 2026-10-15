import type { Metadata } from 'next';
import './globals.css';
import './climate-theme.css';
export const metadata:Metadata={title:'GençTek İklim Sözlüğü',description:'COP31 Antalya 2026 yolunda iklimin ortak dili: iklim terimleri, karşılıkları, tanımları, oyunları ve terim kartlarıyla.',openGraph:{title:'GençTek İklim Sözlüğü',description:'COP31 Antalya 2026 yolunda iklimin ortak dili.'}};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="tr"><body>{children}</body></html>;}
