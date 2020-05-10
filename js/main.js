'use strict'

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
  let currentIndex = 0; // 何番目の画像かを保持する変数

  // メインの画像
  const mainImage = document.getElementById('main'); //表示領域mainImageを設定、main代入
  mainImage.src = images[currentIndex]; //src属性にimagesのcurrentIndex番目を代入

  //imagesの配列の要素分だけループ
  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    if (index === currentIndex) {
      li.classList.add('current'); //currentクラス付与で色を濃くする
    }
    li.addEventListener('click', () => {
      mainImage.src = image; //クリックしたらメイン画像のソース属性変更
      //クリック後currentクラスの移動で色を濃くする
      const thumbnails = document.querySelectorAll('.thumbnails > li'); //li要素全て取得
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index; //クリックされたイメージは何番目か
      thumbnails[currentIndex].classList.add('current');
    });

    li.appendChild(img); //子要素にimg追加
    document.querySelector('.thumbnails').appendChild(li); //ulの子要素にli追加
  });
  // 次へボタン
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) { // 最後の画像へいったら0に戻る
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click(); //.clickでクリックされた時の処理を実行
  });
  // 前へボタン
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) { // 最後の画像へいったら0に戻る
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click(); //.clickでクリックされた時の処理を実行
  });

  let timeoutId;

  // playボタン（スライドショー再生）とPauseボタン（停止）
  function playSlidershow() {
    timeoutId = setTimeout(() => {
      next.click(); //次へをクリックしたときと同じ処理
      playSlidershow(); // 一定時間ごとに繰り返す
    }, 1000); // 1000ミリ秒＝1秒
  }

  let isPlaying = false; // 条件分岐するための変数 最初は停止なのでfalse

  const play = document.getElementById('play'); // id play代入
  play.addEventListener('click', () => { //クリックしたら次の処理をする
    if (isPlaying === false) { //クリックしたときfalse(停止)だったら再生開始
      playSlidershow(); // 関数(一定時間ごとにスライド)
      play.textContent = 'Pause'; //playボタンのテキストをPauseボタンに変更
    } else { //isPlayingがtrueだった時の処理
      clearTimeout(timeoutId); //返り値を受け取りsetTimeoutで開始した処理を止める
      play.textContent = 'Play'; // PlayのtextContentを「Play」に戻す
    }
    isPlaying = !isPlaying; // 否定の演算子を使い値を反転
  });
}