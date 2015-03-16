var t_controllers = " \
{{#each controllers.root}} \
  <div> \
    {{#ifCond this.type '==' 'slider' }} \
      <span> {{@key}} </span> \
      <input class='slider' type='range' min='{{../range.[0]}}' max='{{../range.[1]}}' step='5' value='{{../val}}' name='page' data-name='{{@key}}' data-cid='{{../../container.[0].id}}' /> \
    {{else}} \
      {{#ifCond this.type '==' 'select' }} \
        {{@key}} select \
      {{else}} \
        {{@key}} other \
      {{/ifCond}} \
    {{/ifCond}} \
  </div> \
{{/each}}"

// var t_controllers = " \
// {{#each controllers.root}} \
//   <div> \
//     {{#ifCond this.type '==' 'slider' }} \
//       <span> {{@key}} </span> \
//       <input class='slider' type='text' data-slider-min='{{../range.[0]}}' data-slider-max='{{../range.[1]}}' data-slider-step='5' data-slider-value='{{../val}}' name='page' data-name='{{@key}}' data-cid='{{../../container.[0].id}}' /> \
//     {{else}} \
//       {{#ifCond this.type '==' 'select' }} \
//         {{@key}} select \
//       {{else}} \
//         {{@key}} other \
//       {{/ifCond}} \
//     {{/ifCond}} \
//   </div> \
// {{/each}}"

// var t_controllers = " \
// This was for jquery ui slider
// {{#each controllers.root}} \
//   <div> \
//     {{#ifCond this.type '==' 'slider' }} \
//       <span> {{@key}} </span> \
//       <div class='c_slider' data-slider-min='{{../range.[0]}}' data-slider-max='{{../range.[1]}}' data-slider-step='5' data-slider-value='{{../val}}' name='page' data-name='{{@key}}' data-cid='{{../../container.[0].id}}' /> \
//     {{else}} \
//       {{#ifCond this.type '==' 'select' }} \
//         {{@key}} select \
//       {{else}} \
//         {{@key}} other \
//       {{/ifCond}} \
//     {{/ifCond}} \
//   </div> \
// {{/each}}"

// var t_controllers = " \
// {{#each controller controllers.root}} \
//   <div> \
//     {{#ifCond this.type '==' 'slider' }} \
//       <span> {{@key}} </span> \
//       <input class='slider' type='range' min='{{this.range.[0]}}' max='{{this.range.[1]}}' step='5' value='{{this.val}}' name='page' data-name='{{@key}}' data-cid='{{../../container.[0].id}}' /> \
//     {{else}} \
//       {{#ifCond this.type '==' 'select' }} \
//         {{@key}} select \
//       {{else}} \
//         {{@key}} other \
//       {{/ifCond}} \
//     {{/ifCond}} \
//   </div> \
// {{/each}}"

