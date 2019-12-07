document.body.onkeydown = function(e){
  let keys = {
    37:'left',    // ←
    39:'right',   // →
    40:'down',    // ↓ 
    38:'rotate',  // ↑
    90:'drop',    // z
    16:'smooth',  // shift
    88:'pose'     // x
  };
  if(typeof keys[e.keyCode] != 'undefined'){
    keyPress(keys[e.keyCode]);
    render();
  }
};
