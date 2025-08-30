class Interpreter {
    constructor(ast) {
        this.globalScope = {}
    }

    run(ast) {
        let aaaa = 55
        return this.evaluate(ast, this.globalScope)
    }

    evaluate(node, scope) {
        switch (node.type) {
            case "Program":
                return this.evaluateBlock(node.body, scope);

            case "FunctionDeclaration":
                scope[node.name] = node;
                return null;

            case "FunctionCall":
                return this.executeFunction(node, scope);

            case "CallExpression":
                return this.executeFunction(node, scope);

            case "BlockStatement":
                return this.evaluateBlock(node.body, { ...scope });

            case "VariableDeclaration":
                scope[node.name] = this.evaluate(node.value, scope);
                return null;

            case "BinaryExpression":
                return this.evaluateBinaryExpression(node, scope);

            case "IfStatement":
                if (this.evaluate(node.condition, scope)) {
                    return this.evaluateBlock(node.body, scope);
                }
                return null;

            case "ReturnStatement":
                return this.evaluate(node.value, scope);

            case "Literal":
                return node.value;

            case "Identifier":
                if (scope[node.name] !== undefined) {
                    return scope[node.name];
                } else if (this.globalScope[node.name] !== undefined) {
                    return this.globalScope[node.name];
                }

                throw new Error(`Undefined variable: ${node.name}`);

            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    evaluateBlock(statements, scope) {
        for (let stmt of statements) {
            
            let result = this.evaluate(stmt, scope);
            if (stmt.type === "ReturnStatement") return result; // Stop execution on return
        }
        return null;
    }

    evaluateBinaryExpression(node, scope) {
        let left = this.evaluate(node.left, scope);
        let right = this.evaluate(node.right, scope);

        switch (node.operator.type) {
            case "PLUS": return left + right;
            case "MINUS": return left - right;
            case "MULTIPLY": return left * right;
            case "DIVIDE": return left / right;
            case "GREATER_THAN": return left > right;
            case "LESS_THAN": return left < right;
            default:
                throw new Error(`Unknown operator: ${node.operator}`);
        }
    }

    executeFunction(node, scope) {
        let currentFunction = scope[node.name];
        if (currentFunction === undefined) throw new Error(`Function not found: ${node.name}`);

        let newScope = { ...scope };

        // Map function parameters to their arguments
        currentFunction.params.forEach((param, index) => {
            newScope[param] = this.evaluate(node.arguments[index], scope);
        });

        return this.evaluateBlock(currentFunction.body, newScope);
    }
}

module.exports = Interpreter;


