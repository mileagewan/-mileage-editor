<template>
    <div id="ace-editor" style="width: 500px;height: 500px"></div>
</template>

<script>
 import {getSources} from "../Utils/Utils";

 export default {
    components: {},
    data() {
      return {
        aceDir: 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-min-noconflict',
        editor: null
      };
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'html'
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const getSource = getSources();
        (typeof window.ace === "undefined" ?
          getSource([`${this.aceDir}/ace.js`, `${this.aceDir}/ext-language_tools.js`])
          :
          Promise.resolve())
          .then(() => {
            window.ace.require('ace/ext/language_tools');
            this.edit = window.ace.edit(this.$el);
            this.edit.getSession().setMode(`ace/mode/${this.type}`);
            this.edit.setOptions({
              enableBasicAutocompletion: !0,
              enableSnippets: !0,
              enableLiveAutocompletion: !0
            });
            this.edit.setValue(this.props)
          });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
