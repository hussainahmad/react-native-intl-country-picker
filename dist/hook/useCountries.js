import { useMemo } from 'react';
export function useNormalizedCountries(countries, isRTL, type) {
    return useMemo(() => {
        return Object.entries(countries !== null && countries !== void 0 ? countries : {}).map(([cca2, country]) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            const c = country;
            let displayName;
            if (type === 'en') {
                // Always use English common name
                displayName = (_b = (_a = c.name) === null || _a === void 0 ? void 0 : _a.common) !== null && _b !== void 0 ? _b : '';
            }
            else if (isRTL) {
                // RTL and not forced to English: prefer Arabic name when available
                displayName = (_f = (_d = (_c = c.name) === null || _c === void 0 ? void 0 : _c.ara) !== null && _d !== void 0 ? _d : (_e = c.name) === null || _e === void 0 ? void 0 : _e.common) !== null && _f !== void 0 ? _f : '';
            }
            else {
                // LTR default: English common name
                displayName = (_h = (_g = c.name) === null || _g === void 0 ? void 0 : _g.common) !== null && _h !== void 0 ? _h : '';
            }
            return {
                cca2,
                callingCode: Array.isArray(c.callingCode) ? (_j = c.callingCode[0]) !== null && _j !== void 0 ? _j : '' : '',
                name: displayName,
                englishName: (_l = (_k = c.name) === null || _k === void 0 ? void 0 : _k.common) !== null && _l !== void 0 ? _l : '',
                rawName: (_m = c.name) !== null && _m !== void 0 ? _m : {},
            };
        });
    }, [countries, isRTL, type]);
}
