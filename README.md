# テトリス for HTML5/JavaScript

たった224行で作られたと紹介されていた[2D tetris game in HTML5 canvas](https://github.com/dionyziz/canvas-tetris)をベースに、勉強のためにいろいろアレンジしたものです。

### [プレイする](https://oekaki-hoho-ron.github.io/Tetris/)

![サムネ](https://oekaki-hoho-ron.github.io/Tetris/thumb.png)

まだ自分でアルゴリズムを考えるのにかなりの時間がかかりますが、欲しい機能リストは考えています。イメージした機能を実装できるかというトレーニングのつもりでやっているので、最終的には多機能テトリスになると思います。

- スマホ対応・レスポンシブ
- 消去後に浮いたままのブロックがあるバグ
- キーボード同時押し対応（回転しながら下移動）
- 全消しボーナス（高得点 or アイテムプレゼント）
- 難易度アップ（一定時間 or ブレイクポイント・on/off機能）
- エマージェンシー（上部5マスまで積もったらBGM変更）
- まとめ消しボーナス（複数列同時消しでコンボボーナス）
- 色揃えボーナス（1列同じ色で揃えたら高得点）
- ポーズ & コンテニュー機能（長期戦だとトイレに行けない）
- ブロックデザインアレンジ（自由にブロック形状をクリックで作れるおまけ機能）
- ジュークボックス（プレイ中にさっと選曲操作できるようチェックボックス式）
- 初期レベル設定（落下速度・マス目を増やす）
- 次のブロック予告表示
- 落下予測地点表示
- ゲームモード選択（スコア・ノルマ・タイム）
	- スコアモード：ノーマルなエンドレスプレイ（廃人用）
	- ノルマモード：消去数を達成したらクリア（ちょこっとプレイ用）
	- タイムモード：難易度ハードで耐久 or 逃げ切り（挑戦用）
- ボーナスアイテム & トラップアイテム
	- 広範囲ブロック消去爆弾
	- 一定時間獲得ポイントUP
	- お邪魔目隠しトラップ
	- 落下速度増減
	- 有利なブロック形状しかこない
	- 予測ブロック千里眼（2~3手先まで見える）
	- 超邪魔な一定時間消えないブロック
	- ブロックの隙間崩し = ほぼ全消しできる
- 読み込みが遅いので要改善（BGMが10MB）
- スコアをTweet（スクショ添付）
- ランキング
- 実績解除（ハイスコア・プレイ回数・全クリ・コレクションアイテム）
- 全クリ特典（ED・エクストラモード・実績）
- RPG要素（スコア貯蓄システム・アイテムショップで便利アイテム購入・セーブデータの概念）
- 通信対戦（これ無理だろ）
