"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(d = new Date) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('.');
}
exports.default = default_1;
;
