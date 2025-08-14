class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse() {
        let ast = {
            type: "Program", // Root node of our AST
            body: []
        };

        // Loop through all tokens and parse statements
        while (this.peek().type !== "EOF") {
            ast.body.push(this.parseStatement());
        }

        return ast;
    }

    // Determine what type of statement we're dealing with
    parseStatement() {
        let token = this.peek(); // Look at the current token

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

        // Parse function parameters
        let params = [];
        while (this.currentToken().type !== "R_PAREN") { // Iterate then stop if we hit ')'
            params.push(this.expect("IDENTIFIER").value);

            if (this.currentToken().type !== "R_PAREN") {
                // Handle multiple parameters by advancing the current position 
                this.expect("COMMA");
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
        this.expect("LET"); // Expect 'let'
        let name = this.expect("IDENTIFIER").value; // Variable name
        this.expect("EQUAL"); // Expect '='
        let value = this.parseExpression(); // Get the value
        this.expect("SEMICOLON"); // Expect ';'

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
        this.expect("SEMICOLON"); // Expect ';'

        return {
            type: "ReturnStatement",
            value
        };
    }

    // Function call (e.g., calc(4, 8);)
    parseFunctionCall() {
        let name = this.expect("IDENTIFIER").value; // Function name
        this.expect("L_PAREN"); // Expect '('

        let args = [];
        while (this.peek().type !== "R_PAREN") {
            args.push(this.parseExpression()); // Parse function arguments
            if (this.peek().type !== "R_PAREN") {
                this.expect("COMMA"); // Handle multiple arguments
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
    
        // Check for allowed operators [+ - * / == < >]
        while (["PLUS", "MINUS", "MULTIPLY", "DIVIDE", "GREATER_THAN", "LESS_THAN"].includes(this.peek().type)) {
            let operator = this.advance().type;
            let right = this.parsePrimary();
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
        let token = this.advance(); // Move to next token
    
        if (token.type === "NUMBER") {
            return { type: "Literal", value: Number(token.value) };
        }

        if (token.type === "IDENTIFIER"){
            return { type: "Identifier", name: token.value };
        }
    
        throw new Error(`Unexpected token in expression: ${token.value}`);
    }

    // Expect a specific token type
    expect(type) {
        if (this.currentToken().type === type) {
            return this.advance();
        }

        throw new Error(`Expected ${type}, got ${this.peek().type}`);
    }

    // Get token
    currentToken() {
        return this.tokens[this.position];
    }

    // Move to the next token
    advance() {
        this.position = this.position + 1
        return this.tokens[this.position]
    }
}

module.exports = Parser


