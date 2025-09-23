class Interpreter {

    constructor(tree){
        this.tree = tree
        this.scopes = []

        this.scopeStates = [false]
        this.isNewScopeInserted = true
        this.currentBlockTypes = []
    }

    run() {
        debugger

        return this.evaluate(this.tree, {})
    }

    evaluate(node, scope) {
        switch (node.type) {
            case "Program":
                this.currentBlockType = "program"
                this.isNewScopeInserted = true
                this.scopes.push(scope)
                
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

            case "ForStatement":
                this.evaluateForStatement(node, scope);
                return null;

            case "IfStatement":
                this.evaluateIfStatement(node, scope);
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

        let newScope = scope

        if (this.isNewScopeInserted === false){
            this.scopeStates.push(true)

            // This scope contains parent scope 
            newScope = {...scope}

            this.scopes.push(newScope)
        }

        // The purpose of having '__record' is to track variables and prevent redeclaration in the same scope
        newScope['__record'] = {}
        
        this.isNewScopeInserted = false
        
        for (let stmt of statements) {
            let result = this.evaluate(stmt, newScope);

            if (stmt.type === "ReturnStatement"){
                this.scopes.pop()
                this.scopeStates.pop()

                return result
            }
        }

        let currentBlockType = this.currentBlockTypes[this.currentBlockTypes.length - 1]
        if (currentBlockType === "for"){
            return null
        }

        this.currentBlockTypes.pop()

        this.scopes.pop()
        this.scopeStates.pop()

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

    // Maybe there is a duplication of passing newscope...

    executeFunction(node, scope) {
        this.currentBlockTypes.push("function")
        this.isNewScopeInserted = true

        this.scopeStates.push(true)
        // This scope contains parent scope 
        let newScope = {...scope}
        this.scopes.push(newScope)

        let currentFunction = newScope[node.name];
        if (currentFunction === undefined) throw new Error(`Function not found: ${node.name}`);

    
        // The reason why pushing directly to scopes 'push(scope)' and not 'push({...scope})' is because we need to update the real scope at that given time, this is a mutation since it has a same ref id
        // Why is it here? i mean below newScope? The reason for that is...
        // this.scopes.push(newScope)

        // Map function parameters to their arguments
        currentFunction.params.forEach((param, index) => {

            if (node.arguments[index] === undefined){
                newScope[param] = undefined
            } else {
                newScope[param] = this.evaluate(node.arguments[index], newScope);
            }

        });

        return this.evaluateBlock(currentFunction.body, newScope);
    }

    evaluateVariableDeclaration(node, scope){

        if (scope['__record'][node.name] === true){
            throw new Error(`'${node.name}' has already been declared`);
        }

        let lastState = this.scopeStates[this.scopeStates.length - 1]

        if (scope[node.name] === undefined || lastState === true){
            scope[node.name] = this.evaluate(node.value, scope);
            scope['__record'][node.name] = true
        } else {
            throw new Error(`'${node.name}' has already been declared`);
        }

    }

    evaluateUpdateVariable(node, scope){

        if (scope[node.name] === undefined){
            throw new Error(`'${node.name}' is not declared or defined so update operation is invalid`);
        }

        let val = this.evaluate(node.value, scope);

        // scope[node.name] = val

        let scopes = this.scopes
        for (let i = scopes.length-1; i>=0; i--){

            if (scopes[i][node.name] === undefined){
                break
            }
            
            scopes[i][node.name] = val
        }
    }

    evaluateForStatement(node, scope){

        this.isNewScopeInserted = true
        this.currentBlockTypes.push("for")

        this.scopeStates.push(true)
        // This scope contains parent scope 
        let newScope = {...scope}
        this.scopes.push(newScope)

        // This is for 'init'
        this.evaluate(node.init, newScope)

        while (this.evaluate(node.condition, newScope)){

            this.evaluateBlock(node.body, newScope)

            this.isNewScopeInserted = true

            // This is for 'increment', the 'increment' is treated as 'updateVariable', means update the 'init'
            this.evaluate(node.increment, newScope)
        }

        this.isNewScopeInserted = false

        this.currentBlockTypes.pop()
        
        this.scopes.pop()
        this.scopeStates.pop()
        
        // Since we declared 'init' to scope we must remove it after the for loop ends because by design var is block-scoped
        // delete scope[node.init.name]

    }

    evaluateIfStatement(node, scope){
        if (this.evaluate(node.condition, scope)) {
            this.currentBlockTypes.push("if")
            return this.evaluateBlock(node.body, scope);
        }

        return null;
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


