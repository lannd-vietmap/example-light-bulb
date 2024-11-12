// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',

  ],
  // add your custom rules here
  rules: {
    // allow async-await
    
    // 'generator-star-spacing': 'off',
    // 'spellcheck/spell-checker': 'off',
    // 'semi': ['off'],          
    // 'no-extra-semi': ['off'], 
    // 'comma-dangle': ['off'],  
    // 'comma-spacing': ['off'],  
    // 'no-trailing-spaces': ['off'],            
    // 'space-before-blocks': ['off'],              
    // 'space-before-function-paren': ['off'],      
    // 'quotes': ['off'],                            
    // // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'semi': ['off'],                          
    'no-trailing-spaces': ['off'],              
    'quotes': ['off'],                          
    'no-undef': ['off'],                        
    'comma-dangle': ['off'],                   
    'space-before-function-paren': ['off'],     
    'space-before-blocks': ['off'],
    'no-multiple-empty-lines': ['off'],
    'padded-blocks': ['off'],            
    'indent': ['off'],
    'no-unused-vars': ['off'],
  }
}
