class Interpreter {

    constructor(tree){
        this.tree = tree

        // The purpose of "scopes" is to have a tracking of scope, and this is used for update operation
        this.scopes = []

        // The purpose of this is to determine what is current block type, in evaluateBlock if current block type is "for" then empty the __record property then add the init name to the object, basically this is helpful in for loop
        this.currentBlockTypes = []

        // The purpose of this is for updating variables in the correct scope to be specific in the earliest scope where the variable is declared, basically going backwards direction
        this.trackedNodes = []
    }

    run() {
        debugger

        return this.evaluate(this.tree, {})
    }

    evaluate(node, scope) {
        switch (node.type) {
            case "Program":
                this.currentBlockType = "program"

                // "__record" is a reserved keyword
                // The purpose of having '__record' is to track variables and prevent redeclaration in the same scope
                scope['__record'] = {}
                
                this.scopes.push(scope)
                this.trackedNodes.push({})
                
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

    /*
    
    Block means {...}, eg. Program, function block, if block, for looop block

    */
    evaluateBlock(statements, scope) {

        let currentBlockType = this.currentBlockTypes[this.currentBlockTypes.length - 1]
        if (currentBlockType === "for"){
            scope['__record'] = {}

            let init = scope["__init"]
            scope['__record'] = {[init]: true}
        }
        
        for (let stmt of statements) {
            let result = this.evaluate(stmt, scope);

            if (stmt.type === "ReturnStatement"){
                this.scopes.pop()

                this.trackedNodes.pop()

                return result
            }
        }

        if (currentBlockType === "for"){
            return null
        }

        this.currentBlockTypes.pop()
        this.scopes.pop()
        this.trackedNodes.pop()

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
        this.currentBlockTypes.push("function")

        // This scope contains parent scope 
        let newScope = {...scope}

        // "__record" is a reserved keyword
        // The purpose of having '__record' is to track variables and prevent redeclaration in the same scope
        newScope['__record'] = {}

        this.scopes.push(newScope)

        this.trackedNodes.push({})

        let currentFunction = newScope[node.name];
        if (currentFunction === undefined) throw new Error(`Function not found: ${node.name}`);

        // The reason why pushing directly to scopes 'push(scope)' and not 'push({...scope})' is because we need to update the real scope at that given time, this is a mutation since it has a same ref id
        // Why is it here? i mean below newScope? The reason for that is...
        // this.scopes.push(newScope)

        // params length and arguments length must be equal or else throw error
        // TODO: add conditional here to verify their lengths

        // TODO: convert below code to for loop for easier to read

        // Map function parameters to their arguments
        currentFunction.params.forEach((param, index) => {

            if (node.arguments[index] === undefined){
                newScope[param] = undefined
            } else {
                newScope[param] = this.evaluate(node.arguments[index], newScope);
                newScope['__record'][param] = true
            }

        });

        return this.evaluateBlock(currentFunction.body, newScope);
    }

    evaluateVariableDeclaration(node, scope){

        if (scope['__record'][node.name] === true){
            throw new Error(`'${node.name}' has already been declared`);
        }

        scope[node.name] = this.evaluate(node.value, scope);
        scope['__record'][node.name] = true

        let lastTnode = this.trackedNodes[this.trackedNodes.length - 1]
        lastTnode[node.name] = node

    }

    evaluateUpdateVariable(node, scope){

        if (scope[node.name] === undefined){
            throw new Error(`'${node.name}' is not declared or defined so update operation is invalid`);
        }

        let val = this.evaluate(node.value, scope);

        let scopes = this.scopes
        for (let i = scopes.length-1; i>=0; i--){

            if (scopes[i][node.name] === undefined){
                break
            }
            
            scopes[i][node.name] = val

            // Update operation must be stop at the earliest scope where the variable is declared and not the entire variable declaration
            let tnode = this.trackedNodes[i][node.name]
            if (tnode !== undefined){
                if (tnode.name === node.name && tnode.type === "VariableDeclaration"){
                    break
                }
            }
        }
    }

    evaluateForStatement(node, scope){

        this.currentBlockTypes.push("for")

        // This scope contains parent scope 
        let newScope = {...scope}

        // The purpose of having '__record' is to track variables and prevent redeclaration in the same scope
        newScope['__record'] = {}

        this.scopes.push(newScope)

        this.trackedNodes.push({})

        // This is for 'init'
        this.evaluate(node.init, newScope)

        // '__init' is a reserve keyword, to track the 'init' variable of the for loop
        // why just add this __init to __record so that no more declaration of __init? the reason for this is loop run more than once the design of this engine is for loop does not issue another scope every iteration it only assign just only once scope no matter the for loop is like i < 100000 it just one scope not n scope
        newScope["__init"] = node.init.name

        while (this.evaluate(node.condition, newScope)){

            this.evaluateBlock(node.body, newScope)

            // This is for 'increment', the 'increment' is treated as 'updateVariable', means update the 'init'
            this.evaluate(node.increment, newScope)
        }

        this.currentBlockTypes.pop()
        
        this.scopes.pop()

        this.trackedNodes.pop()
    }

    evaluateIfStatement(node, scope){
        if (this.evaluate(node.condition, scope)) {
            this.currentBlockTypes.push("if")

            // This scope contains parent scope 
            let newScope = {...scope}

            // The purpose of having '__record' is to track variables and prevent redeclaration in the same scope
            newScope['__record'] = {}

            this.scopes.push(newScope)

            this.trackedNodes.push({})

            return this.evaluateBlock(node.body, newScope);
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


