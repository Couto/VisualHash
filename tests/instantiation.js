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
            var visualHash = function () { new VisualHash(); };
            expect(visualHash).to.throw(Error);
        });

        it('Should return an instance even if `new` was forgotten', function () {
            var sample = document.createElement('input'),
                visualHash = VisualHash(sample);

            expect(visualHash).to.be.instanceOf(VisualHash);
        });

        it('First argument must be DOM node', function () {
            var node = document.createElement('input'),
                arr = [1,2,3],
                obj = {1: 'a', 2: 'b'},
                str = "hello",
                visualHashNode  = function () { new VisualHash(node); },
                visualHashArray = function () { new VisualHash(arr);  },
                visualHashObj   = function () { new VisualHash(obj);  },
                visualHashStr   = function () { new VisualHash(str);  };

            expect(visualHashNode).to.not.throw(Error);
            expect(visualHashArray).to.throw(Error);
            expect(visualHashObj).to.throw(Error);
            expect(visualHashStr).to.throw(Error);
        });

        it('Second argument must be of type object', function () {
            var node = document.createElement('input'),
                arr = [1,2,3],
                obj = {1: 'a', 2: 'b'},
                str = "hello",
                visualHashNode  = function () { new VisualHash(node, node); },
                visualHashArray = function () { new VisualHash(node, arr);  },
                visualHashObj   = function () { new VisualHash(node, obj);  },
                visualHashStr   = function () { new VisualHash(node, str);  };

            expect(visualHashNode).to.throw(Error);
            expect(visualHashArray).to.throw(Error);
            expect(visualHashObj).to.not.throw(Error);
            expect(visualHashStr).to.throw(Error);
        });

    });

}())