import{_ as o,o as l,c as n,Q as s,k as a,a as e}from"./chunks/framework.9bc09dc8.js";const t="/assets/skedo_cli.44494b7e.png",m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"arch/design/index.md","filePath":"arch/design/index.md"}'),r={name:"arch/design/index.md"},p=s('<h2 id="用例分析" tabindex="-1">用例分析 <a class="header-anchor" href="#用例分析" aria-label="Permalink to &quot;用例分析&quot;">​</a></h2><h3 id="主要内容" tabindex="-1">主要内容 <a class="header-anchor" href="#主要内容" aria-label="Permalink to &quot;主要内容&quot;">​</a></h3><ul><li>什么是用例？</li><li>用例的组成</li><li>举例：@skedo 的用例图</li><li>用例的收集和整理</li></ul><h3 id="为什么要学用例" tabindex="-1">为什么要学用例 <a class="header-anchor" href="#为什么要学用例" aria-label="Permalink to &quot;为什么要学用例&quot;">​</a></h3><ul><li>看需求文档</li><li>做技术 Leader</li><li>做技术项目</li><li>更好的做业务</li><li>将来老板</li></ul><p>用例就是找用户需求的过程，此时系统设计就已经开始了。</p><h3 id="什么是用例" tabindex="-1">什么是用例 <a class="header-anchor" href="#什么是用例" aria-label="Permalink to &quot;什么是用例&quot;">​</a></h3><p>完整性：拿起手机打王者，这是一个完整的用例，但是 “拿起手机” 并不是一个用例。</p><p>独立性：一个用例已经完成某个明确的目标。</p><p>例如：我是张三，我是程序员，我要开发系统，</p>',10),i=a("p",null,[e("我是**{什么角色}"),a("strong",{做什么:""},"，我可以"),e("**，我会{"),a("strong",null,"获得什么收益、完成什么工作}"),e("。")],-1),c=s(`<h3 id="用例的组成" tabindex="-1">用例的组成 <a class="header-anchor" href="#用例的组成" aria-label="Permalink to &quot;用例的组成&quot;">​</a></h3><h4 id="参与者" tabindex="-1">参与者 <a class="header-anchor" href="#参与者" aria-label="Permalink to &quot;参与者&quot;">​</a></h4><p>参与者，即谁与系统交互。参与者可以是人，也可以是系统。比如 B 系统收到 A 系统的报警后，启动应急方案，自动切换流量。</p><h4 id="用例" tabindex="-1">用例 <a class="header-anchor" href="#用例" aria-label="Permalink to &quot;用例&quot;">​</a></h4><p>表示完成什么目标，通常是动词短语，比如 “做 xx”，“登录” 等等。用椭圆表示。</p><h4 id="边界" tabindex="-1">边界 <a class="header-anchor" href="#边界" aria-label="Permalink to &quot;边界&quot;">​</a></h4><p>代表系统。比如用户在支付系统下单，在系统账户登录，这是两个不同的边界（boundary）。</p><p>**边界对系统设计意义非凡。**例如，系统的耦合在经过长期迭代系统间的边界模式（解决方案：防腐层、重构...）。再比如，系统的设计偏离了最初的定位--边界不明确。</p><p>好的产品界限分明，好的系统架构界限分明，好的类型设计界限分明。<strong>boundary（边界）</strong>。</p><p>技术扩展：在 Boundary 间，系统对象的共同的认知是 Context。比如 React 多个组件（Boundary）共享数据的一种方式是用 Context。用户在支付系统、营销系统、门店和商品系统中获得优惠券，背后需要一个跨系统的 Context。</p><p><strong>Context 是多个边界之间的共同认知。</strong></p><h4 id="关系" tabindex="-1">关系 <a class="header-anchor" href="#关系" aria-label="Permalink to &quot;关系&quot;">​</a></h4><p>描述用例与用例之间、参与者用例之间的关系。</p><p><strong>关联关系</strong></p><p>关联关系描述一种驱动做事的关系。</p><ul><li>比如用户登录，从用户指向登录；</li><li>比如系统报警，从监控系统（参与者）指向报警（用例）；</li><li>比如消息推送，从消息推送（用例）指向用户（参与者）。</li></ul><p><strong>包含关系</strong></p><p>一个用例包含其他用例。父用例完成，子用例必须完成。</p><ul><li>用户注册 includes 手机号验证。</li></ul><p><strong>扩展关系</strong></p><p>代表一个用例完成过程中可能会完成的用例。父用例完成，子用例不一定完成。</p><ul><li>用户登录 extend 用户注册</li><li>购买产品 extend 退款</li></ul><p><strong>泛化关系（Generalization）</strong></p><p>泛化（Generalization）是一种一般到特殊的抽象技巧。</p><p>编程领域有泛型，比如 <code>Iterator&lt;T&gt;</code> 代表可以迭代的事物。如果 A 是 <code>Iterator&lt;T&gt;</code> ，那么 A 可以被：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> x </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">A</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">A</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>Iterator&lt;T&gt;</code> 是 <code>Iterator&lt;number&gt;</code> 的泛化；动物是哺乳类，鸟类等的泛化（统称）。</p><p>泛化关系由特殊指向泛化。</p><p><strong>用例到用例的泛化</strong></p><p>用户支付是 “用支付宝支付”，“用微信支持”，“用银行卡支付” 的泛化。</p><p><strong>参与者到参与者的泛化</strong></p><p>例如在开课吧，用户是讲师、学生、运营人员的泛化。</p><p>@skedo/cli 的例子</p><img src="`+t+'"><h2 id="前端架构图" tabindex="-1">前端架构图 <a class="header-anchor" href="#前端架构图" aria-label="Permalink to &quot;前端架构图&quot;">​</a></h2><h2 id="coding-dot-语言" tabindex="-1">Coding：Dot 语言 <a class="header-anchor" href="#coding-dot-语言" aria-label="Permalink to &quot;Coding：Dot 语言&quot;">​</a></h2>',36),d=[p,i,c];function h(u,_,g,b,x,y){return l(),n("div",null,d)}const f=o(r,[["render",h]]);export{m as __pageData,f as default};
