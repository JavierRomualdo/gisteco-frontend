import { CAMBIAR_STREET_VIEW_OPTIONS } from "../actions";

export default (state, action) => {
    switch (action.type) {
        case CAMBIAR_STREET_VIEW_OPTIONS:
            const { StreetViewPanoramaOptions } = action;
            return { ...state, StreetViewPanoramaOptions: { ...state.StreetViewPanoramaOptions, ...StreetViewPanoramaOptions } };
        default:
            return state;
    }
}