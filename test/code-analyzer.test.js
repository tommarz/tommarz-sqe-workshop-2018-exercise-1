import assert from 'assert';
import {ast_handler, parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an let expressions and assignment expressions correctly', () => {
        assert.deepEqual(
            ast_handler(parseCode('let a = 0,b; b=0;')),
            [{'line': 1, 'type': 'VariableDeclaration', 'name': 'a', 'cond': null, 'val': '1'},
                {'line': 1, 'type': 'VariableDeclaration', 'name': 'b', 'cond': null, 'val': null},
                {'line': 2, 'type': 'AssignmentExpression', 'name': 'b', 'cond': null, 'val': null}]);
    });
    it('is parsing loops correctly', () => {
        assert.deepEqual(
            ast_handler(parseCode('function test (y) { let x = 0; for (i = 0; i<10; i++) ' +
                '{ if (i%2=0) { x=x+y; } else if (i%5==0) { while (x>=0) { x=x-y } } else { x=x*y; } } }')),
            [{'line': 1,}]);
    });
});
