export const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        {
            name: 'nombre',
            weight: 0.7
        }, {
            name: 'ruta',
            weight: 0.3
        }
    ]
};