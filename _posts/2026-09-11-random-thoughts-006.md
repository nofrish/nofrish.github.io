---
title: 后见之明
date: 2026-09-11 09:58:00 +0800
categories:
  - 随机思考
tags:
  - 技术
---

> Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it.
>
> 简单是一种伟大的美德，但它需要艰苦的工作才能实现，也需要受过训练才能欣赏。
>
> —— Edsger W. Dijkstra

Dijkstra 的这句话，对我最近一段时间的思考做了一个很好的总结。想要从一个复杂的问题中找到简单的答案，需要大量的理解、尝试和取舍。但真正打动我的是后半句：**简单不仅难以实现，也需要能力才能欣赏。**

厚厚的文档、大量的代码和复杂的流程，甚至不断出现的线上问题以及事后的加班处理，都可以让人直观地感受到其中的投入。但当一个人花费更多精力，把它们重新整理成一个简单的结果时，工作的痕迹反而消失了。旁观者只看见一个自然、清楚的答案，然后认为：这件事情好像本来就很简单。

## 复杂在先，简单在后

前 Notion 和 Cursor 的设计师 Ryo Lu 在 [How to make something great](https://ryolu.notion.site/How-to-make-something-great-87765868162d4a2c8ca0ef3c7f18433e) 中提到，一件真正优秀的作品，完成以后应该显得非常自然，让人觉得它本来就应该如此。他后来还写过一句话：**Complexity first, simplicity second**。

很多人认为简单意味着少做一些事情，或者从一开始就选择一个简单的方案。但真正的简单往往来自相反的过程：先理解问题中的关系、边界和限制，再找到真正稳定的部分，把其他复杂性消化掉。**简单不是问题原来的样子，而是理解复杂之后得到的结果。**

乔布斯在谈到简单时也说过：

> Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple.
>
> 简单可能比复杂更难，因为你必须非常努力地理清自己的思考，才能把事情变得简单。

复杂的方案经常只是理解问题时必经的中间状态。继续和问题相处，才有可能找到背后真正关键的结构。

## 被提前消化的复杂度

最近我们准备进行软件的私有化部署，一共涉及五个服务端系统，目前还在评估改造范围。其中四个由我负责，预计只需要一两天就可以完成适配，达到可以发布的状态。

另一个系统最初由外包开发，后来被我们接手并不断演进，功能和接入工作都更加复杂，预计需要三四周才能完成改造。当然这几个系统本身并不相同，所以工期不能被简单地放在一起比较。

但这次评估仍然让我意识到一件事情。我负责的几个系统改造范围很小，当然有 AI 提高开发效率的原因，但在过去的开发中，我也一直在有意识地控制服务边界，尽量让每个系统保持干净。因此，当部署方式发生变化时，大部分改动都可以被限制在很小的范围内。

这件事情有趣的地方在于：如果我评估私有化部署需要一个月，大家可能会觉得这件事情本来就很复杂。但当我评估只需要一两天时，大家同样不会觉得奇怪，只会认为这几个系统可能本来就比较简单。

**做得慢，说明事情很复杂；做得快，说明事情很简单。很少有人会想到，事情之所以简单，是因为有人过去把它做简单了。**

我之前在网易严选负责供应链系统时，也有过类似的经历。它的用户不多，真正困难的是大量业务概念和规则交织在一起。当时我花了两周左右重新抽象核心领域。此后产品页面几乎每周都有变化，核心代码却一年多基本没有修改。直到仓库升级成中央仓、前置仓等多级关系，业务模型本身发生变化，核心逻辑才跟着调整。

好的抽象不是永远不变，而是**只在问题的本质发生变化时才需要改变**。它没有消灭复杂度，只是把复杂度限制在了正确的地方，不让每一个后来的人都重新面对一遍。

## 后见之明

心理学中有一个概念叫做**后见之明偏差**：当人们已经知道一件事情的结果，就会高估这个结果原本的可预测性，觉得自己早就知道事情会这样。

知识工作也经常如此。创造者最初面对的是一个开放问题，需要在许多可能性中不断尝试和取舍；旁观者看到的却是一个已经完成的答案。错误路径已经被删除，复杂思考已经被折叠，最终没有发生的返工和事故也不会出现在结果里。

Dijkstra 还举过一个很有意思的例子：如果一场课从头到尾都讲得非常清楚，听众离开时反而可能会觉得：“原来就这么点东西。”

老师把知识组织得越好，学生理解起来就越轻松。但正因为理解得轻松，学生反而很难感受到它为什么好。**工作本身的质量，抹去了工作的痕迹。**

软件设计、产品设计以及很多知识工作都有相似之处。它们最有价值的部分，可能不是增加了多少东西，而是删除了多少错误路径，提前解决了多少未来问题。但没有发生的事情最难被看见，被成功隐藏的复杂度也最难被衡量。

我们经常把别人创造出来的漂亮答案称为“显而易见”，仿佛自己早就知道事情应该这样。

**但那只是我们站在终点获得的后见之明，并不等于创造者从一片混乱中找到这个答案所需要的远见。**

## 参考文献

1. Edsger W. Dijkstra, [On the Nature of Computing Science](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD896.html), 1984.
2. Ryo Lu, [How to make something great](https://ryolu.notion.site/How-to-make-something-great-87765868162d4a2c8ca0ef3c7f18433e).
3. Ryo Lu, [Complexity first, simplicity second](https://sublime.app/collection/building-bee32ba12a02468a).
4. Andy Reinhardt, [Steve Jobs: There's Sanity Returning](https://allaboutstevejobs.com/verbatim/quotes), 1998.
5. Baruch Fischhoff, [Hindsight ≠ Foresight: The Effect of Outcome Knowledge on Judgment Under Uncertainty](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Behavioral_Decision_Theory/Fischhoff_1975_Hindsight_is_not_equal_to_foresight.pdf), 1975.
