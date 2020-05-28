import React, { Suspense } from 'react';
import { LoadingIcon } from '../icons';

export const cargarComponenteAsincrono = (ComponenteAsincrono) => () =>
(
    <Suspense fallback={<div className="text-center mt-4"><LoadingIcon/></div>}>
        <ComponenteAsincrono/>
    </Suspense>
);