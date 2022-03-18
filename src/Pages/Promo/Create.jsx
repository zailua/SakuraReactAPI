import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DestinoService from "../../controllers/DestinoService";
import HotelService from "../../controllers/HotelService";
import PromocaoService from "../../controllers/PromocaoService";

export default function Create() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [destino, setDestino] = useState({ id_destino: "", nome: ""});
  const [hotel, setHotel] = useState({ id: "", nome: "" });
  const [destinos, setDestinos] = useState([]);
  const [hoteis, setHoteis] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAllHoteis = () => {
    HotelService.getAllHoteis()
      .then((response) => {
        setHoteis(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllHoteis();
  }, []);

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

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const promocao = { nome, preco, destino, hotel };
    console.log(promocao)
    if (id) {
      PromocaoService.updatePromocao(id, promocao).then((response) => {
        navigate("/Promocoes");
      });
    } else {
      PromocaoService.createPromocao(promocao).then((response) => {
        navigate("/Promocoes");
      });
    }
  };

  useEffect(() => {
    function getPromocaoById() {
      if (id) {
        PromocaoService.getPromocaoById(id)
          .then((response) => {
            setNome(response.data.nome);
            setPreco(response.data.preco);
            setDestino({
              id_destino: response.data.destino.id_destino,
              nome: response.data.destino.nome,
            });
            setHotel({
              id: response.data.hotel.id,
              nome: response.data.hotel.nome,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    getPromocaoById();
  }, [id]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
            <label htmlFor="Preco" className="form-label">
              Preço
            </label>
            <input
              type="text"
              id="Preco"
              className="form-control"
              placeholder="Preco"
              value={preco}
              onChange={(e) => setPreco(Number.parseFloat(e.target.value))}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="DestinoId_destino" className="form-label">
              Destino
            </label>
            <select
              id="DestinoId_destino"
              name="DestinoId_destino"
              className="form-select"
              onChange={(e) =>
                setDestino({ id_destino: Number.parseInt(e.target.value) })
              }
            >
              <option value="DEFAULT" >{id ? destino.nome : 'Escolha um Destino'}</option>
              {destinos.map((destino) => (
                <option key={destino.id_destino} value={destino.id_destino}>
                  {destino.nome} - {destino.uf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Hotel" className="form-label">
              Hotel
            </label>
            <select
              id="Hotel"
              name="Hotel"
              className="form-select"
              onChange={(e) =>
                setHotel({ id: Number.parseInt(e.target.value) })
              }
            >
              <option value="DEFAULT" >{id ? hotel.nome : 'Escolha um Hotel'}</option>
              {hoteis.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => criarOuEditarDestino(e)}
          >
            Enviar
          </button>
          <Link
            to="/Promocoes"
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
