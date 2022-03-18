import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DestinoService from "../../controllers/DestinoService";
import './dest.css'

export default function Index() {
  const [destinos, setDestinos] = useState([]);

  const getAllDestinos = () => {
    DestinoService.getAllDestinos()
      .then((response) => {
        setDestinos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllDestinos();
  }, []);

  const deleteDestino = (destinoId) => {
    DestinoService.deleteDestino(destinoId)
      .then((response) => {
        getAllDestinos();
      })
      .catch((error) => {
        console.log(error);
        const { data } = error.response;
        if (data.status === 500) {
          alert("Deu ruim na API");
        }
      });
  };

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro Destino</h1>
      </header>
      <div className="container p-5">
        <Link to="/Destinos-Create" className="btn btn-sakura mb-2">
          Criar Destino
        </Link>
        <div className="table-responsive">
          <table className="table table-hover table-sm table-colors">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>UF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {destinos.map((destino) => (
                <tr className="text-white tr-hover" key={destino.id_destino}>
                  <td className="text-white">{destino.id_destino}</td>
                  <td className="text-white">{destino.nome}</td>
                  <td className="text-white">{destino.uf}</td>
                  <td className="d-flex">
                    <Link
                      to={`/Destinos-Update/${destino.id_destino}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteDestino(destino.id_destino)}
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
