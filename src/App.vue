<template>
    <div class="editor-run">
        <div style="width: 500px">
            <button @click="handleClick(1)">Html</button>
            <button @click="handleClick(2)">javaScript</button>
        </div>
        <Editor v-show="p === 1" type="html" value="123"/>
        <Editor v-show="p === 2" type="javascript" value="456"/>
        <div id="running-views"></div>
    </div>
</template>
<script>
    import Editor from "./components/Editor";
    export default {
      name: 'EditorRun',
      components: {
        Editor
      },
      data() {
        return {
          p: 1
        }
      },
      methods: {
        handleClick(p) {
          this.p = p
        }
      }
    }
</script>
<style>
    .editor-run {
        border: 1px solid #d8d8d8;
        box-sizing: border-box;
        position: relative;
    }
    .editor-run button {
        height: 32px;
        border: none;
        background: #f0f0f0;
        border-radius: 5px;
        cursor: pointer;
    }
    .editor-run button + button {
        margin-left: 16px;
    }
    .editor-run #running-views {
        width: calc(100% - 500px);
        height: 532px;
        border: 1px solid #0066cc;
        float: right;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>