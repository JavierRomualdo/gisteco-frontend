import { useContext } from 'react';
import { StoreContext } from './Store';

const useStore = () => useContext(StoreContext);
export default useStore;