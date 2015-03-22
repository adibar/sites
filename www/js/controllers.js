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


// var t_image_selector = ' \
// <div id="image-manager"> \
//   <div id="image-manager-header"> \
//     <button type="button" class="btn btn-default"> \
//       Upload New Image \
//       <span class="glyphicon glyphicon-upload" aria-hidden="true" style="top:0px;"></span> \
//     </button> \
//     <button type="button" class="btn btn-default"> \
//       Insert selected \
//       <span class="glyphicon glyphicon-ok-sign" aria-hidden="true" style="top:0px;"></span> \
//     </button> \
//     <button type="button" class="btn btn-default"> \
//       Edit selected \
//       <span class="glyphicon glyphicon-edit" aria-hidden="true" style="top:0px;"></span> \
//     </button> \
//   </div> \
//   <div id="image-manager-image-list"> \
//     \
//   </div> \
// </div>'


