class Interpreter {

    constructor(tree){
        this.tree = tree
        this.scopes = []
    }

    run() {
        debugger

        return this.evaluate(this.tree, {})
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
                this.evaluateVariableDeclaration(node, scope)
                return null;

            case "UpdateVariable":
                return this.evaluateUpdateVariable(node, scope)

            case "BinaryExpression":
                return this.evaluateBinaryExpression(node, scope);

            case "IfStatement":
                if (this.evaluate(node.condition, scope)) {
                    return this.evaluateBlock(node.body, scope);
                }
                return null;

            case "ReturnStatement":
                return this.evaluate(node.value, scope);

            case "LogStatement":
                return this.log(node, scope);

            case "Literal":
                return node.value;

            case "Identifier":
                if (scope[node.name] !== undefined) {
                    return scope[node.name];
                }

                throw new Error(`${node.name} is not declared or defined`);

            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    evaluateBlock(statements, scope) {
        for (let stmt of statements) {
            
            let result = this.evaluate(stmt, scope);
            if (stmt.type === "ReturnStatement"){
                this.scopes.pop()

                return result
            }
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

        // The reason why pushing directly to scopes 'push(scope)' and not 'push({...scope})' is because we need to update the real scope at that given time, this is a mutation since it has a same ref id
        this.scopes.push(scope)

        let newScope = { ...scope };

        // Map function parameters to their arguments
        currentFunction.params.forEach((param, index) => {

            if (node.arguments[index] === undefined){
                newScope[param] = undefined
            } else {
                newScope[param] = this.evaluate(node.arguments[index], scope);
            }

        });

        return this.evaluateBlock(currentFunction.body, newScope);
    }

    evaluateVariableDeclaration(node, scope){

        if (scope[node.name] === undefined){
            scope[node.name] = this.evaluate(node.value, scope);
        } else {
            throw new Error(`'${node.name}' has already been declared`);
        }

    }

    evaluateUpdateVariable(node, scope){

        if (scope[node.name] === undefined){
            throw new Error(`'${node.name}' is not declared or defined so update operation is invalid`);
        }

        let val = this.evaluate(node.value, scope);

        scope[node.name] = val

        let scopes = this.scopes
        for (let i = scopes.length-1; i>=0; i--){

            if (scopes[i][node.name] === undefined){
                break
            }
            
            scopes[i][node.name] = val
        }
    }

    log(node, scope){

        let output = ""
        for (let arg of node.args){
            output = output + " " + this.evaluate(arg, scope)
        }

        console.log(output)
        
        return null
    }
}

module.exports = Interpreter;


