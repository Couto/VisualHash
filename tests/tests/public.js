/**
 * VisualHash Tests
 * Basic
 *
 * @author Luís Couto
 * @organization 15minuteslate.net
 * @contact couto@15minuteslate.net
 * @version 0.0.1
 *
 * @license 2012 - MIT (http://couto.mit-license.org/)
 */

(function () {
    'use strict';

    // make it work in node and browser simultaneously
    var expect;
    try { expect = require('chai').expect; }
    catch (e) { expect = chai.expect }

    describe('Public Methods:', function () {
        var node = document.createElement('input'),
            visualHash = new VisualHash(node);

        describe('toHash:', function () {
            it('Should return error if no hash implementation is available', function () {
                var toHash = function () { visualHash.toHash('example'); };
                expect(toHash).to.throw(Error);
            });
        });

        describe('split:', function () {
            it('split', function () {});
        });

        describe('fillColors:', function () {
            it('fillColors', function () {});
        });

        describe('clearColors:', function () {
            it('clearColors', function () {});
        });

        describe('append:', function () {
            it('append', function () {});
        });

        describe('destroy:', function () {
            it('destroy', function () {});
        });

        describe('inputHandler:', function () {
            it('inputHandler', function () {});
        });

    });

}())
