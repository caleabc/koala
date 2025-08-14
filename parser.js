class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse() {
        let ast = {
            type: "Program",
            body: []
        };

        // Run through all tokens and parse statements
        while (this.position < this.tokens.length) {
            ast.body.push(this.parseStatement());
        }

        return ast;
    }

    // Determine what type of statement we're dealing with
    parseStatement() {
        let token = this.currentToken(); // Look at the current token

        if (token.type === "FUNCTION") {
            return this.parseFunctionDeclaration(); // Function definition
        } else if (token.type === "VAR") {
            return this.parseVariableDeclaration(); // Variable declaration
        } else if (token.type === "IF") {
            return this.parseIfStatement(); // If condition
        } else if (token.type === "RETURN") {
            return this.parseReturnStatement(); // Return statement
        } else if (token.type === "IDENTIFIER") {
            return this.parseFunctionCall(); // Function call
        }
    }

    // Function declaration (e.g., fn calculate(x, y) { ... })
    parseFunctionDeclaration() {
        this.expect("FUNCTION"); // Expect 'fn'
        let name = this.expect("IDENTIFIER").value; // Expect function name like 'calculate'
        this.expect("L_PAREN"); // Expect '('

        // Parse function declaration parameters
        let params = [];
        while (this.currentToken().type !== "R_PAREN") { // Iterate then stop if we hit ')'
            params.push(this.expect("IDENTIFIER").value);

            if (this.currentToken().type === 'COMMA'){
                this.nextToken()
            }
        }
        this.expect("R_PAREN"); // Expect ')'
        this.expect("L_BRACE"); // Expect '{'

        // Parse function body
        let body = [];
        while (this.currentToken().type !== "R_BRACE") {
            body.push(this.parseStatement());
        }
        this.expect("R_BRACE"); // Expect '}'

        return {
            type: "FunctionDeclaration",
            name,
            params,
            body
        };
    }

    // Variable declaration (e.g., let a = 50;)
    parseVariableDeclaration() {
        this.expect("VAR"); // Expect 'var'
        let name = this.expect("IDENTIFIER").value; // Variable name
        this.expect("EQUAL"); // Expect '='
        let value = this.parseExpression(); // Get the value

        return {
            type: "VariableDeclaration",
            name,
            value
        };
    }

    // If statement (e.g., if (a > 1) { ... } else { ... })
    parseIfStatement() {
        this.expect("IF"); // Expect 'if'
        this.expect("L_PAREN"); // Expect '('
        let condition = this.parseExpression(); // Parse condition
        this.expect("R_PAREN"); // Expect ')'
        this.expect("L_BRACE"); // Expect '{'

        let body = [];
        while (this.peek().type !== "R_BRACE") {
            body.push(this.parseStatement());
        }
        this.expect("R_BRACE"); // Expect '}'

        return {
            type: "IfStatement",
            condition,
            body
        };
    }

    // Return statement (e.g., return x + y;)
    parseReturnStatement() {
        this.expect("RETURN"); // Expect 'return'
        let value = this.parseExpression(); // Parse return value

        return {
            type: "ReturnStatement",
            value
        };
    }

    // Function call (e.g., calc(4, 8);)
    parseFunctionCall() {
        let name = this.expect("IDENTIFIER").value; // Function name
        this.expect("L_PAREN"); // Expect '('

        // Parse function call arguments
        let args = [];
        while (this.currentToken().type !== "R_PAREN") {
            args.push(this.parseExpression());

            if (this.currentToken().type === 'COMMA'){
                this.nextToken()
            }
        }
        this.expect("R_PAREN"); // Expect ')'
        this.expect("SEMICOLON"); // Expect ';'

        return {
            type: "FunctionCall",
            name,
            arguments: args
        };
    }

    /*
    Parse Expression
    
    let a = 5 + 2 + c / 5
    //      -------------

    if (c > 50 && b < 55)
    //  ----------------

    Those in underline are an example of expression
    */
    parseExpression() {
        let left = this.parsePrimary();
        this.nextToken()

        // Check for allowed operators [+ - * / == < >]
        while (["PLUS", "MINUS", "MULTIPLY", "DIVIDE", "GREATER_THAN", "LESS_THAN"].includes(this.currentToken().type)) {
            let operator = this.currentToken()

            let right = this.parsePrimary()
            this.nextToken()

            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            };
        }

        return left;
    }

    parsePrimary() {
        let token = this.currentToken();

        if (token.type === "NUMBER") {
            return { type: "Literal", value: Number(token.value) };
        }

        if (token.type === "STRING") {
            return { type: "Literal", value: token.value };
        }

        if (token.type === "IDENTIFIER"){
            return { type: "Identifier", name: token.value };
        }
    
        throw new Error(`Unexpected token in expression: ${token.value}`);
    }

    // Expect a specific token type
    expect(type) {
        let token = this.currentToken()

        if (token.type === type) {
            this.nextToken()
            return token
        }

        throw new Error(`Expected ${type}, got ${this.peek().type}`);
    }

    // Get token
    currentToken() {
        return this.tokens[this.position];
    }

    // Move to the next token
    nextToken() {
        this.position = this.position + 1
        return this.tokens[this.position]
    }
}

module.exports = Parser


