import React from 'react'

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	NavLink
} from 'react-router-dom'
import './Header.css'

function Header() {
	return (
		<header>
			<nav>
				<label className="logo">
					<img src="./src/components/Header/sakura.png" alt="log.png" />
				</label>
				<input type="checkbox" id="check" />
				<label for="check" className="button">
					<span></span>
					<span></span>
					<span></span>
				</label>
				<ul class="menu">
					<li>
						<NavLink activeClassName="active" to="/">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="active" to="/Destinos">
							Destinos
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="active" to="/Hoteis">
							Hotéis
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="active" to="/Promocoes">
							Promoções
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}
export default Header
