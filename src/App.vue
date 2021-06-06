<template>
    <div>
        <div>
            <span>Html</span>
            <span>javaScript</span>
        </div>
        <Editor type="html" />
        <Editor type="javascript" />
    </div>
</template>
<script>
    import Editor from "./components/Editor";
    export default {
      name: 'EditorRun',
      comments: {
        Editor
      },
      data() {
        return {}
      }
    }
</script>