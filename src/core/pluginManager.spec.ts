// import 'mocha';
// import { expect } from 'chai';
// import { mock, instance, when } from 'ts-mockito';
// import {
//     // isPluginMessage
// } from './pluginManager';

// describe('PluginManager ::', () => {

//     let env;

//     beforeEach(() => {
//         env = process.env;
//         process.env = {
//             PREFIX: '!'
//         };
//     });

//     describe('isPluginMessage()', () => {

//         xit('should return true when the prefix and a length is found.', () => {
//             const input: string = process.env.PREFIX + 'message';
//             const result: boolean = isPluginMessage(input);
//             expect(result).to.equal(true);
//         });

//         xit('should return false when just the prefix is provided.', () => {
//             const input: string = process.env.PREFIX;
//             const result: boolean = isPluginMessage(input);
//             expect(result).to.equal(false);
//         });

//         xit('should return false when a string without the prefix is provided.', () => {
//             const input: string = 'message';
//             const result: boolean = isPluginMessage(input);
//             expect(result).to.equal(false);
//         });

//     });

// });