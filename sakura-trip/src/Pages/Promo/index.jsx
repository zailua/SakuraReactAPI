import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PromocaoService from "../../controllers/PromocaoService";
import './promo.css'

export default function Index() {
  const [promocoes, setPromocoes] = useState([]);

  const getAllPromocoes = () => {
    PromocaoService.getAllPromocoes()
      .then((response) => {
        setPromocoes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPromocoes();
  }, []);

  const deletePromocao = (promocaoId) => {
    PromocaoService.deletePromocao(promocaoId)
      .then((response) => {
        getAllPromocoes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro Promoçoes </h1>
      </header>
      <div className="container p-5">
        <Link to="/Promocoes-Create" className="btn btn-sakura mb-2">
          Criar Promocao
        </Link>
        <div className="table-responsive">
          <table className="table table-colors">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Destino</th>
                <th>Hotel</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="table-colors">
              {promocoes.map((promocao) => (
                <tr className="text-white tr-hover" key={promocao.id}>
                  <td className="text-white">{promocao.id}</td>
                  <td className="text-white">{promocao.nome}</td>
                  <td className="text-white">{promocao.preco}</td>
                  <td>
                    {promocao.destino.nome} {promocao.destino.uf}
                  </td>
                  <td>{promocao.hotel.nome}</td>
                  <td className="d-flex">
                    <Link
                      to={`/Promocoes-Update/${promocao.id}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePromocao(promocao.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
