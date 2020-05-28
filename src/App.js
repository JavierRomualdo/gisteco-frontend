import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/login';
import Map from './pages/Mapa';
import { RouteWithAuth } from './lib/auth';
import { LoadingIcon } from './lib/icons';
import Alert, { TIPO_ALERTA } from './lib/alerts';

const Error = ({ error }) => <div className='p-2'><Alert tipo={TIPO_ALERTA.ERROR}>Error al cargar el sistema: {error.message}</Alert></div>

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<RouteWithAuth
						exact
						path="/"
						render={({ authenticated, error, loading }, routeProps) => {
							if (loading) return <div className="text-center"><LoadingIcon /></div>;
							if (error) return <Error error={error} />;
							if (!authenticated) return <Login {...routeProps} />
							return <Map />
						}}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;