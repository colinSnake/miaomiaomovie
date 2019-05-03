import Vue from 'vue'
import Location from './Location'

export var location = (function(){
    var defaults = { // 默认值
        title: '',
        content: '',
        cancle: '',
        ok: '',
        handleCancle: null,
        handleOk: null
    }
    return function (opts) { // 配置参数
        for (var attr in opts) {
            defaults[attr] = opts[attr]
        }

        var MyComponent = Vue.extend(Location)
        var vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancle: defaults.cancle,
                ok: defaults.ok
            },
            methods: {
                handleCancle() {
                    defaults.handleCancle && defaults.handleCancle.call(this)
                    document.body.removeChild(vm.$el) // 删除弹窗
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el)
                }
            }
        })
        document.body.appendChild(vm.$el) // 添加弹出
    }
})()