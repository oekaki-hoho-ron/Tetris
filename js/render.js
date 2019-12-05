let canvas = document.getElementsByTagName('canvas')[0]; // 書き出す<canvas>タグを指定
let ctx = canvas.getContext('2d'); // canvasのメソッドを読み込み
let W = 300,H = 600; // ボードサイズ
let BLOCK_W = W / COLS,BLOCK_H = H / ROWS; // ボードマス目数

function drawBlock(x,y){ // 1マスブロックを描画する方法として
  ctx.fillRect(BLOCK_W * x,BLOCK_H * y,BLOCK_W,BLOCK_H); // 1マス分の正方形を塗り(x座標,y座標,幅,高さ)
  ctx.strokeRect(BLOCK_W * x,BLOCK_H * y,BLOCK_W - 1,BLOCK_H - 1); // 1マス分の正方形の枠線を描画
}

function grid(){ // マス目の描画するために
  for(let y=0; y<ROWS; ++y){ // 20行を網羅し
    for(let x=0; x<COLS; ++x){ // 10列を網羅して
      ctx.strokeStyle = '#455A64'; // 薄いグレーの線で
      ctx.strokeRect(BLOCK_W * x,BLOCK_H * y,BLOCK_W,BLOCK_H); // 現在マスの枠線を描画
    }
  }
}

function render(){ // ボードとブロックを描画
  ctx.clearRect(0,0,W,H); // ボードの（x座標,y座標,ボード幅,ボード高さ）つまり全体をクリアして
  grid(); // まずはマス目を描画し
  ctx.strokeStyle = '#455A64'; // 薄いグレーの線で
  for(let x=0; x<COLS; ++x){ // 10列を網羅し
    for(let y=0; y<ROWS; ++y){ // 20行を網羅して
      if(board[y][x]){ // 現在マスのボードのマス目（[y行目][x列目]）に
        ctx.fillStyle = colors[board[y][x] - 1]; // ?の塗り色で（colors[?]から塗り色をランダム選出してる？）
        drawBlock(x,y);    // 1マスブロックを描画
      }
    }
  }
  ctx.strokeStyle = '#455A64'; // 落下中ブロック枠色
  for(let y=0; y<4; ++y){ // 4x4の4行を網羅し
    for(let x=0; x<4; ++x){ // 4x4の列を網羅して
      if(current[y][x]){ // 落下中ブロックのマス目（[y行目][x列目]）に
        ctx.fillStyle = colors[current[y][x] - 1]; // ?の塗り色で（colors[?]から塗り色をランダム選出してる？）
        drawBlock(currentX + x,currentY + y); // 
      }
    }
  }
}
