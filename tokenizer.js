class Tokenizer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {
        const tokenPatterns = [
            { type: "FUNCTION", regex: /^fn\b/ },
            { type: "IF", regex: /^if\b/ },
            { type: "ELSE", regex: /^else\b/ },
            { type: "RETURN", regex: /^return\b/ },
            { type: "VAR", regex: /^var\b/ },
            { type: "LOG", regex: /^log\b/ },
            { type: "IDENTIFIER", regex: /^[a-zA-Z_]\w*/ },
            { type: "NUMBER", regex: /^\d+/ },
            { type: "EQUAL", regex: /^=/ },
            { type: "DOUBLE_EQUAL", regex: /^==/ },
            { type: "NOT_EQUAL", regex: /^!=/ },
            { type: "GREATER_THAN", regex: /^>/ },
            { type: "LESS_THAN", regex: /^</ },
            { type: "GREATER_EQUAL", regex: /^>=/ },
            { type: "LESS_EQUAL", regex: /^<=/ },
            { type: "AND", regex: /^&&/ },
            { type: "OR", regex: /^\|\|/ },
            { type: "PLUS", regex: /^\+/ },
            { type: "MINUS", regex: /^-/ },
            { type: "MULTIPLY", regex: /^\*/ },
            { type: "DIVIDE", regex: /^\// },
            { type: "L_PAREN", regex: /^\(/ },
            { type: "R_PAREN", regex: /^\)/ },
            { type: "L_BRACE", regex: /^\{/ },
            { type: "R_BRACE", regex: /^\}/ },
            { type: "COMMA", regex: /^,/ },
            { type: "STRING", regex: /^'([^']*)'/ },
            { type: "SEMICOLON", regex: /^;/ },
            { type: "WHITESPACE", regex: /^\s+/, ignore: true }
        ];

        let position = this.position
        let inputLength = this.input.length

        while (position < inputLength){
            let match = false

            for (let pattern of tokenPatterns){
                const result = this.input.slice(position).match(pattern.regex)

                if (result !== null) {
                    if (pattern.type !== 'WHITESPACE') {
                        this.tokens.push({ type:pattern.type, value: result[0] });
                    }

                    position = position + result[0].length
                    match = true
                    break
                }
            }

            if (match === false) {
                throw new Error(`Unexpected token: ${this.input[position]}`);
            }
        }

        return this.tokens
    }

}

module.exports = Tokenizer


