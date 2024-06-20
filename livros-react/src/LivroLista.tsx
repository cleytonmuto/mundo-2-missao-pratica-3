import { useState, useEffect } from 'react';

import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

import './App.css';

const controleLivros = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
  const {livro, excluir} = props;
  const nomeEditora = controleEditora.getNomeEditora;

  return (
    <tr>
      <td>
        <p>{livro.titulo}</p>
        <button type='button' class='btn btn-danger btn-sm'
          onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora(livro.codEditora)}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setLivros(controleLivros.obterLivros());
    setCarregado(true);
  }, [carregado]);

  const excluir = (codigo) => {
    controleLivros.excluir(codigo);
    setCarregado(false);
  }

  return (
    <main class='container-fluid mx-3'>
      <h1 className='my-3'>Catálogo de Livros</h1>
      <table className='table table-hover'>
        <thead className='table-dark'>
          <tr>
            <th className='col-sm-2'>Título</th>
            <th className='col-sm-4'>Resumo</th>
            <th className='col-sm-2'>Editora</th>
            <th className='col-sm-2'>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
              getNomeEditora={controleEditora.getNomeEditora}
            />
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default LivroLista;