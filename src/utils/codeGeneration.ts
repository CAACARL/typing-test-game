const codeSnippets = {
  javascript: {
    keywords: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "async", "await"],
    types: ["string", "number", "boolean", "object", "array", "null", "undefined"],
    methods: ["map", "filter", "reduce", "forEach", "find", "includes", "push", "pop", "slice"],
    variables: ["data", "result", "value", "item", "index", "count", "list", "user", "response", "error"],
  },
  python: {
    keywords: ["def", "return", "if", "elif", "else", "for", "while", "class", "import", "from", "try", "except"],
    types: ["str", "int", "float", "bool", "list", "dict", "tuple", "set"],
    methods: ["append", "extend", "remove", "pop", "get", "keys", "values", "items", "join", "split"],
    variables: ["data", "result", "value", "item", "index", "count", "items", "user", "response", "error"],
  },
  java: {
    keywords: ["public", "private", "static", "void", "return", "if", "else", "for", "while", "class", "new", "try", "catch"],
    types: ["String", "int", "boolean", "double", "float", "long", "ArrayList", "HashMap"],
    methods: ["add", "remove", "get", "set", "size", "isEmpty", "contains", "clear", "toString"],
    variables: ["data", "result", "value", "item", "index", "count", "list", "user", "response", "error"],
  },
  cpp: {
    keywords: ["int", "void", "return", "if", "else", "for", "while", "class", "public", "private", "using", "namespace"],
    types: ["string", "int", "bool", "double", "float", "long", "vector", "map"],
    methods: ["push_back", "pop_back", "size", "empty", "clear", "begin", "end", "insert", "erase"],
    variables: ["data", "result", "value", "item", "index", "count", "vec", "user", "response", "error"],
  },
  php: {
    keywords: ["function", "return", "if", "else", "elseif", "foreach", "while", "class", "public", "private", "new"],
    types: ["string", "int", "bool", "array", "object", "float", "mixed"],
    methods: ["array_map", "array_filter", "count", "in_array", "isset", "empty", "explode", "implode"],
    variables: ["$data", "$result", "$value", "$item", "$index", "$count", "$list", "$user", "$response", "$error"],
  },
};

export const generateCode = (language: string, lineCount: number = 15): string => {
  const lang = codeSnippets[language as keyof typeof codeSnippets];
  if (!lang) return "";
  
  const lines: string[] = [];
  const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  for (let i = 0; i < lineCount; i++) {
    const lineType = Math.random();
    let line = "";
    
    if (language === "javascript" || language === "typescript") {
      if (lineType < 0.3) {
        const keyword = getRandom(["const", "let"]);
        const variable = getRandom(lang.variables);
        const value = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}` : `"${getRandom(lang.variables)}"`;
        line = `${keyword} ${variable} = ${value};`;
      } else if (lineType < 0.5) {
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}((${getRandom(lang.variables)}) => ${getRandom(lang.variables)});`;
      } else if (lineType < 0.7) {
        const variable = getRandom(lang.variables);
        const operator = getRandom(["===", "!==", ">", "<", ">=", "<="]);
        const value = Math.floor(Math.random() * 100);
        line = `if (${variable} ${operator} ${value}) {`;
      } else {
        line = `return ${getRandom(lang.variables)};`;
      }
    } else if (language === "python") {
      if (lineType < 0.3) {
        const variable = getRandom(lang.variables);
        const value = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}` : `"${getRandom(lang.variables)}"`;
        line = `${variable} = ${value}`;
      } else if (lineType < 0.5) {
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}(${getRandom(lang.variables)})`;
      } else if (lineType < 0.7) {
        const variable = getRandom(lang.variables);
        const iterable = getRandom(lang.variables);
        line = `for ${variable} in ${iterable}:`;
      } else {
        line = `return ${getRandom(lang.variables)}`;
      }
    } else if (language === "java") {
      if (lineType < 0.3) {
        const type = getRandom(lang.types);
        const variable = getRandom(lang.variables);
        const value = type === "int" ? Math.floor(Math.random() * 100) : `"${getRandom(lang.variables)}"`;
        line = `${type} ${variable} = ${value};`;
      } else if (lineType < 0.5) {
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}(${getRandom(lang.variables)});`;
      } else if (lineType < 0.7) {
        const variable = getRandom(lang.variables);
        line = `if (${variable} != null) {`;
      } else {
        line = `return ${getRandom(lang.variables)};`;
      }
    } else if (language === "cpp") {
      if (lineType < 0.3) {
        const type = getRandom(lang.types);
        const variable = getRandom(lang.variables);
        line = `${type} ${variable} = ${Math.floor(Math.random() * 100)};`;
      } else if (lineType < 0.5) {
        const obj = getRandom(lang.variables);
        const method = getRandom(lang.methods);
        line = `${obj}.${method}(${getRandom(lang.variables)});`;
      } else if (lineType < 0.7) {
        line = `for (int i = 0; i < ${getRandom(lang.variables)}.size(); i++) {`;
      } else {
        line = `return ${getRandom(lang.variables)};`;
      }
    } else if (language === "php") {
      if (lineType < 0.3) {
        const variable = getRandom(lang.variables);
        const value = Math.random() > 0.5 ? `${Math.floor(Math.random() * 100)}` : `"${getRandom(lang.variables).substring(1)}"`;
        line = `${variable} = ${value};`;
      } else if (lineType < 0.5) {
        const method = getRandom(lang.methods);
        const variable = getRandom(lang.variables);
        line = `${method}(${variable});`;
      } else if (lineType < 0.7) {
        const iterable = getRandom(lang.variables);
        const item = getRandom(lang.variables);
        line = `foreach (${iterable} as ${item}) {`;
      } else {
        line = `return ${getRandom(lang.variables)};`;
      }
    }
    
    lines.push(line);
  }
  
  return lines.join(" ");
};
