import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
//import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink } from 'apollo-boost'
import { onError } from 'apollo-link-error';
import Swal from 'sweetalert2';

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

// const link = new HttpLink({uri:'http://localhost:3030/graphql'});
const linkWithUpload = createUploadLink({
	uri: 'http://gisteco.epsgrau.pe:3030/graphql',
	credentials: 'include'
});

const errorLink = onError(({ networkError }) => {
	if (networkError && networkError.statusCode === 401) {
		Swal.fire('!Acción no autorizada!', networkError.bodyText, 'info')
			.then(() => {
				window.location.reload();
			});
	}
});


const link = new ApolloLink.from([errorLink, linkWithUpload])

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
	cache,
	link
});

export default client;