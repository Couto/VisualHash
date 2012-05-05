REPORTER = list
SRC_FOLDER = src/
SRC = $(shell find $(SRC_FOLDER) -name "*.js" -type f)
DIST = dist/VisualHash.min.js
TESTS = tests
COVERAGE = $(TESTS)/coverage

all : test test-cov dist

test:
	@./tests/node_modules/mocha/bin/mocha \
		-R $(REPORTER) \
		$(TESTS)/index.js

test-watch:
	@./tests/node_modules/mocha/bin/mocha \
		-R $(REPORTER) \
		--watch \
		$(TESTS)/index.js

test-browser:
	@open $(TESTS)/index.html

dist: clean
	@touch $(DIST) && uglifyjs \
		--no-squeeze \
		--mangle-toplevel \
		--verbose \
		--unsafe \
		--lift-vars \
		--output $(DIST) $(SRC)

clean:
	@rm -rf dist/*

test-cov: src-cov
	@touch $(TESTS)/coverage.html
	@ $(MAKE) test REPORTER=html-cov > $(TESTS)/coverage.html

src-cov: cov-clean
	@node-jscoverage -v $(SRC_FOLDER) $(COVERAGE) --exclude=/css

cov-clean:
	@rm -rf $(TESTS)/coverage.html
	@rm -rf $(COVERAGE)

.PHONY: clean cov-clean src-cov test-cov test dist
