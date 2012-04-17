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

    describe('Existence:', function () {

        it('Should exist in global object', function () {
            expect(window.VisualHash).to.exist;
        });

        it('Should be a function', function () {
            var isFunc = Object.prototype.toString.call(VisualHash);
            expect(isFunc).to.equal('[object Function]')
        });

        it('Should be instantiatable', function () {
            var placeholder = document.createElement('div'),
                visualHash = new VisualHash(placeholder);

            expect(visualHash).to.be.instanceOf(VisualHash);
        });

    });

}())