
const preTokenise = (expression: string) : string[] => expression.split('').filter(x => x !== ' ')

const tokenise = (expression: string[], tokens: Token[] = []) : Token[] => {
    let value = expression.shift()

    if (value === undefined) return tokens
    
    switch (true) {
        case isNumber(value): {
            while (true) {
                const next = peek(expression)
                if (next === undefined) break
                if (isNumber(next)) value += expression.shift()
                else break
            }

            tokens.push({
                type: 'number',
                value: value as unknown as number
            })

            break
        }
        case value in OPERATORS: {
            const token = value as unknown as Operator
            tokens.push({
                type: 'operator',
                value: token,
                precedence: OPERATORS[token][0],
                associativity: OPERATORS[token][1]
            })

            break
        }
        case PARENTHESIS_SET.has(value): {
            tokens.push({
                type: 'parenthesis',
                value: value as unknown as Parenthesis
            })

            break
        }
        default: {
            throw Error(`unknown token ${value}`)
        }
    }
    
    return tokenise(expression, tokens)
}

const isNumber = (char: string) => isFinite(parseInt(char))
const peek = (str: string[]) => str.length > 0 ? str[0] : undefined

const parse = (str: Token[], outputQueue: Token[] = [], operatorStack: OperatorToken[] = []) : Token[] => {
    return []
}

const evaluate = (express: Token[]) : number => 0

const PARENTHESIS = ['(', ')'] as const
const PARENTHESIS_SET = new Set<string>(PARENTHESIS)

type Parenthesis = typeof PARENTHESIS[number]

type Associativity = 'left' | 'right'

const OPERATORS = {
    '^': [4, 'right', (x: number, y: number) => Math.pow(x, y)],
    '*': [3, 'left', (x: number, y: number) => x * y],
    'x': [3, 'left', (x: number, y: number) => x * y],
    '/': [3, 'left', (x: number, y: number) => x / y],
    '%': [3, 'left', (x: number, y: number) => x / y],
    '÷': [3, 'left', (x: number, y: number) => x / y],
    '+': [2, 'left', (x: number, y: number) => x + y],
    '-': [2, 'left', (x: number, y: number) => x - y],
} as const

type Operator = keyof typeof OPERATORS

type OperatorToken = {
    type: 'operator'
    precedence: number
    associativity: Associativity
    value: Operator
}

type NumberToken = {
    type: 'number'
    value: number
}

type ParenthesisToken = {
    type: 'parenthesis'
    value: Parenthesis
}

type Token = OperatorToken | NumberToken | ParenthesisToken

const execute = (expression: string) => evaluate(parse(tokenise(preTokenise(expression))))

const expression = '35 + 4 x 22 ÷ ( 1 - 5 ) ^ 2 ^ 3'

console.log(tokenise(preTokenise(expression)))