var fs = require('fs');
const RULE_REG = /#?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\s+\w+/g;
var app = new Vue({
    el: '#app',
    data: {
        msg: 'hello',
        hostContent: '',
        validRuleArr: [],
        test: true
    },
    mounted() {
        fs.readFile('/private/etc/hosts', 'utf-8', (err, data) => {
            if (err) throw err;
            this.hostContent = data;
            var arr = this.hostContent.split('\n');
            this.validRuleArr = arr.filter((rec) => {
                return RULE_REG.test(rec);
            });
        });
    }
});