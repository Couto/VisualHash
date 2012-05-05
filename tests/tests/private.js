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
    var expect, spy;
    try {
        expect = require('chai').expect;
        spy = require('sinon').spy();
    } catch (e) {
        expect = chai.expect
        spy = sinon.spy()
    }

    describe('Private Functions:', function () {
        var node = document.createElement('input'),
            visualHash = new VisualHash(node, {}, spy);


    });

}())
