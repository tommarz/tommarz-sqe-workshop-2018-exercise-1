import assert from 'assert';
import {ast_handler, parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an let expressions and assignment expressions correctly', () => {
        assert.deepEqual(
            ast_handler(parseCode('let a = 0,b;\nb=a;')), [{'line': 1, 'type': 'VariableDeclaration', 'name': 'a', 'cond': null, 'val': '0'},
                {'line': 1, 'type': 'VariableDeclaration', 'name': 'b', 'cond': null, 'val': null},
                {'line': 2, 'type': 'AssignmentExpression', 'name': 'b', 'cond': null, 'val': 'a'}]);
    });
    it('is parsing loops, conditions and return correctly', () => {
        assert.deepEqual(
            ast_handler(parseCode('function test (y) {\nlet x = 0;\nfor (i = 0; i<10; i=i++) {\n' +
                'if (i%2==0) {\n x=x+y;\n}\nelse if (i%5==0)\nwhile (x>=0) {\nx=x-y;\n}\nelse x=x*y;\n}\nreturn x;\n}')),
            [{line: 1, type: 'FunctionDeclaration', name: 'test', cond: null, val: null}, {line: 1, type: 'VariableDeclaration', name: 'y', cond: null, val: null},
                {line: 2, type: 'VariableDeclaration', name: 'x', cond: null, val: '0'}, {line: 3, type: 'ForStatement', name: null, cond: 'i < 10', val: null},
                {line: 3, type: 'AssignmentExpression', name: 'i', cond: null, val: '0'}, {line: 3, type: 'AssignmentExpression', name: 'i', cond: null, val: 'i++'},
                {line: 4, type: 'IfStatement', name: null, cond: 'i % 2 == 0', val: null} , {line: 5, type: 'AssignmentExpression', name: 'x', cond: null, val: 'x + y'} ,
                {line: 7, type: 'ElseIfStatement', name: null, cond: 'i % 5 == 0', val: null}, {line: 8, type: 'WhileStatement', name: null, cond: 'x >= 0', val: null},
                {line: 9, type: 'AssignmentExpression', name: 'x', cond: null, val: 'x - y'} , {line: 11, type: 'AssignmentExpression', name: 'x', cond: null, val: 'x * y'},
                {line: 13, type: 'ReturnStatement', name: null, cond: null, val: 'x'}]);
    });
});

describe('The javascript parser', ()=> {
    it('is parsing single if statement', () => {
        assert.deepEqual(ast_handler(parseCode('if (x<5)\nx;')),
            [{line : 1, type: 'IfStatement', name: null, cond: 'x < 5', val:null}]);
    });
    it('is parsing a simple if and else statements', () => {
        assert.deepEqual(ast_handler(parseCode('if (x<5)\nx;\nelse\n0;')),
            [{line : 1, type: 'IfStatement', name: null, cond: 'x < 5', val:null}]);
    });
    it('is parsing a if and else if statement', () => {
        assert.deepEqual(ast_handler(parseCode('if (x<5)\nx;\nelse if (x==5)\n0;')),
            [{line : 1, type: 'IfStatement', name: null, cond: 'x < 5', val:null}, {line : 3, type: 'ElseIfStatement', name: null, cond:'x == 5', val:null}]);
    });
    it('is parsing a if and two else if statements', () => {
        assert.deepEqual(ast_handler(parseCode('if (x<5)\nx;\nelse if (x==5)\n0;\nelse if(x>5)\n1;')),
            [{line : 1, type: 'IfStatement', name: null, cond: 'x < 5', val:null},
                {line : 3, type: 'ElseIfStatement', name: null, cond:'x == 5', val:null},
                {line : 5, type: 'ElseIfStatement', name: null, cond:'x > 5', val:null}]);
    });
});