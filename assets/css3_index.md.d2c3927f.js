import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.9bc09dc8.js";const u=JSON.parse('{"title":"CSS3","description":"","frontmatter":{},"headers":[],"relativePath":"css3/index.md","filePath":"css3/index.md"}'),p={name:"css3/index.md"},o=l(`<h1 id="css3" tabindex="-1">CSS3 <a class="header-anchor" href="#css3" aria-label="Permalink to &quot;CSS3&quot;">​</a></h1><h2 id="一、css进化历史、结构伪类选择器-选择器模块" tabindex="-1">一、CSS进化历史、结构伪类选择器 - 选择器模块 <a class="header-anchor" href="#一、css进化历史、结构伪类选择器-选择器模块" aria-label="Permalink to &quot;一、CSS进化历史、结构伪类选择器 - 选择器模块&quot;">​</a></h2><p>CSS：指定文档该如何呈现给用户的一门语言。</p><p>html、css 不属于编程语言的范畴。CSS也具有函数，如rgba()。</p><p>文档指信息的集合，用标记语言作为结构，用CSS来进行呈现，呈现的就是文档。</p><h3 id="_1-用户代理-ua" tabindex="-1">1. 用户代理（UA） <a class="header-anchor" href="#_1-用户代理-ua" aria-label="Permalink to &quot;1. 用户代理（UA）&quot;">​</a></h3><p>文档呈现给用户的程序，叫做用户代理。</p><p>浏览器就是用户代理的其中之一，chrome、firefox用视觉呈现。 语音浏览器也可以叫做用户代理的一种，也起到将文档呈现给用户的作用。</p><h3 id="_2-css的数据类型" tabindex="-1">2. CSS的数据类型 <a class="header-anchor" href="#_2-css的数据类型" aria-label="Permalink to &quot;2. CSS的数据类型&quot;">​</a></h3><ul><li><code>&lt;image&gt;</code></li><li><code>&lt;number&gt;</code></li><li><code>&lt;string&gt;</code></li><li><code>&lt;url&gt;</code></li><li><code>&lt;angle&gt;</code></li></ul><p>例如<code>&lt;angle&gt;</code>：</p><p>​ <code>&lt;angle&gt;</code> 数据类型由 <code>&lt;number&gt;</code>和下列单位组成。数字与单位之间没有空格，数字为0时，单位可以省略。</p><p>​ 单位：deg（°）、grad（百分度）、rad（弧度）、trun（圆数）</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">boader</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">boader</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>@keyframes 定义动画 @media 媒体查询</p><p>CSS3不仅仅是定义样式这么简单。</p><p>CSS3：css2、css2.1的升级版本。3指版本号。在原有css2.1的基础上，增加了很多功能。</p><p>所有的主流浏览器对CSS3的兼容性非常好。包括IE10也全面支持CSS3。</p><p>手机端的浏览器基本全部使用响应式布局（手机浏览器全面支持CSS3）。</p><h3 id="_3-css3历史" tabindex="-1">3. CSS3历史 <a class="header-anchor" href="#_3-css3历史" aria-label="Permalink to &quot;3. CSS3历史&quot;">​</a></h3><ol><li><p>1990 HTML Tim Berners-Lee，图灵奖第一人，真正达到互联网分享资讯的第一人。 HTML作为结构化的标记语言，描述文档的内容。</p></li><li><p>1993 第一款显示图片的浏览器、Mosaic（马赛克）。 随着用户要求提高，原本仅仅用来呈现结构部分的HTML，为了让页面更加酷炫， 让文档和当时的需求有机的结合，出现很多混乱的结果。</p></li></ol><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">font</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">font</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">font</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">font</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>​ 最初 <code>css &lt;/font&gt; </code> 可以省略，可以这样使用 <code>css &lt;font size=&quot;+3&quot; color=&quot;red&quot;&gt; </code>，出现各种离谱的写法。 ​ 随着页面代码不断增加，结构性非常差，代码冗余，对搜索引擎非常不友好。这就是CSS诞生的背景。</p><p>​ 任何的技术都是为了解决人们的需求而诞生的。 ​ css诞生是为了让结构更加明确，让页面外观有更好的呈现效果。</p><p>​ css3是css2、css2.1的升级版本。是由CSS Working Group进行策划的。</p><ol start="3"><li><p>2010</p><p>由Adobe system、Apple、google、IBM、Mollia、Microsoft、Opera、 Sun（甲骨文）、HP等组织的 CSS working Group。</p><p>CSS3并没有出现标准规范，不同的浏览器中，有不同的实现方式，</p><p>-moz-、-ms-、-o-、-webkit-</p></li><li><p>1990 第一款浏览器诞生。</p></li><li><p>1993 图形化文本展示，3年发展，导致市场非常混乱不堪。</p></li><li><p>1996.12 CSS1.0 正式推出，解决样式混乱的问题。</p></li><li><p>1998.05 CSS2.0 出现层叠样式。</p></li><li><p>2004.02 CSS2.1 把一些不必要的，不被浏览器兼容的属性移除。</p></li><li><p>2010 推出CSS3.0版本。</p></li></ol><h3 id="_4-css3模块" tabindex="-1">4. CSS3模块 <a class="header-anchor" href="#_4-css3模块" aria-label="Permalink to &quot;4. CSS3模块&quot;">​</a></h3><p>CSS整体的结构划分为小的模块。</p><p>CSS3被拆分成模块：</p><p>​ 选择器、盒模型、背景和边框、文字特效、2D/3D转换、动画、多列布局、用户界面等</p><h3 id="_5-属性选择器" tabindex="-1">5. 属性选择器 <a class="header-anchor" href="#_5-属性选择器" aria-label="Permalink to &quot;5. 属性选择器&quot;">​</a></h3><ul><li><p>传统的属性选择器</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E[</span><span style="color:#B392F0;">attr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E[</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div></li><li><p>匹配以提供的值开头</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E[</span><span style="color:#B392F0;">attr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">^=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E[</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">^=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div></li><li><p>匹配以提供的值结尾</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E[</span><span style="color:#B392F0;">attr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">$=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E[</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">$=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div></li><li><p>匹配包含的字符串</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E[</span><span style="color:#B392F0;">attr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E[</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">textIndex</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;"> /&gt; username</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">textIndex</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;"> /&gt; username</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">textInex</span><span style="color:#F97583;">*=</span><span style="color:#9ECBFF;">&quot;nor&quot;</span><span style="color:#E1E4E8;">] { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">textInex</span><span style="color:#D73A49;">*=</span><span style="color:#032F62;">&quot;nor&quot;</span><span style="color:#24292E;">] { }</span></span></code></pre></div><p>属性可以是自定义属性。</p></li><li><p>以单词（空格）作为选择元素</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E[</span><span style="color:#B392F0;">attr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E[</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><p>以空格区分的元素都可以识别。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">textIndex</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;normal first&quot;</span><span style="color:#E1E4E8;"> /&gt; username</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;passworld&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">textIndex</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;normal second&quot;</span><span style="color:#E1E4E8;"> /&gt; password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">textIndex</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;normal first&quot;</span><span style="color:#24292E;"> /&gt; username</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;passworld&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">textIndex</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;normal second&quot;</span><span style="color:#24292E;"> /&gt; password</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#F97583;">~=</span><span style="color:#9ECBFF;">&quot;first&quot;</span><span style="color:#E1E4E8;">] { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#D73A49;">~=</span><span style="color:#032F62;">&quot;first&quot;</span><span style="color:#24292E;">] { }</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">textIndex</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;normal irst&quot;</span><span style="color:#E1E4E8;"> /&gt; username</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;passworld&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">textIndex</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;normal second&quot;</span><span style="color:#E1E4E8;"> /&gt; password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">textIndex</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;normal irst&quot;</span><span style="color:#24292E;"> /&gt; username</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;passworld&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">textIndex</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;normal second&quot;</span><span style="color:#24292E;"> /&gt; password</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#F97583;">~=</span><span style="color:#9ECBFF;">&quot;irst&quot;</span><span style="color:#E1E4E8;">] { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#D73A49;">~=</span><span style="color:#032F62;">&quot;irst&quot;</span><span style="color:#24292E;">] { }</span></span></code></pre></div></li><li><p>匹配以提供的值(value)为开头，或以提供的值(value-)</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">E[</span><span style="color:#B392F0;">attr</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">E[</span><span style="color:#6F42C1;">attr</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">textIndent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;normal&#39;</span><span style="color:#E1E4E8;">] { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">textIndent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;normal&#39;</span><span style="color:#24292E;">] { }</span></span></code></pre></div><p>使用场景：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en-us&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en-us&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;en&#39;</span><span style="color:#E1E4E8;">] {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">p</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;en&#39;</span><span style="color:#24292E;">] {}</span></span></code></pre></div><p>一般这种匹配语言简写代码场景都使用这种选择器。</p></li></ul><h3 id="_6-结构伪类选择器" tabindex="-1">6. 结构伪类选择器 <a class="header-anchor" href="#_6-结构伪类选择器" aria-label="Permalink to &quot;6. 结构伪类选择器&quot;">​</a></h3><ul><li><p>:root 相当于HTML根节点</p><p>html {} =&gt; :root {}、可以使用这种方式匹配HTML节点。</p><p>:root的权重（优先级）更高。</p></li><li><p>E:not 寻找不是指定匹配规则的元素</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">input:not ([textInent$=&quot;first&quot;]) { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">input:not ([textInent$=&quot;first&quot;]) { }</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!-- 永远都不会被应用 --</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">:not (</span><span style="color:#85E89D;">*</span><span style="color:#E1E4E8;">) { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!-- 永远都不会被应用 --</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">:not (</span><span style="color:#22863A;">*</span><span style="color:#24292E;">) { }</span></span></code></pre></div><p>:not的权重根据参数来计算的。本身的优先级是根据属性的优先级来判断的。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!-- 不是table下的a，无法排除父级元素，只应用在table同级元素 --</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">:not (</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!-- 不是table下的a，无法排除父级元素，只应用在table同级元素 --</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">:not (</span><span style="color:#22863A;">table</span><span style="color:#24292E;">) </span><span style="color:#22863A;">a</span><span style="color:#24292E;"> { }</span></span></code></pre></div></li><li><p>E:empty 选择子元素的元素节点或文本节点为空</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box:empty</span><span style="color:#E1E4E8;"> { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box:empty</span><span style="color:#24292E;"> { }</span></span></code></pre></div><p>HTML在解析换行和空格时，都会解析成文本。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box:empty</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">div</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box:empty</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span><span style="color:#6A737D;">&lt;!-- 有注释的空元素 --&gt;</span><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;这是空的元素&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- 有换行的空元素 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span><span style="color:#6A737D;">&lt;!-- 有注释的空元素 --&gt;</span><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;这是空的元素&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- 有换行的空元素 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>只有第一个盒子可以被选中，生效。</p></li><li><p>:target 选择a标签的锚点</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">:target</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">black</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">:target</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">black</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">h4</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;one&quot;</span><span style="color:#E1E4E8;">&gt;这是h4标签&lt;/</span><span style="color:#85E89D;">h4</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;two&quot;</span><span style="color:#E1E4E8;">&gt;这是p标签&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;three&quot;</span><span style="color:#E1E4E8;">&gt;这是div标签&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;four&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt;这是a标签&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">em</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;five&quot;</span><span style="color:#E1E4E8;">&gt;这是em标签&lt;/</span><span style="color:#85E89D;">em</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;#one&quot;</span><span style="color:#E1E4E8;">&gt;First&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;#two&quot;</span><span style="color:#E1E4E8;">&gt;Second&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;#three&quot;</span><span style="color:#E1E4E8;">&gt;Third&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;#four&quot;</span><span style="color:#E1E4E8;">&gt;Fouth&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;#five&quot;</span><span style="color:#E1E4E8;">&gt;Fifth/a&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">h4</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;one&quot;</span><span style="color:#24292E;">&gt;这是h4标签&lt;/</span><span style="color:#22863A;">h4</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;two&quot;</span><span style="color:#24292E;">&gt;这是p标签&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;three&quot;</span><span style="color:#24292E;">&gt;这是div标签&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;four&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt;这是a标签&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">em</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;five&quot;</span><span style="color:#24292E;">&gt;这是em标签&lt;/</span><span style="color:#22863A;">em</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;#one&quot;</span><span style="color:#24292E;">&gt;First&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;#two&quot;</span><span style="color:#24292E;">&gt;Second&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;#three&quot;</span><span style="color:#24292E;">&gt;Third&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;#four&quot;</span><span style="color:#24292E;">&gt;Fouth&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;#five&quot;</span><span style="color:#24292E;">&gt;Fifth/a&gt;</span></span></code></pre></div><p>用户选择到指定的元素之后，指定的target就会生效。</p></li><li><p>:first-child、:last-child、:nth-child、 :nth-last-child</p><ul><li><p>:first-child：选择第一个元素</p></li><li><p>:last-child：选择最后一个元素</p></li><li><p>:nth-child：选择指定下标的元素（下标从1开始）</p></li><li><p>:nth-last-child：倒数选择指定下标的元素（下标从1开始）</p><p>odd 奇数、even 偶数</p><p>2n 偶数、2n + 1 奇数（参数是 αn + β 的形式，α 表示指定循环的个数，β 指定具体出现的位置）。</p></li></ul></li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">p</span><span style="color:#B392F0;">:nth-child</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4n + 1</span><span style="color:#E1E4E8;">) { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">p</span><span style="color:#6F42C1;">:nth-child</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4n + 1</span><span style="color:#24292E;">) { }</span></span></code></pre></div><p>会寻找相邻的兄弟元素的匹配项，不会查看类型，嵌套的符合条件也会被选择。</p><ul><li><p>:first-of-type、last-of-type、nth-of-type、</p><p>可以指定类型，会限制元素出现的类型。 不指定类型时，会选择多个符合条件的元素，嵌套的符合条件也会被选择。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">span</span><span style="color:#B392F0;">:first-of-type</span><span style="color:#E1E4E8;"> { }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#22863A;">span</span><span style="color:#6F42C1;">:first-of-type</span><span style="color:#24292E;"> { }</span></span></code></pre></div></li><li><p>only-child</p><p>寻找某一个父级下唯一的子元素。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">i</span><span style="color:#E1E4E8;">&gt;只有一个子元素&lt;/</span><span style="color:#85E89D;">i</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">i</span><span style="color:#E1E4E8;">&gt;我是i标签&lt;/</span><span style="color:#85E89D;">i</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">em</span><span style="color:#E1E4E8;">&gt;我是em标签&lt;/</span><span style="color:#85E89D;">em</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            我有一个&lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;嵌套span&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;标签</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">i</span><span style="color:#24292E;">&gt;只有一个子元素&lt;/</span><span style="color:#22863A;">i</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">i</span><span style="color:#24292E;">&gt;我是i标签&lt;/</span><span style="color:#22863A;">i</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">em</span><span style="color:#24292E;">&gt;我是em标签&lt;/</span><span style="color:#22863A;">em</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            我有一个&lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;嵌套span&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;标签</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">:only-child</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">:only-child</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul><h2 id="二、元素状态伪类、伪元素、关系选择器-选择器模块" tabindex="-1">二、元素状态伪类、伪元素、关系选择器 - 选择器模块 <a class="header-anchor" href="#二、元素状态伪类、伪元素、关系选择器-选择器模块" aria-label="Permalink to &quot;二、元素状态伪类、伪元素、关系选择器 - 选择器模块&quot;">​</a></h2><h3 id="_1-样式失效问题" tabindex="-1">1. 样式失效问题 <a class="header-anchor" href="#_1-样式失效问题" aria-label="Permalink to &quot;1. 样式失效问题&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">&gt;这是div的a标签&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">&gt;这是table中的a标签&lt;/</span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">&gt;这是div的a标签&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">&gt;这是table中的a标签&lt;/</span><span style="color:#22863A;">a</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">table</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">:not</span><span style="color:#E1E4E8;">(</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">:not</span><span style="color:#24292E;">(</span><span style="color:#22863A;">table</span><span style="color:#24292E;">) </span><span style="color:#22863A;">a</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>使用以上选择器会失效，所有a标签颜色都为红色。</p><p>解决方案：给定范围后，可以正常显示。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种解决方案 */</span></span>
<span class="line"><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">:not</span><span style="color:#E1E4E8;">(</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> {</span><span style="color:#79B8FF;">x</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种解决方案 */</span></span>
<span class="line"><span style="color:#22863A;">body</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">:not</span><span style="color:#24292E;">(</span><span style="color:#22863A;">table</span><span style="color:#24292E;">) </span><span style="color:#22863A;">a</span><span style="color:#24292E;"> {</span><span style="color:#005CC5;">x</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第二种解决方案 */</span></span>
<span class="line"><span style="color:#85E89D;">div</span><span style="color:#B392F0;">:not</span><span style="color:#E1E4E8;">(</span><span style="color:#85E89D;">table</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第二种解决方案 */</span></span>
<span class="line"><span style="color:#22863A;">div</span><span style="color:#6F42C1;">:not</span><span style="color:#24292E;">(</span><span style="color:#22863A;">table</span><span style="color:#24292E;">) </span><span style="color:#22863A;">a</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_2-ui元素状态伪类选择器" tabindex="-1">2. UI元素状态伪类选择器 <a class="header-anchor" href="#_2-ui元素状态伪类选择器" aria-label="Permalink to &quot;2. UI元素状态伪类选择器&quot;">​</a></h3><p>​ 当元素处于某种状态下，才会生效的。</p><ul><li><p>:hover 鼠标移入的状态</p></li><li><p>:focus 鼠标聚焦时的状态（input）</p></li><li><p>:active 元素被激活的状态（鼠标按下未松开）</p></li><li><p>:enabled、:disabled、:read-only、:read-write</p><p>元素能够被激活的元素才有这个状态。</p><p>:enabled 表单可用的状态 :disabled 表单禁用用的状态 :read-only 表单只读的状态 :read-write 表单可读写</p><ul><li><p>input</p><p>只读属性：readonly 禁用属性：disabled</p><p>只读属性和禁用属性都是不可输入，两者作为表单元素唯一的区别在于， readonly的数据是可以被提交的，disabled的数据不会被提交。</p></li><li><p>disabled、enabled</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">disabled</span><span style="color:#E1E4E8;"> /&gt; username</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;"> /&gt; password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">disabled</span><span style="color:#24292E;"> /&gt; username</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;"> /&gt; password</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:disabled</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:enabled</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:disabled</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:enabled</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p>readonly、read-write</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;"> /&gt; username</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;"> /&gt; password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;"> /&gt; username</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;"> /&gt; password</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:read-only</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:read-write</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:read-only</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:read-write</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>disabled依然是可读可写的状态，禁用不代表元素不可写。两者并不任何关系。</p></li></ul></li><li><p>:checked :default :indeterminate</p><p>:checked 被选中状态 :default 默认状态（默认选项），默认被选中 :indeterminate 页面打开时，没有被选中的状态，不确定的状态。</p><p>:checked，表单中仅限于单选框和复选框中被选中的状态，自定义radio的时候，可以使用这个状态。</p><ul><li><p>:checked :default</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> /&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:checked</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">outline</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:checked</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">outline</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;">] {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">outline</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:checked</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">outline</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:checked</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">outline</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;">] {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">outline</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p>:defualt指页面打开时，处于选中状态的单选框和复选框的样式。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">checked</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;read&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">checked</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;read&quot;</span><span style="color:#E1E4E8;">&gt;阅读&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;tourist&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;tourist&quot;</span><span style="color:#E1E4E8;">&gt;旅游&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;playing&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;playing&quot;</span><span style="color:#E1E4E8;">&gt;打球&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">checked</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;read&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">checked</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;read&quot;</span><span style="color:#24292E;">&gt;阅读&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;tourist&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;tourist&quot;</span><span style="color:#24292E;">&gt;旅游&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;playing&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;playing&quot;</span><span style="color:#24292E;">&gt;打球&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">outline</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:checked</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">outline</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">outline</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">outline</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:checked</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">outline</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">outline</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>单选框的默认选中状态，:default状态存在兼容性问题，IE没有实现:default属性。</p></li><li><p>:indeterminate</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">:indeterminate</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">:indeterminate</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">:indeterminate</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">:indeterminate</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#22863A;">label</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul></li><li><p>radio</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;">&gt;这是input1&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">checked</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;">&gt;这是input1&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;">&gt;这是input1&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">checked</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;">&gt;这是input1&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>效果不理想，点击时背景颜色并不会消失。存在兼容性问题。</p></li><li><p>checkbox 需要配合JS使用。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;">&gt;这是input1&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;checkbox&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;">&gt;这是input1&lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;">&gt;这是input1&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;checkbox&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;">&gt;这是input1&lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;text/javascript&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  var inputs = document.getElementsByTagName(&#39;input&#39;);</span></span>
<span class="line"><span style="color:#E1E4E8;">  Array.from(inputs).forEach(item =&gt; (item.indeterminate = true));</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;text/javascript&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  var inputs = document.getElementsByTagName(&#39;input&#39;);</span></span>
<span class="line"><span style="color:#24292E;">  Array.from(inputs).forEach(item =&gt; (item.indeterminate = true));</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li></ul><h3 id="_3-伪元素选择器" tabindex="-1">3. 伪元素选择器 <a class="header-anchor" href="#_3-伪元素选择器" aria-label="Permalink to &quot;3. 伪元素选择器&quot;">​</a></h3><ul><li><p>::before ::after</p></li><li><p>::first-letter ::first-line ::selection</p></li><li><p>::first-letter 选择第一个字母（字）</p></li><li><p>::first-line 选择第一行的字</p></li><li><p>::selection 文本被选中时的状态</p></li><li><p>::first-letter, ::first-line, 在块级元素中才会生效，也不支持荷兰文字。</p><p>并不是所有的样式都可以指定，比如background-color属性等，会被忽略掉。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">p</span><span style="color:#B392F0;">::first-line</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">p</span><span style="color:#B392F0;">::first-letter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">p</span><span style="color:#B392F0;">::selection</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">aquamarine</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">p</span><span style="color:#6F42C1;">::first-line</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">p</span><span style="color:#6F42C1;">::first-letter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">p</span><span style="color:#6F42C1;">::selection</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">aquamarine</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  测试测试测试测试测试测试测试测试</span></span>
<span class="line"><span style="color:#E1E4E8;">  测试测试测试测试测试测试测试测试</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  测试测试测试测试测试测试测试测试</span></span>
<span class="line"><span style="color:#24292E;">  测试测试测试测试测试测试测试测试</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>文本不可选中：user-select: none; 测试使用，生产环境不要使用，需要使用JS来限制。</p></li></ul><h3 id="_4-关系选择器" tabindex="-1">4. 关系选择器 <a class="header-anchor" href="#_4-关系选择器" aria-label="Permalink to &quot;4.  关系选择器&quot;">​</a></h3><ul><li><p>E F 后代选择器</p></li><li><p>E &gt; F 直接子元素选择器，选择自己的下一代。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#22863A;">span</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#22863A;">span</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    这是span1</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;这是span2&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    这是span1</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;这是span2&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>E + F 相邻兄弟选择器</p><p>只能寻找相邻的兄弟元素，不包括本身。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.text1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.text1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text1&quot;</span><span style="color:#E1E4E8;">&gt;这是第1个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text2&quot;</span><span style="color:#E1E4E8;">&gt;这是第2个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text3&quot;</span><span style="color:#E1E4E8;">&gt;这是第3个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text4&quot;</span><span style="color:#E1E4E8;">&gt;这是第4个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text5&quot;</span><span style="color:#E1E4E8;">&gt;这是第5个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text1&quot;</span><span style="color:#24292E;">&gt;这是第1个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text2&quot;</span><span style="color:#24292E;">&gt;这是第2个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text3&quot;</span><span style="color:#24292E;">&gt;这是第3个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text4&quot;</span><span style="color:#24292E;">&gt;这是第4个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text5&quot;</span><span style="color:#24292E;">&gt;这是第5个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p>E ~ F 一般兄弟选择器</p><p>寻找多个兄弟元素，往下寻找。包括嵌套的p元素。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.text1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.text1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~</span><span style="color:#24292E;"> </span><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text1&quot;</span><span style="color:#E1E4E8;">&gt;这是第1个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text2&quot;</span><span style="color:#E1E4E8;">&gt;这是第2个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text3&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  这是第3个p元素</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;这是里面的p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text4&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  这是第4个p元素</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;这是里面的p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text5&quot;</span><span style="color:#E1E4E8;">&gt;这是第5个p元素&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text1&quot;</span><span style="color:#24292E;">&gt;这是第1个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text2&quot;</span><span style="color:#24292E;">&gt;这是第2个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text3&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  这是第3个p元素</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;这是里面的p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text4&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  这是第4个p元素</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;这是里面的p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text5&quot;</span><span style="color:#24292E;">&gt;这是第5个p元素&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li></ul><h2 id="三、背景、边框图片-背景与边框模块" tabindex="-1">三、背景、边框图片 - 背景与边框模块 <a class="header-anchor" href="#三、背景、边框图片-背景与边框模块" aria-label="Permalink to &quot;三、背景、边框图片 - 背景与边框模块&quot;">​</a></h2><h3 id="_1-案例-自定义radio" tabindex="-1">1. 案例：自定义radio <a class="header-anchor" href="#_1-案例-自定义radio" aria-label="Permalink to &quot;1. 案例：自定义radio&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio-wrapper clearfix&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio-box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;sex&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;male&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">checked</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;male&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;fa fa-mars&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio-box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;sex&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;female&quot;</span><span style="color:#E1E4E8;"> &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;female&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;fa fa-venus&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio-wrapper clearfix&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio-box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;sex&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;male&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">checked</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;male&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;fa fa-mars&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio-box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;sex&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;female&quot;</span><span style="color:#24292E;"> &gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">label</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;female&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">span</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;fa fa-venus&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">label</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.clearfix::after</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">display</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">block</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">content</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">clear</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">both</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.radio-wrapper</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">rpx;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.radio-box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">float</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">left</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">relative</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">margin-left</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">15</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.radio-box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;">] {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">visibility</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">hidden</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.radio-box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;radio&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#B392F0;">:checked</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">burlywood</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.radio-box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">label</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">absolute</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">left</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#ccc</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">text-align</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">center</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">line-height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">90</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.radio-box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">40</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#fff</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.clearfix::after</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">display</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">block</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">content</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">clear</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">both</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.radio-wrapper</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">rpx;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.radio-box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">float</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">left</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">relative</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">margin-left</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">15</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.radio-box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;">] {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">visibility</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">hidden</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.radio-box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">input</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;radio&quot;</span><span style="color:#24292E;">]</span><span style="color:#6F42C1;">:checked</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#22863A;">label</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">burlywood</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.radio-box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">label</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">absolute</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">left</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#ccc</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">text-align</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">center</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">line-height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">90</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.radio-box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">span</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">40</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#fff</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_2-背景图片-background" tabindex="-1">2. 背景图片 background <a class="header-anchor" href="#_2-背景图片-background" aria-label="Permalink to &quot;2. 背景图片 background&quot;">​</a></h3><ul><li><p>background-image</p><p>引号加与不加都可以。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: url(图片地址);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: url(&#39;图片地址&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: url(图片地址);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: url(&#39;图片地址&#39;);</span></span></code></pre></div></li><li><p>background-position</p><p>（居于元素定点位置进行定位）百分比，像素值均可。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">repeat: </span><span style="color:#85E89D;">no-repeat</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#85E89D;">background-position</span><span style="color:#E1E4E8;">: 0 0;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">repeat: </span><span style="color:#22863A;">no-repeat</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#22863A;">background-position</span><span style="color:#24292E;">: 0 0;</span></span></code></pre></div></li><li><p>background-size</p><p>百分比、像素值、contain、conver、 contain：填充，默认取短边，可能不会显示出来。 conver：覆盖</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-size</span><span style="color:#E1E4E8;">: 200px 200px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-size</span><span style="color:#24292E;">: 200px 200px;</span></span></code></pre></div></li><li><p>background-attachent</p><p>此时的背景图片相对于谁定位。</p><p>fixed: 固定图片，不滚动 相对于视口（包括border和padding） scroll：图片可以滚动 相对于当前元素本身（不包含border） local: 图片可以滚动 相对于内容区域（不包含border和padding） fixed时，使用background-position属性无效。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-attachent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-attachent</span></span></code></pre></div></li><li><p>background-origin</p><p>规定当前原点位置。</p><p>border-box：以边框的位置作为起点 padding-box 以padding的位置作为起点 content-box： 以内容的位置作为起点 background-attachent为fixed时，该属性不生效。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-origin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-origin</span></span></code></pre></div></li><li><p>background-clip</p><p>将背景图片进行裁剪。</p><p>border-box：只保留边框内部的内容区域的内容 padding-box 只保留padding内部内容区域的内容 content-box： 只保留内容区域的内容</p></li></ul><p>简写形式</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">background: url repeat attachment postion/size;</span></span>
<span class="line"><span style="color:#E1E4E8;">background: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">no-repeat</span><span style="color:#E1E4E8;"> scroll 0 0/100% 100%;</span></span>
<span class="line"><span style="color:#E1E4E8;">background: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">no-repeat</span><span style="color:#E1E4E8;"> scroll 0 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">background: url repeat attachment postion/size origin clip;</span></span>
<span class="line"><span style="color:#E1E4E8;">background: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">) </span><span style="color:#85E89D;">no-repeat</span><span style="color:#E1E4E8;"> scroll 0 0 </span><span style="color:#85E89D;">border-box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">content-box</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">background: url repeat attachment postion/size;</span></span>
<span class="line"><span style="color:#24292E;">background: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">) </span><span style="color:#22863A;">no-repeat</span><span style="color:#24292E;"> scroll 0 0/100% 100%;</span></span>
<span class="line"><span style="color:#24292E;">background: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">) </span><span style="color:#22863A;">no-repeat</span><span style="color:#24292E;"> scroll 0 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">background: url repeat attachment postion/size origin clip;</span></span>
<span class="line"><span style="color:#24292E;">background: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">) </span><span style="color:#22863A;">no-repeat</span><span style="color:#24292E;"> scroll 0 0 </span><span style="color:#22863A;">border-box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">content-box</span><span style="color:#24292E;">;</span></span></code></pre></div><p>mozilla的书写顺序</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">background：url postion/size attachment origin clip;</span></span>
<span class="line"><span style="color:#E1E4E8;">background：url 0 0/ contain fixed </span><span style="color:#85E89D;">border-box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">content-box</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">background：url postion/size attachment origin clip;</span></span>
<span class="line"><span style="color:#24292E;">background：url 0 0/ contain fixed </span><span style="color:#22863A;">border-box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">content-box</span><span style="color:#24292E;">;</span></span></code></pre></div><p>当手册与公司写法出现冲突时</p><p>background-origin background-clip的书写顺序是一定的； background-postion/ background-size的书写顺序也是一定的； 只要保证这两组分别是一起的，属性都会生效。</p><h3 id="_3-边框图片-border-image" tabindex="-1">3. 边框图片 border-image <a class="header-anchor" href="#_3-边框图片-border-image" aria-label="Permalink to &quot;3. 边框图片 border-image&quot;">​</a></h3><ul><li><p>border-image: url(img/1.png) 70 repeat;</p></li><li><p>border-image-source</p><p>决定当前边框图片引用的资源。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-image-source</span><span style="color:#E1E4E8;">: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-image-source</span><span style="color:#24292E;">: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">);</span></span></code></pre></div></li><li><p>border-image-slice</p><p>决定边框图片切割的位置。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-image-slice</span><span style="color:#E1E4E8;">: 70 70 70 70; 上右下左</span></span>
<span class="line"><span style="color:#85E89D;">border-image-slice</span><span style="color:#E1E4E8;">: 70 70; 上下 左右</span></span>
<span class="line"><span style="color:#85E89D;">border-image-slice</span><span style="color:#E1E4E8;">: 70; 上右下左</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-image-slice</span><span style="color:#24292E;">: 70 70 70 70; 上右下左</span></span>
<span class="line"><span style="color:#22863A;">border-image-slice</span><span style="color:#24292E;">: 70 70; 上下 左右</span></span>
<span class="line"><span style="color:#22863A;">border-image-slice</span><span style="color:#24292E;">: 70; 上右下左</span></span></code></pre></div><p>默认单位是像素（px），不需要在加单位。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-image-slice</span><span style="color:#E1E4E8;">: 10% 20% 30% 40%; 上右下左</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-image-slice</span><span style="color:#24292E;">: 10% 20% 30% 40%; 上右下左</span></span></code></pre></div></li><li><p>border-image-repeat</p><p>当前图片的显示方式。</p><p>stretch：图片拉伸，图片不会被切割 repeat：4个角的图片进行平铺，不是整数倍时，图片会被切割 round：4个角的图片进行平铺，不会进行切割</p></li><li><p>border-image-width</p><p>定义边框的宽度，可以使用此属性重新定义border-width。</p></li><li><p>border-image-outset</p><p>图片向外扩充的距离。</p></li></ul><p>简写形式</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-image</span><span style="color:#E1E4E8;">: url </span><span style="color:#85E89D;">border-image-slice</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">border-image-repeat</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#85E89D;">border-image</span><span style="color:#E1E4E8;">: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">) 70 repeat;</span></span>
<span class="line"><span style="color:#85E89D;">border-image</span><span style="color:#E1E4E8;">: url slice / width / outset  </span><span style="color:#85E89D;">border-image-repeat</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#85E89D;">border-image</span><span style="color:#E1E4E8;">: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">) 70 / 70px / 20px repeat;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-image</span><span style="color:#24292E;">: url </span><span style="color:#22863A;">border-image-slice</span><span style="color:#24292E;"> </span><span style="color:#22863A;">border-image-repeat</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#22863A;">border-image</span><span style="color:#24292E;">: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">) 70 repeat;</span></span>
<span class="line"><span style="color:#22863A;">border-image</span><span style="color:#24292E;">: url slice / width / outset  </span><span style="color:#22863A;">border-image-repeat</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#22863A;">border-image</span><span style="color:#24292E;">: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">) 70 / 70px / 20px repeat;</span></span></code></pre></div><p>order-image会把border的属性全部都替换掉。</p><p>注意事项</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-image</span><span style="color:#E1E4E8;">: url(img/1</span><span style="color:#B392F0;">.png</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-image</span><span style="color:#24292E;">: url(img/1</span><span style="color:#6F42C1;">.png</span><span style="color:#24292E;">);</span></span></code></pre></div><p>使用border-image至少指定一个地址，地址是必选项，别的都是可选项。 只有一个图片时，盒子的四个角都有完整的图片显示。 如果slice切割超过图片大小，中间轮空，盒子的四个角都会显示图片。</p><h2 id="四、盒子阴影、边框圆角-背景与边框模块" tabindex="-1">四、盒子阴影、边框圆角 - 背景与边框模块 <a class="header-anchor" href="#四、盒子阴影、边框圆角-背景与边框模块" aria-label="Permalink to &quot;四、盒子阴影、边框圆角 - 背景与边框模块&quot;">​</a></h2><h3 id="_1-border-radius" tabindex="-1">1. border-radius <a class="header-anchor" href="#_1-border-radius" aria-label="Permalink to &quot;1. border-radius&quot;">​</a></h3><h4 id="_1-1-圆角" tabindex="-1">1.1 圆角 <a class="header-anchor" href="#_1-1-圆角" aria-label="Permalink to &quot;1.1 圆角&quot;">​</a></h4><p>border-radius: 50%; 圆角</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">box-sizing</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">border-box</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">yellow</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-right</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">box-sizing</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">border-box</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">yellow</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-right</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>50% 代表百分比。</p><p>当盒子为200px时，指定的像素就是100px。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">box-sizing</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">border-box</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">yellow</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-right</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">box-sizing</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">border-box</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">yellow</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-right</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>100px 指代当前定宽度和高度指定的值，可以写作 100px 100px。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">box-sizing</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">border-box</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">yellow</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-right</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">box-sizing</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">border-box</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">yellow</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-right</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>使用百分比也是确认具体的像素。</p><h4 id="_1-2-实现椭圆" tabindex="-1">1.2 实现椭圆 <a class="header-anchor" href="#_1-2-实现椭圆" aria-label="Permalink to &quot;1.2 实现椭圆&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">400</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">box-sizing</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">border-box</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">yellow</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-right</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">400</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">box-sizing</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">border-box</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">yellow</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-right</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="_1-3-不同写法" tabindex="-1">1.3 不同写法 <a class="header-anchor" href="#_1-3-不同写法" aria-label="Permalink to &quot;1.3 不同写法&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.wrap</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.wrap</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>4个边高度和宽度都是30px。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px 30px 30px / 30px 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px 30px 30px / 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px 30px 30px / 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 30px 30px 30px 30px / 30px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px 30px 30px / 30px 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px 30px 30px / 30px 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px 30px 30px / 30px 30px;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 30px 30px 30px 30px / 30px;</span></span></code></pre></div><h5 id="_1-3-1-百分比写法" tabindex="-1">1.3.1 百分比写法 <a class="header-anchor" href="#_1-3-1-百分比写法" aria-label="Permalink to &quot;1.3.1 百分比写法&quot;">​</a></h5><p>长宽都是33.33%的百分比。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 33.33%;</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 33.33% 33.33%; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 33.33px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 100px 33.33px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 100px 33.33px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 100px 33.33px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 33.33%;</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 33.33% 33.33%; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 33.33px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 100px 33.33px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 100px 33.33px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 100px 33.33px;</span></span></code></pre></div><h5 id="_1-3-2-一般写法" tabindex="-1">1.3.2 一般写法 <a class="header-anchor" href="#_1-3-2-一般写法" aria-label="Permalink to &quot;1.3.2 一般写法&quot;">​</a></h5><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 50px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 100px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 50px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 100px 100px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 50px 50px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 50px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 100px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 50px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 100px 100px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 50px 50px;</span></span></code></pre></div><p>border-radius 一个值时，每一个宽高比都是 30% 30%. 二个值时，左上角为第一个值，右上代表第二个值， 右下为第一个值，左下为第二个值。对应关系是 1 2 1 2。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 50px 100px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 100px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 50px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 100px 100px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 50px 50px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 50px 100px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 100px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 50px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 100px 100px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 50px 50px;</span></span></code></pre></div><p>三个值时，效果和两个值一致。1 2 1（存在3） 2</p><h5 id="_1-3-3-的写法" tabindex="-1">1.3.3 “/” 的写法 <a class="header-anchor" href="#_1-3-3-的写法" aria-label="Permalink to &quot;1.3.3 “/” 的写法&quot;">​</a></h5><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px / 50px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px / 50px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 100px 50px;</span></span></code></pre></div><p>&#39;/&#39; 的方式代表一个角的宽高比。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 50px / 50px 30px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 50px 30px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 50px 30px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 50px / 50px 30px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 50px 30px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 50px 30px;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 50px 80px/ 50px 30px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 50px 30px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 80px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 50px 30px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 50px 80px/ 50px 30px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 50px 30px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 80px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 50px 30px;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 50px 80px/ 50px 100px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 100px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 50px 100px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 80px 50px;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 50px 100px;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 50px 80px/ 50px 100px; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 100px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 50px 100px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 80px 50px;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 50px 100px;</span></span></code></pre></div><p>00 + 50 &gt; 100，高度超出盒子的最大值，图像变形。 一旦超出盒子的大小，图片就会变形。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 10% 30% 50% 70%; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 10%;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 30%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 50%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 70%;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 10% 30% 50% 70%; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 10%;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 30%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 50%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 70%;</span></span></code></pre></div><p>百分比代表每一个角的角度。 图片变形 50% + 70% = 120% &gt; 100%</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 10% 30% 50%; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 10%;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 30%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 50%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 30%;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 10% 30% 50%; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 10%;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 30%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 50%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 30%;</span></span></code></pre></div><p>1212 的规则进行赋值。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 10% 20% / 30% 50%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 10% 30%;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 20% 50%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 10% 30%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 20% 50%;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 10% 20% / 30% 50%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 10% 30%;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 20% 50%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 10% 30%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 20% 50%;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 10% 20% 50% / 30% 50%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#85E89D;">border-top-left-radius</span><span style="color:#E1E4E8;">: 10% 30%;</span></span>
<span class="line"><span style="color:#85E89D;">border-top-right-radius</span><span style="color:#E1E4E8;">: 20% 50%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: 50% 30%;</span></span>
<span class="line"><span style="color:#85E89D;">border-bottom-left-radius</span><span style="color:#E1E4E8;">: 20% 50%;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 第一种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 10% 20% 50% / 30% 50%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 第二种写法 */</span></span>
<span class="line"><span style="color:#22863A;">border-top-left-radius</span><span style="color:#24292E;">: 10% 30%;</span></span>
<span class="line"><span style="color:#22863A;">border-top-right-radius</span><span style="color:#24292E;">: 20% 50%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-right-radius</span><span style="color:#24292E;">: 50% 30%;</span></span>
<span class="line"><span style="color:#22863A;">border-bottom-left-radius</span><span style="color:#24292E;">: 20% 50%;</span></span></code></pre></div><h4 id="_1-4-实现半圆" tabindex="-1">1.4 实现半圆 <a class="header-anchor" href="#_1-4-实现半圆" aria-label="Permalink to &quot;1.4 实现半圆&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>第一种实现方法</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.wrap</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.wrap</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>第二种实现方法</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 100px 0 0 / 100px 100px 0 0;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 100px 0 0 / 100px 100px 0 0;</span></span></code></pre></div><p>第三种实现方法</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 100px 100px 0 0;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 100px 100px 0 0;</span></span></code></pre></div><h4 id="_1-5-实现叶子" tabindex="-1">1.5 实现叶子 <a class="header-anchor" href="#_1-5-实现叶子" aria-label="Permalink to &quot;1.5 实现叶子&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>第一种实现方法</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.wrap</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-left-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">290</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">93</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-bottom-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">290</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">93</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top-right-radius</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.wrap</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-left-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">290</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">93</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-bottom-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">290</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">93</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top-right-radius</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>第二种实现方法</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">border-radius</span><span style="color:#E1E4E8;">: 97% 3% 98% 3%;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">border-radius</span><span style="color:#24292E;">: 97% 3% 98% 3%;</span></span></code></pre></div><p>兼容性: <a href="https://developer.mozilla.org/zh-CN/" target="_blank" rel="noreferrer">查看MDN官网</a></p><h3 id="_2-box-shadow" tabindex="-1">2. box-shadow <a class="header-anchor" href="#_2-box-shadow" aria-label="Permalink to &quot;2. box-shadow&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">orange</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">orange</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>box-shadow: x-offset y-offset blur-radius spead-radius color inset; ​</p><ul><li>x-offset：向右偏移</li><li>y-offset：向下偏移</li><li>blur-radius：模糊半径(物体清晰与否, 默认值为0）</li><li>spead-radius：拓展半径（决定阴影的大小）</li><li>color：阴影颜色</li><li>inset：向内投影 ​<br> box-shadow: 10px 10px 10px 1px; ​<br> 盒子阴影和盒子同等大小。</li></ul><p>可以同时为盒子设置多个阴影（多重阴影）。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">box-shadow</span><span style="color:#E1E4E8;">: 4px 2px 1px 1px </span><span style="color:#B392F0;">#f40</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            0px 0px 1px 1px </span><span style="color:#FDAEB7;font-style:italic;">#000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            -4px -2px 6px blue inset;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">box-shadow</span><span style="color:#24292E;">: 4px 2px 1px 1px </span><span style="color:#6F42C1;">#f40</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            0px 0px 1px 1px </span><span style="color:#B31D28;font-style:italic;">#000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            -4px -2px 6px blue inset;</span></span></code></pre></div><p>box-shadow比较影响性能,尽量少用,多重阴影基本不使用.</p><h2 id="五、word-wrap、white-space、word-break-文字与颜色模块" tabindex="-1">五、word-wrap、white-space、word-break - 文字与颜色模块 <a class="header-anchor" href="#五、word-wrap、white-space、word-break-文字与颜色模块" aria-label="Permalink to &quot;五、word-wrap、white-space、word-break - 文字与颜色模块&quot;">​</a></h2><h3 id="_1-text-shadow-文本阴影" tabindex="-1">1. text-shadow（文本阴影） <a class="header-anchor" href="#_1-text-shadow-文本阴影" aria-label="Permalink to &quot;1. text-shadow（文本阴影）&quot;">​</a></h3><p>text-shadow: x-offset y-offset blur-radius color;</p><ul><li>x-offset：向右偏移</li><li>y-offset：向下偏移</li><li>blur-radius：模糊半径(物体清晰与否, 默认值为0）</li><li>color：阴影颜色</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;这是测试&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;这是测试&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">text-shadow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">text-shadow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">blue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">text-shadow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">text-shadow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">blue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_2-word-wrap-文字折行" tabindex="-1">2. word-wrap （文字折行） <a class="header-anchor" href="#_2-word-wrap-文字折行" aria-label="Permalink to &quot;2. word-wrap （文字折行）&quot;">​</a></h3><p>原本是微软的私有属性，目前在CSS3草案中重新命名，等同于overflow-wrap。 overflow-wrap属性有的浏览器不兼容，所以还是以word-wrap为准。</p><p>word-wrap对于中英文处理方式是不同的。</p><p>CJK Chinese/Japanese/Korea 日语、韩语同中文的处理方式是一致的。</p><p>normal | break-word</p><h4 id="_2-1-normal" tabindex="-1">2.1 normal <a class="header-anchor" href="#_2-1-normal" aria-label="Permalink to &quot;2.1 normal&quot;">​</a></h4><ul><li><p>英文</p><p>解析单词时，如果长度过长，会超出文本范围。</p><p>对于半角的空格，连字符（-）会默认换行。</p><p>半角和全角</p><ul><li>半角：字节和英文单词是一致 1个字节</li><li>全角：字节和汉字一致 2个字节</li></ul><p>对于多行文本来说，必须都手动换行，否则还是会超出文本范围。</p></li><li><p>中文</p><p>只要汉字达到文本界限，都会默认换行。 浏览器不会让标点符号位于文字行首。</p><p>如果标点符号超出文本范围，然后文本会随标点符号一起作为行首。</p><p>如何让标签符号位于行首？ 可以在标点符号前添加空格处理。</p></li></ul><h4 id="_2-2-break-word" tabindex="-1">2.2 break-word <a class="header-anchor" href="#_2-2-break-word" aria-label="Permalink to &quot;2.2 break-word&quot;">​</a></h4><ul><li><p>英文</p><p>对于超出部分的长单词，会进行截断处理，让单词被打断。</p><p>如何让单词换行的同时，不打断单词？</p><p>可以使用word-break属性。word-break: break-all。</p></li><li><p>中文</p></li></ul><h3 id="_3-word-break-文本折行" tabindex="-1">3. word-break 文本折行 <a class="header-anchor" href="#_3-word-break-文本折行" aria-label="Permalink to &quot;3. word-break 文本折行&quot;">​</a></h3><p>normal | break-all | keep-all</p><h4 id="_3-1-break-all" tabindex="-1">3.1 break-all <a class="header-anchor" href="#_3-1-break-all" aria-label="Permalink to &quot;3.1 break-all&quot;">​</a></h4><p>单词之间的断句，单词截断的一种处理方式。</p><h4 id="_3-2-keep-all" tabindex="-1">3.2 keep-all <a class="header-anchor" href="#_3-2-keep-all" aria-label="Permalink to &quot;3.2 keep-all&quot;">​</a></h4><p>把所有的单词都展示完全，超出也不处理。</p><p>word-wrap对文本会有另起一行的处理，word-break会强行进行文字打断，并另起一行。</p><h3 id="_4-white-space" tabindex="-1">4. white-space <a class="header-anchor" href="#_4-white-space" aria-label="Permalink to &quot;4. white-space&quot;">​</a></h3><p>针对空格、换行等空白的处理。</p><p>normal | pre | nowrap | pre-wrap | pre-line</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  saaaaaaaaaaaaaaasdsa</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  adadasda</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  asdsadasda</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  saaaaaaaaaaaaaaasdsa</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  adadasda</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  asdsadasda</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="_4-1-normal" tabindex="-1">4.1 normal <a class="header-anchor" href="#_4-1-normal" aria-label="Permalink to &quot;4.1 normal&quot;">​</a></h4><p>默认合并换行为一个空格，超出单词不处理。 默认会合并多个空格为一个空格。</p><p>换行和空格都直接合并成一个，文字超出不进行处理，如果存在空格，会进行换行。</p><h4 id="_4-2-nowrap" tabindex="-1">4.2 nowrap <a class="header-anchor" href="#_4-2-nowrap" aria-label="Permalink to &quot;4.2 nowrap&quot;">​</a></h4><p>换行合并，空格合并，文字不会折行，全部排列在一行。</p><p>强制性的将文本展示到一行内。</p><h4 id="_4-3-pre" tabindex="-1">4.3 pre <a class="header-anchor" href="#_4-3-pre" aria-label="Permalink to &quot;4.3 pre&quot;">​</a></h4><p>根据pre标签对文本的处理方式设计的pre。 将换行和空格全部保留，文本超出不会换行。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">pre</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">pre</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">pre</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">pre</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>可以使用pre标签将换行和空格等全部保留下来。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">pre</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&amp;lt;</span><span style="color:#E1E4E8;">html</span><span style="color:#79B8FF;">&amp;gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&amp;lt;</span><span style="color:#E1E4E8;">head</span><span style="color:#79B8FF;">&amp;gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&amp;lt;</span><span style="color:#E1E4E8;">/head</span><span style="color:#79B8FF;">&amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&amp;lt;</span><span style="color:#E1E4E8;">body</span><span style="color:#79B8FF;">&amp;gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&amp;lt;</span><span style="color:#E1E4E8;">/body</span><span style="color:#79B8FF;">&amp;gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&amp;lt;</span><span style="color:#E1E4E8;">/html</span><span style="color:#79B8FF;">&amp;gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">pre</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">pre</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&amp;lt;</span><span style="color:#24292E;">html</span><span style="color:#005CC5;">&amp;gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&amp;lt;</span><span style="color:#24292E;">head</span><span style="color:#005CC5;">&amp;gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&amp;lt;</span><span style="color:#24292E;">/head</span><span style="color:#005CC5;">&amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&amp;lt;</span><span style="color:#24292E;">body</span><span style="color:#005CC5;">&amp;gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&amp;lt;</span><span style="color:#24292E;">/body</span><span style="color:#005CC5;">&amp;gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&amp;lt;</span><span style="color:#24292E;">/html</span><span style="color:#005CC5;">&amp;gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">pre</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="_4-4-pre-line" tabindex="-1">4.4 pre-line <a class="header-anchor" href="#_4-4-pre-line" aria-label="Permalink to &quot;4.4 pre-line&quot;">​</a></h4><p>保留换行，一行中空格合并。文本超出正常换行。</p><h4 id="_4-5-pre-wrap" tabindex="-1">4.5 pre-wrap <a class="header-anchor" href="#_4-5-pre-wrap" aria-label="Permalink to &quot;4.5 pre-wrap&quot;">​</a></h4><p>将换行和空格全部保留，文本超出会换行。</p><p>兼容性：</p><p>pre-line、pre-wrap 是css3新增的，IE7及IE7以下都不支持。</p><h4 id="_4-6-单行文本溢出" tabindex="-1">4.6 单行文本溢出 <a class="header-anchor" href="#_4-6-单行文本溢出" aria-label="Permalink to &quot;4.6 单行文本溢出&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">overflow: hidden;</span></span>
<span class="line"><span style="color:#85E89D;">white-space</span><span style="color:#E1E4E8;">: nowrap; // 单行显示</span></span>
<span class="line"><span style="color:#85E89D;">text-overflow</span><span style="color:#E1E4E8;">: ellipsis; // 溢出部分以小圆点显示</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">overflow: hidden;</span></span>
<span class="line"><span style="color:#22863A;">white-space</span><span style="color:#24292E;">: nowrap; // 单行显示</span></span>
<span class="line"><span style="color:#22863A;">text-overflow</span><span style="color:#24292E;">: ellipsis; // 溢出部分以小圆点显示</span></span></code></pre></div><h3 id="_5-css语法" tabindex="-1">5. css语法 <a class="header-anchor" href="#_5-css语法" aria-label="Permalink to &quot;5. css语法&quot;">​</a></h3><p>css语法是以属性和值构成的。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>color: red; =&gt; 属性和值的方式叫做css声明，声明是以分号隔开的。</p><p>所有的声明都在 {} 包裹之下。 {} =&gt; css声明块，以 {} 的形式被组合起来。</p><p>选择器放置在声明块的最前面，用来选择页面中的元素或多个元素。 选择器和声明块被称为规则的集合，简称CSS规则。</p><p>CSS规则可以定义很多的样式，不同的规则可能选择同一个元素。 不同的属性设置不同的样式，CSS3的样式的展示是由层叠样式表决定的。</p><p>层叠是一种算法，层叠算法，决定哪个优先级更高。</p><p>CSS规则 =&gt;</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">red</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>css语句包括两类：</p><ul><li>css规则</li><li>at规则</li></ul><p>css1 css2.1下只能够使用css规则。css3中新增at规则。</p><p>@ketframes at 规则</p><blockquote><p>at规则通过CSS样式在一些特殊的场景下会有特殊的用法。</p></blockquote><p>at规则包括什么？</p><ul><li>@keyframes 定义动画</li><li>@charset 定义样式表使用的字符集</li><li>@import 引入外部样式表</li><li>@namespace 配置xml使用，能够在xml取一个单独的命名空间</li><li>@media 媒体查询</li><li>@font-face 引入字体文件</li><li>...</li></ul><p>at语法可以归结成一类，条件规则组。</p><p>条件规则组：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@keyframes</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> { }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">to</span><span style="color:#E1E4E8;"> { }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@keyframes</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> { }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">to</span><span style="color:#24292E;"> { }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>@font-face</p><p>指定一个字体。</p><p><a href="https://www.dafont.com" target="_blank" rel="noreferrer">https://www.dafont.com</a></p><p>ttf、otf 字体格式</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@font-face</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-family</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;yueluoFont&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">src</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../font/Mathline.otf&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;../font/Mathline.otf&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">format</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;otf&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-family</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;yueluoFont&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@font-face</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-family</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;yueluoFont&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">src</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">url</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../font/Mathline.otf&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">url</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;../font/Mathline.otf&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">format</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;otf&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-family</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;yueluoFont&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>因为浏览器对字体的支持情况不一致，使用多个字体时要用format指定字体后缀。</p><h2 id="六、column多列布局、gradient-文字与颜色模块" tabindex="-1">六、column多列布局、gradient - 文字与颜色模块 <a class="header-anchor" href="#六、column多列布局、gradient-文字与颜色模块" aria-label="Permalink to &quot;六、column多列布局、gradient - 文字与颜色模块&quot;">​</a></h2><h3 id="_1-补充部分-text-overflow" tabindex="-1">1. 补充部分：text-overflow <a class="header-anchor" href="#_1-补充部分-text-overflow" aria-label="Permalink to &quot;1. 补充部分：text-overflow&quot;">​</a></h3><p>ellipsis | clip（默认值）</p><p>其他属性不常用，兼容性不好。 多列布局的相关属性最低版本的要求是IE10。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ssssssssssssssssssssssssssssssss</span></span>
<span class="line"><span style="color:#E1E4E8;">  ssssssssssssssssssssssssssssssss</span></span>
<span class="line"><span style="color:#E1E4E8;">  ssssssssssssssssssssssssssssssss</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  ssssssssssssssssssssssssssssssss</span></span>
<span class="line"><span style="color:#24292E;">  ssssssssssssssssssssssssssssssss</span></span>
<span class="line"><span style="color:#24292E;">  ssssssssssssssssssssssssssssssss</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">text-overflow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">clip</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">white-space</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">nowrap</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">overflow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">hidden</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">text-overflow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">clip</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">white-space</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">nowrap</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">overflow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">hidden</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_2-多列布局-columns" tabindex="-1">2. 多列布局 columns <a class="header-anchor" href="#_2-多列布局-columns" aria-label="Permalink to &quot;2. 多列布局 columns&quot;">​</a></h3><p>多列布局不是布局方式，是文字的多列布局。是文字的一种排列方式。</p><p>columns: 宽度(column-width) 列数(column-count);</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;“我们要坚持人民至上、生命至上，统筹资源，团结合作，尽最大努力保护人民生命安全和身体健康，最大限度降低疫情负面影响。”&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">　&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;新冠肺炎疫情发生以来，习近平主席始终坚持人民至上理念，在统筹做好本国疫情防控和经济社会发展工作的同时，频繁与多个国家领导人及国际组织负责人保持电话、书信、视频会议为主渠道的“云外交”沟通，处处体现着习近平主席以人民为中心的发展思想。&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;“我们要坚持人民至上、生命至上，统筹资源，团结合作，尽最大努力保护人民生命安全和身体健康，最大限度降低疫情负面影响。”&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">　&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;新冠肺炎疫情发生以来，习近平主席始终坚持人民至上理念，在统筹做好本国疫情防控和经济社会发展工作的同时，频繁与多个国家领导人及国际组织负责人保持电话、书信、视频会议为主渠道的“云外交”沟通，处处体现着习近平主席以人民为中心的发展思想。&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="_2-1-column" tabindex="-1">2.1 column <a class="header-anchor" href="#_2-1-column" aria-label="Permalink to &quot;2.1 column&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">600</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">400</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">columns</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">column-width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">column-count</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">600</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">400</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">columns</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">column-width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">column-count</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>宽度和列数都是可选项。 宽度和列数可以只配置一项，两者是有冲突的。</p><p>默认字体是16px。多列布局中的距离也是16px。 可以控制文字大小来控制列与列之间的距离。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">600</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">400</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">16</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">600</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">400</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">16</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过更改默认字体大小的方式来修改默认制表符的大小，也就是列与列之间的宽度。 这种方式也存在问题，如果盒子中增加标题，字体为0. 可以通过修改column-gap属性，来修改制表符大小。</p><h4 id="_2-2-column-gap" tabindex="-1">2.2 column-gap <a class="header-anchor" href="#_2-2-column-gap" aria-label="Permalink to &quot;2.2 column-gap&quot;">​</a></h4><p>gap：间歇 缺口。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">column-gap</span><span style="color:#E1E4E8;">：制表符宽度。</span></span>
<span class="line"><span style="color:#85E89D;">column-gap</span><span style="color:#E1E4E8;">: 2px;</span></span>
<span class="line"><span style="color:#85E89D;">column-gap</span><span style="color:#E1E4E8;">: 10%;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">column-gap</span><span style="color:#24292E;">：制表符宽度。</span></span>
<span class="line"><span style="color:#22863A;">column-gap</span><span style="color:#24292E;">: 2px;</span></span>
<span class="line"><span style="color:#22863A;">column-gap</span><span style="color:#24292E;">: 10%;</span></span></code></pre></div><p>也可以使用百分比的方式，基于盒子的大小。 不过其兼容性不好，IE10不支持百分比的写法。</p><h4 id="_2-3-column-rule-文本分割线" tabindex="-1">2.3 column-rule 文本分割线 <a class="header-anchor" href="#_2-3-column-rule-文本分割线" aria-label="Permalink to &quot;2.3 column-rule 文本分割线&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">column-rule</span><span style="color:#E1E4E8;">：1px solid </span><span style="color:#FDAEB7;font-style:italic;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">column-rule-width</span><span style="color:#E1E4E8;">: 1px;</span></span>
<span class="line"><span style="color:#85E89D;">column-rule-style</span><span style="color:#E1E4E8;">: solid;</span></span>
<span class="line"><span style="color:#85E89D;">column-rule-color</span><span style="color:#E1E4E8;">: </span><span style="color:#FDAEB7;font-style:italic;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">column-rule-style</span><span style="color:#E1E4E8;">：</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">column-rule</span><span style="color:#24292E;">：1px solid </span><span style="color:#B31D28;font-style:italic;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">column-rule-width</span><span style="color:#24292E;">: 1px;</span></span>
<span class="line"><span style="color:#22863A;">column-rule-style</span><span style="color:#24292E;">: solid;</span></span>
<span class="line"><span style="color:#22863A;">column-rule-color</span><span style="color:#24292E;">: </span><span style="color:#B31D28;font-style:italic;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">column-rule-style</span><span style="color:#24292E;">：</span></span></code></pre></div><p>solid（实线） | dotted（点状） | dashed（虚线）| double（双实线）| groove（凹槽）| ridge（脊背）| insert（向里）| outset（向外）| none | hidden |</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">600</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">400</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">columns</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">column-gap</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">column-rule</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dotted</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">600</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">400</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">columns</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">column-gap</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">column-rule</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dotted</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_2-4-column-span" tabindex="-1">2.4 column-span <a class="header-anchor" href="#_2-4-column-span" aria-label="Permalink to &quot;2.4 column-span&quot;">​</a></h4><p>none（默认值 元素横跨一列） | all（元素横跨所有列）</p><p>column-span: none | all;</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">column-span</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">all</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> </span><span style="color:#22863A;">h2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">column-span</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">all</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">column-span</span><span style="color:#E1E4E8;">: all;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">column-span</span><span style="color:#24292E;">: all;</span></span></code></pre></div><p>元素横跨所有列。</p><h3 id="_3-gradient、渐变" tabindex="-1">3. gradient、渐变 <a class="header-anchor" href="#_3-gradient、渐变" aria-label="Permalink to &quot;3. gradient、渐变&quot;">​</a></h3><h4 id="_3-1-颜色相关" tabindex="-1">3.1 颜色相关 <a class="header-anchor" href="#_3-1-颜色相关" aria-label="Permalink to &quot;3.1 颜色相关&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rgb：rgb(123, 123, 123)</span></span>
<span class="line"><span style="color:#E1E4E8;">rgba：rgba(123, 123, </span><span style="color:#FDAEB7;font-style:italic;">.5</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rgb：rgb(123, 123, 123)</span></span>
<span class="line"><span style="color:#24292E;">rgba：rgba(123, 123, </span><span style="color:#B31D28;font-style:italic;">.5</span><span style="color:#24292E;">)</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">hsl：hsl(120, 70%, 12%)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">hsl：hsl(120, 70%, 12%)</span></span></code></pre></div><p>h hue 色调 -360-360 l light 亮度 光源强弱问题 0-100% 百分比 s saturation 饱和度 0-100% 百分比</p><p>值 &gt; 360 时，值实际等于 =&gt; 值 % 360</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">hsla: hsla(120, 70%, 12%, </span><span style="color:#FDAEB7;font-style:italic;">.5</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">hsla: hsla(120, 70%, 12%, </span><span style="color:#B31D28;font-style:italic;">.5</span><span style="color:#24292E;">)</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-color</span><span style="color:#E1E4E8;">: rgba(255, 255, 255, </span><span style="color:#FDAEB7;font-style:italic;">.8</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#85E89D;">background-color</span><span style="color:#E1E4E8;">: hsl(120, 70%, 12%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-color</span><span style="color:#24292E;">: rgba(255, 255, 255, </span><span style="color:#B31D28;font-style:italic;">.8</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#22863A;">background-color</span><span style="color:#24292E;">: hsl(120, 70%, 12%);</span></span></code></pre></div><h4 id="_3-2-渐变" tabindex="-1">3.2 渐变 <a class="header-anchor" href="#_3-2-渐变" aria-label="Permalink to &quot;3.2 渐变&quot;">​</a></h4><p>渐变方式有两种，线性渐变和径向渐变。</p><p>渐变是一个image方式的值，本质上是一张图片。</p><ul><li><p>linear-gradient：线性渐变</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: ([</span><span style="color:#B392F0;">derection</span><span style="color:#E1E4E8;">], color, color);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: ([</span><span style="color:#B392F0;">derection</span><span style="color:#E1E4E8;">], color [</span><span style="color:#B392F0;">percent</span><span style="color:#E1E4E8;">], color [</span><span style="color:#B392F0;">percent</span><span style="color:#E1E4E8;">]);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: ([</span><span style="color:#6F42C1;">derection</span><span style="color:#24292E;">], color, color);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: ([</span><span style="color:#6F42C1;">derection</span><span style="color:#24292E;">], color [</span><span style="color:#6F42C1;">percent</span><span style="color:#24292E;">], color [</span><span style="color:#6F42C1;">percent</span><span style="color:#24292E;">]);</span></span></code></pre></div></li><li><p>radial-gradient: 径向渐变</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: ([shape at </span><span style="color:#B392F0;">position</span><span style="color:#E1E4E8;">], color [</span><span style="color:#B392F0;">percent</span><span style="color:#E1E4E8;">], color [</span><span style="color:#B392F0;">percent</span><span style="color:#E1E4E8;">]);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: ([shape at </span><span style="color:#6F42C1;">position</span><span style="color:#24292E;">], color [</span><span style="color:#6F42C1;">percent</span><span style="color:#24292E;">], color [</span><span style="color:#6F42C1;">percent</span><span style="color:#24292E;">]);</span></span></code></pre></div></li></ul><p>渐变都兼容IE10，IE9及IE9以下都不兼容。以线性渐变为例。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient([</span><span style="color:#B392F0;">derection</span><span style="color:#E1E4E8;">], color, color));</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: -webkit-linear-gradient([</span><span style="color:#B392F0;">derection</span><span style="color:#E1E4E8;">], color, color));</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: -moz-linear-gradient([</span><span style="color:#B392F0;">derection</span><span style="color:#E1E4E8;">], color, color));</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: -o-linear-gradient([</span><span style="color:#B392F0;">derection</span><span style="color:#E1E4E8;">], color, color));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient([</span><span style="color:#6F42C1;">derection</span><span style="color:#24292E;">], color, color));</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: -webkit-linear-gradient([</span><span style="color:#6F42C1;">derection</span><span style="color:#24292E;">], color, color));</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: -moz-linear-gradient([</span><span style="color:#6F42C1;">derection</span><span style="color:#24292E;">], color, color));</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: -o-linear-gradient([</span><span style="color:#6F42C1;">derection</span><span style="color:#24292E;">], color, color));</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-image</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">linear-gradient</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">red</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">green</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-image</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">linear-gradient</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">red</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">green</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="_3-2-1-线性渐变" tabindex="-1">3.2.1 线性渐变 <a class="header-anchor" href="#_3-2-1-线性渐变" aria-label="Permalink to &quot;3.2.1 线性渐变&quot;">​</a></h5><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(red 50, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(red 0, yellow 50%, green 100%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to top, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to bottom, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to left, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to right, red 0, green 100%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to top right, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to top left, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to bottom left, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(to bottom right, red 0, green 100%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(red 50, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(red 0, yellow 50%, green 100%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to top, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to bottom, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to left, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to right, red 0, green 100%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to top right, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to top left, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to bottom left, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(to bottom right, red 0, green 100%);</span></span></code></pre></div><p>也可以根据角度设置方向。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(45deg, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: linear-gradient(125deg, red 0, green 100%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(45deg, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: linear-gradient(125deg, red 0, green 100%);</span></span></code></pre></div><h5 id="_3-2-2-径向渐变" tabindex="-1">3.2.2 径向渐变 <a class="header-anchor" href="#_3-2-2-径向渐变" aria-label="Permalink to &quot;3.2.2 径向渐变&quot;">​</a></h5><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">, red, green);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">, red, green);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">, red 0, green 100%);</span></span></code></pre></div><p>position可以用像素、关键字或者百分比指定。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at 100px 100px, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at 100px, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at 100px </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at top </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at 200px 0, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> at 100% 0, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> 100px at 100% 0, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> 200px at 100% 0, red 0, green 100%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">ellipse</span><span style="color:#E1E4E8;"> 100px 50px at </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">ellipse</span><span style="color:#E1E4E8;"> at </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">ellipse</span><span style="color:#E1E4E8;"> 200px 100px at </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 0, green 100%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at 100px 100px, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at 100px, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at 100px </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at </span><span style="color:#22863A;">center</span><span style="color:#24292E;"> </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at top </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at 200px 0, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> at 100% 0, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> 100px at 100% 0, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> 200px at 100% 0, red 0, green 100%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">ellipse</span><span style="color:#24292E;"> 100px 50px at </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">ellipse</span><span style="color:#24292E;"> at </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 0, green 100%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">ellipse</span><span style="color:#24292E;"> 200px 100px at </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 0, green 100%);</span></span></code></pre></div><p>案例</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: radial-gradient(</span><span style="color:#85E89D;">ellipse</span><span style="color:#E1E4E8;"> at </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red 10%, gold 30%, orange 50%, blue 100%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: radial-gradient(</span><span style="color:#22863A;">ellipse</span><span style="color:#24292E;"> at </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red 10%, gold 30%, orange 50%, blue 100%);</span></span></code></pre></div><h2 id="七、repeating-linear-radial-grident-文字与颜色模块" tabindex="-1">七、repeating-linear/radial-grident - 文字与颜色模块 <a class="header-anchor" href="#七、repeating-linear-radial-grident-文字与颜色模块" aria-label="Permalink to &quot;七、repeating-linear/radial-grident - 文字与颜色模块&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;box&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;box&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h3 id="_1-repeating-linear-gradient" tabindex="-1">1. repeating-linear-gradient <a class="header-anchor" href="#_1-repeating-linear-gradient" aria-label="Permalink to &quot;1. repeating-linear-gradient&quot;">​</a></h3><p>重复的线性渐变。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-linear-gradient(red, green 20%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-linear-gradient(to top, red, green 20%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 实际上存在默认值，to bottom。 */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-linear-gradient(red, green 20%);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-linear-gradient(to top, red, green 20%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 实际上存在默认值，to bottom。 */</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-linear-gradient(to bottom left, red, green 20%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-linear-gradient(to bottom left, red, green 20%);</span></span></code></pre></div><h4 id="_1-1-斑马纹实现" tabindex="-1">1.1 斑马纹实现 <a class="header-anchor" href="#_1-1-斑马纹实现" aria-label="Permalink to &quot;1.1 斑马纹实现&quot;">​</a></h4><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">.box</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">background-image</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">repeating-linear-gradient</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bottom</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">right</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">#fff</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">.box</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">background-image</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">repeating-linear-gradient</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bottom</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">right</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">#fff</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-linear-gradient(to bottom left, red, green 10%, blue 10%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 如果重复定义同一个百分比，需要定义结束位置。 */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-linear-gradient(to bottom left, red, green 10%, blue 10%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 如果重复定义同一个百分比，需要定义结束位置。 */</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-linear-gradient(to bottom left, red, yellow 10%,green 10%, blue 20%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 百分比是可以被重写的，需要指定区段，0-10%是一段，10-20是一段。 */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-linear-gradient(to bottom left, red, yellow 10%,green 10%, blue 20%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 百分比是可以被重写的，需要指定区段，0-10%是一段，10-20是一段。 */</span></span></code></pre></div><h3 id="_2-repeating-radial-gradient" tabindex="-1">2. repeating-radial-gradient <a class="header-anchor" href="#_2-repeating-radial-gradient" aria-label="Permalink to &quot;2. repeating-radial-gradient&quot;">​</a></h3><p>重复的径向渐变。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">, red, green 50%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">, red, green 10%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">, red, green 10%, yellow 20%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">, red, green 50%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">, red, green 10%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">, red, green 10%, yellow 20%);</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;">, red, green 10%, yellow 10%, blue 20%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 区段划分。 */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;">, red, green 10%, yellow 10%, blue 20%);</span></span>
<span class="line"><span style="color:#6A737D;">/* 区段划分。 */</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> 100px, red, green 10%, yellow 10%, blue 20%);</span></span>
<span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">circle</span><span style="color:#E1E4E8;"> 100px at 0 0, red, green 10%, yellow 10%, blue 20%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> 100px, red, green 10%, yellow 10%, blue 20%);</span></span>
<span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">circle</span><span style="color:#24292E;"> 100px at 0 0, red, green 10%, yellow 10%, blue 20%);</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-image</span><span style="color:#E1E4E8;">: repeating-radial-gradient(</span><span style="color:#85E89D;">ellipse</span><span style="color:#E1E4E8;"> 200px 100px at </span><span style="color:#85E89D;">center</span><span style="color:#E1E4E8;">, red, green 10%, yellow 10%, blue 20%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-image</span><span style="color:#24292E;">: repeating-radial-gradient(</span><span style="color:#22863A;">ellipse</span><span style="color:#24292E;"> 200px 100px at </span><span style="color:#22863A;">center</span><span style="color:#24292E;">, red, green 10%, yellow 10%, blue 20%);</span></span></code></pre></div><ul><li>案例 Button</li></ul><h2 id="八、hsl、opacity与rgba、overflow-x、resize-盒模型与flex模块" tabindex="-1">八、hsl、opacity与rgba、overflow-x、resize - 盒模型与FLEX模块 <a class="header-anchor" href="#八、hsl、opacity与rgba、overflow-x、resize-盒模型与flex模块" aria-label="Permalink to &quot;八、hsl、opacity与rgba、overflow-x、resize - 盒模型与FLEX模块&quot;">​</a></h2><p>查看兼容性的网站：<a href="https://caniuse.com/" target="_blank" rel="noreferrer">https://caniuse.com/</a> 提供渐变颜色的模板：<a href="http://lea.verou.me/css3patterns/" target="_blank" rel="noreferrer">http://lea.verou.me/css3patterns/</a> 渐变生成的网站：<a href="http://www.colorzilla.com/gradient-editor/" target="_blank" rel="noreferrer">http://www.colorzilla.com/gradient-editor/</a></p><h3 id="_1-hsl" tabindex="-1">1. hsl <a class="header-anchor" href="#_1-hsl" aria-label="Permalink to &quot;1. hsl&quot;">​</a></h3><p>hsl(hue, saturation, lightness)</p><ul><li>h hue 色调 -360-360 色相环</li><li>s saturation 饱和度 0-100% 百分比</li><li>l light 亮度 光源强弱问题 0-100% 百分比</li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">background-color</span><span style="color:#E1E4E8;">: hsl(60, 50%, 50%);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">background-color</span><span style="color:#24292E;">: hsl(60, 50%, 50%);</span></span></code></pre></div><ul><li>0/360 - 红色（赤色）red</li><li>60 - 橙黄 yellow</li><li>120 - 绿色 green</li><li>180 - 青色 cyan</li><li>240 - 蓝色 blue</li><li>300 - 紫色（洋红）magenta</li></ul><p>速记</p><ol><li>赤橙黄绿青蓝紫</li><li>young guys can be messy Rascals.</li></ol><h3 id="_2-opacity与rgba" tabindex="-1">2. opacity与rgba <a class="header-anchor" href="#_2-opacity与rgba" aria-label="Permalink to &quot;2. opacity与rgba&quot;">​</a></h3><p>为什么存在opacity，要使用rgba?</p><p>opacity会作用在整个元素上，从而使元素上的内容都起到透明的效果。 如果仅需要颜色有透明的效果，建议使用rgba。</p><h3 id="_3-盒模型-css-box-css-basic-box-model" tabindex="-1">3. 盒模型（css-box，CSS Basic Box Model） <a class="header-anchor" href="#_3-盒模型-css-box-css-basic-box-model" aria-label="Permalink to &quot;3. 盒模型（css-box，CSS Basic Box Model）&quot;">​</a></h3><p>对文章进行布局时，浏览器渲染引擎会将所有元素渲染成矩形盒子，这就是通常所说的盒子模型。</p><p>盒模型包括 content area、padding area、border area、margin area。</p><h4 id="_3-1-盒模型存在层级关系" tabindex="-1">3.1 盒模型存在层级关系 <a class="header-anchor" href="#_3-1-盒模型存在层级关系" aria-label="Permalink to &quot;3.1 盒模型存在层级关系&quot;">​</a></h4><p><img src="https://gitee.com/heora/review/blob/master/css3/images/css_div3.jpg" alt="盒模型"></p><h4 id="_3-2-盒模型存在两种" tabindex="-1">3.2 盒模型存在两种 <a class="header-anchor" href="#_3-2-盒模型存在两种" aria-label="Permalink to &quot;3.2 盒模型存在两种&quot;">​</a></h4><p>W3C标准盒模型、IE6混杂模式的盒模型</p><ul><li><p>W3C标准盒模型：</p><ul><li>盒子所占空间宽度 = border area + padding area + content area</li><li>盒子宽度 = content area</li></ul></li><li><p>IE盒模型：</p><ul><li>盒子所占空间宽度 = border area + padding area + content area</li><li>盒子宽度 = border area + padding area + content area</li></ul></li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">box-sizing</span><span style="color:#E1E4E8;">: </span><span style="color:#85E89D;">border-box</span><span style="color:#E1E4E8;">; // IE6盒模型</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">box-sizing</span><span style="color:#24292E;">: </span><span style="color:#22863A;">border-box</span><span style="color:#24292E;">; // IE6盒模型</span></span></code></pre></div><p>border-box =&gt; E盒子模型的兼容性模式 padding内收、边框内收的方式 =&gt; border-box</p><p><img src="https://gitee.com/heora/review/blob/master/css3/images/css-box.png" alt="盒模型对比"></p><h4 id="_3-3-传统的布局方式-就是利用盒子模型来实现的" tabindex="-1">3.3 传统的布局方式，就是利用盒子模型来实现的 <a class="header-anchor" href="#_3-3-传统的布局方式-就是利用盒子模型来实现的" aria-label="Permalink to &quot;3.3 传统的布局方式，就是利用盒子模型来实现的&quot;">​</a></h4><ol><li>不规则布局，</li><li>两栏布局、三栏布局</li></ol><p>利用margin、padding、position、box-sizing等属性实现布局。</p><h3 id="_4-overflow-x-overflow-y" tabindex="-1">4. overflow-x/overflow-y <a class="header-anchor" href="#_4-overflow-x-overflow-y" aria-label="Permalink to &quot;4. overflow-x/overflow-y&quot;">​</a></h3><p>visible | hidden | scroll | auto</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">overflow: hidden; // 溢出隐藏</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">overflow: hidden; // 溢出隐藏</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">overflow-x</span><span style="color:#E1E4E8;">: scroll; // 水平方向溢出部分 滚动</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">overflow-x</span><span style="color:#24292E;">: scroll; // 水平方向溢出部分 滚动</span></span></code></pre></div><p>定义scroll属性时，内容区域没有超出，也会存在滚动条。 overflow-x，overflow-x，只要定义其中一个值，另一个的值也发生变化，由visible变为auto。</p><p>overflow不是一个复合值，不可以这样定义 &#39;overflow: scroll auto;&#39;。</p><h3 id="_5-resize" tabindex="-1">5. resize <a class="header-anchor" href="#_5-resize" aria-label="Permalink to &quot;5. resize&quot;">​</a></h3><p>both（默认值） | none | horizontal | vertical</p><ul><li>both 两边都可以拉伸</li><li>none 不能拉伸</li><li>horizontal 水平拉伸</li><li>vertical 垂直拉伸</li></ul><p>重新定义尺寸。</p><p>通常使用它的场景是 &lt;textarea&gt;&lt;/textarea&gt; 。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">textarea</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cols</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;30&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rows</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;10&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">textarea</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">textarea</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cols</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;30&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rows</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;10&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">textarea</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">textarea</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">resize</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">none</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">textarea</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">resize</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">none</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以使用resize定义 textarea 不能被拉伸。</p><h4 id="_5-1-div设置both默认不生效" tabindex="-1">5.1 div设置both默认不生效 <a class="header-anchor" href="#_5-1-div设置both默认不生效" aria-label="Permalink to &quot;5.1 div设置both默认不生效&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">div</span><span style="color:#B392F0;">.text</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">resize</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">both</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">div</span><span style="color:#6F42C1;">.text</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">resize</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">both</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>要想使div设置both生效，需要设置overflow属性。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">div</span><span style="color:#B392F0;">.text</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">200</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">#000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">resize</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">both</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">overflow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">auto</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">div</span><span style="color:#6F42C1;">.text</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">200</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">#000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">resize</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">both</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">overflow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">auto</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>只有当overflow不等于默认值时，resize才会生效。</p><h4 id="_5-2-resize的使用场景" tabindex="-1">5.2 resize的使用场景 <a class="header-anchor" href="#_5-2-resize的使用场景" aria-label="Permalink to &quot;5.2 resize的使用场景&quot;">​</a></h4><ul><li>块级元素</li><li>table 单元格</li><li>内联块元素</li></ul><p>前提，overflow不等于默认值。</p><h2 id="九、传统布局缺陷、弹性盒子、-flexcontainer-盒模型与flex模块" tabindex="-1">九、传统布局缺陷、弹性盒子、 flexContainer - 盒模型与FLEX模块 <a class="header-anchor" href="#九、传统布局缺陷、弹性盒子、-flexcontainer-盒模型与flex模块" aria-label="Permalink to &quot;九、传统布局缺陷、弹性盒子、 flexContainer - 盒模型与FLEX模块&quot;">​</a></h2><pre><code>传统布局缺陷

  1. 等高问题，两栏布局、三栏布局实现比较复杂；
  2. 元素内容水平和垂直居中问题；

弹性布局

  可以伸缩、变换的盒子，随着视口变化，内容展示方式也不同。

  兼容性：IE10、chrome21、opera12.1、firefox22支持 

  大多数浏览器不需要加兼容性前缀，兼容IE10需要添加-ms前缀，uc浏览器必须要加-webkit前缀。

  完整兼容性写法

    div {
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
    }

  flexbox - flexible box 弹性盒子布局、弹性盒模型

    可以让子元素之间提供强大的空间分布和对齐能力。

  flex布局是一维布局，只能处理一个维度。

  二维布局：CSS Grid Layout 网格布局

  flex布局由flex container（父级容器）和flex item（项目）构成。

  ![img](./images/flex.png)

  main axis 主轴  cross axis 交叉轴 

  主轴决定布局的方向。

  父容器（flex container）存在6个属性：

    1. flex-direction：
    
      row（默认值） | row-reverse | column | column-reverse

      决定主轴方向及flex item的排列方向。

    2. flex-wrap：

      nowrap（默认值）| wrap | wrap-reverse

      盒子超出是否换行展示。

    3. flex-flow：

      简写形式。 flex-flow: flex-direction | flex-wrap;

      flex-flow: row wrap;
      
    4. justify-content：

      flex-start（默认值）| flex-end | center
      space-between（两端对齐） | space-around（flex item两侧间距相等）

      决定主轴上的对齐方式。

    5. align-items：

      flex-start（默认值）| flex-end | center
      baseline（基准线）| stretch

      决定交叉轴（与主轴垂直的轴）的对齐方式。

      baseline

        基准线是基于项目中文本的线，基准线和文字位置和文字大小都有关系。

        ![baseline](./images/baseline.png)

      stretch

        没有设置高度时，自动撑满整个容器的高度。

        ![stretch](./images/stretch.png)

    6. align-content：

      flex-start | flex-end | center 
      space-between | space-around | stretch

      决定多根轴线的对齐方式。

      可以用于调整多根轴线之间的间距。

      stretch

        占满整个交叉轴区域，如果存在多根轴线，会平分交叉轴区域。

  子项目（flex item）属性

    1. flex-grow 放大的比例
    2. flex-shrink 缩小比例
    3. flex-basis 伸缩基准值
    4. flex flex-grow flex-shrink flex-basis 简写
    5. order 排列顺序
    6. align-self 单个项目的对齐方式
    
    order

      指定排列顺序。

      .blue {
        order: 3;
        background-color: blue;
      }
      .red {
        order: 1;
        background-color: red;
      }
      .orange {
        order: 2;
        background-color: orange;
      }

      ![order](./images/order.png)
</code></pre><h2 id="十、弹性布局、flexitem的属性及用法-盒模型与flex模块" tabindex="-1">十、弹性布局、flexItem的属性及用法 - 盒模型与FLEX模块 <a class="header-anchor" href="#十、弹性布局、flexitem的属性及用法-盒模型与flex模块" aria-label="Permalink to &quot;十、弹性布局、flexItem的属性及用法 - 盒模型与FLEX模块&quot;">​</a></h2><pre><code>flex布局在移动端应用较广。

flex container 

  1. flex direction 2. flex wrap 3. flex flow
  4. justify-content 5. align-items 6. align-content

flex item

  1. flex-grow 放大的比例

    0 （默认值）| number

    会查看所有子项目的flex-grow属性，再用剩余空间除以flex-grow（非默认值）的和。
    如果没有剩余空间，此属性就会失效。

    存在flex-basis定义时，使用它作为待计算子项的宽度。

    500 - 300 = 200 （剩余空间）
    200 / 2（flex-grow相加的值） = 100px
    100（盒子宽度） + 100 = 200px

    .orange {
      flex-grow: 1;
      background-color: orange;
    }

  2. flex-shrink 缩小比例

    1（默认值）| number

    只有空间不足时才会用到此属性。缩小比例为0时，不缩小盒子，会超出默认盒子范围。

    存在flex-basis定义时，使用它作为待计算子项的宽度。
  
    600（待收缩盒子应占宽度 6 * 100） - （500 - 300）200（剩余空间） = 400px（整体收缩的值）;
    400 / 6 = 66.67;
    100 - 66.67 = 33.33;      

  3. flex-basis 伸缩基准值

    分配剩余空间之前，项目占据主轴的空间的计算值。

    auto（默认值）- 对应元素宽度

    一般不指定此项，默认取元素的实际宽度。取值后，会覆盖原本宽度。
    定义放大（flex-grow）和伸缩（flex-shrink）时，都是根据伸缩基准值的大小。

  4. flex 简写

    auto（默认值） | none

    auto: 1 1 auto;
    none: 0 0 auto;

    flex: flex-grow flex-shrink flex-basis;

  5. order 排列顺序

    定义单个项目的排列顺序。

  6. align-self 单个项目的对齐方式

    flex-start（默认值）| flex-end | center
    baseline（基准线）| stretch | auto

    取值与align-items完全一致。多了一个默认值auto。

    如果父级盒子定义了align-items，可以使用此属性定义单独的样式。
</code></pre><h2 id="十一、京东布局布局技巧、企业命名规范-盒模型与flex模块" tabindex="-1">十一、京东布局布局技巧、企业命名规范 - 盒模型与FLEX模块 <a class="header-anchor" href="#十一、京东布局布局技巧、企业命名规范-盒模型与flex模块" aria-label="Permalink to &quot;十一、京东布局布局技巧、企业命名规范 - 盒模型与FLEX模块&quot;">​</a></h2><pre><code>vertical-align: middle;

  使内联块（inline-block）后面的内联块居中。

position: absolute;

  position定义absoulte之后，默认就变为inline-block。
</code></pre><h2 id="十二、flex布局深入、grid布局探究-盒模型与flex模块" tabindex="-1">十二、flex布局深入、grid布局探究 - 盒模型与FLEX模块 <a class="header-anchor" href="#十二、flex布局深入、grid布局探究-盒模型与flex模块" aria-label="Permalink to &quot;十二、flex布局深入、grid布局探究 - 盒模型与FLEX模块&quot;">​</a></h2><pre><code>css书写规则

  1. 代码不能出现没有类型的情况
  2. 能够复用的代码尽量提取出来 

通常定义flex布局的时候，需要将所有的元素都定义为flex布局。

浮动布局哪些属性会失效：

  1. 浮动相关的 float

  2. 清除浮动会失效

    定义了float属性的元素，存在于浮动层级，将元素变成inline-block。
    影响布局相关的不会生效，但是变成inline-block的特性还会存在。

    定义了flex布局，最好不要使用float，会产生歧义。
    建议使用 display: inline-box。
    
  3. column vertical-align失效

grid布局

  1. 传统布局
  2. flex布局：一维布局
  3. grid布局：二维布局

  grid布局兼容性很差，很多浏览器不支持。
  2017年的部分浏览器才开始支持grid布局。

  safari还没有支持网络属性，例如不支持grid-template-rows属性。

  优势：

    处理复杂的二维布局时，使用grid布局更有优势。
    gird是二维布局，会有两个主轴，在两个主轴上都可以进行布局。

  属性：

    Grid Container
    Grid Item
    Grid Line：分为垂直和水平两个方向
    Gird Track：相邻网格线之前的距离
    Grid Cell：网格的一个单元

    \`\`\`js
    display: grid;
    \`\`\`

    gird布局和flex布局很相似。
</code></pre><h2 id="十三、transform、css属性值定义语法-动画与3d模块" tabindex="-1">十三、transform、css属性值定义语法 - 动画与3D模块 <a class="header-anchor" href="#十三、transform、css属性值定义语法-动画与3d模块" aria-label="Permalink to &quot;十三、transform、css属性值定义语法 - 动画与3D模块&quot;">​</a></h2><pre><code>如何阅读css语法：

  CSS属性值定义语法（CSS value definition syntax）是用来限定CSS属性合法取值的专门语法。
  CSS属性值定义语法描述了哪些值是可取的CSS属性，基本组成元素包括关键字、符号与带类型的参数。

  https://developer.mozilla.org/zh-CN/docs/Web/CSS/Value_definition_syntax

  1. 基本组成元素：

    （1）关键字：

      一般关键字：一般关键字都有预先的定义，不需要引号，如auto、smaller或ease-in。

      特殊关键字：inherit（继承）与initial（初始值）
        
        所有css属性值都可以使用inherit或者initial。
        这两个关键字不会出现在CSS语法合法值定义中，但都是隐含可用的。

    （2）符号：

      CSS中，有一些符号是可以出现的，比如斜杠（&#39;/&#39;）或者逗号（&#39;,&#39;）等，它们用来分割属性值。
      逗号用来分割数个并列值，或者分割函数的参数。
      斜杠用来分割一个值的多个部分，通常用在CSS缩写中。

    （3）带类型的参数

      基本类型

        一些类型在css中经常出现，CSS规范中将其专门定义，称为基本类型，用一对
        尖括号表示：&#39;&lt;与&gt;&#39;，例如：&lt;angle&gt;，&lt;string&gt;，...

          &lt;angle&gt;

            语法：&lt;angle&gt;数据类型由&lt;number&gt;和下列单位组成，数字与单位之间没有空格。

            单位：deg、grad、rad、turn 

            值的类型根据不同的兼容性可能有不同的定义方式。

     其他类型

        其他类型同样也用一对尖括号来表示。

        其他类型分为两种：

          1. 共享同一个属性名称的数个类型，它们出现在一对引号中，经常用于属性的缩写。

          2. 不共享同一个属性的数个类型，他们与基本类型很相似。

            不同的是，这种参数仅在规范中相关属性的描述处定义，而基本类型在规范中有专门定义。

  2. 组合符号

    (1) 方括号

      方括号将数个基本元素组成一个整体，用来强调组合的优先级。

        bold [ thin &amp;&amp; &lt;length&gt; ]

      以下均为该例的合法取值：

        1. bold thin 2vh
        2. bold 0 thin
        3. bold thin 3.5em

      以下不是合法取值：

        thin bold 3em 

        因为bold被放置在方括号定义的整体之中。
        根据定义，bold必须出现在方括号定义的整体之前。

    (2) 并置

      并置是指将数个关键字、符号或类型，用空格分开写在一起。
      并置所有的元素都必须出现并且按所规定的顺序出现。例如：

        bold &lt;length&gt;, thin

      以下均为该例的合法取值

        1. bold lem, thin
        2. bold 0, thin
        3. bold 2.5cm, thin
        4. bold 3vh, thin

      以下不是合法值

        1. thin lem, bold 
          
          因为顺序有错

        2. bold lem thin 
        
          因为所有元素都必须出现，包括逗号。

        3. bold 0.5ms, thin 

          因为ms是时间值，不是长度值：&lt;length&gt;

    (3) “与”组合符：&amp;&amp;

      &quot;与&quot;组合符连接的各个部分都必须出现，但是顺序任意。例如：

        bold &amp;&amp; &lt;length&gt;

      以下均为该例的合法取值

        1. bold lem
        2. bold 0
        3. 2.5cm bold
        4. 3vh bold

      以下不是合法值

        1. bold

          因为长度值没有出现。

        2. bold 1em bold

          因为各部分必须恰好出现一次。

      注：并置的优先级高于&quot;与&quot;组合符。
      
        例如bold thin &amp;&amp; &lt;length&gt; 等价于 [bold thin] &amp;&amp; &lt;length&gt;。
        它们的合法取值是：bold thin &lt;length&gt; 或 &lt;length&gt; bold thin，
        但不能是 bold &lt;length&gt; thin。

    (4) “或”组合符：||

      “或”组合符表示其连接的所有组成元素是可选的，次序任意，但是至少其中一个要出现。
      “或”组合符通常用于描述属性缩写中的各部分。

        &lt;&#39;border-width&#39;&gt; || &lt;&#39;border-style&#39;&gt; || &lt;&#39;border-color&#39;&gt;

      以下均为该例的合法取值

        1. lem solid blue
        2. blue 1em
        3. solid 1px yellow

      以下不是合法值

        1. blue yellow：因为一个组成部分最多出现一次
        2. bold 因为它不允许出现


      注：“与”组合符的优先级高于“或”组合符。

        例如bold || thin &amp;&amp; &lt;length&gt;  等价于 bold || [thin &amp;&amp; &lt;length&gt;]，
        它们的合法取值是：bold、thin &lt;length&gt;、bold thin &lt;length&gt;、
        或者 thin &lt;length&gt; bold。但不能是 &lt;length&gt; bold thin。
        因为bold 若出现，则必须出现在 thin &amp;&amp; &lt;length&gt; 整体的前面或后面。

    （5）“互斥”组合符

      “互斥”组合符表示各组成部分中只能恰好出现一个，通常用于分隔一个属性的所有可选值。例如：

        &lt;percentage&gt; | &lt;length&gt; | left | center | right | top | bottom

      以下均为该例的合法取值

        1. 3%
        2. 0
        3. 3.5rem
        4. left
        5. center
        6. right
        7. top
        8. bottom

      以下不是合法值

        1. center 3%
        2. 3em 4.5em

      注：“或”组合符的优先级高于“互斥组合符”。
      比如 bold | thin || &lt;length&gt; 等价于 bold | [thin || &lt;length&gt;],
      它们的合法取值是：bold、thin、&lt;length&gt;、&lt;length&gt; thin、thin &lt;length&gt;，
      但不能是bold &lt;length&gt;，因为“互斥”组合符所连接的数个部分中，只有一个能出现。

  3. 数量符号

    数量符号用于描述一个元素可以出现多次。若不标注，则这个元素比如恰好出现一次。

    注意数量描述符不能叠加出现，并且优先级最高。

    （1）星号（*）

      星号表示可以出现零次（即不出现），一次，或任意多次。例如：

        bold smaller*

      以下均为该例的合法取值

        1. bold
        2. bold smaller
        3. bold smaller smaller
        4. bold smaller smaller smaller and so on.

      以下不是合法值

        smaller 因为bold并置于smaller，必须出现在任何smaller之前

    （2）加号 (+)

      加号表示可以出现一次或多次。例如：

        bold smaller+

      以下均为该例的合法取值

        1. bold smaller
        2. bold smaller smaller
        3. bold smaller smaller smaller and so on.

      以下不是合法值

        1. bold 因为smaller必须出现至少一次。
        2. smaller 因为bold 是并置关系，必须在smaller之前出现。

    （3）问号 (?)

      问号表示可选，即出现零次或一次。例如：

        bold smaller?

      以下均为该例的合法取值

        1. bold
        2. bold smaller

      以下不是合法值

        1. bold smaller smaller 因为smaller最多出现一次。
        2. smaller 因为bold是并置关系，必须出现在smaller之前。

    （4）大括号 ({ })

      大括号包含两个以逗号分隔的整数A与B，表示最少出现A次，且最多出现B次。例如：

        bold smaller{1,3}

      以下均为该例的合法取值

        1. bold smaller
        2. bold smaller smaller
        3. bold smaller smaller smaller

      以下不是合法值

        1. bold 因为smaller 至少要出现一次。
        2. bold smaller smaller smaller smaller 因为smaller 最多出现三次。
        3. smaller 因为bold是并置关系，必须出现在smaller之前。

    （5）井号 (#)

      井号表示可以出现一次或多次，与加号相似。但是其多次出现必须以逗号分隔。例如：

        bold smaller#

      以下均为该例的合法取值

        1. bold smaller
        2. bold smaller, smaller
        3. bold smaller, smaller, smaller and so on.

      以下不是合法值

        1. bold 因为smaller必须至少出现一次。
        2. bold smaller smaller smaller 因为多个smaller必须以逗号分隔。
        3. smaller 因为bold是并置关系，必须出现在smaller之前。

    （6）叹号 (!)

      组后面的叹号表示该组是必需的，并且至少产生一个值；
      即使组内项目的语法允许省略全部的值，也至少要保留一个值。

        [ bold? smaller? ]!

      以下均为该例的合法取值

        1. bold
        2. smaller
        3. bold smaller
      
      以下不是合法值

        1. bold 和 smaller都没有：因为至少要出现一个。
        2. smaller bold：因为 bold 必须出现在 smaller 前面。
        3. bold smaller bold：因为 bold 只能出现一次。

  4. 总结

    符号      名称          描述                            示例

    组合符号

              并置          各部分必须出现且按顺序出现        solid &lt;length&gt;

    &amp;&amp;        “与”组合符    各部分必须出现，但可以不按顺序     &lt;length&gt; &amp;&amp; &lt;string&gt;

    ||        “或”组合符    各部分至少出现一个，可以不按顺序   &lt;&#39;border-image-outset&#39;&gt; || &lt;&#39;border-image-slice&#39;&gt;

    |         “互斥”组合符  各部分恰好出现一个                smaller | small | normal | big | bigger

    []        方括号        强调优先级                       bold [ thin &amp;&amp; &lt;length&gt; ]


    数量符号

              无数量符号    恰好一次                            solid

    *         星号         零次、一次或多次                     bold smaller*

    +         加号         一次或多次                           bold smaller+

    ?         问号         零次或一次（即可选）                  bold smaller?

    {A,B}     大括号       至少A次，至多B次                      bold smaller{1,3}

    #         井号         一次或多次，但多次出现必须以逗号分隔	   bold smaller#

    !         叹号        组必须产生一个值                       [ bold? smaller? ]!

盒子居中

  &lt;div class=&quot;box&quot;&gt;
    &lt;div class=&quot;inner&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;

  1. 定位 + margin

  \`\`\`css
  .box {
    position: relative;
    top: 100px;
    left: 50%;
    margin-left: -150px;
    width: 300px;
    height: 300px;
    padding: 50px;
    border: 1px solid #000;
  }
  \`\`\`

  2. calc

  \`\`\`css
  .box {
    position: relative;
    top: 100px;
    left: calc(50% - 150px);
    width: 300px;
    height: 300px;
    padding: 50px;
    border: 1px solid #000;
  }
  \`\`\`

transform

  https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform

  CSS transform属性允许你旋转（rotate），缩放（scale），倾斜（skew）或平移（translate）给定元素。
  这是通过修改CSS视觉格式化模型的坐标空间来实现的。 transform属性可以指定为关键字值none 或一个或多个&lt;transform-function&gt;值。

  transform属性只对块级元素生效。

  1. 值：

    &lt;transform-function&gt;

      要应用的一个或多个CSS变换函数。 变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。

    none

      不应用任何变换。

  2. 语法格式

    none | &lt;transform-list&gt;

    where 

    &lt;transform-list&gt; = &lt;transform-function&gt;+ 

    where 
    &lt;transform-function&gt; = &lt;matrix()&gt; | &lt;translate()&gt; | &lt;translateX()&gt; | &lt;translateY()&gt; | &lt;scale()&gt; | &lt;scaleX()&gt;...

    where 
    &lt;matrix()&gt; = matrix( &lt;number&gt;#{6} )
    &lt;translate()&gt; = translate( &lt;length-percentage&gt; , &lt;length-percentage&gt;? )
    &lt;translateX()&gt; = translateX( &lt;length-percentage&gt; )
    &lt;translateY()&gt; = translateY( &lt;length-percentage&gt; )
    &lt;scale()&gt; = scale( &lt;number&gt; , &lt;number&gt;? )
    ...

    where 
    &lt;length-percentage&gt; = &lt;length&gt; | &lt;percentage&gt;

  3. transform-function

    笛卡尔坐标系（2D坐标系）。计算机的屏幕的坐标系原点是屏幕左上角。右x，下y。
    对于3D笛卡尔坐标系，计算机图形学中使用的是左手演示的笛卡尔坐标系。右x，下y，外z。

    3D坐标系中，z轴可以理解为眼睛到屏幕的中间的一条垂线。
    屏幕到眼睛的方向就是正方向，反之，为反方向。

    （1）rotate 旋转

      transform: rotate(0);
      transform: rotate(0deg);
      transform: rotateZ(0deg);

      rotate默认是沿着屏幕的Z轴进行旋转的，rotate() =&gt; rotateZ()。

      transform: rotateX(70deg);
      transform: rotateY(70deg);

      当旋转到一定角度，盒子就看不到了。
      这就可以说明所有元素都是一个平面元素，盒子是没有厚度的。

      rotate3d()

        可以指定一个轴，让平面元素沿着指定轴进行旋转。

        轴：原点到指定点的连线确定一个轴。

        transform: rotate3d(0, 40, 0, 70deg); &lt;=&gt;  transform: rotateY(70deg);
        transform: rotate3d(45, 45, 0, 120deg);

    （2）scale 缩放

      transform: scaleX(2); // x方向，放大两倍
      transform: scaleX(.5); // x方向，缩小一倍

      transform: scaleY(2); // y方向，放大两倍
      transform: scaleY(1.5); // y方向，放大1.5倍

      transform: scaleZ(2); // z方向，放大两倍
      transform: scaleZ(0); // z方向，缩小一倍
      由于是垂直于当前平面，所以放大也观察不出效果。
      但是如果值为0，元素就是消失。

      transform: scale(2); // x、y方向同时放大两倍
      transform: scale(1, .5); // x不缩放，y方向缩小0.5倍

      transform: scale3d(2, 2, 2); // x,y,z，同时放大两倍

    （3）skew 倾斜

      transform: skewX(30deg); // x方向，倾斜30度，x倾斜，元素两边会拉伸。
      transform: skewY(30deg); // y方向，倾斜30度，x倾斜，元素两边会拉伸。
      transform: skew(30deg, 30deg); // x,y方向，同时倾斜30度

    （4）translate 平移

      transform: translateX(100px); // x方向，平移100像素
      transform: translateY(100px); // y方向，平移100像素
      transform: translate3d(100px, 100px, 100px); // x，y，z方向，平移100像素

      transform: translateX(150px) translateY(150px); // x,y方向，平移150像素

    transform: rotate(50deg) translateX(150px) translateY(150px); // 先旋转，再平移
    transform: translateX(150px) translateY(150px) rotate(50deg); // 先平移，再旋转
</code></pre><h2 id="十四、三次贝塞尔曲线、transition、animation-动画与3d模块" tabindex="-1">十四、三次贝塞尔曲线、transition、animation - 动画与3D模块 <a class="header-anchor" href="#十四、三次贝塞尔曲线、transition、animation-动画与3d模块" aria-label="Permalink to &quot;十四、三次贝塞尔曲线、transition、animation - 动画与3D模块&quot;">​</a></h2><pre><code>transform-origin

  用于更改元素的原点。任何转换都基于控制点，即原点。

  transform-origin: left; // x 0%, y 50%
    =&gt; transform-origin: 0% 50%;

    定义一个值的时候，另一个值默认为center。

  transform-origin: center center; // 默认值 x 50% y 50%
    =&gt; transform-origin: 50% 50%;

  transform-origin: left center; // x 0%, y 50%
    =&gt; transform-origin: 0% 50%;

  transform-origin: left top; // x 0%, y 0%
    =&gt; transform-origin: 0% 0%;

  transform-origin: right center; // x 100%, y 50%
    =&gt; transform-origin: 100% 50%;

  transform-origin: 0% 100% 10px;
    第三个值是z轴的值。

transition 转变

  用来定义过渡效果的属性。

  \`\`\`css
  .inner:hover {
    transform: rotate(30deg);
    transition-property: transform;
    transition-duration: 2s;
    transition-timing-function: ease;
    transition-delay: 1s;
  }
  \`\`\`

三次贝塞尔曲线 （cubic-bezier-timing function）

  linear | ease | ease-in | ease-out |
  ease-in-out | cubic-bezier

  三次贝塞尔曲线是一个函数，用来生成速度曲线的函数。
  三次贝塞尔曲线由两个控制点决定。

  transition-timing-function: cubic-bezier(0.42, 0, 1, 1);

  1. 线性过渡效果

    cubic-bezier(0, 0, 1, 1) &lt;=&gt; linear

  2. 由慢到快的过渡效果（由慢开始）

    cubic-bezier(0.42, 0, 1, 1) &lt;=&gt; ease-in 

  3. 由快到慢的过渡效果（由慢结束）

    cubic-bezier(0, 0, 0.58, 1) &lt;=&gt; ease-out

  4. 开始慢，结束慢的过渡效果（由慢开始和慢结束）

    cubic-bezier(0.42 0, 0.58, 1) &lt;=&gt; ease-in-out

  5. 由慢到快，再由快到慢的过渡效果（慢速开始变快，然后慢速结束）

    cubic-bezier(0.25, 0.01, 0.25, 1) &lt;=&gt; ease

  ...

  简写

  \`\`\`css
  .inner:hover {
    transform: rotate(30deg);
    transition: transform 2s ease-in 1s;
  }
  \`\`\`

  多个效果的过渡效果

  \`\`\`css
  .inner:hover {
    width: 200px;
    height: 200px;
    background-color: red;
    transform: rotate(30deg);
    transition: transform 2s, width 2s, height 2s, background-color 2s;
  }
  \`\`\`

  =&gt;

    \`\`\`css
    .inner:hover {
      width: 200px;
      height: 200px;
      background-color: red;
      transform: rotate(30deg);
      transition: all 2s;
    }
    \`\`\`

    不建议使用all，动画是一种消耗性能的操作，如果明确是哪个属性具有动画效果，需要单独指定。

  =&gt;

    多个元素时，推荐下面这样定义。

    \`\`\`css
    .inner:hover {
      width: 200px;
      height: 200px;
      background-color: red;
      transform: rotate(30deg);
      transition-property: transform, width, height, background-color;
      transition-duration: 2s;
    }
    \`\`\`

animation 动画

  @keyframes 定义动画如何实现的过程。

  1. animation-name 动画名称
  2. animation-duration 动画持续时间
  3. animation-timing-function 动画速度曲线
  4. animation-iteration-count 动画周期播放次数

    infinite（循环）| 次数（number）

  5. animation-direction 动画是否反向播放

    normal（默认值）| reverse（反向）|
    
    alternate（动画交替反向，不常用）和动画曲线相关
    alternate-reverse（动画反向交替，不常用）和动画曲线相关

  6. animation-fill-mode 
  7. transition

  transition触发条件一般用事件的方式进行触发，可以和JS配合使用。
  transition没有办法设置循环次数，animation可以。

  animation和JS交互性不强，如果想实现动画，可以用CSS3来写，也可以使用JS。
</code></pre><h2 id="十五、响应式设计、-媒体查询、gpu硬件加速-响应式设计模块" tabindex="-1">十五、响应式设计、@媒体查询、GPU硬件加速 - 响应式设计模块 <a class="header-anchor" href="#十五、响应式设计、-媒体查询、gpu硬件加速-响应式设计模块" aria-label="Permalink to &quot;十五、响应式设计、@媒体查询、GPU硬件加速 - 响应式设计模块&quot;">​</a></h2><pre><code>盒子垂直水平居中

  &lt;div class=&quot;wrap&quot;&gt;
    &lt;div class=&quot;box&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;

  1. 父元素 padding，子元素宽度100% 不常用

  \`\`\`css
  .wrap {
    width: 500px;
    height: 500px;
    padding: 100px;
    border: 1px solid #000;
    box-sizing: border-box;
  }

  .box {
    width: 100%;
    height: 100%;
    background-color: orange;
  }
  \`\`\`        

  2. postion绝对定位

  \`\`\`css
  .wrap {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid #000;
    box-sizing: border-box;
  }

  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    width: 100px;
    height: 100px;
    background-color: orange;
  }
  \`\`\`

  3. calc计算值

  \`\`\`css
  .wrap {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid #000;
    box-sizing: border-box;
  }

  .box {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
    background-color: orange;
  }
  \`\`\`

4. transform

\`\`\`css
.wrap {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  box-sizing: border-box;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50px, -50px);
  width: 100px;
  height: 100px;
  background-color: orange;
}
\`\`\`

5. 弹性盒子

\`\`\`css
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  box-sizing: border-box;
}

.box {
  width: 100px;
  height: 100px;
  background-color: orange;
}
\`\`\`
</code></pre><p>文字居中</p><pre><code>元素内容不定时，长度可变时的解决方案。

\`\`\`css
.wrap {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  box-sizing: border-box;
}

.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  background-color: orange;
}
\`\`\`

如何让文字层级到盒子层级之下？

定义3d元素必须设置 transform-style，这样3d属性才会生效。

  \`\`\`css
    transform-style: preserve-3d;
  \`\`\`

\`\`\`css
.wrap {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: green;
  transform-style: preserve-3d;
  opacity: .6;
}

.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, -1px);
  font-size: 40px;
  background-color: orange;
}
\`\`\`
</code></pre><p>硬件加速模式（GPU加速模式，物理加速）</p><pre><code>使用3d属性时，渲染引擎不再是webkit渲染引擎，启用的是GPU硬件加速。
开启硬件加速模式，让此时的渲染模式由CPU传向GPU。

手机端定义多动画时，对CPU是一个很大的负担，可能会出现动画闪烁的情况。
可以将CPU动画的部分，强制开启硬件加速模式。

只要使用和3d相关的属性，都可以开启CPU硬件加速模式。
在手机端，当硬件配置不高时，可以给CPU分担压力，但是不建议这样使用。
GPU加速功能会把手机内存产生负担，当大规模调用GPU时，手机会卡顿。

所有的动画元素都是position: absoutlte;元素。
当所有动画都开启CPU加速，计算量过大时，可能会出现元素丢失现象。
如果不是非常棘手的问题，GPU硬件加速一定要慎用。

CPU 处理器
GPU 针对视觉相关的处理器，即显卡，用于处理图像
</code></pre><p>响应式设计</p><pre><code>RWD（response web design）

  将网格布局（flex） + 弹性图片等 + 媒体查询全部整合起来，为了让网站也呈现自动缩放。 

来源：

  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;

  针对手机系统（android、ios），可以设置viewport标签。
  如果没有设置viewport，会将所有的内容展示出来。

  为了针对这种情况，可以使用响应式设计。

媒体查询 @media

  可以根据设备的特性进行不同的处理。

  \`\`\`css
  @media screen and (max-width: 960px) and (min-width: 768px) {
    body {
      background-color: red;
    }
  }

  @media screen and (max-width: 768px) and (min-width: 550px) {
    body {
      background-color: blue;
    }
  }

  @media screen and (max-width: 550px) {
    body {
      background-color: orange;
    }
  }
  \`\`\`

  @media基本所有的浏览器都支持，不支持的可以使用polyfill.js进行兼容。

  https://developer.mozilla.org/zh-CN/docs/Web/CSS/media

  （1）media type 查询类型

    all、print、screen ...
  
  （2）media condition

    通过 and、only、not、逗号（,） 连接多个条件表达式。

    and , not（与或非）、only 基本不使用。

    1. not

      not 以后的所有内容取反。

      \`\`\`css
      @media not screen and (max-width: 550px) {
        body {
          background-color: orange;
        }
      }
      \`\`\`

    2. only

      老版本浏览器需要指定这个属性，目前已经不需要使用。          

      \`\`\`css
      @media only screen and (max-width: 550px) {
        body {
          background-color: orange;
        }
      }
      \`\`\`

    3. “,”

      或逻辑。多个条件只有一个为真就可以。

      \`\`\`css
      @media (max-width: 768px), (min-width: 550px) {
        body {
          background-color: orange;
        }
      }
      \`\`\`

  （3）media feature 条件规则组

    width、min-width、max-width 可视宽度
    height、min-height、max-height 可视高度
    orientation 输出设备中页面可见区域是否大于或等于宽，即定义屏幕横屏或者竖屏展示。

      portrait（竖屏）、landscape（横屏）

    color、_、_、 颜色
    device-width、_、_  设备宽度
    device-heiight、_、_ 设备高度
    aspect-ratio、_、_  输出设备中页面可见区域宽度与高度的比率
    ...

    定义条件时的可选值。常用的是width和height。

    orientation

    \`\`\`css
    @media (max-width: 768px) and (min-width: 550px) {
      body {
        background-color: orange;
      }
    }

    @media screen and (orientation: landscape) {
      body {
        background-color: red;
      }
    }
    \`\`\`

  补充部分：

    整个CSS体系中一共有两种规则。一个是@规则，一个是一般规则。

    第二种规则引入方式 link

      \`\`\`css
      &lt;link
        type=&quot;text/css&quot;
        rel=&quot;stylesheet&quot;
        @media=&quot;(max-width: 768px) and (min-width: 550px)&quot;
        href=&quot;css/index.css&quot;
      /&gt;
      \`\`\`
      \`\`\`css
      &lt;link
        type=&quot;text/css&quot;
        rel=&quot;stylesheet&quot;
        @media=&quot;(max-width: 768px) and (min-width: 550px) and (orientation: landscape)&quot;
        href=&quot;css/index.css&quot;
      /&gt;
      \`\`\`
      @规则成立时，引入CSS样式文件。

    第三种规则引入方式 @import

      @import url;
      @import url list-of-media-queries;

      \`\`\`css
      @import url(css/index.css);
      \`\`\`
      \`\`\`css
      @import url(css/index.css) (max-width: 768px) and (min-width: 550px) and (orientation: landscape)&quot;;
      \`\`\`
      \`\`\`css
      @import url(css/index.css) screen and (max-width: 768px) and (min-width: 550px) and (orientation: landscape)&quot;;
      \`\`\`

      \`\`\`css
      @import url(css/index.css) screen and (max-width: 960px) and (min-width: 768px)&quot;;
      @import url(css/index1.css) screen and (max-width: 768px) and (min-width: 550px)&quot;;
      @import url(css/index2.css) screen and (max-width: 550px);
      \`\`\`

  link、@import区别

    link是一个标签，异步加载（预加载、等到@media条件通过，才会执行），不阻塞渲染和window.onload事件。

    @import是在css文件中编写的，存在兼容性问题（非常低的老版本不支持该属性）。

  em、rem、px

    em 相对于父级元素的font-size的大小。
    rem 相对于根标签的font-size的大小。

    \`\`\`html
    &lt;div class=&quot;wrap&quot;&gt;
      &lt;p class=&quot;a&quot;&gt;横屏是一个rem，竖屏是3个rem&lt;/p&gt;
      &lt;p class=&quot;b&quot;&gt;我是一个rem&lt;/p&gt;
    &lt;/div&gt;
    \`\`\`

    rem 应用：
      
      \`\`\`css
      .html {
        font-size: 12px;
      }

      .wrap {
        font-size: 20px;
      }

      .b {
        font-size: 1rem;
      }

      @media screen and (orientation: portrait) {
        .a {
          font-size: 3rem;
        }
      }

      @media screen and (orientation: landscape) {
        .a {
          font-size: 1rem;
        }
      }
      \`\`\`

      只和根元素的font-size有关系。

    em 应用：

      \`\`\`css
      .html {
        font-size: 12px;
      }

      .wrap {
        font-size: 20px;
      }

      .b {
        font-size: 1em;
      }

      @media screen and (orientation: portrait) {
        .a {
          font-size: 3em;
        }
      }

      @media screen and (orientation: landscape) {
        .a {
          font-size: 1em;
        }
      }
      \`\`\`

      只和父级元素的font-size大小有关。
</code></pre><h2 id="十六、css3媒体查询进行屏幕适配-响应式设计模块" tabindex="-1">十六、CSS3媒体查询进行屏幕适配 - 响应式设计模块 <a class="header-anchor" href="#十六、css3媒体查询进行屏幕适配-响应式设计模块" aria-label="Permalink to &quot;十六、CSS3媒体查询进行屏幕适配 - 响应式设计模块&quot;">​</a></h2><pre><code>请用CSS3适配 ... 到 ... 屏幕。

  =&gt; CSS3媒体查询 @media

all、print、screen、speech

专业名词不可以错，使用白话文描述答案。

\`\`\`css
html {
  height: 100%;
}

@media screen and (max-width: 379px) {
  html {
    background-color: black;
  }
}

@media screen and (min-width: 480px) and (max-width: 767px) {
  html {
    background-color: red;
  }
}

@media screen and (min-width: 768px) and (max-width: 959px) {
  html {
    background-color: pink;
  }
}

@media screen and (min-width: 960px) and (max-width: 1190px) {
  html {
    background-color: purple;
  }
}

@media screen and (min-width: 1200px) {
  html {
    background-color: orange;
  }
}
\`\`\`

可以通过媒体查询分别计算不同屏幕下的font-size。
</code></pre><h2 id="十七、webkit属性、设备与设备独立像素、css像素-补充" tabindex="-1">十七、webkit属性、设备与设备独立像素、css像素 - 补充 <a class="header-anchor" href="#十七、webkit属性、设备与设备独立像素、css像素-补充" aria-label="Permalink to &quot;十七、webkit属性、设备与设备独立像素、css像素 - 补充&quot;">​</a></h2><pre><code>webkit私有属性

  https://www.html.cn/book/css/webkit/behavior/index.htm

  （1）-webkit-appearance（此API已废弃）

    说明：

      改变按钮和其他控件的外观，使其类似于原生控件。

      1. -webkit-appearance是一个不规范的属性（unsupported Webkit property），它没有出现在CSS规范草案中。
      2. 此属性非标准且渲染效果在不同浏览器下不同，有些属性值甚至不支持，需慎用。        

    语法：

      -webkit-appearnce：none | button | button-bevel...

      默认值：none

    取值：

      -webkit-appearance取值    介绍                chrome    safari   IOS Safari    Android Browser

      none           去除系统默认appearance的样式，  支持       支持      支持            支持
                        常用于IOS下移除原生样式。

      button         渲染成button的风格             支持       支持       支持            支持

      ...

  （2）-webkit-filter

    说明：

      CSS滤镜属性，可以在元素呈现之前，为元素的渲染提供一些效果，如模糊、颜色转移之类的。
      滤镜常用于调整图像、背景、边框的渲染。

      1. CSS标准里包含了一些已实现预设效果的函数。你也可以将设定了滤镜效果的SVG文件，
         通过URL引用给SVG滤镜元素（SVG filter element）。

    语法:

      -webkit-filter：none | blur(px) | brightness() | contrast() | grayscale()
                      hue-rotate(deg) | invert() | opacity() | saturate() | sepia()
                      drop-shadow(radius) | url()

      默认值：none

    取值：

      none                      无SVG滤镜效果
      blur(&lt;number&gt;px)          设置对象的模糊效果
      brightness(&lt;percentage&gt;)  设置对象的亮度。除了百分比以外，也可以用非负数表达。
      contrast(&lt;percentage&gt;)    设置对象的对比度。除了百分比之外，也可以用0-1的数字表达。
      grayscale(&lt;percentage&gt;)   设置对象的灰度。除了百分比之外，也可以用0-1的数字表达。
      hue-rotate(&lt;number&gt;deg)   设置对象的色相旋转。用0-360数字表达。
      invert(&lt;percentage&gt;)      设置对象的反色。除了百分比之外，也可以用0-1的数字表达。
      opacity(&lt;percentage&gt;)     设置对象的透明度。除了百分比之外，也可以用0-1的数字表达。
      saturate(&lt;percentage&gt;)    设置对象的饱和度。除了百分比以外，也可以用非负数表达。
      sepia(&lt;percentage&gt;)       设置对象的褐色程度。除了百分比之外，也可以用0-1的数字表达。
      drop-shadow(&lt;length&gt;      设置对象的阴影。
       &lt;length&gt; radius &lt;color&gt;)   第一个长度是向右偏移距离，第二个长度是向下偏移距离，都可为负值，都是必传参数；
                                  第三个参数是阴影圆角，可选；
                                  第四个参数是阴影颜色，可选；
      url(path.svg#a)           设置对象滤镜效果。通过SVG可实现以上效果。SVG可写在页面，
                                也可外部引用。可增加锚节点。

    （3）
</code></pre>`,353),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
