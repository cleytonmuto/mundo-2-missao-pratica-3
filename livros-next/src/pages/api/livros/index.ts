import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../../classes/controle/ControleLivros';

export const controleLivros = new ControleLivros();

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const livros = controleLivros.obterLivros();
      res.status(200).json(livros);
    }
    else if (req.method === 'POST') {
      const livro = req.body;
      controleLivros.incluir(livro);
      res.status(200).json({
        message: 'Livro adicionado com sucesso!'
      });
    }
    else {
      res.status(405).json({
        message: 'Método não permitido'
      });
    }
  }
  catch (e) {
    res.status(500).json({
      message: 'Erro interno no servidor'
    });
  }
};