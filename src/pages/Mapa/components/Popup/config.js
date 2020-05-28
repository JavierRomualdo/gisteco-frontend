export const extendMapFunctionality = (map, setPopupContent) => {
    const popupPrototype = Object.getPrototypeOf(map.popup);

    popupPrototype.open = function (position, content) {
        setPopupContent(content);
        this.setPosition(position);
    };
}