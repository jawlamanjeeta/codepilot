
```
codepilot
├─ apps
│  ├─ web
│  │  ├─ components.json
│  │  ├─ middleware.ts
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.ts
│  │  ├─ package.json
│  │  ├─ postcss.config.js
│  │  ├─ public
│  │  │  ├─ favicon.ico
│  │  │  ├─ logo.svg
│  │  │  └─ og-image.png
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  └─ sign-in
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ (dashboard)
│  │  │  │  │  ├─ contests
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  ├─ loading.tsx
│  │  │  │  │  ├─ onboarding
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ practice
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ profile
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ settings
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ topics
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ [topicSlug]
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ (marketing)
│  │  │  │  │  ├─ features
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ pricing
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ analytics
│  │  │  │  │  │  ├─ contests
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ difficulty
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ heatmap
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ overview
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  └─ topics
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ auth
│  │  │  │  │  │  └─ [...nextauth]
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ cron
│  │  │  │  │  │  └─ sync
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  └─ summary
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ handles
│  │  │  │  │  │  ├─ connect
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ route.ts
│  │  │  │  │  │  ├─ validate
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  └─ [id]
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ recommendations
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ submissions
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ sync
│  │  │  │  │  │  ├─ route.ts
│  │  │  │  │  │  └─ [platform]
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ sync-jobs
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  └─ topics
│  │  │  │  │     └─ route.ts
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ common
│  │  │  │  │  ├─ empty-state.tsx
│  │  │  │  │  ├─ error-state.tsx
│  │  │  │  │  ├─ filter-bar.tsx
│  │  │  │  │  ├─ load-sequence.tsx
│  │  │  │  │  ├─ loading-skeleton.tsx
│  │  │  │  │  ├─ page-header.tsx
│  │  │  │  │  ├─ skill-graph-canvas.tsx
│  │  │  │  │  └─ sync-badge.tsx
│  │  │  │  ├─ contests
│  │  │  │  │  ├─ contest-insights.tsx
│  │  │  │  │  ├─ contest-table.tsx
│  │  │  │  │  └─ rating-delta-chart.tsx
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ activity-heatmap.tsx
│  │  │  │  │  ├─ contest-summary.tsx
│  │  │  │  │  ├─ difficulty-distribution.tsx
│  │  │  │  │  ├─ kpi-card.tsx
│  │  │  │  │  ├─ rating-trend-chart.tsx
│  │  │  │  │  ├─ recent-submissions.tsx
│  │  │  │  │  ├─ skill-score-card.tsx
│  │  │  │  │  ├─ strongest-topics.tsx
│  │  │  │  │  └─ weakest-topics.tsx
│  │  │  │  ├─ dashboard-preview.tsx
│  │  │  │  ├─ feature-frame.tsx
│  │  │  │  ├─ final-cta-band.tsx
│  │  │  │  ├─ hero-wireframe.tsx
│  │  │  │  ├─ how-it-works.tsx
│  │  │  │  ├─ interview-readiness.tsx
│  │  │  │  ├─ magnetic-button.tsx
│  │  │  │  ├─ onboarding
│  │  │  │  │  ├─ handle-form.tsx
│  │  │  │  │  ├─ import-progress.tsx
│  │  │  │  │  └─ platform-card.tsx
│  │  │  │  ├─ platform-marquee.tsx
│  │  │  │  ├─ practice
│  │  │  │  │  ├─ daily-plan.tsx
│  │  │  │  │  ├─ problem-list.tsx
│  │  │  │  │  ├─ recommendation-card.tsx
│  │  │  │  │  └─ weekly-roadmap.tsx
│  │  │  │  ├─ scoped-mono-cursor.tsx
│  │  │  │  ├─ site-footer.tsx
│  │  │  │  ├─ site-header.tsx
│  │  │  │  ├─ site-loader.tsx
│  │  │  │  ├─ stats-band.tsx
│  │  │  │  ├─ topics
│  │  │  │  │  ├─ topic-accuracy-chart.tsx
│  │  │  │  │  ├─ topic-breakdown.tsx
│  │  │  │  │  ├─ topic-card.tsx
│  │  │  │  │  └─ topic-grid.tsx
│  │  │  │  └─ ui
│  │  │  ├─ config
│  │  │  │  ├─ charts.ts
│  │  │  │  ├─ navigation.ts
│  │  │  │  └─ platforms.ts
│  │  │  ├─ hooks
│  │  │  │  ├─ use-contests.ts
│  │  │  │  ├─ use-heatmap.ts
│  │  │  │  ├─ use-overview.ts
│  │  │  │  ├─ use-recommendations.ts
│  │  │  │  └─ use-topics.ts
│  │  │  ├─ lib
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ db.ts
│  │  │  │  ├─ env.ts
│  │  │  │  ├─ format.ts
│  │  │  │  ├─ platforms
│  │  │  │  │  ├─ atcoder.ts
│  │  │  │  │  ├─ codeforces.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ leetcode.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  ├─ sync
│  │  │  │  │  └─ runSync.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ styles
│  │  │  │  └─ token.css
│  │  │  └─ types
│  │  │     ├─ index.ts
│  │  │     └─ next-auth.d.ts
│  │  ├─ tailwind.config.ts
│  │  └─ tsconfig.json
│  └─ worker
│     ├─ package.json
│     ├─ src
│     │  ├─ index.ts
│     │  ├─ lib
│     │  │  ├─ db.ts
│     │  │  ├─ env.ts
│     │  │  └─ redis.ts
│     │  └─ queues
│     │     ├─ analytics.queue.ts
│     │     ├─ recommendation.queue.ts
│     │     └─ sync.queue.ts
│     └─ tsconfig.json
├─ package.json
├─ packages
│  ├─ db
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  ├─ migrations
│  │  │  │  ├─ 20260713080719_init_auth_schema
│  │  │  │  │  └─ migration.sql
│  │  │  │  └─ migration_lock.toml
│  │  │  ├─ schema.prisma
│  │  │  └─ seed.ts
│  │  ├─ src
│  │  │  ├─ client.ts
│  │  │  ├─ index.ts
│  │  │  └─ queries
│  │  │     ├─ analytics.ts
│  │  │     ├─ contests.ts
│  │  │     ├─ platform-accounts.ts
│  │  │     ├─ recommendations.ts
│  │  │     ├─ submissions.ts
│  │  │     └─ users.ts
│  │  └─ tsconfig.json
│  ├─ eslint-config
│  │  ├─ base.js
│  │  ├─ next.js
│  │  └─ package.json
│  ├─ shared
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ constants
│  │  │  │  ├─ difficulty-buckets.ts
│  │  │  │  ├─ platforms.ts
│  │  │  │  ├─ score-weights.ts
│  │  │  │  └─ topics.ts
│  │  │  ├─ index.ts
│  │  │  ├─ mappers
│  │  │  │  ├─ atcoder.mapper.ts
│  │  │  │  ├─ codeforces.mapper.ts
│  │  │  │  └─ leetcode.mapper.ts
│  │  │  ├─ schemas
│  │  │  │  ├─ analytics.ts
│  │  │  │  ├─ handle.ts
│  │  │  │  ├─ recommendation.ts
│  │  │  │  └─ sync.ts
│  │  │  ├─ scoring
│  │  │  │  ├─ consistency-score.ts
│  │  │  │  ├─ recommendation-score.ts
│  │  │  │  ├─ skill-score.ts
│  │  │  │  └─ topic-score.ts
│  │  │  ├─ types
│  │  │  │  ├─ analytics.ts
│  │  │  │  ├─ platform.ts
│  │  │  │  ├─ problem.ts
│  │  │  │  ├─ recommendation.ts
│  │  │  │  ├─ submission.ts
│  │  │  │  └─ user.ts
│  │  │  └─ utils
│  │  │     ├─ arrays.ts
│  │  │     ├─ dates.ts
│  │  │     └─ ratings.ts
│  │  └─ tsconfig.json
│  ├─ typescript-config
│  │  ├─ base.json
│  │  ├─ nextjs.json
│  │  ├─ node.json
│  │  └─ package.json
│  └─ ui
│     ├─ package.json
│     ├─ src
│     │  ├─ badge.tsx
│     │  ├─ button.tsx
│     │  ├─ card.tsx
│     │  ├─ dialog.tsx
│     │  ├─ index.ts
│     │  ├─ input.tsx
│     │  └─ tabs.tsx
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ tsconfig.json
└─ turbo.json

```
```
codepilot
├─ apps
│  ├─ web
│  │  ├─ components.json
│  │  ├─ middleware.ts
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.ts
│  │  ├─ package.json
│  │  ├─ postcss.config.js
│  │  ├─ public
│  │  │  ├─ favicon.ico
│  │  │  ├─ logo.svg
│  │  │  └─ og-image.png
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  └─ sign-in
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ (dashboard)
│  │  │  │  │  ├─ contests
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  ├─ loading.tsx
│  │  │  │  │  ├─ onboarding
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ practice
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ profile
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ settings
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ topics
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ [topicSlug]
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ (marketing)
│  │  │  │  │  ├─ features
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ pricing
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ analytics
│  │  │  │  │  │  ├─ contests
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ difficulty
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ heatmap
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ overview
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  └─ topics
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ auth
│  │  │  │  │  │  └─ [...nextauth]
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ cron
│  │  │  │  │  │  └─ sync
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  └─ summary
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ handles
│  │  │  │  │  │  ├─ connect
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  ├─ route.ts
│  │  │  │  │  │  ├─ validate
│  │  │  │  │  │  │  └─ route.ts
│  │  │  │  │  │  └─ [id]
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ recommendations
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ submissions
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  ├─ sync
│  │  │  │  │  │  ├─ route.ts
│  │  │  │  │  │  └─ [platform]
│  │  │  │  │  │     └─ route.ts
│  │  │  │  │  ├─ sync-jobs
│  │  │  │  │  │  └─ route.ts
│  │  │  │  │  └─ topics
│  │  │  │  │     └─ route.ts
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ common
│  │  │  │  │  ├─ empty-state.tsx
│  │  │  │  │  ├─ error-state.tsx
│  │  │  │  │  ├─ filter-bar.tsx
│  │  │  │  │  ├─ load-sequence.tsx
│  │  │  │  │  ├─ loading-skeleton.tsx
│  │  │  │  │  ├─ page-header.tsx
│  │  │  │  │  ├─ skill-graph-canvas.tsx
│  │  │  │  │  └─ sync-badge.tsx
│  │  │  │  ├─ contests
│  │  │  │  │  ├─ contest-insights.tsx
│  │  │  │  │  ├─ contest-table.tsx
│  │  │  │  │  └─ rating-delta-chart.tsx
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ activity-heatmap.tsx
│  │  │  │  │  ├─ contest-summary.tsx
│  │  │  │  │  ├─ difficulty-distribution.tsx
│  │  │  │  │  ├─ kpi-card.tsx
│  │  │  │  │  ├─ rating-trend-chart.tsx
│  │  │  │  │  ├─ recent-submissions.tsx
│  │  │  │  │  ├─ skill-score-card.tsx
│  │  │  │  │  ├─ strongest-topics.tsx
│  │  │  │  │  └─ weakest-topics.tsx
│  │  │  │  ├─ dashboard-preview.tsx
│  │  │  │  ├─ feature-frame.tsx
│  │  │  │  ├─ final-cta-band.tsx
│  │  │  │  ├─ hero-wireframe.tsx
│  │  │  │  ├─ how-it-works.tsx
│  │  │  │  ├─ interview-readiness.tsx
│  │  │  │  ├─ magnetic-button.tsx
│  │  │  │  ├─ onboarding
│  │  │  │  │  ├─ handle-form.tsx
│  │  │  │  │  ├─ import-progress.tsx
│  │  │  │  │  └─ platform-card.tsx
│  │  │  │  ├─ platform-marquee.tsx
│  │  │  │  ├─ practice
│  │  │  │  │  ├─ daily-plan.tsx
│  │  │  │  │  ├─ problem-list.tsx
│  │  │  │  │  ├─ recommendation-card.tsx
│  │  │  │  │  └─ weekly-roadmap.tsx
│  │  │  │  ├─ scoped-mono-cursor.tsx
│  │  │  │  ├─ site-footer.tsx
│  │  │  │  ├─ site-header.tsx
│  │  │  │  ├─ site-loader.tsx
│  │  │  │  ├─ stats-band.tsx
│  │  │  │  ├─ topics
│  │  │  │  │  ├─ topic-accuracy-chart.tsx
│  │  │  │  │  ├─ topic-breakdown.tsx
│  │  │  │  │  ├─ topic-card.tsx
│  │  │  │  │  └─ topic-grid.tsx
│  │  │  │  └─ ui
│  │  │  ├─ config
│  │  │  │  ├─ charts.ts
│  │  │  │  ├─ navigation.ts
│  │  │  │  └─ platforms.ts
│  │  │  ├─ hooks
│  │  │  │  ├─ use-contests.ts
│  │  │  │  ├─ use-heatmap.ts
│  │  │  │  ├─ use-overview.ts
│  │  │  │  ├─ use-recommendations.ts
│  │  │  │  └─ use-topics.ts
│  │  │  ├─ lib
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ db.ts
│  │  │  │  ├─ env.ts
│  │  │  │  ├─ format.ts
│  │  │  │  ├─ platforms
│  │  │  │  │  ├─ atcoder.ts
│  │  │  │  │  ├─ codeforces.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ leetcode.ts
│  │  │  │  │  └─ types.ts
│  │  │  │  ├─ sync
│  │  │  │  │  └─ runSync.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ styles
│  │  │  │  └─ token.css
│  │  │  └─ types
│  │  │     ├─ index.ts
│  │  │     └─ next-auth.d.ts
│  │  ├─ tailwind.config.ts
│  │  └─ tsconfig.json
│  └─ worker
│     ├─ package.json
│     ├─ src
│     │  ├─ index.ts
│     │  ├─ lib
│     │  │  ├─ db.ts
│     │  │  ├─ env.ts
│     │  │  └─ redis.ts
│     │  └─ queues
│     │     ├─ analytics.queue.ts
│     │     ├─ recommendation.queue.ts
│     │     └─ sync.queue.ts
│     └─ tsconfig.json
├─ package.json
├─ packages
│  ├─ db
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  ├─ migrations
│  │  │  │  ├─ 20260713080719_init_auth_schema
│  │  │  │  │  └─ migration.sql
│  │  │  │  └─ migration_lock.toml
│  │  │  ├─ schema.prisma
│  │  │  └─ seed.ts
│  │  ├─ src
│  │  │  ├─ client.ts
│  │  │  ├─ index.ts
│  │  │  └─ queries
│  │  │     ├─ analytics.ts
│  │  │     ├─ contests.ts
│  │  │     ├─ platform-accounts.ts
│  │  │     ├─ recommendations.ts
│  │  │     ├─ submissions.ts
│  │  │     └─ users.ts
│  │  └─ tsconfig.json
│  ├─ eslint-config
│  │  ├─ base.js
│  │  ├─ next.js
│  │  └─ package.json
│  ├─ shared
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ constants
│  │  │  │  ├─ difficulty-buckets.ts
│  │  │  │  ├─ platforms.ts
│  │  │  │  ├─ score-weights.ts
│  │  │  │  └─ topics.ts
│  │  │  ├─ index.ts
│  │  │  ├─ mappers
│  │  │  │  ├─ atcoder.mapper.ts
│  │  │  │  ├─ codeforces.mapper.ts
│  │  │  │  └─ leetcode.mapper.ts
│  │  │  ├─ schemas
│  │  │  │  ├─ analytics.ts
│  │  │  │  ├─ handle.ts
│  │  │  │  ├─ recommendation.ts
│  │  │  │  └─ sync.ts
│  │  │  ├─ scoring
│  │  │  │  ├─ consistency-score.ts
│  │  │  │  ├─ recommendation-score.ts
│  │  │  │  ├─ skill-score.ts
│  │  │  │  └─ topic-score.ts
│  │  │  ├─ types
│  │  │  │  ├─ analytics.ts
│  │  │  │  ├─ platform.ts
│  │  │  │  ├─ problem.ts
│  │  │  │  ├─ recommendation.ts
│  │  │  │  ├─ submission.ts
│  │  │  │  └─ user.ts
│  │  │  └─ utils
│  │  │     ├─ arrays.ts
│  │  │     ├─ dates.ts
│  │  │     └─ ratings.ts
│  │  └─ tsconfig.json
│  ├─ typescript-config
│  │  ├─ base.json
│  │  ├─ nextjs.json
│  │  ├─ node.json
│  │  └─ package.json
│  └─ ui
│     ├─ package.json
│     ├─ src
│     │  ├─ badge.tsx
│     │  ├─ button.tsx
│     │  ├─ card.tsx
│     │  ├─ dialog.tsx
│     │  ├─ index.ts
│     │  ├─ input.tsx
│     │  └─ tabs.tsx
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ tsconfig.json
└─ turbo.json

```