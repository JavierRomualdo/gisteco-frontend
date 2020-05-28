import { createContext, useContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AbilityBuilder } from '@casl/ability';

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbility = () => {
    return useContext(AbilityContext);
}

export const InformeCapa = class InformeCapa {
    constructor({ id }) {
        this.id = id;
    }

    get allowed() {
        return InformeCapa.informesCapaAutorizados.indexOf(this.id) !== -1;
    }
}

export const OpcionMenu = class OpcionMenu {
    constructor({ id }) {
        this.id = id;
    }

    get allowed() {
        return OpcionMenu.opcionesAutorizadasMenu.indexOf(this.id) !== -1;
    }
}

export const createAbilitiesForUser = (permisos) => {

    const { informesCapaAutorizados, opcionesAutorizadasMenu } = permisos;
    InformeCapa.informesCapaAutorizados = informesCapaAutorizados;
    OpcionMenu.opcionesAutorizadasMenu = opcionesAutorizadasMenu;

    return AbilityBuilder.define((allow) => {
        allow('read', InformeCapa, { allowed: true });
        allow('read', OpcionMenu, { allowed: true });
    });
}