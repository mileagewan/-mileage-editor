<template>
  <div class="editor-run">
    <div class="editor-left">
      <div style="margin-top: 10px">
        <button @click="handleClick(1)">Html</button>
        <button @click="handleClick(2)">javaScript</button>
        <button class="toRun" @click="handleClick(3)">运行</button>
      </div>
      <div style="width: 100%; height: calc(100% - 42px)">
        <Editor ref="html" v-show="p === 1" type="html" :value="defaultHtml" />
        <Editor
          ref="js"
          v-show="p === 2"
          type="javascript"
          :value="defaultJs"
        />
      </div>
    </div>
    <div class="editor-right">
      <div id="running-views"></div>
    </div>
  </div>
</template>
<script>
import Editor from "./components/Editor";
import Vue from "vue";

export default {
  name: "EditorRun",
  components: {
    Editor
  },
  data() {
    return {
      p: 1,
      defaultJs: `
  export default {
    data() {
      return {
        pickerOptions: {
         onPick() {
              // 这里可以写执行之后的逻辑
              debugger
              //用户选择一次时间范围会触发两次
         },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
            debugger
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }],
          disabledDate(timer) {
            return timer.getTime() < (Date.now() - 360 * 1000 * 23)
          },
          selectableRange: '10:00:00 - 23:59:59'
        },
        value1: '',
        value2: '',
        value3: ''
      };
    },
    mounted() {
    
     
    },
    methods: {
      change(...p) {
        console.log(p)
      },
      pick() {
        debugger
      },
      focus() {
        this.$nextTick(() => {
           this.$refs['data-pick'].picker.$on('pick', (...p) => {
              let now = new Date(p[0]).toJSON().substr(0, 10)
              let today = new Date().toJSON().substr(0, 10)
              if(now >today) {
                this.pickerOptions.selectableRange = '00:00:00 - 23:59:59'
              }
              
            })
        })
      }
    }
  };
`,
      defaultHtml: `
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      @focus="focus"
      @change="change"
      v-model="value2"
      type="datetime"
      ref="data-pick"
      placeholder="选择日期时间"
      @pick="pick"
      align="right"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
`
    };
  },
  methods: {
    handleClick(p) {
      if (p !== 3) {
        this.p = p;
      } else {
        const template = this.$refs.html.getValue();
        const el = document.createElement("div");
        this.$el
          .querySelector("#running-views")
          .$empty()
          .appendChild(el);
        const str = this.$refs.js.getValue();
        const code = str
          .replace(/export default\s+/, "return")
          .replace(/^<script>\s+/, "")
          .replace(/\s+<\/script>$/, "")
          .replace(";", "");
        var data = new Function(code)();
        const components = {};
        // for (const k in Element) {
        //   if (Object.prototype.toString.call(Element[k]) === "Object object") {
        //     components[Element[k].name] = Element[k];
        //   }
        // }
        const options = Object.assign(
          {},
          {
            template: `<div>${template}</div>`,
            el: el,
            components
          },
          data
        );

        new Vue(options);
      }
    }
  }
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
div {
  box-sizing: border-box !important;
}
.editor-run {
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  position: relative;
  height: 100%;
}

.editor-run .editor-left {
  float: left;
  width: 40%;
  height: 100%;
}

.editor-run .editor-left button {
  height: 32px;
  border: none;
  background: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  min-width: 72px;
}

.editor-run .editor-left .toRun {
  float: right;
  margin-right: 10px;
  background: #06c;
  color: #fff;
}

.editor-run .editor-right {
  float: right;
  width: 60%;
  height: 100%;
  border: 1px solid #d8d8d8;
}

.editor-run button + button {
  margin-left: 16px;
}
</style>
