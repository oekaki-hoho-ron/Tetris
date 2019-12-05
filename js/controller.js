document.body.onkeydown = function(e){
  let keys = {
    37:'left',
    39:'right',
    40:'down',
    38:'rotate',
    32:'drop'
  };
  if(typeof keys[e.keyCode] != 'undefined'){
    keyPress(keys[e.keyCode]);
    render();
  }
};
