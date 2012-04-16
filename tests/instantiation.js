/**
 * VisualHash Tests
 * Instantiation
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

    describe('Instantiation', function () {
        it('Should require a DOM element', function () {
            try {
                new VisualHash();
            } catch (e) {
                var triggeredError = (e) ? true : false;
                expect(triggeredError).to.be.not.false;
            }
        });

        it('Should return an instance even if `new` was forgotten', function () {
            var sample = document.createElement('input'),
                visualHash = VisualHash(sample);

            expect(visualHash instanceof VisualHash).to.be.ok;
        });
    });

}())