import React, { createContext } from 'react';

export const StoreContext = createContext(null);
const Store = ({ store, children }) => <StoreContext.Provider value={store} >{children}</StoreContext.Provider>;
export default Store;