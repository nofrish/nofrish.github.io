---
title: 新时代的团队协作
date: 2026-06-18 06:13:00 +0800
categories:
  - 随机思考
tags:
  - 创业
  - 技术
---
<style>
.language-plaintext .code-header {
  display: none;
}

.language-plaintext .highlight {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
</style>

### 序言

这篇笔记的题目虽然很大，但我只想从工作中遇见的和实践的一些事件出发，来讲讲最近半年以来针对团队协作这个话题的一些想法。
针对团队协作这件事情，我的第一个观点是[应该尽可能减少团队协作](https://nofrish.me/posts/random-thoughts-002/)，团队协作很多时候会带来巨大的损耗，特别是当团队成员之间的能力存在明显差异的时候。但现实是团队协作在很多场景下不可避免，所以这篇文章就想来讨论下：我们应该做些什么，才能够提高团队协作的效率。

我们团队已经在发生的一个趋势是，几乎所有人的工作都是依赖 AI Agent 完成的，因此当我需要跟别人协作时，更像是我的 Agent 需要跟别人的 Agent 来协作。
作为协作的发起方，需要充分意识到自己是在给对方的 Agent 写一份**协作任务的提示词说明**，让对方可以把这份提示词复制到跟 Agent 的对话里即可开始任务。而不是在自己没有想清楚的情况下，就发送一两条消息给对方，期望对方驱动来确认各种细节。更不是自己糊里糊涂地跟 AI 聊了一大堆东西，在自己没有充分理解，也无法充分甄别的情况下就发给对方，把本来属于自己该做好的工作通过这种方式移交给了别人。

举几个我自己做得好的地方吧。
### 示例
#### 跟非技术同学的协作

我们团队有增长的同学，有时候会期望查询一些用户的基本信息，想要给对方发优惠券或者做一些召回的动作，但是我们的管理系统可能并不支持他的某些条件的查询。然后增长同学会给我提需求，我会开发接口，最后我的交付物就是下面这些话：

>**把下面两个接口给你的 CC，它会知道怎么做：**
>
>```
># 查询邮箱对应的 user_id
>curl 'https://xxx.xxx.xxx/api/xxx/xxx/xxx/profile?email=xxx@gmail.com'
>
># 通过 user_id 去查询用户的订阅信息
>curl -sS -X POST 'https://xxx.xxx.xxx/api/xxx/xxx/xxx/users/info' \
>    -H 'Authorization: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
>    -H 'Content-Type: application/json' \
>    -d '{"user_id":2503075833}'
>```

>**把下面这段内容给你的 claude code ，它会知道怎么办**  
>
>```
>curl -H "Authorization: xxx" "https://xxx.xxx.xxx/api/xxx/xxx/xxxappsumo/users"
>
>带参数的用法（只返回 2024-03-10 之后激活的用户，最多 50 条）：
>curl -H "Authorization: xxx" \
>    "https://xxx.xxx.xxx/api/xxx/xxx/xxxappsumo/users?activated_after=1710000000&limit=50"
>```

#### 跟技术同学的协作

我作为一个后端开发，很多时候要跟前端同学来协作（有些人会直接 vibe coding 前端的东西，对此我比较排斥，因为在我完全不懂前端的情况下，我只能 vibe coding 出一个 demo 来，而对于前端同学原本的代码结构，可能会造成难以修复的破坏），如果我开发了一个功能，让前端来跟我协作时，我会发一段类似的话：

>项目：`remio-subscription-manager`<br>
>分支：`release/260610/airwallex-payment-integration`<br>
>文档：`docs/tasks/20260422-airwallex-payment-integration/frontend-payment-checkout-migration.md`

这篇文档也是我让 AI 阅读了前端的代码，并根据我后端的代码来确认前端代码可能要如何调整，专门针对这次任务给前端同学写的。前端同学在拿到这些信息后，就可以非常方便地给自己的 Agent 安排任务了。

#### 跟创始人的协作

我们团队的创始人也是技术出生，我比较欣赏他的一点是，尽管曾经身居高位，但现在创业还会自己在一线写代码，而且能够自己处理的事情，几乎都自己处理。
上次他要新作一个功能，想要在服务器上写一组接口，我跟他说我已经有一组类似的接口了，稍微改造一下就可以给他用，我给他的消息是这样的：

>关于 aapp 删除，代码我部署到线上了，也推到仓库了，基本信息如下。<br>
>之前实现了 admin 的删除，我测试过，现在新增了用户认证的删除，只做了单元测试，线上接口我没有测试过。
>
>**代码在分支：** `release/260506/aapp-admin-archive`<br>
>**提交：** `64c6490 支持用户和管理员下架 aapp`
>
>**关键文件说明：**
>
>`cmd/server/main.go`看路由注册：
>
>- 用户删除自己的 aapp：`DELETE /api/v1/aapps/:app_id`
>- 用户删除自己的版本：`DELETE /api/v1/aapps/:app_id/versions/:version`
>- 管理员删除任意 aapp：`DELETE /api/v1/admin/aapps/:app_id`
>- 管理员删除任意版本：`DELETE /api/v1/admin/aapps/:app_id/versions/:version`
>
>`internal/handler/user_aapps_handler.go`
>
>用户侧删除入口。通过认证后的 AUID 作为 developer_user_id，所以用户只能删自己的 aapp/版本。
>
>`internal/handler/admin_aapps_handler.go`
>
>管理员侧删除入口。管理员可删除任意 aapp/版本，user_id query 兼容保留；不传时会通过 app_id 查 owner。
>
>`internal/db/store.go`
>
>核心归档逻辑：
>
>- `ArchiveAapp`
>- `ArchiveAappVersion`
>
>这里实际执行把 aapps / aapp_versions 移到 archived_aapps / archived_aapp_versions。
>
>`internal/authctx/authctx.go`<br>
>`internal/middleware/request_authz.go`<br>
>`internal/middleware/admin_auth.go`
>
>两套认证体系：
>
>- 用户认证：`RequestAuthz`
>- 管理员认证：`AdminAuth`
>- 都会写入统一 principal，handler 从这里拿当前操作人。
>
>**测试文件：**
>
>- `internal/handler/user_aapps_handler_test.go`
>- `internal/handler/admin_aapps_handler_test.go`
>- `internal/middleware/request_authz_test.go`
>- `internal/middleware/admin_auth_test.go`
>- `internal/db/aapp_archive_test.go`
>
>**全量测试已通过**

### 结语

现在回看我上面所写的例子，仿佛再日常不过，以至于我现在写出来的时候，都不觉得有什么值得说道的地方。

AI Agent 的出现，让很多人突然具备了某种过去并不具备的行动能力。它可以帮你写代码，帮你查资料，帮你整理方案，甚至帮你生成一份看起来相当完整的交付物。但也正因为如此，它很容易制造出一种幻觉：**仿佛只要结果被生成出来，自己就已经理解了问题**。

最近我看到一句话，大意是：**思考可以被替代，但理解不能被替代**。我很认同这个说法。AI 可以替你完成很多推演、搜索、整理和表达，但它不能替你承担理解之后的责任。你如果没有真正理解问题，就很难判断 AI 的回答哪里是对的，哪里是错的，哪里只是看起来合理，哪里会在真实系统里造成麻烦。更进一步说，真实实践中需要的往往不是一个“完整方案”，而是一个适合当前场景的**“带着偏见的方案”**。AI 可以把各种可能性铺得很满，但你必须基于自己对业务、系统、团队和阶段的理解，判断哪些东西应该保留，哪些东西应该放弃，哪些取舍在当下最重要。

所以在新的协作方式里，我觉得最需要警惕的一件事是：**不要因为自己用了 AI Agent，就把思考的成本转嫁给 AI，把理解的成本转嫁给同事**。AI 可以帮你把事情推进得更快，但它不能替你完成那个最关键的动作：**你自己先成为一个真正理解问题的人**。

但在我看来，就这么简单的事情，要做好也并不容易。

它要求你**真正理解问题**，而不是只转述问题；它要求你**主动替对方铺路**，而不是把沟通成本丢给对方；它要求你**熟悉 AI Agent 的工作方式**，而不是只把 AI 当作一个聊天窗口；它要求你**清楚自己的责任边界**，而不是等别人发现遗漏之后再被动补救。

这看起来只是一次交接，实际上考验的是一个人**对问题的理解，对他人的体谅，对工具的掌控，以及对责任的承担**。

让我们都为团队协作效率的提升，做出自己那一部分必要的努力吧。
