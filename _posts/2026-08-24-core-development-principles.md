---
title: 核心开发原则
date: 2026-08-24 16:24:00 +0800
categories:
  - 随机思考
tags:
  - 技术
  - AI
---

> 这篇文章记录的是我在使用 AI 辅助开发时沉淀的一套核心原则。它的最初用途很直接：在我与 AI 协作开发时，把这些原则明确地告诉它，让它理解我的期望和标准——领域模型怎么建、能力怎么划分、边界怎么切、复杂度怎么控制、风险怎么取舍、验证怎么做。有了这些原则，AI 的设计和做法才能更符合我的预期，而不是反复偏离、反复返工。
>
> 这套原则同样适用于人类团队协作：它们是关于"如何把系统设计好"的底层共识，与协作对象是人是 AI 无关。
>
> **版本：0.1**（持续演进中，会随实践不断修订）

---

### 原则一：领域模型优先，数据结构及其关系决定代码

**原则展开：**

- 在实现功能之前，先建立能够准确解释业务的领域模型，并用清晰的数据结构及其关系表达这个模型；代码应当实现模型，而不应通过复杂流程弥补领域概念的缺失。
- 建模时，应识别核心实体、值对象、唯一标识、事实来源、实体之间的关系与所有权，以及它们的边界、生命周期、状态转换和业务不变量。
- 代码中的命名、类型、职责和操作应尽可能直接对应领域模型，使业务概念能够被清晰表达，使常规流程能够由这些概念自然组合而成。
- 把实现复杂度视为模型质量的反馈：如果一个需求需要大量分支、同步、映射、例外和绕行，并且这些复杂度无法对应真实的业务规则，应优先重新检查模型边界、数据结构和实体关系，而不是继续堆叠补丁。
- 好的领域模型会让大量常规业务自然收敛为直观的增删改查和状态转换；真正复杂的领域规则则应被明确、集中且可测试地表达在模型中，而不是分散隐藏在流程代码里。

**原则参考：**

- "Bad programmers worry about the code. Good programmers worry about data structures and their relationships." -- Linus Torvalds
- "Data dominates. If you've chosen the right data structures and organized things well, the algorithms will almost always be self-evident." -- Rob Pike
- "Domain-driven design calls for a model that doesn’t just aid early analysis but is the very foundation of the design." -- Eric Evans

### 原则二：能力建设优先，需求牵引能力建设，能力承载具体需求；下层提供能力，上层组合能力

先通过建设和组合能力满足需求，再用真实需求约束能力的边界；不能跳过能力直接堆叠代码，也不能脱离需求凭空建设能力。

**原则展开：**

- 面对具体需求时，应先识别系统缺少什么能力、该能力属于哪个实体或模块，而不是直接增加流程、分支和特例代码；实现需求的过程，本质上应当是建设、复用或组合能力的过程。
- 能力应当是一项边界清晰、职责稳定、契约明确且可以独立测试的领域行为，具有明确的输入、输出、约束和失败语义，而不是只对某个页面、调用方或当前流程有效的一段代码。
- 下层模块使用自身的领域语言提供能力，上层负责概念映射、策略选择和能力组合；具体需求应当作为能力组合后的结果被满足，而不应直接渗透成下层的业务命名、专用参数或特殊分支。
- 当新需求需要在多个层级反复增加判断、复制流程或绕过既有接口时，应优先检查系统是否缺少某项能力，或者现有能力的职责和边界是否定义错误；合理的能力模型应让相似需求能够通过复用和组合自然实现。
- 能力建设仍需由真实场景校验，但需求在这里是能力的来源和约束，而不是底层接口的设计模板；既不能用一次性代码直接满足需求，也不能脱离实际使用去建设无人调用的能力或万能框架。

**原则参考：**

- "Separate policy from mechanism; separate interfaces from engines." -- Unix Rule of Separation
- "Leave it to the client." -- Butler W. Lampson
- "State these assertions in the ubiquitous language of a specific bounded context." -- Eric Evans
- "Any abstraction that makes it harder to understand the code for current requirements is presumed guilty." -- Martin Fowler

### 原则三：领域边界必须清晰，边界内概念自洽，边界间显式转换视角

每个模块都应从自己的领域视角建立自洽模型；当信息跨越边界时，应转换它的业务语义，而不是共享或泄漏彼此的内部概念。

**原则展开：**

- 任何概念、模型和能力都只在特定领域边界内具有确定含义；每个模块应站在自身职责和业务视角下，使用自己的领域语言建立内部闭环，使输入、状态、行为、约束和输出能够在该边界内被完整解释。
- 同一个现实对象在不同领域中可能扮演不同角色，因此可以拥有不同的名称、类型、标识、字段、约束和生命周期；不应为了表面上的复用，强迫不同模块共享同一套对象、字段命名或所谓"统一模型"。
- 数据和能力跨越边界时，应通过明确、稳定的契约进行交互，并在边界处完成显式的语义映射；使用方应将外部概念转换成自身能够理解的领域模型，而不是让提供方或外部系统的模型直接渗透进来。
- 每个模块应隐藏自己的内部模型、实现细节和易变决策，只对外暴露其他模块真正需要依赖的契约；旧系统、第三方框架和外部服务的概念应被限制在适配器或防腐层中，使它们的变化不会污染核心领域。
- 视角转换是对真实语义差异的表达，而不是形式化的重复劳动：语义相同且属于同一边界时不必刻意转换；如果一个模块的内部变化频繁迫使其他模块同步修改，或者同一概念在边界两侧含义模糊，应重新检查边界、契约和映射是否合理。

**原则参考：**

- "Model expressions, like any other phrase, only have meaning in context." -- Eric Evans
- "Each module is then designed to hide such a decision from the others." -- David Parnas
- "Nothing in an inner circle can know anything at all about something in an outer circle." -- Robert C. Martin
- "The separation of concerns … is yet the only available technique for effective ordering of one’s thoughts." -- Edsger Dijkstra

### 原则四：简单性优先，选择解决问题所需的最小充分设计

选择能够完整表达真实问题并满足业务约束的最小充分设计；保留必要的领域复杂度，消除人为引入的偶然复杂度。

**原则展开：**

- 简单不是一味减少代码、对象、层级或功能，而是在完整表达领域语义、业务不变量和必要能力的前提下，不引入多余的概念、依赖、状态和机制；任何进一步删减都会损害正确性的设计，才是"最小充分设计"。
- 简单也不等于熟悉、方便或数量少；它的核心是让不同概念和职责不被相互纠缠，使每个部分都能够被独立理解和改变。多个边界清晰的对象，往往比少数承担多种职责的万能对象更简单。
- 每引入一个抽象、层级、接口、配置项、扩展点或特殊分支，都应确认它解决了什么真实问题，以及是否降低了系统的整体复杂度；不能只隐藏或转移复杂度，更不能为了假设中的未来需求提前制造复杂度。
- 真实业务中不可消除的复杂性应被明确、集中且可测试地表达，而不是通过统一模型、隐式约定或复杂流程掩盖；设计的目标不是让系统看起来简单，而是区分并保留本质复杂度，持续消除偶然复杂度。
- 应以理解、验证、修改和删除的成本衡量设计是否简单：在多个方案都能正确满足需求时，优先选择依赖更少、影响范围更明确、行为更容易推断，并且最容易测试、演化和移除的方案。

**原则参考：**

- "One way is to make it so simple that there are obviously no deficiencies." -- C. A. R. Hoare
- "Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it." -- Edsger W. Dijkstra
- "What matters for simplicity is that there is no interleaving, not that there is only one thing." -- Rich Hickey
- "Complexity is anything related to the structure of a system that makes it hard to understand and modify the system." -- John Ousterhout

### 原则五：工程投入应与实际风险相称，极端场景不得绑架核心设计

防御性设计只有在其降低的风险足以证明新增复杂度时才应被引入；低概率、低影响或可通过简单通用机制恢复的问题，不应获得昂贵的专用设计。

**原则展开：**

- 面对异常、边界条件和极端场景，不能仅仅因为某件事"理论上可能发生"，就默认必须为它提供专用设计；应先确认它是否属于真实风险，以及是否值得进入核心模型、公共契约和正常流程。
- 判断风险时，应综合考虑发生概率、影响程度、影响范围、可检测性与可恢复性，以及是否存在失败提示、重试、重建、降级等更简单的通用处理方式；不能只看发生概率，也不能只看最坏结果。
- 风险处理方案本身同样具有成本和风险，包括增加概念、状态、依赖、分支、维护负担和认知成本，以及给正常流程引入新的故障可能；应比较方案实际降低的风险与它给系统造成的整体代价，而不是只证明方案"更加完备"。
- 低概率、低影响且容易恢复的场景，不应反过来扭曲领域模型、污染正常路径或迫使所有调用方承担复杂度；应优先将其限制在边界处理和通用错误机制中，把结构性保护留给真正高风险、不可恢复或涉及核心业务不变量的场景。
- 工程设计应在剩余风险已经可以接受、继续降低风险的代价明显不成比例时停止；但取舍必须建立在明确的假设和判断上，当发生概率、影响程度、使用规模或恢复条件发生变化时，应重新评估，而不能让曾经合理的简化永久固化。

**原则参考：**

- "They were using a general concept of risk exposure (potential loss times the probability of loss) to guide their priorities and actions." -- Barry W. Boehm
- "Handle normal and worst case separately as a rule, because the requirements for the two are quite different." -- Butler W. Lampson
- "We should forget about small efficiencies, say about 97% of the time… Yet we should not pass up our opportunities in that critical 3%." -- Donald E. Knuth
- "We strive to make a service reliable enough, but no more reliable than it needs to be." -- Marc Alvidrez, Google SRE

### 原则六：测试与验证必须形成闭环，以可检查的证据判定完成

测试或 Evaluation 是开发过程不可分割的一部分：应在任务推进过程中明确验证目标、持续获得真实反馈，并在结束前形成与任务风险相匹配的完成证据；但不应机械地要求所有任务都先编写测试代码。

**原则展开：**

- 测试与验证的目的，是了解实现的真实状态，并判断它是否满足需求、领域规则和用户预期；应在任务逐渐清晰的过程中同步思考"需要验证什么、如何验证、什么证据足以支持完成"，而不必把测试强制规定为实现之前的固定步骤。
- 测试或 Evaluation 应与实现形成反馈闭环：实现产生结果，验证揭示结果与预期之间的差异，差异再推动分析和修正；验证不应只是任务结束后的形式化检查，也不应为了证明已有实现正确而反向编写只能通过的测试。
- 在 AI 开发中，这个闭环尤其重要：自然语言需求存在隐含语义，模型行为具有不确定性，AI 又擅长生成看似合理且自信的结果；因此，Agent 不能只依靠自身判断宣告完成，而应从代码运行、工具结果、环境状态和用户反馈中获得真实信号，并据此自主修正。
- 验证方式和投入应与任务性质及风险相匹配，可以包括单元测试、集成测试、端到端测试、类型与静态检查、真实界面操作、状态与日志检查、规则评测、模型评审和人工验收；简单、低风险的任务不必为了形式感新增测试代码，重要任务则应建立稳定、可重复的验证手段。
- 每次真实失败都应尽可能沉淀为可以复现的测试、评测案例或验收规则，并在相关代码、Prompt、模型、工具和运行环境变化后重新验证；任何测试都只能提供其覆盖范围内的证据，不能证明所有问题都不存在，因此需要明确验证边界和剩余风险。

**原则参考：**

- "Software testing is an empirical investigation, conducted to provide stakeholders with quality information about the product or service under test." -- Cem Kaner
- "Testing is the process of evaluating a product by learning about it through exploration and experimentation." -- Michael Bolton
- "Adopt eval-driven development: Evaluate early and often. Write scoped tests at every stage." -- OpenAI
- "Agents can iterate on solutions using test results as feedback." -- Anthropic
- "Program testing can be used to show the presence of bugs, but never to show their absence!" -- Edsger Dijkstra
