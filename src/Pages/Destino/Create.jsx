import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DestinoService from "../../controllers/DestinoService";

export default function Create() {
  const [nome, setNome] = useState("");
  const [uf, setUf] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const destino = { nome, uf };

    if (id) {
        DestinoService.updateDestino(id, destino)
        .then((response) => {
            navigate("/Destinos")
        })

    } else {
        DestinoService.createDestino(destino)
        .then((response) => {
            navigate("/Destinos")
        })
    }
  }

  useEffect(() => {
      function getDestinoById() {
        if (id) {
            DestinoService.getDestinoById(id)
            .then((response) => {
                setNome(response.data.nome);
                setUf(response.data.uf);
            })
            .catch((error) => {
                console.log(error);
            })
        }
      }
      getDestinoById()
  }, [id]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="mb-3">
            <label htmlFor="Nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              id="Nome"
              className="form-control"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Uf" className="form-label">
              Uf
            </label>
            <input
              type="text"
              id="Uf"
              className="form-control"
              placeholder="UF"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={(e) => criarOuEditarDestino(e)}>
            Enviar
          </button>
          <Link
            to="/Destinos"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </Link>
        </fieldset>
      </form>
    </div>
  );
}
