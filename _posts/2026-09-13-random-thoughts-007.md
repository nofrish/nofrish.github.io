---
title: From Code Review to Concept Review
date: 2026-09-13 10:00:00 +0800
categories:
  - 随机思考
tags:
  - 技术
  - AI
---

最近业界开始讨论一个新的变化：**Code Review 这件事情已经做不过来了。**

我自己也越来越有这种感觉。现在很多人工 Code Review，本质上只是让工程师充当一个 Meat Proxy：把一个大模型生成的代码交给另一个大模型检查，再把检查结果交回去修改。人在这个过程中并没有真正理解代码，也没有做出多少判断，只是负责在不同的 AI 之间搬运信息。

过去一个需求可能需要开发两天，然后花半个小时进行 Code Review。现在 AI 可以在很短时间内生成几千行代码，但人理解代码的速度并没有同步提高。**代码已经不再是稀缺资源了，能够理解和判断这些代码的人才是。**

## 人已经 Review 不过来了

这是一个非常直接的吞吐量问题。只要 AI 继续变快，人工 Code Review 就一定会成为开发流程的瓶颈。如果所有代码都需要人进行同等强度的 Review，我们只是在用人类最有限的注意力，追赶一种几乎可以无限供应的资源。

这并不意味着 Code Review 毫无价值。权限、安全、并发和数据迁移等高风险代码仍然值得认真检查。但代码格式、常见缺陷、局部逻辑和测试覆盖，可以越来越多地交给静态检查、自动化测试和 AI Review。**人不应该和 AI 比谁能看完更多代码，而应该去判断那些 AI 无法替团队决定的事情。**

## Review 不能消失

Linus Torvalds 曾经说过：

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships.
>
> 糟糕的程序员关心代码，好的程序员关心数据结构以及它们之间的关系。

有了 AI 以后，这句话变得更加重要。

如果一个业务场景的抽象是错误的，AI 仍然可以把代码写得非常“正确”。它会围绕错误的数据结构增加映射、同步、分支和特殊逻辑，再通过测试证明这些代码确实按照我们的要求运行。

但代码能够运行，不代表我们对问题的理解是对的；测试能够证明代码遵守了已经写下来的规则，也不能证明这些规则本身是合理的。

**AI 是概念的放大器。好的抽象会被它迅速转化成清晰的系统，错误的抽象也会被它以同样的速度贯彻到系统的每一个角落。**

所以 Review 不能消失，只是需要从实现层继续向上移动。我们需要 Review 领域模型是否合理，数据关系是否清楚，模块边界有没有被打破，以及一个新需求究竟是在扩展系统能力，还是在给现有流程增加补丁。

我把这套统一的东西叫做 **Concept Review**。

## 从代码差异到概念差异

Concept Review 真正改变的是 Review 的基本单位：**Code Review 关心哪些代码发生了变化，Concept Review 关心这些代码让系统的概念、关系和边界发生了什么变化。**

这并不意味着 Reviewer 要自己从几千行代码中寻找答案，否则它仍然只是换了名字的 Code Review。AI 在完成实现以后，还应该把代码变化重新翻译成人能够理解的概念变化：哪些领域概念被修改，哪些数据结构和关系发生变化，哪些业务规则和模块边界受到影响。

在开发之前，人和 AI 先明确预期的概念变化；开发完成以后，AI 再从实际代码中梳理出真正发生的概念变化，由 Reviewer 判断两者是否一致。

AI 可以同时成为实现者和解释者，但最终的判断依然由人完成。Reviewer 不需要理解每一行代码，却必须理解这次修改对整个系统意味着什么。

## 把系统控制在人的理解范围之内

Concept Review 最重要的目的，不只是提高 Review 效率，而是把整个系统控制在团队的理解范围之内。

真正危险的情况，不只是 AI 写错代码，而是系统仍然能够运行，功能也在持续交付，却已经没有任何人能够解释它为什么这样运行。概念不断被临时创造，关系不断被局部修补，团队对系统的理解逐渐落后于系统本身。工程师只能根据运行结果判断它“好像能用”。

我们不需要坚持亲手写下或者读完每一行代码，但任何时候，团队里都应该有人能够解释系统中有哪些关键概念，它们为什么存在，以及它们之间是什么关系。

过去，代码是软件开发中最昂贵的部分，所以我们围绕代码建立了一整套 Review 流程。现在真正稀缺的，是对问题的理解，是合理的概念，是团队共同认可的判断、取舍和审美。

**AI 可以拥有越来越强的实现能力，但团队不能因此失去对系统的解释权。**

## 参考文献

1. Linus Torvalds, [Good programmers worry about data structures and their relationships](https://lwn.net/Articles/193244/), 2006.
2. GitHub, [What is Spec-Driven Development?](https://github.com/github/spec-kit/blob/main/docs/concepts/sdd.md).
3. Microsoft, [Spec-Driven Development: A Spec-First Approach to AI-Native Engineering](https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/), 2026.
4. OpenAI, [Datadog uses Codex for system-level code review](https://openai.com/index/datadog/), 2026.
