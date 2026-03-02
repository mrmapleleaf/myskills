# CLAUDE.md

このファイルは、リポジトリのコードを扱う際に Claude Code (claude.ai/code) へのガイダンスを提供します。

## コマンド

```bash
# 開発
npm run dev        # 開発サーバーを http://localhost:3000 で起動

# 本番
npm run build      # 本番用ビルド
npm run preview    # 本番ビルドのプレビュー
npm run generate   # 静的サイト生成

# Docker
docker compose up  # Docker Compose で実行（mrmapleleaf/myskills:latest を使用）
```

## アーキテクチャ

**スタック:** Nuxt 4 + Vue 3 (Composition API) + TypeScript + Supabase + Chart.js

**目的:** 3つのスキルカテゴリ（言語、ツール、フレームワーク）にわたる業務経験を棒グラフで可視化するスキルポートフォリオダッシュボード。

### 主要ファイル

- `nuxt.config.ts` — Supabase モジュール設定、ルートリダイレクト（`/` → `/myskills`）、環境変数のランタイム設定
- `chartConfig.js` — 3つのチャートコンポーネント共通の Chart.js オプション（y軸最大値: 5）
- `app/types/my_skill.ts`, `app/types/skill_tag.ts` — Supabase テーブル行の TypeScript 型定義
- `app/pages/myskills/index.vue` — 唯一のページ。3つのチャートコンポーネントをグリッドで表示
- `app/components/{Lang,Tool,Framework}SkillChart.vue` — スキルカテゴリごとのコンポーネント

### データフロー

各チャートコンポーネントは以下の処理を行います:
1. `useSupabaseClient()` で Supabase クライアントを取得
2. `useAsyncData()` で `skill_tag_id`（1=言語、2=ツール、3=フレームワーク）でフィルタリングして `my_skill` テーブルからデータ取得
3. `computed()` プロパティで結果を Chart.js データセットに変換
4. SSR ハイドレーションのミスマッチを防ぐため `<ClientOnly>` でラップした `<Bar>` チャートをレンダリング

### 環境変数

```
NUXT_PUBLIC_SUPABASE_URL=   # Supabase プロジェクト URL
NUXT_PUBLIC_SUPABASE_KEY=   # Supabase anon/public キー
```

どちらも `nuxt.config.ts` の `runtimeConfig.public` 経由でブラウザに公開されます。

### デプロイ

GitHub Actions（`.github/workflows/docker-publish.yml`）が `main` へのプッシュ時に自動でマルチプラットフォーム Docker イメージ（`linux/amd64`、`linux/arm64`）をビルドして Docker Hub（`mrmapleleaf/myskills`）にプッシュします。
