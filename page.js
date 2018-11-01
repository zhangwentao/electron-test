var fs = require('fs');
const RULE_REG = /#?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\s+\w+/g;
const IP_REG = /#?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
const HOST_REG =/\s+(\S+)/;
const DISABLE_REG = /^\s*#/g;
const HOSTS_FILE = '/private/etc/hosts';
const {
    BrowserWindow,
    Notification,
    dialog
} = require('electron').remote;
var app = new Vue({
    el: '#app',
    data: {
        msg: 'hello',
        hostContent: '',
        validRuleArr: [],
        invalidRuleArr: [],
        lineObjArr: [],
        test: true
    },
    methods: {
        handleClick() {
            // new BrowserWindow({frame:false});
            dialog.showMessageBox({
                type: 'info',
                title:'host',
                message:this.hostContent
            });
        },
        save() {
            let ruleArr = [];
            let resultStr = '';
            ruleArr = [].concat(this.invalidRuleArr,this.getValidRuleTextArr());
            ruleArr.forEach(rule=>{
                resultStr += (rule + '\n');
            });
            console.log(resultStr);
            fs.writeFile(HOSTS_FILE, resultStr, {encoding:'utf-8'},(err,data)=>{
                if (err) throw err;
                let noti = new Notification({
                    body: `已写入${HOSTS_FILE}文件`
                });
                noti.show();
            });
        },
        getValidRuleTextArr() {
            return this.lineObjArr.map(rule=>{
                let str = '';
                if(!rule.valid) {
                    str+='#';
                }
                str+=rule.ip;
                str+=' ';
                str+=rule.host;
                return str;
            })
        }
    },
    mounted() {
        fs.readFile(HOSTS_FILE, 'utf-8', (err, data) => {
            if (err) throw err;
            this.hostContent = data;
            var arr = this.hostContent.split('\n');
            arr.forEach((rec) => {
                if(RULE_REG.test(rec)) {
                    this.validRuleArr.push(rec);
                } else {
                    this.invalidRuleArr.push(rec);
                }
            });
            this.lineObjArr = this.validRuleArr.map(line=>{
                let obj = {
                    valid: !DISABLE_REG.test(line),
                    ip: line.match(IP_REG) && line.match(IP_REG)[1],
                    host: line.match(HOST_REG) && line.match(HOST_REG)[1]
                }
                return obj;
            });
        });
    }
});