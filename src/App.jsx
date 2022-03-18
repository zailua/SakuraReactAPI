import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	NavLink
} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Destinos from "./Pages/Destino";
import DestinosCreate from "./Pages/Destino/Create";
import Hoteis from "./Pages/Hoteis";
import HoteisCreate from "./Pages/Hoteis/Create";
import Promocoes from "./Pages/Promo";
import PromocoesCreate from "./Pages/Promo/Create";



function App() {
	return (
		<div ClassName="App">
		<Router>
			<Header />
			<Footer />    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Destinos" element={<Destinos />} />
        <Route path="/Destinos-Create" element={<DestinosCreate />} />
        <Route path="/Destinos-Update/:id" element={<DestinosCreate />} />
      	<Route path="/Hoteis" element={<Hoteis />} />
        <Route path="/Hoteis-Create" element={<HoteisCreate />} />
        <Route path="/Hoteis-Update/:id" element={<HoteisCreate />} />
        <Route path="/Promocoes" element={<Promocoes />} />
        <Route path="/Promocoes-Create" element={<PromocoesCreate />} />
        <Route path="/Promocoes-Update/:id" element={<PromocoesCreate />} />
      </Routes>
    </Router>
			
				
		
		
		</div>
	)
}

export default App
