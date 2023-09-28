import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ControleEditora } from '../../classes/controle/ControleEditora';
import Livro from '../../classes/modelo/Livro';
import { Menu } from '../../components/Menu';

import styles from '../styles/Home.module.css';

const LivroDados = () => {
  const controleEditora = new ControleEditora();
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);
  const navigate = useRouter().push;

  const baseURL = 'http://fullstackers.com.br:3000/api/livros';

  const incluirLivro = async (livro: Livro) => {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });
    return response.ok;
  };

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro = new Livro(0, codEditora, titulo, resumo, autores.split('\n'));
    const incluido = await incluirLivro(livro);
    if (incluido) {
      navigate('/LivroLista');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Adicionar Livro</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <div className='container justify-content-center'>
          <h3 className={styles.title}>Adicionar Livro</h3>
          <form onSubmit={incluir}>
            <div className='form-group'>
              <label htmlFor='titulo' className={styles.labelclass}>Título:</label>
              <input type='text' className='form-control' id='titulo'
                value={titulo} onChange={(event) => setTitulo(event.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='resumo' className={styles.labelclass}>Resumo:</label>
              <textarea id='resumo' className='form-control' value={resumo}
                onChange={(event) => setResumo(event.target.value)}
              ></textarea>
            </div>
            <div className='form-group'>
              <label htmlFor='editora' className={styles.labelclass}>Editora:</label>
              <select className='form-control' id='editora' value={codEditora}
                onChange={tratarCombo}>
                {opcoes.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.text}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='autores' className={styles.labelclass}>Autores:</label>
              <textarea className='form-control' id='autores' value={autores}
                onChange={(event) => setAutores(event.target.value)}
              ></textarea>
            </div>
            <button type='submit' className='btn btn-primary mt-2 btn-sm'>Salvar Dados</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LivroDados;