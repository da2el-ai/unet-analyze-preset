# U-Net Analyze Preset Generator

SuperMerger用の階層調査用プリセットを作成するツール。

[GitHub Page で公開してます。](https://da2el-ai.github.io/unet-analyze-preset/)

```
analyse_0:1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
analyse_1:0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
analyse_2:0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
analyse_3:0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
...
```

複数の層を有効にした全パターンが出力できる。下記は3層の全パターン。

```
analyse_0-1-2:1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
analyse_0-1-3:1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
analyse_0-1-4:1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
...
```

## Update

- 2024.07.16
  - とりあえず作ってみた