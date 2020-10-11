import * as requireIndex from 'requireindex';

const rules = requireIndex(__dirname + '/rules');
console.log(rules);
export { rules };
