import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Menu } from '../../components/Menu';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Catálogo de Livros em Next JS</title>
        <meta name="description" content="Projeto em nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Menu></Menu>
      <main className={styles.main}>
        <h1 className={styles.maintitle}>Catálogo de Livros em Next JS</h1>
      </main>
    </div>
  )
}
