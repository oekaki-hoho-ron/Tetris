let COLS = 10,ROWS = 20; // ボードのマス目サイズ設定
let board = [];

let interval;
let intervalRender;

let current; // 落下中ブロック
let currentX,currentY; // 落下中ブロック位置
let freezed; // ボードとブロックの当たり判定変数（true,false）
let lose; // 負け判定変数（true,false）
let score = '0'; // スコア

let colors = ['#7fbfff','#ffbf7f','#7fffff','#ffff7f','#ff7f7f','#7fffbf','#bf7fff']; // 落下ブロック色パターン
let shapes = [ // 落下ブロック形状パターン
  [0,0,0,0,
   1,1,1,1,
   0,0,0,0,
   0,0,0,0],
  
  [0,0,0,0,
   0,1,1,1,
   0,1,0,0,
   0,0,0,0],
  
  [0,0,0,0,
   1,1,1,0,
   0,0,1,0,
   0,0,0,0],
  
  [0,0,0,0,
   0,1,1,0,
   0,1,1,0,
   0,0,0,0],
  
  [0,0,0,0,
   0,1,1,0,
   0,0,1,1,
   0,0,0,0],
  
  [0,0,0,0,
   0,1,1,0,
   1,1,0,0,
   0,0,0,0],
  
  [0,0,0,0,
   0,1,0,0,
   1,1,1,0,
   0,0,0,0]
];

function newBlock(){ // グローバル変数currentに新しい4x4シェイプを作成。形状が回転したときにサイズをカバーする4x4。
  let id = Math.floor(Math.random() * shapes.length); // shapes配列数以下の整数をランダム生成（shapes[0~6]）
  let shape = shapes[id]; // 落下ブロック形状をランダムidによって生成
  current = []; // 落下中ブロック用の配列を用意
  for(let y=0; y<4; ++y){ // 4x4の4行を網羅して
    current[y] = []; // とりあえず空にしとく
      for(let x=0; x<4; ++x){ // 4x4の4列を網羅して
        let i = 4 * y + x; // 4x4をfor文で巡回中の今n/16番目かを格納する変数
        if(typeof shape[i] != 'undefined' && shape[i]){ // 4x4の現在のマス目のデータ型がundefinedかつshape[i]でないとき
        current[y][x] = id + 1; // 
      }else{
        current[y][x] = 0;
      }
    }
  }
  freezed = false; // 落下中ブロックの固定 = 偽
  currentX = 3; // 落下ブロック発生位置
  currentY = -1; // 落下ブロック発生位置
}

function init(){    // ボードの初期化
  for(let y=0; y<ROWS; ++y){    // 行の網羅
    board[y] = [];    // とりあえず空にしとく
    for(let x=0; x<COLS; ++x){    // 列を網羅
      board[y][x] = 0;    // 現在のマス目を空白として描画
    }
  }
}

function tick(){ // 1フレームごとの処理として
  document.getElementById('tick_se').currentTime = 0;
  document.getElementById('tick_se').play();
  if(valid(0,1)){
    ++currentY;
  }
  else{
    freeze(); // 落下ブロックを床で固定
    valid(0,1);
    clearLines();
    if(lose){ // 
      clearAllIntervals();
      return false;
    }
    newBlock();
  }
}

function freeze(){ // 落下ブロックを床で固定
  for(let y=0; y<4; ++y){
    for(let x=0; x<4; ++x){
      if(current[y][x]){
        board[y + currentY][x + currentX] = current[y][x];
      }
    }
  }
  freezed = true;
}

function rotate(current){ // 戻りは、回転した形状「現在」を反時計回りに垂直に回転させます
  let newCurrent = [];
  for(let y=0; y<4; ++y){
    newCurrent[y] = [];
    for(let x=0; x<4; ++x){
      newCurrent[y][x] = current[3 - x][y];
    }
  }
  return newCurrent;
}

function clearLines(){ // 行が埋められているかどうかを確認し、それらをクリアします
  for(let y=ROWS-1; y>=0; --y){
    let rowFilled = true;
    for(let x=0; x<COLS; ++x){
      if(board[y][x] == 0){
        rowFilled = false;
        break;
      }
    }
    if(rowFilled){
      document.getElementById('clear_se').play();
      player.score += 100; // 1列消したらスコア+100点
      player.erase += 1; // 1列消したら消去数+1段
      updateScore(); // 現在の獲得スコアを表示
      for(let yy=y; yy>0; --yy){
        for(let x=0; x<COLS; ++x){
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y;
    }
  }
}

function keyPress(key){ // キーコンフィグとSE
  if(lose == false){ // ゲーム中の場合キー操作可能
    switch(key){
      case 'left': // 左移動キー
        document.getElementById('key_se').currentTime = 0;
        document.getElementById('key_se').play();
        if(valid(-1)){
          --currentX;
        }
        break;
      case 'right': // 右移動キー
        document.getElementById('key_se').currentTime = 0;
        document.getElementById('key_se').play();
        if(valid(1)){
          ++currentX;
        }
        break;
      case 'down': // 下移動キー
        document.getElementById('key_se').currentTime = 0;
        document.getElementById('key_se').play();
        if(valid(0,1)){
          ++currentY;
        }
        break;
      case 'rotate': // 回転キー
        document.getElementById('key_se').currentTime = 0;
        document.getElementById('key_se').play();
        let rotated = rotate(current);
        if(valid(0,0,rotated)){
          current = rotated;
        }
        break;
      case 'drop': // 強制落下キー
        document.getElementById('drop_se').currentTime = 0;
        document.getElementById('drop_se').play();
        while(valid(0,1)){ // 床当たり判定があるまで繰り返す
          ++currentY; // y移動
          player.score += 1; // スコア+1点（高所から強制落下するほどwhileが回って高得点）
          updateScore(); // スコア表示更新
        }
        tick(); // 強制落下でtickのタイミングがずれたので初期化
        break;
    }
  }else if(lose == false){ // スタート前およびゲームオーバー中はキー操作不可
  }
}

function gameOver(){ // ゲームオーバー画面を表示する方法として
  if(lose == true){ // lose変数が真のとき
    document.getElementById('play_bgm').pause(); // BGM停止
    document.getElementById("judge").textContent = '終了'; // ゲームオーバー画面を表示
    canvas.style.background = '#f44'; // ゲームオーバーの赤画面エフェクトを描画
    document.getElementById('lose_se').play(); // ゲームオーバーSEを再生
    document.getElementById('playbutton').style.animation = 'buttonFlash 1s linear infinite'; // ゲームオーバーしたらPlayボタン点滅再開
    clearInterval(); // 秒数タイマー停止
  }else if(lose == false){ // lose変数が真でないとき
    document.getElementById("judge").textContent = ""; // ボード上に何も（OP画面も）表示しない
  }
}

function valid(offsetX,offsetY,newCurrent){ // 現在の形状の結果の位置が実現可能かどうかをチェックします
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;

  for(let y=0; y<4; ++y){
    for(let x=0; x<4; ++x){
      if(newCurrent[y][x]){
        if(
          typeof board[y + offsetY] == 'undefined'
          || typeof board[y + offsetY][x + offsetX] == 'undefined'
          || board[y + offsetY][x + offsetX]
          || x + offsetX < 0
          || y + offsetY >= ROWS
          || x + offsetX >= COLS){
            if(offsetY == 0 && freezed){ // ボード最上部で落下ブロックが固定されたら
              lose = true; // 負け判定を真にして
              document.getElementById('playbutton').disabled = false;    // Playボタンを初期化して
              gameOver(); // 「負け」判定を表示
            } 
            return false;
          }
        }
      }
    }
    return true;
}


function newGame(){ // 新しくゲーム開始する方法として
  document.getElementById('lose_se').volume = 0.5; // サウンド音量調整
  document.getElementById('key_se').volume = 0.5;
  document.getElementById('drop_se').volume = 0.5;
  document.getElementById('clear_se').volume = 0.3;
  document.getElementById('tick_se').volume = 0.2;
  document.getElementById('start_se').play(); // ゲーム開始SE
  document.getElementById('play_bgm').currentTime = 0; // BGM再生位置を頭出し
  document.getElementById('play_bgm').play(); // BGM再生
  document.getElementById("playbutton").disabled = true; // Playボタンが初期化される
  document.getElementById('playbutton').style.animation = 'none'; // ゲームプレイ中はPlayボタンは点滅しない
  player.score = 0; // 獲得スコアを初期化
  updateScore(); // 獲得スコア表示を初期化
  sec = 0; // 秒数タイマーのカウントを初期化
  document.getElementById('timer').innerHTML = sec + '秒'; // 秒数タイマーの表示を初期化
  count(); // 秒数タイマー動作開始
  lose = false; // lose変数を偽に戻す
  gameOver(); // lose = falseなのでゲームオーバー画面を消去
  canvas.style.background = '#566b75'; // ボード色を初期化
  init(); // ボードを初期化
  clearAllIntervals(); // tick再起動
  intervalRender = setInterval(render,30);
  newBlock(); // 落下ブロック生成を開始
  interval = setInterval(tick,500); // tickカウント開始
}

function clearAllIntervals(){ // タイマー再起動する方法として
  clearInterval(interval);
  clearInterval(intervalRender);
}





const player = { // 他のプロパティつかうことあるかな？
  pos:{x:0, y:0},
  matrix:null,
  score:0, // 現在の獲得スコア
  erase:0 // 消去した段数
}

function updateScore() { // スコア更新
    document.getElementById('score').innerText = player.score + '点'; // スコア欄に現在の獲得スコアを表示
    document.getElementById('erase').innerText = player.erase + '段';
}


let sec = 0; // 累積経過時間の変数
function count(){ // 秒数タイマーを動作させるなら
  function timer(){ // 秒数タイマーを表示するなら
    sec++;   // カウントアップ
    if(lose == false){ // ゲームプレイ中は
      document.getElementById('timer').innerHTML = sec + '秒'; // 秒数タイマー欄に現在の秒数を表示
    }else if(lose == true){ // ゲームオーバーになったら
      clearInterval(timerStart); // 秒数タイマーを止める
    }
  }
  const timerStart = setInterval(timer,1000); // 1秒おきにカウントアップして秒数タイマー欄に表示する関数を実行
}