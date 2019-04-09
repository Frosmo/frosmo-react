import {
    pick,
} from '../index';

describe('pick', () => {
    it('should pick properties from objet', () => {
        const obj = {
            a: 101,
            b: 202,
            c: 303,
        };
        expect(pick(obj, ['a', 'c'])).toEqual({a: 101, c: 303});
    });

    it('should pick property with null value', () => {
        const obj = {
            a: 101,
            b: 202,
            c: 303,
            empty: null
        };
        expect(pick(obj, ['a', 'b', 'empty'])).toEqual({a: 101, b: 202, empty: null});
    });
});
