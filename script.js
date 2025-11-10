const players = (function () {
    let xPlayer = '';
    let oPlayer = '';
    let turn = 'x';

    const setTurn = newTurn => turn = newTurn;
    const setNames = (xname, oname) => {
        xPlayer = xname;
        oPlayer = oname;
    }

    return {xPlayer, oPlayer, turn, setTurn, setNames};
})();