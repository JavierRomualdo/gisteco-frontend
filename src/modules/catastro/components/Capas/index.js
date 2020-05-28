import React from 'react';
import { LoadingIcon } from '../../../../lib/icons';
import Capas from './subcomponents/Capas';
import { ARBOL_CAPAS_USUARIO } from './graphql/queries';
import { Query } from 'react-apollo';

const Loading = () =>
	<div className='text-center my-2'>
		<LoadingIcon />
	</div>;

const Error = ({ message }) =>
	<div className="alert alert-danger">
		{message}
	</div>;

export default () => {
	return (
		<Query
			query={ARBOL_CAPAS_USUARIO}
			variables={{ todos: false }}
		>
			{({ data, loading, error }) => {
				if (loading) return <Loading />;
				if (error) return <Error />
				return (
					<Capas capas={data.sistema.arbolCapas} />
				);
			}}
		</Query>
	);
}