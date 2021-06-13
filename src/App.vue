<template>
  <div class="editor-run">
    <div class="editor-left">
      <div style="margin-top: 10px">
        <button @click="handleClick(1)">Html</button>
        <button @click="handleClick(2)">javaScript</button>
        <button class="toRun" @click="handleClick(3)">运行</button>
      </div>
      <div style="width: 100%;height: calc(100% - 42px)">
        <Editor ref="html" v-show="p === 1" type="html" :value="defaultHtml" />
        <Editor ref="js" v-show="p === 2" type="javascript" :value="defaultJs" />
      </div>
    </div>
    <div class="editor-right">
      <div id="running-views"></div>
    </div>
  </div>
</template>
<script>
import Editor from './components/Editor';
import Vue from 'vue';
import Element from 'element-ui'
export default {
  name: 'EditorRun',
  components: {
    Editor,
  },
  data() {
    return {
      p: 1,
      defaultJs: `export default {
}`,
      defaultHtml: `<el-button>
    
</el-button>`
    };
  },
  methods: {
    handleClick(p) {
      if (p !== 3) {
        this.p = p;
      } else {
        const template = this.$refs.html.getValue();
        const el = document.createElement('div');
        this.$el
          .querySelector('#running-views')
          .$empty()
          .appendChild(el);
        const str = this.$refs.js.getValue();
        const code = str.replace(/export default\s+/, 'return ').replace(';', '');
        var data = new Function(code)();
        const components = {}
        for(const k in Element) {
          if (Object.prototype.toString.call(Element[k]) === 'Object object') {
            components[Element[k].name] = Element[k]
          }
        }
        const options = Object.assign(
          {},
          {
            template:  `<div>${template}</div>`,
            el: el,
            components,
          },
          data
        );
        new Vue(options);
      }
    },
  },
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
