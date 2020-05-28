export const filterEmptyGroups = (grupos) => {
    return grupos.filter(g => g.children.length !== 0).map(g => {
        return Object.assign({}, g, { value: `g${g.value}` });
    });
}