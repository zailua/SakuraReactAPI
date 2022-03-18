import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HotelService from "../../controllers/HotelService";

export default function Create() {
  const [nome, setNome] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const hotel = { nome };

    if (id) {
      HotelService.updateHotel(id, hotel).then((response) => {
        navigate("/Hoteis");
      });
    } else {
      HotelService.createHotel(hotel).then((response) => {
        navigate("/Hoteis");
      });
    }
  };

  useEffect(() => {
    function getHotelById() {
      if (id) {
        HotelService.getHotelById(id)
          .then((response) => {
            setNome(response.data.nomeHotel);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    getHotelById();
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
              Nome do Hotel
            </label>
            <input
              type="text"
              id="Nome"
              className="form-control"
              placeholder="Nome do Hotel"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => criarOuEditarDestino(e)}
          >
            Enviar
          </button>
          <Link
            to="/Hoteis"
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
