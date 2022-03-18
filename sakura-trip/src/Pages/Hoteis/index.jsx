import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HotelService from "../../controllers/HotelService";
import './hotel.css'

export default function Index() {
  const [hoteis, setHoteis] = useState([]);

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

  const deleteHotel = (hotelId) => {
    HotelService.deleteHotel(hotelId)
      .then((response) => {
        getAllHoteis();
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
        <h1 className="container">Cadastro Hotel</h1>
      </header>
      <div className="container p-5">
        <Link to="/Hoteis-Create" className="btn btn-sakura mb-2">
          Criar Hotel
        </Link>
        <div className="table-responsive">
          <table className="table table-colors">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {hoteis.map((hotel) => (
                <tr className="text-white tr-hover" key={hotel.id}>
                  <td className="text-white">{hotel.id}</td>
                  <td className="text-white">{hotel.nome}</td>
                  <td className="d-flex">
                    <Link
                      to={`/Hoteis-Update/${hotel.id}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHotel(hotel.id)}
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
