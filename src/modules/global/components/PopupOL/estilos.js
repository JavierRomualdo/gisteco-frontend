export const POPUP_STYLE = `
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 0px;
    border-radius: 10px;
    bottom: 24px;
    left: -50px;
    min-width: 280px;

    &:after, &:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    &:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
    }
    &:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
    }
    & .popup-closer {
        text-decoration: none;
        position: absolute;
        color: black;
        top: 2px;
        right: 8px;
        cursor: pointer;
    }
    & .popup-closer:after {
        content: "✖";
    }
    & .popup-title{
        font-size: 0.9rem;
    }
`;

export const POPUP_TITLE_STYLE = `
    padding: 10px;
    background-color: #337ab7;
    border-radius: 10px 10px 0px 0px;
    color: #FFF;
    font-weight: bold;
`;

export const POPUP_BODY_STYLE = `
    padding: 5px;
`;