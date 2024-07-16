/**
 * 層の初期値を入力
 */
const initTargetLayer = () => {
  const presetButtons = document.querySelectorAll(".target-layer-preset");
  const targetLayerInput = document.getElementById("target-layer");

  presetButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const layerCount = parseInt(this.getAttribute("data-layer"), 10);
      if (isNaN(layerCount)) return;

      const layers = new Array(layerCount).fill("0");
      targetLayerInput.value = layers.join(",");
    });
  });
};

/**
 * 指定されたレイヤー配列と数に基づいてパターンを生成する
 * @param {string} name プリセット名
 * @param {number[]} layers 元のレイヤー配列
 * @param {number} count 1にする要素の数
 * @returns {string[]} 生成されたパターンの配列
 */
const generatePattern = (name, layers, count) => {
  const targetIndices = layers.reduce(
    (acc, val, idx) => (val === 1 ? [...acc, idx] : acc),
    []
  );
  const result = new Set();

  const generateCombinations = (start, current) => {
    if (current.length === count) {
      const pattern = new Array(layers.length).fill(0);
      current.forEach((index) => (pattern[index] = 1));

      // 新しいテキスト生成部分
      const positionsText = current.join("-");
      const patternText = `${name}_${positionsText}`;

      result.add(`${patternText}:${pattern.join(",")}`);
      return;
    }

    for (let i = start; i < targetIndices.length; i++) {
      generateCombinations(i + 1, [...current, targetIndices[i]]);
    }
  };

  generateCombinations(0, []);
  return Array.from(result);
};

/**
 * コピーボタン
 */
const initCopyButton = () => {
  const copyButton = document.getElementById("copy");
  const resultElement = document.getElementById("result");

  copyButton.addEventListener("click", function () {
    // result要素の内容を取得
    const content = resultElement.value;

    // 一時的なテキストエリアを作成
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = content;

    // テキストエリアを画面外に配置
    tempTextArea.style.position = "absolute";
    tempTextArea.style.left = "-9999px";
    document.body.appendChild(tempTextArea);

    // テキストを選択してコピー
    tempTextArea.select();
    document.execCommand("copy");

    // 一時的なテキストエリアを削除
    document.body.removeChild(tempTextArea);

    // alert("内容をクリップボードにコピーしました！");
  });
};

//////////////////////
//////////////////////
document.addEventListener("DOMContentLoaded", function () {
  initTargetLayer();
  initCopyButton();

  document.getElementById("submit").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const layersStr = document.getElementById("target-layer").value.split(",");
    const layers = layersStr.map((str) => {
      return parseInt(str, 10);
    });
    const countStr = document.getElementById("combination-count").value;
    const countNum = parseInt(countStr, 10);
    const patterns = generatePattern(name, layers, countNum);

    // 結果表示
    document.getElementById("result").value = patterns.join("\n");
  });
});
