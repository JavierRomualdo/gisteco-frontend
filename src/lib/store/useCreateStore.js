import { useReducer } from 'react';

const useCreateStore = (reducer, initialStore) => {
    const [store, dispatch] = useReducer(reducer, initialStore);
    return { store, dispatch };
}

export default useCreateStore;