import{_ as s,c as a,o as n,a as l}from"./app.40792b66.js";const C=JSON.parse('{"title":"\u6838\u5FC3\u6A21\u5757","description":"","frontmatter":{},"headers":[{"level":2,"title":"path","slug":"path","link":"#path","children":[{"level":3,"title":"\u5E38\u7528 API \u4ECB\u7ECD","slug":"\u5E38\u7528-api-\u4ECB\u7ECD","link":"#\u5E38\u7528-api-\u4ECB\u7ECD","children":[]},{"level":3,"title":"\u4EE3\u7801\u6848\u4F8B","slug":"\u4EE3\u7801\u6848\u4F8B","link":"#\u4EE3\u7801\u6848\u4F8B","children":[]}]}],"relativePath":"node/core_module/index.md"}'),o={name:"node/core_module/index.md"},p=l(`<h1 id="\u6838\u5FC3\u6A21\u5757" tabindex="-1">\u6838\u5FC3\u6A21\u5757 <a class="header-anchor" href="#\u6838\u5FC3\u6A21\u5757" aria-hidden="true">#</a></h1><h2 id="path" tabindex="-1">path <a class="header-anchor" href="#path" aria-hidden="true">#</a></h2><p><code>node.js</code> \u5185\u7F6E\u6A21\u5757\uFF0C\u53EF\u4EE5\u4F7F\u7528 require \u5BFC\u5165\u5E76\u4F7F\u7528\uFF0C\u7528\u6765\u5904\u7406\u6587\u4EF6/\u76EE\u5F55\u7684\u8DEF\u5F84\u3002</p><p>\u6BD4\u5982\u63D0\u53D6\u6587\u4EF6\u8DEF\u5F84\u3001\u540E\u7F00\uFF0C\u8D44\u6E90\u8DEF\u5F84\u62FC\u63A5\u7B49\u3002</p><h3 id="\u5E38\u7528-api-\u4ECB\u7ECD" tabindex="-1">\u5E38\u7528 API \u4ECB\u7ECD <a class="header-anchor" href="#\u5E38\u7528-api-\u4ECB\u7ECD" aria-hidden="true">#</a></h3><ul><li><code>basename()</code> \u83B7\u53D6\u8DEF\u5F84\u4E2D\u57FA\u7840\u540D\u79F0</li><li><code>dirname()</code> \u83B7\u53D6\u8DEF\u5F84\u4E2D\u76EE\u5F55\u540D\u79F0</li><li><code>extname()</code> \u83B7\u53D6\u8DEF\u5F84\u4E2D\u6269\u5C55\u540D\u79F0</li><li><code>isAbsolute()</code> \u83B7\u53D6\u8DEF\u5F84\u662F\u5426\u4E3A\u7EDD\u5BF9\u8DEF\u5F84</li><li><code>join()</code> \u62FC\u63A5\u591A\u4E2A\u8DEF\u5F84\u5224\u65AD</li><li><code>resolve()</code> \u8FD4\u56DE\u7EDD\u5BF9\u8DEF\u5F84</li><li><code>parse()</code> \u89E3\u6790\u8DEF\u5F84</li><li><code>format()</code> \u5E8F\u5217\u5316\u8DEF\u5F84</li><li><code>normalize()</code> \u89C4\u8303\u5316\u8DEF\u5F84</li></ul><h3 id="\u4EE3\u7801\u6848\u4F8B" tabindex="-1">\u4EE3\u7801\u6848\u4F8B <a class="header-anchor" href="#\u4EE3\u7801\u6848\u4F8B" aria-hidden="true">#</a></h3><p>\u83B7\u53D6\u8DEF\u5F84\u57FA\u7840\u540D\u79F0</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(__filename) </span><span style="color:#676E95;">// D:\\workspace\\notes\\node\\core_module\\_path\\index.js</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(__filename)) </span><span style="color:#676E95;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u652F\u6301\u4F20\u5165\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF0C\u8868\u793A\u6269\u5C55\u540D\uFF0C\u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u8FD4\u56DE\u5B8C\u6574\u6587\u4EF6\u540D\u79F0\u5E26\u540E\u7F00</span></span>
<span class="line"><span style="color:#676E95;">// \u7B2C\u4E8C\u4E2A\u53C2\u6570\u4F5C\u4E3A\u540E\u7F00\u65F6\uFF0C\u5982\u679C\u5339\u914D\uFF0C\u4E0D\u4F1A\u8FD4\u56DE\u8BE5\u540E\u7F00</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(__filename</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// index</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(__filename</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.ts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// index.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// basename \u540C\u6837\u53EF\u4EE5\u7528\u6765\u89E3\u6790\u6587\u4EF6\u5939\u8DEF\u5F84</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// c</span></span>
<span class="line"><span style="color:#676E95;">// \u5982\u679C\u76EE\u5F55\u4E2D\u5B58\u5728\u8DEF\u5F84\u5206\u9694\u7B26\uFF0C\u4F1A\u5FFD\u7565\u6389</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/c/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// c</span></span>
<span class="line"></span></code></pre></div><p>\u83B7\u53D6\u8DEF\u5F84\u76EE\u5F55\u540D\uFF08\u8DEF\u5F84\uFF09</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// \u8FD4\u56DE\u8DEF\u5F84\u4E2D\u6700\u540E\u4E00\u4E2A\u90E8\u5206\u7684\u4E0A\u4E00\u5C42\u76EE\u5F55\u6240\u5728\u8DEF\u5F84</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dirname</span><span style="color:#A6ACCD;">(__filename)) </span><span style="color:#676E95;">// D:\\workspace\\notes\\node\\core_module\\_path</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dirname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// /a/b</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dirname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/c/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// /a/b</span></span>
<span class="line"></span></code></pre></div><p>\u83B7\u53D6\u8DEF\u5F84\u6269\u5C55\u540D</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(__filename)) </span><span style="color:#676E95;">// .js</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// \u7A7A\u5B57\u7B26\u4E32</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u5339\u914D\u6700\u540E\u4E00\u4E2A . \u51FA\u73B0\u7684\u4F4D\u7F6E\uFF0C\u7136\u540E\u8FD4\u56DE \u201C.\u201D \u5230\u7ED3\u5C3E\u7684\u5185\u5BB9</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/index.html.js.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// .css</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/a/b/index.html.js.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;">// .</span></span>
<span class="line"></span></code></pre></div>`,13),e=[p];function c(t,r,A,D,y,F){return n(),a("div",null,e)}const d=s(o,[["render",c]]);export{C as __pageData,d as default};