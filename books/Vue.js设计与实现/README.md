# Vue.js 设计与实现

## 一、框架设计概览

### 权衡的艺术

#### 命令式和声明式

视图层框架通常分为命令式和声明式，它们各有优缺点。


**命令式框架关注过程，比如早期的 jquery。**

```js
$('#app') // 获取 div
	.text('hello world') // 设置文本内容
  .on('click', () => { alert('ok') }); // 绑定点击事件 
```

自然语言描述可以与代码产生一一对应关系，代码本身的描述就是“做事的过程”。


**声明式框关注结果，以 vue.js 为例。**

```vue
<div @click="() => alert('ok')">hello world</div>
```

代码实现的功能与前段代码一致，但是我们只关心结果，不需要关心过程如何实现。
vue.js 帮我们封装了过程，vue.js 的内部实现是命令式的，暴露给用户的则是声明式。

声明式代码的性能不优于命令式代码的性能。使用命令式代码可以做到极致的性能优化，声明式代码不一定做到这一点。

```js
<!-- 之前 -->
div.textContent = 'hello world';

<!-- 之后 -->
div.textContent = 'hello vue3';
```

```vue
<!-- 之前 -->
<div @click="() => alert('ok')">hello world</div>

<!-- 之后 -->
<div @click="() => alert('ok')">hello vue3</div>
```

对于框架来说，它需要找到前后的差异并只更新变化的地方，使得编译后的代码更接近于原生 js，实现最优的性能。

声明式代码会把命令式代码多出很多性能消耗（compiler、diff），框架本身就是封装了命令式代码实现了面向用户的声明式。


#### 为什么 vue.js 要选择声明式的设计方案？

声明式代码的可维护性更强。

> 命令式代码开发时，我们需要维护实现目标的整个过程，包括 DOM 元素创建、更新、删除等；
> 声明式代码只需要关心我们想要的结果，中间过程不需要我们关心。
>
> 我们在做框架设计时也要考虑可维护性和性能之间的权衡。
> 采用声明式提升可维护性的同时，势必会损失一定性能。
> 作为框架设计者要做的就是，在保持可维护性的同时让性能损失最小化。

#### 虚拟 DOM 的性能到底如何？

采用虚拟 DOM 的更新技术的性能理论上不可能比原生 js 操作 DOM 更高。

大部分情况，我们很难写出绝对优化的命令式代码。尤其是应用程序规模很大，需要付出很多精力来做到极致优化。虚拟 DOM 解决的问题就是我们不用写大量声明式代码的前提下，能够保证应用程序的性能下限，让应用程序的性能不会太差，甚至接近于命令式代码性能。

#### 运行时和编译时

设计框架，我们有三种选择，纯运行时、运行时 + 编译时、编译时。


假设我们设计了一个框架，提供一个 Render 函数，需要提供树形结构的数据对象。

```js
const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}
```

```js
function Render(obj, root) {
  const el = document.createElement(obj.tag);
  
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    obj.children.forEach((child) => Render(child, el));
  }
  
  root.appendChild(el);
};

Render(obj, document.body);
```

上述代码就是一个纯 **运行时** 的框架，提供树形结构的数据对象渲染内容，不涉及任何额外步骤，用户不需要学习额外知识。

树形结构的数据对象太麻烦，而且不直观。
如果我们想用 HTML 标签的方式描述树形结构对象时，这时可以引入编译的手段，实现一个 Compiler。

```js
const hmtl = `
  <div>
    <span>hello world</span>
  </div>
`;

const obj = Compiler(hmtl);

Render(obj, document.body);
```

这时我们的框架就变成一个 **运行时 + 编译时** 的框架。既支持提供数据对象直接渲染，也可以提供 HTML 字符串编译后渲染。


**为什么不将 html 字符串直接编译成命令式代码？**

```html
<div>
	<span>hello world</span>
</div>
```

```js
const div = document.createElement('div');
const span = document.createElement('span');

span.innerText = 'hello world'
div.appendChild(span);

document.body.appendChild(div);
```

将 html 字符串编译成命令式代码，我们只需要一个 Compiler 函数就可以。这样其实就变成一个纯编译时的框架，我们不支持任何运行时内容，用户的代码通过编译器编译后才能运行。

纯运行时的框架，没有编译的过程，因此也没办法分析用户提供的内容；
运行时 + 编译时的框架，由于加入编译步骤，我们可以分析用户提供的内容，提取信息再传给 Render 函数，可以做进一步的优化；
纯编译时框架，也可以分析用户内容，可以直接将代码编译成可执行代码，因此性能可能会更好，但是不够灵活。

这三个方向业内都有探索，Svelte 就是纯编译时框架，它的真实性能可能达不到理论高度。vue.js 保持运行时 + 编译时的架构，在保持灵活性的基础上尽可能去优化。


#### 总结

命令式更加关注过程，声明式更加关注结果。
命令式理论上可以做到极致优化，但是用户要承担巨大的心智负担，
声明式能够减轻用户的心智负担，但是性能有一定牺牲，框架设计者需要想办法使性能损耗最小化。

声明式更新性能损耗 = 找出差异的性能消耗 + 直接修改的性能消耗。虚拟 DOM 的意义在于使找出差异的性能消耗最小化。

vue.js 是一个编译时 + 运行时的框架，它在保持灵活性的基础上，能够通过编译手段分析用户提供的内容，从而进一步提升更新性能。

### 框架设计的核心要素

框架设计远比想象复杂，并不是把功能开发完就算大功告成。

还需要考虑框架应该给用户提供哪些构建产物？产物的模块格式如何？用户以错误的方式使用框架，如何打印合适的警告信息，让用户快速定位问题？开发版本的构建和生产版本构建有何区别？热更新需要框架层面的支持，我们是否应该支持？你的框架提供多个功能，用户只需要其中几个功能，用户能否可以走到按需使用，从而减少资源打包体积？这都应该是我们在设计框架的过程中应该考虑的。


#### 提升用户开发体验

框架设计和开发过程中，提供友好的警告信息至关重要。
友好的警告信息不仅能够帮助用户快速定位问题，还能够让框架收获良好的口碑，让用户任何框架的专业性。

vue.js 源码 warn 函数

```js
warn(
	'Failed to moune app: mount target selector "${ container }" returned null.'
)
```

warn 函数，最终调用了 `console.warn` 函数。


除了提供必要警告信息，还有很多其他方面可以作为切入口，进一步提升用户开发体验。

```js
const count = ref(0);
console.log(count);
```

直接打印 count，我们会看到一个对象，而不是 `count.value` 的值。

vue.js 3 的源码中，可以搜到 `initCustomFormatter`  的函数，该函数用来在开发环境初始化自定义 formatter。

浏览器允许我们编写自定义的 formatter，以 Chrome 为例，我们可以打开 DevTools，勾选 Console => Enable custom formatters 选项。刷新浏览器再查看，就可以直接看到 `count.value`  的值。

<img src="./images/custom_formatters.png" style="zoom: 60%" />

#### 控制代码体积

框架的大小也是衡量框架的标准之一。
实现同样功能的前提下，编写的代码越少越好，这样体积就会越小，浏览器加载资源的时间也越少。

vue.js 源码，每一个 warn 函数的调用都会配置 `_DEV_` 常量的检查：

```js
if (__DEV__ && !res) {
  warn(
    'Failed to moune app: mount target selector "${ container }" returned null.'
  )
}
```

 vue.js 使用 rollup.js 对项目进行构建，这里的 `_DEV_`  是通过 rollup.js 的插件配置来预定义的，功能类似于 webpack 中的 DefinePlugin 插件。生产环境中，这段代码不会出现在最终产物中，在构建资源的时候就会被移除。

这样我们就可以做到开发环境中为用户提供友好的警告信息的同时，不会增加生产环境代码的体积。

#### 良好的 Tree-Shaking

vue.js 内置了很多组件，我们的项目并没有使用这么多组件，还有前面提到的变量的打印，生产环境不需要这些代码出现。

Tree-Shaking 就是消除那些永远都不会执行的代码，也就是排除 dead code，无论是 rollup.js 和 webpack，都支持 Tree-Shaking。

要想实现 Tree-Shaking，必须满足一个条件，模块必须要 ESM（ES Module），Tree-Shaking 依赖 ESM 的静态结果。

以 rollup.js 为例

```js
|- demo
|  - package.json
|  - input.js
|  - utils.js
```

```js
yarn add rollup -D
```

```js
// input.js
import { foo } from './utils.js';

foo();
```

```js
// utils.js
export function foo (obj) {
  obj && obj.foo;
}
export function bar (obj) {
  obj && obj.bar;
}
```

上述代码我们在 utils.js 中导出了两个函数，在 input.js 中我们只是用到 foo 函数。

```js
npx rollup input.js -f esm -o dist/bundle.js // rollup 构建
```

```js
// dist/bundle.js

function foo (obj) {
  obj && obj.foo;
}

foo();
```

编译后代码不包括 bar 函数，Tree-Shaking 起到了作用。但是还存在问题，我们只是读取了 foo 函数，并没有调用，为什么 rollup.js 为什么不把 `obj && obj.foo` 作为 dead code 移除？

这其实是 Tree-Shaking 的另一个关键点 - 副作用。

副作用就是当调用函数时会对外部产生影响。你可能会说，上面代码只是读取值，怎么会产生副作用？其实有这样一种场景，如果 obj 对象是一个通过 Proxy 创建的代理对象，当我们读取对象的值，就会触发代理对象的 get trap，get trap 中可能存在副作用。

JavaScript 作为一门动态预览，想要静态分析代码很困难，所以 rollup.js 这类工具都会提供一种机制，你可以很明确地告诉 rollup.js，这段代码不会产生副作用，可以移除它。

```js
// input.js

import { foo } from './utils.js';

/*#__PURE__*/ foo();
```

如果你搜索 vue.js 3 的源码，会发现它大量使用了该注释。

```js
export const isHtmlTag = /*#__PURE__*/ makeMap(HTML_TAGS);
```

通常产生副作用的代码都是模块内函数的顶级调用。

```js
foo(); // 顶级调用

function bar () {
  foo(); // 函数内调用
}
```

对于顶级调用，可能会产生副作用；对于函数调用来说，只要函数 bar 没有被调用，那么就不会产生副作用。

在 vue.js 3 的源码中，基本都是在一些顶级调用的函数中使用 `/*__PURE__*/` 注释。该注释不仅可以作用于函数，还可以作用于任何语句。该注释也可以被 webpack 及 terser 识别。

#### 如何输出构建产物

vue.js 会为开发环境和生产环境输出不同的包。
vue.global.js 用于开发环境，它包含必要的警告信息；vue.gobal.prod.js 用于生产环境，不包含警告信息。
vue.js 构建产物不仅仅存在环境上的区分，还会根据使用场景的不同输出其他形式的产物。

不同类型的产物一定有对应的需求背景。

当用户希望可以直接在 HTML 页面中使用 `<script>` 标签引入框架并使用。
我们需要输出一种 `IIFE` 格式的资源。`IIFE`  的全称是 `Immediately Invoked Function Expression` ，即 "立即调用函数"。

```js
(function () {
  // ...
}());
```

vue.global.js 文件就是 `IIFE` 形式的资源。

```js
var Vue = (function (exports) {
  // ...
  exports.createApp = createApp;
  // ...
}({}));
```

在 rollup.js 中，我们可以配置 `format: 'iife'` 来输出这种形式的资源。

```js
// rollup.config.js

const config = {
  input: 'input.js',
  output: {
    file: 'output.js',
    format: 'iife'
  }
};

export default config;
```

目前主流浏览器基础都支持 ESM，所以用户还可以引入 ESM 格式的资源。

vue.js 3 的 vue.esm-browser.js 文件，可以使用 `<script type="module">` 标签引入。

```html
<script type="module" src="/vue.esm-browser.js"></script>
```

除了 vue.esm-browser.js 文件，vue.js 还会输出 vue.esm-bundler.js 文件。

vue.esm-bundler.js 是提供给 rollup.js 或 webpack 等打包工具使用的，通常配置在 `package.json` 中的 `module` 字段。

```js
{
  "main": "index.js",
  "module": "dist/vue.runtime.esm-bundler.js"
}
```

它们之间有何区别？

例如上文中提到的 `__DEV__`  常量，当构建用于 `<script>` ESM 资源时，开发环境 `__DEV__` 为 true，生产环境 `__DEV__` 为 false。

当打包提供给打包工具的 ESM 资源时，需要使用 `(process.env.NODE_ENV !== 'production')`  替换 `__DEV__` 常量。

```js
// browser.js

if (__DEV__) {
  warn('useCssModule() is not supported in the global build.');
}
```

```js
// -bundler.js

if ((process.env.NODE_ENV !== 'production')) {
	warn('useCssModule() is not supported in the global build.');
}
```

用户可以通过 webpack 配置自行决定构建资源的目标环境，最终效果一致，这段代码也只会出现在开发环境中。

用户可能还希望在 Node.js 中通过 require 语句引用资源。

```js
const Vue = require('vue');
```

当进行服务端渲染时，vue.js 的代码是在 Node.js 环境中运行的。这时就需要输出 CommonJS 的资源格式，简称 cjs。

```js
// rollup.config.js

const config = {
  input: 'input.js',
  output: {
    file: 'output.js',
    format: 'cjs'
  }
};

export default config;
```

#### 特性开关

设计框架时，框架还会提供诸多特性（功能），假设我们提供 A、B、C 三个特性给用户，同时还提供 a、b、c 三个对应的特性开关。

* 对于用户关闭的特性，我们可以利用 Tree-Shaking 机制让其不包含在最终的资源中；
* 该机制为可以让框架设计更加灵活，可以通过特性开关为框架添加新的特性，不用担心资源体积变大。当框架升级时，我们也可以通过特性开关支持遗留 API，而新用户可以选择不使用遗留 API，使最终打包的资源体积最小化。

特性开关和上文提供的 `__DEV__` 常量一样，可以利用 rollup.js 的预定义常量插件来实现。

```js
{
  __FEATURE_OPTIONS_API__: isBundlerESMBuild ? '__VUE_OPTIONS_API' : true,
}
```

`__FEATURE_OPTIONS_API__` 类似于 `__DEV__`，vue.js 3 的源码中，有很多类似与如下代码的判断分支。

```js
// support for 2.x options
if (__FEATURE_OPTIONS_API__) {
  currentInstance = instance;
  pauseTracking();
  applyOptions(instance, Component);
  resetTreacking();
  currentInstance = null;
}
```

vue.js 构建资源时，如果构建服务于打包工具的资源（带有 _bundler 字样的资源），上述代码就会变成：

```js
// support for 2.x options
if (__VUE_OPTIONS_API__) {
  currentInstance = instance;
  pauseTracking();
  applyOptions(instance, Component);
  resetTreacking();
  currentInstance = null;
}
```

`__VUE_OPTIONS_API__` 就是一个特性开关，用户可以通过设置 `__VUE_OPTIONS_API__` 预定义常量的值控制是否包含这段代码。

```js
// webpack.DefinePlugin 插件配置
new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: JSON.stringify(true) // 开启特性
})
```

我们可以通过配置 `__VUE_OPTIONS_API__` 特性开关决定是否可以使用选项 API 的方式编写代码。如果明确知道自己不会使用选项 API，可以关闭此特性，这样在打包的时候 vue.js 的这部分代码就不会包含在最终资源中，减小打包体积。

#### 错误处理

错误处理是框架开发过程中非常重要的环节。框架错误处理机制的好坏直接决定用户应用程序的健壮性，决定用户开发体验的好坏。

```js
// utils.js
export default {
  foo (fn) {
    fn && fn();
  }
}
```

该模块导出一个对象。如果用户在使用 foo 函数 过程中传入的毁掉函数执行出错，要怎么办？

第一个办法是用户自行处理，需要用户执行 try...catch。

```js
import utils from 'utils.js';

utils.foo(() => {
  try {
    // ...
  } catch (e) {
    // ...
  }
});
```

但是这会增加用户负担。如果 utils.js 提供了很多函数，用户都需要逐一添加错误处理程序。

第二个办法是我们代替用户统一处理错误。

```js
// utils.js
export default {
  foo (fn) {
    try {
      fn && fn();
    } catch (error) { }
  },
  bar (fn) {
    try {
      barfn && bar();
    } catch (error) { }
  }
}
```

每个函数都增加 try...catch，我们还可以优化下。

```js
export default {
  foo (fn) {
    callWithErrorHandling(fn);
  },
  bar (fn) {
    callWithErrorHandling(fn);
  }
}

function callWithErrorHandling (fn) {[
  try {
    fn && fn();
  } catch (error) {
    console.log(error);
  }
]}
```

代码变的简洁很多。但简洁不是目的，这样做的好处是我们可以为用户提供统一的错误处理接口。

```js
let handleError = null;

export default {
  foo (fn) {
    callWithErrorHandling(fn);
  },
  bar (fn) {
    callWithErrorHandling(fn);
  },
  // 用户注册错误处理函数
  registerErrorHandler (fn) {
    handleError = fn;
  }
}

function callWithErrorHandling (fn) {[
  try {
    fn && fn();
  } catch (error) {
    // 抛出错误
    handleError && handleError(error);
  }
]}
```

我们提供 registerErrorHandler 函数，用户可以使用它注册错误处理程序。这时错误处理的能力交由用户控制，即可以选择忽略错误，也可以调用上报程序将错误上报给监控系统。

其实这就是 vue.js 错误处理的原理，你可以在源码中搜索到 callWithErrorHandling 函数。
另外，在 vue.js 中，我们也可以注册统一的错误处理函数。

```js
import App from 'App.vue';

const app = createApp(App);

app.config.errorHandler = () => {
  // 错误处理程序
}
```

#### typescript 支持

ts，它是 js 的超集，能够为 js 提供类型支持。使用 ts 的好处有很多，如编译器自动提示、一定程度避免低级 bug、代码的可维护强。因此对 ts 的支持是否完善也是评价一个框架的重要指标。

如何衡量一个框架对 ts 类型的支持水平？并不是只要是使用 ts 编写框架，就等价于对 ts 类型支持友好。

```js
function foo (val: any) {
  return val;
}
```

这个函数很简单，接收参数 val 并返回该参数，返回值的类型是由参数决定的。上述代码显然不能满足我们的要求，正确的做法如下。

```js
function foo<T extends any>(val: T) {
  return val;
}
```

编写大型框架时，想要做到完善的 ts 类型支持很不容易，vue.js 源码中的 `runtime-core/src/apiDefineComponent.ts`文件，整个文件真正会在浏览器中中运行的代码其实只有 3 行，但是全部代码接近 200 行，这些代码都是在为类型支持服务。

#### 总结

框架设计中开发体验时衡量一个框架的重要指标之一。提供友好的警告信息又处于开发者快速定位维提，大多数情况下 "框架" 要比开发者更清楚问题出在哪里，因此在框架层面抛出有意义的警告信息是非常有必要的。

为了框架体积不受警告信息的影响（提供警告信息越详细，框架体积越大），我们需要利用 Tree-Shaking 机制，配置构建工具预定义变量的能力，从而实现仅在开发环境中打印警告信息，生产环境中则不包含这些用于提升开发体验的代码，实现线上代码的可控性。

框架不同类型的输出产物用于满足不同需求。我们需要结合实际使用情况，可以针对性输出构建产物。

框架会提供多种能力。有时会出于兼容性和灵活性考虑，对于同样的任务，框架会提供多种解决方案。vue.js 中就可以使用选项对象式 API 和组合式 API两种方法完成页面开发。从框架设计来看，这完全是基于兼容性考虑的。如果用户只想使用组合式 API，这时就可以通过特性开关关闭对应的特性。

框架的错误处理决定了用户应用程序的健壮性，也决定了用户开发应用时处理错误的负担。框架需要为用户提供统一的错误处理接口，用户可以通过注册自定义的错误处理函数来处理全部的框架异常。

框架对于 ts 的支持程序也是考量框架的重要指标。
有时候为了让框架提供更加友好的类型支持，甚至会花费比实现框架更多的时间和精力。

### vue.js 3 的设计思路

从全局视角了解 vue.js 3 的设计思路、工作机制及其重要的组成部分。

#### 声明式 UI

vue.js 是一个声明式的 UI 框架，用户在使用 vue.js 3 开发页面时是声明式地描述  UI 的。

* 使用与 html 标签一致的方式描述 DOM 元素，例如描述一个 div 标签时可以使用 `<div></div>` ；
* 使用与 html 标签一致的方式来描述属性，例如 `<div :id="app"></div>` ；
* 使用 `:` 或 `v-bind` 描述动态绑定的属性，例如 `<div :id="dynamicId"></div>` ；
* 使用 `@` 或 `v-on` 描述事件，例如点击事件 `<div @click="handler"></div>` ；
* 使用与 html 标签一致的方式来描述层级结果，例如一个具有 `span` 子结点的 `div` 标签 `<div><span></span></div>` 。

除了使用模板来声明式地描述 UI 之外，还可以使用 JavaScript 对象来描述。

```js
const title = {
  tag: 'h1',
  props: {
    onClick: handler
  },
  children: [
    { tag: 'span' }
  ]
}
```

对应到 vue.js 模板

```html
<h1 @click="handler">
  <span></span>
</h1>
```

两种方式对比，使用 JavaScript 对象描述 UI 更加灵活。比如我们要表示一个标题，根据标题级别不同，采用 `h1~h6` 这几个标签。

```js
const level = 3;
const title = {
  tag: `h${ level }`
}
```

```vue
<h1  v-if="level == 1"></h1>
<h2  v-else-if="level == 2"></h2>
<h3  v-else-if="level == 3"></h3>
<h4  v-else-if="level == 4"></h4>
<h5  v-else-if="level == 5"></h5>
<h6  v-else-if="level == 6"></h6>
```

使用 JavaScript 对象描述 UI 的方式，其实就是所谓的虚拟 DOM。

vue.js 3 除了支持使用模板描述 UI 外，还支持使用虚拟 DOM 描述 UI。

```vue
import { h } from 'vue';

export default {
	render() {
		return h('h1', { onCllick: handler })
	}
}
```

h 函数的返回值就是一个对象，它的作用是让我们编写虚拟 DOM 更加轻松。h 函数就是一个辅助创建虚拟 DOM 的工具函数。

#### 渲染器

虚拟 DOM 就是用 JavaScript 对象描述真实 DOM 结构，然后再通过渲染器将虚拟 DOM 渲染到页面。

渲染器的作用就是把虚拟 DOM 渲染为真实 DOM。假设我们有以下虚拟 DOM。

```js
const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
};
```

我们可以实现一个渲染器，将上面这段虚拟 DOM 渲染为真实 DOM。

```js
const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
};

function renderer (vnode, container) {
  const el = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(),
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el));
  }

  container.appendChild(el);
}

renderer(vnode, document.body);
```

简单说下渲染器的实现思路：

* 创建元素：以 `vnode.tag` 作为标签名称来创建 DOM 元素；
* 为元素添加属性和事件；
* 处理 children；

我们现在处理的仅仅是创建节点，渲染器的精髓都在更新节点的阶段，

```js
const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click again' // click me 改成 click again
};
```

对于渲染器来说，需要精确找到 `vnode` 对象的变更点并且只更新变更的内容。

#### 组件的本质

虚拟 DOM 除了可以描述真实 DOM 之外，还可以描述组件。组件本质上就是一组 DOM 元素的封装，这组 DOM 元素就是组件要渲染的内容，因此我们可以定义一个函数代表组件，函数的返回值就代表组件要渲染的内容。

```js
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello')
    },
    children: 'click me'
  }
};
```

组件的返回值也是虚拟 DOM，它代表组件要渲染的内容。我们可以让虚拟 DOM 对象中的 tag 属性来存储组件函数。

```js
const vnode = {
  tag: MyComponent
};
```

`tag: myComponent` 用户描述组件。为了能够渲染组件，我们还需要修改 renderer 函数。

```js
function renderer (vnode, container) {
  if (typeof vnode.children === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container);
  }
}

function mountElement (vnode, container) {
  const el = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(),
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el));
  }

  container.appendChild(el);
}

function mountComponent (vnode, container) {
  const subtree = vnode.tag(); 
  renderer(subtree, container);
}

renderer(vnode, document.body);
```

组件一定是函数吗？我们完全可以使用 JavaScript 对象来表达组件。

```js
const MyComponent = {
  render () {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello')
      },
      children: 'click me'
    }
  }
}
```

为此，我们还需要修改 renderer 方法和 mountComponent 方法。

```js
function renderer (vnode, container) {
  if (typeof vnode.children === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'object') {
    mountComponent(vnode, container);
  }
}

function mountComponent (vnode, container) {
  const subtree = vnode.tag.render(); 
  renderer(subtree, container);
}
```

vue.js 的有状态组件就是使用对象结构来表达的。

#### 模板工作原理

无论是手写虚拟 DOM（渲染函数）还是使用模板，都属于声明式地描述 UI，vue.js 同时支持这两种描述 UI 的方式。

我们已经知道虚拟 DOM 如何渲染成真实 DOM，那模板是如何工作的，这就要提高 vue.js 另一个重要组成部分，编译器。

编译器的作用就是将模板编译为渲染函数。

```vue
<div @click="handler">
  click me
</div>
```

```js
render () {
  return h('div', { onClick: handler }, 'click me')
}
```

对于编译器来说，模板就是一个普通的字符串它会分析该字符串并生成一个功能与之相同的渲染函数。

以 `.vue` 文件为例，一个 `.vue` 文件就是一个组件。

```vue
<template>
	<div @click="handler">
    click me
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    handler: () => {}
  }
}
</script>
```

template 标签里的内容就是模板内容，编译器会把模板内容编译成渲染函数并添加到 `<script>` 标签块的组件对象上。

```vue
<script>
export default {
  data() {},
  methods: {
    handler: () => {}
  },
  render () {
    return h('div', { onClick: handler }, 'click me')
  }
}
</script>
```

无论是使用模板还是直接手写渲染函数，对于一个组件来说，它要渲染内容最终都是通过渲染函数产生的，渲染器再把渲染函数返回的虚拟 DOM 渲染为真实 DOM，这就是模板的工作原理，也是 vue.js 渲染页面的流程。

#### 模块组成的有机整体

组件的实现依赖于渲染器，模板的编译依赖于编译器，编译后生成的代码是根据渲染器和虚拟 DOM 的设计决定的。

vue.js 各个模块之间是互相关联、互相制约的，共同构成一个有机整体。

下面以编译器和渲染器这两个模块为例，看一下它们是如何配合工作，实现性能提升的。

```vue
<div id="foo" :class-"cls"></div>
```

首先，编译器会把这段代码编译成渲染函数

```js
render() {
	// return h('div', { id: 'foo', class: cls })
	return {
		tag: 'div',
    props: {
      id: 'foo',
      class: cls
    }
	}
}
```

cls 是一个变量，它可能会发生变化。

渲染器的作用之一就是寻找并且只更新变化的内容，当变量 cls 发生变化时，渲染器会自行寻找变更点。vue.js 的模板是有特点的，`id="foo"` 是永远不会变化的，而 `:class="cls"`  是一个 v-bind 绑定，它是可能发生变化的。编译器能识别出哪些是静态属性，哪些是动态属性，生成代码的时候可以附带这些信息。

```js
render() {
	return {
		tag: 'div',
    props: {
      id: 'foo',
      class: cls
    },
    patchPlags: 1 // 假设数字 1 代表 class 是动态的
	}
}
```

假设数字 1 代表 “class 是动态的”，渲染器看到这个标志就知道 class 属性会发生改变。对于渲染器来说，相当于省去寻找变更点的工作量，这样就会提升性能。

编译器和渲染器之间互相配合可能让性能进一步提升，它们借助于虚拟 DOM 对象进行配合，虚拟 DOM 对象中会包含多种数据字段，每个字段都代表一定的含义。

#### 总结

vue.js 是一个声明式的框架，它直接描述结果，用户不需要关注过程。vue.js 采用模板的方式来描述 UI，它同样支持使用虚拟 DOM 来描述 UI。虚拟 DOM 要比模板更加灵活，模板要比虚拟 DOM 更加直观。

渲染器的作用就是把虚拟 DOM 对象渲染为真实 DOM 元素。它递归地遍历虚拟 DOM 对象，调用原生 DOM API 来完成真实 DOM 的创建。渲染器的精髓在于后续更新，它会通过 diff 算法找出变更点，并且只会更新需要更新的内容。

组件其实就是一组虚拟 DOM 元素的集合，它可以是一个返回虚拟 DOM 的函数，也可以是一个对象。

vue.js 的模板会编译器编译为渲染函数。编译器和渲染器都是 vue.js 的核心组成部分，它们共同构成一个有机整体，不同模板之间互相配合，可以进一步提升框架性能。

## 二、响应系统

### 响应系统的作用与实现

响应系统是 vue.js 的重要组成部分。

#### 响应式数据与副作用函数

副作用函数指的是会产生副作用的函数。

```js
function effect () {
  document.body.innerText = 'hello vuew';
}
```

当函数执行时，会设置 body 的文本内容，除了 effect 函数之外的任何函数都可以读取或设计 body 的文本内容。

effect 函数的执行会直接或间接影响其他函数的执行，effect 函数产生了副作用。

一个函数修改全局变量，也是一个副作用。

```js
let val = 1;

function effect () {
  val = 2;
}
```

下面再来说一下响应式数据。

```js
const obj = { text: 'hello world' };

function effect () {
  document.body.innerText = obj.text;
}
```

副作用函数 effect 会设置 body 元素的 innerText 属性，当 obj.text 的值发生变化时，我们希望副作用函数 effect 会重新执行。

```js
obj.text = 'hello vue3';
```

目前 obj 是一个普通对象，当我们修改它的值时，除了值本身发生变化之外，不会有任何其他反应。

#### 响应式数据的基本实现

如何让 obj 变成响应式数据？

* 当副作用函数 effect 执行时，会触发字段 obj.text 的读取操作；
* 当修改 obj.text，会触发字段 obj.text 设置操作。

我们可以拦截一个对象的读取和设置操作，当读取字段 obj.text 时，我们可以把副作用函数 effect 存储到  “桶” 里。当设置 obj.text 时，再把副作用函数 effect 从 “桶” 中取出并执行。

如何拦截一个对象属性的读取和设置操作？

ES2015 之前，只能通过 Object.defineProperty 函数实现，这也是 vue.js 2 采用的方式。
ES2015+ 中，我们可以使用代理对象 Proxy 来实现，这是 vue.js 3 所采用的方式。

```js
const bucket = new Set();

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    bucket.add(effect);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});


function effect () {
  document.body.innerText = obj.text;
}

effect();

setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);

```

目前这种实现还存在很多缺陷，例如我们直接通过名字（effect）来获取副作用函数，这种硬编码的方式很不灵活。
副作用函数的名字可以任意取，我们可以把副作用函数命令为 myEffect，甚至是一个匿名函数，我们要想办法去掉这种硬编码机制。

#### 设计一个完善的响应系统

一个响应系统的工作流程如下：

* 读取操作发生时，将副作用函数收集到 “桶” 中；
* 设置操作发生时，从 “桶” 中取出副作用函数并执行。

基于之前的案例，我们希望无论副作用什么是什么形式，都能够被正确地收集到 "桶" 中。我们需要提供一个用来注册副作用的函数。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}
```

我们定义一个全局变量 activeEffect，它的作用是存储被注册的副作用函数。重新定义了 effect 函数，作用是用来注册副作用函数的函数，effect 接收一个参数 fn，即要注册的副作用函数。

```js
effect(() => {
  document.body.innerText = obj.text;
});
```

我们使用一个匿名的副作用函数作为 effect 函数的参数。
当 effect 函数执行时，首先会把匿名的副作用函数 fn 赋值给全局变量 activeEffect。接着执行被注册的匿名副作用函数 fn，这将会触发响应式数据 obj.text 的读取操作，进行触发代理对象 Proxy 的 get 拦截操作。

```js
const obj = new Proxy(data, {
  get (target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});
```

副作用函数已经存储到 activeEffect 中，在 get 拦截函数内需要把 activeEffect 收集到 “桶” 中。响应系统也不再依赖副作用函数的名字。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const bucket = new Set();

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});

effect(() => {
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);
```

当我们在响应式数据 obj 上设置一个不存在的属性时：

```js
effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);

// effect run
// effect run
```

执行上述代码，effect 函数会被打印两次。
理想情况，effect 只会被执行一次，匿名副作用函数只会与字段 obj.text 之间建立关系，不应该和 obj.notExist 建立响应关系。
定时器内语句的执行不应该触发匿名副作用函数重新执行，但是定时器到时候，匿名副作用函数确重新执行了。

为了解决这个问题，我们需要重新设计 “桶” 的数据结构。

之前我们使用一个 Set 数据结构作为存在副作用函数的 “桶”。导致该问题的根本原因是，我们没有在副作用函数与被操作的目标字段之间建立明确的联系。例如当读取属性时，无论读取哪个属性，都会收集副作用函数到 “桶” 中；同样，无论设置哪个属性，也都会执行 “桶” 中的副作用函数。副作用函数与被炒作的字段之间没有明确的联系。解决方案其实也很简单，只需要在副作用函数与被操作的字段之间建立联系即可，我们不能简单地使用一个 Set 类型的数据作为 “桶”。

```js
effect(function effectFn() {
  document.body.innerText = obj.text;
});
```

上面代码中存在三个角色：

* 被操作（读取）的代理对象 obj；
* 被操作（读取）的字段名 text；
* 使用 effect 函数注册的副作用函数 effectFn。

如果用 `target` 来表示一个代理对象所代理的原理对象，用 `key` 来表示被操作的字段名，用 `effectFn` 来表示被注册的副作用函数，

```js
target
	- key
		- effectFn
```

这是一种树形结构，我们可以通过例子对其进行补充说明。

如果有两个副作用函数同时读取同一个对象的属性值：

```js
effect(function effectFn1() {
  obj.text;
});
effect(function effectFn2() {
  obj.text;
});
```

```js
target
	- text
		-	effectFn1
   	- effectFn2
```

如果一个副作用函数读取了同一个对象的两个不同的属性

```js
effect(function effectFn() {
  obj.text1;
  obj.text2;
});
```

```js
target
	-	text1
		- effectFn
	- test2
		- effectFn
```

如果在不同的副作用函数中读取了两个不同对象的不同属性

```js
effect(function effectFn1() {
  obj1.text1;
});
effect(function effectFn1() {
  obj2.text2;
});
```

```js
target1
	- text1
			- effectFn1
target2
	-	text2
			- effectFn2
```

上面形成的关系其实就是一个树型数据结构。这个联系建立起来之后，就可以解决前文提到的问题。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const data = { text: 'hello world' };

const bucket = new WeakMap();

const obj = new Proxy(data, {
  get (target, key) {
    if (!activeEffect) return;

    // 使用 target 在 bucket 中获取 depsMap，key -> effects
    let depsMap = bucket.get(target);

    // 如果不存在 depsMap，新建 map 与 target 关联
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }

    // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
    let deps = depsMap.get(key);

    // 如果 deps 不存在，新建 set 与 key 关联
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    // 将激活的副作用函数添加到 deps 中
    deps.add(activeEffect);

    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;

    // 使用 target 从 bucket 中获取 depsMap，key -> effects
    const depsMap = bucket.get(target);

    if (!depsMap) return;

    // 根据 key 从 depsMap 中获取 effects
    const effects = depsMap.get(key);

    effects && effects.forEach(fn => fn());
  }
});


effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);
```

从这段代码我们就可以看出构建数据结构的方式，我们分别使用了 WeakMap、Map、Set。

* WeakMap 由 target => map 构成；
* Map 由 key => Set 构成。



<img src="./images/effect.png" />



我们把图中的 Set 数据结构所存储的副作用函数集合称为 key 的依赖集合。

这里解释一下为什么要使用 WeakMap。

```js
const map = new Map();
const weakmap = new WeakMap();

(function () {
  const foo = { foo: 1 };
  const bar = { bar: 2 };
  
  map.set(foo, 1);
  weakmap.set(bar, 2);
})();
```

定义了一个立即执行函数（IIFE），在函数表达式内部定义了两个对象：foo 和 bar，这两个对象分别最为 map 和 weakmap 的 key。

当该函数执行完毕后，对于对象 foo 来说，它仍然作为 map 的 key 被引用着，因此垃圾回收器（garbage collector）不会把它从内存中移除，我们仍然可以通过 map.keys 打印出对象 foo。对于对象 bar 来说，由于 WeakMap 的 key 是弱引用，它不影响垃圾回收期的工作，所以一旦表达式执行完毕，垃圾回收期就会把对象 bar 从内存中移除，并且我们无法获取 weakmap 的 key 值，也无法通过 weakmap 取得对象 bar。

WeakMap 对 key 是弱引用，不影响垃圾回收器的工作。一旦 key 被垃圾回收器回收，那么对应的键和值就访问不到了。所以 WeakMap 经常用于存储哪些只有当 key 所引用的对象存在是（没有被回收）才有价值的信息。例如上面的场景中，如果 target 对象没有任何引用，说明用户不在需要它，这时垃圾回收器会完成回收任务。但是如果使用 Map 来替代 WeakMap，即使用户对 target 没用引用，target 也不会被回收，最终可能会导致内存溢出。

最后，我们对以上代码做一下封装处理。我们可以把 get 拦截函数里依赖收集的路基封装到 track 函数中。同理，我们也可以把触发副作用的函数封装到 trigger 函数中。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const bucket = new WeakMap();

function track (target, key) {
  if (!activeEffect) return;

  // 使用 target 在 bucket 中获取 depsMap，key -> effects
  let depsMap = bucket.get(target);

  // 如果不存在 depsMap，新建 map 与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
  let deps = depsMap.get(key);

  // 如果 deps 不存在，新建 set 与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  // 将激活的副作用函数添加到 deps 中
  deps.add(activeEffect);
}

function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 effects && effects.forEach(fn => fn());
}

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});


effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);
```

#### 分支切换与 cleanup

首先，我们需要明确分支切换的定义

```js
const data = { ok: true, text: 'hello world' };
const obj = new Proxy(data, {});

effect(function effectFn () {
	document.body.innerText = obj.ok ? obj.text : 'not';
});
```

effect 函数内部存在一个三元表达式，根据 `obj.ok` 的值不同会执行不同的代码分支。
当字段 `obj.ok` 的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换。

分支切换可能会产生遗留的副作用函数。

```js
data
	-	ok
		- effectFn
	- text
		-	effectFn
```

副作用函数 `effectFn` 分别被字段 `data.ok` 和字段 `data.text` 所依赖集合收集。当字段 `obj.ok` 的值修改为 false，并触发副作用函数重新执行后，字段 `obj.text` 不会被读取，只会触发字段 `obj.ok` 的读取操作，理想情况下副作用函数 `effectFn` 不应该被字段 `obj.text` 所对应的依赖集合收集。

```js
data
	-	ok
		- effectFn
	- text
```

我们之前的实现还做不到这一点，当字段修改为 false，并触发副作用函数重新执行之后，会产生遗留的副作用函数。

遗留的副作用函数会导致不必要的更新。

解决这个问题的思路很简单，每次副作用函数执行时，我们可以先把它所有与之关联的依赖删除。当副作用函数执行完毕后，会重新建立联系，但在新的联系中不会包含遗留的副作用函数。

要将一个副作用函数从所有与之关联的依赖集合中移除，就需要明确知道哪些依赖集合中包含他，因此我们需要重新设计副作用函数。

```js
let activeEffect;

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}

const bucket = new WeakMap();

function track (target, key) {
  if (!activeEffect) return;

  // 使用 target 在 bucket 中获取 depsMap，key -> effects
  let depsMap = bucket.get(target);

  // 如果不存在 depsMap，新建 map 与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
  let deps = depsMap.get(key);

  // 如果 deps 不存在，新建 set 与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  // 将激活的副作用函数添加到 deps 中
  deps.add(activeEffect);

  // 将依赖添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps);
}
```

在 track 函数中我们将当前执行的副作用函数 activeEffect 添加到依赖收集 deps 中，deps 是一个与当前副作用函数存在联系的依赖集合，于是我们也把它添加到 `activeEffect.deps` 数组中，这样就完成对依赖集合的收集。



<img src="./images/effect_cleanup.png" />



有了联系后，我们可以在副作用函数执行时，根据 `effect.deps` 获取所有相关的依赖集合，将副作用函数从依赖集合中删除。

```js
let activeEffect;

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    cleanup(effectFn); // 依赖清理
    activeEffect = effectFn;
    fn();
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}

function cleanup (effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn);
  }
  // 重置 effectFn.deps 数组
  effectFn.deps.length = 0;
}
```

cleanup 函数接收副作用函数作为参数，遍历副作用函数的 `effectFn.deps` 数组，该数组的每一项都是一个依赖集合，然后将该副作用函数从依赖集合中移除，最后重置 `effectFn.deps` 数组。

至此，我们的响应系统已经可以避免副作用函数产生遗留。但是目前的实现会导致死循环。问题出在 trigger 函数中。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 effects && effects.forEach(fn => fn()); // ?
}
```

trigger 内部，遍历 effects 集合，它是 set 集合，里面存储副作用函数。当副作用函数执行时，会调用 cleanup 进行清除，但是副作用函数的执行会导致其重新被收集到集合中，此时对 effects 集合的遍历仍在进行。

我们可以重新构造一个集合并遍历它。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 const effectsToRun = new Set(effects);
 effectsToRun.forEach(effectFn => effectFn());
}
```

#### 嵌套的 effect 与 effect 栈

effect 是可以发生嵌套的。

```js
effect(function effectFn1 () {
  effect(function effectFn2 () { });
}};
```

上述代码，`effetFn1` 内部嵌套了 `effectFn2`，`effectFn1` 的执行会导致 `effectFn2` 的执行。

vue.js 的渲染函数就是在一个 effect 中执行的，如果组件发生嵌套，这时就发生了 effect 嵌套。

```js
const Bar = {
  render() {}
}

const Foo = {
  render() { return <Bar /> }
}
```

```js
effect(() => {
  Foo.render();
  effect(() => {
    Bar.render();
  })
})
```

如果 effect 不支持嵌套会发生什么？我们实现的响应系统并不支持 effect 嵌套，我们可以测试一下。

```js
const data = { foo: true, bar: true };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

let temp1, temp2;

effect(function effectFn1() {
  console.log('effectFn1 process');
  
  effect(function effectFn2() {
    console.log('effectFn2 process');
    temp2 = obj.bar;
  });
  
  temp1 = obj.foo;
});
```

理想情况下，我们希望副作用函数与对象属性之间的关系如下：

```js
data
	- foo
		- effectFn1
	- bar
		- effectFn2
```

我们希望当修改 `data.foo` 时会触发 `effectFn1` 执行。
由于 `effectFn2` 嵌套在 `effectFn1` 里，所以会间接触发 `effectFn2` 执行。当修改 `obj.bar` 时，只会触发 `effectFn2` 执行。

```js
obj.foo = false;

// effectFn1 process
// effectFn2 process
// effectFn2 process
```

我们修改 `obj.foo` 的值，会发现第三行打印不符合我们预期，`effectFn1` 并没有重新执行，反而 `effectFn2` 重新执行。

问题出在我们实现 effect 函数与 activeEffect 上。

```js
let activeEffect;

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    fn();
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}
```

我们使用全局变量 activeEffect 来存储通过 effect 函数注册的副作用函数，同一时间 activeEffect 所存储的副作用函数只能有一个。当副作用函数发生嵌套时，内层副作用函数执行会覆盖 activeEffect 的值，并且永远不会恢复到原来的值。这时如果再有响应式数据进行依赖收集，即使这个响应式数据是在外层副作用函数中读取的，它们收集到的副作用函数也都是内层副作用函数。

我们可以使用副作用函数栈 `effectStack`，在副作用函数执行时，将当前副作用函数压入栈中，副作用函数执行完毕后将其从栈中弹出，始终让 activeEffect 指向栈顶的副作用函数。

```js
let activeEffect;

const effectStack = [];

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}
```

通过定义 `effectStack` 数组，用它模拟栈， 使 activeEffect 始终指向正在执行的副作用函数，响应式数据只会收集直接读取其值的副作用函数作为依赖，从而避免产生错误。

#### 避免无限递归循环

实现一个完善的响应系统要考虑很多细节。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  obj.foo++;
});
```

如果在 effect 注册的副作用函数内存在一个自增操作，该操作会引起栈溢出。

```js
obj.foo => obj.foo + 1
```

在这个语句中，既会读取 `obj.foo` 的值，也会设置 `obj.foo` 的值，这就是导致问题出现的根本原因。

代码执行流程如下：

首先读取 `obj.foo` 的值，会触发 track 操作，将副作用函数收集到 “桶” 中，接着将其加 1 后再赋值给 `obj.foo`，此时会触发 trigger 操作，即把 “桶” 中副作用函数取出并执行。但是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样会导致无限递归地调用自己，于是就产生了栈溢出。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 const effectsToRun = new Set(effects);
 effectsToRun.forEach(effectFn => effectFn());
}
```

解决方法并不难，由于读取和设置操作是在同一个副作用函数执行的。无论是 track 收集的副作用函数，还是 trigger 出发执行的副作用函数，都是 activeEffect。我们可以在 trigger 动作发生时增加守卫条件：如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 const effectsToRun = new Set();
  
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => effectFn());
}
```

#### 调度执行

可调度性是响应系统非常重要的特性。所谓可调度性，指的是当 trigger 动作触发副作用重新执行时，有能力决定副作用函数执行的时机、次数以及方式。

先来看一下如何决定副作用函数的执行方式。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
});

obj.foo++;

console.log('end');
```

上面这段代码的输出结果如下：

```js
// 1
// 2
// end
```

如果我们需要调整输出顺序为：

```js
// 1
// end
// 2
```

这时我们很容易想到对策，把语句 `obj.foo++` 和 `console.log('end')` 位置互换即可。那么是否还有其他方法在不调整代码的情况下实现需求？这时就需要响应系统支持调度。

我们可以为 effect 函数设计一个选项参数 options，允许用户指定调度器：

```js
effect(() => {
  console.log(obj.foo)
}, {
  scheduler (fn) {
    // ...
  }
})
```

用户在调用 effect 函数注册副作用函数时，可以传递第二个参数 options。它是一个对象，允许指定 scheduler 调度函数，同时在 effect 函数内部我们需要把 options 选项挂载到对应的副作用函数上。

```js
function effect (fn, options = {}) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // 挂载 options
  effectFn.options = options;
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}
```

有了调度函数，我们在 trigger 函数中触发副作用函数重新执行时，就可以直接调用用户传递的调度器函数，从而把控制权交给用户。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 const effectsToRun = new Set();
  
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => {
   // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
   if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
   } else {
    effectFn();
   }
 });
}
```

现在我们就可以实现前文的需求了。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
}, {
  scheduler (fn) {
    setTimeout(fn);
  }
});

obj.foo++;

console.log('end');
```

我们使用 `setTimeout` 开启一个宏任务来执行副作用函数 fn，这样就可以实现期望的打印顺序。

除了控制副作用函数的执行顺序，通过调度器我们还可以控制它的执行次数。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
});

obj.foo++;
obj.foo++;
```

这段代码的打印结果如下：

```js
// 1
// 2
// 3
```

如果我们只关心结果而不关心过程，我们期望的打印结果是：

```js
// 1
// 3
```

基于调度器，我们可以很容易地实现此功能。

```js
/** task queue start */
const jobQueue = new Set();
const p = Promise.resolve();

let isFlushing = false;

function flushJob () {
  if (isFlushing) return;

  isFlushing = true;

  p.then(() => {
    jobQueue.forEach(job => job());
  }).finally(() => {
    isFlushing = false;
  });
}
/** task queue end */

const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
}, {
  scheduler (fn) {
    jobQueue.add(fn);
    flushJob();
  }
});

obj.foo++;
obj.foo++;
```

这个功能类似于 vue.js 连续多次修改响应式数据但只会触发一次更新，vue.js 内部实现了一个更加完善的调度器。

#### 计算属性 computed 与 lazy

之前介绍了 effect 函数，它用来注册副作用函数，它允许指定一些选项参数 options。例如指定 scheduler 调度器来控制副作用函数的执行时机和方式。还介绍了用来追踪和收集依赖的 track 函数，以及用来触发副作用函数重新执行的 trigger 函数。实际上，综合这些内容，我们就可以实现 vue.js 中一个非常重要并且非常有特色的能力 - 计算属性。

```js
effect(() => {
  console.log(obj.foo);
});
```

我们实现的 effect 函数会立即执行传递给它的副作用函数。但有些场景下，我们并不希望它立即执行，而是希望它在需要的时候才执行，例如计算属性。我们通过在 options 中添加 lazy 属性来达到目的。

```js
effect(() => {
  console.log(obj.foo);
}, {
  lazy: true
});
```

lazy 选项和 scheduler 一样，可以通过 options 选项对象指定。当 `options.lazy` 为 true 时，不立即执行副作用函数。

```js
function effect (fn, options = {}) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // 挂载 options
  effectFn.options = options;
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 非 lazy 属性才执行
  if (!options.lazy) {
    effectFn();
  }
	
  // 返回 effectFn
  return effectFn;
}
```

通过这个判断，副作用函数不会立即执行。我们将副作用函数 effectFn 作为 effect 函数的返回值，我们可以手动执行该副作用函数。

```js
const effectFn = effect(() => {
  console.log(obj.foo);
}, {
  lazy: true
});

obj.foo++;

effectFn();
```

如果仅能够手动执行副作用函数，意义并不大。如果我们把传递给 effect 函数看做一个 getter，那么这个 getter 函数可以返回任何值。

```js
const effectFn = effect(
  () => obj.foo + obj.bar, {
  lazy: true
});
```

手动执行副作用函数时，就可以拿到其返回值。

```js
const value = effectFn();
```

我们还需要对 effect 函数做一些修改。

```js
function effect (fn, options = {}) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
 		// ...
    // 执行函数
    const ans = fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    // 返回结果
    return ans;
  }

 	// ...

  // 非 lazy 属性才执行
  if (!options.lazy) {
    effectFn();
  }

  // 返回 effectFn
  return effectFn;
}
```

现在我们就可以实现懒执行的副作用函数，并且可以拿到副作用函数的执行结果，接下就可以实现计算属性。

```js
function computed (getter) {
  const effectFn = effect(getter, { lazy: true });

  const obj = {
    get value () {
      return effectFn();
    }
  }

  return obj;
}
```

我们定义一个 computed 函数，它接收一个 getter 函数作为参数，我们把 getter 函数作为副作用函数，用它创建一个 lazy 的 effect。computed 函数的执行会返回一个对象，该对象的 value 属性是一个访问器属性，只有读取 value 的值时，才会执行 effectFn 并将其结果作为返回值返回。

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

const ans = computed(() => obj.foo + obj.bar);

console.log(ans.value);
```

可以看到 computed 函数可以正确工作。不过我们实现的计算属性只做到了懒计算，只有当你读取 `ans.value` 的值，它才会计算并得到值。但是并没有做到对值进行缓存，如果我们访问 `ans.value` 的值，会导致 effectFn 多次计算，即使 `obj.foo` 和 `obj.bar` 的值本身没有变化。

我们在实现 computed 函数时，可以添加对值进行缓存的功能。

```js
function computed (getter) {
  // 缓存上一次的值
  let value;
  // 标识是否需要重新计算值，true 意味要重新计算
  let dirty = true;

  const effectFn = effect(
    getter,
    {
      lazy: true,
      // 添加调度器，调度器中重置 dirty
      scheduler () {
        dirty = true;
      }
    }
  );

  const obj = {
    get value () {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    }
  }

  return obj;
}
```

新增两个变量 value 和 dirty，value 用来缓存值，dirty 用于标识是否需要重新计算，只会 dirty 为 true 的时候才会调用 effectFn 重新取值。同时增加 scheduler 调度器函数，它会在 getter 函数中所依赖的响应式数据变化时执行，将 dirty 设置为 true。

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

const ans = computed(() => obj.foo + obj.bar);

console.log(ans.value);

obj.bar++;

console.log(ans.value);
```

现在我们设计的计算属性已经趋于完美，但它还存在一个缺陷，体现在当我们在另外一个 effect 中读取计算属性值时。

```js
const ans = computed(() => obj.foo + obj.bar);

effect(() => {
  console.log(ans.value);
});

obj.bar++;
```

ans 是一个计算属性，我们在 effect 函数中读取了 `ans.value` 的值。如果此时修改 `obj.bar` 的值，我们期望副作用函数重新执行，但是上述代码并不会触发副作用函数的渲染，这是一个缺陷。

从本质上来看，这是一个典型的 effect 嵌套。一个计算属性内部拥有自己的 effect，并且它是懒执行的，只有当真正地读取计算属性的值时才会执行。对于计算属性的 getter 函数来说，它里面访问的响应式数据只会把 computed 内部的 effect 收集为依赖。当把计算属性用于另外一个 effect 时，就会发生 effect 嵌套，外层的 effect 不会被内层 effect 中的响应式数据收集。

解决方法很简单，当读取计算属性的值时，我们可以手动调用 track 函数进行追踪；当计算属性依赖的响应式数据发生变化时，我们可以手动调用 trigger 函数触发响应。

```js
function computed (getter) {
  // 缓存上一次的值
  let value;
  // 标识是否需要重新计算值，true 意味要重新计算
  let dirty = true;

  const effectFn = effect(
    getter,
    {
      lazy: true,
      // 添加调度器，调度器中重置 dirty
      scheduler () {
        dirty = true;
        // 计算属性依赖的响应式数据发生变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value');
      }
    }
  );

  const obj = {
    get value () {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value');
      return value;
    }
  }

  return obj;
}
```

如上代码所示，当读取一个计算属性的 value 值时，我们可以手动调用 track 函数，把计算属性返回的对象 obj 作为 target，同时作为第一个参数传递给 track 函数。当计算属性所依赖的响应式数据发生变化时，会执行调度器函数，在调度器函数内部手动调用 trigger 函数触发响应即可。

```js
effect(() => {
  console.log(ans.value);
});
```

它会建立这样的联系。

```js
compute(obj)
	- value
		- effectFn
```

#### watch 的实现原理

watch 本质就是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。

```js
watch(obj, () => {
  console.log('data change');
});

obj.foo++;
```

watch 的实现本质是就是利用了 effect 以及 `options.scheduler` 选项。下面是最简单的 watch 实现。

```js
function watch (soure, cb) {
  effect(
  	() => source.foo,
    {
      scheduler () {
        cb()
      }
    }
  )
}
```

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

watch(obj, () => {
  console.log('data change');
});

obj.foo++;
obj.bar++;
```

上面这段代码可以正常工作，但是在实现 watch 函数，硬编码了对 `source.foo` 的读取操作。我们需要封装一个通用的读取操作。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb) {
  effect(
  	() => traverse(source),
    {
      scheduler () {
        cb()
      }
    }
  )
}
```

在 watch 内部的 effect 中调用 traverse 函数进行递归读取操作，这样就能读取一个对象上的任意属性，从而当任意属性发生变化时都能触发回调函数执行。

watch 函数除了可以观测响应式数据，还可以接收一个 getter 函数。

```js
watch(
  () => obj.foo,
  () => {
    console.log('data change');
  }
);
```

传递给 watch 函数的第一个参数不再是一个响应属性，而是一个 getter 函数。getter 函数内部，用户可以指定 watch 依赖哪些响应式数据，只有当这些数据变化时，才会触发回调函数执行。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  effect(
  	() => getter(),
    {
      scheduler () {
        cb()
      }
    }
  )
}
```

我们可以判断 source 类型，如果用户传递函数，直接使用用户的 getter 函数；如果用户没有传递函数，自定义一个函数调用 traverse 方法。这样就实现了自定义 getter 的功能。

目前 watch 还缺少一个重要的能力，就是在回调函数中拿不到旧值和新值。

```js
watch(
  () => obj.foo,
  (newVal, oldVal) => {
    console.log('data change', newVal, oldVal);
  }
);

obj.foo++;
```

我们可以利用 effect 函数的 lazy 现象，获取新值与旧值。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;

  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler () {
        newValue = effectFn();
        cb(newValue, oldValue);
        oldValue = newValue;
      }
    }
  );

  oldValue = effectFn();
}
```

我们手动调用 effectFn 函数得到的返回值就是旧值，即第一次执行得到得知。当变化发生并处罚 scheduler 调度函数执行时，会重新调用 effectFn 函数并得到新值，这样我们就可以拿到旧值与新值，接着把它们作为参数传递给回调函数就可以了。

#### 立即执行的 watch 与回调执行时机

watch 的本质其实是对 effect 的二次封装。关于 watch 还有两个特性：一个是立即执行的回调函数，另一个时回调函数的执行时机。

首先来看下立即执行的回调函数。默认情况下，一个 watch 的回调只会在响应式数据发生变化时才执行。

```js
watch(obj, () => {
  console.log('data change');
});
```

vue.js 中可以通过选项参数 immediate 指定回调是否需要立即执行。

```js
watch(obj, () => {
  console.log('data change');
}, {
  immediate: true
});
```

当 immediate 选项存在并且为 true 时，回调函数会在该 watch 创建时立即执行一次。

回调函数的立即执行与后续执行本质是没有任何差别，我们可以把 scheduler 调度函数封装为一个函数，分别在初始化和变更时执行它。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb, options = {}) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;

  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  }

  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler: job
    }
  );

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}
```

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

watch(
  () => obj.foo,
  (newVal, oldVal) => {
    console.log('data change', newVal, oldVal);
  },
  {
    immediate: true
  }
);

obj.foo++;
obj.foo++;
```

这样就实现了回调函数的立即执行功能。除了指定回调函数为立即执行之外，还可以通过其他选项参数来指定回调函数的执行时机，例如 vue.js 3 中使用 flush 选项。

```js
watch(
  obj,
  () => {
    console.log('data change');
  },
  {
    // 回调函数会在 watch 创建时立即执行一次
    flush: 'pre'
  }
);
```

flush 选项可以指定为 `pre`，`post` 或者 `sync`。flush 本质是在指定调度函数的执行时机。

当 flush 的值为 `post` 时，代表调度函数需要将副作用函数放到一个微任务队列中，并等待 DOM 更新结束后执行。

我们可以用以下代码模拟 `post` 的效果。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb, options = {}) {
  let getter;

	// ...
  
  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve();
          p.then(job);
        } else {
          job();
        }
      }
    }
  );
	
  // ...
}
```

我们修改了调度器函数 scheduler 的实现方式，当 `options.flush` 的值为 `post` 时，将 job 函数放到微任务队列中，从而实现异步延迟执行。否则执行执行 job 函数，这本质是相当于 `sync` 的实现机制，及同步执行。对于 `pre` 的情况，我们暂时没有办法模拟，这涉及组件的更新时机，其中 `pre` 和 `post` 原本的语义指的就是组件更新前和更新后。

#### 过期的副作用

竞态问题通常在多进程或多线程编程中被提及，我们在编程中也会遇见这种问题。

```js
let finalData;

watch(obj, async () => {
  const res = await fetch('/path/request');
  finalData = res;
})
```

我们使用 watch 观测 obj 对象的变化，当 obj 对象发生变化都会发送网络请求，等数据请求成功之后，将结果赋值给 `finalData` 变量。

这段代码会发生竞态问题，当 obj 对象发生多次修改，发起多个网络请求，你无法确定哪一个请求会先返回。

假设我们有两个请求，第一次修改 obj，发出请求 A，第二次修改 obj，发出请求 B。我们认为请求 B 返回的数据才是最新的，而请求 A 则应该被视为过期的。我们希望 `finalData` 存储的值应该请求 B 返回的结果。

我们需要一个让副作用过期的手段。为了让问题更加清晰，我们可以用 watch 函数复现场景。

在 vue.js 中，watch 函数的回调函数接收第三个参数 `onInvalidate`，它是一个函数，类似于事件监听器，我们可以使用 `onInvalidate` 函数注册一个回调，这个回调会在当前副作用函数过期时执行。

```js
let finalData;

watch(obj, async (newVal, oldVal, onInvalidate) => {
  let expired = false;

  onInvalidate(() => {
    expired = true;
  });

  const res = await fetch('https://service.yueluo.club/');
  const data = await res.json();

  if (!expired) {
    console.log(data); // 只打印一次结果
    finalData = data;
  }
})

obj.foo++;
obj.foo++;
```

在 watch 内部每次检查到变更后，有副作用函数重新执行之前，会先调用我们通过 `onInvalidate` 函数注册的过期回调。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb, options = {}) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;

  // cleanup 存储用户注册的过期回调
  let cleanup;

  function onInvalidate (fn) {
    cleanup = fn;
  }

  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    newValue = effectFn();
    // 调用回调函数前，先调用过期回调
    if (cleanup) {
      cleanup();
    }
    // 返回第三个参数
    cb(newValue, oldValue, onInvalidate);
    oldValue = newValue;
  }

  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve();

          p.then(job);
        } else {
          job();
        }
      }
    }
  );

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}
```

#### 总结

一个响应式数据最基本的实现依赖于对 “读取” 和 ”设置“ 操作的拦截，从而在副作用函数与响应式数据之间建立关系。当 ”读取“ 操作发生时，我们将当前执行的副作用函数存储到 ”桶中“；当 ”设置“ 操作发生时，再将副作用函数从 ”桶“ 里去除并执行。这就是响应系统的实现原理。

我们实现了一个相对完善的响应系统。使用 WeakMap 配合 Map 构建新的 ”桶“ 结构，从而能够在响应式数据与副作用函数建立更加精确的联系。我们还介绍了 WeakMap 与 Map 这两个数据结构之间的区别。WeakMap 是弱引用的，它不影响垃圾回收器的工作。当用户代码对一个对象没有用引用关系时，WeakMap 不会阻止垃圾回收器回收该对象。

我们还讨论了分支切换导致的冗余副作用问题，这个问题会导致副作用函数进行不必要的更新。为了解决这个问题，我们需要在每次副作用函数重新执行之前，清除上一次建立的响应联系，当副作用函数重新执行后，会再次建立新的响应联系，新的响应联系不存在冗余副作用。在此过程中，我们遇到了遍历 set 数据结构导致无限循环的新问题，该问题产生的原因可以从 ECMA 规范中得知，即 ”调用 forEach 遍历 Set 集合时，如果一个值已经被访问过，但这个值被删除并重新添加到集合，如果此时 forEach 遍历没有结束，那么这个值会被重新访问“。解决访问是建立一个新的 Set 集合用来遍历。

然后，我们讨论了关于嵌套的副作用函数的问题。它发生在组件嵌套的场景中，及父子组件关系。这时为了避免在响应式数据与副作用函数之间建立的响应关系发生错乱，我们需要使用使用副作用函数栈来存储不同的副作用函数。当一个副作用函数执行完毕后，将其从栈中弹出。当读取响应式数据时，被读取的响应式数据只会与当前栈顶的副作用函数建立联系，从而解决问题。我们还遇到副作用函数死循环，导致栈溢出的问题。该问题的根本原因在于，对响应式数据的读取和设置操作发生在同一个副作用函数内。解决方法很简单，如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。

随后，我们讨论了响应系统的可调度性。可调度指的是当 trigger 动作触发副作用函数重新执行后，有能力决定副作用函数的时机、次数以及方式。为了实现调度能力，我们为 effect 函数增加了第二个选项参数，可以通过 scheduler 选项指定调用器，这样用户可以通过调度器自行完成任务的调度。我们还讲解了如果通过调度器实现任务去重，即通过一个微任务队列对任务进行缓存，从而实现去重。

我们讲解了计算属性，即 computed。计算属性实际上是一个懒执行的副作用函数，我们通过 lazy 选项使得副作用函数可以懒执行。被标记为懒执行的副作用函数可以通过手动方式让其执行。利用这个特点，我们设计了计算属性，当读取计算属性的值时，只需要手动执行副作用函数即可。当计算属性依赖的响应式数据发生变化时，会通过 scheduler 将 dirty 标记设置为 true。这样下次读取计算属性的值时，我们会重新计算真正的值。

我们还讨论了 watch 的实现原理。它本质上利用了副作用函数重新执行时的可调度性。一个 watch 本身会创建一个 effect，当这个 effect 依赖的响应式数据发生变化时，会执行该 effect 的调度器函数，即 scheduler 可以理解为 “回调”，所以我们只需要在 scheduler 中执行用户通过 watch 函数注册的回调函数即可。此外，我们还讲解了立即执行回调的 watch，通过添加新的 immediate 选项来实现，还讨论了如何控制回调函数的执行时机，通过 flush 选项来指定回调函数具体的执行时机，本质是利用了调用器和异步的微任务队列。

最后，我们讨论了过期的副作用函数，它会导致竞态问题。为了解决这个问题，vue.js 为 watch 的回调函数设计了第三个参数，及 `onInvalidate` 。它是一个函数，用来注册过期回调。每当 watch 的回调函数执行之前，会优先执行用户通过 `onInvalidate` 注册的过期回调。这样，用户就有机会在过期回调中将上一次的副作用标记为 “过期”，从而解决竞态问题。

### 非原始值的响应式方案

#### 理解 Proxy 和 Reflect

vue.js 3 的响应式数据是基于 Proxy 实现的，因此我们也有必要了解 Proxy 以及与之关联的 Reflect。

使用 Proxy 创建一个对象，可以实现对其他对象的代理。Proxy 只能代理对象，无法代理非对象值，例如字符串、布尔值等。

所以代理，指的是对一个对象基本语义的代理。它允许我们拦截并重新定义对一个对象的基本操作。

类似读取、设置属性值的操作，就属于基本语义的操作，即基本操作。

```js
let obj = { foo: 1 };

obj.foo; // 读取属性 foo 的值
obj.foo++; // 读取和设置属性 foo 的值
```

既然是基本操作，就可以使用 Proxy 拦截。

```js
const p = new Proxy(obj, {
  get () {},
  set () {}
})
```

Proxy 构造函数接收两个参数。第一个参数是被代理的对象，第二个参数也是一个对象，这个对象是一组夹子（trap）。其中 get 函数用来拦截读取操作，set 函数用来拦截设置操作。

在 JavaScript 世界里，万物皆对象。例如一个函数也是一个对象，所以调用函数也是对一个对象的基本操作。因此，我们可以用 Proxy 拦截函数的调用操作，这里我们使用 apply 拦截函数的调用。

```js
const fn = name => { console.log('我是: ', name); }

const p2 = new Proxy(fn, {
  apply (target, thisArg, argArray) {
    target.call(thisArg, ...argArray);
  }
});

p2('heora'); // 我是:  heora
```

Proxy 只能够拦截对一个对象的基本操作。调用对象下的方法属于非基本操作，我们叫它复合操作。

```js
obj.fn();
```

调用一个对象下的方法， 是由两个基本语义组成的。第一个基本语义是 get，即先通过 get 操作得到 `obj.fn` 属性。第二个语义是函数调用，即通过 get 得到 `obj.fn` 的值后在调用它，也就是我们上面说到的 apply。理解 Proxy 只能代理对象的基本语义很重要。当我们实现对数组或 Map、Set 等数据类型的代理时，都利用了 Proxy 的这个特点。

了解了 Proxy，我们再来讨论 Reflect。Reflect 是一个全局对象，它有很多方法。

```js
Reflect.get();
Reflect.set();
Reflect.apply();
// ...
```

Reflect 下的方法与 Proxy 拦截器方法名字相同，任何在 Proxy 的拦截器中找到的方法， 都可以在 Reflect 中找到同名函数，那么这些函数的作用是什么？以 `Reflect.get` 函数来说，它的功能就是提供访问一个对象属性的默认行为。

```js
const obj = { foo: 1 };

console.log(obj.foo); // 直接读取
console.log(Reflect.get(obj, 'foo')); // 通过 Reflect.get 读取
```

`Refelct.*` 方法与响应式数据的实现密切相关。

```js
const data = { foo: 1 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});
```

这是我们实现响应式数据最基本的代码。在 get 和 set 拦截函数中直接使用原始对象 target 来完成对属性的读取和设置操作。

这段代码其实还有问题。

```js
const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};

// ...

effect(() => {
  console.log(obj.bar);
});

obj.foo++;
```

bar 属性是一个访问器属性，它返回了 `this.foo` 属性的值。我们在 effect 副作用函数中通过代理对象 p 访问 bar 属性。

当 effect 注册的副作用函数执行时，会读取 `obj.bar` 属性值，它发现 `obj.bar` 是一个访问器属性，因此会执行 getter 函数。由于在 getter 函数中通过 `this.foo` 读取了 foo 属性值，因此我们认为副作用函数与属性 foo 之间也会建立联系。当我们修改 `obj.foo` 时应该能够触发响应，使得副作用函数重新执行。实际并非如此，当我们修改 `obj.foo` 值时，副作用函数并不会重新执行。

问题出在 bar 属性的访问起函数 getter 里。

```js
const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};
```

在 get 拦截函数内，通过 `target[key]` 返回属性值。其中 target 是原始值 `data`，key 就是字符串 `bar`，所以 `target[key]` 相当于 `data.bar`。因此当我们使用 `obj.bar` 访问 bar 属性时，它的 getter 函数内的 this 指向的其实是原始对象 `data`，这说明最终访问的其实是 `data.foo`。在副作用函数内通过原始对象访问它的某个属性是不会建立响应联系的。

```js
effect(() => {
  data.foo; // data 是原始数据，不是代理对象，不能建立响应联系
});
```

我们可以使用 `Reflect.get` 函数解决这个问题。

```js
const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};

const obj = new Proxy(data, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.bar);
});

obj.foo++;
```

> receiver 用来处理定义在 prototype 上的 getter 。

我们在代理对象的 get 拦截函数接收第三个参数 receiver，它代表谁在读取属性。

```js
obj.bar
```

当我们使用代理对象 obj 访问 bar 属性时，那么 receiver 就是 obj，你可以简单地理解为函数调用中的 this。我们使用 `Reflect.get(target, key, receiver)` 代替之前的 `target[key]`，这里的关键点就是第三个参数。它会使访问器属性中 bar 的 getter 函数内的 this 指向代理对象 obj。

```js
const data = {
  foo: 1,
  get bar () {
    // this 为 obj 对象
    return this.foo
  }
};
```

this 由原始对象 data 变成代理对象 obj。这会在副作用函数与响应式数据之间建立响应联系，从而达到依赖收集的效果。如果此时再对 `obj.foo` 进行自增操作，会发现已经可以触发副作用函数重新执行了。

#### 对象及 Proxy 的工作原理

我们经常听说 “JavaScript 中一切皆对象”，那么到底什么是对象那？

根据 ECMAScript  规范，在 JavaScript 中有两种对象，一种叫做常规对象（ordinary object），另一种叫做异质对象（exotic object）。这两种对象包含了 JavaScript 世界中的所有对象，任何不属于常规对象的对象都是异质对象。

我们知道，在 JavaScript 中，函数其实也是对象。假设给出一个对象 obj，如何区分它是普通对象还是函数呢？实际上，在 JavaScript 中，对象的实际语义是由对象的内部方法（internal method）指定的。所谓内部方法，指的是当我们对一个对象进行操作时在引擎内部调用的方法，这些方法对于 JavaScript 使用者来说是不可见的。当我们访问对象属性时：

```js
obj.foo
```

引擎内部会调用 `[[Get]]` 这个内部方法来读取属性值。在 ECMAScript 规范中使用 `[[xxx]]` 来代表内部方法或内部槽。当然，一个对象不仅部署了 `[[Get]]` 这个内部方法。

##### 对象必要的内部方法

> https://tc39.es/ecma262/#sec-invariants-of-the-essential-internal-methods

| 内部方法                | 签名                                             | 描述                                                         |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `[[GetPrototypeOf]]`    | () => Object \| Null                             | 查明为该对象提供继承属性的对象，null 代表没有继承属性        |
| `[[SetPrototypeOf]]`    | (Object \|Null) => Boolean                       | 将该对象与提供继承属性的另一个对象相关联。传递 null 表示没有继承属性，返回 true 表示操作成功完成，返回 false 表示操作失败 |
| `[[IsExtensible]]`      | () => Boolean                                    | 查明是否允许向该对象添加其他属性                             |
| `[[PreventExtensions]]` | () => Boolean                                    | 控制能否向该对象添加新属性。如果操作成功则返回 true，操作失败则返回 false |
| `[[GetOwnProperty]]`    | (propertyKey) => Undefined \| PropertyDescriptor | 返回该对象自身属性的描述符，其键为 propertyKey，如果不存在这样的属性，则返回 undefined |
| `[[DefineOwnProperty]]` | (propertyKey, PropertyDescriptor) => Boolean     | 创建或更改自己的属性，其键为 propertyKey，以具有由 PropertyDescriptor 描述的状态。如果该属性已创建或更新，则返回 true；如果无法创建或更新该属性，则返回 false |
| `[[HasProperty]]`       | (propertyKey) => Boolean                         | 返回一个布尔值，指示该对象是否已经拥有键为 propertyKey 的自己的或继承的属性 |
| `[[Get]]`               | (propertyKey, Receiver) => any                   | 从该对象返回键为 propertyKey 的属性的至。如果必须运行 ECMAScript 代码来检索属性值，则在运行代码时使用 Receiver 作为 this 值 |
| `[[Set]]`               | (propertyKey, value, Receiver) => Boolean        | 将键值为 propertyKey 的属性的值设置为 value。如果必须运行 ECMAScript 代码来设置属性值，则在运行代码时使用 Receiver 作为 this 值。如果成功设置了属性值，则返回 true；如果无法设置，则返回 false |
| `[[Delete]]`            | (propertyKey) => Boolean                         | 从该对象删除属于自身的键为 propertyKey 的属性。如果该属性未被删除并且仍然存在，则返回 false；如果该属性已被删除或不存在，则返回 true |
| `[[OwnPropertyKeys]]`   | () => List of propertyKey                        | 返回一个 List，其元素都是对象自身的属性值                    |                                         

包括 `[[Get]]` 在内，一个对象必须部署 11 种必要的内部方法。除了上面的内部方法之外，还有两个额外的必要内部方法。

##### 额外的必要内部方法

| 内部方法        | 签名                              | 描述                                                         |
| --------------- | --------------------------------- | ------------------------------------------------------------ |
| `[[Call]]`      | (any, a list of any) => any       | 将运行的代码与 this 对象关联。由函数调用触发。该内部方法的参数是一个 this 值和参数列表 |
| `[[Construct]]` | (a list of any, Object) => Object | 创建一个对象。通过 new 运算符或 super 调用触发。该内部方法的第一个参数是一个 List，该 List 的元素是构造函数调用或 Super 调用的参数，第二个参数是最初应用 new 运算符的对象。实现该内部方法的对象称为构造函数 |

如果一个对象需要作为函数调用，那么这个对象就必须部署内部方法 `[[call]]`。我们可以通过内部方法和内部槽来区分对象，例如函数对象会部署内部方法 `[[Call]]` ，而普通对象不会。

内部方法具有多态性。不同类型的对象可能部署了相同的内部方法，但是具有不同的逻辑。例如，普通对象和 Proxy 对象都部署了 `[[Get]]` 这个内部方法，但它们的逻辑是不同的，普通对象部署的 `[[Get]]` 内部方法的逻辑是由 ECMA 规范的 10.1.8 节定义的，而 Proxy 对象部署的 `[[Get]]` 内部方法的逻辑在 ECMA 规范的 10.5.8 节定义。

https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver

https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver

了解内部方法后，就可以解释什么是常规对象，什么是异质对象。

* 对于对象必要的内部方法，必须使用 ECMA 规范 `10.1.x ` 节给出的定义实现；
* 对于内部方法 `[[Call]]`，必须使用 ECMA 规范 10.2.1 节给出的定义实现；
* 对于内部方法 `[[Construct]]` ，必须使用 ECMA 规范 10.2.2 节给出的定义实现。

所有不符合这三点要求的对象都是异质对象。例如，由于 Proxy 对象的内部方法 `[[Get]]` 没有使用 ECMA 规范 10.1.8 节给出的定义实现，所以 Proxy 是一个异质对象。

Proxy 是一个对象，它本身部署了上述必要的内部方法，当我们通过代理对象访问属性值时：

```js
const p = new Proxy(obj, { /** ... */ });
p.foo
```

引擎会调用部署在在对象 p 上的内部方法 `[[Get]]` 。代理对象和普通对象没有太大区别。它们的区别在于对于内部方法 `[[Get]]` 的实现，这里就体现了内部方法的多态性，即不同的对象部署相同的内部方法，但它们的行为可能不同。具体体现在，如果在创建代理对象时没有指定对应的拦截函数，例如没有指定 `get()` 拦截函数，那么当我们通过代理对象访问属性值时，代理对象的内部方法 `[[Get]]` 会调用原始对象的内部方法 `[[Get]]` 来获取属性值，这其实就是代理透明性质。

创建代理对象时指定的拦截函数，实际上是用来自定义代理对象本身的内部方法和行为，而不是用来指定被代理对象的内部方法和行为的。下面列出了 Proxy 对象部署的所有内部方法以及用来自定义内部方法和行为的拦截函数名字。

##### Proxy 对象部署的内部方法

Proxy 对象部署的所有内部方法。

| 内部方法                | 处理器函数               |
| ----------------------- | ------------------------ |
| `[[GetPrototypeOf]]`    | getPrototyeOf            |
| `[[SetPrototypeOf]]`    | setPrototypeOf           |
| `[[IsExtensible]]`      | isExtensible             |
| `[[PreventExtensions]]` | preventExtensions        |
| `[[GetOwnProperty]]`    | getOwnPropertyDescriptor |
| `[[DefineOwnProperty]]` | defineProperty           |
| `[[HasProperty]]`       | has                      |
| `[[Get]]`               | get                      |
| `[[Set]]`               | set                      |
| `[[Delete]]`            | deleteProperty           |
| `[[OwnPropertyKeys]]`   | ownKeys                  |
| `[[Call]]`              | apply                    |
| `[[Construct]]`         | construct                |

其中 `[[Call]]` 和 `[[Construct]]` 这两个内部方法只有当被代理的对象是函数和构造函数时才会部署。

我们要拦截删除属性操作时，可以使用 deleteProperty 拦截函数实现。

```js
const data = { foo: 1 };

const obj = new Proxy(data, {
  deleteProperty (target, key) {
    return Reflect.deleteProperty(target, key);
  }
});

console.log(obj.foo);
delete obj.foo;
console.log(obj.foo);
```

deleteProperty 实现的是大力对象 obj 的内部方法和行为，所以为了删除被代理对象上的属性值，我们需要使用 `Reflect.deleteProperty(target, key)` 来完成。

#### 如何代理对象

之前我们使用 get 拦截函数去拦截对属性的读取操作。在响应系统中，“读取” 是一个很宽泛的概念，例如使用 in 操作符检查对象上是否具有给定的 key 也属于 “读取” 操作。

```js
effect(() => {[
  'foo' on obj
]});
```

这本质是也是在进行 “读取” 操作。响应系统应该拦截一切读取操作，以便当数据变化时能够正确地触发响应。

* 访问属性：`obj.foo`
* 判断对象或原型上是否存在给定的 key：`key in obj`
* 使用 `for ... in` 循环遍历对象: `for (const key in obj) {}`

接下来，我们逐步讨论如何拦截这些读取操作。对于属性的读取，例如 `obj.foo`，我们可以使用 get 拦截函数实现。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});
```

对于 in 操作符，应该如何拦截？在 ECMA-262 规范的 13.10.1 节中，明确定义了 in 操作符的运行时逻辑。

https://tc39.es/ecma262/#sec-relational-operators-runtime-semantics-evaluation

```js
RelationalExpression : RelationalExpression in ShiftExpression
1. Let lref be the result of evaluating RelationalExpression.
2. Let lval be ? GetValue(lref).
3. Let rref be the result of evaluating ShiftExpression.
4. Let rval be ? GetValue(rref).
5. If Type(rval) is not Object, throw a TypeError exception.
6. Return ? HasProperty(rval, ? ToPropertyKey(lval)).
```

1. 让 `lref` 的值为 `RelationalExpression` 的执行结果；
2. 让 `lval` 的值为 `? GetValue(lref)` ;
3. 让 `rref` 的值为 `ShiftExpression` 的执行结果；
4. 让 `rval` 的值为 `? GetValue(rref)` ;
5. 如果 `Type(rval)` 不是对象，则抛出异常；
6. 返回 `? HasProperty(rval, ? ToPropertyKey(lval))`.

关键点在第 6 步，可以发现，in 操作符的运算结果是通过调用一个叫做 `HasProperty` 的抽象方法得到的。

`HasProperty` 抽象方法，可以在 ECMA-262 规范中的 7.3.12 找到。

https://tc39.es/ecma262/#sec-hasproperty

```js
1. Return ? O.[[HasProperty]](P).
```

 `HasProperty` 抽象方法的返回值是通过调用对象的内部方法 `[[HasProperty]]` 得到的。`[[HasProperty]]` 是对象必要的内部方法，它对应的拦截函数叫 has，因此我们可以通过 has 拦截函数实现对 in 操作符的处理。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  has (target, key) {
    track(target, key);
    return Reflect.has(target, key);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});
```

这样我们在副作用函数中通过 in 操作符操作响应式数据时，就能够建立依赖关系。

接着来看如何拦截 `for...in` 循环。我们所有能够拦截的方法有 13 种，它们是一个对象的所有基本语义方法，也就是说，任何操作其实都是由这些基本语义方法及其组合实现的，`for...in` 循环也不例外。

https://tc39.es/ecma262/#sec-runtime-semantics-forinofheadevaluation

```js
6. If iterationKind is enumerate, then
	a. If exprValue is undefined or null, then
		i. Return Completion Record { [[Type]]: break, [[Value]]: empty, [[Target]]: empty }.
	b. Let obj be ! ToObject(exprValue).
	c. Let iterator be EnumerateObjectProperties(obj).
	d. Let nextMethod be ! GetV(iterator, "next").
	e. Return the Iterator Record { [[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false }.
```

在 ECMA 262 规范的 14.7.5.6 节中定义了 `for...in` 头部的执行规则。

6. 如果 `iterationKind` 是枚举（enumerate），则
   1. 如果 `exprValue` 是 undefined 或 null，返回 `Completion Record { [[Type]]: break, [[Value]]: empty, [[Target]]: empty }`
   2. 让 `obj` 的值为 `! ToObject(exprValue)`
   3. 让 `iterator` 的值为 `EnumerateObjectProperties(obj)`
   4. 让 `nextMethod` 的值为 `! GetV(iterator, "next")`
   5. 返回 ` Iterator Record { [[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false }`

仔细观察这一子步骤：

```js
让 iterator 的值为 EnumerateObjectProperties(obj)
```

其中的关键点在于 `EnumerateObjectProperties(obj)` 。这里的 `EnumerateObjectProperties` 是一个抽象方法，该方法返回一个迭代器对象，规范中的 14.7.5.9 给出了满足该抽象方法的示例实现。

https://tc39.es/ecma262/#sec-enumerate-object-properties

```js
function* EnumerateObjectProperties(obj) {
  const visited = new Set();
  for (const key of Reflect.ownKeys(obj)) {
    if (typeof key === "symbol") continue;
    const desc = Reflect.getOwnPropertyDescriptor(obj, key);
    if (desc) {
      visited.add(key);
      if (desc.enumerable) yield key;
    }
  }
  const proto = Reflect.getPrototypeOf(obj);
  if (proto === null) return;
  for (const protoKey of EnumerateObjectProperties(proto)) {
    if (!visited.has(protoKey)) yield protoKey;
  }
}
```

可以看到，该方法是一个 generator 函数，接收一个参数 obj。实际上，obj 就是被 `for...in` 循环遍历的对象，其关键点在于使用 `Reflect.ownKeys(obj)` 来获取只属于对象自身拥有的键。我们可以使用 `ownKeys` 拦截函数来拦截 `Reflect.ownKeys` 操作。

```js
const obj = { foo: 1 };
const ITERATE_KEY = Symbol();

const p = new Proxy(obj, {
	// ...
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});
```

拦截 `ownKeys` 操作即可间接拦截 `for...in` 循环。但是我们为什么要使用 `ITERATE_KEY` 作为追踪的 key？

`ownKeys` 拦截函数与 `get/set` 拦截函数不同，在 `get/set` 中，我们可以得到具体操作的 `key`，但是在 `ownKeys` 中，我们只能拿到目标对象 `target`。在读写属性值时，可以明确地知道当前正在操作哪一个属性，所以只需要在该属性与副作用函数之间建立联系即可。`ownKeys` 用来获取一个对象的所有属于自己的键值，这个操作明显不与任何具体的键进行绑定，因此我们只能构造唯一的 `key` 作为标识，即 `ITERATE_KEY`。

既然追踪的是 `ITERATE_KEY`，在触发响应的时候也应该触发它才行：

```js
trigger(target, ITERATE_KEY);
```

我们用一段代码来说明。假设副作用函数内有一段 `for...in` 循环。

```js
const obj = { foo: 1 };
const ITERATE_KEY = Symbol();

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

p.bar = 2;
```

由于对象 p 原本只有 foo 属性，因此 for...in 循环只会执行一次。现在为它添加了新的属性 bar，所以 for...in 循环就会由执行一次变成执行两次。也就是说，当为对象添加新属性时，会对 for...in 循环产生影响，所以需要触发与 `ITERATE_KEY` 相关联的副作用函数重新执行。但我们之前的 effect 实现还做不到这一点。

```js
const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    const res = Reflect.set(target, key, newVal);
    trigger(target, key);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});
```

当为对象 p 添加新的 bar 属性时，会触发 set 拦截函数执行。此时 set 拦截函数接收到的 key 就是字符串 'bar'，因此最终调用 trigger 函数时也只是触发与 'bar' 相关联的副作用函数重新执行。但根据前文的介绍，我们知道 for...in 循环是在副作用函数与 `ITERATE_KEY` 之间建立联系，这和 'bar' 一点关系都没有，因此当我们尝试执行 `p.bar = 2` 操作时，并不会正确地触发响应。

弄清楚问题在哪，我们就可以解决这个问题了。当添加属性时，我们将那些与 `ITERATE_KEY` 相关联的副作用函数也取出来执行。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);
 // 获取与 ITERATE_KEY 相关联的副作用函数（☆☆☆）
 const iterateEffects = depsMap.get(ITERATE_KEY);

 const effectsToRun = new Set();

 // 将与 key 相关联的副作用函数添加到 effctesToRun
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun（☆☆☆）
 iterateEffects && iterateEffects.forEach(effectFn => {
  if (effectFn !== activeEffect) {
    effectsToRun.add(effectFn);
  }
 });
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => {
   // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
   if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
   } else {
    effectFn();
   }
 });
}
```

当 trigger 函数执行时，除了把那些直接与具体操作的 key 相关联的副作用取出来执行外，还要把那些与 `ITERATE_KEY` 相关联的副作用函数取出来执行。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    const res = Reflect.set(target, key, newVal);
    trigger(target, key);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

p.bar = 2;
```

对于添加新的属性来说，这么做没有什么问题，但如果仅仅修改已有属性的值，就会存在问题。

```js
p.foo = 2;
```

与添加属性不同，修改属性不会对 `for...in` 循环产生影响。因为无论怎么修改一个属性的值，对于 `for...in` 玄幻来说都只会循环一次。所以在这种情况下，我们不需要触发副作用函数重新执行，否则会造成不必要的性能开销。然而无论是添加新属性，还是修改已有的属性值，其基本语义都是 `[[Set]]`，我们都是通过 set 拦截函数来实现拦截的。

```js
const p = new Proxy(obj, {
	// ...
  set (target, key, newVal) {
    const res = Reflect.set(target, key, newVal);
    trigger(target, key);
    return res;
  },
	// ...
});
```

所以如果相解决上述问题，当设置属性操作发生时，就需要我们在 set 拦截函数内能够区分操作的类型，区分出是添加新属性还是设置已有属性。

```js
const obj = { foo: 1 };

const hasOwnProperty = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  set (target, key, newVal, receiver) {
    const type = hasOwnProperty(target, key) ? 'SET' : 'ADD';
    const res = Reflect.set(target, key, newVal, receiver);
    trigger(target, key, type);
    return res;
  },
});
```

我们优先使用 `Object.prototype.hasOwnProperty` 检查当前操作的属性是否已经存在于目标对象上，如果存在，则说明当前操作类型为 'SET'，即修改属性值；否则认为当前操作类型为 'ADD'，即添加新属性。我们把类型作为第三个参数传递给 trigger 函数。

在 trigger 函数内就可以通过类型 type 来区分当前的操作类型，并且只有当操作类型 type 为 'ADD' 时，才会触发 `ITERATE_KEY` 相关联的副作用函数重新执行，这样就避免了不需要的性能损耗。

```js
function trigger (target, key, type) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  // 将与 key 相关联的副作用函数添加到 effctesToRun
  effects && effects.forEach(effectFn => {
    // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })

  if (type === 'ADD') {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    
    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

通常我们会将操作类型封装为一个枚举值。

```js
const TRIGGER_TYPE = {
  SET: 'SET',
  ADD: 'ADD'
};
```

这样无论是对后期代码维护，还是对代码的清晰度，都是非常有帮助的。

关于对象的代理，还剩下最后一部分，就是删除属性操作的代理。

```js
delete p.foo;
```

如何代理 delete 操作符呢？规范的 13.5.1.2 节中明确定义了 delete 操作符的行为。

```js
13.5.1.2 Runtime Semantics: Evaluation
UnaryExpression : delete UnaryExpression
	1. Let ref be the result of evaluating UnaryExpression.
	2. ReturnIfAbrupt(ref).
	3. If ref is not a Reference Record, return true.
	4. If IsUnresolvableReference(ref) is true, then
		a. Assert: ref.[[Strict]] is false.
		b. Return true.
	5. If IsPropertyReference(ref) is true, then
		a. Assert: IsPrivateReference(ref) is false.
		b. If IsSuperReference(ref) is true, throw a ReferenceError exception.
		c. Let baseObj be ? ToObject(ref.[[Base]]).
		d. Let deleteStatus be ? baseObj.[[Delete]](ref.[[ReferencedName]]).
		e. If deleteStatus is false and ref.[[Strict]] is true, throw a TypeError exception.
		f. Return deleteStatus.
	6. Else,
		a. Let base be ref.[[Base]].
		b. Assert: base is an Environment Record.
		c. Return ? base.DeleteBinding(ref.[[ReferencedName]]).
```

5. 如果 `IsPropertyReference(ref)` 是 true，那么
   1. 断言：`IsPrivateReference(ref)` 是 false
   2. 如果 `IsSuperReference(ref)` 也是 true，则抛出 `ReferenceError` 异常
   3. 让 `baseObj`  的值为 `? ToObject(ref.[[Base]])`
   4. 让 `deleteStatus` 的值为 `? baseObj.[[Delete]](ref.[[ReferencedName]])`
   5. 如果 `deleteStatus` 的值为 false 并且 `ref.[[Strict]]` 的值是 true，则抛出 `TypeError` 异常
   6. 返回 `deleteStatus`

由第 5 步的 d 子步骤可知，delete 操作符的行为依赖 `[[Delete]]` 内部方法。该内部方法可以使用 `deleteProperty` 拦截。

```js
const TRIGGER_TYPE = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
};
```

```js
const p = new Proxy(obj, {
	// ...
  deleteProperty (target, key) {
    // 检查被操作的属性是否是对象自己的属性
    const hadKey = Object.prototype.hasOwnProperty.call(target, key);
    // 使用 Reflect.deleteProperty 删除属性
    const res = Reflect.deleteProperty(target, key);

    if (res && hadKey) {
      // 只有当被删除属性时对象自身属性并且删除成功时，才出发更新
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }

    return res;
  }
});
```

在调用 trigger 函数时，我们传递了新的操作类型 ‘DELETE’。由于删除操作会使得对象的建变少，它会影响 `for...in` 循环的次数，因此当操作类型为 'DELETE' 时，我们也应该触发那些与 `ITERATE_KEY` 相关联的副作用函数重新执行。

```js
function trigger (target, key, type) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  // 将与 key 相关联的副作用函数添加到 effctesToRun
  effects && effects.forEach(effectFn => {
    // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })

  // 操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数执行
  if (type === TRIGGER_TYPE.ADD || type === TRIGGER_TYPE.DELETE) {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    
    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

在这段代码中，我们添加 `type === 'DELETE'` 判断，使得删除属性操作能够触发与 `ITERATE_KEY` 相关联的副作用函数重新执行。

```js
const {
  effect, track, trigger,
  ITERATE_KEY, TRIGGER_TYPE
} = require('../shared/effect');

const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal, receiver) {
    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);
    trigger(target, key, type);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  deleteProperty (target, key) {
    const hadKey = Object.prototype.hasOwnProperty.call(target, key);
    const res = Reflect.deleteProperty(target, key);

    if (res && hadKey) {
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }

    return res;
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

// p.bar = 2;
// p.foo = 2;
delete p.foo;
```

#### 合理地触发响应

我们从规范的角度介绍了如何代理对象，这个过程中，我们处理了很多边界条件。例如，我们需要明确知道操作的类型是 ‘ADD’ 还是 'SET'，或者是其他操作类型，从而正确地触发响应。但想要合理地触发响应，还有许多工作要做。

下面我们来看第一个问题，即当值没有发生变化时，不需要触发影响。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, { /* ... */ });

effect(() => {
  console.log(p.foo);
});

p.foo = 1;
```

`p.foo` 的初始值为 1，当为 `p.foo` 设置新的值时，如果值没有发生变化，则不需要触发响应。为了满足需求，我们需要修改 set 拦截函数的代码，在调用 trigger 函数触发响应之前，需要检查值是否真的发生了变化。

```js
const p = new Proxy(obj, {
	// ...
  set (target, key, newVal, receiver) {
    const oldVal = target[key];

    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);

    if (oldVal !== newVal) {
      trigger(target, key, type);
    }

    return res;
  },
	// ...
});
```

我们在 set 拦截函数内首先获取旧值 `oldVal`，接着比较新值与旧值，只有当它们不全等的时候才触发响应。

但是仅仅进行全等比较是有缺陷的，体现在对 `NaN` 的处理上 。`NaN` 与 `NaN` 进行全等比较总会得到 false。

```js
const obj = { foo: NaN };

effect(() => {
  console.log(p.foo);
});

p.foo = NaN;

// NaN
// NaN
```

为了解决这个问题，我们需要再加一个条件，新值和旧值不全等的情况下，保证它们都不是 `NaN`。这样就解决了 `NaN` 的问题。

```js
const p = new Proxy(obj, {
	// ...
  set (target, key, newVal, receiver) {
    const oldVal = target[key];

    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);
			
    // 不全等且都不是 NaN
    if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
      trigger(target, key, type);
    }

    return res;
  },
	// ...
});
```

接下来，我们讨论一种从原型上继承属性的情况。为了讲解方便，我们需要封装一个  reactive 函数，该函数接收一个对象作为参数，并返回为其创建的响应式数据。

```js
const {
  track, trigger,
  ITERATE_KEY, TRIGGER_TYPE
} = require('../shared/effect');

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set (target, key, newVal, receiver) {
      const oldVal = target[key];
  
      const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
      const res = Reflect.set(target, key, newVal, receiver);
  
      if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
        trigger(target, key, type);
      }
  
      return res;
    },
    ownKeys (target) {
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty (target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
  
      if (res && hadKey) {
        trigger(target, key, TRIGGER_TYPE.DELETE);
      }
      return res;
    }
  });
}
```

reactive 函数只是对 Proxy 进行了一层封装。我们可以基于 reactive 创建一个例子。

```js
const obj = {};
const proto = { bar: 1 };

const child = reactive(obj);
const parent = reactive(proto);

Object.setPrototypeOf(child, parent);

effect(() => {
  console.log(child.bar);
});

child.bar = 2; // 会导致副作用函数重新执行两次 1 2 2
```

我们定义了空对象 obj 和对象 `proto`，分别为两者创建了对应的响应式数据 child 和 parent，并且使用 `Object.setProtypeOf` 方法将 parent 设置为 child 的原型。我们在副作用函数内访问 `child.bar` 的值。child 本身并没有 bar 属性，因此当访问 `child.bar` 时，值是从原型上继承而来的。但既然 child 是响应式数据，那么它与副作用函数之间就会建立联系，因此当我们执行 `child.bar = 2` 时，副作用函数会重新触发。但是执行代码你会发现，副作用函数不仅执行了，还执行了两次。

 当在副作用函数中读取 `child.bar` 的值时，会触发 child 代理对象的 get 拦截函数。在拦截函数内使用 `Reflect.get(target, key, receiver)` 来得到最终结果。

```js
Reflect.get(obj, 'bar', receiver);
```

这其实是实现通过 `obj.bar` 来访问属性值的默认行为。引擎内部是通过调用 obj 对象所部署的 `[[Get]]` 内部方法来得到最终结果的，因此我们有必要查看规范 10.1.8.1 节来了解 `[[Get]]` 内部方法的执行流程。

```js
1. Let desc be ? O.[[GetOwnProperty]](P).
2. If desc is undefined, then
	a. Let parent be ? O.[[GetPrototypeOf]]().
	b. If parent is null, return undefined.
	c. Return ? parent.[[Get]](P, Receiver).
3. If IsDataDescriptor(desc) is true, return desc.[[Value]].
4. Assert: IsAccessorDescriptor(desc) is true.
5. Let getter be desc.[[Get]].
6. If getter is undefined, return undefined.
7. Return ? Call(getter, Receiver).
```

3. 如果 `desc` 是 undefined，那么
   1. 让 parent 的值为 `? O.[[GetPrototypeOf]]()`
   2. 如果 parent 是 null，则返回 `undefined`
   3. 返回 `? parent.[[Get]](P, Receiver)`

如果对象自身不存在该属性，那么会获取对象的原型，并调用原型的 `[[Get]]` 方法得到最终结果。也就是说，当读取 `child.bar` 属性值时，由于 child 代理的对象 obj 自身没有 bar 属性，因此会获取对象 obj 的原型，也就是 parent 对象，所以最终得到的实际上 `parent.bar` 的值。parent 本身也是响应式对象，因此在副作用函数中访问 `parent.bar` 的值时，会导致副作用函数被收集，从而建立响应联系。`child.bar` 和 `parent.bar` 都与副作用函数建立了响应联系。

我们还需要看看设置操作发生时的具体执行流程。当执行 `child.bar = 2` 时，会调用 child 代理对象的 set 拦截函数。同样，在 set 拦截函数中，我们用 `Reflect.set(target, key, newVal, receiver)` 来完成默认的设置行为，即引擎会调用 obj 对象部署的 `[[Set]]` 内部方法，根据规范 10.1.9.2 节可知 `[[Set]]` 内部方法的执行流程。

```js
1. If ownDesc is undefined, then
	a. Let parent be ? O.[[GetPrototypeOf]]().
	b. If parent is not null, then
		i. Return ? parent.[[Set]](P, V, Receiver).
	c. Else,
		i. Set ownDesc to the PropertyDescriptor { [[Value]]: undefined, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
```

1. 如果 `ownDesc` 是 undefined，那么
   1. 让 parent 的值为 `O.[[GetPrototypeOf]]()`
   2. 如果 parent 不是 null，则
      1. 返回 `? parent.[[Set]](P, V, Receiver)`
   3. 否则
      1. 将 `ownDesc` 设置为 `{ [[Value]]: undefined, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }`

如果设置的属性不存在于对象上，那么会取得其原型，并调用原型的 `[[Set]]` 方法，也就是 parent 的 `[[Set]]` 内部方法。由于 parent 是代理对象，所以这就相当于执行它的 set 拦截函数。换句话说，虽然我们操作的是 `child.bar`，但这也会导致 parent 代理对象 set 拦截函数被执行。当读取 `child.bar` 的值时，副作用函数不仅会被 `child.bar` 收集，也会被 `parent.bar` 收集。所以当 parent    代理对象的 set 拦截函数执行时，就会触发副作用函数重新执行，那就是为什么修改 `child.bar` 的值会导致副作用函数重新执行两次。

其实解决思路也很简单，既然执行两次，那么只要屏蔽其中一次就可以。我们可以把由 `parent.bar` 触发的那次副作用函数的重新执行屏蔽。两次更新是由于 set 拦截函数被触发两次导致的，所以只要我们能够在 set 拦截函数内区分这两次更新就可以了。当我们设置 `child.bar` 的值时，会执行 child 代理对象的 set 拦截函数。

```js
// child 的 set 拦截函数
set (target, key, value, receiver) {
  // target 是原始对象 obj
  // receiver 是代理对象 child
}
```

此时的 target 是原始对象 obj，receiver 是代理对象 child，我们发现 receiver 其实就是 target 的代理对象。

但由于 obj 上不存在 bar 属性，所以会取得 obj 的原型 parent，并执行 parent 代理对象的 set 拦截函数：

```js
// parent 的 set 拦截函数
set (target, key, value, receiver) {
  // target 是原始对象 proto
  // receiver 仍然是代理对象 child
}
```

当 parent 代理对象的 set 拦截函数执行时，此时 target 是原始对象 `proto`，而 `receiver` 仍然是代理对象 `child`，而不再是 `target` 的代理对象。通过这个特点，我们可以看到 target 和 receiver 的区别。由于我们设置的是 `child.bar` 的值，所以无论是在什么情况下，receiver 都是 child，而 target 则是变化的。根据这个区别，我们很容易就可以想到解决办法，只需要判断 receiver 是否是 target 的代理对象即可。只有当 receiver 是 target 的代理对象时才触发更新，这样就能够屏蔽由原型引起的更新了。

所以接下来的问题就变成如何确定 receiver 是不是 target 的代理对象，这需要我们为 get 拦截函数添加一个能力。

```js
function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    }
  });
}
```

我们增加了一段代码，它可以让代理对象通过 raw 属性读取原始数据。

```js
console.log(child.raw === obj); // true
console.log(parent.raw === proto); // true
```

有了它，我们就能够在 set 拦截函数中判断 receiver 是不是 target 的代理对象。

```js
function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set (target, key, newVal, receiver) {
      const oldVal = target[key];
      const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
      const res = Reflect.set(target, key, newVal, receiver);

      // taget === receiver.raw 说明 receiver 是 target 的代理对象
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type);
        }
      }
  
      return res;
    }
  });
}
```

我们新增了一个判断条件，只有当 receiver 是 target 的代理对象时才触发更新，这样就能屏蔽由原型引起的更新，从而避免不必要的更新操作。

#### 浅响应与深响应

这一节我们介绍 reactive 与 shallowReactive 的区别，即深响应和浅响应的区别。实际上，我们目前所实现的 reactive 是浅响应的。

```js
const obj = reactive({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo.bar = 2; // 修改 obj.foo.bar 的值，并不能触发响应
```

我们创建 obj 代理对象，该对象的 foo 属性值也是一个对象，即 `{ bar: 1 }` 。在副作用函数内访问 `obj.foo.bar` 的值时，会发现后续对 `obj.foo.bar` 的修改不能触发副作用函数重新执行。

```js

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    }
  });
}
```

我们读取 `obj.foo.bar` 时，首先要读取 `obj.foo` 的值。这里我们直接用 `Reflect.get` 函数返回 `obj.foo` 的结果。由于通过 `Reflect.get`  得到 `obj.foo` 的结果是一个普通对象，即 `{ bar: 1 }`，它并不是一个响应式对象，所以在副作用函数中访问 `obj.foo.bar`  时，是不能建立响应联系的。要解决这个问题，我们需要对 `Reflect.get` 返回的结果做一层包装：

```js
const isPlainObject = (data) => typeof data === 'object' && data !== null;

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
       
      const res = Reflect.get(target, key, receiver);
      if (isPlainObject(res)) {
        return reactive(res);
      }
      return res;
    },
  });
}
```

当读取属性值时，我们首先检测该值是否是对象，如果是对象，则递归地调用 reactive 函数将其包装成响应式数据并返回。这样当使用  `obj.foo` 读取 foo 属性值时，得到的就会是一个响应式数据，因此再通过 `obj.foo.bar` 读取 bar 属性值时，自然就会建立响应联系。这样，当修改 `obj.foo.bar` 的值时，就能够触发副作用函数重新执行了。

但是，并非所有情况下我们都希望深响应，这就催生了 shallowReactive，即浅响应。所谓浅响应，指的是只有对象的第一层属性是响应的。

```js
const obj = shallowReactive({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo = { bar: 2 }; // 响应的，可以触发副作用函数并执行
obj.foo.bar = 3; // 不是响应的，不能触发副作用函数重新执行
```

我们使用 shallowReactive 函数创建了一个浅响应的代理对象 obj。可以发现，只有对象的第一层属性是响应的，第二层及更深层次的属性则不是响应的。

```js
function crateReactive (obj, isShallow = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
       
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return reactive(res);
      }

      return res;
    }
  });
}
```

```js
function reactive (obj) {
  return crateReactive(obj);
}

function shallowReactive (obj) {
  return crateReactive(obj, true);
}
```

我们可以把对象创建的工作封装到一个新的函数  `createReactive`  中。该函数除了接收原始对象 obj 之外，还接收参数 `isShallow`，代表是否创建浅响应对象。默认情况下，`isShallow` 的值为 false，代表创建深响应对象。当读取属性操作发生时，在 get 拦截函数内如果发现是浅响应的，那么直接返回原始数据即可。

#### 只读和浅只读

我们希望一些数据是只读的，当用户尝试修改只读数据时，会收到警告信息。这样就可以实现对数据的保护，例如组件接收到的 props 对象应该是一个只读数据。这时就需要接下来要讨论的 readonly 函数，它能够将一个数据变成只读的。

```js
const obj = readonly({ foo: 1 });

obj.foo = 2;
```

只读本质上也是对数据对象的代理，我们同样可以使用 `createReactive`  函数来实现。我们可以为 `createReactive`  函数增加第三个参数 `isReadonly` 。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
		// ...
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];
      const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type);
        }
      }
  
      return res;
    },
  	// ...
    deleteProperty (target, key) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
  
      if (res && hadKey) {
        trigger(target, key, TRIGGER_TYPE.DELETE);
      }
      return res;
    }
  });
}
```

```js
function readonly (obj) {
  return crateReactive(obj, false, true);
}
```

我们使用 `createReactive`  创建代理对象时，可以通过第三个参数指定是否创建一个只读的代理对象。同时，我们还修改了 get 拦截函数和 deleteProperty 拦截函数的实现，对于一个对象来说，只读意味着既不可以设置对象的属性值，也不可以删除对象的属性。在这个两个拦截函数中，我们分别添加了是否是只读的判断，一旦数据是只读的，则当这些操作发生时，会打印警告信息，提示用户这是一个非法操作。

其次，如果一个数据是只读的，那就意味着任何方式都无法修改它。因此，没有必要为制度数据建立响应联系。处于这个原因，当在副作用函数中读取一个只读属性的值时，不需要调用 track 函数追踪响应。

```js
const obj = readonly({ foo: 1 });

effect(() => {
  console.log(obj.foo); // 可以读取值，但是不需要在副作用函数与数据之间建立响应关系
});

obj.foo = 2;
```

为了实现这个功能，我们需要修改 get 拦截函数的实现。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      // 非只读才需要建立响应关系
      if (!isReadonly) {
        track(target, key);
      }
       
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return reactive(res);
      }

      return res;
    },
		// ...
  });
}

```

在 get 拦截函数内检测 `isReadonly` 变量的值，判断是否是只读的，只有在非只读的情况下才会调用 track 函数建立响应关系。

我们目前实现的 readonly 函数更应该叫做 `shallowReadonly` ，因为它没有做到深只读。

```js
const obj = readonly({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo.bar = 2;

// 1
// 2
```

为了实现深只读，我们还应该在 get 函数内地递归地调用 readonly 将数据包装成只读的代理对象，并将其作为返回值返回。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      if (!isReadonly) {
        track(target, key);
      }
       
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    },
  });
}
```

如上面的代码所示，我们在返回属性值之前，判断它是否是只读的，如果是只读的，则调用 readonly 函数对值进行包装，并把包装后的只读对象返回。

对于 `shallowReadonly` ，我们只需要修改 `createReactive` 的第二个参数即可。

```js
function readonly (obj) {
  return crateReactive(obj, false, true);
}

function shallowReadonly (obj) {
  return crateReactive(obj, true, true);
}
```

在 `shallowReadonly` 函数内调用 `createReactive` 函数创建代理对象时，将第二个参数 `isShallow` 设置为 true，这样就可以创建一个浅只读的代理对象了。

####　代理数组

在 JavaScript 中，数据只是一个特殊的对象，因此想要更好地实现对数组的代理，就有必要了解相比普通对象，数组到底有有何特殊之处。

我们知道 JavaScript 有两种对象，分别是常规对象和异质对象。数组就是一个异质对象，因为数组对象的 `[[DefineOwnProperty]]`  内部方法与常规对象不同。换句话说，数组对象处理 `[[DefineOwnProperty]]` 这个内部方法之外，其他内部方法的逻辑都与常规对象相同。因此，当实现对数组的代理时，用于代理普通对象的大部分代码都可以继续使用。

```js
const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

arr[0] = 'bar';

// foo
// bar
```

上面这段代理能够按预期工作。实际上，当我们通过索引或设置数组元素的值时，代理对象的 get/set 拦截函数也会执行，因此我们不需要做任何额外的工作，就能够让数组索引的读取和设置操作是响应式。

对数组操作与普通对象的操作仍然存在不同，下面总结了所有对数组元素或属性的 “读取” 操作：

* 通过索引访问数组元素值：`arr[0]`
* 访问数组的长度：`arr.length`
* 把数组作为对象，使用 `for...in` 循环遍历
* 使用 `for...of` 迭代遍历数组
* 数组的原型方法，如 `concat/join/every/some/find/findIndex/includes` 等，以及其他不改变原数组的原型方法

对数组的操作要比普通对象丰富得多。下面来看下对数组元素或属性 的设置操作有哪些。

* 通过索引修改数组元素值：`arr[1] = 3`
* 修改数组长度：`arr.length = 0`
* 数组的栈方法：`push/pop/shift/unshift`
* 修改原数组的原型方法：`splice/fill/sort`

除了通过数组索引修改数据元素值这种基本操作之外，数组本身还有很多会修改原数组的原型方法。调用这些方法也属于对数组的操作，有些方法的操作语义是 "读取"，有些方法的操作语义是 “设置”。因此，当这些操作发生时，也应该正确地建立响应联系或触发响应。

似乎代理数组的难度要比代理普通对象的难度大很多。但事实并非如此，因为数组本身也是对象，只不过它是异质对象，它与常规对象的差异并不大。因此，大部分用来代理常规对象的代码对于数组也是生效的。

##### 数组的索引与 length

通过数组的索引访问元素的值时，已经可以建立响应联系。

```js
const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

arr[0] = 'bar';
```

但通过索引设置数组的元素值与设置对象的属性值从根本上是不同的，这是因为数组部署的内部 `DefineOwnProperty` 不同于常规对象。实际上，当我们通过索引设置数组元素的值时，会执行数组对象所部署的内部方法 `[[Set]]` ，这一步与设置常规对象的属性值一样。根据规范可知，内部方法 `[[Set]]` 其实依赖于 `[[DefineOwnProperty]]`  ，到了这里就体现出了差异。

数组对象所部署的内部方法 `[[DefineOwnProperty]]` 的逻辑定义在规范的 10.4.2.1 节。

https://tc39.es/ecma262/#sec-array-exotic-objects-defineownproperty-p-desc

```js
1. If P is "length", then
	a. Return ? ArraySetLength(A, Desc).
2. Else if P is an array index, then
	a. Let oldLenDesc be OrdinaryGetOwnProperty(A, "length").
	b. Assert: IsDataDescriptor(oldLenDesc) is true.
	c. Assert: oldLenDesc.[[Configurable]] is false.
	d. Let oldLen be oldLenDesc.[[Value]].
	e. Assert: oldLen is a non-negative integral Number.
	f. Let index be ! ToUint32(P).
	g. If index ≥ oldLen and oldLenDesc.[[Writable]] is false, return false.
	h. Let succeeded be ! OrdinaryDefineOwnProperty(A, P, Desc).
	i. If succeeded is false, return false.
	j. If index ≥ oldLen, then
		i. Set oldLenDesc.[[Value]] to index + 1𝔽.
		ii. Set succeeded to ! OrdinaryDefineOwnProperty(A, "length", oldLenDesc).
		iii. Assert: succeeded is true.
	k. Return true.
3. Return ? OrdinaryDefineOwnProperty(A, P, Desc).
```

第 2 步的 j 子步骤描述的内容如下：

1. 如果 `index >= oldLen` ,  那么
   1. 将 `oldLenDesc.[[Value]]` 设置为 `index + 1`
   2. 让 succeeded 的值为 `OrdinaryDefineOwnProperty(A, 'length', oldLenDesc)`
   3. 断言：succeeded 是 true

可以看到，规范中明确说明，如果设置的索引值大于数组当前的长度，那么要更新数组的 length 数组。所以当通过索引设置元素值时，可能会隐式地修改 length 的属性值。因此在触发响应响应时，也应该触发与 length 属性相关联的副作用函数重新执行。

```js
const arr = reactive(['foo']);

effect(() => {
	console.log(arr.length); // 1
});

// 设置索引为 1 的值，会导致数组的长度变为 2
arr[1] = 'bar';
```

数据的原长度为 1，并且在副作用函数中访问了 length 属性。然后设置数组索引为 1 的元素值，这会导致数组的长度变为 2，因此应该触发副作用函数重新执行。但目前的实现还做不到这一点，为了实现目标，我们需要修改 set 拦截函数。

```js

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
  	// ...
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];
      const type = Array.isArray(target) 
        // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，如果是，视为 SET 操作，否则是 ADD 操作
        ? Number(key) < target.length ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD
        : Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;

      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type);
        }
      }
  
      return res;
    },
   	// ...
  });
}
```

我们在判断操作类型时，新增了对数组类型的校验。如果代理的目标对象是数组，那么对于操作类型的判断会有所区别。即被设置的索引值如果小于数组长度，就视做 SET 操作，因为它不会改变数组长度；如果设置的索引值大于数组的当前长度，则视为 ADD 操作，因为这汇隐式地修改数组的 length 属性值。有了这些信息，我们就可以在 trigger 函数中正确地触发与数组对象的 length 属性相关联的副作用函数重新执行了。

```js
function trigger (target, key, type) {
	// ...
  
  // 操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length 属性相关联的副作用函数 
  if (type === TRIGGER_TYPE.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length');

    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects && lengthEffects.forEach((effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    }));
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

反过来思考，其实修改数组的 length 属性也会隐式地影响数组元素。

```js
const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

// 将数组的长度修改为 0，导致第 0 个元素被删除，因此应该触发响应
arr.length = 0;
```

在副作用函数内访问了数组的第 0 个元素，接着将数组的 length 属性修改为 0。这会隐式地影响数组元素，即所有元素都被删除，所以应该触发副作用函数重新执行。然后并非所有对 length 属性的修改都会影响数组中的已有元素。拿上面例子来说，如果我们将 length 属性设置为 100，这并不会影响第 0 个元素，所以也就不需要触发副作用函数重新执行。当修改 length 属性值时，只有那些索引值大于或等于新的 length 属性值的元素才需要触发响应。但无论如何，目前的实现还做不到这一点，为了实现目标，我们需要修改 set 拦截函数。在调用 trigger 函数触发响应时，应该把新的属性值传递过去。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
  	// ... 	
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];
      const type = Array.isArray(target) 
        // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，如果是，视为 SET 操作，否则是 ADD 操作
        ? Number(key) < target.length ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD
        : Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;

      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 增加第四个参数，即触发响应的新值
          trigger(target, key, type, newVal);
        }
      }
  
      return res;
    },
   	// ...
  });
}
```

接下来，我们还需要修改 trigger 函数。

```js
function trigger (target, key, type, newVal) {
	// ...

  // 操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length 属性相关联的副作用函数 
  if (type === TRIGGER_TYPE.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length');

    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects && lengthEffects.forEach((effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    }));
  }

  // 如果操作目标是数组，并且修改了数组的 length 属性
  if (Array.isArray(target) && key === 'length') {
    // 对于索引大于或等于新的 length 值的元素
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 函数中
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn);
          }
        });
      }
    });
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

如上面的代码所示，为 trigger 函数增加了第四个参数，即触发响应时的新值。这里的新值指的是新的 length 属性值，它代表新的数组长度。接着，我们判断操作的目标是否是数组，如果是，则需要找到所有索引值大于或等于新的 length 值的元素，然后把它与它们相关联的副作用函数取出并执行。

##### 遍历数组

数组也是对象，这意味着同样可以使用 `for...in` 循环遍历：

```js
const arr = reactive(['foo']);

effect(() => {
  for (const key in arr) {
    console.log(key); // 0
  }
});
```

我们应该尽量避免使用  `for...in`  循环遍历数组。不过既然在语法上是可行的，我们当然也要考虑这个问题。数据对象和常规对象的不同体现在 `[[DefineOwnProperty]]` 这个内部方法上，也就是说，使用 `for...in` 循环遍历数组与遍历常规对象并无差异，因此同样可以使用 `ownKeys` 拦截函数进行拦截。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
		// ...
    ownKeys (target) {
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    // ...
  });
}
```

当初我们为了追踪对普通对象的 `for...in` 操作，创建了 `ITERATE_KEY` 作为追踪的 key。但这是为了代理普通对象而考虑的，对于一个普通对象来说，只有当添加或删除属性值才会影响 `for...in` 循环的结果。所以当添加或删除属性操作发生时，我们需要取出与 `ITERATE_KEY` 相关联的副作用函数重新执行。不过，对于数组来说情况有所不同，我们需要看看哪些操作会影响 `for...in`  循环对数组的遍历。

* 添加新元素：`arr[100] = bar`
* 修改数组长度：`arr.length = 0`

无论是为数组添加新元素，还是直接修改数组的长度，本质上都是因为修改了数组的 `length` 属性。一旦数组的 `length` 属性被修改，那么 `for...in` 循环对数组的遍历结果就会改变，所以在这种情况下我们应该触发响应。我们可以在 `ownKeys` 拦截函数内，判断当前操作目标 `target` 是否是数组，如果是数组，则使用 `length` 作为 key 去建立响应联系。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
		// ...
    ownKeys (target) {
      // 如果操作目标 target 是数组，使用 length 属性作为 key 建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    // ...
  });
}
```

这样无论是为数组添加新元素，还是直接修改 `length` 属性，都能够正确触发响应。

```js
const arr = reactive(['foo']);

effect(() => {
  for (const key in arr) {
    console.log(key); // 0
  }
});

arr[1] = 'bar';
arr.length = 0;
```

接下来我们再看看使用 `for...of` 遍历数组的情况。与 `for...in` 不同，`for...of` 是用来遍历 `可迭代对象（iterable object）` 的，因此我们需要先搞清楚什么是可迭代对象。ES2015 为 JavaScript 定义了 `迭代协议（iteration protocol）` ，它不是新的语法，而是一种协议。具体来i说，一个对象是否能够被迭代，取决于该对象或者该对象的原型是否实现了 `@@iterator` 方法。这里的 `@@[name]` 标志在 ECMAScript 规范里用来代指 JavaScript 内建的 symbols 值，例如 `@@iterator` 指的就是 `Symbol.iterator` 这个值。如果一个对象实现了 `Symbol.iterator`  方法，那么这个对象就是可迭代的。

```js
const obj = {
  value: 0,
  [Symbol.iterator]() {
    return {
      next () {
        return {
          value: obj.value++,
          done: obj.value > 10 ? true : false
        }
      }
    }
  }
};

for (const value of obj) {
  console.log(value); // 0 1 2 3 4 5 6 7 8 9
}
```

数组内建了 `Symbol.iterator` 方法的实现。

```js
const arr = [1, 2, 3, 4, 5];
const itr = arr[Symbol.iterator]();

console.log(itr.next()); // { value: 1, done: false }
console.log(itr.next()); // { value: 1, done: false }
console.log(itr.next()); // { value: 1, done: false }
console.log(itr.next()); // { value: 1, done: false }
console.log(itr.next()); // { value: 1, done: false }
console.log(itr.next()); // { value: undefined, done: true }
```

可以看到，我们能够通过 `Symbol.iterator` 作为键，获取数组内建的迭代器方法。然后手动执行迭代器的 next 函数，这样也可以得到期望的结果。这也是默认情况下数据可以使用 `for...of` 遍历的原因。

```js
const arr = [1, 2, 3, 4, 5];

for (const val of arr) {
  console.log(val); // 1 2 3 4 5
}
```

实际上，想要实现对数组进行 `for...of` 遍历的拦截，关键点就在于找到 `for...of` 操作依赖的基本语义。在规范的 23.1.5.1 节中定义了数组迭代器的执行流程。

https://tc39.es/ecma262/#sec-createarrayiterator

```js
1. Let closure be a new Abstract Closure with no parameters that captures kind and array and performs the following steps when called:
	a. Let index be 0.
	b. Repeat,
		i. If array has a [[TypedArrayName]] internal slot, then
			1. If IsDetachedBuffer(array.[[ViewedArrayBuffer]]) is true, throw a TypeError exception.
			2. Let len be array.[[ArrayLength]].
		ii. Else,
			1. Let len be ? LengthOfArrayLike(array).
		iii. If index ≥ len, return undefined.
		iv. If kind is key, perform ? GeneratorYield(CreateIterResultObject(𝔽(index), false)).
		v. Else,
			1. Let elementKey be ! ToString(𝔽(index)).
			2. Let elementValue be ? Get(array, elementKey).
			3. If kind is value, perform ? GeneratorYield(CreateIterResultObject(elementValue, false)).
			4. Else,
				a. Assert: kind is key+value.
				b. Let result be CreateArrayFromList(« 𝔽(index), elementValue »).
				c. Perform ? GeneratorYield(CreateIterResultObject(result, false)).
		vi. Set index to index + 1.
2. Return CreateIteratorFromClosure(closure, "%ArrayIteratorPrototype%", %ArrayIteratorPrototype%).
```

第 1 步的 b 子步骤所描述的内容如下：

- 重复以下步骤
  - 如果 array 有 `[[TypedArrayName]]` 内部槽，那么
    - 如果 `IsDetachedBuffer(array.[[ViewedArrayBuffer]])` 是 true，则抛出 `TypeError` 异常
    - 让 `len` 的值为 `array.[[ArrayLength]]`
  - 否则
    - 让 `len` 的值为 `LengthOfArrayLike(array)`
  - 如果 `index >= len`，则返回 `undefined`
  - 如果 `kind` 是 `key`，则执行 `? GeneratorYield(CreateIterResultObject(𝔽(index), false))`
  - 否则
    - 让 `elementKey` 的值为 `! ToString(𝔽(index))`
    - 让 `elementValue` 的值为 `? Get(array, elementKey)`
    - 如果 `kind` 是 `value`，执行 `? GeneratorYield(CreateIterResultObject(elementValue, false))`
    - 否则
      - 断言：`kind` 是 `key + value`
      - 让结果是 `CreateArrayFromList(« 𝔽(index), elementValue »)`
      - 执行：`? GeneratorYield(CreateIterResultObject(result, false)).`
  - 将 index 设置为 `index + 1 `

可以看到，数组迭代器的执行回去读数组的 `length` 属性。如果迭代的是数组元素值，还会读取数组的索引。其实我们可以给出一个数组迭代器的模拟实现。

```js

const arr = [1, 2, 3, 4, 5];

arr[Symbol.iterator] = function () {
  const target = this;
  const len = target.length;
  let index = 0;

  return {
    next () {
      return {
        value: index < len ? target[index] : undefined,
        done: index++ >= len
      }
    }
  }
}

for (const val of arr) {
  console.log(val); // 1 2 3 4 5
}
```

这个例子表明，迭代数组时，只需要在副作用函数与数组的长度和索引之间建立响应联系，就能够实现响应式的 `for...of` 迭代。

```js
const arr = reactive([1, 2, 3, 4, 5]);

effect(() => {
  for (const val in arr) {
    console.log(val);
  }
});

arr['1'] = 'bar';
arr.length = 0; 
```

可以看到，不需要增加任何代理就能够使其正确地工作。这是因为只要数组的长度和元素值发生改变，副作用函数自然会重新执行。

```js
TypeError: Cannot convert a Symbol value to a number
```

无论是使用 `for...of` 循环，还是调用 `values` 等方法，它们都会去读数组的 `Symbol.iterator` 属性。该属性是一个 symbol 值，为了避免发生意外的错误，以及性能上的考虑，我们不应该在副作用函数与 `Symbol.iterator` 值之间建立响应联系，因此需要修改 `get` 拦截函数。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key);
      }
      
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    },
    // ...
    ownKeys (target) {
      // 如果操作目标 target 是数组，使用 length 属性作为 key 建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
   	// ...
  });
}
```

在调用 track 函数进行追踪之前，需要添加一个判断条件，即只有当 key 的类型不是 symbol 时才进行追踪，这样就避免了上述问题。

数组的 values 方法的返回值实际上就是数组内建的迭代器，我们可以验证这一点。

```js
console.log(Array.prototype.values === Array.prototype[Symbol.iterator]); // true
```

在不增加任何代码的情况下，我们也能够让数组的迭代器方法正确地工作。

```js
const arr = reactive([1, 2, 3, 4, 5]);

effect(() => {
  for (const val of arr.values()) {
    console.log(val);
  }
});

arr['1'] = 'bar';
arr.length = 0; 
```

##### 数组的查找方法

数据的方法内部其实都依赖了对象的基本语义。所以大多数情况下，我们不需要做特殊处理即可让这些方法按预期工作。

```js
const arr = reactive([1, 2]);

effect(() => {
  console.log(arr.includes(1));
});

arr[0] = 3;
```

比如上面这个例子，includes 为了找到给定的值，它内部会访问数组的 `length` 属性以及数组的索引，因此当我们修改某个索引指向的元值后能够触发响应。

但是 includes 也不总是按照预期工作。

```js
const obj = {};
const arr = reactive([ obj ]);

console.log(arr.includes(arr[0])) // false
```

如上面代码所示。我们首先定一个对象 obj，并将其作为数组的第一个元素，然后调用 reactive 函数为其创建一个响应式对象，接着尝试调用 includes 方法在数组中进行查找，看看其中是否包含第一个元素。很显然，这个操作应该返回 true，但如果你尝试运行这段代码，会发现它返回了 false。

语言规范 23.1.3.14 节给出了 includes 方法的执行流程。

https://tc39.es/ecma262/#sec-array.prototype.includes

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If len is 0, return false.
4. Let n be ? ToIntegerOrInfinity(fromIndex).
5. Assert: If fromIndex is undefined, then n is 0.
6. If n is +∞, return false.
7. Else if n is -∞, set n to 0.
8. If n ≥ 0, then
			a. Let k be n.
9. Else,
			a. Let k be len + n.
			b. If k < 0, set k to 0.
10. Repeat, while k < len,
			a. Let elementK be ? Get(O, ! ToString(𝔽(k))).
			b. If SameValueZero(searchElement, elementK) is true, return true.
			c. Set k to k + 1.
11. Return false.
```

上面是数组的 includes 方法的执行流程，我们重点关注第 1 步和第 10 步。其中，第 1 步所描述的内容如下。

* 让 `O` 的值为 `? ToObject(this value)`

第 10 步的描述如下。

* 重复，while 循环（条件 `k < len`）
  * 让 `elementK` 的值为 `? Get(O, ! ToString(𝔽(k)))`
  * 如果 `SameValueZero(searchElement, elementK)`  是 true，则返回 true
  * 将 k 设置为 `k + 1`

第 1 步，让  `O` 的值为 `? ToObject(this value)`，这里的 this 是谁？在  `arr.includes(arr[0])`  语句中，arr 是代理对象，所以 includes 函数执行时的 this 指向的就是代理对象，即 arr。接着我们看第  `10.a`  步，可以看到 includes 方法会通过索引读取数组元素的值，但是这里的 `O` 是代理对象 arr。我们知道，通过代理对象来访问元素值时，如果值仍然是可以被代理的，那么得到的值就是新的代理对象而非原始对象。下面这段 get 拦截函数内的代码可以证明这一点。

```js
const isPlainObject = (data) => typeof data === 'object' && data !== null;

if (isPlainObject(res)) {
  return isReadonly ? readonly(res) : reactive(res);
}
```

知道这些后，我们再回头看这句代码：`arr.includes(arr[0])` 。其中，`arr[0]` 得到的是一个代理对象，而在 includes 方法内部也会通过 arr 访问数组元素，从而得到一个代理对象，问题是这两个代理对象是不同的。这是因为每次调用 reactive 函数时都会创建一个新的代理对象。

```js
function reactive (obj) {
  return crateReactive(obj);
}
```

即使参数 obj 相同的，每次调用 reactive 函数时，都会创建新的代理对象。这个问题的解决方案如下所示。

```js
// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map();

function reactive (obj) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(obj);

  if (existionProxy) return existionProxy;

  const proxy = crateReactive(obj);

  reactiveMap.set(obj, proxy);

  return proxy;
}
```

在上面这段代码中，我们定义了 `reactiveMap` ，用来存储原始对象到代理对象的映射。每次调用 reactive 函数创建代理对象之前，优先检查是否已经存在相应的代理对象。如果存在，则直接返回已有的代理对象，这样就避免了为同一个原始对象多次创建代理对象的我呢提。

```js
const obj = {};
const arr = reactive([ obj ]);

console.log(arr.includes(arr[0])) // true
```

现在输出的结果已经符合我们预期。然而还不能高兴的太早，再来看下面的代码。

```js
const obj = {};
const arr = reactive([ obj ]);

console.log(arr.includes(obj)) // false
```

在上面的代码中，我们直接把原始对象作为参数传递给 includes 方法，这是很符合直觉的行为。而从用户的角度来看，自己明明把 obj 作为数组的第一个元素了，为什么在数组中却仍然找不到 obj 对象？其实原因很简单，因为 includes 内部的 this 指向的是代理对象 arr，并且在获取数组元素时得到的值也是代理对象，所以拿原始对象 obj 去查找肯定查不到，因此返回 false。为此，我们需要重写数组的 includes 方法并实现自定义的行为，才能解决这个问题，首先，我们来看如何重写 includes 方法。

```js
const arrayInstrumentations = {
  includes: function () {}
}

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      // 如果操作的目标对象是数组，并且 key 存在于 arrayInstrumentations 上
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key);
      }
      
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    },
		// ...
  });
}
```

上段代码中，我们修改了 get 拦截函数，目的是重写数组的 includes 方法。`arr.includes` 可以理解为读取代理对象 arr 的 includes 属性，这就会触发 get 拦截函数，在该函数内检查 target 是否是数组，如果是数组并且读取的键值存在于 `arrayInstrumentations` 上，则返回定义在 `arrayInstrumentations` 对象上相应的值。也就是说，当执行 `arr.includes` 时，实际执行的是定义在 `arrayInstrumentations` 上的 `includes` 函数，这样就实现了重写。

```js
const originMethod = Array.prototype.includes;
const arrayInstrumentations = {
  includes: function (...args) {
    // this 是代理对象，现在代理对象中查找，将结果存储到 res 中
    let res = originMethod.apply(this, args);

    if (res === false) {
      // res 为 false 说明没找到，通过 this.raw 拿到原始数组，再去其中查找并更新 res 值
      res = originMethod.apply(this.raw, args);
    }

    return res;
  }
}
```

如上面这段代码所示，其中 includes 方法内的 this 指向的是代理对象，我们现在代理对象中进行查找，这其实是实现了 `arr.includes(obj)` 的默认行为。如果找不到，通过 `this.raw` 拿到原始数组，再去其中查找，最后返回结果，这样就解决了上述问题。

```js
const obj = {};
const arr = reactive([ obj ]);

console.log(arr.includes(obj)) // true
```

现在代码的行为已经符合预期。除了 includes 方法之外，还需要做类似处理的方法有 `indexOf` 和 `lastIndexOf` ，因为它们都属于根据给定的值返回查找结果的方法。

```js
const arrayInstrumentations = {};

;['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
  const originMethod = Array.prototype[method];
  arrayInstrumentations[method] =  function (...args) {
    // this 是代理对象，现在代理对象中查找，将结果存储到 res 中
    let res = originMethod.apply(this, args);

    if (res === false) {
      // res 为 false 说明没找到，通过 this.raw 拿到原始数组，再去其中查找并更新 res 值
      res = originMethod.apply(this.raw, args);
    }

    return res;
  }
});
```

##### 隐式修改数组长度的原型方法

这一节我们讲解如何处理那些因是修改数组长度的方法，主要指的是数组的栈方法，例如 `push/pop/shift/unshift` 。除此之外，`splice` 方法也会隐式地修改数组长度，我们可以查阅规范来证实这一点。以 `push` 方法为例，规范 23.1.3.21 节定义了 push 方法的执行流程。

https://tc39.es/ecma262/#sec-array.prototype.push

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let argCount be the number of elements in items.
4. If len + argCount > 2^53 - 1, throw a TypeError exception.
5. For each element E of items, do
			a. Perform ? Set(O, ! ToString(𝔽(len)), E, true).
			b. Set len to len + 1.
6. Perform ? Set(O, "length", 𝔽(len), true).
7. Return 𝔽(len).
```

当调用 push 方法并传递 0 个或多个参数时，会执行以下步骤。

* 让 `O` 的值为 `? ToObject(this value)`
* 让 `len` 的值为 `? LengthOfArrayLike(O)`
* 让 `argCount` 的值为 `items` 的元素数组
* 如果 `len + argCount > 2^53 - 1 ` ，抛出 `TypeError` 异常
* 对于 items 中的每一个元素 `E`
  * 执行 `? Set(O, ! ToString(𝔽(len)), E, true)`
  * 将 `len`  设置为 `len + 1`
* 执行 `? Set(O, "length", 𝔽(len), true)` 
* 返回 `𝔽(len)`

由第 2 步和第 6 步可知，当调用数组的 push 方法向数组中添加元素时，既会读取数组的 `length` 属性值，也会设置数组的 `length` 属性值。这会导致两个独立的副作用函数互相影响。	

```js
const arr = reactive([]);

effect(() => {
  arr.push(1);
});

effect(() => {
  arr.push(1);
});
```

如果你尝试运行上面这段代码，会得到栈溢出的错误（Maximum call stack size exceeded）。为什么会这样呢?

* 第一个副作用函数执行。在该函数内，调用 `arr.push` 方法向数组中添加一个元素。我们知道，调用函数的 push 方法会间接读取数组的 length 属性。所以，当第一个副作用函数执行完毕后，会与 length 属性建立响应联系；
* 接着，第二个副作用函数执行。同样，它也会与 length 属性建立响应关系。但不要忘记，调用 `arr.push` 方法不仅会间接读取数组的 length 属性，还会间接设置 length 属性的值；
* 第二个函数内的 `arr.push` 方法的调用设置了数组的 length 属性值。于是，响应系统尝试把与 length 属性相关联的副作用函数全部取出并执行，其中就包括第一个副作用函数。问题就在这里，可以发现，第二个副作用函数还未执行完毕，就要再次执行第一个副作用函数了；
* 第一个副作用函数再次执行。同样，这样间接设置数组的 length 数组。于是，响应系统又要尝试把所有与 length 属性相关联的副作用函数取出并执行，其中就包含第二个副作用函数；
* 如此循环往复，最终导致调用栈溢出。

问题的原因是 push 方法的调用会间接读取 length 属性。所以，只要我们 “屏蔽” 对 length 属性的读取，从而避免在它与副作用函数之间建立响应联系，问题就可以解决。这个思路是正确的，因为数组的 push 方法在语义上是修改操作，而非读取操作，所以避免建立响应联系并不会产生其他副作用。这需要重写数组的 push 方法。

```js
// 一个标记变量，代表是否进行追踪。默认值是 true，即允许追踪
let shouldTrack = true;

;['push'].forEach(method => {
  const originMethod = Array.prototype[method];
  arrayInstrumentations[method] = function (...args) {
    // 调用原始方法之前禁止追踪
    shouldTrack = false;
    // push 方法的默认行为
    let res = originMethod.call(this, args);
    // 调用原始方法之后，恢复原来的行为，即允许追踪
    shouldTrack = true;
    return res;
  }
});
```

在这段代码中，我们定义了一个标记变量 `shouldTrack`，它是一个布尔值，代表是否允许追踪。接着，我们重写了数组的 push 方法，利用前文介绍的 `arrayInstrumentations` 对象。重写后的 push 方法保留了默认行为，只不过在执行默认行为之前，先将标记变量 `shouldTrack` 的值设置为 false，即禁止追踪。当 push 方法的默认行为执行完毕后，再将标记变量 `shouldTrack` 的值还原为 true，代表允许追踪。最后，我们还需要修改 track 函数。

```js
function track (target, key) {
  // 禁止追踪时，直接返回
  if (!activeEffect || !shouldTrack) return;
	
  // ...
}
```

可以看到，当标记为 `shouldTrack` 的值为 false 时，即禁止追踪时，track 函数会直接返回。这样，当 push 方法间接读取 length 属性值时，由于此时是禁止追踪的状态，所以 length 属性与副作用函数之间不会建立响应联系。这样就实现了前文给出的方案。我们再次尝试运行下面这段测试代码。

```js
const arr = reactive([]);

effect(() => {
  arr.push(1);
});

effect(() => {
  arr.push(1);
});
```

会发现它能够正常地工作，并且不会导致调用栈溢出。

除了 `push` 方法之外，`pop`、`shift`、`unshfit`、`splice` 方法都需要做类似的处理。

```js
// 一个标记变量，代表是否进行追踪。默认值是 true，即允许追踪
let shouldTrack = true;

;['push', 'pop', 'shift', 'unshfit', 'splice'].forEach(method => {
  const originMethod = Array.prototype[method];
  arrayInstrumentations[method] = function (...args) {
    // 调用原始方法之前禁止追踪
    shouldTrack = false;
    // push 方法的默认行为
    let res = originMethod.call(this, args);
    // 调用原始方法之后，恢复原来的行为，即允许追踪
    shouldTrack = true;
    return res;
  }
});
```

#### 代理 Set 和 Map

下面将介绍集合类型数据的响应式方案。集合类型包括 `Map/Set` 以及 `WeakMap/WeakSet`。使用 Proxy 代理集合类型的数据不同于代理普通对象，因为集合类型数据的操作与普通对象存在很大的不通。下面使 Set 和 Map 这两个数据类型的原型属性和方法。

Set 类型的原型属性和方法：

1. `size`：返回集合中元素的数量；
2. `add(value)`：向集合中添加给定的值；
3. `clear()`：清空集合；
4. `delete(value)`：从集合中删除给定的值；
5. `has(value)`：判断集合中是否存在给定的值；
6. `keys()`：返回一个迭代器对象。可以用于 for...of 循环，迭代器对象产生的值为集合中的元素值；
7. `values()`：对于 Set 集合类型来说，keys() 和 values() 等价；
8. `entries()`：返回一个迭代器对象。迭代过程中为集合中的每一个元素产生一个数组值 [value, value]；
9. `forEach(callback[, thisArg])`：forEach 函数会遍历集合中的所有元素，并对每一个元素调用 callback 函数。forEach 函数接收可选的第二个参数 `thisArg`，用于执行 callback 函数执行时的 this 值。

Map 类型的原型属性和方法：

1. `size`：返回 Map 数据中的键值对数量；；
2. `clear()`：清空 Map；
3. `delete(key)`：删除指定 key 的键值对；
4. `has(key)`：判断 Map 中是否存在指定 key 的键值对；
5. `get(key)`：读取指定 key 对应的值；
6. `set(key, value)`：为 Map 设置新的键值对；
7. `keys()`：返回一个迭代器对象。迭代过程中会产生键值对的 key 值；
8. `values()`：返回一个迭代器对象。迭代过程中会产生键值对的 value 值；
9. `entries()`：返回一个迭代器对象。迭代过程中会产生由 `[key, value]` 组成数组值；
10. `forEach(callback[, thisArg])`：forEach 函数会遍历集合中的所有键值对，并对每一个元素调用 callback 函数。forEach 函数接收可选的第二个参数 `thisArg`，用于执行 callback 函数执行时的 this 值。

Map 和 Set 这两个数据类型的操作方法相似。它们之间最大的不同体现在，Set 类型使用 `add(value)` 方法添加严肃，Map 类型使用 `set(key, value)` 方法设置键值对，并且 Map 类型可以使用 `get(key)` 方法读取相应的值。这意味着我们可以用相同的处理方法来实现对它们的代理。

#### 如何代理 Set 和 Map

Set 和 Map 类型的数据有特定的属性和方法用来操作自身。这一点与普通对象不同。

```js
// 普通对象的读取和设置操作
const obj = { foo: 1 };
obj.foo;
obj.foo = 2;

// 用 get/set 方法操作 map 数据
const map = new Map();
map.set('key', 1);
map.get('key');
```

正是因为有这些差异的存在，我们不能像代理普通对象那样代理 Set 和 Map 类型的数据。但整体思路不变，即当读取操作发生时，调用 track 函数建立响应关系；当设置操作发生时，调用 trigger 函数触发响应。

```js
const proxy = reactive(new Map([['key', 1]]));

effect(() => {
  console.log(proxy.get('key'));
});

proxy.set('key', 2);
```

这段代码展示的效果是我们最终要实现的目标。实现之前，我们需要先了解使用 Proxy 代理 Set 或 Map 类型数据的注意事项。

```js
const s = new Set([1, 2, 3]);
const p = new Proxy(s, {});

console.log(p.size); // Method get Set.prototype.size called on incompatible receiver #<Set>
```

这段代码中，我们定义了一个 Set 类型的数据 s，接着为它创建一个代理对象 p。由于代理的目标对象是 Set 类型，因此我们可以通过读取它的 `p.size` 属性获取元素的数量。但是，执行代码时我们会得到一个错误。错误信息的大意是 “在不兼容的 `receiver` 上调用了 `get Set.prototype.size`方法”。size 属性应该是一个访问器属性，所以它作为方法被调用了。

https://tc39.es/ecma262/#sec-get-set.prototype.size

```js
24.2.3.9 get Set.prototype.size

Set.prototype.size is an accessor property whose set accessor function is undefined. Its get accessor function performs the following steps:

1. Let S be the this value.
2. Perform ? RequireInternalSlot(S, [[SetData]]).
3. Let entries be the List that is S.[[SetData]].
4. Let count be 0.
5. For each element e of entries, do
			a. If e is not empty, set count to count + 1.
6. Return 𝔽(count).
```

`Set.prototype.size` 是一个访问器属性，它的 set 访问器函数是 `undefined`，它的 get 访问器函数会执行以下步骤。

1. 让 S 的值为 this；
2. 执行 `? RequireInternalSlot(S, [[SetData]])`
3. 让 entries 的值为 List，即 `S.[[SetData]]`
4. 让 count 的值为 0
5. 对于 entries 中的每个元素 e，执行：
   1. 如何 e 不是空的，则将 count 设置为 count + 1
6. ` 𝔽(count)`

由此可知，`Set.prototype.size` 是一个访问器属性。关键点在第 1 步和第 2 步。根据第 1 步的描述：让 S 的值为 this。这里的 this 是代理对象 p，因为我们是通过代理对象 p 来访问 size 属性的。在第 2 步中，调用抽象方法 `RequireInternalSlot(S. [[SetData]])` 来检查 S 是否存在内部槽 `[[SetData]]` 。很显然，代理对象 S 不存在 `[SetData]` 这个内部槽，于是会抛出错误。

为了修复这个问题，我们需要修正访问器属性的 getter 函数执行的 this 指向。

```js
const s = new Set([1, 2, 3]);
const p = new Proxy(s, {
  get (target, key, receiver) {
    if (key === 'size') {
      // 如果读取的时 size 属性
      // 通过指定第三个参数 receiver 为原始对象 target 从而修复问题 
      return Reflect.get(target, key, target);
    }
    // 读取其他属性的默认行为
    return Reflect.get(target, key, receiver);
  }
});

console.log(p.size);
```

我们在创建代理对象时增加了 get 拦截函数。然后检查读取的属性名称是不是 size，如果是，则在调用 `Reflect.get` 函数时指定第三个参数为原始 Set 对象，这样访问器属性 size 的 getter 函数在执行时，其 this 指向的就是原始 Set 对象而非代理对象。由于原始 Set 对象上存在 `[[SetData]]` 内部槽，因此程序得以正确运行。

接着，我们再来尝试从 Set 中删除数据。

```js
const s = new Set([1, 2, 3]);
const p = new Proxy(s, {
  get (target, key, receiver) {
    if (key === 'size') {
      return Reflect.get(target, key, target);
    }
    return Reflect.get(target, key, receiver);
  }
});
p.delete(1); //  Method Set.prototype.delete called on incompatible receiver #<Set>
```

可以看到，调用 `p.delete` 方法时会得到一个错误，这个错误与前文讲解的访问 `p.size` 属性发生的错误相似。

访问 `p.size` 与访问 `p.delete` 是不同的。因为 size 是属性，是一个访问器属性，而 delete 是一个方法。当访问 `p.size` 时，访问器的 getter 函数会立即执行，此时我们可以通过修改 receiver 来改变 getter 函数的 this 指向。而当访问 `p.delete` 时，`delete` 方法并没有执行，真正使其执行的语句是 `p.delete(1)`  这句函数调用。因此，无论如何修改 receiver，delete 方法执行时的 this 都会指向代理对象 p，而不会指向原始 Set 对象。想要修复这个问题也不难，只需要把 delete 方法与原始数据对象绑定即可。

```js
const s = new Set([1, 2, 3]);
const p = new Proxy(s, {
  get (target, key, receiver) {
    if (key === 'size') {
      return Reflect.get(target, key, target);
    }
    // 将方法与原始数据对象 target 绑定后返回
    return target[key].bind(target);
  }
});
p.delete(1);
```

上面这段代码中，我们使用 `target[key].bind(target)` 代替了 `Reflect.get(target, key, receiver)` 。可以看到，我们使用 bind 函数将用于操作数据的方法与原始数据对i选哪个 target 做了绑定。这样当 `p.delete` 语句执行时，delete 函数的 this 总是指向原始数据对象而非代理对象，于是代码可以正确执行。

```js
const isPlainSet = (obj) => Object.prototype.toString.call(obj) === '[object Set]';
const isPlainMap = (obj) => Object.prototype.toString.call(obj) === '[object Map]';

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      // 针对 Set，Map 特殊处理
      if (isPlainMap(obj) || isPlainSet(obj)) {
        if (key === 'size') {
          return Reflect.get(target, key, target);
        }
        return target[key].bind(target);
      }

      if (key === 'raw') {
        return target;
      }

      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key);
      }
      
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    }
  });
}
```

这样，我们就饿可以很简单地创建代理数据。

```js
const p = reactive(new Set([1, 2, 3]));

console.log(p.size);
p.delete(1);
console.log(p.size);
```

#### 建立响应关系

了解如何为 Set 和 Map 类型数据创建代理后，我们就可以着手实现 Set 类型数据的响应式方案了了。

```js
const p = reactive(new Set([1, 2, 3]));

effect(() => {
  console.log(p.size);
});

p.add(1);
```

首先，在副作用函数内访问了 `p.size` 属性；接着，调用 `p.add` 函数想集合中添加数据。由于这个行为会间接改变集合中的 size 属性值，我们我们期望副作用函数会重新执行。我们需要在访问 size 属性时调用 track 函数进行依赖追踪，然后在 add 方法执行时调用 trigger 函数触发响应。

```js
const isPlainSet = (obj) => Object.prototype.toString.call(obj) === '[object Set]';
const isPlainMap = (obj) => Object.prototype.toString.call(obj) === '[object Map]';

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      // 针对 Set，Map 特殊处理
      if (isPlainMap(obj) || isPlainSet(obj)) {
        if (key === 'size') {
          // 调用 track 函数建立响应关系
          track(target, ITERATE_KEY);
          return Reflect.get(target, key, target);
        }
        return target[key].bind(target);
      }
			
      // ...

      return res;
    }
  });
}
```

当读取 size 属性是，只需要调用 track 函数建立响应关系即可。这里需要注意，响应联系需要建立在 `ITERATE_KEY` 与副作用函数之间，这是因为任何新增、删除操作都会影响 size 属性。接下来，我们来看如何触发响应。当调用 add 方法向集中添加新元素时，应该怎么触发响应呢？我们需要实现一个自定义 add 方法。

```js
const mutableInstrumentations = {};

const mutableInstrumentations = {
  add () {}
};

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      // Set,Map 特殊处理
      if (isPlainMap(obj) || isPlainSet(obj)) {
        if (key === 'size') {
          // 调用 track 函数建立响应关系
          track(target, ITERATE_KEY);
          return Reflect.get(target, key, target);
        }
        
        // return target[key].bind(target);
        // 返回定义在 mutableInstrumentations 对象下的方法
        return mutableInstrumentations[key];
      }

      // 如果操作的目标对象是数组，并且 key 存在于 arrayInstrumentations 上
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key);
      }
      
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    }
  });
}
```

首先，定义一个对象 `mutableInstrumentations` , 我们会将所有自定义实现的方法都定义到该对象下。例如 `mutableInstrumentations.add` 方法，然后，在 get 拦截函数内返回定义在 `mutableInstrumentations` 对象中的方法。这样，当通过 `p.add` 获取方法时，得到的就是我们自定义的 `mutableInstrumentations.add` 方法。

```js
const mutableInstrumentations = {
  add (key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw;
    // 通过原始对象对象执行 add 方法删除具体的值
    // 这里不再徐亚 .bind 了，因为是直接通过 target 调用并执行的
    const res = target.add(key);
    // 调用 trigger 函数触发响应，并指定操作类型为 ADD
    trigger(target, key, TRIGGER_TYPE.ADD);
    // 返回操作结果
    return res;
  }
};
```

自定义的 add 函数内 this 仍然指向代理对象，所以需要通过 `this.raw` 获取获取数据对象。有了原始数据对象后，就可以通过它调用 `target.add` 方法，这样就不再需要 `.bind` 绑定了。代添加操作完成后，调用 trigger 函数触发响应。需要注意的时，我们指定了操作类型为 ADD，这一点很重要。

```js
function trigger (target, key, type, newVal) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

	// ...

  // 操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数执行
  if (type === TRIGGER_TYPE.ADD || type === TRIGGER_TYPE.DELETE) {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);

    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
		
  // ...
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

当操作类型是 `ADD` 或 `DELETE` ，会取出与 `ITERATE_KEY` 相关联的副作用函数并执行，这样就可以通过访问 size 属性所收集的副作用函数来执行了。

当然，如果调用 add 方法添加的元素已经存在于 set 集合中，就不再需要触发响应，这样做对性能更加友好。

```js
const mutableInstrumentations = {
  add (key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw;
    // 先判断值是否已经存在
    const hadKey = target.has(key);
    // 只有再值不存在情况下，才需要触发响应
    if (!hadKey) {
      // 通过原始对象对象执行 add 方法删除具体的值
      // 这里不再徐亚 .bind 了，因为是直接通过 target 调用并执行的
      const res = target.add(key);
      // 调用 trigger 函数触发响应，并指定操作类型为 ADD
      trigger(target, key, TRIGGER_TYPE.ADD);
      // 返回操作结果
      return res;
    }
    return target;
  }
};
```

这段代码中，我们先调用 `target.has` 方法判断值是否已经存在，只有在值不存在的情况下才需要触发响应。

在此基础上，我们可以按照类似的思路轻松地实现 delete 方法。

```js

const mutableInstrumentations = {
  add (key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw;
    // 先判断值是否已经存在
    const hadKey = target.has(key);
    // 只有再值不存在情况下，才需要触发响应
    if (!hadKey) {
      // 通过原始对象对象执行 add 方法删除具体的值
      // 这里不再徐亚 .bind 了，因为是直接通过 target 调用并执行的
      const res = target.add(key);
      // 调用 trigger 函数触发响应，并指定操作类型为 ADD
      trigger(target, key, TRIGGER_TYPE.ADD);
      // 返回操作结果
      return res;
    }
    return target;
  },
  delete (key) {
    const target = this.raw;
    const hadKey = target.has(key);
    const res = target.delete(key);
    if (hadKey) {
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }
    return res;
  }
};
```

```js
const p = reactive(new Set([1, 2, 3]));

effect(() => {
  console.log(p.size, p);
});

p.add(1); 
p.add(4); // 4 Set(4) { 1, 2, 3, 4 }
p.delete(5);
p.delete(2); // 3 Set(3) { 1, 3, 4 }
```

如上面的代码所示，与 add 方法的区别在于，delete 方法只有在要删除的元素确实在集合中存在时，才需要触发响应，这一点恰好与 add 方法相反。

#### 避免污染原始数据

这一节中，我们借助 Map 类型数据的 set 和 get 来讲解什么是 “避免污染原始数据” 及其原因。

Map 数据类型拥有 get 和 set 这两个方法，当调用 get 方法读取数据时，需要调用 track 函数追踪依赖建立响应关系；当调用 set 方法设置数据时，需要调用 trigger 方法触发响应。

```js
const p = reactive(new Map([['key', 1]]));

effect(() => {
  console.log(p.get('key'));
});

p.set('key', 2);
```

其实想要实现上面这段代码所展示的功能并不难，因为我们已经有了实现 add、delete 等方法的经验。

```js
const mutableInstrumentations = {
	// ...
  get (key) {
    // 获取原始对象
    const target = this.raw;
    // 判断读取的 key 是否存在
    const hadKey = target.has(key);
    // 追踪依赖，建立响应联系
    track(target, key);
    // 如果存在，则返回结果。如果得到的结果 res 仍然是可代理的数据，则要返回使用 reactive 包装后的响应式数据
    if (hadKey) {
      const res = target.get(key);
      return isPlainObject(res) ? reactive(res) : res;
    }
  }
};
```

在非浅响应的情况下，如果得到的数据仍然可以被代理，那么要调用 `reactive(res)` 将数据转换成响应式数据后返回。在浅响应模式下，就不需要这一步了。我们可以在 `crateReactive` get 函数中定义 `this.isShallow` 属性，在 `mutableInstrumentations` 中获取 `isShallow` 属性进行判断。

接着，我们来讨论 set 方法的实现。简单来说，当 set 方法被调用后，需要调用 trigger 方法触发响应。只不过在触发响应的时候，需要区分操作的类型时 SET 还是 ADD。

```js
const mutableInstrumentations = {
  add (key) {
    // this 仍然指向的是代理对象，通过 raw 属性获取原始数据对象
    const target = this.raw;
    // 先判断值是否已经存在
    const hadKey = target.has(key);
    // 只有再值不存在情况下，才需要触发响应
    if (!hadKey) {
      // 通过原始对象对象执行 add 方法删除具体的值
      // 这里不再徐亚 .bind 了，因为是直接通过 target 调用并执行的
      const res = target.add(key);
      // 调用 trigger 函数触发响应，并指定操作类型为 ADD
      trigger(target, key, TRIGGER_TYPE.ADD);
      // 返回操作结果
      return res;
    }
    return target;
  },
  delete (key) {
    const target = this.raw;
    const hadKey = target.has(key);
    const res = target.delete(key);
    if (hadKey) {
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }
    return res;
  },
  get (key) {
    // 获取原始对象
    const target = this.raw;
    // 判断读取的 key 是否存在
    const hadKey = target.has(key);
    // 追踪依赖，建立响应联系
    track(target, key);
    // 如果存在，则返回结果。如果得到的结果 res 仍然是可代理的数据，则要返回使用 reactive 包装后的响应式数据
    if (hadKey) {
      const res = target.get(key);
      return isPlainObject(res) ? reactive(res) : res;
    }
  },
  set (key, value) {
    const target = this.raw;
    const hadKey = target.has(key);
    // 获取旧值
    const oldVal = target.get(key);
    // 设置新值
    target.set(key, value);
    // 如果不存在，则说明是 ADD 类型的操作
    if (!hadKey) {
      trigger(target, key, TRIGGER_TYPE.ADD);
    } else if (oldVal !== value && (oldVal === oldVal || value === value)) {
      // 如果存在，并且值变化，则是 SET 操作
      trigger(target, key, TRIGGER_TYPE.SET);
    }
  }
};
```

这段代码的关键点在于，我们需要判断设置的 key 是否存在，以便区分不同的操作类型。我们知道，对于 SET 类型和 ADD 类型的操作来说，它们最终触发的副作用函数是不同的。因为 ADD 类型的操作会对数据的 size 属性产生影响，所以依赖 size 属性的副作用函数都需要在 ADD 类型的操作发生时重新执行。

上面给出的 set 函数实现可以正常工作，但它仍然存在问题，set 方法会污染原始数据。

```js
const m = new Map();

const p1 = reactive(m);
const p2 = reactive(new Map());

p1.set('p2', p2);

effect(() => {
  console.log(m.get('p2').size, m.get('p2'));
});

m.get('p2').set('foo', 1);
```

这段代码中我们创建了一个原始 Map 对象 m，`p1` 是对象 m 的代理对象，接着创建另外一个代理对象 `p2`，并将其作为值设置给 `p1`，即 `p1.set('p2', p2)`。接下来问题出现了，在副作用函数中，我们通过原始数据 m 来读取数据值，然后又通过原始数据 m 来设置数据值，此时发现副作用函数重新执行了。这其实并不符合我们的预期，因为原始数据不应该具有响应式数据据的能力，否则就意味着用户既可以操作原始数据，又能够操作响应式数据，这样一来代码就乱套了。

导致问题出现的原因就是我们实现的 set 方法。

```js
const mutableInstrumentations = {
	// ...
  set (key, value) {
    const target = this.raw;
    const hadKey = target.has(key);
    // 获取旧值
    const oldVal = target.get(key);
    // 设置新值
    target.set(key, value);
    // 如果不存在，则说明是 ADD 类型的操作
    if (!hadKey) {
      trigger(target, key, TRIGGER_TYPE.ADD);
    } else if (oldVal !== value && (oldVal === oldVal || value === value)) {
      // 如果存在，并且值变化，则是 SET 操作
      trigger(target, key, TRIGGER_TYPE.SET);
    }
  }
};
```

在 set 方法内，我们把 value 设置到了原始数据 target 上。如果 value 是响应式数据，就意味着设置到原始对象上的也是响应式数据，我们把响应式数据设置到原始数据上的行为称为**数据污染**。

要解决数据污染也不难，只需要在调用 `target.set` 函数设置值之前对值进行检查即可：只要发现即将要设置的值是响应式数据，那么就通过 raw 属性获取原始数据，再把原始数据设置到 target 上。

```js
const mutableInstrumentations = {
	// ...
  set (key, value) {
    const target = this.raw;
    const hadKey = target.has(key);

    // 获取旧值
    const oldVal = target.get(key);
    // 获取原始数据据，由于 value 本身可能已经是原始数据，所以此时 value.raw 不存在，则直接使用 value
    const rawValue = value.raw || value;
    // 设置新值
    target.set(key, rawValue);

    // 如果不存在，则说明是 ADD 类型的操作
    if (!hadKey) {
      trigger(target, key, TRIGGER_TYPE.ADD);
    } else if (oldVal !== value && (oldVal === oldVal || value === value)) {
      // 如果存在，并且值变化，则是 SET 操作
      trigger(target, key, TRIGGER_TYPE.SET);
    }
  }
};
```

现在的实现已经不会造成数据污染了。不过，观察上面的代码，会发现新的问题。我们一直使用 raw 属性来访问原始数据是由缺陷的，因为它可能与用户自定义的 raw 属性冲突，错译在一个严谨的实现中，我们需要使用唯一的标识来作为原始数据的键，例如使用 Symbol 类型来代替。

除了 set 方法需要避免污染原始数据之外，Set 类型的 add 方法、普通对象的写值操作，还有为数组添加元素的方法等，都需要做类似的处理。

#### 处理 forEach

集合类型的 forEach 方法类似于数组的 forEach 方法。

```js
const m = new Map([
  [{ key: 1 }, { value: 1 }]
]);

effect(() => {
  m.forEach((value, key, m) => {
    console.log(value); // { value: 1 }
    console.log(key); // key: 1 }
  })
});
```

以 Map 为例，forEach 方法接收一个回调函数作为参数，该回调函数会在 Map 的每个键值对上被调用。回调函数接收三个参数，分别是值、键以及原始对象。

遍历操作与键值对的数量有关，因此会修改 Map 对象键值对数量的操作都应该触发副作用函数重新执行，例如 delete 和 add 方法等。所以当 forEach 函数被停用时，我们应该让副作用函数与 `ITERATE_KEY` 建立响应联系。

```js
const mutableInstrumentations = {
	// ...
  forEach (callback) {
    // 取得原始数据对象
    const target = this.raw;
    // 与 ITERATE_KEY 建立响应关系
    track(target, ITERATE_KEY);
    // 通过原始数据对象调用 forEach 方法，并把 callback 传递过去
    target.forEach(callback);
  }
};
```

```js
const m = reactive(new Map([
  [{ key: 1 }, { value: 1 }]
]));

effect(() => {
  m.forEach((value, key, m) => {
    console.log(value);
    console.log(key);
  })
});

m.set({ key: 2 }, { value: 2 });
```

上述代码可以按照预期工作，但是给出的 forEach 函数仍然存在缺陷，我们在自定义实现的 forEach 方法内，通过原始数据对象调用了原生的 forEach 方法。

```js
// 通过原始数据对象调用 forEach 方法，并把 callback 传递过去
target.forEach(callback);
```

这意味着，传递给 callback 回调函数的参数都是非响应式数据。

```js
const key = { key: 1 };
const value = new Set([1, 2, 3]);
const p = reactive(new Map([
  [key, value]
]));

effect(() => {
  p.forEach((value, key) => {
    console.log(value.size);
  })
});

p.get(key).delete(1);
```

在上面这段代码中，响应式数据 p 有一个键值对，其中键是普通对象 `{ key: 1 }`，值是 Set 类型的原始数据 `new Set([1, 2, 3])` 。接着，我们在副作用函数中使用 forEach 方法遍历 p，并在回调函数中访问 `value.size `。最后，我们尝试删除 Set 类型数据中为 1 的元素，会发现不能触发副作用函数执行。导致问题的原因就是上面提到的，当通过 `value.size` 访问 `size` 属性时，这里的 value 是原始数据对象，即 `new Set([1, 2, 3])` ，而非响应式数据对象，因此无法建立响应联系。但这其实并不符合我们的直觉，因为 `reactive` 本身是深响应，`forEach` 方法的回调函数所接收到的参数也应该是响应式数据才对。为了解决这个问题，我们需要修改一下实现。

```js
const mutableInstrumentations = {
	// ...
  forEach (callback) {
    // wrap 函数用来把可代理的值转换为响应式数据
    const wrap = (val) => typeof val === 'object' ? reactive(val) : val;
    // 取得原始数据对象
    const target = this.raw;
    // 与 ITERATE_KEY 建立响应关系
    track(target, ITERATE_KEY);
    // 通过原始数据对象调用 forEach 方法，并把 callback 传递过去
    target.forEach((v, k) => {
      // 手动调用 callback，用 wrap 函数包裹 vlaue 和 key 再传给 callback，这样就实现了深响应
      callback(wrap(v), wrap(k), this);
    });
  }
};
```

思路很简单，既然 callback 函数的参数不是响应式的，那就将它转换成响应式的。所以在上面的代码中，我们又对 callback 函数的参数做了一层包装，即把传递给 callback 函数的参数包装成响应式的。此时，如果再次尝试运行前文的例子，会发现它能够按预期工作。

出于严谨性，我们还需要做一些补充。因为 forEach 函数除了接收 callback 作为参数，还可以接收第二个参数，该参数可以用来指定 callback 函数执行时的 this 值。

```js
const mutableInstrumentations = {
	// ...
  forEach (callback, thisArg) {
    // wrap 函数用来把可代理的值转换为响应式数据
    const wrap = (val) => typeof val === 'object' ? reactive(val) : val;
    // 取得原始数据对象
    const target = this.raw;
    // 与 ITERATE_KEY 建立响应关系
    track(target, ITERATE_KEY);
    // 通过原始数据对象调用 forEach 方法，并把 callback 传递过去
    target.forEach((v, k) => {
      // 手动调用 callback，用 wrap 函数包裹 vlaue 和 key 再传给 callback，这样就实现了深响应
      callback.call(thisArg, wrap(v), wrap(k), this);
    });
  }
};
```

解决上述问题之后，我们的工作还没有完成。无论是使用 `for...in` 循环遍历一个对象，还是使用 `forEach` 循环遍历一个集合，它们的响应联系都是建立在 `ITERATE_KEY` 与副作用函数之间的。然而，使用 `for...in` 来遍历对象与使用 `forEach` 遍历集合之间存在本质的不同。具体体现在，当使用 `for...in` 循环遍历对象时，它只关心对象的键，而不关心对象的值。

```js
effect(() => {
  for (const key in obj) {
    console.log(key);
  }
});
```

只有当新增、删除对象的 key 时，才需要重新执行副作用函数。所以我们在 trigger 函数内判断操作类型是否是 `ADD` 或 `DELETE` ，进而知道是否需要触发那些与 `ITERATE_KEY` 相关联的副作用函数重新执行。对于 `SET` 类型的操作来说，因为它不会改变一个对象的键的数量，所以当 `SET` 类型的操作发生时，不需要触发副作用函数重新执行。

但这个规则不适用与 Map 类型的 `forEach` 遍历。

```js
const m = reactive(new Map([
  ['key', 1]
]));

effect(() => {
  m.forEach((value, key) => {
    // forEach 循环不仅关心集合的键，还关心集合的值
    console.log(value);
  })
});

m.set('key', 2);
```

当使用 `forEach` 遍历 `Map` 类型的数据时，它既关心键，又关心值。这意味着，当调用 `p.set('key', 2)` 修改值的时候，也应该触发副作用函数重新执行，即使它的操作类型是 `SET` 。因此，我们应该修改 trigger 函数的代码来弥补这个缺陷。

```js
function track (target, key) {
  // 禁止追踪时，直接返回
  if (!activeEffect || !shouldTrack) return;

  // 使用 target 在 bucket 中获取 depsMap，key -> effects
  let depsMap = bucket.get(target);

  // 如果不存在 depsMap，新建 map 与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
  let deps = depsMap.get(key);

  // 如果 deps 不存在，新建 set 与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  // 将激活的副作用函数添加到 deps 中
  deps.add(activeEffect);

  // 将依赖添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps);
}

function trigger (target, key, type, newVal) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  // 将与 key 相关联的副作用函数添加到 effctesToRun
  effects && effects.forEach(effectFn => {
    // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })
  
  // 操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数执行
  // 如果操作类型是 Set，并且目标对象是 Map 类型的数据，也应该触发那些与 ITERATE_KEY 相关联的函数执行
  if (
    type === TRIGGER_TYPE.ADD ||
    type === TRIGGER_TYPE.DELETE || 
    (type === TRIGGER_TYPE.SET || isPlainMap(target))
  ) {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);

    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
	
  // ...
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

我们增加了一个判断条件：如果操作的目标对象是 Map 类型的，则 SET 类型的操作也应该触发那些与 `ITERATE_KEY` 相关联的副作用函数重新执行。

#### 迭代器方法

接下来，我们讨论关于集合类型的迭代器方法。集合类型有三个迭代器方法：

* entries
* keys
* value

调用这些方法会得到相应的迭代器，并且可以使用 `for...of` 进行循环迭代。

```js
const m = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

for (const [key, value] of m.entries()) {
  console.log(key, value);
}

// key1 value1
// key2 value2
```

我们也可以调用迭代器函数取得迭代器对象后，手动调用迭代器对象的 next 方法获取对应的值：

```js
const itr = m[Symbol.iterator]();
console.log(itr.next()); // { value: [ 'key1', 'value1' ], done: false }
console.log(itr.next()); // { value: [ 'key2', 'value2' ], done: false }
console.log(itr.next()); // { value: undefined, done: true }
```

`m[Symbol.iterator]()` 与 `m.entries` 是等价的：

```js
console.log(m[Symbol.iterator] === m.entries); // true
```

理解了这些内容后，我们就可以尝试实现对迭代器方法的代理。在此之前，不妨多做些尝试，看看会发生什么。

```js
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

effect(() => {
  // TypeError: p is not iterable
  for (const [key, value] of p) {
    console.log(key, value);
  }
});

p.set('key3', 'value3');
```

在这段代码中，我们首先创建一个代理对象 p，接着尝试使用 `for...of` 循环遍历它，会得到一个错误：“p 是不可迭代的”。一个对象能否迭代，取决于该对象是否实现了迭代协议，如果一个对象正确地实现了 `Symbol.iterator` 方法，那么它就是可迭代的。很显然，代理对象 p 没有实现 `Symbol.iterator` 方法，因此我们得到了上面的错误。

实际上，当我们使用 `for...of` 循环迭代一个代理对象时，内部会试图从代理对象 p 上读取 `p[Symbol.iterator]` 属性，这个操作会触发 get 拦截函数，所以我们仍然可以把 `Symbol.iterator` 方法的实现放到 `mutableInstrumentations` 中。

```js
const mutableInstrumentations = {
	// ...
  [Symbol.iterator] () {
    // 获取原始数据对象 target
    const target = this.raw;
    // 获取原始迭代器方法
    const itr = target[Symbol.iterator]();
    // 将其返回
    return itr;
  }
};
```

实现很简单，不过是把原始的迭代器对象返回，这样就能够使用 `for...of` 循环迭代代理对象 p。但是事情不可能这么简单，之前我们在讲解 `forEach` 方法时提到过，传递给 callback 的参数时包装后的响应式数据。

```js
p.forEach((value, key) => {
  // value 和 key 如果可以被代理，那么它们就是代理对象，即响应式数据
});
```

同时，使用 `for...of` 循环迭代集合时，如果迭代产生的值也是可以被代理的，那么也应该将其包装成响应式数据。

```js
for (const [key, value] of p) {
  // 期望 key 和 value 是响应式数据
}
```

因此，我们需要修改代码：

```js
const mutableInstrumentations = {
	// ...
  [Symbol.iterator] () {
    // 获取原始数据对象 target
    const target = this.raw;
    // 获取原始迭代器方法
    const itr = target[Symbol.iterator]();

    const wrap = (val) => isPlainObject(val) ? reactive(val) : val;

    // 返回自定义迭代器
    return {
      next () {
        // 调用原始迭代器的 next 方法获取 value 和 done
        const { value, done } = itr.next();

        return {
          // 如果 value 不是 undefined，对其进行包裹
          value: value ? [wrap(value[0]), wrap(value[1])] : value,
          done
        }
      }
    };
  }
};
```

为了实现对 key 和 value 的包装，我们需要自定义实现的迭代器，在其中调用原始迭代器获取值 value 以及代表是否结束的 done。如果值 value 不为 undefined，则对其进行包装，最后返回包装后的代理对象，这样当使用 `for...of` 循环迭代时，得到的值就会是响应式数据了。

最后，为了追踪 `for...of` 对数据的迭代操作，我们还需要调用 track 函数，让副作用与 `ITERATE_KEY` 建立联系。

```js
const isPlainObject = (data) => typeof data === 'object' && data !== null;

const mutableInstrumentations = {
	// ...
  [Symbol.iterator] () {
    // 获取原始数据对象 target
    const target = this.raw;
    // 获取原始迭代器方法
    const itr = target[Symbol.iterator]();

    const wrap = (val) => isPlainObject(val) ? reactive(val) : val;
    
    // 调用 track 函数建立响应联系
    track(target, ITERATE_KEY);

    // 返回自定义迭代器
    return {
      next () {
        // 调用原始迭代器的 next 方法获取 value 和 done
        const { value, done } = itr.next();

        return {
          // 如果 value 不是 undefined，对其进行包裹
          value: value ? [wrap(value[0]), wrap(value[1])] : value,
          done
        }
      }
    };
  }
};
```

由于迭代操作与集合中中元素的数量有关，所以只要集合的 size 发生变化，就应该触发迭代操作重新执行。因此，我们在调用 track 函数时让 `ITERATE_KEY`  与副作用函数建立联系。完成这一步后，集合的响应式数据功能就相对完整了。

```js
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

effect(() => {
  // TypeError: p is not iterable
  for (const [key, value] of p) {
    console.log(key, value);
  }
});

p.set('key3', 'value3'); // 能够触发响应
```

由于 `p.entries` 与 `p[Symbol.iterator]` 等价，所以我们可以使用同样的代码来实现对 `p.entries` 函数的拦截。

```js
const mutableInstrumentations = {
	// ...
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod
};

// 抽离为独立的函数，便于复用
function iterationMethod () {
  // 获取原始数据对象 target
  const target = this.raw;
    // 获取原始迭代器方法
  const itr = target[Symbol.iterator]();

  const wrap = (val) => isPlainObject(val) ? reactive(val) : val;

  // 调用 track 函数建立响应联系
  track(target, ITERATE_KEY);

  // 返回自定义迭代器
  return {
    next () {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next();

      return {
        // 如果 value 不是 undefined，对其进行包裹
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done
      }
    }
  };
}
```

但当你尝试运行代码使用 `for...of` 进行迭代时，会得到一个错误。

```js
// TypeError: p.entries is not a function or its return value is not iterable
for (const [key, value] of p.entries()) {
  console.log(key, value);
}
```

错误的大意是 `p.entries` 的返回值不是一个可迭代对象。很显然，`p.entries` 函数的返回值是一个对象，该对象带有 next 方法，但不具有 `Symbol.iterator` 方法，因此它确实不是一个可迭代对象。这也是经常出错的地方，可迭代协议与迭代器协议并不一致。可迭代协议指的是一个对象实现了 `Symbol.iterator` 方法，而迭代器协议指的是一个对象实现了 `next` 方法，单一个对象可以同时实现可迭代协议和迭代器协议。

```js
const obj = {
  // 迭代器协议
  next () {},
  // 可迭代协议
  [Symbol.iterator] () {
    return this;
  }
}
```

所以我们可以这样修改代码。

```js

// 抽离为独立的函数，便于复用
function iterationMethod () {
  // 获取原始数据对象 target
  const target = this.raw;
    // 获取原始迭代器方法
  const itr = target[Symbol.iterator]();

  const wrap = (val) => isPlainObject(val) ? reactive(val) : val;

  // 调用 track 函数建立响应联系
  track(target, ITERATE_KEY);

  // 返回自定义迭代器
  return {
    next () {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next();

      return {
        // 如果 value 不是 undefined，对其进行包裹
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done
      }
    },
    [Symbol.iterator] () {
      return this;
    }
  };
}
```

现在一切就可以正常工作了。

#### values 和 keys 方法

values 方法的实现与 entries 方法类似，不同的是，当使用 `for...of` 迭代 values 时，得到的仅仅是 Map 数据的值，而非键值对。

```js
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

for (const value of p.values()) {
  console.log(value);
}
```

values 方法的实现如下：

```js
const mutableInstrumentations = {
	// ...
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod,
  values: valuesIterationMethod
};

function valuesIterationMethod () {
  // 获取原始数据对象 target
  const target = this.raw;
  // 通过 target.values 获取原始迭代器方法
  const itr = target.values();

  const wrap = (val) => isPlainObject(val) ? reactive(val) : val;

  // 调用 track 函数建立响应联系
  track(target, ITERATE_KEY);

  // 返回自定义迭代器
  return {
    next () {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next();

      return {
        // value 是值，而非键值对，所以只需要包裹 value 即可
        value: wrap(value),
        done
      }
    },
    [Symbol.iterator] () {
      return this;
    }
  };
}
```

其中，`valuesIterationMethod` 和 `iterationMethod` 这两个方法有两点区别：

* `iterationMethod` 通过 `target[Symbol.iterator]` 获取迭代器对象，而 `valuesIterationMethod` 通过 `target.values` 获取迭代器对象；
* `iterationMethod` 处理的是键值对，即 `[wrap(value[0]), wrap(value[1])]`， 而 `valuesIterationMethod` 只处理值，即 `wrap(value)`；

由于它们的大部分逻辑相同，所以我们还可以将它们封装到一个可复用的函数中。

keys 方法与 values 方法非常类似，不同点在于，前者处理的是键而非值。因此，我们需要修改 `valuesIterationMethod` 方法中的一行代码，即可实现对 keys 方法的代理。

```js
const itr = target.values();

// => 

const itr = target.keys();
```

```js
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

for (const value of p.keys()) {
  console.log(value);
}
```

这么做确实可以得到目的，但如果运行如下代码用例，就会发现存在缺陷。

```js
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

effect(() => {
  for (const value of p.keys()) {
    console.log(value);
  }
});

p.set('key2', 'value3');
```

在这段代码中，我们使用 `for...of` 循环来遍历 `p.keys`，然后调用 `p.set('key2', 'value3')` 修改键为 `key2` 的值。在这个过程中，Map 类型数据的所有键都没有发生变化，仍然是 `key1`  和 `key2`，所以在理想情况下，副作用函数不应该执行。但是如果你运行上例，会发现副作用函数仍然重新执行。

这时因为，我们对 Map 类型的数据进行了特殊处理。即使操作类型为 `SET` ，也会触发那些与 `ITERATE_KEY` 相关联的副作用函数执行。

```js
function trigger (target, key, type, newVal) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

	// ...

  // 操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数执行
  // 如果操作类型是 Set，并且目标对象是 Map 类型的数据，也应该触发那些与 ITERATE_KEY 相关联的函数执行
  if (
    type === TRIGGER_TYPE.ADD ||
    type === TRIGGER_TYPE.DELETE || 
    (type === TRIGGER_TYPE.SET || isPlainMap(target))
  ) {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);

    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
	
  // ...
}
```

这对于 values 或 entries 等方法来说是必需的，但对于 keys 方法来说则没有必要，因为 keys 方法只关心 Map 类型数据的键的变化，不需要关心值的变化。

解决方法很简单，代码如下：

```js
const MAP_KEY_ITERATE_KEY = Symbol();

function keysIterationMethod () {
  // 获取原始数据对象 target
  const target = this.raw;
  // 通过 target.keys 获取原始迭代器方法
  const itr = target.keys();

  const wrap = (val) => isPlainObject(val) ? reactive(val) : val;

  // 调用 track 函数建立响应联系，在副作用函数与 MAP_KEY_ITERATE_KEY 之间建立响应联系
  track(target, MAP_KEY_ITERATE_KEY);

  // 返回自定义迭代器
  return {
    next () {
      // 调用原始迭代器的 next 方法获取 value 和 done
      const { value, done } = itr.next();

      return {
        // value 是值，而非键值对，所以只需要包裹 value 即可
        value: wrap(value),
        done
      }
    },
    [Symbol.iterator] () {
      return this;
    }
  };
}
```

当调用 track 函数追踪依赖时，我们使用 `MAP_KEY_ITERATE_KEY` 代替 `ITERATE_KEY`。其中 `MAP_KEY_ITERATE_KEY` 与 `ITERATE_KEY` 类似，是一个新的 Symbol 类型，用来作为抽象的键。这样就实现了依赖收集的分析，即 values 和 entries 等方法依然依赖于 `ITERATE_KEY`，而 keys 方法依赖 `MAP_KEY_ITERATE_KEY` 。当 set 类型的操作只会触发与 `ITERATE_KEY` 相关联的副作用函数重新执行时，不会触发 `MAP_KEY_ITERATE_KEY` 相关联的副作用函数。但是当 ADD 和 DELETE 类型的操作发生时，除了触发与 `ITERATE_KEY` 相关联的副作用函数执行，还需要触发与 `MAP_KEY_ITERATE_KEY` 相关联的副作用函数重新执行，因此我们需要修改 `trigger` 函数的代码。

```js
function trigger (target, key, type, newVal) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

	// ...

  // 操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数执行
  // 如果操作类型是 Set，并且目标对象是 Map 类型的数据，也应该触发那些与 ITERATE_KEY 相关联的函数执行
  if (
    type === TRIGGER_TYPE.ADD ||
    type === TRIGGER_TYPE.DELETE || 
    (type === TRIGGER_TYPE.SET || isPlainMap(target))
  ) {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);

    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
  // 操作类型为 ADD 或 DELETE 时，需要触发与 MAP_KEY_ITERATE_KEY 相关联的副作用函数执行
  if (
    (type === TRIGGER_TYPE.ADD || type === TRIGGER_TYPE.DELETE) && isPlainMap(target)
  ) {
     // 获取与 ITERATE_KEY 相关联的副作用函数
     const iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);

     // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
     iterateEffects && iterateEffects.forEach(effectFn => {
       if (effectFn !== activeEffect) {
         effectsToRun.add(effectFn);
       }
     });
  }
	
  // ...
}
```

这样就可以避免不必要的更新了。

```js
const p = reactive(new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]));

effect(() => {
  for (const value of p.keys()) {
    console.log(value);
  }
});

p.set('key2', 'value3'); // 不会触发响应
p.set('key3', 'value3'); // 能够触发响应
```

#### 总结

本章中，我们首先介绍了 Proxy 与 Reflect。Vue.js 3 的响应式数据是基于 Proxy 实现的，Proxy 可以为其他对象创建一个代理对象。所谓代理，指的是对一个对象的基本语义的代理。它允许我们拦截并重新定义对一个对象的基本操作。在实现代理的过程中，我们遇到了访问器属性的 this 指向问题，这需要使用 `Refelct.*` 方法并指定正确的 receiver 来解决。

我们详细讨论了 JavaScript 中对象的概念，以及 Proxy 的工作原理。在 ECMAScript 规范中，JavaScript 有两种对象，其中一种叫做常规对象，另一种叫做异质对象。一个对象是函数还是其他对象，是由部署在该对象上的内部方法和内部槽决定的。

我们讨论了关于对象 Object 的代理。代理对象的本质，就是查阅规范并找到可拦截的基本操作的方法。有一些操作并不是基本操作，而是复合操作，这需要我们查询规范了解它们都依赖哪些基本操作，从而通过基本操作的拦截方法间接地处理复合操作。我们还详细分析了添加、 修改、删除属性对 `for...in` 操作的影响，其中添加和删除属性都会影响 `for...in` 循环的执行次数，所以当这些操作发生时，需要触发与对 `ITERATE_KEY` 相关联的副作用函数重新执行。而修改属性值则不影响 `for...in` 循环的执行次数，因此无需处理。我们还讨论了如何合理地触发副作用函数重新执行，包括对 `NaN` 的处理，以及访问原型链上的属性导致的副作用函数重新执行两次的问题。对于 `NaN` ，我们主要注意的时 `NaN === NaN` 用于等于 false。对于原型链属性问题，需要我们查阅规范定位问题的原因。由此可见，想要基于 Proxy 实现一个相对完善的响应系统，免不了去了解 ECMAScript 规范。

我们讨论了深响应和浅响应，以及深只读和浅只读。这里的深和浅指的是对象的层级，浅响应代表仅代理一个对象的第一层属性，即只有对象的第一层属性值是响应的。深响应则恰恰相反，为了实现深响应，我们需要在返回属性值之前，对值做一层包装，将其包装为响应式数据后再返回。

我们讨论了关于数组的代理。数组是一个异质对象，因为数组对象部署的内部方法 `[[DefineOwnProperty]]` 不同于常规对象。通过索引为数组设置新的元素，可能会隐式地改变数组 length 属性的值。对应地，修改数组 length 数组的值，也可能会间接数组中的已有元素。所以在触发响应的时候需要额外注意。我们还讨论了如何拦截 `for...in` 和 `for...of` 对数组的遍历操作。使用 `for...of` 循环遍历数组与遍历普通对象区别不大，唯一需要注意的是，当追踪 `for...in` 操作时，应该使用数组的 length 作为追踪的 key。`for...of` 基于迭代协议工作，数组内建了 `Symbol.iterator` 方法。数组迭代器执行时，会读取数组的 length 属性或数组的索引。因此，我们不需要做额外的处理，就能够实现对 `for...of` 迭代的响应式支持。

我们讨论了数组的查找方法，如 `includes`、`indexOf` 以及 `lastIndexof` 等。对于数组元素的查找，需要注意的一点是，用户既可能使用代理对象进行查找，也可能使用原始对象进行查找。为了支持这两种形式，我们需要重写数组的查找方法。原理很简单，当用户使用这些方法查找元素时，我们可以先去代理对象中查找，如果找不到，再去原始数组中查找。

我们介绍了会隐式修改数组长度的原型方法，即 `push`、`pop`、`shift`、`unshift` 以及 `splice` 等方法。调用这些方法会间接地读取和设置数组的 length 属性，因此，在不同的副作用函数内对同一个数组执行上述方法，会导致多个副作用函数之间循环调用，最终导致调用栈溢出。为了解决这个问题，我们使用一个标记标量 `shouldTrack` 来代表是否允许进行追踪，然后重写了上述这些方法，目的是，当这些方法间接读取 length 属性值时，我们会先将 `shouldTrack`  的值设置为 false，即禁止追踪。这样就可以断开 length 属性与副作用函数之间的响应联系，从而避免循环调用导致的栈溢出。

最后，我们讨论了关于集合类型数据的响应式方案。集合类型指 `Set`，`Map`，`WeakSet`，`WeakMap`。我们讨论了使用 Proxy 为集合类型创建代理对象的一些注意事项。集合类型不同于普通对象，它有特定的数据操作方法。当使用 Proxy 代理集合类型的数据时要格外注意。例如，集合类型的 size 属性是一个访问器属性，当通过代理对象访问 size 属性时，由于代理对象本身并没有部署 `[[SetData]]` 这样的内部槽，所以会发生错误。另外，通过代理对象执行集合类型的操作方法时，要注意这些方法执行时的 this 指向，我们需要在 get 拦截函数内通过 `.bind` 函数为这些方法绑定正确的 this 值。我们还讨论了集合类型响应式数据的实现。需要通过 “重写” 集合方法的方式来实现自定义的能力，当 Set 集合 add 方法执行时，需要调用 trigger 函数触发响应。我们还讨论了关于 “数据污染” 的问题。数据污染指的是不小心将响应式数据添加到原始数组中，它导致用户可以通过原始数据执行响应式相关操作，这不是我们所期望的。为了避免这类问题发生，我们通过响应数据对象的 `raw` 属性来访问对应的原始数据对象，后续操作使用原始数据对象就可以了。我们还讨论了关于集合类型的遍历，即 `forEach` 方法。集合中的 `forEach` 方法与对象的 `for...in` 遍历类似，最大的不同体现在，当使用 `for...in` 遍历对象时，我们只关心对象的键是否变化，而不关心值；但当使用 `forEach` 遍历集合时，我们即关心键的变化，也关心值的的变化。

### 原始值的响应式方案

之前，我们讨论了非原始值的响应式方案，这次我们将讨论原始值的响应式方案。原始值指的是 `Boolean`，`Number`，`BigInt`，`String`，`Symbol` ，`undefined`，`null` 等类型的值。在 JavaScript 中，原始值是按值传递的，而非引用传递。这意味着，如果一个函数接收原始值作为参数，那么形参和实参之间没有引用关系，它们是两个完全独立的值，对形参的修改不会影响实参。另外，JavaScript 中的 Proxy 无法提供对原始值的代理，因此要想将原始值变成响应式数据，就必须对其做一层包裹，也就是我们要介绍的 ref。

#### 引入 ref 的概念

由于 Proxy 的代理目标必须是非原始值，所以我们没有任何手段拦截对原始值的操作，例如：

```js
let str = 'vue';
// 无法拦截对值的修改
str = 'vue3';
```

对于这个问题，我们能够想到的唯一办法是，使用一个非原始值去 “包裹” 原始值，例如使用一个对象包裹原始值。

```js
const { reactive } = require('../vue/reactive');

const wrapper = {
  value: 'vue'
};

// 可以使用 Proxy 代理 wrap，间接实现对原始值的拦截
const name = reactive(wrapper);
// 修改值可以触发响应
name.value = 'vue3';
```

但这样做会导致两个问题：

* 用户为了一个创建响应式的原始值，不得不顺带创建一个包裹对象；
* 包裹对象由用户定义，这意味着不规范。用户可以随意命名，例如 `wrapper.value` ，`wrapper.val` 都是可以的。

为了解决这两个问题，我们可以封装一个函数，将包裹对象的创建工作都封装到该函数中。

```js
const { reactive } = require('./reactive');

function ref (val) {
  // 在 ref 函数内部创建包裹对象
  const wrapper = {
    value: val
  };
  // 将包裹对象变成响应式数据
  return reactive(wrapper);
}
```

我们把创建 wrapper对象的工作封装到 ref 函数内部，然后使用 `reactive` 函数将包裹对象编程响应式数据并返回。这样我们就解决了上述两个问题。

```js
const { effect } = require('../vue/effect');
const { ref } = require('../vue/ref');

const refVal = ref(1);

effect(() => {
  // 在副作用该函数内通过 value 属性读取原始值
  console.log(refVal.value);
});

refVal.value = 2;
```

上面这段代码可以正常工作，但并不完美。接下来我们面临的第一个问题是，如果区分 `refVal` 到底是原始值的包裹对象，还是一个非原始值的响应式数据，如以下代码所示：

```js
const refVal1 = ref(1);
const refVal2 = reactive({ value: 2 });
```

这段代码中的 `refVal1` 和 `refVal2` 从我们的实现来看，并没有任何区别。但是我们有必要区分一个数据到底是不是 ref，因为涉及到后面的自动脱 ref 能力。

想要区分一个数据是否是 ref 很简单。

```js
function ref (val) {
  // 在 ref 函数内部创建包裹对象
  const wrapper = {
    value: val
  };
  // 使用 Object.defineProperty 在 wrapper 对象上定义一个不可枚举属性
  Object.defineProperty(wrapper, '_v_isRef', {
    value: true    
  });
  // 将包裹对象变成响应式数据
  return reactive(wrapper);
}
```

我们使用 `Object.defineProperty` 为包裹对象 `wrapper` 定义了一个不可枚举且不可写的属性 `_v_isRef`，它的值为 true，代表这个对象是一个 `ref`，而非普通对象。这样我们就可以通过检查 `_v_isRef` 属性来判断一个数据是否是 ref 了。

#### 响应丢失问题

ref 除了能够用于原始值的响应式方案之外，还能用来解决响应丢失问题。首先，我们来看什么是响应丢失问题。在编写 Vue.js 组件时，我们通过要把数据暴露在模板中使用，例如：

```js
export default {
	setup () {
    const obj = reactive({ foo: 1, bar: 2 });

    setTimeout(() => {
      obj.foo = 100;
    }, 1000);

    return {
      ...obj
    };
	}
}
```

我们可以在模板中访问 setup 中暴露出的数据：

```vue
<template>
  <p>{{ foo }}/{{ var }} </p>
</template>
```

但是这样做，会导致响应丢失。表现是当我们修改响应式数据的值时，不会触发重新渲染。这是由展开远算符（...）导致的。

```js
return {
  ...obj
};

// =>

return {
  foo: 1,
  bar: 2
};
```

可以发现，这其实就是返回了一个普通对象，它不具有任何响应式能力。把一个普通对象暴露到模板中使用，是不会在渲染函数与响应式数据之间建立响应联系的。所以当我们尝试在一个定时器修改 `obj.foo` 的值时，不会触发重新渲染。我们可以使用另一种方式解决响应丢失问题。

```js
const obj = reactive({ foo: 1, bar: 2 });
const newObj = { ...obj };

effect(() => {
  console.log(newObj.foo);
});

obj.foo = 100; // 不会触发响应
```

如果解决上述问题呢？换句话说，有没有办法能够帮助我们实现：在副作用函数内，即使通过普通对象 `newObj` 来访问属性值，也能建立响应联系？

```js
// obj 是响应式数据
const obj = reactive({ foo: 1, bar: 2 });
// newObject 对象下具有 与 obj 对象同名的属性，并且每个属性值都是一个对象
// 该对象具有一个访问器属性 value，当读取 value 的值时，其实读取的时 obj 对象下响应的属性值
const newObj = {
  foo: {
    get value() {
      return obj.foo;
    }
  },
  bar: {
    get value() {
      return obj.bar;
    }
  }
}

effect(() => {
  console.log(newObj.foo.value);
});

obj.foo = 100;
```

在上面这段代码中，我们修改了 `newObj` 对象的实现方式。可以看到，在现在的 `newObj` 对象下，具有与 obj 对象同名的属性，而且每个属性得值都是一个对象，例如 foo 属性的值是否：

```js
{
  get value () {
    return obj.foo;
  }
}
```

该对象有一个访问器属性 value，当读取 value 的值时，最终读取的是响应式数据 obj 下的同名属性值。也就是说，当在副作用函数内读取 `newObj.foo` 时，等价于间接读取了 `obj.foo` 的值。这样响应式数据自然能够与副作用函数建立响应联系。于是，当我们修改 `obj.foo` 的值时，能够触发副作用函数重新执行。

在 `newObj` 对象中，foo 和 bar 这两个属性值的结构非常像，我们可以把这种结构抽象出来并封装成函数。

```js
function toRef (obj, key) {
  const wrapper = {
    get value () {
      return obj[key];
    }
  }
  return wrapper;
}
```

`toRef` 接收两个参数，第一个参数 obj 是一个响应式数据，第二个参数是 obj 对象的一个键。该函数会返回一个类似于 ref 结构的 wrapper 对象。有了 `toRef` 函数后，我们就可以重新实现 `newObj` 对象了。

```js
const obj = reactive({ foo: 1, bar: 2 });

const newObj = {
  foo: toRef(obj, 'foo'),
  bar: toRef(obj, 'bar')
}

effect(() => {
  console.log(newObj.foo.value);
});

obj.foo = 100;
```

可以看到，代码变得非常简洁。但如果响应式数据 obj 的键非常多，我们还是要花费很大力气做转换。为此我们可以封装 `toRefs` 函数，批量地完成转换。

```js
function toRefs (obj) {
  const ans = {};
  for (const key in obj) {
    ans[key] = toRef(obj, key);
  }
  return ans;
}

const obj = reactive({ foo: 1, bar: 2 });
const newObj = { ...toRefs(obj) };

effect(() => {
  console.log(newObj.foo.value);
});

obj.foo = 100;
```

现在，响应丢失问题就被我们彻底解决了。解决问题的思路是，将响应式数据转换成类似于 ref 结构的数据。为了概念上的统一，我们将通过 `toRef` 或 `toRefs` 转换后得到的结果视为真的 ref 数据，为此我们需要为 `toRef` 增加一段代码。

```js
function toRef (obj, key) {
  const wrapper = {
    get value () {
      return obj[key];
    }
  }

  Object.defineProperty(wrapper, '__v_isRef', {
    value: true    
  });

  return wrapper;
}
```

可以看到，我们使用 `Object.defineProperty` 函数为 `wrapper` 对象定义了 `_v_isRef` 属性。这样，`toRef` 函数的返回值就是真正意义上的 ref 了。ref 的作用不仅仅是实现原始值的响应式方案，还用来解决响应丢失问题。

不过上文实现的 `toRef` 函数还存在缺陷，即通过 `toRef` 函数创建的 ref 是只读的。

```js
const obj = reactive({ foo: 1, bar: 2 });
const refFoo = toRef(obj, 'foo');

refFoo.value = 100;

console.log(refFoo.value); // 1
```

这是因为 `toRef` 返回的 `wrapper` 对象的 value 属性只有 `getter`，没有 `setter` 。为了功能的完整性，我们应该为它加上 `setter` 函数。

```js

function toRef (obj, key) {
  const wrapper = {
    get value () {
      return obj[key];
    },
    set value (val) {
      obj[key] = val;
    }
  }

  Object.defineProperty(wrapper, '__v_isRef', {
    value: true    
  });

  return wrapper;
}
```

```js
const obj = reactive({ foo: 1, bar: 2 });
const refFoo = toRef(obj, 'foo');

refFoo.value = 100;

console.log(refFoo.value); // 100
```

可以看到，当设置 value 属性的值时，最终设置的时响应式数据的同名属性的值，这样就能正确地触发响应了。

#### 自动脱 ref

`toRefs` 函数的确解决了响应丢失问题，但同时也带来了新的问题。由于 `toRefs` 会把响应式数据的第一层属性值的转换为 ref，因此必须通过 value 属性访问值。

```js
const obj = reactive({ foo: 1, bar: 2 });
const newObj = { ...toRefs(obj) };

console.log(newObj.foo.value); // 1
console.log(newObj.bar.value); // 2
```

这其实增加了用户的心智负担，因为通常情况下用户是在模板中访问数据的。

```vue
<p>{{ foo }} / {{ bar }}</p>
```

用户肯定不希望这样编写代码。

```vue
<p>{{ foo.value }} / {{ bar.value }}</p>
```

因此，我们需要自动脱 ref 的能力。所以自动脱 ref，指的是属性的访问行为，即如果读取的属性是一个 ref，则直接将该 ref 对应的 value 属性值返回。

```js
newObj.foo; // 1
```

即使 `newObj.foo` 是一个 ref，也无需通过 `newObj.foo.value` 来访问它的值。要实现此功能，需要使用 `Proxy` 为 `newObj` 创建一个代理对象，通过代理来实现最终目标，这时需要用到 ref 标识，`__v_isRef` 属性。

```js
function proxyRefs (target) {
  return new Proxy(target, {
    get (target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      return value.__v_isRef ? value.value : value;
    }
  })
}

const obj = reactive({ foo: 1, bar: 2 });

const newObj = { ...toRefs(obj) };
console.log(newObj.foo.value); // 1
console.log(newObj.bar.value); // 2

const newObj2 = proxyRefs(newObj);
console.log(newObj2.foo); // 1
console.log(newObj2.bar); // 2
```

我们定义了 `proxyRefs` 函数，该函数接收一个对象作为参数，并返回该对象的代理对象。代理对象的作用是拦截 get 操作，当读取的属性是一个 `ref` 时，则直接返回该 ref 的 value 属性值，这样就实现了自动脱 ref。

我们在编写 vue.js 组件时，组件中的 setup 函数所返回的数据会传递给 `proxyRefs` 函数进行处理。

```js
const myComponent = {
	setup () {
		const count = ref(0);
		// 返回的这个对象会传递给 proxyRefs
		return { count };
	}
}
```

这也是为什么我们可以在模板中直接访问一个 ref 的值，而无需通过 value 属性来访问。

```html
<p>
  {{ count }}
</p>
```

既然读取属性的值有自动脱 ref 的能力，相应地，设置属性的值也应该有自动为 ref 设置值的能力。

```js
newObj.foo = 100;
```

实现此功能很简单，只需要添加对应的 set 拦截函数即可。

```js
function proxyRefs (target) {
  return new Proxy(target, {
    get (target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      return value.__v_isRef ? value.value : value;
    },
    set (target, key, newValue, receiver) {
      const value = target[key];
      if (value.__v_isRef) {
        value.value = newValue;
        return true;
      }
      return Reflect.set(target, key, newValue, receiver);
    }
  })
}
```

```js
const obj = reactive({ foo: 1, bar: 2 });

const newObj = proxyRefs({ ...toRefs(obj) });
console.log(newObj.foo); // 1
console.log(newObj.bar); // 2

newObj.foo = 100;

console.log(obj); // { foo: 100, bar: 2 }
```

我们为 `proxyRefs` 函数返回的代理对象添加了 set 拦截函数。如果设置的属性是一个 ref，则间接设置该 ref 的 value 属性的值即可。

实际上，自动脱 ref 不仅存在于上述场景。在 vue.js 中，reactive 函数也有自动脱 ref 的能力。

```js
// 我们实现的 reactive 不具备自动脱 ref 的功能

const count = ref(0);
const obj = reactive({ count });

console.log(obj.count); // 0
```

可以看到，`obj.count` 应该是一个 ref，但由于自动脱 ref 能力的存在，使得我们无需通过 value 属性即可读取 ref 的值。这么设计旨在减轻用户的心智负担，因为在大部分情况下，用户并不知道一个值是不是 ref。有了自动脱 ref 的能力后，用户在模板中使用响应式数据时，将不再关心哪些是 ref，哪些不是 ref。

#### 总结

ref 本质是一个 “包裹对象”。因为 JavaScript 无法提供对原始值的代理，所以我们需要使用一层对象作为包裹，间接实现原始值的响应式方案。由于 “包裹对象” 本质上与普通对象没有任何区别，因此为了区分 ref 与普通响应式对象，我们还为 “包裹对象” 定义了一个值为 true 的属性，即 `__v_isRef` ，用它作为 ref 的标识。

ref 除了能够用于原始值的响应式方案之外，还能用来解决响应丢失问题。为了解决该问题，我们实现了 `toRef` 以及 `toRefs` 这两个函数。它们本质是对于响应式数据做了一层包装，或者叫做 “访问代理”。

最后，我们讲解了自动脱 ref 的能力。为了减轻用户的心智负担，我们自动对暴露在模板中的响应式数据进行脱 ref 处理。这样，用户在模板中使用响应式数据时，就无须关心一个值是不是 ref 了。

## 三、渲染器

### 渲染器的设计

渲染器是 vue.js 中非常重要的一部分。在 vue.js 中，很多功能依赖渲染器实现，例如 `Transition` 组件、`Teloport` 组件、`Suspense` 组件，以及 `template ref` 和自定义指令等。

渲染器是框架性能的核心，需要合理的架构设计来保证可维护性，不过它的实现思路并不复杂。

#### 渲染器与响应系统的结合

顾名思义，渲染器是用来执行渲染任务的。在浏览器平台上，用它来渲染其中的真实 DOM 元素。渲染器不仅能够渲染真实 DOM 匀速，它还是框架跨平台能力的关键。因此，在设计渲染器的时候一定要考虑好可自定义的能力。

我们暂时将渲染器限定在 DOM 平台。既然渲染器用来渲染真实 DOM 元素，那么严格来说，下面的函数就是一个合格的渲染器。

```js
function renderer (domString, container) {
  container.innerHTML = domString;
}
```

我们可以这样使用它：

```js
renderer('<h1>hello</h1>', document.getElementById('app'));
```

如果页面中存在 id 为 `app` 的 DOM 元素，那么上面的代码就会将 `<h1>hello</h1>` 插入到该 DOM 元素中。

当然，我们不仅可以渲染静态字符串，还可以渲染动态拼接的 HTML 内容。

```js
let count = 1;

renderer(`<h1>${ count }</h1>`, document.getElementById('app'));
```

这样，最终渲染出来的内容将会是 `<h1>1</h1>` 。但是如果上面这段代码中的变量 count 是一个响应式数据，会怎么样？

利用响应系统，我们可以让整个渲染函数过程自动化。

```js
const count = ref(1);

effect(() => {
  renderer(`<h1>${ count.value }</h1>`, document.getElementById('app'));
});

count.value++;
```

这段代码中，我们首先定义了一个响应式数据 count，它是一个 ref，然后在副作用函数内调用 renderer 函数执行渲染。副作用函数执行完毕后，会与响应式数据建立响应联系。当我们修改 `count.value` 的值时，副作用函数会重新执行，完成重新渲染。

这就是相应系统和渲染器之间的关系。我们利用响应系统的能力，自动调用渲染器完成页面的渲染和更新。这个过程与渲染器的具体首先无关，在上面给出的渲染器的实现中，仅仅设置了元素的 `innerHTML` 内容。

我们将使用 `@vue/reactivity` 包提供的响应式 API 进行讲解。`@vue/reactivity` 提供了 `IIFE` 模块格式，因此我们可以直接通过 `<script>` 标签引用到页面中使用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renderer</title>
</head>
<body>

  <div id="app"></div>
  
  <script src="https://unpkg.com/@vue/reactivity@3.2.31/dist/reactivity.global.js"></script>

  <script src="./index01.js"></script>

</body>
</html>
```

它暴露的全局 API 叫做 `VueReactivity`。

```js
const { effect, ref } = VueReactivity;

function renderer (domString, container) {
  container.innerHTML = domString;
}

const count = ref(1);

effect(() => {
  renderer(`<h1>${ count.value }</h1>`, document.getElementById('app'));
});

count.value++;
```

可以看到，我们通过 `VueReactivity` 得到了 `effect` 和 `ref` 这两个 API。

#### 渲染器的基本概念

理解渲染器所涉及的基本概念，有利于理解后续内容。

我们通常使用英文 `renderer` 来表达 “渲染器”。`renderer` 和 `render` 含义并不相同，前者代表渲染器，后者是动词，表示 `渲染`。渲染器的作用是把虚拟 DOM 渲染为特定平台上的真实元素。在浏览器平台上，渲染器会把虚拟 DOM 渲染为真实 DOM 元素。

虚拟 DOM 通常用英文 `virtual DOM` 来表达，可以简写为 `vdom`。虚拟 DOM 和真实 DOM 的结构一样，都是由一个个节点组成的树形结构。所以，我们经常能听到 “虚拟节点” 这样的词，即 `vritual node`，可以简写为 `vnode`。虚拟 DOM 是树型结构，这棵树中的任何一个 `vnode` 节点都可以是一棵子树，因此 `vnode` 和 `vdom` 有时可以替换使用。本篇文章中将统一使用 `vnode`。

浏览器把虚拟 DOM 节点渲染为真实 DOM 节点的过程叫做挂载，通常用英文 `mount` 来表达。例如 `vue.js` 组件中的 `mounted` 钩子就会在挂载完成时触发。这就意味着，在 `mounted` 钩子中可以访问真实 DOM 元素。理解这些名词有助于我们更好地理解框架的 API 设计。

渲染器会把真实 DOM 挂载到哪里呢？其实渲染器并不知道应该把真实 DOM 挂载到哪里。因此，渲染器通常要接收一个挂载点作为参数，用来指定具体的挂载位置。这里的 `挂载点` 其实是一个 DOM 元素，渲染器会把该 DOM 元素作为容器元素，并把内容渲染到其中。我们通常使用英文 `container` 来表达容器。

```js
function createRenderer () {
  function render (vnode, container) {
    // ...
  }
  return render;
}
```

其中 `createRenderer` 函数用来创建一个渲染器。调用 `createRenderer` 函数会得到一个 `render` 函数，该 `render` 函数会以 `container` 为挂载点，将 `vnode` 渲染为真实 DOM 并添加到该挂载点下。

你可能会对这段代码产生疑惑，为什么需要 `createRenderer` 函数？直接定义 `render` 不就好了吗？
渲染器与渲染是不同的。渲染器是更加宽泛的概念，它包含渲染。渲染器不仅可以用来渲染，还可以用来激活已有的 DOM 元素，这个过程通常发生在通过渲染的情况下。例如下面的代码。

```js
function createRenderer () {
  function render (vnode, container) {
    // ...
  }

  function hydrate (vnode, container) {
    // ...
  }

  return {
    render,
    hydrate
  };
}
```

当 `createRenderer` 函数创建渲染器时，渲染器不仅包含 `render` 函数，还包含 `hydrate` 函数。`hydraye` 函数与服务端渲染相关。

渲染器的内容非常广泛，用来把 `vnode` 渲染为真实 `DOM` 的 `render` 函数只是其中一部分。实际上，在 vue.js 3 中，甚至连创建应用的 `createApp` 函数也是渲染器的一部分。

有了渲染器，我们就可以用它来执行渲染任务了。

```js
const renderer = createRenderer();

// 首次渲染
renderer.render(vnode, document.querySelector('#app'));
```

在上面这段代码中，我们首先调用 `createRenderer` 函数创建一个渲染器，接着调用渲染器的 `renderer.render` 函数执行渲染。当首次调用 `renderer.render` 函数时，只需要创建新的 `DOM` 元素即可，这个过程只涉及挂载。

而当多次在同一个 `container` 上调用 `renderer.render` 函数进行渲染时，渲染器除了要执行挂载动作外，还要执行更新动作。

```js
const renderer = createRenderer();

// 首次渲染
renderer.render(oldVnode, document.querySelector('#app'));
// 第二次渲染
renderer.render(newVnode, document.querySelector('#app'));
```

如上面的代码所示，由于首次渲染时已经把 `oldVnode` 渲染到 `container` 内，所以当再次调用 `renderer.render` 函数并尝试渲染 `newVnode` 时，就不能简单地执行挂载动作了。在这种情况下，渲染器会使用 `newVnode` 与上一次渲染的 `oldVnode` 进行比较。试图找到并更新变更点。这个过程叫做 “打补丁”（更新），英文通常用 patch 来表达。实际上，挂载工作本身也可以看作一种特殊的打补丁，它的特殊之处在于旧的 `vnode` 是不存在的。所以我们不必过于纠结 “挂载” 和 “打补丁” 这两个概念。

```js
function createRenderer () {
  function render (vnode, container) {
    if (vnode) {
      // 新 node 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 旧 vnode 存在且新 vnode 不存在，说明是卸载（unmount）操作
        // 只需要将 container 内的 DOM 清空即可
        container.innerHTML = '';
      }
    }
    // 把 vnode 存在到 container._vnode 下，这里就是后续渲染中的旧 vnode
    container._vnode = vnode;
  }

  function hydrate (vnode, container) {
    // ...
  }

  return {
    render,
    hydrate
  };
}
```

上面是 render 函数的基本实现。我们可以配合下面的代码分析其执行流程，从而更改地理解 render 函数的实现思路。假设我们连续三次调用 `renderer.render` 函数来执行渲染。

```js
const renderer = createRenderer();

// 首次渲染
renderer.render(vnode1, document.querySelector('#app'));
// 第二次渲染
renderer.render(vnode2, document.querySelector('#app'));
// 第三次渲染
renderer.render(null, document.querySelector('#app'));
```

* 首次渲染时，渲染器会将 `vnode1` 渲染为真实 DOM。渲染完成后，`vnod1` 会存储到容器元素的 `container._vnode` 属性中，它会在后续渲染中作为旧 `vnode` 使用；
* 第二次渲染时，旧 `vnode` 存在，此时渲染器会把 `vnode2` 作为新 `vnode`，并将新旧 `vnode` 一同传递给 patch 函数打补丁；
* 第三次渲染时，新 `vnode` 的值为 null，即什么都渲染。但此时容器中渲染的是 `vnode2` 所描述的内容，所以渲染器需要清空容器。从上面的代码中可以看出，我们使用 `container.innerHTML = ''` 来清空容器。需要注意的是，这样清空容器是有问题的，我们暂时使用它达到目的。

另外，在上面给出的代码中，我们注意 patch 函数的签名。

```js
patch(container._vnode, vnode, container);
```

patch 函数是整个渲染器的核心入口，它承载了最重要的渲染逻辑，我们会花费大量时间会详细讲解它，这里对它做一些初步的解释。patch 函数至少接收三个参数。

```js
function patch (n1, n2, container) { }
```

* n1：旧 vnode；
* n2：新 vnode；
* container：容器。

首次渲染时，容器元素的 `container._vnode` 属性是不存在的，即 `undefined`。这意味着，在首次渲染时传递给 `patch` 函数的第一个参数 `n1` 也是 `undefiend`。这时，`patch` 函数会执行挂载动作，它会忽略 `n1`，并直接将 `n2` 所描述的内容挂载到容器中。从这一点可以看出，`patch` 函数不仅可以用来打补丁，也可以用来执行挂载。

#### 自定义渲染器

渲染器不仅能够把虚拟 DOM 渲染为浏览器平台上的真实 DOM，还可以渲染到任意目标平台上，这需要我们把渲染器设计为可配置的 “通用” 渲染器。本节我们将以浏览器作为渲染的目标平台，编写一个渲染器，在这个过程中，通过抽象，将浏览器特定的 API 抽离，这样就可以使得渲染器的核心不依赖于浏览器。在此基础上，我们再为那些被抽离的 API 提供可配置的接口，即可实现渲染器的跨平台能力。

我们从渲染一个普通的 `<h1>` 标签开始。

```js
const vnode = {
  type: 'h1',
  children: 'hello'
};
```

观察上面的 `vnode` 对象。我们使用 type 属性来描述一个 `vnode` 的类型，不同类型的 `type` 属性值可以描述多种类型的 `vnode`。当 `type` 属性是字符串类型值时，可以认为它描述的时普通标签，并使用该 type 属性的字符串作为标签的名称。对于这样一个 `vnode`，我们可以使用 `render` 函数渲染它。

```js
const vnode = {
  type: 'h1',
  children: 'hello'
};

// 创建渲染器
const renderer = createRenderer();
// 调用 render 函数渲染该 vnode
renderer.render(vnode, document.querySelector('#app'));
```

```js
function createRenderer () {
  function patch (n1, n2, container) {
    if (!n1) {
      // 如果 n1 不存在，意味着挂载，则调用 mountElement 函数完成挂载
      mountElement(n2, container);
    } else {
      // n1 存在，意外着打补丁 TODO
    }
  }

  function render (vnode, container) {
    if (vnode) {
      // 新 node 存在，将其与旧 vnode 一起传递给 patch 函数，进行打补丁
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // 旧 vnode 存在且新 vnode 不存在，说明是卸载（unmount）操作
        // 只需要将 container 内的 DOM 清空即可
        container.innerHTML = '';
      }
    }
    // 把 vnode 存在到 container._vnode 下，这里就是后续渲染中的旧 vnode
    container._vnode = vnode;
  }


  function hydrate (vnode, container) { }

  return {
    render,
    hydrate
  };
}
```

我们在 `createRenderer` 函数内部定义了 `patch` 函数。第一个参数 `n1` 代表旧 `vnode`，第二个参数 `n2` 代表新 `vnode`。当 `n1` 不存在时，意味着没有旧 `vnode`，此时只需要执行挂载即可。我们使用 `mountElement` 完成挂载。

```js
function mountElement (vnode, container) {
  // 创建 DOM 元素
  const el = document.createElement(vnode.type);
  // 处理子节点，如果子节点是字符串，代表元素具有文本节点
  if (typeof vnode.children === 'string') {
    // 此时只需要设置元素的 textContent 属性即可
    el.textContent = vnode.children;
  }
  // 将元素添加到容器中
  container.appendChild(el);
}
```

首先调用 `document.createElement` 函数，以 `vnode.type` 的值作为标签名称创建新的 `DOM` 元素。接着处理 `vnode.children`，如果它的值是字符串类型，则代表该元素具有文本子节点，这时只需要设置元素的 `textContent` 即可。最后调用 `appendChild` 函数将新创建的 DOM 元素添加到容器元素内。这样，我们就完成了 `vnode` 的挂载。

挂载一个普通元素的工作已经完成。接下来，我们分析这段代码存在的问题。我们的目的是设计一个不依赖于浏览器平台的通用渲染器，但很明显，`mountElement` 函数内调用了大量依赖于浏览器的 API，例如 `document.createElement、el.textContent` 以及 `appendChild` 等。想要设计通用渲染器，第一步要做的就是将这些浏览器特有的 API 抽离。我们可以将这些操作 DOM 的 API 作为配置项，该配置项可以作为 `createRenderer` 函数的参数。

```js
// 创建渲染器
const renderer = createRenderer({
  // 创建元素
  creatElement (tag) {
    return document.creatElement(tag);
  },
  // 设置元素的文本节点
  setElementText (el, text) {
    el.textContent = text;
  },
  // 给指定的 parent 下添加指定元素
  insert (el, parent, anchor = null) {
    parent.insertBefore(el, anchor);
  }
});
```

我们把用于操作 DOM 的 API 封装为一个对象，并把它传递给 `createRenderer` 函数。这样，在 `mountElement` 等函数内就可以通过配置项来获取操作 DOM 的 API 了。

```js
function createRenderer (options) {
  const { createElement, insert, setElementText } = options;

  function mountElement (vnode, container) {
    // 调用 createElement 创建 DOM 元素
    const el = createElement(vnode.type);
    // 处理子节点，如果子节点是字符串，代表元素具有文本节点
    if (typeof vnode.children === 'string') {
      // 调用 setElementText 设置元素的文本节点
      setElementText(el, vnode.children)
    }
    // 调用 insert 函数将元素插入到容器内
    insert(el, container);
  }
	
  // ...

  return {
    render,
    hydrate
  };
}
```

重构后的 `mountElement` 函数在功能上没有任何变化。不同的时，它不再直接依赖于浏览器的特有 API。这意味着，只要传入不同的配置项，就能够完成非浏览器环境下的渲染工作。我们可以实现一个用来打印渲染器操作流程的自定义渲染器。

```js
const vnode = {
  type: 'h1',
  children: 'hello'
};
const container = { type: 'root' };

// 创建渲染器
const renderer = createRenderer({
  createElement (tag) {
    console.log(`创建元素 ${ tag }`);
    return { tag };
  },
  setElementText (el, text) {
    console.log(`设置 ${ JSON.stringify(el) } 的文本内容：${ text }`);
    el.text = text;
  },
  insert (el, parent, anchor = null) {
    console.log(`将 ${ JSON.stringify(el) } 添加到 ${ JSON.stringify(parent) } 下`);
    parent.children = el;
  }
});

renderer.render(vnode, container);

// 创建元素 h1
// 设置 {"tag":"h1"} 的文本内容：hello
// 将 {"tag":"h1","text":"hello"} 添加到 {"type":"root"} 下
```

在调用 `createRenderer` 函数创建 `renderer` 时，传入了不同的配置项。在 `createElement` 内，我们不再调用浏览器的 API，而是仅仅返回一个对象 `{ tag }` ，并将其作为创建出来的 "DOM 元素"。同样，在 `setElementText` 以及 `insert` 函数内，我们也没有调用浏览器相关 `API` ，而是自定义了一些逻辑，并打印信息到控制台。

上面的自定义渲染器不依赖于浏览器特有的 `API` ，所以这段代码不仅可以在浏览器中运行，还可以在 `	Node.js` 中运行。

自定义渲染器并不是 ”黑魔法“ ，它只是通过抽象的手段，让核心代码不再依赖于平台特有的 API ，再通过支持个性化配置的能力来实现跨平台。

#### 总结

我们首先介绍了渲染器与响应系统的关系。利用响应系统的能力，我们可以做到，当响应式数据变化时自动完成页面更新（重新渲染）。同时，这与渲染器的具体内容无关。我们实现了一个极简的渲染器，它只能利用 `innerHTML` 属性将给定的 `HTML` 字符串内容设置到容器中。

我们讨论了与渲染器相关的基本名词和概念。渲染器的作用是把虚拟 DOM 渲染为特定平台上的真实元素，我们用英文 `renderer` 来表达渲染器。虚拟 DOM 通常用英文 `virtual DOM` 来表达，可以简写成 `vdom` 或 `vnode`。浏览器会执行挂载和打补丁操作，对于新的元素，渲染器会将它挂载到容器内；对于新旧 `vnode` 都存在的情况，渲染器则会执行打补丁操作，即对比新旧 `vnode` ，只更新变化的内容。

最后，我们讨论了自定义渲染器的实现。在浏览器平台上，渲染器可以利用 DOM API 完成 DOM 元素的创建、修改和删除。为了让渲染器不直接依赖浏览器平台特有的 API，我们将这些用来创建、修改和删除元素的操作抽象成可配置的对象。用户可以在调用 `createRenderer` 函数创建渲染器的时候指定自定义的配置对象，从而实现自定义的行为。我们实现了一个用来打印渲染操作流程的自定义渲染器，它不仅可以在浏览器中运行，还可以在 `Node.js` 中运行。

### 挂载与更新

之前我们介绍过渲染器的基本概念和整体架构。接下来，我们将讲解渲染器的核心功能：挂载与更新。

#### 挂载子节点与元素属性

当 `vnode.children` 的值是字符串类型时，会把它设置为元素的文本内容。一个元素除了具有文本节点外，还可以包含其他元素子节点，并且子节点可以是很多个。没了描述元素的子节点，我们需要将 `vnode.children` 定义为数组。

```js
const vnode = {
  type: 'div',
  children: [
    {
      type: 'p',
      children: 'hello'
    }
  ]
}
```

上面这段代码描述的是 “一个 div 标签具有一个子节点，且子节点是 p 标签”。可以看到，`vnode.children` 是一个数组，它的每一个元素都是独立的虚拟节点对象。这样就形成了树形结构，即虚拟 DOM 树。

为了完成子节点的渲染，我们需要修改 `mouneElement` 函数。

```diff
function mountElement (vnode, container) {
  const el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
- }
+ } else if (Array.isArray(vnode.children)) {
+   vnode.children.forEach(child => patch(null, child, el))
+ }

  insert(el, container);
}
```

在上面这段代码中，我们增加了新的判断分支。使用 `Array.isArray` 函数判断 `vnode.children` 是否始数组，如果是数字，则循环遍历它，并调用 patch 函数挂载组件中的虚拟节点。在挂载子节点时，需要注意以下两点。

* 传递给 patch 函数的第一个参数是 null。因为是挂载阶段，没有旧 vnode，所以只需要传递 null 即可。这样，当 patch 函数执行时，就会递归地调用 `mountElement` 函数完成挂载。
* 传递给 patch 函数的第三个参数是挂载点。由于我们正在挂载的子元素是 div 标签的子节点，所以需要把刚刚创建的 div 元素作为挂载点，这样才能保证这些子节点挂载到正确位置。

完成子节点的挂载后，我们再来看看如何用 vnode 描述一个标签的属性，以及如何渲染这些属性。我们知道，HTML 标签有很多属性，其中有些属性是通用的，例如 id、class 等，而有些属性是特定元素才有的，例如 form 元素的 action 属性。实际上，渲染一个元素的属性比想象中更复杂，不过我们仍然秉承一切从简的原则，先来看下最基本的属性处理。

为了描述元素的属性，我们需要未虚拟 DOM 定义新的 `vnode.props` 字段：

```js
const vnode = {
  type: 'div',
  props: {
    id: 
  },
  children: [
    {
      type: 'p',
      children: 'hello'
    }
  ]
}
```

`vnode.props` 是一个对象，它的键代表元素的属性名称，它的值代表对应属性的值。这样，我们就可以通过遍历 `props` 对象的方式，把这些属性渲染到对应的元素上：

```diff
function mountElement (vnode, container) {
  const el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el))
  }

+  if (vnode.props) {
+    for (const key in vnode.props) {
+      el.setAttribute(key, vnode.props[key]);
+    }
+  }

  insert(el, container);
}
```

这段代码中，我们首先检查了 `vnode.props` 字段是否存在，如果存在则遍历它，并调用 `setAttribute` 函数将属性设置到元素上。实际上，除了使用 `setAttribute` 函数为元素设置属性外，还可以通过 DOM 对象直接设置。

```diff
function mountElement (vnode, container) {
  const el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el))
  }

  if (vnode.props) {
    for (const key in vnode.props) {
-     el.setAttribute(key, vnode.props[key]);
+     el[key] = vnode.props[key];
    }
  }

  insert(el, container);
}
```

在这段代码中，我们没有选择使用 `setAttribute` 函数，而是直接将属性设置到 DOM 对象上，即 `el[key] = vnode.props[key]`。实际上，无论是使用 `setAttribute` 函数，还是直接操作 DOM 对象，都存在缺陷。为元素设置属性比想象中要复杂得多。不过，在讨论具体有哪些缺陷之前，我们有必要先搞清楚两个重要的概念：`HTML Attributes` 和 `DOM Properties`。

#### HTML Attributes 与 DOM Properties

理解 `HTML Attributes` 和 `DOM Properties` 之间的差异和关联非常重要，这能够帮助我们合理地设计虚拟节点的结构，更是正确地为元素设置属性的关键。

我们从最基本的 HTML 说起。

```html
<input id="J-input" type="text" value="foo" />
```

HTML Attributes 指的是定义在 HTML 标签上的属性，这里指的事 `id="J-input"` ，`type="text"` 和 `value="foo"` 。当浏览器解析这段 HTML 代码后，会创建一个与之相符的 DOM 元素对象，我们可以通过 JavaScript 代码来读取该 DOM 对象。

```js
const el = document.querySelector('#j-input');
```

这个 DOM 对象会包含很多属性（properties）。这些属性就是 DOM Properties。很多 HTML Attributes 在 DOM 对象上与之同名的 DOM Properties。例如 `id="J-input"` 对象 `el.id`，`type="text"` 对应 `el.type`，`value="foo"` 对应 `el.value` 等。但 DOM Properties 与 HTML Attributes 的名字不总是一模一样的。例如：

```html
<div class="foo"></div>
```

`class="foo"` 对应的 DOM Properties 则是 `el.className` 。另外，并不是所有 HTML Attributes 都有与之对应的 DOM Properties。

```html
<div aria-valuenoe="75"></div>
```

`aria-*` 类的 HTML Attributes 就没有与之对应的 DOM Properties。

类似地，也不是所有的 DOM Properties 都有与之对应的 HTML Attributes，例如可以用 `el.textContent` 来设置元素的文本内容，但并没有与之对应的 HTML Attributes 来完成同样的工作。

HTML Attributes 的值与 DOM Properties 的值是由有关联的，例如下面的 HTML 片段：

```html
<div id="foo"></div>
```

这个片段描述了一个具有 id 属性的 div 标签。其中，`id="foo"` 对应的 DOM Properties 是 `el.id`，并且值为字符串 `"foo"` 。我们把这种 HTML Attributes 与 DOM Properties 具有相同名称（即 id）的属性看作直接映射。但并不是所有 HTML Attributes 与 DOM Properties 之间都是直接映射的关系，例如：

```html
<input value="foo" />
```

这是一个具有 value 属性的 input 标签。如果用户没有修改文本框的内容，那么通过 `el.value` 读取对应的 DOM Properties 的值就是字符串 `"foo"` 。而如果用户修改了文本框的值，那么 `el.value` 的值就是当前文本框的值。例如，用户将文本框的内容修改为 `"bar"` ，那么：

```js
console.log(el.value); // "bar"
```

但如果运行下面的代码，会发生 ”奇怪“ 的现象：

```js
console.log(el.getAttribute('value')); // 仍然是 "foo"
console.log(el.value); // "bar"
```

可以发现，用户对文本框内容的修改并不会影响 `el.getAttribute('value')` 的返回值，这个现象蕴含着 HTML Attributes 所代表的意义。HTML Attributes 的作用是设置与之对应的 DOM Properties 的初始值。一旦值改变，那么 DOM Properties 始终存储着当前值，而通过 `getAttribute` 函数得到的仍然是初始值。

但我们仍然可以通过 `el.defaultValue` 来访问初始值，如下面的代码所示：

```js
el.getAttribute('value'); // 仍然是 'foo'
el.value // 'bar'
el.defaultValue // 'foo'
```

这说明一个 HTML Attributes 可以能关联多个 DOM Properties。例如在上例中，`value="foo"` 与 `el.value` 和 `el.defaultValue` 都有关联。

虽然我们可以认为 HTML Attributes 是用来设置与之对应 DOM Properties 的初始值的，但有些值是受限制的，就好像浏览器内部做了默认值校验。如果你通过 HTML Attributes 提供的默认值不合法，那么浏览器会使用内建的合法值作为对应 `DOM Properties` 的默认值，例如：

```html
<input type="foo" />
```

我们知道，为 `<input />` 标签的 type 属性指定字符串 `'foo'` 是不合法的，因此浏览器会矫正这个不合法的值。所以当我们尝试读取 `el.type` 时，得到的其实时矫正后的值，即字符串 `'text'`，而非字符串 `'foo'`：

```js
console.log(el.type); // 'text'
```

从上述分析来看，HTML Attributes 与 DOM Properties 之间的关系很复杂，但其实我们只需要记住一个核心原则即可：HTML Attributes 的作用是设置与之对应的 DOM Properties 的初始值。

#### 正确地设置元素属性

我们详细讨论了 HTML Attributes 和 DOM Properties 相关的内容，因为 HTML Attributes 和 DOM Properties 会影响 DOM 属性的添加方式。对于普通的 HTML 文件来说，当浏览器解析 HTML 代码后，会自动分析 HTML Attributes 并设置合适的 DOM Properties。但用户写在 Vue.js 单文件组件中的模板不会被浏览器系解析，这意味着，原本需要浏览器来完成的工作，现在需要框架来完成。

我们以禁用的按钮为例：

```html
<button disabled>Button</button>
```

浏览器在解析这段 HTML 代码时，发现这个按钮存在一个叫做 `disabled` 的 HTML Attributes，于是浏览器会将该按钮设置为禁用状态，并将它的 `el.disabled` 这个 DOM Properties 的值设置为 true，这一切都是浏览器帮我们处理好的。但是同样的代码如果出现在 Vue.js 的模板中，情况会有所不同。首先，这个 HTML 模板会被编译成 vnode，它等价于：

```js
const buuton = {
  type: 'button',
  props: {
    disabled: ''
  }
}
```

注意，这里的 `props.disabled` 的值时空字符串，如果在渲染器中调用 `setAttribute` 函数设置属性，相当于：

```js
el.setAttribute('disabled', '');
```

这样做的确没问题，浏览器会将按钮禁用。但考虑如下模板：

```html
<button :disabled="false">Button</button>
```

它对应的 vnode 为：

```js
const buuton = {
  type: 'button',
  props: {
    disabled: false
  }
}
```

用户的本意是 “不禁用” 按钮，但如果渲染器仍然使用 `setAttribute` 函数设置属性值，则按钮会被禁用：

```js
el.setAttribute('disabled', false);
```

这是因为使用 `setAttribute` 函数设置的值总是会被字符串化，所以上面这段代码等价于：

```js
el.setAttribute('disabled', 'false');
```

对于按钮来说，它的 `el.disabled` 属性值是布尔类型，并且它不关心具体的 HTML Attributes 的值是什么，只要 disabled 属性存在，按钮就会被禁用。所以我们可以发现，渲染器不应该总是使用 `setAttribute` 函数将 `vnode.props` 对象中的属性设置到元素上。那么应该怎么办？一个很自然的思路是，我们可以优先设置 DOM Properties，例如：

```js
el.disabled = false;
```

这样是可以正确工作的，但是也存在新的问题。

```html
<button disabled>Button</button>
```

这段代码对应的 vnode 是：

```js
const buuton = {
  type: 'button',
  props: {
    disabled: ''
  }
}
```

我们注意到，在模板经过编译后得到的 vnode 对象中，`props.disabled` 的值是一个空字符串。如果直接用它设置元素的 DOM Properties，就相当于：

```js
el.disabled = '';
```

由于 `el.disabled` 是布尔类型的值，所以当我们尝试将它设置为空字符串时，浏览器会将它的值矫正为布尔类型的值，即 false。所以上面这句代码的执行结果等价于：

```js
el.disabled = false;
```

这违背了用户的本意，因为用户希望禁用按钮，而 `el.disabled = false` 则是不禁用。

这样看来，无论使用 `setAttribute` 函数，还是直接设置元素的 DOM Properties，都存在缺陷。要彻底解决这个问题，我们只能做特殊处理，即有限设置元素的 DOM Properties，但当值为空字符串时，要手动将值矫正为 true。只有这样，才能保证代码的行为符合预期。

```diff
function mountElement (vnode, container) {
  const el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el))
  }

  if (vnode.props) {
    for (const key in vnode.props) {
-     el[key] = vnode.props[key];
+     if (key in el) {
+       const type = typeof el[key];
+       const values = vnode.props[key];
+       if (type === 'boolean' && value === '') {
+         el[key] = true;
+       } else {
+         el[key] = value;
+       }
+     } else {
+       // 如果要设置的属性没有对应的 DOM Properties，则使用 setAttribute 函数设置属性
+       el.setAttribute(key, vnode.props[key]);
+     }
    }
  }

  insert(el, container);
}
```

如代码所示，我们检查每一个 `vnode.props` 中的属性，看看是否存在对应的 DOM Properties，如果存在，则优先设置 DOM Properties。同时，我们对布尔类型的 DOM Properties 做了值得矫正，即当要设置得值为空字符串时，将其矫正为布尔值 true。当然，如果 `vnode.props` 中得属性不具有对应的 DOM Properties，则仍然使用 `setAttribute` 函数完成属性的设置。

不过上面给出的实现仍然存在问题，因为有一些 DOM Properties 是只读的。

```html
<form id="form1"></form>
<input form="form1" />
```

在这段代码中，我们为 `<input />` 标签设置了 form 属性（HTML Attributes）。它对应的 DOM Properties 是 `el.form`，但 `el.form` 是只读的，因为我们只能通过 `setAttribute` 函数来设置它。我们需要修改现有逻辑。

```diff
+function sholdSetAsProps (el, key, value) } {
+  if (key === 'form' && el.tagName === 'INPUT') return false
+  return key in el;
+}

function mountElement (vnode, container) {
  const el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el))
  }

  if (vnode.props) {
    for (const key in vnode.props) {
-    // if (key in el) {
+    if (sholdSetAsProps(el, key, value)) {
        const type = typeof el[key];
        const values = vnode.props[key];

        if (type === 'boolean' && value === '') {
          el[key] = true;
        } else {
          el[key] = value;
        }
      } else {
        el.setAttribute(key, vnode.props[key]);
      }
    }
  }

  insert(el, container);
}
```

如代码所示，为了代码的可读性，我们提取了 `shouldSetAsProps` 函数。该函数会返回一个布尔值，代表属性是否应该作为 DOM Properties 被设置。如果返回 true，则代表应该作为 DOM Properties 被设置，否则应该使用 `setAttribute` 函数来设置。在 `shouldSetAsProps` 函数内，我们对 `<input form="xxx" />` 进行特殊处理，即 `<input />` 标签的 form 属性必须使用 `setAttribute` 函数来设置。实际上，不仅仅是 `<input />` 标签，所有表单元素都具有 `form` 属性，它们都应该作为 `HTML Attributes` 被设置。

当然，`<input form="xxx" />` 是一个特殊的例子，还有一些其他类似于这种需要特殊处理的情况。我们不需要列表所有情况一一讲解，因为掌握处理问题的思路更加重要。另外，我们也不可能把所有需要特殊处理的地方都记住，更何况有时我们根本不知道在什么情况下才需要特殊处理。所以，上述解决方案本质上都是经验之谈。不要惧怕写出不完美的代码，只要在后续迭代过程中 “见招拆招” ，代码就会变得越来越完善，框架也会变得越来越健壮。

最后，我们需要把属性的设置也变成与平台无关，因此需要把属性设置相关操作也提取到渲染器选项中。

```js
const renderer = createRenderer({
  createElement (tag) {
    console.log(`创建元素 ${ tag }`);
    return { tag };
  },
  setElementText (el, text) {
    console.log(`设置 ${ JSON.stringify(el) } 的文本内容：${ text }`);
    el.text = text;
  },
  insert (el, parent, anchor = null) {
    console.log(`将 ${ JSON.stringify(el) } 添加到 ${ JSON.stringify(parent) } 下`);
    parent.children = el;
  },
  patchProps (el, key, preValue, nextValue) {
    if (sholdSetAsProps(el, key, nextValue)) {
      const type = typeof el[key];
      if (type === 'boolean' && nextValue === '') {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      el.setAttribute(key, nextValue);
    }
  }
});
```

在 `mountElement` 函数中，只需要调用 `patchProps` 函数，并为其传递相关参数即可：

```js
function mountElement (vnode, container) {
  const el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el))
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key]);
    }
  }

  insert(el, container);
}
```

这样我们就把属性相关的渲染逻辑从渲染器的核心中抽离了出来。

完整代码如下：

```js
// renderer.js
function createRenderer (options) {
  const { createElement, insert, setElementText, patchProps } = options;

  function mountElement (vnode, container) {
    const el = createElement(vnode.type);

    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => patch(null, child, el))
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(el, key, null, vnode.props[key]);
      }
    }

    insert(el, container);
  }

 	// ...

  return {
    render,
    hydrate
  };
}

// index.js
const vnode = {
  type: 'button',
  props: {
    disabled: ''
  }
}
const container = { type: 'root' };

function sholdSetAsProps (el, key, value) {
  if (key === 'form' && el.tagName === 'INPUT') return false
  return key in el;
}

const renderer = createRenderer({
  createElement (tag) {
    console.log(`创建元素 ${ tag }`);

    const elem = { tag };

    elem.setAttribute = (key, value) => {
      console.log(tag, key, value);
    };

    return elem;
  },
	// ...
  patchProps (el, key, preValue, nextValue) {
    if (sholdSetAsProps(el, key, nextValue)) {
      const type = typeof el[key];
      if (type === 'boolean' && nextValue === '') {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      el.setAttribute(key, nextValue);
    }
  }
});

renderer.render(vnode, container);
```

#### class 的处理

我们已经讲解了如何正确地把 `vnode.props` 中定义的属性设置到 DOM 元素上。但在 Vue.js 中，仍然有一些属性需要特殊处理，比如 class 属性。为什么需要对 class 属性进行特殊处理那？这是因为 Vue.js 对 class 做了增强。在 Vue.js 中为元素设置类型有以下几种方式。

**方式一：指定 class 为字符串值**

```html
<p class="foo bar"></p>
```

这段模板对应的 vnode 是：

```js
const vnode = {
  type: 'p',
  props: {
    class: 'foo bar'
  }
}
```

**方式二：指定 class 为一个对象值**

```html
<p :class="cls"></p>
```

假设对象 `cls` 的内容如下：

```js
const cls = { foo: true, bar: false };
```

那么，这段模板对应的 vnode 是：

```js
const vnode = {
  type: 'p',
  props: {
    class: { foo: true, bar: false }
  }
}
```

**方式三：class 是包含上述两种类型的数组**

```html
<p :class="arr"></p>
```

这个数组可以是字符串值和对象值的组合：

```js
const arr = [
  'foo bar',
  {
    baz: true
  }
]
```

那么，这段模板对应的 vnode 是：

```js
const vnode = {
  type: 'p',
  props: {
    class: [
      'foo bar',
      { baz: true }
    ]
  }
}
```

可以看到，因为 class 的值可以是多种类型，所以我们必须在设置元素的 class 之前将值归一化为统一的字符串形式，再把该字符串作为元素的 class 值去设置。因此，我们需要封装 `normalizeClass` 函数，用它来将不同类型的 class 值正常化为字符串，例如：

```js
const vnode = {
  type: 'p',
  props: {
    class: normalizeClass([
      'foo bar',
      {
        baz: true
      }
    ])
  }
}
```

最后的结果等价于：

```js
const vnode = {
  type: 'p',
  props: {
    class: 'foo bar baz'
  }
}
```

至于 `normalizeClass` 函数的实现，这里就不作详细讲解，因为它本质上就是一个数据转换的小算法，实现起来并不复杂。

假设现在我们已经能够对 class 值进行正常化。接下来，我们将讨论如何将正常化后的 class 值设置到元素上。其实，我们目前实现的渲染器已经能够完成 class 的渲染。因为 class 属性对应的 DOM Properties 是 `el.className` ，所以表达式 `class in el` 的值将会是 false，因此，`patchProps` 函数会使用 `setAttribute` 函数来完成 class 的设置。但是我们知道，在浏览器中为一个元素设置 class 有三种方式，即使用 `setAttribute` ，`el.className` 或 `el.classList`。那么哪一种方法的性能更好呢？

<img src="./images/classname.png" />

> https://measurethat.net/Benchmarks/Show/54/0/classname-vs-setattribute-vs-classlist

可以看到，`el.classname` 的性能最优。因此，我们需要调整 `patchProps` 函数的实现。

```js
patchProps (el, key, preValue, nextValue) {
  if (key === 'class') {
    el.className = nextValue || '';
  } else if (sholdSetAsProps(el, key, nextValue)) {
    const type = typeof el[key];
    if (type === 'boolean' && nextValue === '') {
      el[key] = true;
    } else {
      el[key] = nextValue;
    }
  } else {
    el.setAttribute(key, nextValue);
  }
}
```

从代码中可以看到，我们对 class 进行了特殊处理，即使用 `el.className` 代替 `setAttribute` 函数。其实除了 class 属性之外，Vue.js 还对 style 属性做了增强，所以我们也需要对 style 做类似的处理。

通过对 class 的处理，我们可以知道，`vnode.props` 对象中定义的属性值的类型并不总是与 DOM 元素属性的数据结构保持一致，这取决于上层 API 的设计。Vue.js 允许对象类型的值作为 class 是为了方便开发者，在底层的是线上，必然需要对值进行正常化后再使用。另外，正常化的过程是由代价的，如果需要进行大量的正常化操作，则会消耗更多性能。

#### 卸载操作

前文主要讨论了挂载操作。接下来，我们将会讨论卸载操作。卸载操作发生在更新阶段，更新指的是，在初次挂载完成之后，后续渲染会触发更新。

```js
// 初次挂载
renderer.render(vnode, document.querySelector('#app'));
// 再次挂载新的 vnode，将触发更新操作
renderer.render(newVnode, document.querySelector('#app'));
```

更新的情况有几种，我们逐个来看。当后续调用 render 函数渲染空内容（即 null）时，如下面的代码所示：

```js
// 初次挂载
renderer.render(vnode, document.querySelector('#app'));
// 新 vnode 为 null，意味着卸载之前渲染的内容
renderer.render(null, document.querySelector('#app'));
```

首次挂载完成后，后续渲染时如果传递了 null 作为新 vnode，则意味着什么都不渲染，这时我们需要卸载之前渲染的内容。回顾前文实现的 render 函数，如下：

```js
function render (vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container);
  } else {
    if (container._vnode) {
      container.innerHTML = '';
    }
  }
  container._vnode = vnode;
}
```

可以看到，当 vnode 为 null，并且容器元素的 `container._vnode` 属性存在时，我们直接通过 `innerHTML` 清空容器。但这么做时不严谨的，原因有三点。

* 容器的内容可能时某个或多个组件渲染的，当卸载操作发生时，应该正确地的调用这些组件的 `beforeUnmount`，`unmounted` 等声明周期函数；
* 即使内容不是由组件渲染的，有的元素存在自定义指令，我们应该在卸载操作发生时正确执行对应的指令钩子函数；
* 使用 `innerHTML`  清空容器元素内容的另一个缺陷是，它不会移除绑定在 DOM 元素上的事件处理函数。

正如上述三点原因，我们不能简单地使用 `innerHTML` 来完成卸载操作。正确的卸载方式是，根据 `vnode` 对象获取与其相关联的真实 DOM 元素，然后再使用原生 DOM 操作方法将该 DOM 元素移除。为此，我们需要再 vnode 与真实 DOM 元素之间建立联系，修改 `mountElement` 函数，如下面的代码所示：

```diff
function mountElement (vnode, container) {
  // 让 vnode.el 引用真实 DOM 元素
-	const el = createElement(vnode.type);
+ const el = vnode.el = createElement(vnode.type);

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => patch(null, child, el))
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key]);
    }
  }

  insert(el, container);
}
```

可以看到，当我们调用 `createElement` 函数创建真实 DOM 元素时，会把真实 DOM 元素赋值给 `vnode.el` 属性。这样，再 vnode 与真实 DOM 元素之间就建立了联系，我们可以通过 `vnode.el` 来获取该虚拟节点对应的真实 DOM 元素。有了这些，当卸载操作发生的时候，只需要根据虚拟节点对象 `vnode.el` 取得真实 DOM 元素，再将其从父元素中移除即可。

```diff
function render (vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container);
  } else {
    if (container._vnode) {
+    // 根据 vnode 获取要卸载的真实 DOM 元素
+    const el = container._vnode.el;
+    // 获取 el 的父元素
+    const parent = el.parentNode;
+    // 调用 removeChild 移除元素
+    if (parent) parent.removeChild(el);
-    container.innerHTML = '';
    }
  }
  container._vnode = vnode;
}
```

如上面的代码所示，其中 `container._vnode` 代表旧 vnode，即要被卸载的 vnode。然后通过 `container._vnode.el` 取得真实 DOM 元素，并调用 `removeChild` 函数将其从父元素中移除即可。

由于卸载操作时比较常见且基本的操作，所以我们可以将它封装到 `unmount` 函数中，以便后续代码可以复用它，如下面的代码所示：

```js
function unmount (vnode) {
  const parent = vnode.el.parentNode;
  if (parent) {
    parent.removeChild(vnode.el);
  }
}
```

unmount 函数接收一个虚拟节点作为参数，并将该虚拟节点对应的真实 DOM 元素从父元素中移除。现在 `unmount` 函数的代码还比较简单，后续我们可以慢慢充实它，使之变得更加完善。有了 unmount 函数后，就可以直接在 `render` 函数中调用它来完成卸载任务。

```js
function unmount (vnode) {
  const parent = vnode.el.parentNode;
  if (parent) {
    parent.removeChild(vnode.el);
  }
}

function render (vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container);
  } else {
    if (container._vnode) {
      // 调用 unmount 函数卸载 vnode
      unmount(container._vnode);
    }
  }
  container._vnode = vnode;
}
```

将卸载操作封装到 unmount 函数中，还可以带来两点额外的好处：

* 在 unmount 函数内，我们有机会调用绑定在 DOM 元素上的指令钩子函数，例如 `beforeUnmount` 、`unmounted` 等。
* 在 unmount 函数执行时，我们有机会检测虚拟节点 vnode 的类型。如果该虚拟节点描述的是组件，我们有机会调用组件相关的生命周期函数。

#### 区分 vnode 的类型

前面我们了解到，当后续调用 render 函数渲染空内容（即 null）时，会执行卸载操作。如果后续渲染时，传递新的 vnode，则会把新旧 vnode 都传递给 patch 函数进行打补丁操作。

```js
function patch (n1, n2, container) {
  if (!n1) {
    mountElement(n2, container);
  } else {
    // 更新
  }
}
```

上面这段代码时我们之前实现的 patch 函数。其中，patch 函数的两个参数 `n1` 和 `n2` 分别代表旧 vnode 与新 vnode。如果旧 vnode 存在，则需要在新旧 vnode 之间打补丁。但在具体执行打补丁操作之前，我们需要保证新旧 vnode 所描述的内容相同。

举个例子，假设初次渲染的 vnode 时一个 p 元素：

```js
const vnode = { type: 'p' };
renderer.render(vnode, document.querySelector('#app'));
```

后续又渲染了一个 input 元素：

```js
const vnode = { type: 'input' };
renderer.render(vnode, document.querySelector('#app'));
```

这就会造成新旧 vnode 所描述的内容不同，即 `vnode.type` 属性的值不同。对于上例来说，p 元素和 input 元素之间不需要打补丁，因为对于不同的元素来说，每个元素都有特有的属性，例如：

```html
<p id="foo" />

<!-- type 属性是 input 标签特有的，p 标签则没有该属性 -->
<input type="submit" />
```

在这种情况下，正确的更新操作是，先将 p 元素卸载，再将 input 元素挂载到容器中。因此我们需要调整 patch 函数的代码：

```js
function patch (n1, n2, container) {
  // 如果 n1 存在，对比 n1 和 n2 类型
  if (n1 && n1.type !== n2.type) {
    // 如果新旧 vnode 的类型不同，直接将旧 vnode 卸载
    unmount(n1);
    n1 = null;
  }
  if (!n1) {
    mountElement(n2, container);
  } else {
  }
}
```

如上面的代码所示，在真正执行更新操作之前，我们优先检查新旧 vnode 所描述的内容是否相同，如果不同，则直接调用 unmount 函数将旧 vnode 卸载。这里需要注意的是，卸载完成后，我们应该将参数 `n1` 的值重置为 null，这样才能保证后续挂载操作正确执行。

即使新旧 vnode 描述的内容相同，我们仍然需要进一步确认它们的类型是否相同。我们知道，一个 vnode 可以用来描述普通标签，也可以用来描述组件，还可以用来描述 `Fragment` 等。对于不同类型的 vnode，我们需要提供不同的挂载或打补丁的处理方式。所以，我们需要继续修改 patch 函数的代码以满足需求，如下面的代码所示：

```js
function patch (n1, n2, container) {
  // 如果 n1 存在，对比 n1 和 n2 类型
  if (n1 && n1.type !== n2.type) {
    // 如果新旧 vnode 的类型不同，直接将旧 vnode 卸载
    unmount(n1);
    n1 = null;
  }

  // n1 和 n2 所描述的内容相同
  const { type } = n2;

  if (typeof type === 'string') {
    if (!n1) {
      mountElement(n2, container);
    } else {
      patchElement(n1, n2);
    }
  } else if (typeof type === 'object') {
    // 如果 n2.type 值的类型是对象，则描述的是组件
  } else if (type === 'xxx') {
    // 处理其他类型的 vnode
  }
}
```

实际上，在前文的讲解中，我们都一直假设 vnode 的类型是普通元素标签。但严谨的做法是根据 `vnode.type` 进一步确认它们的类型是什么，从而使用相应的处理函数进行处理。如果 `vnode.type` 的值的类型是字符串类型，它描述的就是普通标签元素，这时我们会调用 `mouneElement` 或 `patchElement` 完成挂载和更新操作。如果 `vnode.type` 的值的类型是对象，则它描述的是组件，这时我们会调用与组件相关的挂载和更新方法。

#### 事件的处理

本小节我们讨论如何处理事件，包括如何在虚拟节点中描述事件，如果和事件添加到 DOM 元素上，以及如何更新事件。

首先，我们先来解决第一个问题，如何在虚拟节点中描述事件。事件可以视作一种特殊的属性，因此我们可以约定，在 `vnode.props` 对象中，凡是以字符串 `on` 开头的属性都视作事件，例如：

```js
const vnode = {
  type: 'p',
  props: {
    onClick: () => {
      alert('clicked');
    }
  },
  children: 'text'
}
```

解决了事件在虚拟节点层面的描述问题后，我们再来看看如何将事件添加到 DOM 元素上。这非常简单，只需要在 `patchProps` 中调用 `addEventListener` 函数来绑定事件即可，如下面的代码所示：

```js
patchProps (el, key, preValue, nextValue) {
  if (/^on/.test(key)) {
    // 根据属性名称得到对应的事件名称
    const name = key.slice(2).toLowerCase();
    // 绑定事件，nextValue 为事件处理函数
    el.addEventListener(name, nextValue);
  } else if (key === 'class') {
    el.className = nextValue || '';
  } else if (sholdSetAsProps(el, key, nextValue)) {
		// ...
  } else {
    el.setAttribute(key, nextValue);
  }
}
```

那么，更新事件要如何处理呢？按照一般的思路，我们需要先移除之前添加的事件处理函数，然后再将新的事件处理函数绑定到 DOM 元素上，如下面的代码所示：

```js
patchProps (el, key, preValue, nextValue) {
  if (/^on/.test(key)) {
    // 根据属性名称得到对应的事件名称
    const name = key.slice(2).toLowerCase();
    // 移除上一次绑定的事件处理函数
    preValue && el.removeEventListener(name, preValue);
    // 绑定事件，nextValue 为事件处理函数
    el.addEventListener(name, nextValue);
  } else if (key === 'class') {
    el.className = nextValue || '';
  } else if (sholdSetAsProps(el, key, nextValue)) {
		// ...
  } else {
    el.setAttribute(key, nextValue);
  }
}
```

这样做代码能够按照预期工作，但其实还有一种性能更优的方式来完成事件更新。在绑定事件时，我们可以绑定一个伪造的事件处理函数 invoker ，然后把真正的事件处理函数设置为 `invoker.value` 属性的值。这样当更新事件的时候，我们将不再需要调用 `removeEventListener` 函数来移除上一次绑定的事件，只需要更新 `invoke.value` 的值即可，如下面的代码所示：

```js
patchProps (el, key, preValue, nextValue) {
  if (/^on/.test(key)) {
    // 获取为该元素伪造的事件处理函数 invoker
    const invoker = el._vei;
    const name = key.slice(2).toLowerCase();

    if (nextValue) {
      if (!invoker) {
        // 如果没有 invoker，则将一个伪造的 invoker 缓存到 el._vei 中
        // vei 是 vue event invoker 的首字母缩写
        invoker = el._vei = (e) => {
          // 当伪造的事件处理函数执行时，会执行真正的事件处理函数
          invoker.value(e);
        }
        // 将真正的事件处理函数赋值给 invoker.value
        invoker.value = nextValue;
        // 绑定 invoker 作为事件处理函数
        el.addEventListener(name, invoker);
      } else {
        // 如果 invoker 存在，意味着更新，只需要更新 invoker.value 的值即可
        invoker.value = nextValue;
      }
    } else if (invoker) {
      // 新事件绑定函数不存在，且之前绑定的 invoker 存在，移除绑定
      el.removeEventListener(name, invoker);   
    }
  } else if (key === 'class') {
    el.className = nextValue || '';
  }
  // ...
}
```

观察上面的代码，事件绑定主要分为两个步骤：

* 先从 `el._vei` 中读取对应的 `invoker`，如果 `invoker` 不存在，则将伪造的 `invoker` 作为事件处理函数，并将它缓存到 `el._vei` 属性中。
* 把真正的事件处理函数赋值给 `invoker.value` 属性，然后把伪造的 `invoker` 函数作为事件处理函数绑定到元素上。可以看到，当事件被触发时，实际上执行的是伪造的事件处理函数，在其内部间接执行了真正的事件处理函数 `invoker.value(e)`。

当更新事件时，由于 `el._vei` 已经存在了，所以我们只需要将 `invoker.value` 的值修改为新的事件处理函数即可。这样，在更新事件时可以避免一次 `removeEventListener` 函数的调用，从而提升性能。实际上，伪造的事件处理函数的作用不仅于此，它还能解决冒泡与事件更新之间相互影响的问题。

目前的实现仍然存在问题。我们将事件处理函数缓存在 `el._vei` 属性中，问题是，在同一时刻只能缓存一个事件处理函数。这意味着，如果一个元素同时绑定了多种事件，将会出现事件覆盖的现象。例如同时给元素绑定 `click` 和 `contextmenu` 事件。

```js
const vnode = {
  type: 'p',
  props: {
    onClick: () => {
      alert('clicked')
    },
    onContextmenu: () => {
      alert('contextmeny')
    }
  },
  children: 'text'
}

renderer.render(vnode, document.querySelector('#app'))
```

当渲染器尝试渲染上面这段代码时，会先绑定 `click` 事件，然后再绑定 `contextmenu` 事件。后绑定的 `contextmenu` 事件处理函数会覆盖先绑定的 `click` 的事件处理函数。为了解决事件覆盖的问题，我们需要重新设计 `el._vei` 的数据结构。我们应该将 `el._vei` 设计为一个对象，它的键是事件名称，它的值则是对应的事件处理函数，这样就不会发生事件覆盖的现象。

```js
patchProps (el, key, preValue, nextValue) {
  if (/^on/.test(key)) {
    // 定义 el._vei，存储事件名称到事件处理函数的映射
    const invokers = el._vei || (el._vei = {});
    const name = key.slice(2).toLowerCase();

    // 根据事件名称获取 invoker
    let invoker = in][key];

    if (nextValue) {
      if (!invoker) {
        // 将事件处理函数缓存到 el._vei[key] 下，避免覆盖
        invoker = el._vei[key] = (e) => {
          invoker.value(e);
        }
        invoker.value = nextValue;
        el.addEventListener(name, invoker);
      } else {
        invoker.value = nextValue;
      }
    } else if (invoker) {
      el.removeEventListener(name, invoker);   
    }
  } else if (key === 'class') {
    el.className = nextValue || '';
  } else if (sholdSetAsProps(el, key, nextValue)) {
		// ...
  } else {
    el.setAttribute(key, nextValue);
  }
}
```

另外，一个元素不仅可以绑定多种类型的事件，对于同一类型的事件而言，还可以绑定多个事件处理函数。在元素 DOM 编程中，当多次调用 `addEventListener` 函数为元素绑定同一类型的事件时，多个事件处理函数可以共存，例如：

```js
el.addEventListener('click', fn1)
el.addEventListener('click', fn2)
```

当点击元素时，事件处理函数 `fn` 和 `fn2` 都会执行。因此，为了描述同一事件的多个事件处理函数，我们需要调整 `vnode.props` 对象中事件的数据结构，如下面的代码所示：

```js
const vnode = {
  type: 'p',
  props: {
    onClick: [
      () => {
        alert('clicked 1')
      },
      () => {
        alert('clicked 2')
      }
    ]
  },
  children: 'text'
}

renderer.render(vnode, document.querySelector('#app'))
```

在上面这段代码中，我们使用一个数组来描述事件，数组中的每个元素都是一个独立的事件处理函数，并且这些事件处理函数都能够正确地绑定到对应元素上。为了事件此功能，我们需要继续修改 `patchProps` 函数中事件处理函数相关的代码。

```js
patchProps (el, key, preValue, nextValue) {
  if (/^on/.test(key)) {
    // 定义 el._vei，存储事件名称到事件处理函数的映射
    const invokers = el._vei || (el._vei = {});
    const name = key.slice(2).toLowerCase();

    // 根据事件名称获取 invoker
    let invoker = in][key];

    if (nextValue) {
      if (!invoker) {
        // 将事件处理函数缓存到 el._vei[key] 下，避免覆盖
        invoker = el._vei[key] = (e) => {
          if (Array.isArray(invoker.value)) {
            // invoker.value 是数组，遍历并逐个调用事件处理函数
            invoker.value.forEach(fn => fn(e))
          } else {
            // 直接作为函数调用
            invoker.value(e);
          }
        }
        invoker.value = nextValue;
        el.addEventListener(name, invoker);
      } else {
        invoker.value = nextValue;
      }
    } else if (invoker) {
      el.removeEventListener(name, invoker);   
    }
  } else if (key === 'class') {
    el.className = nextValue || '';
  } else if (sholdSetAsProps(el, key, nextValue)) {
		// ...
  } else {
    el.setAttribute(key, nextValue);
  }
}
```

上面这段代码中，我们修改了 `invoker` 函数的实现。当 `invoker` 函数执行，调用真正的事件处理之前，要先检查 `invoker.value` 的数据结构是否是数组，如果是数组则遍历它，并逐个调用定义在数组中的事件处理函数。

#### 事件冒泡与更新时机问题

上一节中，我们介绍了基本的事件处理。本小节我们将讨论事件冒泡与更新时机相结合所导致的问题。为了更清晰地的描述问题，我们需要构造一个小例子。

```js
const { effect, ref } = VueReactivity

const bol = ref(false)

effect(() => {
  // 创建 vnode
  const vnode = {
    type: 'div',
    props: bol.value ? {
      onClick: () => {
        alert('父元素 clicked')
      }
    } : {},
    children: [
      {
        type: 'p',
        props: {
          onClick: () => {
            bol.value = true
          }
        },
        children: 'text'
      }
    ]
  }

  // 渲染 vnode
  renderer.render(vnode, document.querySelector('#app'))
})
```

这个例子比较复杂。在上面这段代码中，我们创建一个响应式数据 `bol`，它是一个 `ref`，初始值为 false。接着，创建了一个 effect，并在副作用函数内调用 `renderer.render` 函数来渲染 `vnode`。这里的重点在于该 `vnode` 对象，它描述了一个 div 元素，并且该 div 元素具有一个 p 元素作为子节点。

* div 元素：它的 props 对象的值是由一个三元表达式决定的。在首次渲染时，由于 `bol.value` 的值为 false，所以它的 props 的值是一个空对象。
* p 元素：它具有 click 点击事件，并且当点击它时，事件处理函数会将 `bol.value` 的值设置为 true。

综合上述特点，我们来思考一个问题：当首次渲染完成后，用鼠标点击 p 元素，会触发父级 div 元素的 click 事件的事件处理函数执行吗？

答案其实很明显，在首次渲染完成之后，由于 `bol.value` 的值为 false，所以渲染器并不会为 div 元素绑定点击事件。当用鼠标点击 p 元素时，即使 click 的事件可以从 p 元素冒泡到父级 div 元素，但由于 div 元素没有绑定 click 函数的事件处理函数，所以什么都不会发生。但事实时，当你尝试运行上面这段代码并点击 p 元素时，会发现父级 div 元素的 click 事件的事件处理函数竟然执行了。为什么会发生如此奇怪的现象呢？这其实与更新机制有关，我们来分析一下当点击 p 元素时，到底发生了什么？

当点击 p 元素时，绑定到它身上的 click 事件处理函数会执行，于是 `bol.value` 的值被改为 true。接下来的一步非常关键，由于 `bol` 是一个响应式数据，所以当它的值发生变化时，会触发副作用函数重新执行。由于此时的 `bol.value` 已经变成 true，所以在更新阶段，渲染器会为父级 div 元素绑定 click 事件处理函数。当更新完成之后，点击事件才从 p 元素冒泡到父级 div 元素。由于此时 div 元素已经绑定了 click 事件的处理函数，因此就发生了上述奇怪的现象。下图是点击 p 元素后，整个更新和事件触发的流程图。

<img src="./images/patch01.png" />

根据上图可知，之所以会出现上述奇怪的现象，是因为更新操作发生在事件冒泡之前，即为 div 元素绑定事件处理函数发生在事件冒泡之前。那如何避免这个问题呢？那如何避免这个问题呢？一个很自然的想法是，能否将绑定事件的动作移动到事件冒泡之后？但这个想法并不可靠，因为我们无法知道事件冒泡是否完成，以及完成到什么程度。你可能会想，Vue.js 的更新难道不是在一个异步队列中进行的吗？那是不是自然能够避免这个问题？其实不然，换句话来说，微任务会穿插在由事件冒泡触发的多个事件处理函数之间被执行。因此，即使把绑定事件的动作放到微任务中，也无法避免这个问题。

那应该如何解决呢？其实，仔细观察上图就会发现，触发事件的时间与绑定事件的时间之间是有联系的。

<img src="./images/patch02.png" />

由上图可以发现，事件触发的时间要早于事件处理函数被绑定的时间。这意味着当一个事件被触发时，目标元素上还没有绑定相关的事件处理函数，我们可以根据这个特点来解决问题：**屏蔽所有绑定时间晚于事件触发时间的事件处理函数的执行**。基于此，我们可以调整 `patchProps` 函数中关于事件的代码。

```js
patchProps(el, key, prevValue, nextValue) {
  if (/^on/.test(key)) {
    const invokers = el._vei || (el._vei = {})
    let invoker = invokers[key]
    const name = key.slice(2).toLowerCase()
    if (nextValue) {
      if (!invoker) {
        invoker = el._vei[key] = (e) => {
          // e.timeStamp 是事件发生的时间
          // 如果事件发生的时间早于事件处理函数绑定的事件，则不执行事件处理函数
          if (e.timeStamp < invoker.attached) return
          if (Array.isArray(invoker.value)) {
            invoker.value.forEach(fn => fn(e))
          } else {
            invoker.value(e)
          }
        }
        invoker.value = nextValue
        // 添加 invoker.attached 属性，存储事件处理函数被绑定的时间
        invoker.attached = performance.now()
        el.addEventListener(name, invoker)
      } else {
        invoker.value = nextValue
      }
    } else if (invoker) {
      el.removeEventListener(name, invoker)
    }
  } else if (key === 'class') {
    el.className = nextValue || ''
  } else if (shouldSetAsProps(el, key, nextValue)) {
    const type = typeof el[key]
    if (type === 'boolean' && nextValue === '') {
      el[key] = true
    } else {
      el[key] = nextValue
    }
  } else {
    el.setAttribute(key, nextValue)
  }
}
```

如上面的代码所示，我们在原来的基础上只添加了两行代码。首先，我们为伪造的事件处理函数添加了 `invoker.attached` 属性，用来存储事件处理函数被绑定的时间。然后，在 invoker 执行的时候，通过事件对象的 `e.timeStamp` 获取事件发生的时间。最后，比较两者，如果事件处理函数被绑定的时间万余事件发生的时间，则不执行该事件处理函数。

在关于时间的存储和比较方面，我们使用的是高精时间，即 `performance.now`。但根据浏览器的不同，`e.timeStamp` 的值也会有所不同。它既可能是高精时间，也可能是非高精时间。因此，严格来讲，这里需要做兼容处理。不过在 `Chrome 49`、`Firefox 54`、`Opera 36` 以及之后的版本中，`e.timeStamp` 的值都是高精时间。

#### 更新子节点

前几小节我们讲解了元素属性的更新，包括普通标签属性和事件。接下来，我们将讨论如何更新元素的子节点。首先，回顾一下元素的子节点是如何被挂载的，如下面的 `mountElement` 函数的代码所示：

```js
function mountElement(vnode, container, anchor) {
  const el = vnode.el = createElement(vnode.type)

  // 挂载子节点，首先判断 children 的类型
  if (typeof vnode.children === 'string') {
    // 如果是字符串类型，说明是文本子节点
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    // 如果是数字，说明是多个子节点
    vnode.children.forEach(child => {
      patch(null, child, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key])
    }
  }

  insert(el, container, anchor)
}
```

在挂载子节点时，首先要区分其类型：

* 如果 `vnode.children` 是字符串，则说明元素具有文本子节点；
* 如果 `vnode.children` 是数组，则说明具有多个子节点。

这里需要思考的是，为什么要区分子节点的类型呢？其实这是一个规范性的问题，因为只有子节点的类型是规范化的，才有利于我们编写更新逻辑。因此，在具体讨论如何更新子节点之前，我们有必要先规范化 `vnode.children`。那应该设定怎样的规范呢？为了搞清楚这个问题，我们需要先搞清楚在一个 HTML 页面中，元素的子节点都有哪些情况，如下面的 HTML 代码所示：

```html
<!-- 没有子节点 -->
<div></div>
<!-- 文本节点 -->
<div>Some Text</div>
<!-- 多个节点 -->
<div>
  <p/>
  <p/>
</div>
```

对于一个元素来说，它的子节点无非有以下三种情况。

* 没有子节点，此时 `vnode.children` 的值为 null。
* 具有文本子节点，此时 `vnode.children` 的值为字符串，代表文本的内容。
* 其他情况，无论是单个元素子节点，还是多个子节点（可能是文本节点和元素的混合），都可以用数组来表示。

如下面的代码所示：

```js
// 没有子节点
vnode = {
  type: 'div',
  children: null
}
// 文本子节点
vnode = {
  type: 'div',
  children: 'Some Text'
}
// 其他情况
vnode = {
  type: 'div',
  children: [
    { type: 'p' },
    'Some Text'
  ]
}
```

现在，我们已经规范化了 `vnode.children` 的类型。既然一个 vnode 的子节点可能有三种情况，那么当渲染器执行更新时，新旧子节点都分别是三种情况之一。所以，我们可以总结出更新子节点时的全部九种可能。

<img src="./images/patch03.png" />

但落实到代码，我们会发现其实并不需要完全覆盖这九种可能。

```js
function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props
  
  // 第一步：更新 props
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patchProps(el, key, oldProps[key], newProps[key])
    }
  }
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patchProps(el, key, oldProps[key], null)
    }
  }

  // 第二步：更新 children
  patchChildren(n1, n2, el)
}
```

如上面的代码所示，更新子节点是对一个元素进行打补丁的最后一步操作。我们将它封装到 `patchChildren` 函数中，并将新旧 vnode 以及当前正在被打补丁的 DOM 元素 el 作为参数传递给它。

`patchChildren` 函数的实现如下：

```js
function patchChildren(n1, n2, container) {
  // 判断新子节点的类型是否是文本节点
  if (typeof n2.children === 'string') {
    // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
    // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况什么都不需要做
    if (Array.isArray(n1.children)) {
      n1.children.forEach((c) => unmount(c))
    }
    // 最后将新的文本子节点内容设置给父元素容器
    setElementText(container, n2.children)
  }
}
```

如上面这段代码所示，首先，我们检测新子节点的类型是否是文本子节点，如果是，则还需要检查旧子节点的类型。旧子节点的类型可能有三种情况，分别是：没有子节点、文本子节点或一组子节点。如果没有旧子节点或旧子节点的类型是文本子节点，那么只需要将新的文本内容设置给容器元素即可；如果旧子节点存在，并且不是文本子节点，则说明它的类型是一组子节点。这时我们需要循环遍历它们，并逐个调用 `unmount` 函数进行卸载。

如果新子节点的类型不是文本子节点，我们需要再添加一个判断分支，判断它是否是一组子节点。

```js
function patchChildren(n1, n2, container) {
  // 判断新子节点的类型是否是文本节点
  if (typeof n2.children === 'string') {
    // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
    // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况什么都不需要做
    if (Array.isArray(n1.children)) {
      n1.children.forEach((c) => unmount(c))
    }
    // 最后将新的文本子节点内容设置给父元素容器
    setElementText(container, n2.children)
  } else if (Array.isArray(n2.children)) {
    // 说明新子节点是一组子节点

    // 判断旧子节点是否也是一组子节点
    if (Array.isArray(n1.children)) {
      // 代码运行到这里，说明新旧子节点都是一组子节点，这里涉及核心的 diff 算法
    } else {
      // 此时：
      // 旧子节点要么是文本子节点，要么不存在
      // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂载
      setElementText(container, '')
      n2.children.forEach(c => patch(null, c, container))
    }
  }
}
```

在上面这段代码中，我们新增了对 `n2.children` 类型的判断：检测它是否是一组子节点，如果是，接着再检查旧子节点的类型。同样，旧子节点也有三种可能：没有子节点、文本子节点和一组子节点。对于没有旧子节点或者旧子节点是文本子节点的情况，我们只需要将容器元素清空，然后逐个将新的一组子节点挂载到容器中即可。如果旧子节点也是一组子节点，则涉及新旧两组子节点的比对，这里就涉及我们常用的 Diff 算法。这里我们暂时使用一种傻瓜式的方法来保证功能可用。这个方法很简单，即把旧的一组子节点全部卸载，再将新的一组子节点全部挂载。

```js
function patchChildren(n1, n2, container) {
  // 判断新子节点的类型是否是文本节点
  if (typeof n2.children === 'string') {
    // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
    // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况什么都不需要做
    if (Array.isArray(n1.children)) {
      n1.children.forEach((c) => unmount(c))
    }
    // 最后将新的文本子节点内容设置给父元素容器
    setElementText(container, n2.children)
  } else if (Array.isArray(n2.children)) {
    // 说明新子节点是一组子节点

    // 判断旧子节点是否也是一组子节点
    if (Array.isArray(n1.children)) {
      // 代码运行到这里，说明新旧子节点都是一组子节点，这里涉及核心的 diff 算法

      // 临时处理：
      // 1. 将旧的一组子节点全部卸载
      n1.children.forEach(c => unmount(c))
      // 2. 再将新的一组子节点全部挂载到容器中
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 此时：
      // 旧子节点要么是文本子节点，要么不存在
      // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂载
      setElementText(container, '')
      n2.children.forEach(c => patch(null, c, container))
    }
  }
}
```

这样做所以能够实现需求，但并不是最优解。现在，对于新子节点来说，还剩下最后一种情况，即新子节点不存在。

```js
function patchChildren(n1, n2, container) {
  // 判断新子节点的类型是否是文本节点
  if (typeof n2.children === 'string') {
    // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
    // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况什么都不需要做
    if (Array.isArray(n1.children)) {
      n1.children.forEach((c) => unmount(c))
    }
    // 最后将新的文本子节点内容设置给父元素容器
    setElementText(container, n2.children)
  } else if (Array.isArray(n2.children)) {
    // 说明新子节点是一组子节点

    // 判断旧子节点是否也是一组子节点
    if (Array.isArray(n1.children)) {
      // 代码运行到这里，说明新旧子节点都是一组子节点，这里涉及核心的 diff 算法

      // 临时处理：
      // 1. 将旧的一组子节点全部卸载
      n1.children.forEach(c => unmount(c))
      // 2. 再将新的一组子节点全部挂载到容器中
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 此时：
      // 旧子节点要么是文本子节点，要么不存在
      // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂载
      setElementText(container, '')
      n2.children.forEach(c => patch(null, c, container))
    }
  } else {
    // 代码运行到这里，说明新子节点不存在
    if (Array.isArray(n1.children)) {
      // 旧子节点是一组子节点，只需逐个卸载即可
      n1.children.forEach(c => unmount(c))
    } else if (typeof n1.children === 'string') {
      // 旧子节点是文本子节点，直接清空
      setElementText(container, '')
    }
    // 如果没有旧子节点，那么什么都不需要做
  }
}
```

可以看到，如果代码走到 else 分支，则说明新子节点不存在。这时，对于旧子节点来说仍然有三种可能：没有子节点、文本子节点以及一组子节点。如果旧子节点不存在，则什么都不需要做；如果旧子节点是一组子节点，则逐个卸载即可；如果旧的子节点是文本子节点，则清空文本内容即可。

#### 文本节点和注释节点

之前我们只讲解了一种类型的 vnode，即用于描述普通标签的 vnode，如下面的代码所示：

```js
const vnode = {
  type: 'div'
}
```

我们用 `vnode.type` 来描述元素的名称，它是一个字符串类型的值。

接下来，我们讨论如何用虚拟 DOM 描述更多类型的真实 DOM。其中最常见的两种节点类型是文本节点和注释节点，如下面的 HTML 代码所示：

```html
<div><!-- 注释节点 -->我是文本节点</div>
```

`<div>` 是元素节点，它包含一个注释节点和一个文本节点。那么，如果使用 `vnode` 描述注释节点和文本节点呢？

我们知道，`vnode.type` 属性能够代表一个 vnode 的类型。如果 `vnode.type` 的值是字符串类型，则代表它描述的是普通标签，并且该值就代表标签的名称。但注释节点与文本节点不同普通标签节点，它们不具有标签名称，所以我们需要人为创造一些唯一的标识，并将其作为注释节点和文本节点的 type 属性值，如下面的代码所示：

```js
// 文本节点的 type 标识
const Text = Symbol()
const newVNode = {
  type: Text,
  children: '我是文本内容'
}

// 注释节点的 type 标识
const Comment = Symbol()
const newVNode = {
  type: Comment,
  children: '我是注释内容'
}
```

可以看到，我们分别为文本节点和注释节点创建了 symbol 类型的值，并将其作为 `vnode.type` 属性的值。这样就能够用 vnode 来描述文本节点和注释节点了。由于文本节点和注释节点只关心文本内容，所以我们用 `vnode.children` 来存储它们对应的文本内容。

有了用于描述文本节点和注释节点的 vnode 对象后，我们就可以使用渲染器来渲染它们了。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    if (!n1) {
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2)
    }
  } else if (type === Text) {
    // 如果新的 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
    if (!n1) {
      // 如果没有旧节点，进行挂载
      // 使用 createTextMode 创建文本节点
      const el = n2.el = document.createTextNode(n2.children)
      // 将文本节点插入到容器中
      insert(el, container)
    } else {
      // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
      const el = n2.el = n1.el
      if (n2.children !== n1.children) {
        el.nodeValue = n2.children
      }
    }
  }
}
```

观察上面这段代码，我们增加了一个判断条件，即判断表达式 `type === Text` 是否成立，如果成立，则说明要处理的节点是文本节点。接着，还需要判断旧的虚拟节点（`n1`）是否存在，如果不存在，则直接挂载新的虚拟节点（`n2`）。这里我们使用 `createTextNode` 函数来创建文本节点，并将它插入到容器元素中。如果旧的虚拟节点（`n1`）存在，则需要更新文本内容，这里我们使用文本节点的 `nodeValue` 属性完成文本内容的更新。

另外，从上面的代码中我们还能注意到，`patch` 函数依赖浏览器平台特有的 API，即 `createTextNode` 和 `el.nodeValue`。为了保证渲染器核心的平台能力，我们需要将这两个操作 DOM 的 API 封装到渲染器的选项中。

```js
const renderer = createRenderer({
  createElement(tag) {
    // ...
  },
  setElementText(el, text) {
    // ...
  },
  insert(el, parent, anchor = null) {
    // ...
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(el, text) {
    el.nodeValue = text
  },
  patchProps(el, key, prevValue, nextValue) {
    // ...
  }
})
```

在上面这段代码中，我们在调用 `createRenderer` 函数创建渲染器时，传递的选项参数中封装了 `createText` 函数和 `setText` 函数。这两个函数分别用来创建文本节点和设置文本节点的内容。我们可以用这两个函数替换渲染器核心代码中所依赖的浏览器特有的 API。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    if (!n1) {
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2)
    }
  } else if (type === Text) {
    // 如果新的 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
    if (!n1) {
      // 如果没有旧节点，进行挂载
      // 使用 createTextMode 创建文本节点
      const el = n2.el = createText(n2.children)
      // 将文本节点插入到容器中
      insert(el, container)
    } else {
      // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
      const el = n2.el = n1.el
      if (n2.children !== n1.children) {
        setText(el, n2.children)
      }
    }
  }
}
```

注释节点的处理方式与文本节点的处理方式类似。不同的是，我们需要使用 `document.createComment` 函数创建注释节点元素。

#### Fragment

Fragment（片段）是 Vue.js 3 新增的一个 vnode 类型。在具体讨论 Fragment 的实现之前，我们有必要要先了解为什么需要 Fragment。请思考这样的场景，假设我们要封装一组组件列表：

```vue
<List>
	<Items />
</List>
```

整体由两个组件构成，即 `<List>` 组件和 `<Items>` 组件。其中 `<List>` 组件会渲染一个 `<ul>` 标签作为包裹层：

```vue
<!-- List.vue -->
<template>
	<ul>
    <slot />
  </ul>
</template>
```

而 `<Items>` 组件负责渲染一组 `<li>` 列表：

```vue
<!-- Items.vue -->
<template>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</template>
```

这在 Vue.js 中是无法实现的。在 Vue.js 中，组件的模板不允许存在多个根节点。这意味着，一个 `<Items>` 组件最多只能渲染一个 `<li>` 标签。

```vue
<!-- Item.vue -->
<template>
	<li>1</li>
</template>
```

因此在 Vue.js 中，我们通常需要配置 `v-for` 指令来达到目的：

```vue
<List>
	<Items v-for="item in list" />
</List>
```

类似的组合还有 `<select>` 标签与 `<option>` 标签。

而 Vue.js 3 支持多根节点模板，所以不存在上述问题，那么，Vue.js 3 是如何用 vnode 来描述多根节点模板的呢？答案是，使用 Fragment，如下面的代码所示：

```js
const Fragment = Symbol()
const vnode = {
  type: Fragment,
  children: [
    { type: 'li', children: 'text 1' },
    { type: 'li', children: 'text 2' },
    { type: 'li', children: 'text 3' },
  ]
}
```

与文本节点和注释节点类似，片段也没有所谓的标签名称，因此我们也需要为片段创建唯一标识，即 Fragment。对于 Fragment 类型的 vnode 来说，它的 children 存储的内容就是模板中所有根节点。有了 Fragment 后，我们就可以用它来描述 `Items.vue` 组件的模板了：

```vue
<!-- Items.vue -->
<template>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</template>
```

这段模板对应的虚拟节点是：

```js
const vnode = {
  type: 'Fragment',
  children: [
    { type: 'li', children: '1' },
    { type: 'li', children: '2' },
    { type: 'li', children: '3' }
  ]
}
```

类似地，对于如下模板：

```vue
<List>
	<Items />
</List>
```

我们可以利用下面这个虚拟节点来描述它：

```js
const vnode = {
  type: 'ul',
  children: [
    {
      type: 'Fragment',
      children: [
        { type: 'li', children: '1' },
        { type: 'li', children: '2' },
        { type: 'li', children: '3' }
      ]
    }
  ]
}
```

可以看到，`vnode.children` 数组包含一个类型为 `Fragment` 的虚拟节点。

当渲染器 `Fragment` 类型的虚拟节点时，由于 Fragment 本身并不会渲染任何内容，所以渲染器只会渲染 `Fragment` 的子节点。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
		// ...
  } else if (type === Text) {
    // 如果新的 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
    if (!n1) {
    	// ...
    } else {
  		// ...
    }
  } else if (type === Fragment) {
    // 处理 Fragment 类型的 vnode
    if (!n1) {
      // 如果旧 vnode 不存在，则只需要将 Fragment 的 children 逐个挂载即可
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 如果旧 vnode 存在，则只需要更新 Fragment 的 children 即可
      patchChildren(n1, n2, container)
    }
  }
}
```

观察上面这段代码，我们在 `patch` 函数中增加了对 `Fragment` 类型虚拟节点的处理。渲染 `Fragment` 的逻辑比想象中要简单的多，因为从本质上来说，渲染 `Fragment` 与渲染普通元素的区别在于，`Fragment` 本身并不渲染任何内容，所以只需要处理它的子节点即可。

但仍然需要注意一点，`unmount` 函数也需要支持 `Fragment` 类型的虚拟节点的卸载，如下面 `unmount` 函数的代码所示：

```js
function unmount(vnode) {
  // 卸载时，如果卸载的 vnode 类型为 Fragment，则需要卸载其 children
  if (vnode.type === Fragment) {
    vnode.children.forEach(c => unmount(c))
    return
  }
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}
```

当卸载 `Fragment` 类型的虚拟节点时，由于 `Fragment` 本身并不会渲染任何真实 DOM，所以只需要遍历它的 children 数组，并将其中的节点逐个卸载即可。

#### 总结

本篇文章，我们首先讨论了如果挂载子节点，以及节点属性。对于子节点，只需要递归地调用 patch 函数完成挂载即可。而节点的属性比想象中的复杂，它涉及两个重要的概念：HTML Attributes 和 DOM Properties。为元素设置属性时，我们不能总是使用 `setAttribute` 函数，也不能总是通过元素的 `DOM Properties` 来设置。至于如何正确地的为元素设置属性，取决于被设置属性的特点。例如，表单元素的 `el.form` 属性是只读的，因此只能使用 `setAttribute` 函数来设置。

接着，我们讨论了特殊属性的处理。以 class 属性为例，Vue.js 对 class 属性做了增强，它允许我们为 class 指定不同类型的值。但在把这些值设置给 DOM 元素之前，要对值进行正常化。我们还讨论了微元素设置 class 的三种方式及其性能情况。其中，`el.className` 的性能最优，所以我们选择在 `patchProps` 函数中使用 `el.className` 来完成 `class` 属性的设置。除了 class 属性之外，Vue.js 也对 style 属性做了增强，所以 style 属性也需要做类似的处理。

然后，我们讨论了卸载操作。一开始，我们直接使用 `innerHTML` 来清空容器元素，但是这样会存在诸多问题。

* 容器的内容可能是由某个或多个组件渲染的，当卸载操作发生时，应该正确地调用这些组件的 `beforeUnmount`、`unmounted` 等生命周期函数。
* 即使内容不是由组件渲染的，有的元素存在自定义指令，我们应该在卸载操作发生时正确地执行对应的指令钩子函数。
* 使用 `innerHTML` 清空容器元素内容的另一个缺陷是，它不会移除绑定在 DOM 元素上的事件处理函数。

因此，我们不能直接使用 `innerHTML` 来完成卸载任务。为了解决这些问题，我们还封装了 `unmount` 函数。该函数是以一个 vnode 的维度来完成卸载的，它会根据 `vnode.el` 属性取得该虚拟节点对应的真实 DOM，然后调用原生 DOM API 来完成 DOM 元素的卸载。这样做还有两点额外的好处。

* 在 unmount 函数内，我们有机会调用绑定在 DOM 元素上的指令钩子函数，例如 `beforeUnmount`、`unmounted` 等。
* 当 unmount 函数执行时，我们有机会检测虚拟节点 vnode 的类型。如果该虚拟节点描述的是组件，则我们也有机会调用组件相关的生命周期函数。

而后，我们讨论了 vnode 类型的区分。渲染器在执行更新时，需要优先检查新旧 vnode 所描述的内容是否相同。只有当它们所描述的内容相同时，才有打补丁的必要。另外，即使它们描述的内容相同，我们也需要进一步检查它们的类型，即检查 `vnode.type` 属性值的类型，据此判断它描述的具体内容是什么。如果类型是字符串，则它描述的是普通标签元素，这时我们会调用 `mountElement` 和 `patchComponent` 来完成挂载和打补丁。

我们还讲解了事件的处理。首先介绍了如何在虚拟节点中描述事件，我们把 `vnode.props` 对象中以字符串 on 开头的属性当作事件对待。接着，我们讲解了如何绑定和更新事件。在更新事件的时候，为了提升性能，我们伪造了 `invoker` 函数，并把真正的事件处理函数存储在 `invoker.value` 属性中，当事件需要更新时，只更新 `invoker.value` 的值即可，这样可以避免一次 `removeEventListener` 函数的调用。

我们还讲解了如何处理事件与更新时机的问题。解决方案是，利用事件处理函数被绑定到 DOM 元素的时间与事件触发时间的差异。我们需要屏蔽所有绑定时间晚于事件触发时间的事件处理函数的执行。

之后，我们讨论了子节点的更新。我们对虚拟节点中的 children 属性进行了规范化，规定 `vnode.children` 属性只能有以下三种类型。

* 字符串类型：代表元素具有文本子节点。
* 数组类型：代表元素具有一组子节点。
* null：代表元素没有子节点。

在更新时，新旧 vnode 的子节点都有可能是以上三种情况之一，所以在执行更新时，我们需要考虑九种可能。不过落实到代码中，我们并不需要罗列所有情况。另外，当新旧 vnode 都具有一组子节点时，我们采用比较笨的方式来完成更新，即卸载所有的旧节点，再挂载所有新子节点。更好的做法是，通过 Diff 算法比较新旧两组子节点，试图最大程度复用 DOM 元素。

我们还讨论了如何使用虚拟节点来描述文本节点和注释节点。我们利用了 symbol 类型值的唯一性，为文本节点和注释节点分别创建唯一标识，并将其作为 `vnode.type` 属性的值。

最后，我们讨论了 Fragment 及其用途。渲染器渲染 Fragment 的方式类似于渲染普通标签，不同的是，Fragment 本身并不会渲染任何 DOM 元素。所以，只需要渲染一个 Fragment 的所有子节点即可。

### 简易 Diff 算法

简单来说，当新旧 vnode 的字节点都是一组节点时，为了以最小的性能开销完成更新操作，需要比较两组子节点，用于比较的算法就叫做 Diff 算法。我们知道，操作 DOM 的性能开销通常比较大，而渲染器的核心 Diff 算法就是为了解决这个问题而诞生的。

#### 减少 DOM 操作性能开销

核心 Diff 只关心新旧虚拟节点都存在一组子节点的情况。如果我们针对两组子节点的更新，只采用卸载全部，再挂载全部新子节点。这么做确实可以完成更新，单由于没有复用任何 DOM 元素，会产生极大的性能开销。

以下面的新旧虚拟节点为例：

```js
const oldVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '1' },
    { type: 'p', children: '2' },
    { type: 'p', children: '3' }
  ]
}

const newVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '4' },
    { type: 'p', children: '5' },
    { type: 'p', children: '6' }
  ]
}
```

如果我们采用卸载全部，再挂载全部新子节点的方法，需要执行 6 次 DOM 操作：

* 卸载所有旧子节点，需要 3 次 DOM 删除操作；
* 挂载所有新子节点，需要 3 次 DOM 添加操作。

但是，通过观察上面新旧 vnode 的子节点，可以发现：

* 更新前后的所有子节点都是 p 标签，即便签元素不变；
* 只有 p 标签的子节点（文本节点）会发生变化。

例如，`oldVNode` 的第一个子节点是一个 p 标签，且该 p 标签的子节点类型是文本节点，内容是 “1”。而 `newVNode` 的第一个子节点也是一个 p 标签，它的子节点的类型也是文本节点，内容是 "4"。可以发现，更新前后改变的只有 `p` 标签文本节点的内容。所以，最理想的更新方式是，直接更新这个 p 标签的文本节点的内容。这样只需要一次 DOM 操作，即可完成一个 p 标签更新。新旧虚拟节点都有 3 个 p 标签作为子节点，所以一共只需要 3 次 DOM 操作就可以完成全部节点的更新。相比原来需要执行 6 次 DOM 操作才能完成更新的方式，性能提升了一倍。

按照这个思路，我们可以重新实现两组子节点的更新逻辑，如下面 `patchChildren` 函数的代码所示：

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    // 新旧 children
    const oldChildren = n1.children
    const newChildren = n2.children
    // 遍历旧 children
    for (let i = 0; i < oldChildren.length; i++) {
      patch(oldChildren[i], newChildren[i])
    }
  } else {
    // ...
  }
}
```

在前端代码中，`oldChildren` 和 `newChildren` 分别是旧的一组子节点和新的一组子节点。我们遍历前者，并将两者中对应位置的节点分别传递给 patch 函数进行更新。patch 函数在执行更新时，如果发现新旧子节点只有文本内容不同，只会更新其文本节点的内容。这样，我们就可以将 6 次 DOM 操作减少为 3 次。下图是整个更新过程的示意图。

<img src="./images/simple_diff01.png" />

这种做法虽然能够减少 DOM 操作次数，但问题也很明显。我们通过遍历旧的一组子节点，并假设新的一组子节点的数量与之相同，只有在这种情况下，这段代码才能正确地工作。但是，新旧两组子节点的数量未必相同。当新的一组子节点的数量少于旧的一组子节点的数量时，意味着有些节点在更新后应该被卸载。

<img src="./images/simple_diff02.png" />

当旧的一组子节点一共有 4 个 p 标签，而新的一组子节点中只有 3 个 p 标签。这说明，在更新过程中，需要将不存在的 p 标签卸载。类似地，新的一组子节点的数量也可能比旧的一组子节点的数量多。

<img src="./images/simple_diff03.png" />

当新的一组子节点比旧的一组子节点多了一个 p 标签。在这种情况下，我们应该挂载新增节点。

通过上面的分析我们意识到，在进行新旧两组子节点的更新时，不应该总是遍历旧的一组子节点或遍历新的一组子节点，而是应该遍历其中长度较短的那一组。这样，我们才能够尽可能多地调用 patch 函数进行更新。接着，再对比新旧两组子节点的长度，如果新的一组子节点更长，则说明有新子节点需要挂载，否则说明有旧子节点需要卸载。

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children
    
    const oldLen = oldChildren.length
    const newLen = newChildren.length

    const commonLength = Math.min(oldLen, newLen)

    for (let i = 0; i < commonLength; i++) {
      patch(oldChildren[i], newChildren[i])
    }

    if (newLen > oldLen) {
      for (let i = commonLength; i < newLen; i++) {
        patch(null, newChildren[i], container)
      }
    } else {
      for (let i = commonLength; i < oldLen; i++) {
        unmount(oldChildren[i])
      }
    }
  } else {
    // ...
  }
}
```

这样，无论新旧两组子节点的数量关系如何，我们都可以正确地挂载或卸载它们。

#### DOM 复用与 key 的作用

我们可以通过减少 DOM 操作的次数，提升更新性能。但这种方式仍存在可优化的空间。举个例子，假设新旧两组子节点的内容如下：

```js
[
  { type: 'p' },
  { type: 'div' },
  { type: 'span' }
]

[
  { type: 'span' },
  { type: 'p' },
  { type: 'div' }
]
```

如果使用上面介绍的算法来完成上述两组子节点的更新，则需要 6 次 DOM 操作。

但是，观察新旧两组子节点，很容易发现，二者只是顺序不同。所以最优的处理方式是，通过 DOM 的移动来完成子节点的更新，这要比不断地执行子节点的卸载和挂载性能更好。但是，想要通过 DOM 的移动来完成更新，必须要保证一个前提：新旧两组子节点中的确存在可复用的节点。这个很好理解，如果新的子节点没有在旧的一组子节点中出现，就无法通过移动节点的方式完成更新。所以现在问题就变成：应该如何确定新的子节点是否出现在旧的一组子节点中。拿上面的例子来说，如果确定新的一组子节点中第 1 个子节点 `{ type: 'sppan' }` 与旧子节点中的第 3 个子节点相同呢？一种解决方案是，通过 `vnode.type` 来判断，只要 `vnode.type` 的值相同，我们就认为两者是相同的节点。但这种方式并不可靠。

```js
[
  { type: 'p', children: '1' },
  { type: 'p', children: '2' },
  { type: 'p', children: '3' }
]

[
  { type: 'p', children: '3' },
  { type: 'p': children: '1' },
  { type: 'p', children: '2' }
]
```

观察上面两组子节点，我们发现，这个案例可以通过移动 DOM 的方式来完成更新，但是所有节点的 `vnode.type` 属性值都相同，这导致我们无法确定新旧两组子节点中节点的对应关系，也就无法得知应该进行怎样的 DOM 移动才能完成更新。这时，我们就需要引入额外的 key 来作为 vnode 的标识，如下面的代码所示：

```js
[
  { type: 'p', children: '1', key: 1 },
  { type: 'p', children: '2', key: 2 },
  { type: 'p', children: '3', key: 3 }
]

[
  { type: 'p', children: '3', key: 3 },
  { type: 'p': children: '1', key: 1 },
  { type: 'p', children: '2', key: 2 }
]
```

key 属性就像虚拟节点的 “身份证” 号，只要两个虚拟节点的 type 属性值和 key 属性值都相同，那么我们就认为它们是相同的，即可以进行 DOM 的复用。下图展示了有 key 和无 key 时新旧两组子节点的映射情况。

<img src="./images/simple_diff04.png" />

如果没有 key，我们无法知道新子节点与旧子节点间的映射关系，也就无法知道应该如何移动节点。有 key 的话情况则不同，我们根据子节点的 key 属性，能够明确知道新子节点在旧子节点中的位置，这样就可以进行相应的 DOM 移动操作了。

有必要强调一点是，DOM 可复用并不意味着不需要更新，如果下面的两个虚拟节点所示：

```js
const oldVNode = { type: 'p', key: 1, children: 'text 1' }
const newVNode = { type: 'p', key: 1, children: 'text 2' }
```

这两个虚拟节点拥有相同的 key 值和 `vnode.type` 属性值。这意味着，在更新时可以复用 DOM 元素，即只需要通过移动操作来完成更新。但仍需要对这两个虚拟节点进行打补丁操作，因为新的虚拟节点（`newVNode`）的文本子节点的内容已经改变了。因此，在讨论如何移动 DOM 之前，我们需要先完成打补丁操作。

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children

    const oldLen = oldChildren.length
    const newLen = newChildren.length

    // 判断是否可以复用
    for (let i = 0; i < newChildren.length; i++) {
      const newVNode = newChildren[i]
      for (let j = 0; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]
        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
          patchChildren(oldVNode, newVNode, container)
          break;
        }
      }
    }

		// ...
  } else {
    // ...
  }
}
```

在上面这段代码中，我们重新实现了新旧两组子节点的更新逻辑。可以看到，我们使用了两层 for 循环，外层循环用于遍历新的一组子节点，内层循环则遍历旧的一组子节点。在内层循环中，我们逐个对比新旧子节点的 key 值，试图在旧的子节点中找到可复用的节点。一旦找到，则调用 patch 函数进行打补丁。经过这一步操作后，我们能保证所有可复用的节点本身都经过更新完毕。

```js
const oldVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: 'hello', key: 3 }
  ]
}

const newVNode = {
  type: 'div',
  children: [
    { type: 'p', children: 'world', key: 3 },
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
  ]
}

renderer.renderer(oldVNode, document.querySelector('#app'))
setTimeout(() => {
  renderer.renderer(newVNode, document.querySelector('#app'))
}, 1000)
```

运行上面这段代码，1 秒后，key 值为 3 的子节点对应的真实 DOM 的文本内容会由 “hello” 更新为字符串 “world”。

更新操作具体过程分析如下：

* 第一步，取新的一组子节点中的第一个子节点，即 key 值为 3 的节点。尝试在旧的一组子节点中寻找具有相同 key 值的节点。我们发现，旧的子节点 `oldVNode[2]` 的 key 值为 3，于是调用 patch 函数进行打补丁。在这一步操作完成之后，渲染器会把 key 值为 3 的虚拟节点所对应的真实 DOM 的文本内容由字符串 “hello” 更新为字符串 “world”。
* 第二步，取新的一组子节点中的第二个子节点，即 key 值为 1 的节点。尝试在旧的一组子节点寻找具有相同 key 值的节点。我们发现，旧的子节点 `oldVNode[0]` 的 key 值为 1，于是调用 patch 函数进行打补丁。由于 key 值等于 1 的新旧子节点没有任何差异，所以什么都不会做。
* 第三步，取新的一组子节点中的最后一个子节点，即 key 值为 2 的节点，最终结果与第二步相同。

经过上述更新操作，所有节点对应的真实 DOM 元素都更新完毕了。但真实 DOM 仍然保持旧的一组子节点的顺序，即 key 值为 3 的节点对应的真实 DOM 仍然是最后一个子节点。由于在新的一组子节点中，key 值为 3 的节点已经变为第一个子节点了，因此我们还需要通过移动节点来完成真实 DOM 顺序的更新。

#### 找到需要移动的元素

现在，我们已经能够通过 key 值找到可复用的节点了。接下来需要思考的时候，如何判断一个节点是否需要移动，以及如何移动。对于第一个问题，我们可以采用逆向思维的方式，先想一想在什么情况下节点不需要移动？答案很简单，当新旧两组子节点的节点顺序不变时，就不需要额外的移动操作。

<img src="./images/simple_diff05.png" />

当新旧两组子节点的顺序没有发生变化：

* key 值为 1 的节点在旧 children 数组中的索引为 0；
* key 值为 2 的节点在旧 children 数组中的索引为 1；
* key 值为 3 的节点在旧 children 数组中的索引为 2。

接着，我们对新旧两组子节点采用上一节介绍的更新算法，看看新旧两组子节点的顺序没有发生变化时，更新算法具有怎么的特点。

* 第一步：取新的一组子节点中的第一个节点 `p-1` ，它的 key 为 1。尝试在旧的一组子节点中找到具有相同 key 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 0；
* 第二步：取新的一组子节点中的第二个节点 `p-2`，它的 key 为 2。尝试在旧的一组子节点中找到具有相同 key 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 1；
* 第三步：取新的一组子节点中的第二个节点 `p-3`，它的 key 为 3。尝试在旧的一组子节点中找到具有相同 key 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 2。

在这个过程中，第一次寻找可复用的节点时，都会记录该可复用节点在旧的一组子节点中的位置索引。如果把这些位置索引值按照先后顺序排列，则可以得到一个序列：0、1、2。这是一个递增的序列，在这种情况下不需要移动任何节点。

我们再来看另外一个例子。

<img src="./images/simple_diff06.png" />

同样，我们根据图中的例子再次执行更新算法。

* 第一步：取新的一组子节点中的第一个节点 `p-3` ，它的 key 为 3。尝试在旧的一组子节点中找到具有相同 key 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 2；
* 第一步：取新的一组子节点中的第一个节点 `p-1` ，它的 key 为 1。尝试在旧的一组子节点中找到具有相同 key 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 0。节点 `p-1` 对应的真实 DOM 需要移动。
* 第一步：取新的一组子节点中的第一个节点 `p-2` ，它的 key 为 2。尝试在旧的一组子节点中找到具有相同 key 值的可复用节点，发现能够找到，并且该节点在旧的一组子节点中的索引为 1。节点 `p-2` 对应的真实 DOM 需要移动。

以上就是 Diff 算法在执行更新的过程中，判断节点是否需要移动的方式。在上面的例子中，我们可以得出节点 `p-1` 和节点 `p-2` 需要移动的结论。这是因为在旧的 children 中的索引要小于节点 `p-3` 在旧 children 中的索引。如果我们按照先后顺序记录在寻找节点过程中所遇到的位置索引，将会得到序列：2、0、1。可以发现，这个序列不具有递增的趋势。

其实我们可以将节点 `p-3` 在旧 children 中的索引定义为：在旧 children 中寻找具有相同 key 值节点的过程中，遇到的最大索引值。如果在后续寻找的过程中，存在索引值比当前遇到的最大索引值还要小的节点，则意味着该节点需要移动。

我们可以用 `lastIndex` 变量存储整个寻找过程中遇到的最大索引值，如下面的代码所示：

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children

    const oldLen = oldChildren.length
    const newLen = newChildren.length

    // 存储寻找过程中遇到的最大索引值
    let lastIndex = 0

    for (let i = 0; i < newChildren.length; i++) {
      const newVNode = newChildren[i]
      for (let j = 0; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]

        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
          patchChildren(oldVNode, newVNode, container)

          if (j < lastIndex) {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
            // 说明该节点对应的真实 DOM 需要移动
          } else {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值
            // 则更新 lastIndex 的值
            lastIndex = j
          }
          break;
        }
      }
    }
  } else {
    // ...
  }
}
```

如以上代码及注释所示，如果新旧节点的 key 值相同，说明我们在旧 children 中找到了可复用的 DOM 的节点。此时我们用该节点在旧 children 中的索引 j 与 `lastIndex` 进行比较，如果 j 小于 `lastIndex` ，说明当前 `oldVnode` 对应的真实 DOM 需要移动，否则说明不需要移动。但此时应该将变量 j 的值赋值给变量 `lastIndex` ，以保证寻找节点的过程中，变量 `lastIndex` 始终存储着当前遇到的最大索引值。

现在，我们已经找到了需要移动的节点，下面我们将讨论如何移动节点，从而完成节点顺序的更新。

#### 如何移动元素

我们讨论了如何判断节点是否需要移动。移动节点指的是，移动一个虚拟节点所对应的真实 DOM 节点，并不是移动虚拟节点本身。既然移动的时真实 DOM 节点，那么就需要取得对它的引用。我们知道，当一个虚拟节点被挂载后，其对应的真实 DOM 节点会存在它的 `vnode.el` 属性中。

<img src="./images/simple_diff07.png" />

因此，在代码中，我们可以通过旧子节点的 `vnode.el` 属性取得它对应的真实 DOM 节点。

当更新操作发生时，渲染器会调用 `patchElement` 函数在新旧虚拟节点之间进行打补丁。

```js
function patchElement (n1, n2) {
  // 新的 vnode 也引用了真实 DOM 元素
  const el = n2.el = n1.el
  // ...
}
```

可以看到，`patchElement` 函数首先将旧节点的 `n1.el` 属性赋值给新节点的 `n2.el` 属性。这个赋值语句其实就是 DOM 元素的复用。在复用 DOM 元素之后，新节点也将持有对真实 DOM 的引用。

<img src="./images/simple_diff08.png" />

可以看到，无论是新子节点还是旧子节点，都存在对真实 DOM 的引用，在此基础上，我们就可以进行 DOM 移动操作了。

```js
const oldVNode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: 'hello', key: 3 }
  ]
}

const newVNode = {
  type: 'div',
  children: [
    { type: 'p', children: 'world', key: 3 },
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
  ]
}
```

<img src="./images/simple_diff06.png" />

以图示为例， 它的更新步骤如下：

* 第一步：取新的一组子节点中第一个节点 p-3，它的 key 为 3，尝试在旧的一组子节点中找到具有相同 key 值的可复用节点。发现可以找到，并且该节点在旧的一组子节点中的索引为 2。此时变量 `lastIndex` 的值为 0，索引 2 不小于 0，所以节点 p-3 对应的真实 DOM 不需要移动，但需要更新变量 `lastIndex`　的值为　２.

* 第二步：取新的一组子节点中第二个节点 p-1，它的 key 为 1，尝试在旧的一组子节点中找到具有相同 key 值的可复用节点。发现可以找到，并且该节点在旧的一组子节点中的索引为 0。此时变量 `lastIndex` 的值为 2，索引 0 小于 2，所以节点 p-1 对应的真实 DOM 需要移动。

  我们发现，节点 p-1 对应的真实 DOM 需要移动，但是应该移动到哪？我们知道，新 children 的顺序其实就是更新后真实 DOM 节点应有的顺序。所以节点 p-1 在新 children 中的位置就代表真实 DOM 更新后的位置。由于节点 p-1 在新 children 中排在节点 p-3 后面，所以我们应该把节点 p-1 所对应的真实 DOM 移动导节点 p-3 所对应的真实 DOM 后面。

  这样操作后，此时真实 DOM 的顺序为 p-2、p-3、p-1。

<img src="./images/simple_diff09.png" />

* 第三步：取新的一组子节点中第二个节点 p-2 ，它的 key 为 2，尝试在旧的一组子节点中找到具有相同 key 值的可复用节点。发现可以找到，并且该节点在旧的一组子节点中的索引为 1。此时变量 `lastIndex` 的值为 2，索引 1 小于 2，所以节点 p-2 对应的真实 DOM 需要移动。

  第三步和第二步类似，节点 p-2 对应的真实 DOM 也需要移动。同样，由于节点 p-2 在新 children 中排在节点 p-1 后面，所以我们应该把节点 p-2 对应的真实 DOM 移动到节点 p-1 对应的真实 DOM 后面。

<img src="./images/simple_diff10.png" />

经过这一步移动操作之后，我们发现，真实 DOM 的顺序与新的一组子节点的顺序想通了。至此，更新操作完成。

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children

    const oldLen = oldChildren.length
    const newLen = newChildren.length

    // 存储寻找过程中遇到的最大索引值
    let lastIndex = 0

    for (let i = 0; i < newChildren.length; i++) {
      const newVNode = newChildren[i]
      let j = 0;
      for (j; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]

        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
          patch(oldVNode, newVNode, container)

          if (j < lastIndex) {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
            // 说明该节点对应的真实 DOM 需要移动
            // 获取 newVNode 的前一个 vnode，即 prevVNode
            const prevVNode = newChildren[i - 1]
            // 如果 prevVnode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            if (prevVNode) {
              // 由于我们要将 newVnode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面
              // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
              const anchor = prevVNode.el.nextSibling
              // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面
              // 也就是 prevVNode 对应的真实 DOM 后面
              insert(newVnode.el, container, anchor)
            }
          } else {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值
            // 则更新 lastIndex 的值
            lastIndex = j
          }
          break;
        }
      }
    }
  } else {
    // ...
  }
}
```

在这段代码中，如果条件 `j < lastIndex` 成立，则说明当前 `newVNode` 所对应的真实 DOM 需要移动。根据前文的分析可知，我们需要获取当前 `newVNode` 节点的前一个虚拟节点，即 `newChildren[i - 1]` ，然后使用 insert 函数完成节点的移动，其中 insert 函数依赖浏览器原生的 `insertBefore` 函数。

```js
const renderer = createRenderer({
  insert (el, parent, anchor = null) {
    // insertBefore 需要描点元素 anchor
    parent.insertBefore(el, anchor)
  }
})
```

#### 添加新元素

本小节我们将讨论添加新节点的情况。

<img src="./images/simple_diff11.png" />

从图中可知，在新的一组子节点中，多出来一个节点 p-4，它的 key 值为 4，该节点在旧的一组子节点不存在，因此应该将其视为新增节点。对于新增节点，在更新时我们应该正确地将它挂载，这主要分为两步：

* 找到新增节点；
* 将新增节点挂载到正确位置。

首先，我们来看一下如何找到新增节点。为了搞清楚这个问题，我们需要根据图中给出的例子模拟执行下逻辑。在此之前，我们需要弄清楚新旧两组子节点与真实 DOM 元素的当前状态。

<img src="./images/simple_diff12.png" />

接着，我们开始模拟更新逻辑。

* 第一步：取新的一组子节点中第一个节点  p-3，它的 key 值为 3，尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 2。此时，变量 `lastIndex` 的值为 0，索引值 2 不小于 `lastIndex` 的值 0，所以节点 p-3 对应的真实 DOM 不需要移动，但是需要将变量 `lastIndex` 的值更新为 2。
* 第二步：取新的一组子节点中第一个节点  p-1，它的 key 值为 1，尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 0。此时，变量 `lastIndex` 的值为 2，索引值 0 小于 `lastIndex` 的值 2，所以节点 p-1 对应的真实 DOM 需要移动，并且应该移动到节点 p-3 对应的真实 DOM 后面。经过这一步的移动操作后，真实 DOM 的顺序为 p-2、p-3、p-1。
* \kl;
* 第三步：取新的一组子节点中第一个节点  p-4，它的 key 值为 4，尝试在旧的一组子节点中寻找可复用的节点。由于在旧的一组子节点中，没有 key 值为 4 的节点，因此渲染器会把节点 p-4 看作新增节点并挂载它。但是，应该将挂载到哪里呢？为了搞清楚这个问题，我们需要观察节点 p-4 在新的一组子节点中的位置。由于节点 p-4 出现在节点 p-1 后面，我们我们应该把节点 p-4 挂载到节点 p- 1 所对应的真实 DOM 后面。经过这一步操作后，此时真实 DOM 的顺序是：p-2、p-3、p-1、p-4，其中 p-4 是刚刚挂载的。
* 第四步：取新的一组子节点中第一个节点  p-2，它的 key 值为 2，尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 1。此时，变量 `lastIndex` 的值为 2，索引值 1 小于 `lastIndex` 的值 2，所以节点 p-2 对应的真实 DOM 需要移动，并且应该移动到节点 p-4 对应的真实 DOM 后面。经过这一步的移动操作后，真实 DOM 的顺序为 p-3、p-1、p-4、p-2。至此，真实 DOM 顺序已经与新的一组子节点的顺序相同，更新完成。

接着，我们来实现代码。

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children

    const oldLen = oldChildren.length
    const newLen = newChildren.length

    // 存储寻找过程中遇到的最大索引值
    let lastIndex = 0

    for (let i = 0; i < newChildren.length; i++) {
      const newVNode = newChildren[i]
      let j = 0;

      // 第一层循环中定义变量 find，代表是否在旧的一组子节点中找到可复用的节点，
      // 初始值为 false，代表没找到
      let find = false

      for (j; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]

        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
          // 找到可复用的节点，将变量 find 的值设置为 true
          find = true

          patch(oldVNode, newVNode, container)

          if (j < lastIndex) {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
            // 说明该节点对应的真实 DOM 需要移动
            // 获取 newVNode 的前一个 vnode，即 prevVNode
            const prevVNode = newChildren[i - 1]
            // 如果 prevVnode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            if (prevVNode) {
              // 由于我们要将 newVnode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面
              // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
              const anchor = prevVNode.el.nextSibling
              // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面
              // 也就是 prevVNode 对应的真实 DOM 后面
              insert(newVnode.el, container, anchor)
            }
          } else {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值
            // 则更新 lastIndex 的值
            lastIndex = j
          }
          break;
        }
      }

      // 如果代码运行到这里，find 仍然是 false
      // 说明当前 newVNode 没有在旧的一组子节点中找到可复用的节点
      // 也就是说，当前 newVNode 是新增节点，需要挂载
      if (!find) {
        // 为了将节点挂载到正确位置，我们需要先获取锚点元素
        // 首先获取当前 newVNode 的前一个 vnode 节点
        const parentVNode = newChildren[i - 1]
        
        let anchor = null

        if (prevVNode) {
          // 如果存在前一个 vnode 节点，则使用它的下一个兄弟节点作为锚点元素
          anchor = prevVNode.el.nextSibling
        } else {
          // 如果没有前一个 vnode 节点，说明即将挂载的新节点是第一个子节点
          // 这时我们使用容器元素的 fristChild 作为锚点
          anchor = container.firstChild
        }

        // 挂载 newVNode
        patch(null, newVnode, container, anchor)
      }
    }
  } else {
    // ...
  }
}
```

观察上面这段代码。首先，我们在外层循环中定义了名为 find 的变量，它代表渲染器能否在旧的一组子节点中找到可复用的节点。变量 find 的初始值为 false，一旦寻找到可复用的节点，则将变量 find 的值设置为 true。如果内层循环结束后，变量 find 的值仍然为 false，则说明 `newVNode` 是一个全新的节点，需要挂载它。为了将节点挂载到正确位置，我们需要先获取锚点元素：找到 `newVNode` 的前一个虚拟节点，即 `preVNode`，如果存在，则使用它对应的真实 DOM 的下一个兄弟节点作为锚点元素；如果不存在，则说明即将挂载的 `newVNode` 节点是容器元素的第一个子节点，此时应该使用容器元素的 `container.firstChild` 作为锚点元素。最后，将锚点元素 anchor 作为 patch 函数的第四个参数，调用 patch 函数完成节点的挂载。

```js
function patch (n1, n2, container, anchor) {
  // ...
  if (typeof type === 'string') {
    if (!n1) {
      // 挂载时将锚点元素作为第三个参数传递给 mountElement 函数
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2)
    }
  } else if (type === Text) {
    // ...
  } else if (type === Fragment) {
    // ...
  }
}

function mountElement (vnode, container, anchor) {
  // ...

  // 插入节点时，将锚点元素透传给 insert 函数
  insert(el, container, anchor)
}
```

#### 移动不存在的元素

在更新子节点时，不仅会遇到新增元素，还会出现元素被删除的情况。

<img src="./images/simple_diff13.png" />

在新的一组节点中，节点 p-2 已经不存在了，这说明该节点被删除了。渲染器应该能找到那些需要删除的节点并正确地将其删除。

首先我们来讨论如何找到需要删除的节点。

<img src="./images/simple_diff14.png" />

现在我们开始模拟执行更新的过程。

* 第一步：取新的一组子节点中的第一个节点 p-3，它的 key 值为 3。尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 2 。此时变量 `lastIndex` 的值 为 0，索引 2 不小于 `lastIndex` 的值 0，所以节点 p-3 对应的真实 DOM 不需要移动，但需要更新变量 `lastIndex` 的值为 2。
* 第二步：取新的一组子节点中的第一个节点 p-1，它的 key 值为 1。尝试在旧的一组子节点中寻找可复用的节点。发现能够找到，并且该节点在旧的一组子节点中的索引值为 0 。此时变量 `lastIndex` 的值 为 2，索引 0 小于 `lastIndex` 的值 2，所以节点 p-1 对应的真实 DOM 需要移动，并且应该移动到节点 p-3 对应的真实 DOM 后面。经过这一步的移动操作后，真实 DOM 的状态如下：

<img src="./images/simple_diff15.png" />

至此，更新结束。不过我们会发现，节点 p-2 对应的真实 DOM 仍然存在，所以需要增加额外的逻辑来删除遗留节点。思路很简单，当基本的更新结束时，我们需要遍历旧的一组子节点，然后取新的一组子结点中寻找具有相同 key 值得节点。如果找不到，则说明应该删除该节点。

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children
    const newChildren = n2.children

    const oldLen = oldChildren.length
    const newLen = newChildren.length

    // 存储寻找过程中遇到的最大索引值
    let lastIndex = 0
    for (let i = 0; i < newChildren.length; i++) {
      const newVNode = newChildren[i]
      let j = 0;

      // 第一层循环中定义变量 find，代表是否在旧的一组子节点中找到可复用的节点，
      // 初始值为 false，代表没找到
      let find = false

      for (j; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]

        // 如果找到具有相同 key 值的节点，说明可以复用，但是仍需要调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
          // 找到可复用的节点，将变量 find 的值设置为 true
          find = true

          patch(oldVNode, newVNode, container)

          if (j < lastIndex) {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值 lastIndex
            // 说明该节点对应的真实 DOM 需要移动
            // 获取 newVNode 的前一个 vnode，即 prevVNode
            const prevVNode = newChildren[i - 1]
            // 如果 prevVnode 不存在，说明当前 newVNode 是第一个节点，不需要移动
            if (prevVNode) {
              // 由于我们要将 newVNode 对应的真实 DOM 移动到 prevVNode 所对应真实 DOM 后面
              // 所以我们需要获取 prevVNode 所对应真实 DOM 的下一个兄弟节点，并将其作为锚点
              const anchor = prevVNode.el.nextSibling
              // 调用 insert 方法将 newVNode 对应的真实 DOM 插入到锚点元素前面
              // 也就是 prevVNode 对应的真实 DOM 后面
              insert(newVNode.el, container, anchor)
            }
          } else {
            // 如果当前找到的节点在旧 children 中的索引小于最大索引值
            // 则更新 lastIndex 的值
            lastIndex = j
          }
          break;
        }
      }

      // 如果代码运行到这里，find 仍然是 false
      // 说明当前 newVNode 没有在旧的一组子节点中找到可复用的节点
      // 也就是说，当前 newVNode 是新增节点，需要挂载
      if (!find) {
        // 为了将节点挂载到正确位置，我们需要先获取锚点元素
        // 首先获取当前 newVNode 的前一个 vnode 节点
        const parentVNode = newChildren[i - 1]
        
        let anchor = null

        if (prevVNode) {
          // 如果存在前一个 vnode 节点，则使用它的下一个兄弟节点作为锚点元素
          anchor = prevVNode.el.nextSibling
        } else {
          // 如果没有前一个 vnode 节点，说明即将挂载的新节点是第一个子节点
          // 这时我们使用容器元素的 fristChild 作为锚点
          anchor = container.firstChild
        }

        // 挂载 newVNode
        patch(null, newVNode, container, anchor)
      }
    }

    // 上一步得更新操作完成后
    // 遍历旧的一组子节点
    for (let i = 0; i < oldChildren.length; i++) {
      const oldVNode = oldChildren[i]
      // 拿旧子节点 oldVNode 去新的一组子节点中寻找具有相同 key 值得节点
      const has = newChildren.find(vnode => vnode.key === oldVNode.key)
      if (!has) {
        // 如果没有找到具有相同 key 值得节点，则说明需要删除该节点
        // 调用 unmount 函数将其卸载
        unmount(oldVNode)
      }
    }
  } else {
    // ...
  }
}
```

如以上代码注释所示，在上一步得更新操作完成后，我们还需要遍历旧得一组子节点，目的是检查旧子节点在新的一组子节点中是否仍然存在，如果已经不存在，则调用 unmount 函数将其卸载。

#### 总结

本篇文章，我们首先讨论了 Diff 算法的作用。Diff 算法用来计算两组子节点的差异，并试图最大程度地复用 DOM 元素。通过遍历新旧两组子节点中数量多的那一组，逐个调用 patch 函数进行打补丁，然后比较新旧两组子节点的数量，如果新的一组子节点数量更多，说明新子节点需要挂载。否则说明在旧的一组子节点中，有节点需要卸载。

然后，我们讨论子虚拟节点中 key 属性的作用。在更新时，渲染器通过 key 属性找到可复用的节点，然后尽可能地通过 DOM 移动操作来完成更新，避免过多地对 DOM 元素进行销毁和重建。

接着，我们讨论了简单 Diff 算法时如何寻找要移动的节点的。简单 Diff 算法的核心逻辑时，拿新的一组子节点中的节点去旧的一组子节点中寻找可复用的节点。如果找到，则记录该节点的位置索引。然后我们把逐个位置索引称为最大索引。在整个更新过程中，如果一个节点的索引值小于最大索引，则说明该节点对应的真实 DOM 元素需要移动。

最后，我们通过几个例子讲解了渲染器是如何移动、添加、删除虚拟节点所对应的 DOM 元素的。

### 双端 Diff 算法

我们已经介绍过简易 Diff 算法的实现原理。简易 Diff 算法利用虚拟节点的 key 属性，尽可能复用 DOM 元素，并通过移动 DOM 的方式来完成更新，从而减少不断创建和销毁 DOM 元素带来的性能开销。但是，简易 Diff 算法仍然存在很多缺陷，这些缺陷可以通过双端 Diff 算法解决。

#### 双端比较的原理

简易 Diff 算法的问题在于，它对 DOM 的移动操作并不是最优的。

<img src="./images/double_diff01.png" />

以图中的例子来看，如果使用简单 Diff 算法来更新它，会发生两次 DOM 移动操作。

第一次 DOM 移动操作会将真实 DOM 节点 p-1 移动到真实 DOM 节点 p-3 后面。第二次移动操作会将真实 DOM 节点 p-2 移动到真实 DOM 节点 p-1 后面。最终真实 DOM 节点的顺序和新的一组子节点顺序一致：p-3、p-1、p-2。

<img src="./images/double_diff02.png" />

但是，上述更新过程并非最优解。在这个例子中，其实只需要通过一步 DOM 节点的移动操作就可以完成更新，只需要把真实 DOM 节点 p-3 移动到真实 DOM 节点 p-1 前面。

<img src="./images/double_diff03.png" />

可以看到，理论上我们只需要一次 DOM 移动操作即可完成更新。但简单 Diff 算法做不到这一点。这就需要我们使用双端 Diff 算法。

顾名思义，双端 Diff 算法是一种对新旧两组子节点的两个端点进行比较的算法。因此，我们需要四个索引值，分别指向新旧两组子节点的端点。

<img src="./images/double_diff04.png" />

用代码来表达四个端点，如下面的 `patchChildren` 和 `patchKeyedChildren` 函数：

```js
function patchChildren (n1, n2, container) {
  if (typeof n2.children === 'string') {
    // ...
  } else if (Array.isArray(n2.children)) {
    // 封装 patchKeyedChild 函数处理两组子节点
    patchKeyedChildren(n1, n2, container)
  } else {
    // ...
  }
}

function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1
}
```

上面这段代码中，我们将两组子节点的打补丁工作封装到了 `patchKeyedChildren` 函数中。在该函数内，首先获取新旧两组子节点 `oldChildren` 和 `newChildren` ，接着创建四个索引值，分别指向新旧两组子节点的头和尾，即 `oldStartIdx`、`oldEndIdx`、`newStartIdx` 和 `newEndIdx` 。有了索引后，就可以找到它所指向的虚拟节点了。

```js
function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1

  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNodoe = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNODE = newChildren[newEndIdx]
}
```

其中，`oldStartVNode` 和 `oldEndVNode` 是旧的一组子节点中的第一个和最后一个节点，`newStartVNode` 和 `newEndVNode` 则是新的一组子节点中的第一个节点和最后一个节点。有了这些信息后，我们就可以进行双端比较了。

<img src="./images/double_diff05.png" />

在双端比较中，每一轮比较都分为四个步骤。

* 第一步：比较旧的一组子节点中的第一个子节点 p-1 与新的一组子节点中的第一个子节点 p-4，看看它们是否相同。由于两者的 key 值不同，因此不相同，不可复用，于是怎么都不做。
* 第二步：比较旧的一组子节点中的最后一个子节点 p-4 与新的一组子节点中的最后一个子节点 p-3 ，看看它们是否相同。由于两者的 key 值不同，因此不相同，不可复用，于是什么都不做。
* 第三步：比较旧的一组子节点中的第一个子节点 p-1 与新的一组子节点中的最后一个子节点 p-3，看看它们是否相同。由于两者的 key 值不同，因此不相同，不可复用，于是什么都不做。
* 第四步：比较旧的一组子节点中的最后一个子节点 p-4 与新的一组子节点中的第一个子节点 p-4。由于它们的 key 值相同，因此可以进行 DOM 复用。

可以看到，我们在第四步时找到了相同的节点，这说明它们对应的真实 DOM 节点可以复用。对于可复用的 DOM 节点，我们只需要通过 DOM 移动操作完成更新即可。那么应该如何移动 DOM 元素呢？

第四步是比较旧的一组子节点的最后一个子节点与新的一组子节点的第一个子节点。换句话来说，节点 p-4 在更新之后应该是第一个子节点。对应到程序的逻辑，可以将其翻译为：将索引 `oldEndIdx` 指向的虚拟节点所对应的真实 DOM 移动到索引 `oldStartIdx` 指向的虚拟节点所对应的真实 DOM 前面。

```js
function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1

  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]

  if (oldStartVNode.key === newStartVNode.key) {
    // 第一步：oldStartVNode 和 newStartVNode 比较
  } else if (oldEndVNode.key === newEndVNode.key) {
    // 第二步：oldEndVNode 和 newEndVNode 比较
  } else if (oldStartVNode.key === newEndVNode.key) {
    // 第三步：oldStartVNode 和 newEndVNode 比较
  } else if (oldEndVNode.key === newStartVNode.key) {
    // 第四步：oldEndVNode 和 newStartVNode 比较

    // 仍然需要调用 patch 函数进行打补丁
    patch(oldEndVNode, newStartVNode, container)
    // 移动 DOM 操作
    // oldEndVNode.el 移动到 oldStartVNode.el 前面
    insert(oldEndVNode.el, container, oldStartVNode.el)
    // 移动 DOM 完成后，更新索引值，并指向下一个位置
    oldEndVNode = oldChildren[--oldEndIdx]
    newStartVNode = newChildren[++newStartIdx]
  }
}
```

在这段代码中，我们增加了一系列的 `if...else if ...` 语句，用来实现四个索引指向的虚拟节点之间的比较。当我们在第四步中找到具有相同 key 值的节点。这说明，原来处于尾部的节点在新的顺序中应该处于头部。于是，我们只需要以头部元素 `oldStartVNode.el` 作为锚点，将尾部元素 `oldEndVNode.el` 移动到锚点前面即可。但需要注意的是，在进行 DOM 的移动操作之前，仍然需要调用 `patch` 函数在新旧虚拟节点之间打补丁。

这一步 DOM 的移动操作完成会，接下来就是比较关键的步骤，即更新索引值，由于第四步涉及的两个索引分别是 `oldEnIdx` 和 `newStartIdx`，所以我们需要更新两者的值，让它们各自朝正确的方向前进一步，并指向下一个节点。

<img src="./images/double_diff06.png" />

此时，真实 DOM 节点顺序为 p-4、p-1、p-2、p-3，这与新的一组子节点顺序不一致。这时因为 Diff 算法还没有结束，还需要进行下一轮更新。因此，我们需要将更新逻辑封装到一个 while 循环中。

```js

function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1

  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较

      // 仍然需要调用 patch 函数进行打补丁
      patch(oldEndVNode, newStartVNode, container)
      // 移动 DOM 操作
      // oldEndVNode.el 移动到 oldStartVNode.el 前面
      insert(oldEndVNode.el, container, oldStartVNode.el)
      // 移动 DOM 完成后，更新索引值，并指向下一个位置
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}
```

由于在每一轮更新完成之后，紧接着都会更新四个索引中与当前更新轮次相关联的索引，所以整个 while 循环执行的条件是：头部索引值要小于等于尾部索引值。

在第一轮更新结束后循环条件仍然成立，因此需要进行下一轮的比较。

* 第一步：比较旧得一组子节点中得头部节点 p-1 与新得一组子节点中得头部节点 p-2，看看它们是否相同。由于两者的 key 值不同，不可复用，所以什么都不做。

  这里我们使用了新的名词：头部节点。它指的是头部索引 `oldStartIdx` 和 `newStartIdx` 所指向的节点。

* 第二步：比较旧的一组子节点中的尾部节点 p-3 与新的一组子节点中的尾部节点 p-3，两者的 key 值相同，可以复用。另外，由于两者都处于尾部，因此不需要对真实 DOM 进行移动操作。

```js
function patchKeyedChildren (n1, n2, container) {
	// ...
  
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较

      // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需要打补丁
      patch(oldEndVNode, newEndVNode, container)
      // 更新索引和头尾部的节点变量
      oldEndVNode = oldChildren[--oldEndIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较
      
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较

      // 仍然需要调用 patch 函数进行打补丁
      patch(oldEndVNode, newStartVNode, container)
      // 移动 DOM 操作
      // oldEndVNode.el 移动到 oldStartVNode.el 前面
      insert(oldEndVNode.el, container, oldStartVNode.el)
      // 移动 DOM 完成后，更新索引值，并指向下一个位置
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}

```

这一轮更新完成之后，新旧两组子节点与真实 DOM 节点的状态如下：

<img src="./images/double_diff07.png" />

真实 DOM 的顺序相比上一轮没有变化，因为在这一轮的比较重没有对 DOM 节点进行移动，只是对 p-3 节点打补丁。

接下来，我们再根据图中所示的状态执行下一轮的比较：

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-2，看看它们是否相同。由于两者的 key 值不同，不可复用，因此什么都不做。
* 第二步：比较旧的一组子节点中的尾部节点 p-2 与新的一组子节点中的尾部节点 p-1，看看它们是否相同。由于两者的 key 值不同，不可复用，因此什么都不做。
* 第三步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的尾部节点 p-1 。两者的 key 值相同，可以复用。

在第三步的比较中，我们找到了相同的节点，这说明：节点 p-1 原本是头部节点，但在新的顺序中，它变成了尾部节点。因此，我们需要将节点 p-1 对应的真实 DOM 移动到旧的一组子节点的尾部节点 p-2 所对应的真实 DOM 后面，同时还需要更新相应的索引到下一个位置。

<img src="./images/double_diff08.png" />

这一步的代码如下：

```js
function patchKeyedChildren (n1, n2, container) {
	// ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较

      // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需要打补丁
      patch(oldEndVNode, newEndVNode, container)
      // 更新索引和头尾部的节点变量
      oldEndVNode = oldChildren[--oldEndIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较

      // 调用 patch 函数在 oldStartVNode 和 newEndVNode 之间打补丁
      patch(oldStartVNode, newEndVNode, container)
      // 将旧的一组子节点的头部节点对应的真实 DOM 节点 oldStartVNode.el 移动到
      // 旧的一组子节点的尾部节点对应的真实 DOM 节点后面
      insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
      // 更新索引
      oldStartVNode = oldChildren[++oldStartIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较

      // 仍然需要调用 patch 函数进行打补丁
      patch(oldEndVNode, newStartVNode, container)
      // 移动 DOM 操作
      // oldEndVNode.el 移动到 oldStartVNode.el 前面
      insert(oldEndVNode.el, container, oldStartVNode.el)
      // 移动 DOM 完成后，更新索引值，并指向下一个位置
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}
```

如上面的代码所示，如果旧的一组子节点的头部节点与新的一组子节点的尾部节点匹配，则说明该旧节点所对应的真实 DOM 节点需要移动到尾部。因此，我们需要获取当前尾部节点的下一个兄弟节点作为锚点，即 `oldEndVNode.el.nextSibling` 。最后，更新相关索引到下一个位置。

通过上图可以看到，此时，新旧两组子节点的头部索引和尾部索引发生重合，但仍然满足遵循的条件，所以还会进行下一轮的更新。

* 第一步：比较旧的一组子节点的头部节点 p-2 与新的一组子节点中的头部节点 p-2。发现两者 key 值相同，可以复用。但两者在新旧两组子节点中都是头部节点，因此不需要移动，只需要调用 patch 函数进行打补丁即可。

```js
function patchKeyedChildren (n1, n2, container) {
	// ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较

      // 调用 patch 函数在 oldStartVNode 与 newStartVNode 之间打补丁
      patch(oldStartVNode, newStartVNode, container)
      // 更新索引
      oldStartVNode = oldChildren[++oldStartIdx]
      newStartVNode = newChildren[++newStartIdx]
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较

      // 节点在新的顺序中仍然处于尾部，不需要移动，但仍需要打补丁
      patch(oldEndVNode, newEndVNode, container)
      // 更新索引和头尾部的节点变量
      oldEndVNode = oldChildren[--oldEndIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较

      // 调用 patch 函数在 oldStartVNode 和 newEndVNode 之间打补丁
      patch(oldStartVNode, newEndVNode, container)
      // 将旧的一组子节点的头部节点对应的真实 DOM 节点 oldStartVNode.el 移动到
      // 旧的一组子节点的尾部节点对应的真实 DOM 节点后面
      insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling)
      // 更新索引
      oldStartVNode = oldChildren[++oldStartIdx]
      newEndVNode = newChildren[--newEndIdx]
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较

      // 仍然需要调用 patch 函数进行打补丁
      patch(oldEndVNode, newStartVNode, container)
      // 移动 DOM 操作
      // oldEndVNode.el 移动到 oldStartVNode.el 前面
      insert(oldEndVNode.el, container, oldStartVNode.el)
      // 移动 DOM 完成后，更新索引值，并指向下一个位置
      oldEndVNode = oldChildren[--oldEndIdx]
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}
```

这一轮更新之后，真实 DOM 节点的顺序与新的一组子节点的顺序已经相同了。另外，更新完成后，索引 `newStartIdx` 和索引 `oldStartIdx` 的值分别大于 `newEndIdx` 和 `oldEndIdx` ，所以循环终止，双端 Diff 算法也执行完毕。

#### 双端比较的优势

理解双端比较的原理之后，我们来看看与简单 Diff 算法相比，双端 Diff 算法具有怎样的优势。我们以下面的例子来看。

<img src="./images/double_diff09.png" />

当使用简单 Diff 算法对示例进行更新时，会发生两次 DOM 移动。图中给出了新旧两组子节点的节点顺序。

* 遍历新节点
  * 如果找到，对节点进行复用（根据索引值进行对比）
  * 如果找不到，挂载新节点
* 遍历旧节点，寻找旧节点存在，但是新节点不存在的情况，将其卸载

<img src="./images/double_diff10.png" />

如果使用双端 Diff 算法对这个例子进行更新，会有怎样的表现？接下来，我们以双端比较的思路来完成此例的更新，看一看双端 Diff 算法能否减少 DOM 移动操作次数。

下图出了算法执行之前新旧两组子节点与真实 DOM 节点的状态。

<img src="./images/double_diff11.png" />

接下来，我们按照双端比较的步骤执行更新：

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-3，两者 key 值不同，不可复用。
* 第二步：比较旧的一组子节点中的尾部节点 p-3 与新的一组子节点中的尾部节点 p-2，两者 key 值不同，不可复用。
* 第三步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的尾部节点 p-2，两者 key 值不同，不可复用。
* 第四步：比较旧的一组子节点中的尾部节点 p-3 与新的一组子节点中的头部节点 p-3，发现可以复用。

可以看到，在第四步的比较中，我们找到了可复用的节点 p-3。该节点原本处于所有子节点的尾部，但在新的一组子节点中它处于头部。因此，只需要让节点 p-3 对应的真实 DOM 变成新的头部节点即可。在这一步操作之后，新旧两组子节点以及真实 DOM 节点的状态如下：

<img src="./images/double_diff12.png" />

在这一轮比较过后，真实 DOM 节点的顺序已经与新的一组子节点顺序一致了。我们已经完成了更新，不过算法仍然会进行执行。

* 第一步比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-1，两者的 key 值相同，可以复用。但由于两者都处于头部，因此不需要移动，只需要打补丁即可。

这一轮比较过后，新旧两组子节点与真实 DOM 节点的状态如下：

<img src="./images/double_diff13.png" />

此时，双端 Diff 算法仍然没有停止，开始新一轮的比较。

* 第一步：比较旧的一组子节点中的头部节点 p-2 与新的一组子节点中的头部节点 p-2，两种的 key 值相同，可以复用。但由于两者都处于头部，因此不需要移动，只需要打补丁。

在这一轮比较过后，新旧两组子节点与真实 DOM 节点的状态如下：

<img src="./images/double_diff14.png" />

到这一步后，索引 `newStartIdx` 和 `oldStartIdx` 的值比索引 `newEndIdx` 和 `oldEndIdx` 的值大，于是更新结束。可以看到，对于相同的例子，采用简单 Diff 算法需要两次 DOM 移动操作才能完成更新，而使用双端 Diff 算法只需要一次 DOM 移动操作即可完成更新。

#### 非理想状况的处理方式

上一小节，我们用到了一个比较理想的例子。我们知道，双端 Diff 算法的每一轮比较的过程都分为四个步骤。在上一小节的例子中，每一轮比较都会命中四个步骤中的一个，这是非常理想的情况。但实际上，并非所有情况都这么理想。

<img src="./images/double_diff15.png" />

在这个例子中，新旧两组子节点的顺序如下：

* 旧的一组子节点：p-1、p-2、p-3、p-4。
* 新的一组子节点：p-2、p-4、p-1、p-3。

当我们尝试按照双端 Diff 算法的思路进行第一轮比较时，会发现无法命中四个步骤中的任何一步。

* 第一步：比较旧的一组子节点的头部节点 p-1 与新的一组子节点中的头部节点 p-2，不可复用。
* 第二步：比较旧的一组子节点的尾部节点 p-4 与新的一组子节点中的尾部节点 p-3，不可复用。
* 第二步：比较旧的一组子节点的头部节点 p-1 与新的一组子节点中的尾部节点 p-3，不可复用。
* 第二步：比较旧的一组子节点的尾部节点 p-4 与新的一组子节点中的头部节点 p-2，不可复用。

在这四个步骤的比较过程中，都无法找到可复用的节点。这时，我们只能通过增加额外的处理步骤来处理这种非理想情况。既然两个头部和两个尾部的四个节点中都没有可复用的节点，那么我们久长时看看非头部、非尾部的节点能否复用。具体做法是，拿新的一组子节点中的头部节点去旧的一组子节点中寻找。

```js
function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1

  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较
    } else {
      // 乱序比较

      // 遍历旧的一组子节点，寻找与 newStartVNode 拥有相同 key 值的节点
      // idxInOld 就是新的一组子节点的头部节点在旧的一组子节点中的索引
      const idxInOld = oldChildren.findIndex(node => node.key === newStartVNode.key)
    }
  }
}
```

在上面这段代码中，我们遍历旧的一组子节点，尝试在其中寻找与新的一组子节点的头部节点具有相同 key 值的节点，并将该节点在旧的一组子节点中的索引存在到变量 `idxInOld` 中。不过这么做的目的是什么呢？想要搞清楚这个问题，本质上需要我们先搞清楚：在旧的一组子节点中，找到与新的一组子节点中的头部节点具有相同 key 值的节点意味着什么？

<img src="./images/double_diff16.png" />

当我们拿新的一组子节点的头部节点 p-2 去旧的一组子节点中查找时，会在索引为 1 的位置找到可复用的节点。这意味着，节点 p-2 原本不是头部节点，但在更新之后，它应该变成头部节点。所以我们需要将节点 p-2 对应的真实 DOM 节点移动到当前旧的一组子节点的头部节点 p-1 所对应的真实 DOM 节点之前。具体实现如下：

```js
function patchKeyedChildren (n1, n2, container) {
  const oldChildren = n1.children
  const newChildren = n2.children

  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1

  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较
    } else {
      // 乱序比较

      // 遍历旧的一组子节点，寻找与 newStartVNode 拥有相同 key 值的节点
      // idxInOld 就是新的一组子节点的头部节点在旧的一组子节点中的索引
      const idxInOld = oldChildren.findIndex(node => node.key === newStartVNode.key)
      // idxInOld 大于 0，说明找到了可复用的节点，并且需要将其对应的真实 DOM 移动到头部
      if (idxInOld) {
        // idxInOld 位置对应的 vnode 就是需要移动的节点
        const vnodeToMove = oldChildren[idxInOld]
        // 打补丁操作
        patch(vnodeToMove, newStartVNode, container)
        // 将 vnodeToMove.el 移动到头部节点 oldStartVNode.el 之前，因此使用后者作为锚点
        insert(vnodeToMove.el, container, oldStartVNode.el)
        // 由于位置 idxInOld 处的节点所对应的真实 DOM 已经移动到别处，因此将其设置为 undefined
        oldChildren[idxInOld] = undefined
        // 更新 newStartIdx 到下一个位置
        newStartVNode = newChildren[++newStartIdx]
      }
    }
  }
}
```

在上面这段代码中，首先判断 `idxInOld` 是否大于 0。如果条件成立，则说明找到可复用的节点，然后将该节点对应的真实 DOM 移动到头部。为此，我们先要获取需要移动的节点，这里的 `oldChildren[idxInOld]` 所指向的节点就是需要移动的节点。在移动节点之前，不要忘记调用 patch 函数进行打补丁。接着，调用 insert 函数，并以现在的头部节点对应的真实 DOM 节点 `oldStartVNode.el` 作为锚点参数来完成节点的移动操作。当节点移动完成后，还有两步工作需要做。

* 由于处理 `idxInOld` 处的节点已经处理过（对应的真实 DOM 移动到别处），因此我们应该将 `oldChildren[idxInOld]` 设置为 undefined。
* 新的一组子节点中的头部节点已经处理完毕，因此将 `newStartIdx` 前进到下一个位置。

经过上述两个步骤的操作之后，新旧两组节点以及真实 DOM 节点的状态如下：

<img src="./images/double_diff17.png" />

接着，双端 Diff 算法会继续进行。

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-4，两者 key 值不同，不可复用。
* 第二步：比较旧的一组子节点中的尾部节点 p-4 与新的一组子节点中的尾部节点 p-3，两者 key 值不同，不可复用。
* 第三步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的尾部节点 p-3，两者 key 值不同，不可复用。
* 第四步：比较旧的一组子节点中的尾部节点 p-4 与新的一组子节点中的头部节点 p-4，两者 key 值相同，可以复用。

在这一轮的比较中，我们找到了可以复用的节点。因此，按照双端 Diff 算法的逻辑移动真实 DOM，即把 p-4 对应的真实 DOM 移动到旧的一组子节点中头部节点 p-1 所对应的真实 DOM 前面。

<img src="./images/double_diff18.png" />

此时，真实 DOM 节点的顺序是：p-2、p-4、p-1、p-3。接着，开始下一轮的比较。

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-1，两者 key 值相同，可以复用。

在这一轮比较中，第一步就找到了可复用的节点。由于两者都处于头部，所以不需要对真实 DOM 进行移动，只需要打补丁即可。在这一步操作过后，新旧两组子节点与真实 DOM 节点的状态如下：

<img src="./images/double_diff19.png" />

此时，真实 DOM 的节点顺序是：p-2、p-4、p-1、p-3。接着，进行下一轮比较。因为此时旧的一组子节点的头部节点是 undefined。这说明该节点已经被处理过，因此我们不需要在处理它，直接跳过即可。为此，我们需要补充这部分代码逻辑。

```js
function patchKeyedChildren (n1, n2, container) {
	// ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 增加两个判断分支，如果头尾部节点为 undefined，说明该节点已经被处理过，直接跳到下一个位置
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (!oldEndVNode) {
      oldEndVNode = newChildren[--oldEndIdx]
    } else if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较
    } else {
      // 乱序比较
    }
  }
}
```

在循环开始时，我们优先判断头部节点和尾部节点是否存在。如果不存在，则说明它们已经被处理过，直接跳到下一个位置即可。在这一轮比较过后，新旧两组子节点与真实 DOM 节点的状态如图所示：

<img src="./images/double_diff20.png" />

现在，四个步骤又重合了，接着进行最后一轮的比较：

* 第一步：比较旧的一组子节点中的头部节点 p-3 与新的一组子节点中的头部节点 p-3，两者 key 值相同，可以复用。

在第一步中找到了可复用的节点。由于两者都是头部节点，因此不需要进行 DOM 移动操作，直接打补丁即可。

<img src="./images/double_diff21.png" />

这一轮比较过后，最终状态如上图所示。这时，满足循环停止的条件，于是更新完成。最终，真实 DOM 节点的顺序与新的一组子节点的顺序一致，都是：p-2、p-4、p-1、P-3.

#### 添加新元素

我们已经讲解了非理想情况的处理，即在新一轮比较过程中，不会命中四个步骤中的任何一步。这时，我们会拿到新的一组子节点中的头部节点去旧的一组子节点中中寻找可复用的节点，然而并非总能找得到。

<img src="./images/double_diff22.png" />

在这个例子中，新旧两组子节点的顺序如下：

* 旧的一组子节点：p-1、p-2、p-3
* 新的一组子节点：p-4、p-1、p-3、p-2

首先，我们尝试进行第一轮比较，发现在四个步骤中的比较重都找到不到可复用的节点。于是我们尝试拿新的一组子节点的头部节点 p-4 去旧的一组子节点中寻找具有相同 key 值的节点，但在旧的一组子节点中根本就没有 p-4 节点。

这说明节点 p-4 是一个新增节点，我们应该将它挂载到正确的位置。那么应该挂载到哪里呢？很简单，因为节点 p-4 是新的一组子节点中的头部节点，所以只需要将它挂载到当前头部节点之前即可。“当前” 头部节点指的是，旧的一组子节点中的头部节点所对应的真实 DOM 节点 p-1。

<img src="./images/double_diff23.png" />

```js
function patchKeyedChildren (n1, n2, container) {
	// ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 增加两个判断分支，如果头尾部节点为 undefined，说明该节点已经被处理过，直接跳到下一个位置
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (!oldEndVNode) {
      oldEndVNode = newChildren[--oldEndIdx]
    } else if (oldStartVNode.key === newStartVNode.key) {
      // 第一步：oldStartVNode 和 newStartVNode 比较
    } else if (oldEndVNode.key === newEndVNode.key) {
      // 第二步：oldEndVNode 和 newEndVNode 比较
    } else if (oldStartVNode.key === newEndVNode.key) {
      // 第三步：oldStartVNode 和 newEndVNode 比较
    } else if (oldEndVNode.key === newStartVNode.key) {
      // 第四步：oldEndVNode 和 newStartVNode 比较
    } else {
      // 乱序比较

      // 遍历旧的一组子节点，寻找与 newStartVNode 拥有相同 key 值的节点
      // idxInOld 就是新的一组子节点的头部节点在旧的一组子节点中的索引
      const idxInOld = oldChildren.findIndex(node => node.key === newStartVNode.key)

      // idxInOld 大于 0，说明找到了可复用的节点，并且需要将其对应的真实 DOM 移动到头部
      if (idxInOld > 0) {
        // idxInOld 位置对应的 vnode 就是需要移动的节点
        const vnodeToMove = oldChildren[idxInOld]
        // 打补丁操作
        patch(vnodeToMove, newStartVNode, container)
        // 将 vnodeToMove.el 移动到头部节点 oldStartVNode.el 之前，因此使用后者作为锚点
        insert(vnodeToMove.el, container, oldStartVNode.el)
        // 由于位置 idxInOld 处的节点所对应的真实 DOM 已经移动到别处，因此将其设置为 undefined
        oldChildren[idxInOld] = undefined
      } else {
        // 将 newStartVNode 作为新节点挂载到头部，使用当前头部节点 oldStartVNode.el 作为锚点
        patch(null, newStartVNode, container, oldStartVNode.el)
      } 
         
      // 更新 newStartIdx 到下一个位置
      newStartVNode = newChildren[++newStartIdx]
    }
  }
}
```

如上面的代码所示，当条件 `idxInOld > 0` 不成立时，说明 `newStartVNode` 节点是全新的节点。又由于 `newStartVNode` 节点是头部节点，因此我们应该将其作为新的头部节点进行挂载。所以，在调用 patch 函数挂载节点时，我们使用 `oldStartVNode.el` 作为锚点。

当新节点 p-4 挂载完成后，会进行后续的更新，知道全部更新完成为止。但是这样并不完美，我们再来看另外一个例子。

<img src="./images/double_diff24.png" />

这个例子与上一个例子的不同之处在于，我们调整了新的一组子节点的顺序：p-4、p-1、p-2、p-3 。下面我们按照双端 Diff 算法的思路来执行更新。

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-4，两者 key 值不同，不可以复用。
* 第二步：比较旧的一组子节点中的尾部节点 p-3 与新的一组子节点中的尾部节点 p-3，两者 key 值相同，可以复用。

在第二步找到了可复用的节点，因此进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如图所示。

<img src="./images/double_diff25.png" />

接着进行下一轮的比较。

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-4，两者 key 值不同，不可以复用。
* 第二步：比较旧的一组子节点中的尾部节点 p-2 与新的一组子节点中的尾部节点 p-2，两者 key 值相同，可以复用。

我们在第二步又找到了可以复用的节点，于是再次进行更新。更新后的新旧两个子节点以及真实 DOM 节点的状态如图所示。

<img src="./images/double_diff26.png" />

接着，进行下一轮的更新。

* 第一步：比较旧的一组子节点中的头部节点 p-1 与新的一组子节点中的头部节点 p-4，两者 key 值不同，不可以复用。
* 第二步：比较旧的一组子节点中的尾部节点 p-1 与新的一组子节点中的尾部节点 p-1，两者 key 值相同，可以复用。

还是在第二步找到了可复用的节点，再次进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如图所示。

<img src="./images/double_diff27.png" />

当这一轮更新完毕后，由于变量 `oldStarIdx` 的值大于 `oldEndIdx` 的值，更新停止。但通过观察可知，节点 p-4 在整个更新过程中被遗漏了，这说明我们的算法是有缺陷的。为了弥补这个缺陷，我们需要添加额外的处理代码。

```js
function patchKeyedChildren (n1, n2, container) {
	// ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		// ...
  }
  
  // 循环结束检查索引值的情况
  if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
    // 如果满足条件，则说明有新的节点遗漏，需要挂载它们
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      patch(null, newChildren[i], container, oldStartVNode.el)
    }
  }
}
```

我们在 while 循环结束后增加了一个 if 条件语句，检查四个索引值的情况。如果条件 `oldEndIdx < oldStartIdx && setStartIdx <= newEndIdx` 成立，说明新的一组子节点中有遗留的节点需要作为新节点挂载。哪些节点是新节点呢？索引值位于 `newStartIdx`  和 `newEndIdx` 这个区间内的都是新节点。于是我们开启一个 for 循环来遍历这个区间内的节点并逐一挂载。挂载时的锚点仍然使用当前的头部节点 `oldStartVNode.el`，这样就完成了对新增元素的处理。

#### 移除不存在的元素

解决了新增节点的问题后，我们再来讨论关于移除元素的情况。

<img src="./images/double_diff28.png" />

在这个例子中，新旧两组子节点的顺序如下：

* 旧的一组子节点：p-1、p-2、p-3
* 新的一组子节点：p-1、p-3

可以看到，在新的一组子节点中 p-2 节点已经不存在了。为了搞清楚应该如何处理节点被移除的情况，我们还是按照双端 Diff 算法的思路执行更新。 

* 第一步：比较旧的一组子节点的头部节点 p-1 与新的一组子节点中的头部节点 p-1，两者的 key 值相同，可以复用。

在第一步的比较重找到可复用的节点，于是执行更新。在这一轮比较过后，新旧两组子节点以及真实 DOM 节点的状态如下：

<img src="./images/double_diff29.png" />

接着，执行下一轮更新。

* 第一步：比较旧的一组子节点中的头部节点 p-2 与新的一组子节点中的头部节点 p-3，两者的 key 值不同，不可以复用。
* 第二步：比较旧的一组子节点中的尾部节点 p-3 与新的一组子节点中的尾部节点 p-3，两者的 key 值相同，可以复用。

在第二步找到了可复用的节点，于是进行更新。更新后的新旧两组子节点以及真实 DOM 节点的状态如下：

<img src="./images/double_diff30.png" />

此时变量 `newStartIdx` 的值大于变量 `newEndIdx` 的值，满足更新停止的条件，于是更新结束。但是观察上图可知，旧的一组子节点中存在未被处理的节点，应该将其移除。因此，我们需要增加额外的代码来处理它。

```js
function patchKeyedChildren (n1, n2, container) {
	// ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
		// ...
  }
  
  // 循环结束检查索引值的情况
  if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
    // 如果满足条件，则说明有新的节点遗漏，需要挂载它们
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      patch(null, newChildren[i], container, oldStartVNode.el)
    }
  } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
    // 移除操作
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      unmount(oldChildren[i])
    }
  }
}
```

与处理新增节点类似，我们在 while 结束后有增加了一个 `else...if` 分支，由于卸载已经不存在的节点。由上图可知，索引值位于 `oldStartIdx` 和 `oldEndIdx` 这个区间内的节点都应该被卸载，于是我们开启一个 for 循环将它们逐一卸载。

#### 总结

本篇文章我们介绍了双端 Diff 算法的原理及其优势。顾名思义，双端 Diff 算法指的是，在新旧两组子节点的四个断点分别进行比较，并试图找到可复用的节点。相比简单 Diff 算法，双端 Diff 算法的优势在于，对于同样的场景，执行的 DOM 移动次数更少。

### 快速 Diff 算法

本篇文章我们将讨论第三种用于比较新旧两组子节点的方式：快速 Diff 算法。该算法的实测速度非常快，最早应用与 `ivi` 和 `inferno` 这两个框架，vue.js 3 借鉴并扩展了它。

关于框架对比可以查看下面这个网站。

* 网站：[https://krausest.github.io/js-framework-benchmark/current.html](https://krausest.github.io/js-framework-benchmark/current.html)。

* github：[https://github.com/krausest/js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)

在 DOM 操作的各个方面，`ivi` 和 `inferno` 所采用的快速 Diff 算法的性能都要优于 vue.js 2 所采用的双端 Diff 算法。既然快速 Diff 算法如此高效，我们就有必要了解它的思路。接下来，我们就着重讨论快速 Diff 算法的实现原理。

#### 相同的前置元素和后置元素

不同于简单 Diff 算法和双端 Diff 算法，快速 Diff 算法包含预处理步骤，这其实是借鉴了纯文本 Diff 算法的思路。在纯文本 Diff 算法中，存在对两段文本进行预处理的过程。例如，在对两段文本进行 Diff 之前，可以先对它进行全等比较。

```js
if (text1 === text2) return
```

这也称为快捷路径。如果两端文本全等，那么就无需进入核心 Diff 算法的步骤了。除此之外，预处理过程还会处理两端文本相同的前缀和后缀。假设有如下两端文本：

```js
TEXT1: I use vue for app development
TEXT2: I use react for app development
```

通过肉眼可以很容易发现，这两段文本的头部和尾部分别一段相同的内容。对于内容相同的问题，是不需要进行核心 Diff 操作的。因此，对于 `TEXT1` 和 `TEXT2` 来说，真正需要进行 Diff 操作的部分是：

```js
TEXT1: vue
TEXT2: react
```

 这实际上是简化问题的一种方式。这么做的好处是，在特定情况下我们能够轻松地判断文本的插入和删除。例如下面这两个字符串：

```js
TEXT1: I like you
TEXT2: I like you too
```

经过预处理，去掉这两段文本相同的前缀内容和后缀内容之后，它将变成：

```js
TEXT1: 
TEXT2: too
```

可以看到，经过预处理，`TEXT1` 的内容为空。这说明 `TEXT2` 在 `TEXT1` 的基础上增加了字符串 too。相反，我们还可以将这两段文本的位置互换：

```js
TEXT1: I like you too
TEXT2: I like you
```

这两端文本降火预处理后讲变成：

```js
TEXT1: too
TEXT2: 
```

由此可知，`TEXT2` 是在 `TEXT1` 的基础上删除了字符串 `too`。

快速 Diff 算法借鉴了纯文本 Diff 算法中预处理的步骤。以下图为例：

<img src="./images/quick_diff01.png" />

对于相同的前置节点和后置节点，由于它们在新旧两组子节点中的相对位置不变，所以我们无须移动它们，但仍然需要在它们之前打补丁。

对于前置节点，我们可以建议索引 j，其初始值为 0，用来指向两组子节点的开头。

<img src="./images/quick_diff02.png" />

然后开启一个 while 循环，让索引 j 递增，直到遇到不相同的节点为止。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 处理相同的前置节点
  // 索引 j 指向新旧两组子节点的开头
  let j = 0
  let oldVNode = oldChildren[j]
  let newVNode = newChildren[j]
  // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
  while (oldVNode.key === newVNode.key) {
    // 调用 patch 函数进行更新
    patch(oldVNode, newVNode, container)
    // 更新索引 j，让其递增
    j++
    oldVNode = oldChildren[j]
    newVNode = newChildren[j]
  }
}
```

在上面这段代码中，我们使用 while 循环查找所有相同的前置节点，并调用 patch 函数进行打补丁，直到遇到 key 值不同的节点为止。这样，我们就完成了对前置节点的更新。在这一步更新操作后，新旧两组子节点的状态如图所示：

<img src="./images/quick_diff03.png" />

这里需要注意的是，当 while 循环终止时，索引 j 的值为 1。接下来，我们需要处理相同的后置节点。由于两组新旧子节点的数量可能不同，所以我们需要两个索引 `newEnd` 和 `oldEnd`，分别指向新旧两组子节点中的最后一个节点。

<img src="./images/quick_diff04.png" />

然后，在开启一个 while 循环，并从后向前遍历这两组子节点，知道遇到 key 值不同的节点为止。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
  // 索引 j 指向新旧两组子节点的开头
  let j = 0
  let oldVNode = oldChildren[j]
  let newVNode = newChildren[j]
  // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
  while (oldVNode.key === newVNode.key) {
    // 调用 patch 函数进行更新
    patch(oldVNode, newVNode, container)
    // 更新索引 j，让其递增
    j++
    oldVNode = oldChildren[j]
    newVNode = newChildren[j]
  }

  // 更新相同的后置节点
  // 索引 oldEnd 指向旧的一组子节点的最后一个节点
  let oldEnd = oldChildren.length - 1
  // 索引 newEnd 指向新的一组子节点的最后一个节点
  let newEnd = newChildren.length - 1

  oldVNode = oldChildren[oldEnd]
  newVNode = newChildren[newEnd]

  // while 循环从后向前遍历，直到遇到拥有不同的 key 值的节点为止
  while (oldVNode.key === newVNode.key) {
    // 调用 patch 函数进行更新
    patch(oldVNode, newVNode, container)
    // 递减 oldEnd 和 newEnd
    oldEnd--
    newEnd--
    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]
  }
}
```

与处理相同的前置节点一样，在 while 循环内，需要调用 patch 函数进行打补丁，然后递减两个索引 `oldEnd`、`newEnd` 的值。在这一步更新操作之后，新旧两组子节点的状态如图所示：

<img src="./images/quick_diff05.png" />

由图可知，当相同的前置节点和后置节点被处理完毕后，旧的一组子节点已经全部被处理了，而在新的一组子节点中，还遗留了一个未被处理的节点 p-4。节点 p-4 是一个新增节点。

* 条件一：`oldEnd < j` 成立，说明在预处理过程中，所有旧节点都处理完毕了；
* 条件二：`newEnd >= j` 成立，说明在预处理过程中，在新的一组子节点中，仍然有未被处理的节点，而这些遗留的节点都被视作新增节点。

我们需要把这些遗留的节点挂载到正确的位置。

在新的一组子节点中，索引值处于 j 和 `newEnd` 之间的任何节点都需要作为新的子节点进行挂载。那么，应该怎样将这些节点挂载到正确位置呢？这就要求我们必须找到正确的锚点元素。观察图中新的一组子节点可知，新增节点应该挂载到节点 `p-2` 所对应的真实 DOM 前面。所以，节点 `p-2` 对应的真实 DOM 节点就是挂载操作的锚点元素。有了这些信息，我们就可以给出具体的代码实现。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  // 预处理完毕后，如果满足如下条件，则说明 j --> nextEnd 之间的节点应作为新节点插入
  if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1
    // 锚点元素
    const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
    // 采用 while 循环，调用 patch 函数逐个挂载新增节点
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  }
}
```

上面的案例展示了新增节点的情况，我们再来看删除节点的情况。

<img src="./images/quick_diff06.png" />

在这个例子中：新旧两组子节点的顺序如下：

* 旧的一组子节点：p-1、p-2、p-3
* 新的一组子节点：p-1、p-3

我们同样使用索引 j、`oldEnd` 和 `newEnd` 进行标记。

<img src="./images/quick_diff07.png" />

接着，对相同的前置节点进行预处理，处理后的状态如图所示：

<img src="./images/quick_diff08.png" />

然后，对相同的后置节点进行预处理，处理后的状态如图所示：

<img src="./images/quick_diff09.png" />

由上图可知，当相同的前置节点和后置节点全部都被处理完毕后，新的一组子节点已经全部被处理完毕了，而旧的一组子节点中遗留了一个节点 p-2。这说明，应该卸载 p-2。实际上，遗留的节点可能有多个。

索引 `j` 和索引 `oldEnd` 之间的任何节点都应该被卸载。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...

  if (j > oldEnd && j <= newEnd) {
    // 预处理完毕后，如果满足如下条件，则说明 j --> nextEnd 之间的节点应作为新节点插入
    // 锚点的索引
    const anchorIndex = newEnd + 1
    // 锚点元素
    const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
    // 采用 while 循环，调用 patch 函数逐个挂载新增节点
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  } else if (j > newEnd && j <= oldEnd) {
    // j --> oldEnd 之间的节点应该被卸载
    while (j <= oldEnd) {
      unmount(oldChildren[j++])
    }
  }
}
```

在上面这段代码中，我们新增了一个 `else...if` 分支。当满足条件 `j > newEnd && j <= oldEnd` 时，则开启一个 `while` 循环，并调用 `unmount` 函数逐个卸载这些遗留节点。

#### 判断是否需要移动 DOM 

上一节中，我们讲解了快速 Diff 算法的预处理过程，即处理相同的前置节点和后置节点。但是，上一节给出的例子比较理想化，当处理完相同的前置节点或后置节点后，新旧两组子节点中总会有一组子节点全部被处理完毕。在这种情况下，只需要简单地挂载、卸载节点即可。但有时情况会比较复杂。

 <img src="./images/quick_diff10.png" />

从上图可以看到，与旧的一组子节点相比，新的一组节点多出了一个新节点 p-7，少了一个节点 p-6。这个例子并不向上一节给出的例子那样理想化，我们无法简单地通过与处理过程完成更新。在这个例子中，相同的前置节点只有 p-1，相同的后置节点只有 p-5。

下面是预处理后两组子节点的状态。

 <img src="./images/quick_diff11.png" />

可以看到，经过预处理后，无论是新的一组子节点，还是旧的一组子节点，都有部分节点未经处理。这时就需要我们进一步处理。
无论是简单 Diff 算法，还是双端 Diff 算法，或者这次介绍的快速 Diff 算法，它们都遵循同样的处理规则：

* 判断是否有节点需要移动，以及应该如何移动；
* 找出那些需要被添加或移除的节点。

所以接下来我们的任务就是，判断哪些节点需要移动，以及应该如何移动。观察上图可知，在这种非理想的情况下，当相同的前置节点和后置节点被处理完毕后，索引 j、`newEnd` 和 `oldEnd` 不满足下面两个条件中的任何一个：

* `j > oldEnd && j <= newEnd`
* `j > newEnd && j <= oldEnd`

因此，我们需要增加新的 else 分支来处理图中的情况。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // else 分支处理非理想情况
  }
}
```

后续的处理逻辑我们将会编写在这个 else 分支内。我们需要构造一个数组 source，它的长度等于新的一组子节点中在经过预处理之后剩余未处理节点的数量，并且 source 中每个元素的初始值都是 -1。

<img src="./images/quick_diff12.png" />

我们可以通过下面的代码完成对 source 数组的改造。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // else 分支处理非理想情况
    // 新的一组子节点中剩余未处理节点的数量
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)
  }
}
```

如代码所示。首先，我们需要计算新的一组子节点中剩余未处理节点的数量，即 `newEnd - j + 1`，然后创建一个长度与之相同的数组 `source` ，最后使用 `fill` 函数完成数组填充。**数组 source 用来存储新的一组子节点中的节点在旧的一组子节点中的位置索引，后面将会使用它计算出一个最长递增子序列，并用于辅助完成 DOM 移动的操作。**

<img src="./images/quick_diff13.png" />

上图展示了填充数组的过程。由于 source 数组存储的是新子节点在旧的一组子节点中的位置索引，所以：

* 新的一组子节点中的节点 p-3 在旧的一组子节点中的索引为 2，因此 source 数组的第一个元素值为 2；
* 新的一组子节点中的节点 p-4 在旧的一组子节点中的索引为 3，因此 source 数组的第一个元素值为 3；
* 新的一组子节点中的节点 p-2 在旧的一组子节点中的索引为 1，因此 source 数组的第一个元素值为 1;
* 新的一组子节点中的节点 p-7 比较特殊，因为在旧的一组子节点中没有与其 key 值相等的节点，所以 source 数组的第四个元素值保留原来的 -1。

我们可以通过两层 for 循环来完成 source 数组的填充工作，外层循环用于遍历旧的一组节点，内层循环用于遍历新的一组子节点。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // else 分支处理非理想情况
    // 新的一组子节点中剩余未处理节点的数量
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)

    // oldStart 和 newStart 分别为起始索引，即 j
    const oldStart = j
    const newStart = j
    // 遍历旧的一组子节点
  	for (let i = oldStart; i <= oldEnd; i++) {
      const oldVNode = oldChildren[i]
      // 遍历新的一组子节点
      for (let k = newStart; k <= newEnd; k++) {
        const newVNode = newChildren[k]
        // 找到拥有相同 key 值的可复用节点
        if (oldVNode.key === newVNode.key) {
          // 调用 patch 进行更新
          patch(oldVNode, newVNode, container)
          // 最后填充 source 数组
          source[k - newStart] = i
        }
      }
    }
  }
}
```

这里需要注意的是，由于数组 source 的索引是从 0 开始的，而未处理节点的索引未必从 0 开始，所以在填充数组时需要使用表达式 `k - newStart` 的值作为数组的索引值。外层循环的变量 i 就是当前节点在旧的一组子节点中的位置索引，因此直接将变量 i 的值赋值给 `souce[k - newStart]` 即可。

现在，source 数组已经填充完毕，我们后面会用到它。在进一步讲解前，我们需要思考一下上面那段用于填充 source 数组的代码存在怎样的问题。这段代码中我们采用了两层嵌套的循环，其时间复杂度为 `O(n1 * n2)`，其中 `n1` 和 `n2` 为新旧两组子节点的数量，我们也可以使用 `O(n^2)` 来表示。当新旧两组子节点的数量较多时，两层嵌套的循环就会带来性能问题。出于优化的目的，我们可以为新的一组子节点构建一张索引表，用来存储节点的 key 和节点位置索引之间的映射。

<img src="./images/quick_diff14.png" />

有了索引表，我们就可以利用它快速地填充 source 数组。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // else 分支处理非理想情况
    // 新的一组子节点中剩余未处理节点的数量
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)
   
    // oldStart 和 newStart 分别为起始索引，即 j
    const oldStart = j
    const newStart = j
    // 构建索引表
    const keyIndx = {}
    for (let i = newStart; i <= newEnd; i++) {
      keyIndx[newChildren[i].key] = i
    }
    // 遍历旧的一组子节点剩余未处理的节点为止
    for (let i = oldStart; i <= oldEnd; i++) {
      const oldVNode = oldChildren[i]

      // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
      const k = keyIndx[oldVNode.key]

      if (typeof k !== 'undefined') {
        newVNode = newChildren[k]
        // 调用 patch 进行更新
        patch(oldVNode, newVNode, container)
        // 最后填充 source 数组
        source[k - newStart] = i
      } else {
        // 没找到
        unmount(oldVNode)
      }
    }
  }
}
```

在上面这段代码中，同样使用了两个 for 循环，不过它们不再是嵌套的关系，所以能够将代码的时间复杂度降至 `O(n)` 。其中，第一个 for 循环用来构建索引表，**索引表存储的是节点的 key 值与节点在新的一组子节点中位置索引之间的映射**，第二个 for 循环用来遍历旧的一组子节点。可以看到，我们拿旧子节点的 key 值去索引表 `keyIndex` 中查找该节点在新的一组子节点中的位置，并将查找结果存储到变量 k 中。如果 k 存在，说明该节点是可复用的，所以我们调用 patch 函数进行打补丁，并填充 source 数组。否则说明该节点已经不存在与新的一组子节点中，这时我们需要调用 unmount 函数卸载它。

上述流程执行完毕后，source 数组已经填充完毕了。接下来我们应该思考的是，如果判断节点是否需要移动。实际上，快速 Diff 算法判断节点是否需要移动的方法与简单 Diff 算法类似。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // else 分支处理非理想情况
    // 新的一组子节点中剩余未处理节点的数量
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)
    
    // oldStart 和 newStart 分别为起始索引，即 j
    const oldStart = j
    const newStart = j
    // 新增两个变量，moved 和 pos
    let moved = false
    let pos = 0
    // 构建索引表
    const keyIndx = {}
    for (let i = newStart; i <= newEnd; i++) {
      keyIndx[newChildren[i].key] = i
    }
    // 遍历旧的一组子节点剩余未处理的节点为止
    for (let i = oldStart; i <= oldEnd; i++) {
      const oldVNode = oldChildren[i]

      // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
      const k = keyIndx[oldVNode.key]

      if (typeof k !== 'undefined') {
        newVNode = newChildren[k]
        // 调用 patch 进行更新
        patch(oldVNode, newVNode, container)
        // 最后填充 source 数组
        source[k - newStart] = i
        // 判断节点是否需要移动
        if (k < pos) {
          moved = true
        } else {
          pos = k
        }
      } else {
        // 没找到
        unmount(oldVNode)
      }
    }
  }
}
```

我们新增了两个变量 `moved` 和 `pos`。前者的初始值为 false，代表是否需要移动节点，后者的初始值为 0，代表遍历旧的一组子节点中的过程中遇到的最大索引值 k。我们在编写简单 diff 算法时提到，如果在遍历过程中遇到的索引值呈现递增趋势，则说明不需要移动节点，反之则需要。所以在第二个 for 循环内，我们通过比较变量 k 与变量 `pos` 的值来判断是否需要移动节点。

除此之外，我们还需要一个数量标识，代表已经更新过的节点数量。我们知道，已经更新过的节点数量应该小于新的一组子节点中需要更新的节点数量。一旦前者超过后者，则说明有多余的节点，我们应该将它们卸载。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // else 分支处理非理想情况
    // 新的一组子节点中剩余未处理节点的数量
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)
    
    // oldStart 和 newStart 分别为起始索引，即 j
    const oldStart = j
    const newStart = j
    // 新增两个变量，moved 和 pos
    let moved = false
    let pos = 0
    // 构建索引表
    const keyIndx = {}
    for (let i = newStart; i <= newEnd; i++) {
      keyIndx[newChildren[i].key] = i
    }
    // 新增 patched 变量，代表更新过的节点数量
    let patched = 0
    // 遍历旧的一组子节点剩余未处理的节点为止
    for (let i = oldStart; i <= oldEnd; i++) {
      const oldVNode = oldChildren[i]

      if (patched <= count) {
        // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
        const k = keyIndx[oldVNode.key]

        if (typeof k !== 'undefined') {
          newVNode = newChildren[k]
          // 调用 patch 进行更新
          patch(oldVNode, newVNode, container)
          // 每更新一个节点，将 patched 变量 +1
          patched++
          // 最后填充 source 数组
          source[k - newStart] = i
          // 判断节点是否需要移动
          if (k < pos) {
            moved = true
          } else {
            pos = k
          }
        } else {
          // 没找到
          unmount(oldVNode)
        }
      } else {
        // 如果更新过的节点数量大于需要更新的节点数量，卸载多余的节点
        unmount(oldVNode)
      }
    }
  }
}
```

这上面这段代码中，我们增加了 `patched` 变量，其初始值为 0，代表更新过的节点数量。接着，在第二个 for 循环中增加了判断 `patched < count`，如果此条件成立，则正常执行更新，并且每次更新后都让变量 `patched` 自增；否则说明剩余的节点都是多余的，于是调用 `unmount` 函数将它们卸载。

现在，我们通过判断变量 `moved` 的值，已经能够知道是否需要移动节点，同时也处理了很多边界条件。接下来我们讨论如何移动节点。

#### 如何移动元素

我们已经实现了两个目标：

* 判断是否需要进行 DOM 移动操作。我们创建了变量 moved 作为标识，当它的值为 true 时，说明需要进行 DOM 移动操作。
* 构建 source 数组。该数组的长度等于新的的一组子节点去掉相同的前置/后置节点后，升序未处理节点的数量。source 数组中存在这新的一组子节点中的节点在旧的一组子节点中的位置。后面，我们会根据 source 数组计算出一个最长递增子序列，用于 DOM 移动操作。

接下来，我们讨论如何进行 DOM 移动操作。

```js
function patchKeyedChildren (n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  
  // 更新相同的前置节点
	// ...

  // 更新相同的后置节点
	// ...
  
  if (j > oldEnd && j <= newEnd) {
		// ...
  } else if (j > newEnd && j <= oldEnd) {
    // ...
  } else {
    // ...
    
    if (moved) {
      // 如果 moved 为真，需要进行 DOM 移动操作
    }
  }
}
```

我们在 for 循环后增加了一个 if 判断分支。如果变量 moved 的值为 true，则说明需要进行 DOM 移动操作，所以用于 DOM 移动操作的逻辑将编写在该 if 语句块内。

为了进行 DOM 移动操作，我们首先要根据 source 数组计算出它的最长递增子序列。source 数组仍然取用之前的例子。

<img src="./images/quick_diff14.png" />

这个例子中，我们计算出 source 数组为 `[2, 3, 1, -1]`。那么，该数组的最长递增子序列是什么呢？

**简单来说，给定一个数值序列，找到它的一个子序列，并且该子序列中的值是递增的，子序列中的元素在元序列中不一定连续。一个序列可能有多个递增子序列，其中最长的哪一个就称为最长递增子序列。**

举个例子，假设给定数值序列 `[0, 8, 4, 12]`，那么它的最长递增子序列就是 `[0, 8, 12]`。当然，对于同一个数值序列来说，它的最长递增子序列可能有多个，例如 `[0, 4, 12]` 也是答案之一。

理解什么是最长递增子序列后，接下来我们就可以求解 source 数组的最长递增子序列。

```js
if (moved) {
  // 如果 moved 为真，需要进行 DOM 移动操作
  // 计算最长递增子序列
  const seq = lis(source) // [0, 1]
}
```

在这段代码中，我们使用 `lis` 函数计算一个数组的最长递增子序列。`lis` 函数接收 `source` 数组作为参数，并返回 `source` 数组的最长递增子序列。

> `lis` 函数返回结果是最长递增子序列中的元素在 `source` 数组中的位置索引。

因为 `source` 数组的最长递增子序列是 `[2, 3]`，其中元素 2 在该数组中的索引为 0，而数组 3 在该数组中的索引为 1，所以最终结果为 `[0, 1]`。

有了最长递增子序列的索引信息后，下一步要重新对节点进行编号。

<img src="./images/quick_diff15.png" />

观察上图，在编号时，我们忽略了经过预处理的节点 `p-1` 和 `p-5`。所以，索引为 0 的节点是 `p-2`，而索引为 1 的节点时 `p-3`。重新编号是为了让子序列 `seq` 与新的索引值产生对应关系。以上例来说，子序列 `seq` 的值为 `[0, 1]` ，它的含义是：**在新的一组子节点中，重新编号后索引值为 0 和 1 的这两个节点在更新前后顺序没有发生变化。**换句话说，重新编号后，索引值为 0 和 1 的节点不需要移动。在新的一组子节点中，节点 `p-3` 索引为 0，节点 `p-4` 的索引为 1，所以节点 `p-3` 和 `p-4` 所对应的真实 DOM 不需要移动。只有 `p-2` 和 `p-7` 可能需要移动。

为了完成节点移动，我们还需要创建两个索引值 i 和 s。

* 用索引 i 指向新的一组子节点中的最后一个节点；
* 用索引 s 指向最长递增子序列中的最后一个元素。

<img src="./images/quick_diff16.png" />

为了简化图示，我们去掉了旧的一组子节点以及无关的线条和变量。

```js
if (moved) {
  // 如果 moved 为真，需要进行 DOM 移动操作
  // 计算最长递增子序列
  const seq = lis(source) // [0, 1]

  // s 指向最长递增子序列的最后一个元素
  let s = seq.length - 1
  // i 指向新的一组子节点中的最后一个元素
  let i = count - 1
  // for 循环使 i 递减
  for (i; i >= 0; i--) {
    if (i != seq[s]) {
      // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
    } else {
      // i === seq[s] 时，说明该位置的节点不需要移动
      // 只需要让 s 指向下一个位置
      s--
    }
  }
}
```

其中，for 循环从后向前遍历，可以逐个访问新的一组子节点中的节点，这里的变量 i 就是节点的索引。在 `for` 循环内，判断条件 `i !== seq[s]`，如果节点的索引 i 不等于 `seq[s]` 的值，则说明该节点对应的真实 DOM 需要移动，否则说明当前访问的节点不需要移动，这时需要递减 s。

接下来我们就按照上述思路执行更新。初始时索引指向节点 p-7。由于 p-7 对应的 source 数组中相同位置的元素值为 -1，所以我们应该将节点 p-7 作为全新的节点进行挂载。

```js
// oldStart 和 newStart 分别为起始索引，即 j
const oldStart = j
const newStart = j

if (moved) {
  // 如果 moved 为真，需要进行 DOM 移动操作
  // 计算最长递增子序列
  const seq = lis(source) // [0, 1]

  // s 指向最长递增子序列的最后一个元素
  let s = seq.length - 1
  // i 指向新的一组子节点中的最后一个元素
  let i = count - 1
  // for 循环使 i 递减
  for (i; i >= 0; i--) {
    if (source[i] === -1) {
      // 说明索引为 i 的节点是全新的节点，执行挂载操作
      // 该节点在新 children 中的真实位置索引
      const pos = i + newStart
      const newVNode = newChildren[pos]
      // 该节点的下一个节点的位置索引
      const nextPos = pos + 1
      // 锚点
      const anchor = nextPos < newChildren.length
        ? newChildren[nextPos].el
        : null
      // 挂载
      patch(null, newVNode, container, anchor)
    } else if (i !== seq[s]) {
      // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
    } else {
      // i === seq[s] 时，说明该位置的节点不需要移动
      // 只需要让 s 指向下一个位置
      s--
    }
  }
}
```

如果 `source[i]` 的值为 -1，则说明索引为 i 的节点是全新的节点，于是我们调用 patch 将其挂载到容器中。这里需要注意的是，由于索引 i 是重新编号后的，因此为了得到真实索引值，我们需要计算表达式 `i + newStart` 的值。

新节点创建完毕后，for 循环已经执行一次，此时索引 i 向上移动一步，指向节点 p-2。

<img src="./images/quick_diff17.png" />

接着，进行下一轮 for 循环。

* 第一步：判断 `source[i]` 是否等于 `-1` ？很明显，此时索引 i 的值为 2，`source[i]` 的值等于 1，因此节点 p-2 不是全新的节点，不需要挂载它，进行下一步的判断。
* 第二步：判断 `i !== seq[s]`  是否成立 ？此时索引 i 的值 为 2，索引 s 的值为 1。` 2 != seq[1]` ，因此节点 p-2 所对应的真实 DOM 需要移动。

第二步中，我们知道节点 p-2 所对应的真实 DOM 需要移动。

```js
if (moved) {
    // 如果 moved 为真，需要进行 DOM 移动操作
    // 计算最长递增子序列
    const seq = lis(source) // [0, 1]

    // s 指向最长递增子序列的最后一个元素
    let s = seq.length - 1
    // i 指向新的一组子节点中的最后一个元素
    let i = count - 1
    // for 循环使 i 递减
    for (i; i >= 0; i--) {
      if (source[i] === -1) {
        // 说明索引为 i 的节点是全新的节点，执行挂载操作
        // 该节点在新的一组子节点中的真实位置索引
        const pos = i + newStart
        const newVNode = newChildren[pos]
        // 该节点的下一个节点的位置索引
        const nextPos = pos + 1
        // 锚点
        const anchor = nextPos < newChildren.length
          ? newChildren[nextPos].el
          : null
        // 挂载
        patch(null, newVNode, container, anchor)
      } else if (i !== seq[s]) {
        // 如果节点的索引 i 不等于 seq[s] 的值，说明该节点需要移动
        // 该节点在新的一组子节点中的真实位置索引
        const pos = i + newStart
        const newVNode = newChildren[pos]
        // 该节点的下一个节点的位置索引
        const nextPos = pos + 1
        // 锚点
        const anchor = nextPos < newChildren.length
          ? newChildren[nextPos].el
          : null
        // 挂载
        insert(newVNode.el, container, anchor)
      } else {
        // i === seq[s] 时，说明该位置的节点不需要移动
        // 只需要让 s 指向下一个位置
        s--
      }
    }
  }
```

移动节点的实现思路类似于挂载全新的节点。不同点在于，移动节点是通过 `insert` 函数来完成的。

接着进行下一轮的循环。此时索引 i 指向节点 p-4。

<img src="./images/quick_diff18.png" />

更新过程仍然分为三个步骤。

* 第一步：判断表达式 `source[i]` 的值是否等于 -1 ? 很明显，此时索引 i 的值为 1，表达式 `source[1]` 的值为 3，条件不成立。所以，节点 p-4 不是全新节点，不需要挂载。
* 第二步：判断表达式 `i !== seq[s]` 是否成立？此时索引 i 的值为 1，索引 s 的值为 1，条件不成立。
* 第三步：由于第一步和第二步中的条件都不成立，所以代码会执行最重的 else 分支。这意味着，节点 p-4 所对应的真实 DOM 不需要移动，但我们仍然需要让索引 s 的值递减，即 `s--`。

节点 p-4 不需要移动，进行下一轮循环。

<img src="./images/quick_diff19.png" />

由上图可知，此时索引 i 指向节点 p-3。我们继续进行三个步骤的判断。

* 第一步：判断表达式 `source[i]` 的值是否等于 -1 ? 很明显，此时索引 i 的值为 0，表达式 `source[1]` 的值为 2，条件不成立。所以，节点 p-3 不是全新节点，不需要挂载。
* 第二步：判断表达式 `i !== seq[s]` 是否成立？此时索引 i 的值为 0，索引 s 的值为 1\0，条件不成立。
* 第三步：到了这里，这意味着节点 p-3 所对应的真实 DOM 也不需要移动。在这一轮更新完成之后，循环将会终止，更新完成。

以下是 Vue.js 3 求解给定序列的最长递增子序列的代码。

```js
// https://github.com/yw0525/core/blob/main/packages/runtime-core/src/renderer.ts
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```

#### 总结

快速 Diff 算法在实测中性能最优。它借鉴了文本 Diff 的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。

如果你想调试本篇文档案例，可以查看 [notes ](https://github.com/yw0525/notes/tree/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/renderer)中仓库中的 `books/Vue.js设计与实现/renderer` 文件夹，运行 `index.html` 文件即可。

`books/Vue.js设计与实现` 目录结构如下：

```
.
├── browser
├── effect
├── reactivity
├── ref
├── renderer
├── utils
├── vue
│   ├── computed.js
│   ├── effect.js
│   ├── reactive.js
│   ├── ref.js
│   ├── renderer.js
│   ├── util.js
│   └── watch.js
└── README.md
```

## 四、组件化

### 组件的实现原理

我们已经讲解过了浏览器的基本原理与实现。渲染器主要负责将虚拟 DOM 渲染为真实 DOM，我们只需要使用虚拟 DOM 来描述最终呈现的内容即可。但当我们编写比较复杂的页面时，用来描述页面结构的虚拟 DOM 的代码量会变的越多越多，或者说页面模板会变得越来越大。这时，我们就需要组件化的能力。有了组件，我们就可以将一个大页面拆分为多个部分，每一个部分都可以作为单独的组件，这些组件共同组成完善的页面。组件化的实现同样需要渲染器的支持。

#### 渲染组件

从用户的角度来看，一个有状态组件就是一个选项对象。

```js
const MyComponent = {
  name: 'MyComponent',
  data() {
    return { foo: 1 }
  }
}
```

但是，如果从渲染器的内部实现来看，一个组件则是一个特殊类型的虚拟  DOM 节点。例如，为了描述普通标签，我们使用虚拟节点的 `vnode.type` 属性来存储标签名称，如下面的代码所示：

```js
const vnode = {
  type: 'div',
  // ...
}
```

为了描述片段，我们让虚拟节点的 `vnode.type` 属性的值为 Fragment，例如：

```js
const vnode = {
  type: Fragment,
  // ...
}
```

为了描述文本，我们让虚拟节点的 `vnode.type` 属性的值为 Text。

```js
const vnode = {
  type: Text,
  // ...
}
```

渲染器的 patch 函数证明了上述内容：

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    // 作为普通元素处理
  } else if (type === Text) {
    // 作为文本节点处理
  } else if (type === Fragment) {
    // 作为片段处理
  }
}
```

可以看到，渲染器会使用虚拟节点的 type 属性来区分其类型。对于不同类型的节点，需要采用不同的处理方式来完成挂载和更新。

实际上，对于组件来说也是一样的。为了使用虚拟节点来描述组件，我们可以用虚拟节点的 `vnode.type` 属性来存储组件的选项对象。

```js
const vnode = {
  type: MyComponent,
  // ...
}
```

为了让渲染器能够处理组件类型的虚拟节点，我们还需要在 `patch` 函数中对组件类型的节点进行处理。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    // 作为普通元素处理
  } else if (type === Text) {
    // 作为文本节点处理
  } else if (type === Fragment) {
    // 作为片段处理
  } else if (typeof type === 'object') {
    // vnode.type 的值是选项对象，作为组件处理
    if (!n1) {
      // 挂载组件
      mountComponent(n2, container, anchor)
    } else {
      // 更新组件
      patchComponent(n1, n2, anchor)
    }
  }
}
```

在上面这段代码中，我们新增了一个 else if 分支，用来处理虚拟节点的 `vnode.type` 属性值为对象的情况，即将该虚拟节点作为组件的描述来看待，并调用 `mountElement` 和 `patchComponent` 函数来完成组件的挂载和更新。

渲染器有能力处理组件后，我们需要设计组件在用户层面的接口。这包括：用户应该如何编写组件？组件的选项对象必须是哪些内容？以及组件拥有哪些能力？等等。实际上，组件本身就是对页面内容的封装，它用来描述页面内容的一部分。因此，一个组件必须包含一个渲染函数，即 `render` 函数，并且渲染函数的返回值应该是虚拟 DOM。换句话来说，组件的渲染函数就是用来描述组件所渲染内容的接口，如下面的代码所示：

```js
const MyComponent = {
  // 组件名称
  name: 'MyComponent',
  // 组件的渲染函数，返回值必须为虚拟 DOM
  render() {
    return {
      type: 'div',
      children: '我是文本内容'
    }
  }
}
```

这个一个最简单的组件示例。有了基本的组件结构后，渲染器就可以完成组件的渲染。

```js
// 用来描述组件的 VNode 对象，type 属性值为组件的选项对象
const CompVNode = {
  type: MyComponent
}
// 调用渲染器渲染组件
renderer.render(CompVNode, document.querySelector('#app'))
```

浏览器真正完成组件渲染任务的是 `mountComponent` 函数，其具体实现如下：

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const { render } = componentOptions
  // 执行渲染函数，获取组件要渲染的内容，即 render 函数返回的虚拟 DOM
  const subTree = render()
  // 最后调用 patch 函数来挂载组件所描述的内容，即 subTree
  patch(null, subTree, container, anchor)
}
```

这样，我们就实现了最基本的组件化方案。

#### 组件状态与自更新

接下来，我们尝试为组件设计自身的状态，如下面的代码所示：

```js
const MyComponent = {
  name: 'MyComponent',
  // 用 data 函数定义组件自身状态
  data() {
    return {
      foo: 'hello world'
    }
  },
  render() {
    // 渲染函数中使用组件状态
    return {
      type: 'div',
      children: `foo 的值是：${ this.foo }`
    }
  }
}
```

在上面这段代码中，我们约定用户必须使用 data 函数来定义组件自身的状态，同时可以在渲染函数中通过 this 访问由 data 函数返回的状态数据。

下面的代码实现了组件自身状态的初始化：

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const { render, data } = componentOptions

  // 调用 data 函数得到原始数据
  const state = reactive(data())
  // 调用 render 函数时，将其 this 设置为 state，
  // 从而 render 函数内部可以通过 this 访问组件自身状态数据
  const subTree = render.call(state, state)
  // 最后调用 patch 函数来挂载组件所描述的内容，即 subTree
  patch(null, subTree, container, anchor)
}
```

如上面的代码所示，实现组件自身状态的初始化需要两个步骤：

* 通过组件的选项对象取得 data 函数并执行，然后调用 `reactive` 函数将 data 函数返回的状态包装为响应式数据；
* 调用 `render` 函数时，将其 this 的指向设置为响应式数据 `state`，同时将 `state` 作为 `render` 函数的第一个参数传递。

经过上述两步工作后，我们就实现了对组件自身状态的支持，以及在渲染函数内访问组件自身状态的能力。

当组件自身状态发生变化时，我们需要有能力触发组件更新，即组件的自更新。为此，我们需要将整个渲染任务包装到一个 `effect` 中。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const { render, data } = componentOptions

  // 调用 data 函数得到原始数据
  const state = reactive(data())
  
  // 将组件的 render 函数包装到 effect 内
  effect(() => {
    // 调用 render 函数时，将其 this 设置为 state，
    // 从而 render 函数内部可以通过 this 访问组件自身状态数据
    const subTree = render.call(state, state)
    // 最后调用 patch 函数来挂载组件所描述的内容，即 subTree
    patch(null, subTree, container, anchor)
  })
}
```

这样，一旦组件自身的响应式数据发生变化，组件就会自动重新执行渲染函数，从而完成更新。但是，由于 `effect` 的执行是同步的，因此当响应式数据发生变化时，与之关联的副作用函数会同步执行。换句话来说，如果多次修改响应式数据的值，将会导致渲染函数执行多次，这实际上是没有必要的。因此，我们需要设计一个机制，使得无论对响应式数据进行多少次修改，副作用函数都只会重新执行一次。为此，我们需要实现一个调度器，当副作用函数重新执行多次时，我们不会立即执行它，而是将它缓冲到一个微任务队列中，等到执行栈清空后，再将它从微任务队列中取出并执行。有了缓存机制，我们就有机会对任务进行去重，从而避免多次执行副作用函数带来的性能开销。

```js
// 缓存任务队列，用一个 Set 数据结构来表示，可以自动对任务进行去重
const queue = new Set()
// 一个标志，代表是否正在刷新任务队列
let isFlushing = false
// 创建一个立即 resolve 的 Promise 示例
const p = Promise.resolve()

// 调度器的主要函数，用来将一个任务添加到缓冲队列中，并开始刷新队列
function queueJob(job) {
  // 将 job 添加到任务队列 queue 中
  queue.add(job)
  // 如果还没有开始刷新队列
  if (!isFlushing) {
    // 将该标志设置为 true 避免重复刷新
    isFlushing = true
    // 微任务队列中刷新缓冲队列
    p.then(() => {
      try {
        // 执行任务队列中的任务
        queue.forEach(job => job())
      } catch (error) {
        // 重置状态
        isFlushing = false
        queue.length = 0
      }
    })
  }
}
```

上面是调度器的最小实现，本质上利用了微任务的异步执行机制，实现对副作用函数的缓冲。其中 `queueJob` 函数是调度器最主要的函数，用来将一个任务或副作用函数添加到缓冲队列中，并开始刷新队列。有了 `queueJob` 函数之后，我们就可以在创建渲染副作用函数时使用它。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const { render, data } = componentOptions

  // 调用 data 函数得到原始数据
  const state = reactive(data())
  
  // 将组件的 render 函数包装到 effect 内
  effect(() => {
    // 调用 render 函数时，将其 this 设置为 state，
    // 从而 render 函数内部可以通过 this 访问组件自身状态数据
    const subTree = render.call(state, state)
    // 最后调用 patch 函数来挂载组件所描述的内容，即 subTree
    patch(null, subTree, container, anchor)
  }, {
    // 指定该副作用函数的调度器为 queueJob 即可
    scheduler: queueJob
  })
}
```

这样，当响应式数据发生变化时，副作用函数不会立即同步执行，而是会被 `queueJob` 函数调度，最后在一个微任务中执行。

不过，上面这段代码仍存在缺陷。我们在 effect 函数内调用 patch 函数完成渲染时，第一个参数总是 null。这意味着，每次更新发生时都会进行全新的挂载，而不会打补丁，这是不正确的。正确的做法是：每次更新时，都拿新的 `subTree` 与上一次组件所渲染的 `subTree` 进行打补丁。为此，我们需要实现组件实例，用它维护整个生命周期的状态，这样渲染器才能够在正确地的时机执行合适的操作。

#### 组件实例与组件的生命周期

组件本质上就是一个状态集合，它维护着组件运行过程中的所有信息，例如注册到组件的生命周期，组件渲染的子树（`subTree`）、组件是否已经被挂载、组件自身的状态（data）等等。为了解决上一小节中关于组件更新的问题，我们需要引入组件实例的概念，以及与之相关的状态信息。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const { render, data } = componentOptions

  // 调用 data 函数得到原始数据
  const state = reactive(data())

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
  }

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance
  
  // 将组件的 render 函数包装到 effect 内
  effect(() => {
    // 调用 render 函数时，将其 this 设置为 state，
    // 从而 render 函数内部可以通过 this 访问组件自身状态数据
    const subTree = render.call(state, state)

    // 检查组件是否已经被挂载
    if (!instance.isMounted) {
      // 初次挂载，调用 patch 函数第一个参数传递 null
      patch(null, subTree, container, anchor)
      // 将组件示例的 isMounted 属性设置为 true
      instance.isMounted = true
    } else {
      // 当 isMounted 为 true 时，说明组件已经被挂载，只需要完成自更新即可
      // 所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树
      // 使用新的子树与上一次渲染的子树进行打补丁操作
      patch(instance.subTree, subTree, container, anchor)
    }

    // 更新组件实例的子树
    instance.subTree = subTree
  }, {
    // 指定该副作用函数的调度器为 queueJob 即可
    scheduler: queueJob
  })
}
```

在上面这段代码中，我们使用一个对象来表示组件实例，该对象有三个属性：

* state：组件自身的状态数据，即 data。
* `isMounted`：一个布尔值，用来表示组件是否被挂载。
* `subTree`：存储组件的渲染函数返回的虚拟 DOM，即组件子树（`subTree`）。

实际上，我们可以在需要的时候，任意地在组件实例 `instance` 上添加需要的属性。但需要注意的是，我们应该尽可能保持组件实例清凉，以减少内存占用。

在上面的实现中，组件实例的 `instance.isMounted` 属性可以用来区分组件的挂载和更新。因此，我们可以在合适的时机调用组件对应的生命周期钩子。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const {
    render, data,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()

  // 调用 data 函数得到原始数据
  const state = reactive(data())

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
  }

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance

  // 调用 created 钩子
  created && created.call(state)
  
  // 将组件的 render 函数包装到 effect 内
  effect(() => {
    // 调用 render 函数时，将其 this 设置为 state，
    // 从而 render 函数内部可以通过 this 访问组件自身状态数据
    const subTree = render.call(state, state)

    // 检查组件是否已经被挂载
    if (!instance.isMounted) {
      // 调用 beforeMount 钩子
      beforeMount && beforeCreate.call(state)

      // 初次挂载，调用 patch 函数第一个参数传递 null
      patch(null, subTree, container, anchor)
      // 将组件示例的 isMounted 属性设置为 true
      instance.isMounted = true

      // 调用 mounted 钩子
      mounted && mounted.call(state)
    } else {
      // 调用 beforeUpdate 钩子
      beforeUpdate && beforeUpdate.call(state)

      // 当 isMounted 为 true 时，说明组件已经被挂载，只需要完成自更新即可
      // 所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树
      // 使用新的子树与上一次渲染的子树进行打补丁操作
      patch(instance.subTree, subTree, container, anchor)

      // 调用 updated 钩子
      updated && updated.call(state)
    }

    // 更新组件实例的子树
    instance.subTree = subTree
  }, {
    // 指定该副作用函数的调度器为 queueJob 即可
    scheduler: queueJob
  })
}
```

这上面这段代码中，我们首先从组件的选项对象中取得注册到组件上的生命周期函数，然后在合适的时机调用它们，这其实就是组件生命周期的实现原理。实际上，由于可能存在多个同样的组件生命周期钩子，例如来自 `mixins` 中的生命周期函数，因此我们通常需要将组件生命周期钩子序列化为一个数组，但核心原理不变。

#### props 与组件的被动更新

在虚拟 DOM 层面，组件的 props 与普通 HTML 标签的属性差别不大。假设我们有如下模板：

```vue
<MyComponent title="A Big Title" :other="val" />
```

这段模板对应的虚拟 DOM 是：

```js
const vnode = {
  type: MyComponent,
  props: {
    title: 'A Big Title',
    other: this.val
  }
}
```

可以看到，模板与虚拟 DOM 几乎是 “同构” 的。另外，在编写组件时，我们需要显式地指定组件会接收哪些 props 数据。

```js
const MyComponent = {
  name: 'MyComponent',
  // 组件接收名为 title 的 props，并且该 props 的类型为 string
  props: {
    title: String
  },
  render() {
    return {
      type: 'div',
      // 访问 props 数据
      children: `count is: ${ this.title }`
    }
  }
}
```

所以，对于一个组件来说，有两部分关于 props 的内容我们需要关心：

* 为组件传递的 props 数据，即组件的 `vnode.props` 对象；
* 组件选项对象中定义的 props 选项，即 `MyComponent.props` 对象。

我们需要结合这两个选项来解析出组件在渲染时需要用到的 props 数据。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const {
    render, data, props: propsOption,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()

  // 调用 data 函数得到原始数据
  const state = reactive(data ? data() : {})
  // 调用 resolveProps 函数解析出最终的 props 数据与 attrs 数据
  const [props, attrs] = resolveProps(propsOption, vnode.props)

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
  }

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance

  // 调用 created 钩子
  created && created.call(state)
  
	// ...
}
```

```js
// 解析组件 props 和 attrs 数据
function resolveProps(options, propsData) {
  const props = {}
  const attrs = {}

  // 遍历组件传递的 props 数据
  for (const key in propsData) {
    if (key in options) {
      // 如果为组件传递的 props 数据在组件自身的 props 选项中有定义，
      // 则视为合法的 props
      props[key] = propsData[key]
    } else {
      // 否则将其视为 atts
      attrs[key] = propsData[key]
    }
  }

  // 最后返回 props 和 attrs 数据
  return [props, attrs]
}
```

在上面这段代码中，我们将组件选项中定义的 `MyComponent.props` 对象和为组件传递的 `vnode.props` 对象相结合，最终解析出组件在渲染时需要使用的 `props` 和 `attrs` 数据。这里需要注意两点：

* 在 vue.js 3 中，没有定义在 `MyComponent.props` 选项中的 `props` 数据将存储到 `attrs` 对象中。
* 上述实现中没有包含默认值、类型校验等内容处理。实际上，这些内容也都是围绕 `MyComponent.props` 以及 `vnode.props` 这两个对象展开的，实现起来并不复杂。

处理完 props 数据后，我们再来讨论关于 props 数据变化的问题。props 本质上是父组件的数据，当 props 发生变化时，会触发父组件渲染。假设父组件的模板如下：

```vue
<template>
	<MyComponent :title="title" />
</template>
```

其中，响应式数据 title 的初始值为字符串 “A Big Title”，因此首次渲染时，父组件的虚拟 DOM 为：

```js
// 父组件要渲染的内容
const vnode = {
  type: MyComponent,
  props: {
    title: 'A Big Title'
  }
}
```

当响应式数据 title 发生变化时，父组件的渲染函数会重新执行。假设 title 的值变为字符串 "A Small Title" ，那么新产生的虚拟 DOM 为：

```js
// 父组件要渲染的内容
const vnode = {
  type: MyComponent,
  props: {
    title: 'A Small Title'
  }
}
```

接着，父组件会进行自更新。在更新过程中，渲染器发现父组件的 `subTree` 包含组件类型的虚拟节点，所以会调用 `patchComponent` 函数完成子组件的更新。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    // ...
  } else if (type === Text) {
    // ...
  } else if (type === Fragment) {
    // ...
  } else if (typeof type === 'object') {
    // vnode.type 的值是选项对象，作为组件处理
    if (!n1) {
      // 挂载组件
      mountComponent(n2, container, anchor)
    } else {
      // 更新组件
      patchComponent(n1, n2, anchor)
    }
  }
}
```

其中，`patchComponent` 函数用来完成子组件的更新。我们把父组件自更新所引起的子组件更新叫做子组件的被动更新。当子组件发生被动更新时，我们需要做的是：

* 检查子组件是否真的需要更新，因为子组件的 props 可能是不变的；
* 如果需要更新，则更新子组件的 props、slots 等内容。

`patchComponent` 函数的具体实现如下：

```js
function patchComponent(n1, n2, anchor) {
  // 获取组件实例，即 n1.component，同时让新的组件虚拟节点 n2.component 也指向组件实例
  const instance = (n2.component = n1.component)
  // 获取当前的 props 数据
  const { props } = instance

  // 调用 hasPropsChanged 检测子组件传递的 props 是否发生变化，如果没有变化，则不需要更新
  if (hasPropsChanged(n1.props, n2.props)) {
    // 调用 resolveProps 函数重新获取 props 数据
    const [nextProps] = resolveProps(n2.type.props, n2.props)
    // 更新 props
    for (const k in nextProps) {
      props[k] = nextProps[k]
    }
    // 删除不存在的 props
    for (const k in props) {
      if (!(k in nextProps)) delete props[k]
    }

    // TODO：update 逻辑
  }
}
```

```js
function hasPropsChanged(prevProps, nextProps) {
  const nextKeys = Object.keys(nextProps)
  // 如果新旧 props 的数量变了，说明有变化
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i]
    // 有不相等的 props，则说明有变化
    if (nextProps[key] !== prevProps[key]) return true
  }
  return false
}
```

上面是组件被动更新的最小实现，有两点需要注意：

* 需要将组件实例添加到新的组件 `vnode` 对象上，即 `n2.component = n1.component`，否则下次更新时将无法取得组件实例；
* `instance.props` 对象本身是浅响应的。因此，在更新组件的 props 时，只需要设置 `intsance.props` 对象即可触发组件重新渲染。

在上面的代码中，我们没有处理 `attrs` 与 `slots` 的更新。`attrs` 的更新本质上与更新 `props` 的原理相似。实际上，要完善地实现 Vue.js 中的 props 机制，需要编写大量边界代码。但本质上来说，其原理都是根据组件的 props 选项定义以及为组件传递的 props 数据来处理的。

由于 props 数据与组件自身的状态数据都需要暴露到渲染函数中，并使得渲染函数能够通过 this 访问它们，因此我们需要封装一个渲染上下文对象。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  const {
    render, data, props: propsOption,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()

	// ...

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null
  }

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance

  // 创建渲染上下文对象，本质上是组件实例的代理
  const renderContext = new Proxy(instance, {
    get(t, k, r) {
      // 取得组件自身状态与 props 数据
      const { state, props } = t
      if (state && k in state) {
        // 尝试读取自身状态数据
        return state[k]
      } else if (k in props) {
        // 如果组件自身没有数据，尝试从 props 中读取
        return props[k]
      } else {
        console.error('不存在')
      }
    },
    set(t, k, v, r) {
      const { state, props } = t
      if (state && k in state) {
        state[k] = v
      } else if (k in props) {
        props[k] = v
      } else {
        console.error('不存在')
      }
    }
  })

  // 调用 created 钩子
  created && created.call(state)
  
	// ...
}
```

在上面这段代码中，我们为组件实例创建了一个代理对象，该对象即渲染上下文对象。它的意义在于拦截数据状态的读取和设置操作，每当在渲染函数或生命周期钩子中通过 this 来读取数据时，都会优先从组件的自身状态中读取，如果组件本身没有对应的数据，则再从 props 数据中读取。最后我们将渲染上下文作为渲染函数以及声明周期钩子的 this 值即可。

实际上，除了组件自身的数据以及 props 数据之外，完整的组件还包含 `methods`、`computed` 等选项中定义的数据和方法，这些内容都应该在渲染上下文对象中处理。

#### setup 函数的作用与实现

组件的 setup 函数是 Vue.js 3 新增的组件选项，它有别于 Vue.js 2 中存在的其他组件选项。这是因为 setup 函数主要用于配合组合式 API，为用户提供一个地方，用于建立组合逻辑、创建响应式数据、创建通用函数、注册声明周期钩子等能力。在组件的整个生命周期中，`setup` 函数只会在被挂载时执行一次，它的返回值可以有两种情况。

**1. 返回一个函数，该函数将作为组件的 render 函数：**

```js
const Comp = {
  setup() {
    // setup 函数可以返回一个函数，该函数将作为组件的渲染函数
    return () => {
      return { type: 'div', children: 'hello' }
    }
  }
}
```

这种方式常用于组件不是以模板来表达其渲染内容的情况。如果组件以模板来表达其渲染内容，那么 setup 函数不可以再返回函数，否则会与模板编译生成的渲染函数产生冲突。

**2. 返回一个对象，该对象中包含的数据将暴露给模板使用：**

```js
cosnt Comp = {
  setup() {
    const count = ref(0)
    // 但会一个对象，对象中的数据会暴露到渲染函数中
  },
  render() {
    // 通过 this 可以访问 setup 暴露出的响应式数据
    return { type: 'div', children: `count is：${ this.count }` }
  }
}
```

可以看到，setup 函数暴露的数据可以在渲染函数中通过 this 来访问。

另外，setup 函数接收两个参数。第一个参数是是 props 数据对象，第二个参数也是一个对象，通常称为 `setupContext`。

```js
const Comp = {
  props: {
    foo: String
  },
  setup(props, setupContext) {
    // 访问传入的 props 数据
    props.foo 
    // setupContext 中包含与组件接口相关的重要数据
    const { slots, emit, attrs, expose } = setupContext
    // ...
  }
}
```

从上面的代码可以看出，我们可以通过 setup 函数的第一个参数取得外部为组件传递的 props 数据对象。同时，setup 函数还接收第二个参数 `setupContext` 对象，其中保存着与组件接口相关的数据和方法：

* `slots`：组件接收到的插槽；
* `emit`：一个函数，用来发射自定义事件；
* `attrs`：当为组件传递 props 时，那些没有显式声明为 props 的属性会存储到 `attrs` 对象中；
* `expose`：一个函数，用来显式地对外暴露组件数据。

通常情况下，不建议将 setup 与 Vue.js 2 中其他组件选项混用。例如 `data`、`watch`、`methods` 等选项，我们称之为 "传统" 组件选项。在 Vue.js 3 的场景下，更加提供组合式 API，setup 函数就是为组合式 API 而生的。混用组合式 API 的 setup 选项与 ”传统“ 组件选项并不是明智的选择，因为这样会带来语义和理解上的负担。

接下来，我们就围绕上述这些能力尝试实现 `setup` 组件选项。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    // ....
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()

	// ...

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null
  }

  // setupContext
  const setupContext = { attrs }
  // 调用 setup 函数，将只读版本的 props 作为第一个参数传递，避免用户意外地修改 props 的值
  // 将 setupContext 作为第二个参数传递
  const setupResult = setup(shallowReadonly(instance.props), setupContext)
  // setupState 用来存储由 setup 返回的数据
  let setupState = null
  // 如果 setup 函数的返回值是函数，则将其作为渲染函数
  if (typeof setupResult === 'function') {
    if (render) console.error('setup 函数返回渲染函数，render 选项将被忽略')
    // 将 setupResult 作为渲染函数
    render = setupResult
  } else {
    // 如果 setup 的返回值不是函数，则作为数据状态赋值给 setupState
    setupState = setupResult
  }

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance

  // 创建渲染上下文对象，本质上是组件实例的代理
  const renderContext = new Proxy(instance, {
    get(t, k, r) {
      // 取得组件自身状态与 props 数据
      const { state, props } = t
      if (state && k in state) {
        // 尝试读取自身状态数据
        return state[k]
      } else if (k in props) {
        // 如果组件自身没有数据，尝试从 props 中读取
        return props[k]
      } else if (setupState && k in setupState) {
        // 渲染上下文需要增加对 setupState 的支持
        return setupState[k]
      } else {
        console.error('不存在')
      }
    },
    set(t, k, v, r) {
      const { state, props } = t
      if (state && k in state) {
        state[k] = v
      } else if (k in props) {
        props[k] = v
      } else if (setupState && k in setupState) {
        setupState[k] = v
      } else {
        console.error('不存在')
      }
    }
  })

  // 调用 created 钩子
  created && created.call(renderContext)
  
 	// ...
}
```

上面是 setup 函数的最小实现，有以下几点需要注意：

* `setupContext` 是一个对象，包含 `attrs`、`emit`、`slots` 等内容。
* 我们通过检测 setup 函数的返回值类型来决定应该如何处理它。如果它的返回值为函数，则直接将其作为组件的渲染函数。这里需要注意的是，为了避免产生歧义，我们需要检查组件选项中是否已经存在 render 函数，如果泡在，则需要打印警告信息。
* 渲染上下文 `renderContext` 应该正确地处理 `setupState`，因为 `setup` 函数返回的数据状态也应该暴露到渲染环境。

> [代码实现](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/component/index05.js)

#### 组件事件与 emit 的实现

emit 用来发射组件的自定义事件，如下面的代码所示：

```js
const MyComponent = {
  name: 'MyComponent',
  setup(props, { emit }) {
    // 发生 change 事件，并传递给事件处理函数两个参数
    emit('change', 1, 2)

    return () => {
      return { type: 'div', children: 'hello world' }
    }
  }
}
```

当使用该组件时，我们可以监听由 emit 函数发射的自定义事件：

```vue
<MyComponent @change="handler" />
```

上面这段模板对应的虚拟 DOM 为：

```js
const CompVNode = {
  type: MyComponent,
  props: {
    onChange: handler
  }
}
```

可以看到，自定义事件 change 被编译为名为 `onChange` 的属性，并存储在 `props` 数据对象中，这实际上是一种约定。作为框架设计者，也可以按照自己期望的方式来设计事件的编译结果。

在具体的实现上，发生自定义事件的本质就是根据事件名称去 props 数据对象中寻找对应的事件处理函数并执行。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()

  // 调用 data 函数得到原始数据
  const state = reactive(data ? data() : {})
  // 调用 resolveProps 函数解析出最终的 props 数据与 attrs 数据
  const [props, attrs] = resolveProps(propsOption, vnode.props)

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null
  }

  // 定义 emit 函数，它接收两个参数
  // event：事件名称
  // payload：传递给事件处理函数的参数
  function emit(event, ...payload) {
    // 根据约定对事件名称进行处理
    const eventName = `on${ event[0].toUpperCase() + event.slice(1) }`
    // 根据处理后的事件名称去 props 中寻找对应的事件处理函数
    const handler = instance.props[eventName]

    if (handler) {
      // 调用事件处理函数并传递参数
      handler(...payload)
    } else {
      console.error('事件不存在')
    }
  }

  // ...
}
```

整体实现并不复杂，只需要实现一个 emit 函数并将其添加到 `setupContext` 对象中，这样用户就可以通过 `setupContext` 取得 emit 函数。另外，当 emit 函数被调用时，我们会根据约定对事件名称进行转换，以便能够在 props 数据对象中找到对应的事件处理函数。最后，调用事件处理函数并透传参数即可。

这里有一点需要额外注意，我们在实现 `resolveProps` 函数时提到，任何没有显式声明为 props 的属性都会存储到 `attrs` 中。换句话来说，任何事件类型的 props，即 `onXxx` 这类的属性，都不会出现在 props 中。这会导致我们无法根据事件名称在 `instance.props` 中找到对应的事件处理函数。为了解决这个问题，我们需要在解析 props 数据的时候对事件类型的 props 做特殊处理。

```js
// 解析组件 props 和 attrs 数据
function resolveProps(options = {}, propsData) {
  const props = {}
  const attrs = {}

  // 遍历组件传递的 props 数据
  for (const key in propsData) {
    if (key in options || key.startsWith('on')) {
      // 如果为组件传递的 props 数据在组件自身的 props 选项中有定义，
      // 则视为合法的 props
      props[key] = propsData[key]
    } else {
      // 否则将其视为 atts
      attrs[key] = propsData[key]
    }
  }

  // 最后返回 props 和 attrs 数据
  return [props, attrs]
}
```

处理方式很简单，通过检测 `propsData` 的 key 值来判断它是否以字符串 'on' 开头，如果是，则认为该属性是组件的自定义事件。这时。即使组件没有显式地将其声明为 props，我们特将它添加到最终解析的 props 数据中，而不是添加到 `attrs` 对象中。

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/component/index06.js)

#### 插槽的工作原理与实现

顾名思义，组件的插槽指组件会预留一个槽位，该槽位具体要渲染的内容由用户插入，如下面给出的 `MyComponent` 组件的模板所示：

```vue
<template>
	<header><slot name="header" /></header>
	<div>
    <slot name="body" />
  </div>
  <footer><slot name="footer" /></footer>
</template>
```

当在父组件使用 `<MyComponet>` 组件时，可以根据插槽的名字来插入自定义的内容。

 ```vue
 <MyComponent>
 	<template #header>
 		<h1>我是标题</h1>
   </template>
   <template #body>
 		<section>我是内容</section>
   </template>
   <template #footer>
   	<p>我是注脚</p>
   </template>
 </MyComponent>
 ```

上面这段父组件的模板会被编译为如下渲染函数：

```js
// 父组件的渲染函数
function render() {
  return {
    type: MyComponent,
    // 组件的 children 会被编译成一个对象
    children: {
      header() {
        return { type: 'h1', children: '我是标题' }
      },
      body() {
        return { type: 'section', children: '我是内容' }
      },
      footer() {
    	  return { type: 'p', children: '我是注脚' }
      }
    }
  }
}
```

可以看到，组件模板中的插槽内容会被编译为插槽函数，而插槽函数的返回值就是具体的插槽内容。组件 `MyComponent` 的模板则会被编译为如下渲染函数：

```js
// MyComponent 组件模板的编译结果
function render() {
  return [
    {
      type: 'header',
      children: [this.$slots.header()]
    },
    {
      type: 'div',
      children: [this.$slots.body()]
    },
    {
      type: 'footer',
      children: [this.$slots.footer()]
    }
  ]
}
```

可以看到，渲染插槽内容的过程，就是调用插槽函数并渲染由其返回的内容的过程。这与 React 中 render props 的概念非常相似。

在运行时的实现上，插槽则依赖于 `setupContext` 中的 `slots` 对象。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()
	
  // ...

  // 使用编译好的 vnode.children 对象作为 slots 对象即可
  const slots = vnode.children || {}

  // setupContext
  const setupContext = { attrs, emit, slots }
  
	// ...
}

```

可以看到，最基本的 slots 的实现非常简单。只需要将编译好的 `vnode.children` 作为 slots 对象，最后将 slots 对象添加到 `setupContext` 对象中。为了在 render 函数内和生命周期钩子函数内通过 `this.$slots` 来访问插槽内容，我们还需要在 `renderContext` 中特殊处理 `$slots` 属性。

```js

function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()

  // 调用 data 函数得到原始数据
  const state = reactive(data ? data() : {})
  // 调用 resolveProps 函数解析出最终的 props 数据与 attrs 数据
  const [props, attrs] = resolveProps(propsOption, vnode.props)
  // 使用编译好的 vnode.children 对象作为 slots 对象即可
  const slots = vnode.children || {}

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null,
    // 将插槽添加到组件实例上
    slots
  }
		
  // ...
  
  // setupContext
  const setupContext = { attrs, emit, slots }
	
  // ...

  // 创建渲染上下文对象，本质上是组件实例的代理
  const renderContext = new Proxy(instance, {
    get(t, k, r) {
      // 取得组件自身状态与 props 数据
      const { state, props, slots } = t

      if (k === '$slots') return slots;

			// ...
    },
    set(t, k, v, r) {
  		// ...
    }
  })
	
  // ...
}
```

我们对渲染上下文 `renderContext` 代理对象的 get 拦截函数做了特殊处理，当读取的键是 `$slots` 时，直接返回组件实例上的 slots 对象，这样用户就可以通过 `this.$slots` 来访问插槽内容了。

因为编译后组件模板的 render 函数返回一个数组，我们需要对此进行处理：

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions
	
  // ...
  
  // 将组件的 render 函数包装到 effect 内
  effect(() => {
    const subTree = render.call(renderContext, renderContext)

    // 检查组件是否已经被挂载
    if (!instance.isMounted) {
      // 调用 beforeMount 钩子
      beforeMount && beforeCreate.call(renderContext)

      if (Array.isArray(subTree)) {
        // 如果组件 render 函数返回的是数组，循环挂载
        subTree.forEach(tree => {
          patch(null, tree, container, anchor)
        })
      } else {
        // 初次挂载，调用 patch 函数第一个参数传递 null
        patch(null, subTree, container, anchor)
      }

      // 将组件示例的 isMounted 属性设置为 true
      instance.isMounted = true

      // 调用 mounted 钩子
      mounted && mounted.call(renderContext)
    } else {
     	// ...
    }

    // 更新组件实例的子树
    instance.subTree = subTree
  }, {
    // 指定该副作用函数的调度器为 queueJob 即可
    scheduler: queueJob
  })
}
```

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/component/index07.js)

#### 注册生命周期

在 Vue.js 中，有一部分组合式 API 是用来注册生命周期钩子函数的，例如 `onMounted`、`onUpdated` 等。

```js
const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted 1')
    })

    onMounted(() => {
      console.log('mounted 2')
    })
  }
}
```

在 setup 函数中调用 `onMounted` 函数即可注册 `mounted` 生命周期钩子函数，并且可以通过多次调用 `onMounted` 函数来注册多个钩子函数，这些函数会在组件被挂在之后再执行。这里的问题在于，在 A 组件的 setup 函数中调用 `onMounted` 函数会将该钩子函数注册到 A 组件上；而在 B 组件的 setup 函数中调用 `onMounted` 函数会将钩子函数注册到 B 组件上，这是如何实现的呢？

实际上，我们需要维护一个变量 `currentInstance`，用它来存储当前组件实例，每当初始化并执行组件的 setup 函数之前，先将 `currentInstance` 设置为当前组件实例，再执行组件的 setup 函数时，我们就可以通过 `currentInstance` 来获取当前正在被初始化的组件实例，从而将那些与 `onMounted` 函数注册的钩子函数与组件实例相关联。

接下来我们着手实现。首先需要设计一个当前实例的维护方法。

```js
// 全局变量，存在当前正在被初始化的组件实例
let currentInstance = null
// 该方法接收组件实例作为参数，并将该组件实例设置为 currentInstance
function setCurrentInstance(instance) {
  currentInstance = instance
}
```

有了 `currentInstance` 变量，以及用来设置该变量的 `setCurrentInstance` 函数之后，我们就可以着手修改 `mounteComponent` 函数了。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions
	
  // ...

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null,
    // 将插槽添加到组件实例上
    slots,
    // 组件实例中添加 mounted 数组，用来存储通过 onMounted 函数注册的生命周期钩子函数
    mounted: []
  }
	
  // ...

  // setupContext
  const setupContext = { attrs, emit, slots }

  // 调用 setup 函数之前，设置当前组件实例
  setCurrentInstance(instance)
  
  // 调用 setup 函数，将只读版本的 props 作为第一个参数传递，避免用户意外地修改 props 的值
  // 将 setupContext 作为第二个参数传递
  const setupResult = setup(shallowReadonly(instance.props), setupContext)

  // 在 setup 函数执行完毕之后，重置当前组件实例
  setCurrentInstance(null)
	
  // ...
}

```

上面这段代码以 `onMounted` 函数为例进行说明。为了存储由 `onMounted` 函数注册的生命周期钩子，我们需要在组件实例对象上添加 `instance.mounted` 数组。之所以 `instance.mounted` 的数据类型是数组，是因为在 `setup` 函数中，可以多次调用 `onMounted` 函数来注册不同的生命周期函数，这些生命周期函数都存储在 `instance.mounted` 数组中。

现在，组件实例的维护已经搞定了。接下来考虑 `onMounted` 函数本身的实现。

```js
function onMounted(fn) {
  if (currentInstance) {
    // 将生命周期函数添加到 instance.mounted 数组中
    currentInstance.mounted.push(fn)
  } else {
    console.error('onMounted 函数只能在 setup 中调用')
  }
}
```

可以看到，整体实现非常简单直观。只需要通过 `currentInstance` 取得当前组件实例，并将生命周期钩子函数添加到当前实例对象的 `instance.mounted` 数组中即可。另外，如果当前实例不存在，则说明用户没有在 setup 函数内调用 `onMounted` 函数，这时错误的用法，因此我们应该抛出错误及其原因。

最后一步需要做的是，在合适的时机调用这些注册在 `instance.mounted` 数组中的生命周期钩子函数。

```js
function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions

  // 调用 beforeCrate 钩子
  beforeCreate && beforeCreate()
	
  // ...
  
  // 将组件的 render 函数包装到 effect 内
  effect(() => {
    const subTree = render.call(renderContext, renderContext)

    // 检查组件是否已经被挂载
    if (!instance.isMounted) {
      // 调用 beforeMount 钩子
      beforeMount && beforeCreate.call(renderContext)

      // 遍历 instance.mounted 数组并逐个执行即可
      if (Array.isArray(instance.mounted)) {
        instance.mounted.forEach(hook => hook.call(renderContext))
      }

     	// ...

      // 将组件示例的 isMounted 属性设置为 true
      instance.isMounted = true

      // 调用 mounted 钩子
      mounted && mounted.call(renderContext)
    } else {
    	// ...
    }

    // 更新组件实例的子树
    instance.subTree = subTree
  }, {
    // 指定该副作用函数的调度器为 queueJob 即可
    scheduler: queueJob
  })
}
```

可以看到，我们只需要在合适的时机遍历 `instance.mounted` 数组，并逐个执行该数组内的生命周期钩子函数即可。

对于除 mounted 以外的生命周期钩子函数，其原理同上。

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/component/index08.js)

#### 总结

本篇文章中，我们首先讨论了如何使用虚拟节点来描述组件。使用虚拟节点的 `vnode.type` 属性来存储组件对象，渲染器根据虚拟节点的该属性的类型来判断它是都是组件。如果是组件，则渲染器会使用 `mountComponent` 和 `patchComponent` 来完成组件的挂载和更新。

接着，我们讨论了组件的自更新。我们知道，在组件挂载阶段，会为组件创建一个用于渲染其内容的副作用函数。该副作用函数会与组件自身的响应式数据建立响应联系。当组件自身的响应式数据发生变化时，会触发渲染副作用函数重新执行，即重新渲染。但由于默认情况下重新渲染是同步执行的，这导致无法对任务去重，因此我们在创建渲染副作用函数时，指定了自定义的调度器。该调度器的作用是：当组件自身的响应式数据发生变化时，将渲染副作用函数缓存到微任务队列中。有了缓冲队列，我们即可实现对渲染任务去重，从而避免无用的重新渲染所导致的额外性能开销。

然后，我们介绍了组件实例。它本质上是一个对象，包含了组件运行过程中的状态，例如组件是否挂载、组件自身的响应式数据，以及组件所渲染的内容（即 `subTree`）等。有了组件实例后，在渲染副作用函数内，我们就可以根据组件实例上的状态标识，来决定应该进行全新的挂载，还是打补丁。

我们还讨论了组件的 props 与组件的被动更新。副作用自更新所引起的子组件更新叫做子组件的被动更新。我们还介绍了渲染上下（`renderContext`），它实际上是组件实例的代理对象。在渲染函数内访问组件实例所暴露的数据都是通过该代理对象实现的。

之后，我们讨论了 setup 函数。该函数是为了组合式 API 而生的，所以我们要避免将其与 Vue.js 2 中的 “传统” 组件选项混合使用。setup 函数的返回值可以是两种类型，如果返回函数，则将该函数作为组件的渲染函数；如果返回数据对象，则将该对象暴露到渲染上下文中。

emit 函数包含在 `setupContext` 对象中，可以通过 `emit` 函数发射组件的自定义事件。通过 `v-on` 指令为组件绑定的事件经过编译后，会以 `onXxx` 的形式存储到 props 对象中。当 emit 函数执行时，会在 props 对象中寻找对应的事件处理函数执行它。

随后，我们讨论了组件的插槽。它借鉴了 `Web Component` 中 `<slot>` 标签的概念。插槽内容会被编译为插槽函数，插槽函数的返回值就是向槽位填充的内容。`<slot>` 标签则会被编译为插槽函数的调用，通过指定对应的插槽函数，得到外部向槽位填充的内容（即虚拟 DOM），最后将内容渲染到槽位中。

最后，我们讨论了 `onMounted` 等用于注册声明周期钩子函数的方法的实现。通过 `onMounted` 注册的声明周期函数会被注册到当前组件实例的 `instance.mounted` 数组中。为了维护当前正在初始化的组件实例，我们定义了全局变量 `currentInstance`，以及用来设置该变量的 `setCurrentInstance` 函数。

### 异步组件与函数式组件

我们已经详细讨论了组件的基本含义与实现。本章，我们将继续讨论组件的两个重要概念，即异步组件和函数式组件。在异步组件中，“异步” 二字指的是，以异步的方式加载并渲染一个组件。这在代码分割、服务端下发组件等场景中尤为重要。而函数式组件允许使用一个普通函数定义组件，并使用该函数的返回值作为组件要渲染的内容。函数式组件的特点是：无状态、编写简单且直观。在 Vue.js 2 中，相比有状态组件来说，函数式组件具有明显的性能优势。但在 Vue.js 3 中，函数式组件与有状态组件的性能差距不大，都很好。正如 Vue.js RFC 的原文所述：“在 Vue.js 3 中使用函数式组件，主要是因为它的简单性，而不是因为它的性能好”。

#### 异步组件要解决的问题

从根本上来说，异步组件的实现不需要任何框架层面的支持，用户完全可以自行实现。渲染 `App` 组件到页面的示例如下：

```js
import App from 'App.vue'
createApp(App).mount('#app')
```

上面这段代码所展示的就是同步渲染。我们可以轻易地将其修改为异步渲染，如下面的代码所示：

```js
const loader = () => import('App.vue')
loader().then(App => {
  createApp(App).mount('#app')
})
```

这里我们使用动态导入语句 `import()` 来加载组件，它会返回一个 Promise 实例。组件加载成功后，会调用 `createApp` 函数完成挂载，这样就实现了以异步的方式来渲染页面。

上面的例子实现了整个页面的异步渲染。通常一个页面会有多个组件构成，每个组件负责渲染页面的一部分。那么，如果只想异步渲染部分页面，要怎么办呢？这时，只需要有能力异步加载某一个组件就可以了。假设下面的代码是 `App.vue` 组件的代码。

```vue
<template>
	<CompA />
	<component :is="asyncComp" />
</template>

<script>
import { shallowRef } from 'vue'
import CompA from 'CompA.vue'
 
export default {
  components: { CompA },
  setup() {
    const asyncComp = shallowRef(null)
    
    // 异步加载 Comp 组件
    import('CompB.vue').then(CompB => asyncComp.value = CompB)
    
    return {
      asyncComp
    }
  }
}
</script>
```

从这段代码的模板中可以看出，页面是由 `<CompA />` 组件和动态组件 `<component>` 构成。其中，`CompA` 组件是同步渲染的，而动态组件绑定了 `asyncComp` 变量。继续看脚本块，我们通过动态导入语句 `import()` 来异步加载 `CompB` 组件，当加载成功后，将 `asyncComp` 变量的值设置为 `CompB`。这样就实现了 `CompB` 组件的异步加载和渲染。

不过，虽然用户可以自行实现组件的异步加载和渲染，但整体实现还是比较复杂的，因为一个完善的异步组件的实现，所涉及的内容要比上面的例子负责的多。通常在异步加载组件时，我们还要考虑以下几个方面。

* 如果组件加载失败或加载超时，是否要渲染 Error 组件？
* 组件在加载时，是否要展示占位的内容？例如渲染一个 Loading 组件。
* 组件加载的速度可能很快，也可能很慢，是否要设置一个延迟展示 Loading 组件的时间？如果组件在 200 ms 内没有加载成功才展示 Loading 组件，这样可以避免由组件加载过快所导致的闪烁。
* 组件加载时候后，是否需要重试？

为了替用户更好地解决上述问题，我们需要在框架层面为异步组件提供更好的封装支持，与之对应的能力如下：

* 允许用户指定加载出错时要渲染的组件。
* 允许用户指定 Loading 组件，以及展示该组件的延迟时间。
* 允许用户设置加载组件的超时时长。
* 组件加载失败时，为用户提供重试的能力。

以上这些内容就是异步组件真正要解决的问题。

#### 异步组件的实现原理

##### 封装 defineAsyncComponent

异步组件本质上是通过封装手段来实现友好的用户接口，从而降低用户层面的使用复杂度，如下面的用户代码所示：

```vue
<template>
	<AsynComp />
</template>

<script>
export default {
  components: {
    // 使用 definedAsyncComponent 定义一个异步组件，它接收一个加载器作为参数
    AsyncComp: defineAsyncComponent(() => import('CompA'))
  }
}
</script>
```

在上面这段代码中，我们使用 `defineAsyncComponent` 来定义异步组件，并直接使用 components 组件选项来注册它。这样，在模板中就可以像使用普通组件一样使用异步组件了。可以看到，使用 `defineAsyncComponent` 函数定义异步组件的方式，比我们自己实现的异步组件方式要简单直接得多。

`defineAsyncComponent` 是一个高阶组件，它最基本的实现如下：

```js
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(loader) {
  // 一个变量，用来存储异步加载的组件
  let InnerComp = null
  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader().then(c => {
        InnerComp = c
        loaded.value = true
      })
      return () => {
        // 如果异步组件加载成功，则渲染该组件，否则渲染一个占位内容
        return loaded.value ? { type: InnerComp } : { type: Text, children: '' }
      }      
    }
  }
}
```

这里有以下几个关键点：

* `defineAsyncComponent` 函数本质上是一个高阶组件，它的返回值是一个包装组件。
* 包装组件会根据加载器的状态来决定渲染什么内容。如果加载器成功创建了组件，则渲染被加载的组件，否则只会渲染一个占位内容。
* 通常占位内容是一个注释节点。组件没有被加载成功后，页面中会渲染一个注释节点来占位。这里我们使用了一个空文本节点来占位。

##### 超时与 Error 组件

异步组件通常是以网路请求的形式进行加载。前端发送一个 HTTP 请求，请求下载组件的 JavaScript 资源，或者从服务器直接获取组件数据。既然存在网络请求，那么必然要考虑网络较慢的情况，尤其是在弱网环境下，加载一个组件可能要需要很长时间。因此，我们需要为用户提供指定超时时长的能力，当加载组件的时间超过指定时长后，会触发超时错误。这时如果用户配置了 Error 组件，则会渲染组件。

首先，我们来设计用户接口。为了让用户能够指定超时时长，`defineAsyncComponent` 函数需要接收一个配置对象作为参数：

```js
const AsyncComp = defineAsyncComponent({
  loader: () => import('CompA.vue'),
  timeout: 2000, // 超时时长，其单位为 ms
  errorComponent: MyErrorComp // 指定出错时要渲染的组件
})
```

* loader：指定异步组件的加载器
* timeout：单位为 ms，指定超时时长
* `errorComponent`：指定一个 Error 组件，发生错误时会渲染它

设计好用户接口之后，我们就可以给出具体实现了：

```js
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(options) {
  // options 既可以是配置项，也可以是加载器
  if (typeof options === 'function') {
    // 如果是 options 是加载器，将其格式化配置项形式
    options = {
      loader: options
    }
  }

  const { loader } = options

  // 一个变量，用来存储异步加载的组件
  let InnerComp = null

  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 代表是否超时，默认为 false
      const timeout = ref(false)

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader().then(c => {
        InnerComp = c
        loaded.value = true
      })

      let timer = null
      if (options.timeout) {
        // 如果指定超时时长，开启一个定时器
        timer = setTimeout(() => {
          // 超时后将 timeout 设置为 true
          timeout.value = true
        }, options.timeout)
      }
      // 包装组件被卸载时清除定时器
      onUnmounted(() => clearTimeout(timer))

      // 占位内容
      const placeholder = { type: Text, children: '' }

      return () => {
        if (loaded.value) {
          // 如果异步组件加载成功，渲染该组件
          return { type: InnerComp }
        } else if (timeout.value) {
          // 如果加载超时，并且用户指定 Error 组件，则渲染该组件
          return options.errorComponent ? { type: options.errorComponent } : placeholder
        }
        // 渲染一个占位内容
        return { type: Text, children: '' }
      }      
    }
  }
}
```

整体实现并不复杂，关键点如下：

* 需要一个标志变量来标识异步组件的加载是否已经超时，即 `timeout.value`。
* 开始加载组件的同时，开启一个定时器进行计时。当加载超时后，将 `timeout.value` 的值设置为 true，代表加载已经超时。这里需要注意的是，当包装组件被卸载时，需要清除定时器。
* 包装组件根据 loaded 变量的值以及 timeout 变量的值来决定具体的渲染内容。如果异步组件加载成功，则渲染被加载的组件；如果异步组件加载超时，并且用户指定 Error 组件，则渲染 Error 组件。

这样，我们就实现了对加载超时的兼容，以及对 Error 组件的支持。除此之外，我们希望有更加完善的机制来处理异步组件加载过程中发生的错误，超时只是错误的原因之一。基于此，我们还希望为用户提供以下能力。

* 当错误发生时，把错误对象作为 Error 组件的 props 传递过去，以便用户后续能自行进行更细粒度的处理。
* 除了超时之外，有能力处理其他原因导致的加载错误，例如网络失败等。

为了实现这两个目标，我们需要对代码做一些调整。

```js
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(options) {
  // options 既可以是配置项，也可以是加载器
  if (typeof options === 'function') {
    // 如果是 options 是加载器，将其格式化配置项形式
    options = {
      loader: options
    }
  }

  const { loader } = options

  // 一个变量，用来存储异步加载的组件
  let InnerComp = null

  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 代表是否超时，默认为 false
      const timeout = ref(false)
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null)

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader()
        .then(c => {
          InnerComp = c
          loaded.value = true
        })
        // 添加 catch 语句来捕获加载过程中的错误
        .catch(err => error.value = err)

      let timer = null
      if (options.timeout) {
        // 如果指定超时时长，开启一个定时器
        timer = setTimeout(() => {
          // 超时后创建一个错误对象，并赋值给 error.value
          const err = new Error(`Async component timed out after ${ options.timeout }ms.`)
          err.value = err
          // 超时后将 timeout 设置为 true
          timeout.value = true
        }, options.timeout)
      }
      // 包装组件被卸载时清除定时器
      onUnmounted(() => clearTimeout(timer))

      // 占位内容
      const placeholder = { type: Text, children: '' }

      return () => {
        if (loaded.value) {
          // 如果异步组件加载成功，渲染该组件
          return { type: InnerComp }
        } else if (timeout.value && options.errorComponent) {
          // 如果加载超时，并且用户指定 Error 组件，则渲染该组件
          // 同时将 error 作为 props 传递
          return { type: options.errorComponent, props: { error: error.value } }
        }
        // 渲染一个占位内容
        return { type: Text, children: '' }
      }      
    }
  }
}
```

观察上面的代码，我们对之前的实现做了一些调整，首先，为加载器添加 catch 语句来捕获所有加载错误。接着，当加载超时后，我们会创建一个新的错误对象，并将其赋值给 `error.value` 变脸。在组件渲染时，只要 `error.value` 值存在，且用户配置了 `errorComponent` 组件，就直接渲染 `errorComponent` 组件并将 `error.value` 的值作为该组件的 props 传递。这样，用户就可以在自己的 Error 组件上，通过定义名称 error 的 props 来接收错误对象，从而实现细粒度的控制。

##### 延迟与 Loading 组件

异步加载组件受网络影响比较大，加载过程可能很慢，也可能很快。这时我们就会很自然地想到，对于第一种情况，我们能否通过展示 Loading 组件来提供更好的用户体验。这样，用户就不会有 “卡死” 的感觉了。这时一个好想法，但展示 Loading 组件的时机是一个需要仔细考虑的问题。通常，我们会从加载开始的那一刻起就展示 Loading 组件。但在组件状况良好的情况下，异步组件的加载速度会非常快，这会导致 Loading 组件刚完成渲染就立即进入卸载阶段，于是出现闪烁的情况。对于用户来说这是非常不好的体验。体验，我们需要为 Loading 组件设置一个延迟展示的时间。例如，当超过 200 ms 没有完成加载，才展示 Loading 组件。这样，对于在 200 ms 内能够完成加载的情况来说，就避免了闪烁问题的出现。

不过，我们首先要考虑的仍然是用户接口的设计，如下面的代码所示：

```js
const AsyncComp = defineAsyncComponent({
  loader: () => import('CompA.vue'),
  // 延迟 200 ms 展示 Loading 组件
  delay: 200,
  // Loading 组件
  loadingComponent: [
    setup() {
      return () => {
        return { type: 'h2', children: 'Loading...' }
      }
    }
  ]
})
```

* delay，用于指定延迟展示的 Loading 组件的时长
* `loadingComponent`：类似于 `errorComponent` 选项，用来配置 Loading 组件。

用户接口设计完成后，我们就可以着手实现了。

```js
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(options) {
  // options 既可以是配置项，也可以是加载器
  if (typeof options === 'function') {
    // 如果是 options 是加载器，将其格式化配置项形式
    options = {
      loader: options
    }
  }

  const { loader } = options

  // 一个变量，用来存储异步加载的组件
  let InnerComp = null

  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null)
      // 代表是否超时，默认为 false
      const timeout = ref(false)
      // 代表是否正在加载，默认为 false
      const loading = ref(false)
        
      let loadingTimer = null
      // 如果配置项中存在 delay，则开启一个定时器计时
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true
        }, options.delay)
      } else {
        // 如果配置项中没有 delay，则直接标记为加载中
        loaded.value = true
      }

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader()
        .then(c => {
          InnerComp = c
          loaded.value = true
        })
        // 添加 catch 语句来捕获加载过程中的错误
        .catch(err => error.value = err)
        // 加载完毕后，无论成功与否都要清除延迟定时器
        .finally(() => {
          loaded.value = false
          clearTimeout(loadingTimer)
        })

      let timer = null
      if (options.timeout) {
        // 如果指定超时时长，开启一个定时器
        timer = setTimeout(() => {
          // 超时后创建一个错误对象，并赋值给 error.value
          const err = new Error(`Async component timed out after ${ options.timeout }ms.`)
          err.value = err
          // 超时后将 timeout 设置为 true
          timeout.value = true
        }, options.timeout)
      }
      // 包装组件被卸载时清除定时器
      onUnmounted(() => clearTimeout(timer))

      // 占位内容
      const placeholder = { type: Text, children: '' }

      return () => {
        if (loaded.value) {
          // 如果异步组件加载成功，渲染该组件
          return { type: InnerComp }
        } else if (timeout.value && options.errorComponent) {
          // 如果加载超时，并且用户指定 Error 组件，则渲染该组件
          // 同时将 error 作为 props 传递
          return { type: options.errorComponent, props: { error: error.value } }
        } else if (loaded.value && options.loadingComponent) {
          // 如果异步组件正在加载，并且用户指定了 Loading 组件，则渲染 Loading 组件
          return { type: options.loadingComponent }
        }
        // 渲染一个占位内容
        return { type: Text, children: '' }
      }      
    }
  }
}
```

整体实现思路类似于超时时长与 Error 组件，有以下几个关键点：

* 需要一个标记变量 loading 来代表组件是否正在加载；
* 如果用户指定了延迟时间，则开启延迟定时器。定时器到时后，再将 `loading.value` 的值设置为 true；
* 无论组件加载成功与否，都要清除延迟定时器，否则会出现组件已经加载成功，但仍然展示 Loading 组件的问题；
* 在渲染函数中，如果组件正在加载，并且用户指定了 Loading 组件，则渲染该 Loading 组件。

另外有一点需要注意，在异步组件加载成功后，会卸载 Loading 组件并渲染异步加载的组件。为了支持 Loading 组件的加载，我们需要修改 unmount 函数。

```js
function unmount(vnode) {
  if (vnode.type === Fragment) {
    vnode.children.forEach(c => unmount(c))
    return
  } else if (typeof vnode.type === 'object') {
    // 对于组件卸载，本质上是要卸载组件所渲染的内容，即 subTree
    unmount(vnode.component.subTree)
    return
  }
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}
```

对于组件的卸载，本质上是要卸载组件所渲染的内容，即 `subTree`。所以在上面的代码中，我们通过组件实例的 `vnode.component` 属性得到组件实例，再递归地调用 `unmount` 函数完成 `vnode.component.subTree` 的卸载。

##### 重试机制

重试指的是当加载出错时，有能力重新发起加载组件的请求。在加载组件的过程中，发生错误的情况非常常见。尤其是在网络不稳定的情况下。因此，提供开箱即用的重试机制，会提升用户的开发体验。

异步组件加载失败后的重试机制，与请求服务端接口失败后的重试机制一样。所以，我们先来讨论接口请求失败后的重试机制是如何实现的。为此，我们需要封装一个 fetch 函数，用来模拟接口请求：

```js
function fetch() {
  return new Promise((resolve, reject) => {
    // 请求会在 1 秒后失败
    setTimeout(() => {
      reject('err')
    }, 1000)
  })
}
```

假设调用 fetch 函数会发送 HTTP 请求，并且该请求会在 1 秒后失败。为了实现失败后的重试，我们需要封装一个 load 函数，如下面的代码所示：

```js
// load 函数接收一个 onError 函数
function load(onError) {
  // 请求接口，得到 Promise 实例
  const p = fetch()
  // 捕获错误
  return p.catch(err => {
    // 当错误发生时，返回一个新的 Promise 实例，并调用 onError 回调
    // 同时将 retry 函数作为 onError 回调的参数
    return new Promise((reoslve, reject) => {
      // retry 函数，用来执行重试的函数，执行该函数会重新调用 load 函数并发送请求
      const retry = () => resolve(load(onError))
      const fail = () => reject(err)
      onError(retry, fail)
    })
  })
}
```

load 函数内部调用了 fetch 函数来发送请求，并得到一个 Promise 实例。接着，添加 catch 语句块来捕获该实例的错误。当捕获到错误时，我们有两种选择：要么抛出错误，要么返回一个新的 Promise 实例，并把该实例的 resolve 和 reject 方法暴露给用户，让用户来决定下一步应该怎么做。这里，我们将新的 Promise 实例的 resolve 和 reject 分别封装为 retry 函数和 fail 函数，并将它们作为 `onError` 回调函数的参数。这样，用户就可以在错误发生时主动选择重试或直接抛出错误。下面的代码展示了用户是如何进行重试加载的。

```js
// 调用 load 函数加载资源
load(
  // onError 回调
  (retry) => {
    // 失败后重试
    retry()
  }
).then(res => {
  // 成功
  console.log(res)
})
```

基于这个原理，我们可以很容易地将它整合到异步组件的加载流程中。具体实现如下：

```js
// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
function defineAsyncComponent(options) {
  // options 既可以是配置项，也可以是加载器
  if (typeof options === 'function') {
    // 如果是 options 是加载器，将其格式化配置项形式
    options = {
      loader: options
    }
  }

  const { loader } = options

  // 一个变量，用来存储异步加载的组件
  let InnerComp = null

  // 记录重试次数
  let retries = 0
  // 封装 load 函数用来加载异步组件
  function load() {
    return loader()
      // 捕获加载器的错误
      .catch((error) => {
        // 如果用户指定了 onError 回调，则将控制权交给用户
        if (options.onError) {
          // 返回一个新的 Promise 实例
          return new Promise((resolve, reject) => {
            // 重试
            const retry = () => {
              resolve(load())
              retries++
            }
            // 失败
            const fail = () => reject(err)
            // 作为 onError 回调函数的参数，让用户决定如何处理
            options.onError(retry, fail, retries)
          })
        } else {  
          throw error
        }
      })
  }

  // 返回一个包装组件
  return {
    async: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null)
      // 代表是否超时，默认为 false
      const timeout = ref(false)
      // 代表是否正在加载，默认为 false
      const loading = ref(false)
        
      let loadingTimer = null
      // 如果配置项中存在 delay，则开启一个定时器计时
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true
        }, options.delay)
      } else {
        // 如果配置项中没有 delay，则直接标记为加载中
        loaded.value = true
      }

      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      // loader()
      //   .then(c => {
      //     InnerComp = c
      //     loaded.value = true
      //   })
      //   // 添加 catch 语句来捕获加载过程中的错误
      //   .catch(err => error.value = err)
      //   // 加载完毕后，无论成功与否都要清除延迟定时器
      //   .finally(() => {
      //     loaded.value = false
      //     clearTimeout(loadingTimer)
      //   })
      // 调用 load 函数加载组件
      load()
        .then(c => {
          InnerComp = c
          loaded.value = true
        })
        // 添加 catch 语句来捕获加载过程中的错误
        .catch(err => error.value = err)
        // 加载完毕后，无论成功与否都要清除延迟定时器
        .finally(() => {
          loaded.value = false
          clearTimeout(loadingTimer)
        })
      
      // ...
    }
  }
}
```

如上面的代码及注释所示，其整体思路与普通接口请求的重试机制类似。

#### 函数式组件

函数式组件的实现相对容易。一个函数式组件本质上就是一个普通函数，该函数的返回值是虚拟 DOM。之前我们提到过：“在 Vue.js 3 中使用函数式组件，主要是因为它的简单性，而不是因为它的性能好”。这是因为在 Vue.js 3 中，即使是有状态组件，其初始化性能消耗也非常小。

在用户接口层面，一个函数式组件就是一个返回虚拟 DOM 的函数。

```js
function MyFuncComp(props) {
  return { type: 'h1', children: props.title }
}
```

函数式组件没有自身状态，但它仍然可以接收由外部传入的 props。为了给函数式组件定义 props，我们需要在组件函数上添加静态的 props 属性。

```js
function MyFuncComp(props) {
  return { type: 'h1', children: props.title }
}

// 定义 props
MyFuncComp.props = {
  title: String
}
```

在有状态组件的基础上，实现函数式组件将变得很容易，因为挂载组件的逻辑可以复用 `mountComponent` 函数。为此，我们只需要在 patch 函数内支持函数类型的 `vnode.type` 。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
		// ...
  } else if (type === Text) {
		// ...
  } else if (type === Fragment) {
		// ...
  } else if (
    // 有状态组件
    typeof type === 'object' || 
    // 函数式组件
    typeof type === 'function'
  ) {
    // vnode.type 的值是选项对象，作为组件处理
    if (!n1) {
      // 挂载组件
      mountComponent(n2, container, anchor)
    } else {
      // 更新组件
      patchComponent(n1, n2, anchor)
    }
  }
}
```

在 patch 函数内部，通过检测 `vnode.type` 的类型来判断组件类型：

* 如果 `vnode.type` 是一个对象，则它是一个有状态组件，并且 `vnode.type` 是组件选项对象；
* 如果 `vnode.type` 是一个函数，则它是一个函数式组件。

无论有状态组件，还是函数式组件，我们都可以通过 `mountComponent` 函数来完成挂载，也都可以通过 `patchComponent` 函数来完成更新。

下面是修改后的 `mountComponent` 函数，它支持挂载函数式组件。

```js
function mountComponent(vnode, container, anchor) {
  // 检查是否是函数式组件
  const isFunctional = typeof vnode.type === 'function'

  // 通过 vnode 获取组件的选项对象，即 vnode.type
  let componentOptions = vnode.type

  if (isFunctional) {
    // 如果是函数式组件，则将 vnode.type 作为渲染函数，将 vnode.type.props 作为 props 选项定义即可
    componentOptions = {
      render: vnode.type,
      props: vnode.type.props
    }
  }

  // ...
  
  // setupContext
  const setupContext = { attrs, emit, slots }

  // 调用 setup 函数之前，设置当前组件实例
  setCurrentInstance(instance)
  
  // 调用 setup 函数，将只读版本的 props 作为第一个参数传递，避免用户意外地修改 props 的值
  // 将 setupContext 作为第二个参数传递
  const setupResult = setup && setup(shallowReadonly(instance.props), setupContext)

  // 在 setup 函数执行完毕之后，重置当前组件实例
  setCurrentInstance(null)

  // setupState 用来存储由 setup 返回的数据
  let setupState = null
  // 如果 setup 函数的返回值是函数，则将其作为渲染函数
  if (typeof setupResult === 'function') {
    if (render) console.error('setup 函数返回渲染函数，render 选项将被忽略')
    // 将 setupResult 作为渲染函数
    render = setupResult
  } else {
    // 如果 setup 的返回值不是函数，则作为数据状态赋值给 setupState
    setupState = setupResult
  }

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance
	
  // ...
}
```

可以看到，实现对函数式组件的兼容非常简单。首先，在 `mountComponent` 函数内检查组件的类型，如果是函数式组件，则直接将组件函数作为组件选项对象的 render 选项，并将组件函数的静态 props 属性作为组件的 props 选项即可，其他逻辑保持不变。当然，出于更加严谨的考虑，我们需要通过 `isFunctional` 变量选择性地执行初始化逻辑，因为对于函数式组件来说，它无需初始化 data 以及生命周期钩子。从这一点可以看出，函数式组件的初始化性能消耗小于有状态组件。

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/component_functional/index.js)

#### 总结

本篇文章中，我们首先讨论了异步组件要解决的问题。异步组件在页面性能、拆包以及服务端下发组件等场景中尤为重要。从根本上来说，异步组件的实现可以完全在用户层面实现，而无须框架支持。但一个完善的异步组件仍需要考虑诸多问题，例如：

* 允许用户指定加载出错时要渲染的组件；
* 允许用户指定 Loading 组件，以及展示该组件的延迟时间；
* 允许用户设置加载组件的超时时长；
* 组件加载失败时，为用户提供重试的能力。

因此，框架有必要内建异步组件的实现。Vue.js 3 提供了 `defineAsyncComponent` 函数，用来定义异步组件。

接着，我们讲解了异步组件的加载超时问题，以及当加载错误发生时，如果指定 Error 组件，通过为 `defineAsynComponent` 函数指定选项参数，允许用户通过 `timeout` 选项设置超时时长。当加载超时后，会触发加载错误，这时会渲染用户通过 `errorComponent` 选项指定的 Error 组件。

在加载异步组件的过程中，受网络状态的影响较大。当网络状态较差时，加载过程可能很漫长。为了提供更好的用户体验，我们需要在加载时展示 Loading 组件。所以，我们设计了 `loadingComponent` 选项，以允许用户配置自定义的 Loading 组件。但展示 Loading 组件的时机是一个需要仔细考虑的问题。为了避免 Loading 组件导致的闪烁问题，我们还需要设计一个接口，让用户能指定延迟展示 Loading 组件的时间，即 delay 选项。

在加载组件的过程中，发生错误的情况非常常见。所以，我们设计了组件加载发生错误后的重试机制。在讲解异步组件的重试加载机制时，我们类比了接口请求发生错误时的重试机制，两者的思路类似。

最后，我们讨论了函数式组件。它本质上一个函数，其内部实现逻辑可以复用有状态组件的实现逻辑。为了给函数式组件定义 props，我们允许开发者在函数式组件的主函数上添加静态的 props 属性。处于更加严谨的考虑，函数式组件没有自身状态，也没有生命周期的概念。所以，在初始化函数式组件时，需要选择性地复用有状态组件的初始化逻辑。

### 内建组件和模块

前几篇文章，我们讨论了 Vue.js 是如何基于渲染器实现组件化能力的。本篇文章我们将继续讨论 Vue.js 中几个非常重要的内建组件和模块，例如 `KeeyAlive` 组件、`Teleport` 组件、`Transition` 组件等，它们都需要渲染器级别的底层支持。另外，这些内建组件所带来的能力，对开发者而言非常重要且使用，理解它们的工作原理有助于我们正确地使用它们。

#### KeepAlive 组件的实现原理

##### 组件的激活与失活

KeepAlive 一词借鉴于 HTTP 协议。在 HTTP 协议中，KeepAlive 又称 HTTP 持久连接（HTTP persistent connection），其作用是允许多个请求或响应共用一个 TCP 连接。在没有 KeepAlive 的情况下，一个 HTTP 连接会在每次请求/响应结束后关闭，当下一次请求发生时，会建立一个新的 HTTP 连接。频繁地销毁、创建 HTTP 链接会带来额外的性能开销，KeepAlive 就是为了解决这个问题而生的。

HTTP 中的 KeepAlive 可以避免连接频繁地销毁/创建，与 HTTP 中的 KeepAlive 类似，Vue.js 内建的 KeepAlive 组件可以避免一个组件被频繁地销毁/重建。假设我们的页面中有一组 `<Tab>` 组件，如下面的代码所示：

```vue
<template>
  <Tab v-if="currentTab === 1">...</Tab>
  <Tab v-if="currentTab === 2">...</Tab>
  <Tab v-if="currentTab === 3">...</Tab>
</template>
```

可以看到，根据变量 `currentTab` 值的不同，会渲染不同的 `<Tab>` 组件。用用户频繁地切换 Tab 时，会导致不停地卸载并重建对应的 `<Tab>` 组件。为了避免因此产生的性能开销，可以使用 `KeepAlive` 组件来解决这个问题。

```vue
<template>
  <KeepAlive>
    <Tab v-if="currentTab === 1">...</Tab>
    <Tab v-if="currentTab === 2">...</Tab>
    <Tab v-if="currentTab === 3">...</Tab>
  </KeepAlive>
</template>
```

这样，无论用户怎么切换 `<Tab>` 组件，都不会发生频繁地创建和销毁，因而会极大地优化对用户操作的响应，尤其是在大组件场景下，优势会更加明显。那么，KeepAlive 组件的实现原理是怎样的呢？其实 KeepAlive 组件的本质是缓存管理，再加上特殊的挂载/卸载逻辑。

首先，KeepAlive 组件的实现需要渲染器层面的支持。这是因为被 KeepAlive 的组件在卸载时，并不是真正卸载，否则就无法维持组件的当前状态。正确的做法是，将被 KeepAlive 的组件从原容器搬运到另一个隐藏的容器中，实现 “假卸载”。当被搬运到隐藏容器中的组件需要再次被 “挂载” 时，我们也不能执行真正的挂载逻辑，而是应该把该组件从隐藏容器中再搬运到原容器中。这个过程对应组件的生命周期分别是 `activated` 和 `deactivated`。

一个最基本的 KeepAlive 组件实现起来并不复杂，如下面的代码所示：

```js
const KeepAlive = {
  // KeepAlive 组件独有的属性，用作标识
  _isKeepAlive: true,
  setup(props, { slots }) {
    // 创建一个缓存对象
    // key：vnode.type
    // value：vnode
    const cache = new Map()
    // 当前 KeepAlive 组件的实例
    const instance = curentInstance
    // 对于 KeepAlive 组件来说，它的实例上存在特殊的 KeepAliveCtx 对象，该对象由渲染器注入
    // 该对象会暴露渲染器的一些内部方法，其中 move 函数用来将一段 DOM 移动到另一个容器中
    const { move, createElement } = instance.KeepAliveCtx

    // 创建隐藏容器
    const storageContainer = createElement('div')

    // KeepAlive 组件的实例上会被添加两个内部函数，分别是 _deActivate 和 _activate
    // 这两个函数会在渲染器中调用
    instance._deActivate = (vnode) => {
      move(vnode, storageContainer)
    }
    instance._activate = (vnode, container, anchor) => {
      move(vnode, container, anchor)
    }

    return () => {
      // KeepAlive 的默认插槽就是要被 KeepAlive 的组件
      let rawVNode = slots.default()
      // 如果不是组件，直接渲染即可，因为非组件的虚拟节点无法被 KeepAlive
      if (typeof rawVNode.type !== 'object') {
        return rawVNode
      }

      // 挂载时先获取缓存的组件 vnode
      const cachedVNode = cache.get(rawVNode.type)

      if (cachedVNode) {
        // 如果有缓存的内容，则说明不应该执行挂载，而应该执行激活
        // 继承组件实例
        rawVNode.component = cachedVNode.component
        // 在 vnode 上添加 keptAlive 属性，标记为 true，避免渲染器重新挂载它
        rawVNode.KeptAlive = true
      } else {
        // 如果没有缓存，则将其添加到缓存中，这样下次激活组件就不会执行新的挂载操作了
        cache.set(rawVNode.type, rawVNode)
      }

      // 在组件 vnode 上添加 shouldKeepAlive 属性，并标记为 true，避免渲染器将组件卸载
      rawVNode.shouldKeepAlive = true
      // 将 keepAlive 组件的实例也添加到 vnode 上，以便在渲染器中访问
      rawVNode.KeepAliveInstance = instance

      // 渲染组件 vnode
      return rawVNode
    }
  }
}
```

从上面的实现中可以看到，与普通组件的一个较大的区别在于，KeepAlive 组件与渲染器的结合非常深。首先，KeepAlive 组件本身并不会渲染额外的内容，它的渲染函数最终只返回需要被 KeepAlive 的组件，我们把这个需要被 KeepAlive 的组件称为 “内部组件”。KeepAlive 会对 “内部组件” 进行操作，主要是在 “内部组件” 的 vnode 对象上添加一些标记属性，以便渲染器能够据此执行特定的逻辑。这些标记属性包括如下几个：

* `shouldKeepAlive`：改属性会被添加到 "内部组件" 的 vnode 对象上，这样当渲染器卸载 “内部组件” 时，可以通过检查该属性得知 “内部组件” 需要被 KeepAlive。于是，渲染器就不会真的卸载 “内部组件“，而是会调用 `_deActivate` 函数完成搬运工作。

  ```js
  function unmount(vnode) {
    if (vnode.type === Fragment) {
      vnode.children.forEach(c => unmount(c))
      return
    } else if (typeof vnode.type === 'object') {
      if (vnode.shouldKeepAlive) {
        // 对于需要被 KeepAlive 的组件，不应该真正卸载它，而是调用该组件的父组件
        // 即 KeepAlive 组件的 _deActivate 函数使其失活
        vnode.keepAliveInstance._deActivate(vnode)
      } else {
        // 对于组件卸载，本质上是要卸载组件所渲染的内容，即 subTree
        unmount(vnode.component.subTree)
      }
      return
    }
    const parent = vnode.el.parentNode
    if (parent) {
      parent.removeChild(vnode.el)
    }
  }
  ```

  可以看到，unmount 函数在卸载组件时，会检测组件是否应该被 `KeepAlive`，从而执行不同的操作。

* `KeepAliveInstance`：”内部组件“ 的 vnode 对象会持有 KeepAlive 组件实例，在 unmount 函数中会通过 `KeepAliveInstance` 来访问 `_deActivate` 函数。

* `KeptAlive`：”内部组件“ 如果已经被缓存，则还会为其添加一个 `keptAlive` 标记。这样当 ”内部组件“ 需要重新渲染时，渲染器并不会重新挂载它，而是会将其激活，如下面 patch 函数的代码所示：

  ```js
  function patch(n1, n2, container, anchor) {
    if (n1 && n1.type !== n2.type) {
      unmount(n1)
      n1 = null
    }
  
    const { type } = n2
  
    if (typeof type === 'string') {
    	// ...
    } else if (type === Text) {
    	// ...
    } else if (type === Fragment) {
    	// ...
    } else if (typeof type === 'object' || typeof type === 'function') {
      // vnode.type 的值是选项对象，作为组件处理
      if (!n1) {
        if (n2.keptAlive) {
          // 如果该组件已经被 KeptAlive，则不会重新挂载，而是调用 _activate 激活组件
          n2.keepAliveInstance._activate(n2, container, anchor)
        } else {
          // 挂载组件
          mountComponent(n2, container, anchor)
        }
      } else {
        // 更新组件
        patchComponent(n1, n2, anchor)
      }
    }
  }
  
  ```

可以看到，如果组件的 vnode 对象中存在 `KeptAlive` 标识，渲染器不会重新挂载它，而是会通过 `keepAliveInstance._activate` 函数来激活它。

我们再来看一下用于激活组件和失活组件的两个函数：

```js
// 对于 KeepAlive 组件来说，它的实例上存在特殊的 KeepAliveCtx 对象，该对象由渲染器注入
// 该对象会暴露渲染器的一些内部方法，其中 move 函数用来将一段 DOM 移动到另一个容器中
const { move, createElement } = instance.KeepAliveCtx

// 创建隐藏容器
const storageContainer = createElement('div')

// KeepAlive 组件的实例上会被添加两个内部函数，分别是 _deActivate 和 _activate
// 这两个函数会在渲染器中调用
instance._deActivate = (vnode) => {
  move(vnode, storageContainer)
}
instance._activate = (vnode, container, anchor) => {
  move(vnode, container, anchor)
}
```

可以看到，失活的本质就是将组件所渲染的内容移动到隐藏容器中，激活的本质是将组件所渲染的内容从隐藏容器中搬运回原来的容器。另外，上面这段代码所涉及的 move 函数是由渲染器注入的。

```js

function mountComponent(vnode, container, anchor) {
  // 通过 vnode 获取组件的选项对象，即 vnode.type
  const componentOptions = vnode.type
  // 获取组件的渲染函数 render
  let {
    render, data, props: propsOption, setup,
    beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  } = componentOptions
	
  // ...

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 将解析出的 props 数据包装为 shallowReative 并定义到组件实例上
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null,
    // 将插槽添加到组件实例上
    slots,
    // 组件实例中添加 mounted 数组，用来存储通过 onMounted 函数注册的生命周期钩子函数
    mounted: [],
    // 只有 KeepAlive 组件的实例下会有 keepAliveCtx 属性
    keepAliveCtx: null
  }

  // 检查当前要挂载的组件是否是 KeepAlive 组件
  const isKeepAlive = vnode.type._isKeepAlive
  if (isKeepAlive) {
    // 在 KeepAlive 组件实例上添加 KeepAliveCtx 对象
    instance.keepAliveCtx = [
      // 用来移动 vnode
      move(vnode, container, anchor) {
        // 本质上是将组件渲染的内容移动到指定容器中，隐藏在容器中
        insert(vnode.component.subTree.el, container, anchor)
      },
      createElement
    ]
  }
	
	// ...
}
```

至此，一个最基本的 KeepAlive 组件就完成了。

##### include 和 exclude

在默认情况下，KeepAlive 组件会对所有 ”内部组件“ 进行缓存。但有时候用户期望只缓存特定组件。为了使用户能够自定义缓存规则，我们需要让 KeepAlive 组件支持两个 props，分别是 include 和 exclude。其中，include 用来显式地配置应该被缓存的组件，exclude 用来显式地配置不应该被缓存的组件。

KeepAlive 组件的 props 定义如下：

```js
const KeepAlive = {
  // KeepAlive 组件独有的属性，用作标识
  _isKeepAlive: true,
  // 定义 include 和 exclude
  props: {
    include: RegExp,
    exclude: RegExp
  },
  setup(props, { slots }) {
		// ...
  }
}
```

为了简化问题，我们只允许为 include 和 exclude 设置正则类型的值。在 KeepAlive 组件被挂载时，它会根据 “内部组件” 的名称（name 选项）进行匹配。

```js
const KeepAlive = {
  // KeepAlive 组件独有的属性，用作标识
  _isKeepAlive: true,
  // 定义 include 和 exclude
  props: {
    include: RegExp,
    exclude: RegExp
  },
  setup(props, { slots }) {
    // ...

    return () => {
      // KeepAlive 的默认插槽就是要被 KeepAlive 的组件
      let rawVNode = slots.default()
      // 如果不是组件，直接渲染即可，因为非组件的虚拟节点无法被 KeepAlive
      if (typeof rawVNode.type !== 'object') {
        return rawVNode
      }

      // 获取 “内部组件” 的 name
      const name = rawVNode.type.name

      if (
        name &&
        (
          // 如果 name 无法被 include 匹配
          (props.include && !props.include.test(name)) || 
          // 或者被 exclude 匹配
          (props.exclude && props.exclude.test(name))
        )
      ) {
        // 直接渲染 “内部组件”，不需要进行缓存操作
        return rawVNode
      }

    	// ...
    }
  }
}
```

可以看到，我们根据用户指定的 include 和 exclude 正则，对 “内部组件” 的名称进行匹配，并根据匹配结果判断是否要对 “内部组件” 进行缓存。在此基础上，我们可以任意扩充匹配能力。例如，可以将 include 和 exclude 设计成多种类型值，允许用户指定字符串或者函数从而提供更加灵活的机制。另外，在做匹配时，也可以不限于 “内部组件” 的名称，甚至可以让用户自行指定匹配要素。但无论如何，原理都是不变的。

##### 缓存管理

在之前的实现中，我们使用一个 Map 对象来实现对组件的缓存。

```js
const cache = new Map()
```

该 Map 对象的键是组件选项对象，即 `vnode.type` 属性的值，该 Map 对象的值是用于描述组件的 `vnode` 对象。由于用于描述组件的 vnode 对象存在对组件实例的引用（即 `vnode.component`）属性，所以缓存用户描述组件的 vnode 对象，就等价于缓存组件实例。

回顾一下目前 KeepAlive 组件中关于缓存的实现：

```js
// 挂载时先获取缓存的组件 vnode
const cachedVNode = cache.get(rawVNode.type)
if (cachedVNode) {
  // 如果有缓存的内容，则说明不应该执行挂载，而应该执行激活
  // 继承组件实例
  rawVNode.component = cachedVNode.component
  // 在 vnode 上添加 keptAlive 属性，标记为 true，避免渲染器重新挂载它
  rawVNode.keptAlive = true
} else {
  // 如果没有缓存，则将其添加到缓存中，这样下次激活组件就不会执行新的挂载操作了
  cache.set(rawVNode.type, rawVNode)
}
```

缓存的处理逻辑可以总结为：

* 如果缓存存在，则继承组件实例，并将用于描述组件的 vnode 对象标记为 keptAlive，这样渲染器就不会重新创建新的组件实例；
* 如果缓存不存在，则设置缓存。

这里的问题在于，当缓存不存在的时候，总是会设置新的缓存。这会导致缓存不断增加，极端情况下会占用大量缓存。为了解决这个问题，我们必须设置一个缓存阈值，当缓存数量超过指定阈值时对缓存进行修剪。但是这样又会引出另一个问题：我们应该对缓存如何修剪？应该采用怎样的策略修剪？

Vue.js 当前所采用的修剪策略叫做 “最新一次访问（LRU 缓存淘汰策略）”。首先，你需要为缓存设置最大容量，也就是通过 KeepAlive 组件的 max 属性来设置。

```vue
<KeepAlive :max="2">
	<component :is="dynamicComp" />
</KeepAlive>
```

在上面这段代码中，我们设置缓存的容量为 2。假设我们有三那个组件 `Comp1`、`Comp2`、`Comp3`，并且它们都会缓存。然后，我们模拟一下组件切换过程中缓存的变化。

* 初始渲染 `Comp1` 并缓存它。此时缓存队列为：`[Comp1]`，并且最新一次访问（或渲染）的组件是 `Comp1`。
* 切换到 `Comp2` 并缓存它。此时缓存队列为：`[Comp1, Comp2]`，并且最新一次访问（或渲染）的组件是 `Comp2`。
* 切换到 `Comp3`，此时缓存容量已满，需要修剪。因为当前最新一次访问（或渲染）的组件是 `Comp2`，所以它不会被修剪。因此被修剪的将会是 `Comp1`。当缓存修建完毕后，将会出现空余的缓存空间用来存储 `Comp3`。所以，现在的缓存队列是：`[Comp2, Comp3]`，并且最新一次渲染的组件变成 `Comp3`。

我们还可以换一种切换组件的方式。

* 初始渲染 `Comp1` 并缓存它。此时，缓存队列为：`[Comp1]`，并且最新一次访问（或渲染）的组件是 `Comp1`。
* 切换到 `Comp2` 并缓存它。此时缓存队列为：`[Comp1, Comp2]`，并且最新一次访问（或渲染）的组件是 `Comp2`。
* 在切换回 `Comp1`，由于 `Comp1` 已经在缓存队列中，所以不需要修剪缓存，只需要激活组件即可，但要将最后一次渲染的组件设置为 `Comp1`。
* 切换到 `Comp3`，此时缓存容量已满，需要修剪。由于 `Comp1` 是最新一次渲染的，它不会被修剪掉。最后被修剪掉的是 `Comp2`。于是，现在的缓存队列是：`[Comp1, Comp3]`，并且最新一次渲染的组件变成了 `Comp3`。

可以看到，在不同的模拟策略下，最终的缓存结果会有所不同。“最新一次访问” 的缓存策略的核心在于，需要把当前访问（或渲染）的组件作为最新一次渲染的组件，并且该组件在缓存修剪过程中始终是安全的。

实现 Vue.js 内建的缓存策略并不难。我们的关注点在于，缓存策略是否可以改变？甚至允许用户自定义缓存策略？实际上，在 Vue.js 官方的 RFCs 中已经有相关提议。该提议允许用户实现自定义的缓存策略，在用户接口层面，则体现在 KeepAlive 组件新增了 cache 接口，允许用户指定缓存实例。

```vue
<KeepAlive :cache="cache">
	<Comp />
</KeepAlive>
```

缓存实例需要满足固定的格式，一个基本的缓存实例的实现如下：

```typescript
const _cache = new Map()
const cache: KeepAliveCache = {
  get(key) {
    _cache.get(key)
  },
  set(key, value) {
    _cache.set(key, value)
  },
  delete(key) {
    _cache.delete(key)
  },
  forEach(fn) {
    _cache.forEach(fn)
  }
}
```

在 KeepAlive 组件的内部实现中，如果用户提供了自定义的缓存实例，则直接使用该缓存实例来管理缓存。从本质上来说，这等价于将缓存的管理权限从 KeepAlive 组件转交给用户了。

#### Teleport 组件的实现原理

##### Teleport 组件要解决的问题

Teleport 组件是 Vue.js 3 新增的一个内建组件，我们首先讨论它要解决的问题是什么。通常情况下，在将虚拟 DOM 渲染为真实 DOM 时，最终渲染出来的真实 DOM 的层级结构与虚拟 DOM 的层级结构一致。以下面的模板为例：

```vue
<template>
	<div id="box" style="z-index: -1;">
    <Overlay />
  </div>
</template>
```

在这段模板中，`<Overlay>` 组件的内容会被渲染到 id 为 box 的 div 标签下。然而，有时这并不是我们所期望的。假设 `<Overlay>` 组件是一个 “蒙层” 组件，该组件会渲染一个 “蒙层”，并要求 “蒙层” 能够遮挡页面上的任何元素。但问题是，如果 `<Overlay>`  组件的内容无法跨越 DOM 层级渲染，就无法实现这个目标。还是拿上面这段模板来说，id 为 box 的 div 标签拥有一段内联样式：`z-index: -1`， 这会导致即使我们将 `<Overlay>` 组件所渲染内容的 `z-index` 值设置为无穷大，也无法实现遮挡功能。

通常，我们在面对上述长江，会选择直接在 `<body>` 标签下渲染 “蒙层” 内容。在 Vue.js 2 中我们只能通过原生 DOM API 来手动搬运 DOM 元素实现需求。这么做的缺点在于，手动操作 DOM 元素会使得元素的渲染与 Vue.js 的渲染机制脱节，并导致各种可预见或不可预见的问题。考虑到该需求确实非常常见，用户也对此抱有迫切的期待，于是 Vue.js 3 内建了 `Teleport` 组件。该组件可以将指定内容渲染到特定容器中，而不受 DOM 层级的限制。

我们先来看看 Teleport 组件是如何解决这个问题的。以下是基于 Teleport 组件实现的 `<Overlay>` 组件的模板。

```vue
<template>
	<Teleport to="body">
  	<div class="overlay"></div>
  </Teleport>
</template>

<style scoped>
  .overlay {
    z-index: 9999;
  }
</style>
```

可以看到，`<Overlay>` 组件要渲染的内容都包含在 `Teleport` 组件内，即作为 `Teleport` 组件的插槽。通过为 `Teleport` 组件指定渲染目标 body，即 to 属性的值，该组件就会直接把它的插槽内容渲染到 body 下，而不会按照模板的 DOM 层级来渲染，于是就实现了跨 DOM 层级的渲染。最终，`<Overlay>` 组件的 `z-index` 值也会按预期工作，并遮挡页面中的所有内容。

##### 实现 Teleport 组件

与 KeepAlive 组件一样，Teleport 组件也需要渲染器的底层支持。首先我们要将 `Teleport` 组件的渲染逻辑从渲染器中分离出来，这么做有两点好处：

* 可以避免渲染器代码 “膨胀”；
* 当用户没有使用 `Teleport` 组件时，由于 `Teleport` 的渲染逻辑被分离，因此可以利用 `Tree-Shaking` 机制在最终的 bundle 中删除 `Teleport` 相关的diamagnetic，使得最终构建包的体积变小。

为了完成逻辑分离的操作，我们需要修改 patch 函数。

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
 		// ...
  } else if (type === Text) {
		// ...
  } else if (type === Fragment) {
		// ...
  } else if (typeof type === 'object' && type.__isTeleport) {
    // 组件选项中如果存在 __isiTeleport 标识，则它是 Teleport 组件
    // 调用 Teleport 组件选项中的 process 函数将控制权交接出去
    // 传递给 process 函数的第五个参数是渲染器的一些内部方法
    type.process(n1, n2, container, anchor, {
      patch,
      patchChildren,
      unmount,
      move(vnode, container, anchor) {
        insert(vnode.component ? vnode.component.subTree.el : vnode.el, container, anchor)
      }
    })
  } else if (typeof type === 'object' || typeof type === 'function') {
    // ...
  }
}
```

可以看到，我们通过组件选项的 `__isTeleport` 标识来判断该组件是否是 `Teleport` 组件。如果是，则直接调用组件选项中定义的 `process` 函数将渲染控制权完全交接出去，这样就实现了渲染逻辑的分离。

Teleport 组件的定义如下：

```js
const Teleport = {
  __isTeleport: tree,
  process(n1, n2, container, anchor) {
    // 处理渲染逻辑
  }
}
```

可以看到，Teleport 组件并非普通组件，它有特殊的选项 `__isTeleport` 和 `process`。

接下来我们设计虚拟 DOM 的结构。假设用户编写的模板如下：

```vue
<Teleport to="body">
	<h1>Title</h1>
  <p>content</p>
</Teleport>
```

那么它应该被编译为怎么的虚拟 DOM 呢？虽然在用户看来 `Teleport` 是一个内建组件，但实际上，`Teleport` 是否拥有组件的性质是由框架本身决定的。通常，一个组件的子节点会被编译为插槽内容，不过对于 `Teleport` 组件来说，直接将其子节点编译为一个数组即可。

```js
function render() {
  return {
    type: Teleport,
    // 普通 children 的形式代表被 Teleport 的内容
    children: [
      { type: 'h1', children: 'Title' },
      { type: 'p', children: 'content' }
    ]
  }
}
```

设计好虚拟 DOM 的结构后，我们就可以着手实现 Teleport 组件了。首先，我们来完成 Teleport 组件的挂载动作。

```js
const Teleport = {
  __isTeleport: tree,
  process(n1, n2, container, anchor, internals) {
    // 通过 internals 参数取得渲染器的内部方法
    const { patch } = internals
    // 如果旧 VNode n1 不存在，则是全新的挂载，否则执行更新
    if (!n1) {
      // 挂载
      // 获取容器，即挂载点
      const target = typeof n2.props.to === 'string' 
        ? document.querySelector(n2.props.to)
        : n2.props.to
      // 将 n2.children 渲染到指定挂载点即可
      n2.children.forEach(c => patch(null, c, target, anchor))
    } else {
      // 更新
    }
  }
}
```

可以看到，即使 `Teleport` 渲染逻辑被单独分离分出，它的渲染思路仍然与渲染器本身的渲染思路保持一致。通过判断旧的虚拟节点（`n1`）是否存在，来决定执行挂载还是执行更新。如果要执行挂载，则需要根据 `props.to` 属性的值来取得真正的挂载点。最后，遍历 `Teleport` 组件的 children 属性，并逐一调用 patch 函数完成子节点的挂载。

更新的处理更加简单，如下面的代码所示：

```js
const Teleport = {
  __isTeleport: tree,
  process(n1, n2, container, anchor, internals) {
    // 通过 internals 参数取得渲染器的内部方法
    const { patch, patchChildren } = internals
    // 如果旧 VNode n1 不存在，则是全新的挂载，否则执行更新
    if (!n1) {
      // 挂载
			// ...
    } else {
      // 更新
      patchChildren(n1, n2, container)
    }
  }
}
```

只需要调用 `patchChildren` 函数来完成更新操作即可。不过有一点需要额外注意，更新操作可能是由于 `Teleport` 组件的 to 属性值的变化引起的，因此，在更新时我们应该考虑这种情况。

```js
const Teleport = {
  __isTeleport: tree,
  process(n1, n2, container, anchor, internals) {
    // 通过 internals 参数取得渲染器的内部方法
    const { patch, patchChildren } = internals
    // 如果旧 VNode n1 不存在，则是全新的挂载，否则执行更新
    if (!n1) {
      // 挂载
      // 获取容器，即挂载点
      const target = typeof n2.props.to === 'string' 
        ? document.querySelector(n2.props.to)
        : n2.props.to
      // 将 n2.children 渲染到指定挂载点即可
      n2.children.forEach(c => patch(null, c, target, anchor))
    } else {
      // 更新
      patchChildren(n1, n2, container)
      // 如果新旧 to 参数的值不同，则需要对内容进行移动
      if (n2.props.to !== n1.props.to) {
        // 获取新的容器
        const newTarget = typeof n2.props.to === 'string' 
          ? document.querySelector(n2.props.to)
          : n2.props.to
        // 移动到新的容器
        n2.children.forEach(c => move(c, newTarget))
      }
    }
  }
}
```

用来执行移动操作的 move 函数的实现如下：

```js
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
 		// ...
  } else if (type === Text) {
		// ...
  } else if (type === Fragment) {
 		// ...
  } else if (typeof type === 'object' && type.__isTeleport) {
		// ...
  } else if (typeof type === 'object' || typeof type === 'function') {
    // vnode.type 的值是选项对象，作为组件处理
    if (!n1) {
      if (n2.keptAlive) {
        // 如果该组件已经被 KeptAlive，则不会重新挂载，而是调用 _activate 激活组件
        n2.keepAliveInstance._activate(n2, container, anchor)
      } else {
        // 挂载组件
        mountComponent(n2, container, anchor)
      }
    } else {
      // 更新组件
      patchComponent(n1, n2, anchor)
    }
  }
}
```

在上面的代码中，我们只考虑了移动组件和普通元素。我们知道，虚拟节点的类型有很多种，例如文本类型（Text）、片段类型（Fragment）等。一个完善的实现应该考虑所有这些虚拟节点的类型。

#### Transition 组件的实现原理

通过对 KeepAlive 组件和 Teleport 组件的讲解，我们能够意识到，Vue.js 内建的组件通常与渲染器的核心逻辑结合的非常紧密。本节将要讨论的 Transition 组件也不例外，甚至它与渲染器结合更加紧密。

实际上，Transition 组件的实现要比想象中简单的多，它的核心原理是：

* 当 DOM 元素被挂载时，将动效附加到该 DOM 元素上；
* 当 DOM 元素被卸载时，不要理解卸载 DOM 元素，而是等到附加到该 DOM 元素伤的动效执行完成之后再卸载它。

当然，规则上主要遵循上述两个要素，但具体实现要考虑的边界情况还有很多。不过，我们只需要了解它的核心原理即可，具体细节可以在基本实现的基础上按需添加或完善。

##### 原生 DOM 的过渡

为了更好地理解 Transition 组件的实现原理，我们有必要先讨论如何为原生 DOM 创建过渡动效。过渡效果本质上是一个 DOM 元素在两种状态间的切换，浏览器会根据过渡效果自行完成 DOM 元素的过渡。这里的过渡效果指的是持续时长、运动曲线、要过渡的属性等。

我们从一个例子开始。假设我们有一个 div 元素，宽高各 `100px`，如下面的代码所示：

```html
<div class="box"></div>
```

接着，为其添加对应的 CSS 样式：

```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

现在，假设我们要为元素添加一个进场动效。我们可以这样描述该动效：从距离左边 `200px` 的位置在 1 秒内运动到距离左边 `0px` 的位置。在这句描述中，初始状态是 “距离左边 `200px`” ，因此我们可以用下面的样式描述初始状态。

```css
.enter-from {
  transform: translate(200px);
}
```

 而结束状态是 "距离左边 `0px`"，也就是初始位置，可以用下面的 CSS 代码来描述：

```css
.enter-to {
  transform: translateX(0);
}
```

初始状态和结束状态都已经描述完毕。最后，我们还要描述运动过程，例如持续时长、运动曲线等。对此，我们可以用以下 CSS 代码来描述。

```css
.enter-active {
  transition: transform 1s ease-in-out;
}
```

这里我们指定了运动的属性是 `transform`，持续时长为 `1s`，并且运动曲线是 `ease-in-out`。

定义好运动的初始状态、结束状态以及运动过程之后，接下来我们就可以为 DOM 元素添加进场动效了。

```js
// 创建 class 为 box 的 DOM 元素
const el = document.createElement('div')
el.classList.add('box')

// 在 DOM 元素被添加到页面之前，讲初始化状态和运动过程定义在元素上
el.classList.add('enter-from') // 初始状态
el.classList,add('enter-active') // 运动过程

// 将元素添加到页面
document.body.appendChild(el)
```

上面这段代码主要做了三件事：

* 创建 DOM 元素；
* 将过渡的初始状态和运动过程定义到元素上，即把 `enter-from`、`enter-active` 这两个类添加到元素伤；
* 将元素添加到页面中，即挂载。

经过这三个步骤之后，元素的初始化状态会生效，页面渲染的时候会将 DOM 元素以初始状态所定义的样式进行展示。接下来我们需要切换元素的状态，使得元素开始运动。那么，应该怎么做呢？理论上，我们只需要将 `enter-from` 类从 DOM 元素上移除，并将 `enter-to` 这个类添加到 DOM 元素上即可，如下面的代码所示：

```js
// 创建 class 为 box 的 DOM 元素
const el = document.createElement('div')
el.classList.add('box')

// 在 DOM 元素被添加到页面之前，讲初始化状态和运动过程定义在元素上
el.classList.add('enter-from') // 初始状态
el.classList.add('enter-active') // 运动过程

// 将元素添加到页面
document.body.appendChild(el)

// 切换元素的状态
el.classList.remove('enter-from')
el.classList.add('enter-to')
```

然而，上面这段代码无法按预期执行。这是因为浏览器会在当前帧绘制 DOM 元素，最终结果是，浏览器将 `enter-to` 这个类所具有的样式绘制出来，而不会绘制 `enter-from` 类所具有的样式。为了解决这个问题，我们需要在下一帧执行状态切换，如下面的代码所示。

```js
// 创建 class 为 box 的 DOM 元素
const el = document.createElement('div')
el.classList.add('box')

// 在 DOM 元素被添加到页面之前，讲初始化状态和运动过程定义在元素上
el.classList.add('enter-from') // 初始状态
el.classList.add('enter-active') // 运动过程

// 将元素添加到页面
document.body.appendChild(el)

// 切换元素的状态
requestAnimationFrame(() => {
  el.classList.remove('enter-from')
  el.classList.add('enter-to')
}) 
```

现在你会发现进场动效能够正常显示了。

最后我们需要做的是，当过渡完成后，将 `enter-from` 和 `enter-active` 这两个类从 DOM 元素移除，如下面的代码所示：

```js
// 创建 class 为 box 的 DOM 元素
const el = document.createElement('div')
el.classList.add('box')

// 在 DOM 元素被添加到页面之前，讲初始化状态和运动过程定义在元素上
el.classList.add('enter-from') // 初始状态
el.classList.add('enter-active') // 运动过程

// 将元素添加到页面
document.body.appendChild(el)

// 切换元素的状态
requestAnimationFrame(() => {
  el.classList.remove('enter-from')
  el.classList.add('enter-to')

  // 监听 transitionend 事件完成
  el.addEventListener('transitionend', () => {
    el.classList.remove('enter-to')
    el.classList.remove('enter-active')
  })
}) 
```

通过监听元素的 `transitionend` 事件来完成收尾工作。实际上，我们可以对上述 DOM 元素添加进场过渡的过程进行抽象。

<img src="./images/transition01.png" />

从创建 DOM 元素完成后，到把 DOM 元素添加到 body 前，整个过程可以视作 `beforeEnter` 阶段。在把 DOM 元素添加到 body 之后，则可以视作 enter 阶段。在不同的阶段执行不同的操作，即可完成整个进场过渡的实现。

* `beforeEnter` 阶段：添加 `enter-from` 和 `enter-active` 类。
* `enter` 阶段：在下一帧中移除 `enter-from` 类，添加 `enter-to`。
* 进场动效结束：移除 `enter-to` 和 `enter-active` 类。

理解了进场过渡的实现原理后，接下来我们讨论 DOM 元素的离场过渡效果。与进场过渡效果一样，我们需要定义离场过渡的初始状态、结束状态以及过渡过程。

```css
.leave-from {
  transform: translateX(0);
}
.leave-to {
  transform: translateX(200px);
}
.leave-active {
  transition: transform 2s ease-out;
}
```

可以看到，离场过渡的初始状态与结束状态正好对应进场过渡的结束状态与初始状态。

离场动效一般发生在 DOM 元素被卸载的时候。

```js
// 卸载元素
el.addEventListener('click', () => {
  el.parentNode.removeChild(el)
})
```

当点击元素时，该元素会被移除，这样就实现了卸载。如果仅仅这样做，元素根本没有执行过渡的机会。因此，一个很自然的思路就产生了：当元素被卸载时，不要将其立即卸载，而是等待过渡效果结束后再卸载它。为了实现这个目标，我们需要把用于卸载 DOM 元素的代码封装到一个函数中，该函数会等待过渡结束后被调用，如下面的代码所示：

```js
el.addEventListener('click', () => {
  // 将卸载动作封装到 performRemove 函数中
  const performRemove = () => el.parentNode.removeChild(el)
})
```

在上面这段代码中，我们将卸载动作封装到 `performRemove` 函数中，这个函数会等待过渡效果结束后再执行。

具体的离场动效的实现如下：

```js
el.addEventListener('click', () => {
  // 将卸载动作封装到 performRemove 函数中
  const performRemove = () => el.parentNode.removeChild(el)

  // 设置初始状态：添加 leave-from 和 leave-active 类
  el.classList.add('leave-from')
  el.classList.add('leave-active')

  // 强制 reflow：使初始状态生效
  document.body.offsetHeight

  // 在下一帧切换状态
  requestAnimationFrame(() => {
    // 切换到结束状态
    el.classList.remove('leave-from')
    el.classList.add('leave-to')
  })

  // 监听 transitionend 事件做收尾工作
  el.addEventListener('transitionend', () => {
    el.classList.remove('leave-to')
    el.classList.remove('leave-active')
    // 当过渡完成后，调用 performRemove 函数将 DOM 元素移除
    performRemove()
  })
})
```

从上面这段代码中可以看到，离场过渡的处理与进场过渡的处理方式非常相似，即首先设置初始状态，然后在下一帧中切换为结束状态，从而使得过渡失效。需要注意的是，当离场过渡完成之后，需要执行 `performRemove` 函数来真正地将 DOM 元素卸载。

##### 实现 Transition 组件

Transition 组件的实现原理与原生 DOM 的过渡原理一样。只不过，Transition 组件是基于虚拟 DOM 实现的。我们在为 DOM 元素创建进场动效和离场动效时能注意到，整个过渡过程可以抽象为几个阶段，这些阶段可以抽象为特定的回调函数。例如 `beforeEnter`、`enter`、`leave` 等。实际上，基于虚拟 DOM 的实现也需要将 DOM 元素的生命周期分割为这样几个阶段，并在特定阶段执行对应的回调函数。

为了实现 Transition 组件，我们需要先设计它在虚拟 DOM 层面的表现形式。假设组件的模板内容如下：

```vue
<template>
	<Transition>
  	<div>我是需要过渡的元素</div>
  </Transition>
</template>
```

我们可以将这段模板被编译后的虚拟 DOM 设计为：

```js
function render() {
  return {
    type: Transtion,
    children: {
      default() {
        return { type: 'div', children: '我是需要过渡的元素' }
      }
    }
  }
}
```

可以看到，Transition 组件的子节点被编译为默认插槽，这与普通组件的行为一致。虚拟 DOM 层面的表示已经设计完了，接下来，我们着手实现 `Transition` 组件，如下面的代码所示：

```js
const Transtion = {
  name: 'Transition',
  setup(props, { slots }) {
    return () => {
      // 通过默认插槽获取需要过渡的元素
      const innerVNode = slots.default()

      // 在过渡元素的 VNode 对象上添加 transition 相应的钩子函数
      innerVNode.transtion = {
        beforEnter(el) {
          // 
        },
        enter(el) {
          // 
        },
        leave(el, performRemove) {
          // 
        }
      }

      // 返回需要过渡的元素
      return innerVNode
    }
  }
}
```

观察上面的代码，可以发现几点重要信息：

* Transition 组件本身不会渲染任何额外内容，它只是通过默认插槽读取过渡元素，并渲染需要过渡的元素；
* Transition 组件的作用，就是在过渡元素的虚拟节点上添加 transition 相关的钩子函数。

可以看到，经过 Transition 组件的包装后，内部需要过渡的虚拟节点会被添加一个 `vnode.transition` 对象。这个对象下存在一些与 DOM 元素过渡相关的钩子函数，例如 `beforeEnter`、`enter`、`leave` 等。这些钩子函数与我们之前介绍的钩子函数相同，渲染器在渲染需要过渡的虚拟节点时，会在合适的时机调用附加到该虚拟节点上的过渡相关的生命周期钩子函数，具体体现在 `mountElement` 函数以及 `unmount` 函数中。

```js
function mountElement(vnode, container, anchor) {
  const el = vnode.el = createElement(vnode.type)
  
  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => {
      patch(null, child, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key])
    }
  }

  // 判断一个 VNode 是否需要过渡
  const needTransition = vnode.transtion
  if (needTransition) {
    // 调用 transition.beforeEnter 钩子，并将 DOM 元素作为参数传递
    vnode.transtion.beforEnter(el)
  }

  insert(el, container, anchor)

  if (needTransition) {
    // 调用 transition.enter 钩子，并将 DOM 元素作为参数传递
    vnode.transtion.enter(el)
  }
}
```

上面这段代码是修改后的 `mountElement` 函数，我们为它增加了 `transition` 钩子的处理。可以看到，在挂载 DOM 元素之前，会调用 `transition.beforeEnter` 钩子；在挂载元素之后，会调用 `transition.enter` 钩子，并且这两个钩子函数都接收需要过渡的 DOM 元素对象作为第一个参数。除了挂载之外，卸载元素我们也应该调用 `transition.leave` 钩子函数，如下面的代码所示：

```js
function unmount(vnode) {
  // 判断 vnode 是否需要过渡处理
  const needTransition = vnode.transtion

  if (vnode.type === Fragment) {
    vnode.children.forEach(c => unmount(c))
    return
  } else if (typeof vnode.type === 'object') {
    if (vnode.shouldKeepAlive) {
      // 对于需要被 KeepAlive 的组件，不应该真正卸载它，而是调用该组件的父组件
      // 即 KeepAlive 组件的 _deActivate 函数使其失活
      vnode.keepAliveInstance._deActivate(vnode)
    } else {
      // 对于组件卸载，本质上是要卸载组件所渲染的内容，即 subTree
      unmount(vnode.component.subTree)
    }
    return
  }

  const parent = vnode.el.parentNode

  if (parent) {
    // 将卸载动作封装到 performRemove 函数中
    const performRemove = () => parent.removeChild(vnode.el)

    if (needTransition) {
      // 如果需要过渡处理，则调用 transition.leave 钩子，
      // 同时将 DOM 元素和 performRemove 函数作为参数传递
      vnode.transtion.leave(vnode.el, performRemove)
    } else {
      // 如果不需要过渡处理，直接执行卸载操作
      performRemove()
    }
  }
}
```

上面这段代码是修改后的 unmount 函数的实现，我们同样为其增加了关于过渡的处理。首先，需要将卸载动作封装到 `performRemove` 函数内。如果 DOM 元素需要过渡处理，那么就需要等待过渡结束后再执行 `performRemove` 函数完成卸载，否则直接调用该函数完成卸载即可。

有了 `mountElement` 函数和 `unmount` 函数的支持后，我们就可以轻松地实现一个最基本的 Transition 组件了。

```js
const Transtion = {
  name: 'Transition',
  setup(props, { slots }) {
    return () => {
      // 通过默认插槽获取需要过渡的元素
      const innerVNode = slots.default()

      // 在过渡元素的 VNode 对象上添加 transition 相应的钩子函数
      innerVNode.transtion = {
        beforEnter(el) {
          // 设置处理状态：添加 enter-from 和 enter-active 类
          el.classList.add('enter-from')
          el.classList.add('enter-active')
        },
        enter(el) {
          // 下一帧切换到结束状态
          nextFrame(() => {
            // 移除 enter-from 类，添加 enter-to 类
            el.classList.remove('enter-from')
            el.classList.add('enter-to')
            // 监听 transitionend 事件完成
            el.addEventListener('transitionend', () => {
              el.classList.remove('enter-to')
              el.classList.remove('enter-active')
            })
          })
        },
        leave(el, performRemove) {
          // 设置离场过渡的初始状态：添加 leve-from 和 leave-active 类
          el.classList.add('leave-from')
          el.classList.add('leave-active')
          // 强制 reflow：使初始状态生效
          document.body.offsetHeight
          // 在下一帧切换状态
          nextFrame(() => {
            // 移除 leave-from 类，添加 leave-to 类
            el.classList.remove('leave-from')
            el.classList.add('leave-to')

            // 监听 transitionend 事件做收尾工作
              el.addEventListener('transitionend', () => {
                el.classList.remove('leave-to')
                el.classList.remove('leave-active')
                // 当过渡完成后，调用 performRemove 函数将 DOM 元素移除
                performRemove()
              })
          })
        }
      }

      // 返回需要过渡的元素
      return innerVNode
    }
  }
}
```

在上面这段代码中，我们补全了 `vnode.transition` 中各个钩子函数的具体实现。可以看到，其实现思路和我们之前讨论的原生 DOM 过渡的思路一样。

在上面的实现中，我们硬编码了过渡状态的类名，例如 `enter-from`、`enter-to` 等。实际上，我们可以轻松地通过 props 来实现允许用户自定义类型的能力，从而实现一个更加灵活的 `Transition` 组件。另外，我们也没有实现 “模式” 的概念，即先进后出（in-out）或后进先出（out-in）。实际上，模式的概念只是增加了对节点过渡时机的控制，原理上与将卸载动作封装到 `performRemove` 函数中一样，只需要在具体的时机以回调的形式将控制权交接出去即可。

#### 总结

本篇文章中，我们介绍了 Vue.js 内建的三个组件，即 KeepAlive 组件、Teleport 组件和 Transition 组件。它们共同的特点是，与渲染器的集合非常紧密，因此需要框架提供底层的实现与支持。

KeepAlive 组件的作用类似于 HTTP 的持久连接。它可以避免组件实例不断地被销毁和重建。KeepAlive 组件的基本实现并不复杂。当被 KeepAlive 的组件 “卸载” 时，渲染器不会真的将其卸载掉，而是会将该组件搬运到一个隐藏容器中，从而使得组件可以维持当前状态。当被 KeepAlive 的组件 “挂载” 时，渲染器也不会真的挂载它，而是将它从隐藏容器搬运到原容器。

我们讨论了 KeepAlive 的其他能力，如匹配策略和缓存策略。include 和 exclude 这两个选项用来指定哪些组件需要被 KeepAlive，哪些组件不需要被 KeepAlive。默认情况下，include 的 exclude 会匹配组件的 name 选项。但是在具体实现中，我们可以扩展匹配能力。对于缓存策略，Vue.js 默认采用 “最新一次访问”。为了让用户能自行实现缓存策略，我们还介绍了正在讨论中的提案。

接着，我们讨论了 Teleport 组件所要解决的问题和它的实现原理。Teleport 组件可以跨越 DOM 层级完成渲染，这在很多场景下非常有用。在实现 Teleport 时，我们将 Teleport 组件的渲染逻辑从渲染器中分离出来，这样做有两点好处：

* 可以避免渲染器逻辑代码 “膨胀”；
* 可以利用 Tree-Shaking 机制在最终的 bundle 中删除 Teleport 相关的代码，使得最终构建包的体积变小。

Teleport 组件是一个特殊的组件。与普通组件相比，它的组件选项非常特殊，例如 `__isTeleport` 选项和 `process` 选项等。这是因为 Teleport 本质上是渲染器逻辑的合理抽象，它完全可以视为渲染器的一部分存在。

最后，我们讨论了 `Transition` 组件的原理与实现。我们从原生 DOM 过渡开始，讲解了如何使用 JavaScript 为 DOM 元素添加进场动销和离场动效。在此过程中，我们将实现动效的过程分为多个阶段，即 `beforeEneter`、`enter`、`leave` 等。Transition 组件的实现原理与原生 DOM 添加过渡效果的原理类似，我们将过渡相关的钩子函数定义到虚拟节点 `vnode.transition` 对象中。渲染器在执行挂载和卸载操作时，会优先检查该虚拟节点是否需要进行过渡，如果需要，则会在合适的时机执行 `vnode.transition` 对象中定义的过渡相关钩子函数。

## 五、编译器

### 编译器核心技术概览

编译技术是一门庞大的学科，我们无法用几个章节对其做完善的讲解。但不同用途的编译器或编译技术的难度可能相差很大，对知识的掌握要求也会相差很多。如果你要实现例如 C、JavaScript 这类 **通用用途语言（general purpose language）**，那么就需要掌握较多编译技术只是。例如，理解上下文无关文法，使用巴科斯范式（`BNF`），扩展巴克斯范式（`EBNF`）书写语法规则，完成语法推导，理解和消除左递归，递归下降算法，甚至类型系统方面的知识等。但作为前端工程师，我们应用编译技术的场景通常是：表格、报表中的自定义公式计算器，设计一种领域特定语言（`DSL`）等。其中，实现公式计算器甚至只涉及编译前端技术，而领域特定语言根据其具体使用场景和目标平台的不同，难度会有所不同。Vue.js 的模板和 JSX 都属于领域特定语言，它们的实现难度属于中、低级别，只要掌握基本的编译技术理论即可实现这些功能。

#### 模板 DSL 的编译器

编译器其实只是一段程序，它用来将 “一种语言 A” 翻译成 “另外一种语言 B”。其中，语言 A 通常叫做**源代码（source code）** ，语言 B 通常叫做**目标代码（object code 或 target code）。**编译器将源代码翻译为目标代码的过程叫做**编译（compile）**。完整的编译过程通常包括词法分析、语法分析、语义分析、中间代码生成、优化、目标代码生成等步骤。

<img src="./images/compiler01.png" />

可以看到，整个编译过程分为编译前端和编译后端。编译前端包括词法分析、语法分析和语义分析，它常用与目标平台无关，仅负责分析源代码。编译后端则通常与目标平台有关，编译后端设计中间代码生成和优化以及目标代码生成。但是编译后端并不一定会包含中间代码生成和优化这两个环节，这取决于具体的场景和实现。中间代码生成和优化这两个环节有时也叫 “中端”。

上图展示了 “教科书” 式的编译模型，但 Vue.js 的模板作为 DSL，其编译流程会有所不同。对于 Vue.js 模板编译器来说，源代码就是组件的模板，而目标代码是能够在浏览器平台上运行的 JavaScript  代码，或其他拥有 JavaScript 运行时的平台代码。

源代码：

```vue
<div>
  <h1 :id="dynamicId">
    Vue Template
  </h1>
</div>
```

目标代码：

```js
function render() {
  return h('div', [
    h('h1', { id: dynamicId }, 'Vue Template')
  ])
}
```

Vue.js 模板编译器的目标代码其实就是渲染函数。详细来说，Vue.js 模板编译器首先会对模板进行词法分析和语法分析，得到模板 AST。接着，将模板 AST 转换（transform）成 JavaScript AST。最后，根据 JavaScript AST 生成 JavaScript 代码。

下图是 Vue.js 模板编译器的工作流程。

<img src="./images/compiler02.png" />

AST 是 abstract syntax tree 的首字母缩写，即抽象语法树。所谓模板 AST，其实就是用来描述模板的抽象语法树。举个例子，假设我们有如下模板。

```vue
<div>
  <h1 v-if="ok">
    Vue Template
  </h1>
</div>
```

这段代码会被编译为如下所示的 AST：

```js
const ast = [
  // 逻辑根节点
  type: 'Root',
  children: [
    // div 标签节点
    {
      type: 'Element',
      tag: 'div',
      children: [
        // h1 标签节点
        {
          type: 'Element',
          tag: 'h1',
          props: [
            // v-if 指令界定符
            {
              type: 'Directive', // 类型为 Directive 代表指令
              name: 'if', // 指令名称为 if，不带有前缀 v0
              exp: {
                // 表达式节点
                type: 'Expression',
                content: 'ok'
              }
            }
          ]
        }
      ]
    }
  ]
]
```

可以看到，AST 其实就是一个具有层级结构的对象。模板 AST 具有与模板同构的嵌套结构。每一棵 AST 都有一个逻辑上的根节点，其类型为 Root。模板中真正的根节点则作为 Root 节点的 children 存在。观察上面的 AST，我们可以得出如下结论：

* 不同类型的节点是通过 type 属性进行区分的。例如标签节点的 type 值为 `Element`。
* 标签节点的子节点存储在其 children 数组中。
* 标签节点的属性节点和指令节点会存储在 props 数组中。
* 不同类型的节点会使用不同对象属性进行描述。例如指令节点拥有 name 属性，用来表达指令的名称，而表达式节点拥有的 content 属性，用来描述表达式的内容。

我们可以通过封装 parse 函数来完成对模板的词法分析和语法分析，得到模板 AST。

<img src="./images/compiler03.png" />

我们可以用下面的代码来表达模板解析的过程：

```js
const template = `
  <div>
    <h1 v-if="ok">Vue Template</h1>
  </div>
`

const templateAST = parse(template)
```

可以看到，parse 函数接收字符串模板作为参数，并将解析后得到的 AST 作为返回值返回。

有了模板 AST 后，我们就可以对其进行语义分析，并对模板 AST 进行转换。什么是语义分析呢？举几个例子：

* 检查 v-else 指令是否存在相符的 v-if 指令。
* 分析属性值是否是静态的，是否是常量等。
* 插槽是否还会引起上层作用域的变量。
* ......

在语义分析的基础上，我们即可得到模板 AST。接着，我们还需要将模板 AST 转换为 JavaScript AST。因为 Vue.js 模板编译器的最终目标是生成渲染函数，而渲染函数本质上是 JavaScript 代码，所以我们需要将模板 AST 转换成用于描述渲染函数的 JavaScript AST。

我们可以封装 transform 函数来完成模板 AST 到 JavaScript AST 的转换工作。

<img src="./images/compiler04.png" />

同样，我们也可以用下面的代码来表示：

```js
const templateAST = parse(template)
const jsAST = transform(templateAST)
```

我们会在后面详细介绍 JavaScript AST 的结构。

有了 JavaScript AST 后，我们就可以根据它生成渲染函数了，这一步可以通过封装 generate 函数来完成。

<img src="./images/compiler05.png" />

我们也可以用下面的代码来表达代码生成的过程：

```js
const templateAST = parse(template)
const jsAST = transform(templateAST)
const code = generate(jsAST)
```

上面这段代码中，generate 函数会将渲染函数的代码以字符串的形式返回，并存储在常量中。下图是将 Vue.js 模板编译为渲染函数的完整流程。

<img src="./images/compiler06.png" />

#### parser 的实现原理

上一节中，我们讲解了 Vue.js 模板编译器的基本结构和工作流程，它主要有三个部分组成：

* 用来将模板字符串解析为模板 AST 的解析器（parser）；
* 用来将模板 AST 转换为 JavaScript AST 的转换器（transformer）；
* 用来根据 JavaScript AST 生成渲染函数代码的生成器（generator）。

本节，我们将详细讨论解析器 parser 的实现原理。

解析器的入参是字符串模板，解析器会逐个读取字符串模板中的字符串，并根据一定的规则将整个字符串切割为一个个 Token。这里的 Token 可以视作词法记号，后续我们将使用 Token 一词来代表词法记号进行讲解。举例来说，假设有这样一段模板：

```vue
<p>Vue</p>
```

解析器会把这段字符串模板切割为三个 Token。

* 开始标签：`<p>`。
* 文本标签：Vue。
* 结束标签：`</p>`。

那么，解析器是如何对模板进行切割的呢？依据什么规则？这里就不得不提到有限状态自动机。千万不要被整个名词吓到，它理解起来并不难。所谓 “有限状态”，就是指有限个状态，而 "自动机" 意味着随着字符的输入，解析器会自动地在不同状态间迁移。拿上面的模板来说，当我们分析这段模板字符串时，parse 函数会逐个读取字符，状态机会有一个初始状态，我们记为 “初始状态 1”。下图给出了状态迁移的过程。

<img src="./images/compiler07.png" />

我们用自然语言来描述图中给出的状态迁移过程。

* 状态机始于 “初始状态 1”；
* 在 “初始状态 1” 下，读取模板的第一个字符 < ，状态机会进入下一个状态，即 “标签开始状态 2” ;
* 在 “标签开始状态 2” 下，读取下一个字符 p。由于字符 p 是字母，所以状态机会进入 “标签名称状态 3”；
* 在 “标签名称状态 3” 下，读取下一个字符 >，此时状态机会从 “标签名称状态 3” 迁移回 “初始状态 1”，并记录 “标签名称状态” 下产生的标签名称 P；
* 在 “初始状态 1” 下，独起下一个字符 w，此时状态机会进入 “文本状态 4”；
* 在 “文本状态 3” 下，继续读取后续字符，知道遇到字符 < 时，状态机回再次进入 “标签开始状态 2”，并记录在 “文本状态 4” 下产生的文本内容，即字符串 “Vue”；
* 在 “标签开始状态 2” 下，读取下一个字符 /，状态机会进入 “结束标签状态 5”；
* 在 “结束标签状态 5” 下，读取下一个字符 p，状态机会进入 “结束标签名称状态 6”；
* 在 “结束标签名称状态 6” 下，读取最后一个字符 >，它是结束标签的闭合标签，于是状态机迁移回 “初始状态 1”，并记录在 “结束标签名称状态 6” 下生成的结束标签名称。

经过这样一系列的状态迁移过程之后，我们最终就能够得到相应的 Token 了。在上图中，有的圆圈是单线的，有的圆圈是双线的。双线代表此时状态机是一个合法的 Token。

另外，图中中给出的状态机并不严谨。实际上，解析 HTML 并构造 Token 的过程是有规范可循的。在 **WHATWG** 发布的关于浏览器解析 HTML 的规范中，详细阐述了状态迁移。下图截取了该规范中定义的在 “初始状态” 下状态机的状态迁移过程。

> https://html.spec.whatwg.org/multipage/parsing.html#data-state
>
> WHATWG（*Web Hypertext Application Technology Working GroupWeb* 超文本应用程序技术工作组）是一个负责[维护与开发 Web 标准](https://spec.whatwg.org/)的社区，他们的工作成果包括 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)、Fetch API，和 [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML)。一些来自 Apple、Mozilla，和 Opera 的员工在 2004 年建立了 WHATWG。

<img src="./images/compiler08.png" />

可以看到，在 “初始状态” （Data State）下，当遇到字符 < 时，状态机会迁移到 `tag open state`，即 “标签开始状态“ 。如果遇到字符 < 以外的字符，规范中也有对应的说明，应该让状态机迁移到怎样的状态。不过 Vue.js 的模板作为一个 DSL，并非必须遵守该规范。但 Vue.js 的模板毕竟是类 HTML 的实现，因此，也需要尽可能按照规范来做，不会有什么坏处。更重要的一点是，规范中已经定义了非常详细的状态迁移过程，这对于我们编写解析器非常有帮助。

按照有限状态自动机的状态迁移过程，我们可以很容易地编写对应的代码实现。因此，有限状态自动机可以帮助我们完成对模板的**标记化（tokenized）**，最终我们将得到一系列 Token。图中描述的状态机的实现如下：

```js
// 定义状态机的状态
const State = {
  initial: 1, // 初始状态
  tagOpen: 2, // 标签开始状态
  tagName: 3, // 标签名称状态
  text: 4, // 文本状态
  tagEnd: 5, // 结束标签状态
  tagEndName: 6, // 结束标签名称状态
}

// 辅助函数，用于判断是否是字母
function isAlpha(char) {
  return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

// 接收模板字符串作为参数，并将模板切割为 Token 返回
function tokenzie(str) {
  // 状态机的当前状态：初始状态
  let currentState = State.initial
  // 缓存字符
  const chars = []
  // 生成的 Token 会存储到 tokens 数组中，并作为函数的返回值返回
  const tokens = []
  
  // 使用 while 循环开启自动机
  while (str) {
    const char = str[0]

    // switch 匹配当前状态
    switch (currentState) {
      case State.initial: // 初始状态
        // 遇到字符 <
        if (char === '<') {
          // 1. 状态机切换到标签开启状态
          currentState = State.tagOpen
          // 2. 消费字符 <
          str = str.slice(1)
        } else if (isAlpha(char)) {
          // 1. 遇到字母，切换到文本状态
          currentState = State.text
          // 2. 将当前字母缓存到 chars 数组
          chars.push(char)
          // 3. 消费当前字符
          str = str.slice(1)
        }
        break;
      case State.tagOpen: // 标签开始状态
        if (isAlpha(char)) {
          // 1. 遇到字母，切换到标签名称状态
          currentState = State.tagName
          // 2. 将当前字符缓存到 chars 数组
          chars.push(char)
          // 3. 消费当前字符
          str = str.slice(1)
        } else if (char === '/') {
          // 1. 遇到字符 /，切换到结束标签状态
          currentState = State.tagEnd
          // 2. 消费字符 /
          str = str.slice(1)
        }
        break;
      case State.tagName: // 标签名称状态
        if (isAlpha(char)) {
          // 1. 遇到字母，保持状态不变，缓存当前字符到 chars 数组
          chars.push(char)
          // 2. 消费当前字符
          str = str.slice(1)
        } else if (char === '>') {
          // 1. 遇到字符 >，切换到初始状态
          currentState = State.initial
          // 2. 创建一个标签 Token，并添加到 tokens 数组中
          // tip：cahrs 数组中缓存的字符就是标签名称
          tokens.push({
            type: 'tag',
            name: chars.join('')
          })
          // 3. 清空已消费的 chars 数组
          chars.length = 0
          // 4. 消费当前字符 >
          str = str.slice(1)
        }
        break;
      case State.text: // 文本状态
        if (isAlpha(char)) {
          // 1. 遇到字母，保持状态不变，缓存当前字符到 chars 数组
          chars.push(char)
          // 2. 消费当前字符
          str = str.slice(1)
        } else if (char === '<') {
          // 1. 遇到字符 < ，切换到标签开始状态
          currentState = State.tagOpen
          // 2. 从文本状态 --> 标签开始状态，此时应该创建文本 Token，并添加到 Token 数组中
          // tip: cahrs 数组中缓存的字符就是文本内容
          tokens.push({
            type: 'text',
            content: chars.join('')
          })
          // 3. 清空已消费的 chars 数组
          chars.length = 0
          // 4. 消费当前字符 <
          str = str.slice(1)
        }
        break;
      case State.tagEnd: // 标签结束状态
        if (isAlpha(char)) {
          // 1. 遇到字母，切换到结束标签名称状态
          currentState = State.tagEndName
          // 2. 将当前字符缓存到 chars 数组
          chars.push(char)
          // 3. 消费当前字符
          str = str.slice(1)
        }
        break;
      case State.tagEndName: // 结束表明名称状态
        if (isAlpha(char)) {
          // 1. 遇到字母，保持状态不变，缓存当前字符到 chars 数组
          chars.push(char)
          // 2. 消费当前字符
          str = str.slice(1)
        } else if (char === '>') {
          // 1. 遇到字母 >，切换到初始状态
          currentState = State.initial
          // 2. 从结束标签名称状态 --> 初始状态，应该保存结束标签名称 Token
          // tip: cahrs 数组中缓存的字符就是标签名称
          tokens.push({
            type: 'tagEnd',
            name: chars.join('')
          })
          // 3. 清空已消费的 chars 数组
          chars.length = 0
          // 4. 消费当前字符 >
          str = str.slice(1)
        }
        break;
    }
  }

  // 返回 tokens
  return tokens
}
```

这段代码看上去比较冗长，可优化的点非常多。这段代码高度还原了图中展示的状态机，配合代码中的注释会更容易理解。

使用上面给出的 `tokenzie` 函数来解析模板 `<p>Vue</p>` ，我们将得到三个 Token。

```js
const tokens = tokenzie(`<p>Vue</p>`)

// [
//   { type: 'tag', name: 'p' },
//   { type: 'text', content: 'Vue' },
//   { type: 'tagEnd', name: 'p' }
// ]
```

现在，你已经明白了状态机的工作原理，以及模板编译器将模板字符串切割为一个个 Token 的过程。以上述例子来说，我们并非总是需要所有 Token。例如，在解析模板的过程中，结束标签 Token 可以省略。这时，我们就可以调整 `tokenzie` 函数的代码，并选择性地忽略结束标签 Token。当然，有时我们也可能需要更多的 Token，这都取决于具体的需求，然后据此可以灵活地调整代码实现。

总而言之，通过有限自动机，我们能够将模板解析为一个个 Token，进而可以用它们构建一棵 AST。在具体构建 AST 之前，我们需要思考能够简化 `tokenzie` 函数的代码。实际上，我们可以通过正则表达式来精简 `tokenzie` 函数的代码。上文之所以没有从最开始就采用正则表达式来实现，是因为**正则表达式的本质就是有限自动机**。当你编写正则表达式时，其实就是在编写有限自动机。

#### 构造 AST

实际上，不同用途的编译器之间可能会存在非常大的差异。它们唯一的共同点是，都会将源代码转换成目标代码。但如果深入细节即可发现，不同编译器之间的实现思路甚至可能完全不同，其中就包括 AST 的构造方式。对于通用用途语言（GPL）来说，例如 JavaScript 这样的脚本语言，想要为其构造 AST，较常用的一种算法叫做递归下降算法，这里面需要解决 GPL 层面才会遇到的很多问题，例如最基本的运算符优先级问题。然而，对于像 Vue.js 模板这种的 DSL 来说，首先可以确定的一点是，它不具备远算符，所以也就没有所谓的运算符优先级问题。DSL 和 GPL 的区别在于，GPL 是图灵完备的，我们可以使用 GPL 来实现 DSL。而 DSL 不要求图灵完备，它只需要满足场景下的特定用途即可。

为 Vue.js 的模板构造 AST 是一件很简单的事。HTML 是一种标记语言，它的格式非常固定，标签元素之间天然嵌套，形成父子关系。因此，一棵用于描述 HTML 的 AST 将拥有与 HTML 标签非常相似的树形结构。举例来说，假设有如下模板：

```html
<div>
  <p>Vue</p>
  <p>Template</p>
</div>
```

在上面这段模板中，最外层的根结点是 div 标签，它有两个 p 标签作为子节点。同时，这两个 p 标签都具有一个文本节点作为子节点。我们可以将这段模板对应的 AST 设计为：

```js
const ast = {
  type: 'Root',
  children: [
    {
      type: 'Element',
      tag: 'div',
      children: [
        {
          type: 'Element',
          tag: 'p',
          children: [
            {
              type: 'Text',
              content: 'Vue'
            }
          ]
        }
      ]
    },
    {
      type: 'Element',
      tag: 'div',
      children: [
        {
          type: 'Element',
          tag: 'p',
          children: [
            {
              type: 'Text',
              content: 'Template'
            }
          ]
        }
      ]
    }
  ]
}
```

可以看到，AST 在结构上与模板是 “同构” 的，它们都具有树形结构。

<img src="./images/compiler09.png" />

了解了 AST 的结构，接下来我们的任务是，使用程序根据模板解析后生成的 Token 构造出这样一棵 AST。首先，我们使用上一节的 `tokenize` 函数将开头给出的模板进行标记化。解析这段模板得到的 tokens 如下所示。

```js
const tokens = tokenzie(`<div><p>Vue</p><p>Template</p></div>`)
```

执行上段代码，我们将得到如下 tokens：

```js
[
  { type: 'tag', name: 'div' },          // div 开始标签节点
  { type: 'tag', name: 'p' },            // p 开始标签节点
  { type: 'text', content: 'Vue' },      // 文本节点
  { type: 'tagEnd', name: 'p' },         // p 结束标签节点
  { type: 'tag', name: 'p' },            // p 开始标签节点
  { type: 'text', content: 'Template' }, // 文本节点
  { type: 'tagEnd', name: 'p' },         // p 结束标签节点
  { type: 'tagEnd', name: 'div' }        // div 结束标签节点
]
```

根据 Token 列表构建 AST 的过程，其实就是对 Token 列表进行扫描的过程。从第一个 Token 开始，顺序地扫描整个 Token 列表，直到列表中的所有 Token 处理完毕。在这个过程中，我们需要维护一个栈 `elementStack` ，这个栈将用于维护元素间的父子关系。每遇到一个开始标签节点，我们就构造一个 Element 类型的 AST 节点，并将其亚茹栈中。类似地，每当遇到一个结束标签节点，我们就将当前栈顶的节点弹出。这样，栈顶的节点将始终充当父节点的角色。扫描过程中遇到的所有节点，都会作为当前栈顶节点的子节点，并添加到栈顶节点的 children 属性下。

下图给出在扫描 Token 列表之前，Token 列表、父级元素栈和 AST 三者的状态。

<img src="./images/compiler10.png" />

在图中，左侧的事 Token 列表，我们将会按照从上到下的顺序扫描 Token 列表，中间和右侧分别展示了栈 `elementStack` 的状态和 AST 的状态。可以看到，它们最初都只有 Root 根节点。

接着，我们对 Token 列表进行扫描。首先，扫描到第一个 Token，即 "开始标签(div)"。

<img src="./images/compiler11.png" />

由于当前扫描到的 Token 是一个开始标签节点，因此我们创建一个类型为 `Element` 的 AST 节点 `Element(div)` ，然后将该节点作为当前栈顶节点的子节点。由于当前栈顶节是 Root 根节点，所以我们将新建的 `Element(div)` 节点作为 Root 根节点的子节点添加到 AST 中，最后将新建的 `Element(div)` 节点压入 `elementStack` 栈。

接着，我们扫描下一个 Token。

扫描到的第二个 Token 也是一个开始标签节点，因此我们创建一个类型为 `Element` 的 AST 节点 `Element(p)`，然后将该节点作为当前栈顶节点的子节点。由于当前栈顶节点为 `Element(div)` 节点，所以我们将新建的 `Element(div)` 节点的子节点添加到 AST 中，最后将新建的 `Element(p)` 节点压入 `elementStack` 栈。

<img src="./images/compiler12.png" />

接着，我们扫描下一个 Token。扫描到的第三个 Token 是一个文本节点，于是我们创建一个类型为 `Text` 的 AST 节点 `Text(vue)` ，于是我们创建一个类型为 `Text` 的 AST 节点 `Text(Vue)`，然后将该节点作为当前栈顶节点的子节点。当前栈顶节点为 `Element(p)` 节点，所以我们将新建的 `Text(p)` 节点作为 `Element(p)` 节点的子节点添加到 AST 中。

<img src="./images/compiler13.png" />

接着，扫描下一个 Token。此时扫描的 Token 是一个结束标签，所以我们需要将栈顶的 `Element(p)` 节点从 `elementStack` 栈中弹出。

<img src="./images/compiler14.png" />

接着，扫描下一个 Token。此时扫描到的是一个开始标签，我们为它新建一个 AST 节点 `Element(p)` ，并将其作为当前栈顶节点 `Element(div)` 的子节点。最后，将 `Element(p)` 压入 `elementStack` 栈中，使其成为新的栈顶节点。

<img src="./images/compiler15.png" />

接着，开始扫描下一个 Token。此时扫描到的 Token 是一个文本节点，所以只需要为其创建一个相应的 AST 节点 `Text(Template)` 即可，然乎将其作为当前栈顶节点 `Element(p)` 的子节点添加到 AST 中。

<img src="./images/compiler16.png" />

接着，扫描下一个 Token。此时扫描到的 Token 是一个结束标签，于是我们将当前的栈顶节点 `Element(p)` 从 `elementStack` 栈中弹出。

<img src="./images/compiler17.png" />

接着，扫描下一个 Token。此时，扫描到最后一个 Token，它是一个 div 结束标签，所以我们需要再次将当前栈顶节点 `Element(div)` 从 `elementStack` 栈中弹出。至此，所有 Token 都被扫描完毕，AST 构建完成。

<img src="./images/compiler18.png" />

下图是最终状态。在所有 Token 扫描完毕后，一棵 AST 就构建完成了。

<img src="./images/compiler19.png" />

扫描 Token 列表并构建 AST 的具体实现如下：

```js
// parse 函数接收模板作为参数
function parse(str) {
  // 首先对模板进行标记化，得到 tokens
  const tokens = tokenzie(str)
  //  创建 Root 根节点
  const root = {
    type: 'Root',
    children: []
  }
  // 创建 elementStack 栈
  const elementStack = [root]

  // 开启 while 循环扫描 tokens
  while (tokens.length) {
    // 获取当前栈顶节点作为父节点 parent
    const parent = elementStack[elementStack.length - 1]
    // 当前扫描的 Token
    const t = tokens[0]

    switch (t.type) {
      case 'tag':
        // 如果当前 Token 是开始标签，创建 Element 类型的 AST 节点
        const elementNode = {
          type: 'Element',
          tag: t.name,
          children: []
        }
        // 将其添加到父级节点的 children 中
        parent.children.push(elementNode)
        // 将当前节点压入栈
        elementStack.push(elementNode)
        break;
      case 'text':
        // 如果当前 Token 是文本，创建 Text 类型的 AST 节点
        const textNode = {
          type: 'Text',
          content: t.content
        }
        // 将其添加到父节点的 children 中
        parent.children.push(textNode)
        break;
      case 'tagEnd':
        // 遇到结束标签，将栈顶节点弹出
        elementStack.pop()
        break;
    }

    // 消费已扫描过的 token
    tokens.shift()
  }

  // 返回 ast
  return root
}
```

上述代码很好地还原了上文中介绍的构建 AST 的思路，我们可以使用如下代码对其进行测试。

```js
const ast = parse('<div><p>Vue</p><p>Template</p></div>')
```

运行这句代码，我们会得到与本节开头给出的 AST 一致的结果。不过当前的实现仍然存在很多问题。这些问题我们会在后面详细讲解。

#### AST 转换与插件化结构

上一节中，我们完成了 AST 的构造。本节，我们将讨论关于 AST 的转换。所谓 AST 的转换。指的是对 AST 进行一系列操作，将其转换为新的 AST 的过程。新的 AST 可以是原语言或原 DSL 的描述，也可以是其他语言或其他 DSL 的描述。例如，我们可以对模板 AST 进行操作，将其转换为 JavaScript AST。转换后的 AST 可以用于代码生成。这其实就是 Vue.js 的模板编译器将模板编译为渲染函数的过程。

<img src="./images/compiler20.png" />

其中 transform 函数就是用来完成 AST 转换工作的。

##### 节点的访问

为了对 AST 进行转换，我们需要能访问 AST 的每一个节点，这样才有机会对特定节点进行修改、替换、删除等操作。由于 AST 是树形数据结构，所以我们需要编写一个深度优先的遍历算法，实现对 AST 中节点的访问。不过，在开始编写之前，我们有必要编写一个 `dump`  工具函数，用来打印当前 AST 中节点的信息。

```js
const { parse } = require('../vue/compiler')

function dump(node, indent = 0) {
  // 节点类型
  const type = node.type
  // 节点的描述，如果是根节点，则没有描述
  // 如果是 Element 类型的节点，则使用 node.tag 作为节点的描述
  // 如果是 Text 类型的节点，则使用 ndoe.content 作为节点的描述
  const desc = node.type === 'Root'
    ? ''
    : node.type === 'Element' 
      ? node.tag
      : node.content
  // 打印节点的类型和描述信息
  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)
  // 递归地打印子节点
  if (node.children) {
    node.children.forEach(n => dump(n, indent + 2))
  } 
}

const ast = parse('<div><p>Vue</p><p>Template</p></div>')

dump(ast)
```

我们还是使用上一节的例子，使用 dump 函数输出结果。

```js
Root: 
--Element: div
----Element: p
------Text: Vue
----Element: p
------Text: Template
```

可以看到，dump 函数可以以清晰的格式来展示 AST 中的节点。在后续编写 AST 的转换代码是，我们可以使用 dump 函数展示转换后的结果。

接下来，我们将着手实现对 AST 中节点的访问。访问节点的方式是，从 AST 根节点开始，进行深度优先遍历。

```js
function traverseNode(ast) {
  // 当前节点，ast 本身就是 Root 节点
  const currentNode = ast

  console.log(currentNode)

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = currentNode.children
  if (children) {
    children.forEach(item => {
      traverseNode(item)
    })
  }
}
```

`traverseNode` 函数以深度优先的方式遍历 AST，它的实现与 dump 函数几乎相同。有了 `traverseNode` 函数后，我们就可以实现对 AST 中节点的访问。例如，我们可以实现一个转换功能，将 AST 中所有 `p` 标签转换为 `h1` 标签。

```js
function traverseNode(ast) {
  // 当前节点，ast 本身就是 Root 节点
  const currentNode = ast

  // 当节点进行操作
  if (currentNode.type === 'Element' && currentNode.tag === 'p') {
    // 将所有 p 标签转换为 h1 标签
    currentNode.tag = 'h1'
  }

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = currentNode.children
  if (children) {
    children.forEach(item => {
      traverseNode(item)
    })
  }
}
```

在上面这段代码中，我们通过检查当前节点的 type 属性和 tag 属性，来确保被操作的节点是 p 标签。接着，我们将符合条件的节点的 tag 属性值修改为 `h1` ，从而实现 `p` 标签到 `h1` 标签的转换。我们可以使用 dump 函数打印转换后的 AST 的信息。

```js
function transform(ast) {
  // 调用 traverseNode 完成转换
  traverseNode(ast)
  // 打印 AST 信息
  dump(ast)
}
```

运行上段代码，我们可以得到如下输出：

```js
Root: 
--Element: div
----Element: h1
------Text: Vue
----Element: h1
------Text: Template
```

可以看到，所有 `p` 标签都已经变成 `h1` 标签。

我们还可以对 AST 进行其他转换。例如，实现一个转换，将文本节点的内容重复两次。

```js
function traverseNode(ast) {
  // 当前节点，ast 本身就是 Root 节点
  const currentNode = ast

  // 当节点进行操作
  if (currentNode.type === 'Element' && currentNode.tag === 'p') {
    // 将所有 p 标签转换为 h1 标签
    currentNode.tag = 'h1'
  }
  if (currentNode.type === 'Text') {
    currentNode.content = currentNode.content.repeat(2)
  }

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = currentNode.children
  if (children) {
    children.forEach(item => {
      traverseNode(item)
    })
  }
}
```

最终，我们可以得到如下输出：

```js
Root: 
--Element: div
----Element: h1
------Text: VueVue
----Element: h1
------Text: TemplateTemplate
```

可以看到，文本节点的内容全部重复了两次。

不过，随着功能的不断增加，`traverseNode` 函数将会变得越来越 “臃肿”。这时，我们很自然地想到，能够最节点的操作和访问进行解耦呢？答案是 “当前可以”，我们可以使用回调函数的机制实现解耦。

```js
function traverseNode(ast, context) {
  // 当前节点，ast 本身就是 Root 节点
  const currentNode = ast

  // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
  const transforms = context.nodeTransforms || []
  transforms.forEach(cur => {
    // 将当前节点 currentNode 和 context 都传递给 nodeTransforms 中注册的回调函数
    cur(currentNode, context)
  })

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = currentNode.children
  if (children) {
    children.forEach(cur => {
      traverseNode(cur, context)
    })
  }
}
```

在上面这段代码中，我们首先为 `traverseNode` 函数增加了第二个参数 context。关于 context 的内容，后面会详细介绍。接着，我们把回调函数存储到 `context.nodeTransforms` 数组中，然后遍历该数组，并逐个调用注册在其中的回调函数。最后，我们将当前节点 `currentNode` 和 `context` 对象分别作为参数传递给回调函数。

有了修改后的 `traverseNode` 函数，我们就可以这样使用它。

```js
function transformElement(node) {
  if (node.type === 'Element' && node.tag === 'p') {
    // 将所有 p 标签转换为 h1 标签
    node.tag = 'h1'
  }
}
function transdormText(node) {
  if (node.type === 'Text') {
    node.content = node.content.repeat(2)
  }
}

function transform(ast) {
  // 在 transform 函数内创建 context 对象
  const context = {
    // 注册 nodeTransforms 数组
    nodeTransforms: [
      transformElement,
      transdormText
    ]
  }

  // 调用 traverseNode 完成转换
  traverseNode(ast, context)
  // 打印 AST 信息
  dump(ast)
}
```

运行上述代码，可以实现和改造前同样的打印效果：

```js
Root: 
--Element: div
----Element: h1
------Text: VueVue
----Element: h1
------Text: TemplateTemplate
```

可以看到，解耦之后，节点操作封装到 `transformElment` 和 `transformText` 这样的独立函数中。我们甚至可以编写任意多个类似的转换函数，只需要将它们注册到 `context.nodeTransforms` 中即可。这样就解决了功能增加所导致的 `traverseNode` 函数 “臃肿” 的问题。

##### 转换上下文与节点操作

在上下文中，我们将转换函数注册到 `context.nodeTransform` 数组中。那么，为什么要使用 `context` 对象呢？直接定义一个数组不可以吗？你可能或多或少听说过关于 Context（上下文）的内容，我们可以把 Context 看做程序在某个范围内的 “全局变量” 。实际上，上下文并不是一个具象的东西，它依赖于具体的使用场景。

* 编写 React 应用时，我们可以使用 `React.createContext` 函数创建一个上下文对象，该上下文对象允许我们将数据通过组件树一层层地传递下去。无论组件树的层级有多深，只要组件在这棵组件树的层级内，那么它就能够访问上下文对象中的数据。
* 编写 Vue.js 应用时，我们也可以通过 `provied/inject` 等能力，向一整棵组件树提供数据。这些数据可以称之为上下文。
* 编写 Koa 应用时，中间件接收的 context 参数也是一种上下文对象，所有中间件都可以通过 context 来访问相同的数据。

通过上面三个例子我们能够认识到，上下文对象其实就是程序在某个范围内的 “全局变量”。换句话来说，我们也可以把全局变量看作是全局上下文。

回到我们讲解的 `context.nodeTransform` 数组，这里的 context 可以看做 AST 转换函数过程中的上下文数据。所有 AST 转换函数都可以通过 context 来共享数据。上下文对象中通常会维护程序的当前状态，例如当前转换的节点是哪一个？当先转换的节点的父节点是谁？甚至当前节点是父节点的第几个子节点？等等。这些信息对于编写复杂的转换函数非常有用。所以，接下来我们要做的就是构造上下文信息。

```js
function transform(ast) {
  // 在 transform 函数内创建 context 对象
  const context = {
    // 增加 currentNode，存储当前正在转换的节点
    currentNode: null,
    // 增加 childIndex，存储当前节点在父节点的 children 中的位置索引
    childIndex: 0,
    // 增加 parent，存储当前转换节点的父节点
    parent: null,
    // 注册 nodeTransforms 数组
    nodeTransforms: [
      transformElement,
      transdormText
    ]
  }

  // 调用 traverseNode 完成转换
  traverseNode(ast, context)
  // 打印 AST 信息
  dump(ast)
}
```

在上段代码中，我们为转换上下文对象扩展了一些重要信息。

* `currentNode`：用来存储当前正在转换的节点。
* `childIndex`：用来存储当前节点在父节点的 children 中的位置索引。
* `parent`：用来存储当前转换节点的父节点。

紧接着，我们需要在合适的地方设置转换上下文对象中的数据。

```js
function traverseNode(ast, context) {
  // 当前节点，ast 本身就是 Root 节点
  context.currentNode = ast

  // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
  const transforms = context.nodeTransforms || []
  transforms.forEach(cur => {
    // 将当前节点 currentNode 和 context 都传递给 nodeTransforms 中注册的回调函数
    cur(context.currentNode, context)
  })

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = context.currentNode.children
  if (children) {
    children.forEach((cur, i) => {
      // 设置父节点
      context.parent = context.currentNode
      // 设置位置索引
      context.childIndex = i
      // 递归调用
      traverseNode(cur, context)
    })
  }
}
```

观察上端代码，其关键点在于，在递归地调用 `traverseNode` 函数进行子节点的转换之前，我们必须设置 `context.parent` 和 `context.childIndex` 的值，这样才能保证在接下来的递归转换中，context 对象所存储的信息是正确的。

有了上下文数据后，我们就可以实现节点替换功能。在对 AST 进行转换的时候，我们可能希望把某些节点替换为其他类型的节点。例如，将所有文本节点替换成一个元素节点。为了完成节点替换，我们需要在上下文对象中添加 `context.replaceNode`　函数。该函数接收新的 AST 节点作为参数，并使用新节点替换当前正在转换的节点。

```js
function transform(ast) {
  // 在 transform 函数内创建 context 对象
  const context = {
    // 增加 currentNode，存储当前正在转换的节点
    currentNode: null,
    // 增加 childIndex，存储当前节点在父节点的 children 中的位置索引
    childIndex: 0,
    // 增加 parent，存储当前转换节点的父节点
    parent: null,
    // 用于替换节点的函数，接收新节点作为参数
    replaceNode(node) {
      // 为了替换节点，我们需要修改 AST
      // 找到当前节点在父节点的 children 中的位置：context.childIndex
      // 然后使用新节点替换即可
      context.parent.children[context.childIndex] = node
      // 由于当前新节点已经被新节点替换掉，因此我们需要将 currentNode 更新为新节点
      context.currentNode = node
    },
    // 注册 nodeTransforms 数组
    nodeTransforms: [
      transformElement,
      transdormText
    ]
  }

  // 调用 traverseNode 完成转换
  traverseNode(ast, context)
  // 打印 AST 信息
  dump(ast)
}
```

观察上面的代码中的 `replaceNode` 函数。在该函数内，我们首先通过 `context.childIndex` 属性取得当前节点的位置索引，然后通过 `context.parent.children` 取得当前节点所在集合，最后配合使用 `context.childrenIndex` 与 `context.parent.children` 即可完成节点替换。另外，由于当前节点已经替换为新节点，所以我们应该使用新节点更新 `context.currentNode` 属性的值。

接下来，我们就可以在转换函数中使用 `replaceNode` 函数对 AST 中的节点进行替换了。

```js
function transdormText(node, context) {
  if (node.type === 'Text') {
    // 如果当前转换的节点是文本节点，调用 replaceNode 函数将其替换为元素节点
    context.replaceNode({
      type: 'Element',
      tag: 'span'
    })
  }
}
```

如上面的代码所示，转换函数的第二个参数就是 `context` 对象，所以我们可以在转换函数内部使用该对象上的任意属性或函数。在 `transformText` 函数内部，首先检查当前转换的节点是否是文本节点，如果是，则调用 `context.replaceNode` 函数将其替换为新的 `span` 标签节点。

```js
const ast = parse('<div><p>Vue</p><p>Template</p></div>')
transform(ast)
```

运行上段代码，转换前后的结果分别是。

```js
// 转换前
Root: 
--Element: div
----Element: h1
------Text: VueVue
----Element: h1
------Text: TemplateTemplate

// 转换后
Root: 
--Element: div
----Element: h1
------Element: span
----Element: h1
------Element: span
```

可以看到，转换后的 AST 中的文本节点全部变为 `span`标签节点了。

处理替换节点，有时我们还希望移除当前访问的节点。我们可以通过实现 `context.removeNode` 函数来达到目的。

```js
function transform(ast) {
  // 在 transform 函数内创建 context 对象
  const context = {
    // 增加 currentNode，存储当前正在转换的节点
    currentNode: null,
    // 增加 childIndex，存储当前节点在父节点的 children 中的位置索引
    childIndex: 0,
    // 增加 parent，存储当前转换节点的父节点
    parent: null,
    // 用于替换节点的函数，接收新节点作为参数
    replaceNode(node) {
      // 为了替换节点，我们需要修改 AST
      // 找到当前节点在父节点的 children 中的位置：context.childIndex
      // 然后使用新节点替换即可
      context.parent.children[context.childIndex] = node
      // 由于当前新节点已经被新节点替换掉，因此我们需要将 currentNode 更新为新节点
      context.currentNode = node
    },
    // 删除当前节点
    removeNode() {
      if (context.parent) {
        // 调用数组的 splice 方法，根据当前节点的索引删除当前节点
        context.parent.children.splice(context.childIndex, 1)
        // 将 context.currentNode 置空
        context.currentNode = null
      }
    },
    // 注册 nodeTransforms 数组
    nodeTransforms: [
      transformElement,
      transdormText
    ]
  }

  // 调用 traverseNode 完成转换
  traverseNode(ast, context)
  // 打印 AST 信息
  dump(ast)
}
```

移除当前访问的节点也非常简单，只需要取得其位置索引 `context.childIndex`，再调用数组的 `splice` 方法将其从所属的 `children` 列表中移除即可。另外，当节点被移除之后，不要忘记将 `context.currentNode` 的值置空。这里需要注意一点，由于当前节点已被移除，后续的转换函数将不再需要处理该节点。因此，我们需要对 `traveseNode` 函数做一些调整。

```js
function traverseNode(ast, context) {
  // 当前节点，ast 本身就是 Root 节点
  context.currentNode = ast

  // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
  const transforms = context.nodeTransforms || []
  for (let i = 0; i < transforms.length; i++) {
    // 将当前节点 currentNode 和 context 都传递给 nodeTransforms 中注册的回调函数
    transforms[i](context.currentNode, context)
    // 由于任何转换函数都可能移除当前节点，因此每个转换函数执行完毕后，
    // 都应该检查当前节点是否以经被移除，如果被移除，直接返回即可
    if (!context.currentNode) return
  }

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = context.currentNode.children
  if (children) {
    children.forEach((cur, i) => {
      // 设置父节点
      context.parent = context.currentNode
      // 设置位置索引
      context.childIndex = i
      // 递归调用
      traverseNode(cur, context)
    })
  }
}
```

在修改后的 `traverseNode` 函数中，我们增加了一行代码，用于检查 `context.currentNode` 是否存在。由于任何转换函数都可能移除当访问的节点，所以每个转换函数执行完毕后，都应该检查当前访问的节点是否已经被移除，如果检测到节点已被移除，直接返回即可，无须做后续的处理。

有了 `context.removeNode` 函数之后，我们即可实现用于移除文本节点的转换函数。

```js
function transdormText(node, context) {
  if (node.type === 'Text') {
    // 如果是文本节点，直接调用 context.rmeoveNode 函数将其移除即可
    context.removeNode()
  }
}
```

继续下面的用例：

```js
const ast = parse('<div><p>Vue</p><p>Template</p></div>')
transform(ast)
```

转换前后输出结果是：

```js
// 转换前
Root: 
--Element: div
----Element: h1
------Text: VueVue
----Element: h1
------Text: TemplateTemplate

// 转换后
Root: 
--Element: div
----Element: h1
----Element: h1
```

可以看到，在转换后的 AST 中，将不再有任何文本节点。

##### 进入与退出

在转换 AST 节点的过程中，往往需要根据其子节点的情况来决定如何对当前节点进行转换。这就要求父节点的转换操作必须等待所有子节点全部转换完毕后再执行。然而，我们目前设计的转换工作流并不支持这一能力。上文中介绍的转换工作流，是一种从根节点开始、顺序执行的工作流。

<img src="./images/compiler21.png" />

从图中可以看出，Root 根节点第一个被处理，节点层次越深，对它的处理将越靠后，这种顺序处理的工作流存在的问题是，当一个节点被处理时，意味着它的父节点已经被处理完毕了，并且我们无法再回头重新处理父节点。

更加理想的转换工作流应该如下图所示。

<img src="./images/compiler22.png" />

对节点的访问分为两个阶段，即进入阶段和退出阶段。当转换函数处理进入阶段时，它会先进入父节点，再进入子节点。当转换函数出去退出阶段时，会先退出子节点，再退出父节点。这样，只要我们再退出节点阶段对当前访问的节点进行处理，就一定能保证其子节点全部处理完毕。

为了实现图中所示的转换工作流，我们需要重新设计转换函数的能力。

```js
function traverseNode(ast, context) {
  // 当前节点，ast 本身就是 Root 节点
  context.currentNode = ast
  // 增加退出阶段的回调函数数组
  const exitFns = []

  // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
  const transforms = context.nodeTransforms || []
  for (let i = 0; i < transforms.length; i++) {
    // 转换函数可以返回另外一个函数，该函数作为退出阶段的回调函数
    const onExit = transforms[i](context.currentNode, context)

    if (onExit) {
      // 将退出阶段的回调函数添加到 exitFns 数组中
      exitFns.push(onExit)
    }
    
    // 由于任何转换函数都可能移除当前节点，因此每个转换函数执行完毕后，
    // 都应该检查当前节点是否以经被移除，如果被移除，直接返回即可
    if (!context.currentNode) return
  }

  // 如果有子节点，则递归地调用 traverseNode 函数进行遍历
  const children = context.currentNode.children
  if (children) {
    children.forEach((cur, i) => {
      // 设置父节点
      context.parent = context.currentNode
      // 设置位置索引
      context.childIndex = i
      // 递归调用
      traverseNode(cur, context)
    })
  }

  // 节点处理的最后阶段执行缓存到 exitFns 中的回调函数
  // tip：这里我们要反序执行
  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}
```

在上面这段代码中，我们增加了一个数组 `exitFns` ，用来存储由转换函数返回的回调函数。接着，在 `traverseNode` 函数的最后，执行这些缓存在 `exitFns` 数组中的回调函数。这样就可以保证，当退出阶段的回调函数执行时，当前访问的节点的子节点已经全部处理过了。有了这些能力之后，我们在编写转换函数时，可以将转换逻辑编写在退出阶段的回调函数中，从而保证在对当前访问的阶段进行转换之前，其子节点一定全部处理完毕了。

```js
function transformElement(node) {
  // 进入节点

  // 返回一个会在退出节点执行的回调函数
  return () => {
    // 在这里编写退出节点的逻辑，当这里的代码运行时，当前转换的子节点一定处理完毕了
  }
}
```

另外还有一点需要注意，退出阶段的回调函数时反序执行的。这意味着，如果注册了多个转换函数，则它们的注册顺序将决定代码的执行结果。假设我们注册的两个转换函数分别是 `transformA` 和 `transformB`。

```js
function transform(ast) {
  const context = {
		// ...
    nodeTransforms: [
      transformA,
      transdormB
    ]
  }

  traverseNode(ast, context)
  dump(ast)
}
```

在这段代码中，转换函数 `transformA` 先于 `transformB` 被注册。这意味着，在执行转换时，`transformA` 的 “进入阶段” 会先与 `transformB` 的 “进入阶段” 执行，而 `transformA` 的 “退出阶段” 将晚于 `transformB`  的 “退出阶段” 执行：

```js
-- transformA 进入阶段执行
---- transformB 进入阶段执行
---- transformB 退出阶段执行
-- transformA 退出阶段执行
```

这么设计的好处是，转换函数 `transformA` 将有机会等待 `transformB` 执行完毕后，再根据具体情况决定应该如何工作。

如果将 `transformA` 与 `transformB` 的顺序调换，那么转换函数的执行顺序也将改变：

```js
-- transformB 进入阶段执行
---- transformA 进入阶段执行
---- transformA 退出阶段执行
-- transformB 退出阶段执行
```

由此可见，当把转换逻辑编写在转换函数的退出阶段时，不仅能够保证所有子节点全部处理完毕，还能够保证所有后续注册的转换函数执行完毕。

#### 将模板 AST 转为 JavaScript AST

上一节中，我们讨论了如何对 AST 进行转换，并实现了一个基本的插件架构，即通过注册自定义的转换函数实现对 AST 的操作。本节，我们将讨论如何将模板 AST 转换为 JavaScript AST，为后续讲解代码生成做铺垫。

为什么要将模板 AST 转化为 JavaScript AST？我们需要将模板编译为渲染函数。而渲染函数是由 JavaScript 代码来描述的，因此，我们需要将模板 AST 转换为用于描述渲染函数的 JavaScript AST。

以上一节给出的模板为例：

```vue
<div><p>Vue</p><p>Template</p></div>
```

与这段模板等价的渲染函数是：

```js
function render() {
  return h('div', [
    h('p', 'Vue'),
    h('p', 'Template')
  ])
}
```

上面这段渲染函数的 JavaScript 代码所对应的 JavaScript AST 就是我们的转换目标。那么，它对应的 JavaScript AST 是什么样子的呢？与模板 AST 是模板的描述一样，JavaScript AST 是 JavaScript 代码的描述。所以，本质上我们需要设计一些数据结构来描述渲染函数的代码。

首先，我们观察上面这段渲染函数的代码。它是一个函数声明，所以我们首先要描述 JavaScript 中的函数声明语句。一个函数声明语句由以下几部分组成。

* id：函数名称，它是一个标识符 `Identifier`；
* params：函数的参数，它是一个数组；
* body：函数体，由于函数体可以包含多个语句，因此它也是一个数组。

为了简化问题，我们暂时不考虑箭头函数、生成器函数、async 函数等情况。根据以上信息，我们就可以设计一个基本的数据结构来描述函数声明语句。

```js
const FunctionDeclNode = {
  type: 'FunctionDecl', // 标识该节点是函数声明
  // 函数名称是一个标识符，标识符本身也是一个节点
  id: {
    type: 'Identifier',
    name: 'render', // name 用来存储标识符的名称，在这里它就是渲染函数的名称 render
  },
  parmas: [], // 参数，目前渲染函数还不需要参数，所以这里是一个空数组
  // 渲染函数的函数体只有一个语句，即 return 语句
  body: [
    {
      type: 'ReturnStatement',
      return: null // 暂时留空，后续会继续讲解
    }
  ]
}
```

如上面的代码所示，我们使用一个对象来描述一个 JavaScript AST 节点。每个界节点都具有 type 字段，该字段用来代表节点的类型。对于函数声明语句来说，它的类型是 `FunctionDecl`。接着，我们使用 id 字段来存储函数的名称。函数的名称应该是一个合法的标识符，因此 id 字段本身也是一个类型为 `Identifier` 的节点。当然，我们在设计 JavaScript AST 的时候，可以根据实际需要进行调整。例如，我们完全可以将 id 字段设计为一个字符串类型的值。这样做虽然不完全符合 JavaScript 的定义，但是能够满足我们的需求。对于函数的参数，我们使用 `params` 数组来存储。目前，我们设计的渲染函数还不需要参数，因此暂时设置为空数组。最后，我们使用 body 字段来描述函数的函数体。一个函数的函数体内可以存在多个语句，所以我们使用一个数组来描述它。该数组内的每个元素都对应一条语句，对于渲染函数来说，目前它只有一个返回语句，所以我们使用一个类型为 `ReturnStatement` 的节点来描述该返回语句。

介绍完函数声明语句的节点结构后，我们再来看一下渲染函数的返回值。渲染函数返回的是虚拟 DOM 节点，具体体现在 `h` 函数的调用。我们可以使用 `CallExpression` 类型的节点来描述函数调用语句。

```js
const CallExp = {
  type: 'CallExpression',
  // 被调用函数的名称，它是一个标识符
  callee: {
    type: 'Identifier',
    name: 'h'
  },
  // 参数
  arguments: []
}
```

类型为 `CallExpression` 的节点拥有两个属性：

* callee：用来描述被调用函数的名称，它本身是一个标识符节点
* arguments：被调用函数的形式参数，多个参数的话用数组描述

我们再次观察渲染函数的返回值：

```js
function render() {
  // h 函数的第一个参数是一个字符串字面量
  // h 函数的第二个参数是一个数组
  return h('div', [])
}
```

可以看到，最外层的 h 函数的第一个参数是一个字符串字面量，我们可以使用类型为 `StringLiteral` 的节点描述它：

```js
const Str = {
  type: 'StringLiteral',
  value: 'div'
}
```

最外层的 h 函数的第二个参数是一个数组，我们可以使用类型为 `ArrayExpression` 的节点来描述它：

```js
const Arr = {
  type: 'ArrayExpression',
  // 数组中的元素
  elements: []
}
```

使用上述 `CallExpression`、`StringLiteral`、`ArrayExpression` 等节点来填充渲染函数的返回值，其最终结果如下面的代码所示：

```js
const FunctionDeclNode = {
  type: 'FunctionDecl', // 标识该节点是函数声明
  // 函数名称是一个标识符，标识符本身也是一个节点
  id: {
    type: 'Identifier',
    name: 'render', // name 用来存储标识符的名称，在这里它就是渲染函数的名称 render
  },
  parmas: [], // 参数，目前渲染函数还不需要参数，所以这里是一个空数组
  // 渲染函数的函数体只有一个语句，即 return 语句
  body: [
    {
      type: 'ReturnStatement',
      return: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: 'h' },
        arguments: [
          // 第一个参数是字符串字面量 'div'
          {
            type: 'StringLiteral',
            value: 'div'
          },
          // 第二个参数是一个数组
          {
            type: 'ArrayExpression',
            elements: [
              // 数组的第一个元素是 h 函数的调用
              {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'h' },
                arguments: [
                  // 该 h 函数调用的第一个参数是字符串字面量
                  { type: 'StringLiteral', value: 'p' },
                  // 第二个参数也是一个字符串字面量
                  { type: 'StringLiteral', value: 'Vue' },
                ]
              },
                // 数组的第二个元素也是 h 函数的调用
                {
                  type: 'CallExpression',
                  callee: { type: 'Identifier', name: 'h' },
                  arguments: [
                    // 该 h 函数调用的第一个参数是字符串字面量
                    { type: 'StringLiteral', value: 'p' },
                    // 第二个参数也是一个字符串字面量
                    { type: 'StringLiteral', value: 'Template' },
                  ]
                }
            ]
          }
        ]
      }
    }
  ]
}
```

如上面这段 JavaScript AST 的代码所示，它是对渲染函数代码的完整描述。接下来我们的任务就是编写转换函数，将模板 AST 转换为上述 JavaScript AST。在开启之前，我们需要编写一些用来创建 JavaScript AST 节点的辅助函数。

```js
// 用来创建 StringLiteral 节点
function createStringLiteral(value) {
  return {
    type: 'StringLiteral',
    value
  }
}
// 用来创建 Identifier
function createIdentifier(name) {
  return {
    type: 'Identifier',
    name
  }
}
// 用来创建 ArrayExpression 节点
function createArrayExpression(elements) {
  return {
    type: 'ArrayExpression',
    elements
  }
}
// 用来创建 CallExpression 节点
function createCallExpression(callee, arguments) {
  return {
    type: 'CallExpression',
    callee: createIdentifier(callee),
    arguments
  }
}
```

有了这些辅助函数，我们可以更容易地编写转换代码。

为了把模板 AST 转换为 JavaScript AST，我们同样需要两个转换函数：`transformElement` 和 `transformText`，它们分别用来处理标签节点和文本节点。

```js
// 转换文本节点
function transformText(node) {
  // 如果不是文本节点，则什么都不做
  if (node.type !== 'Text') return
  // 文本节点对应的 JavaScript AST 节点其实就是一个字符串字面量，
  // 因此只需要使用 node.content 创建一个 StringLiteral 类型的节点即可
  // 最后将文本节点对应的 JavaScript AST 节点添加到 node.jsNode 属性下
  node.jsNode = createStringLiteral(node.content)
}
// 转换标签节点
function transformElement(node) {
  // 将转换代码编写在退出阶段的回调函数中
  // 这样可以保证该标签节点的子节点全部被处理完毕
  return () => {
    // 如果被转换的节点不是元素节点，则什么都不做
    if (node.type !== 'Element') {
      return
    }

    // 1. 创建 h 函数调用语句，
    // h 函数调用的第一个参数是标签名称，因此我们以 node.tag 来创建一个字符串字面量节点作为第一个参数
    const callExp = createCallExpression('h', [
      createStringLiteral(node.tag)
    ])
    // 2. 处理 h 函数调用的参数
    node.children.length === 1
      // 如果当前标签节点只有一个子节点，则直接使用子节点的 jsNode 作为参数
      ? callExp.arguments.push(node.children[0].jsNode)
      // 如果当前标签节点有多个子节点，则创建一个 ArrayExpression 节点作为参数
      : callExp.arguments.push(
        // 数组的每个元素都是子节点的 jsNode
        createArrayExpression(node.children.map(c => c.jsNode))
      )
    // 3. 将当前标签节点对应的 JavaScript AST 添加到 jsNode 属性下
    node.jsNode = callExp
  }
}
```

如上面的代码及注释所示，总体实现并不复杂。有两点需要注意：

* 在转换标签节点时，我们需要将转换逻辑编写在退出阶段的回调函数内，这样才能保证子节点全部被处理完毕；
* 无论是文本节点还是标签节点，它们转换后的 JavaScript AST 节点都存储在节点的 `node.jsNode` 属性下。

使用上面两个转换函数即可完成标签节点和文本节点的转换，即把模板转换成 h 函数的调用。但是，转换后得到的 AST 只是用来描述渲染函数 render 的返回值的，所以我们最后异步要做的就是，补全 JavaScript AST，即把用来描述 render 函数本身的函数声明语句节点附加到 JavaScript AST 中。这需要编写 `transformRoot` 函数来实现对 Root 根节点的转换：

```js
// 转换 Root 根节点
function transformRoot(node) {
  // 将逻辑编写在退出阶段的回调函数中，保证子节点全部被处理完毕
  return () => {
    // 如果不是根节点，则什么都不做
    if (node.type !== 'Root') return
    // node 是根节点，根节点的第一个子节点就是模板的根节点
    // 当然，这里我们暂时不考虑模板存在多个根节点的情况
    const vnodeJSAST = node.children[0].jsNode
    // 创建 render 函数的声明语句节点，将 vnodeJSAST 作为 render 函数体的返回语句
    node.jsNode = {
      type: 'FunctionDecl',
      id: { type: 'Identifier', name: 'render' },
      params: [],
      body: [
        {
          type: 'ReturnStatement',
          return: vnodeJSAST
        }
      ]
    }
  }
}
```

经过这一步处理之后，模板 AST 将转换为对应 JavaScript，并且可以通过根节点的 `node.jsNode` 来访问转换后的 `JavaScript AST`。

```js
const { parse } = require('../vue/compiler/parse')
const { transform } = require('../vue/compiler/transform')

function compiler(template) {
  // 模板 AST
  const ast = parse(template)
  // 将模板 AST 转换为 javaScript AST
  transform(ast)
}

compiler('<div><p>Vue</p><p>Template</p></div>')
```

#### 代码生成

上一节中，我们完成了 JavaScript AST 的构造。本节，我们将讨论如何根据 JavaScript AST 生成渲染函数的代码，即代码生成。代码生成的本质是字符串拼接的艺术。我们需要访问 JavaScript AST 中的节点，为每一种类型的节点生成相符的 JavaScript 代码。

本节，我们将实现 generate 函数来完成代码生成的任务。代码生成也是编译器的最后一步：

```js
const { parse } = require('../vue/compiler/parse')
const { transform } = require('../vue/compiler/transform')

function compiler(template) {
  // 模板 AST
  const ast = parse(template)
  // 将模板 AST 转换为 javaScript AST
  transform(ast)
  // 代码生成
  const code = genertae(ast.jsNode)
  return code
}

compiler('<div><p>Vue</p><p>Template</p></div>')
```

与 AST 转换一样，代码生也需要上下文对象。该上下文对象用来维护代码生过程中程序的运行状态。

```js
function genertae(node) {
  const context = {
    // 存储最终生成的渲染函数代码
    code: '',
    // 生成代码时，通过调用 push 函数完成代码拼接
    push(code) {
      context.code += code
    }
  }

  // 调用 genNode 函数完成代码生成工作
  genNode(node, context)

  // 返回渲染函数代码
  return context.code
}
```

在上面这段 generate 函数的代码中，首先我们定义了上下文对象 context，它包含了 `context.cod` 属性，用来存储最终生成的渲染函数代码，还定义了 `context.push` 函数，用来完成代码拼接，接着调用 `genNode` 函数完成代码的生成工作，最后将最终生成的渲染函数代码返回。

另外，我们希望最终生成的代码具有较强的可读性，因此我们应该考虑生成代码的格式，例如缩进和换行等。这就需要我们扩展 context 对象，为其增加用来完成换行和缩进的工具函数。

```js
function genertae(node) {
  const context = {
    // 存储最终生成的渲染函数代码
    code: '',
    // 生成代码时，通过调用 push 函数完成代码拼接
    push(code) {
      context.code += code
    },
    // 当前缩进级别，初始值为 0，即没有缩进
    currentIndent: 0,
    // 该函数用来换行，即在代码字符串的后买你追加 \n 字符
    // 另外，换行时应该保留缩进，所以我们还要追加 currentIdent * 2 个空格字符
    newLine() {
      context.code += '\n' + `  `.repeat(context.currentIndent)
    },
    // 用来缩进，即让 currentIdent 自增后，调用换行函数
    indent() {
      context.currentIndent++
      context.newLine()
    },
    // 取消缩进，即让 currentIdent 自减后，调用换行函数
    deIndent() {
      context.currentIndent--
      context.newLine()
    }
  }

  // 调用 genNode 函数完成代码生成工作
  genNode(node, context)

  // 返回渲染函数代码
  return context.code
}
```

在上面这段代码中，我们增加了 `context.currentIndent` 属性，它代表缩进的级别，初始值为 0，代表没有缩进，还增加了 `context.newLine()` 函数，每次调用该函数时，都会在代码字符串后面追加换行符 \n。由于换行时需要保留缩进，所以我们还要追加 `context.currentIdent * 2` 个空格字符。这里我们假设缩进为两个空格字符，后续我们可以将其设计为可配置的。同时，我们还增加了 `context.ident()` 函数用来完成代码缩进，它的原理很简单，即让缩进级别 `context.currentIdent` 进行自增，再调用 `context.newLine()` 函数。与之对应的 `context.deIndent()` 函数则用来取消缩进，既让缩进级别 `context.currentIndent` 进行自减，再调用 `context.newLine()` 函数。

有了这些基础能力之后，我们就可以开始编写 `genNode` 函数来完成代码生成的工作。代码生成的原理其实很简单，只需要匹配各种类型的 JavaScript AST 节点，并调用对应的生成函数即可。

```js
function genNode(node, context) {
  switch (node.type) {
    case 'FunctionDecl':
      genFunctionDecl(node, context)
      break;
    case 'ReturnStatement':
      genReturnStateMent(node, context)
      break;
    case 'CallExpression':
      genCallExpression(node, context)
      break;
    case 'StringLiteral':
      genStringLiteral(node, context)
      break;
    case 'ArrayExpression':
      genArrayExpression(node, context)
      break;
  }
}
```

在 `genNode` 函数内部，我们使用 switch 语句来匹配不同类型的节点，并调用与之对应的生成器函数。

* 对于 `FunctionDecl` 节点，使用 `genFunctionDecl` 函数为改类型节点生成对应的 JavaScript 代码；
* 对于 `ReturnStatement` 节点，使用 `genRturnStateMent` 函数为改类型节点生成对应的 JavaScript 代码；
* 对于 `CallExpression` 节点，使用 `genCallExpression` 函数为改类型节点生成对应的 JavaScript 代码；
* 对于 `StringLiteral` 节点，使用 `genStringLiteral` 函数为改类型节点生成对应的 JavaScript 代码；
* 对于 `ArrayExpression` 节点，使用 `genArrayExpression` 函数为改类型节点生成对应的 JavaScript 代码。

由于我们目前只涉及这五种类型的 JavaScript 节点，所以现在的 `genNode` 函数足够完成上述案例。如果后续需要增加节点类型，只需要在 `genNode` 函数中添加相应的处理分支即可。

接下来，我们将逐步完善代码生成工作。首先，我们来实现函数声明语句的代码生成，即 `genFunctionDecl` 函数。

```js
function genFunctionDecl(node, context) {
  // 从 context 对象中取出工具函数
  const { push, indent, deIndent } = context
  // node.id 是一个标识符，用来描述函数的名称，即 node.id.name
  push(`function ${node.id.name} `)
  push(`(`)
  // 调用 genNodeList 为函数的参数生成代码
  genNodeList(node.params, context)
  push(`) `)
  push(`{`)
  // 缩进
  indent()
  // 为函数体生成代码，递归地调用 genNode 函数
  node.body.forEach(n => genNode(n, context))
  // 取消缩进
  deIndent()
  push(`}`)
}
```

`genFunctionDecl` 函数用来为函数声明类型的节点生成对应的 JavaScript 代码。以渲染函数的声明节点为例，它最终生成的代码将会是：

```js
function render() {
  // ... 函数体
}
```

另外我们注意到，在 `genFunctionDecl` 函数内部调用了 `genNodeList` 函数来为函数的参数生成对应的代码。

```js
function genNodeList(nodes, context) {
  const { push } = context
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    genNode(node, context)
    if (i < nodes.length - 1) {
      push(', ')
    }
  }
}
```

`genNodeList` 函数接收一个节点数组作为参数，并为每一个节点递归地调用 `genNode` 函数完成代码生成工作。这里要注意的一点是，没处理完一个节点，需要在生成的代码后面拼接都好字符串（，）。

```js
// 如果节点数组为
const node = [节点1, 节点2, 节点3]
// 生成的代码类似于
// '节点1, 节点2, 节点3'
// 如果在这段代码的前后分别添加圆括号，那么它将可用于函数的参数声明
// ('节点1, 节点2, 节点3')
// 如果在这段代码的前后分别添加方括号，那么它将是一个数组
// ['节点1, 节点2, 节点3']
```

由上例可知，`genNodeList` 函数会在节点代码之间补充逗号字段。而 `genArrayExpression` 函数就利用了这个特点来实现对数组表达式的代码生成。

```js
function genArrayExpression(node, context) {
  const { push } = context
  // 追加方括号
  push('[')
  // 调用 genNodeList 为数组元素生成代码
  genNodeList(node.elements, context)
  // 补全方括号
  push(']')
}
```

不过，由于目前渲染函数暂时没有接收任何参数，所以 `genNodeList` 函数不会为其生成任何代码。对于 `genFunctionDecl` 函数，由于函数体本身也是一个节点数组，所以我们遍历它并递归地调用 `genNode` 函数生成代码。

对于 `ReturnStatement` 和 `StringLiteral` 类型的节点来说，为它们生成代码很简单。

```js
function genReturnStateMent(node, context) {
  const { push } = context
  // 追加 return 关键字和空格
  push(`return `)
  // 调用 genNode 函数递归生成返回值代码
  genNode(node.return, context)
}

function genStringLiteral(node, context) {
  const { push } = context
  // 对于字符串字面量，只需要追加与 node.value 对应的字符串即可
  push(`'${node.value}'`)
}
```

最后，只剩下 `genCallExpression` 函数。

```js
function genCallExpression(node, context) {
  const { push } = context
  // 取得被调用函数名称和参数列表
  const { callee, arguments: args } = node
  // 生成函数调用代码
  push(`${callee.name}(`)
  // 调用 genNodeList 生成参数代码
  genNodeList(args, context)
  // 补全括号
  push(`)`)
}
```

可以看到，在 `genCallExpression` 函数内，我们也用到了 `genNodeList` 函数来为函数调用时的参数生成对应的代码。配合上述生成器函数的实现，我们就可以得到符合预期的渲染函数代码。运行如下测试用例：

```js
function compiler(template) {
  const ast = parse(template)
  transform(ast)
  const code = genertae(ast.jsNode)
  return code
}

compiler('<div><p>Vue</p><p>Template</p></div>')
```

最终得到的代码字符串如下：

```js
function render () {
  return h('div', [h('p', 'Vue'), h('p', 'Template')])
}
```

#### 总结

本篇文章中，我们首先讨论了 Vue.js 模板编译器的工作流程。Vue.js 的模板编译器用于把模板编译为渲染函数。它的工作流程大致分为三个步骤。

* 解析模板，将其解析为模板 AST；
* 将模板 AST 转换为用于描述渲染函数的 JavaScript AST；
* 根据 JavaScript AST 生成渲染函数代码。

接着，我们讨论了 `parser` 的实现原理，以及如何使用有限状态自动机构造一个词法分析器。词法分析的过程就是状态机在不同状态之间迁移的过程。在此过程中，状态机会产生一个个 Token，形成一个 Token 列表。我们将使用该 Token 列表来构造用于描述模板的 AST。具体做法是，扫描 Token 列表并维护一个开始标签栈。没当扫描到一个开始标签节点，就将其压入栈顶。栈顶的节点始终作为下一个扫描的节点的父节点。这样，当所有 Token 扫描完毕后，即可构建出一棵树型 AST。

然后，我们讨论了 AST 的转换与插件化结构。AST 是树形结构，为了访问 AST 中的节点，我们采用深度优先的方式对 AST 进行遍历。在遍历过程中，我们可以对 AST 节点进行各种操作，从而实现对 AST 的转换。为了解耦节点的访问和操作，我们设计了插件化结构，将节点的操作封装到独立的转换函数中。这些转换函数可以通过 `context.nodeTransforms` 来注册。这里的 `context` 称为转换上下文。上下文对象中通常会维护程序的当前状态，例如当前访问的节点、当前访问的节点的父节点、当前访问的节点的位置索引等信息。有了上下文对象及其包含的重要信息后，我们即可轻松地实现节点的替换、删除等能力。但有时，当前访问节点的转换工作依赖于其子节点的转换结果，所以为了优先完成子节点的转换，我们将整个转换过程分为 "进入阶段" 与 “退出阶段”。每个转换函数都分为两个阶段执行，这样就可以实现更加细粒度的转换控制。

之后，我们讨论了如何将模板 AST 转换为用于描述渲染函数的 JavaScript AST。模板 AST 用来描述模板，类似地，JavaScript AST 用于描述 JavaScript 代码，只有把模板 AST 转换为 JavaScript AST 后，我们才能据此生成最重的渲染函数代码。

最后，我们讨论了渲染函数代码的生成工作。代码生成是只模板编译器的最后一步工作，生成的代码将作为组件的渲染函数。代码生成的过程就是字符串拼接的过程。我们需要为不同的 AST 节点编写对应的代码生成函数。为了让生成的代码具有更强的可读性，我们还讨论了如何对生成的代码进行缩进和换行。我们将用于缩进和换行的代码封装为工具函数，并且定义到代码生成过程中的上下文对象中。

### 解析器

我们初步讨论了解析器（parser）的工作原理，知道了解析器本质是一个状态机。但我们也曾提到，正则表达式其实也是一个状态机。因此在编写 `parser` 的时候，利用正则表达式能够让我们少写不少代码。本篇文章我们将更多地利用正则表达式来实现 HTML 解析器。

一个完善的 HTML 解析器远比想象中复杂。我们知道，浏览器会对 HTML 文本进行解析，那么它是如何做的呢？其实关于 HTML 文本的解析，是由规范可循的，即 `WHATWG` 关于 HTML 的解析规范，其中定义了完整的错误处理和状态机的状态迁移流程，还提及了一些特殊的状态，例如 `DATA`、`CDATA`、`RCDATA`、`RAWTEXT` 等。那么，这些状态有什么含义呢？它们对解析器有哪些影响呢？什么是 HTML 实体，以及 Vue.js 模板解析器需要如何处理 HTML 实体呢？

#### 文本模式

文本模式指的是解析器在工作时所进入的一些特殊状态，在不同的特殊状态下，解析器对文本的解析行为会有所不同。具体来说，当解析器遇到一些特殊标签时，会切换模式，从而影响其对文本的解析行为。这些特殊标签是：

* `<title>` 标签、`<textarea>` 标签，当解析器遇到这两个标签时，会切换到 `RCDATA` 模式；
* `<style>`、`<xmp>`、`<iframe>`、`<noembed>`、`noframes>`、`<noscript>` 等标签，当解析器遇到这些标签时，会切换到 `RAWTEXT` 模式；
* 当解析器遇到 `<![CDATA[` 字符串时，会进入 `CDATA` 模式。

解析器的初始模式是 DATA 模式。对于 Vue.js 的模板 DSL 来说，模板中不允许出现 `<script>` 标签，因此 Vue.js 模板解析器在遇到 `<script>` 标签时也会切换到 `RAWTEXT` 模式。

解析器的行为会因工作模式的不同而不同。`WAHTWG` 规范的第 13.2.5.1 节给出了初始模式下解析器的过程流程。

> https://html.spec.whatwg.org/multipage/parsing.html#data-state

<img src="./images/parser01.png" />

在默认的 `DATA` 模式下，解析器在遇到字符 < 时，会切换到`标签开始状态（tag open state）`。换句话说，在该模式下，解析器能够解析标签元素。当解析器遇到字符 `&` 时，会切换到`字符引用状态（character reference state）`，也称 HTML 字符实体状态。也就是说，在 `DATA` 模式下，解析器能够处理 HTML 字符实体。

我们再来看看当解析器处理 `RCDATA` 状态时，它的工作状态如何。

<img src="./images/parser02.png" />

由图可知，当解析器遇到字符 < 时，不会切换到标签开始状态，而回切换到 `RCDATA less-than sign state` 状态。下图给出了 `RCDATA less-than sign state` 状态下解析器的工作方式。

<img src="./images/parser03.png" />

由图可知 `RCDATA less-than sign state` 状态下，如果解析器遇到字符 /，则直接切换到到 `RCDATA` 的结束标签状态，即 `RCDATA end tag open state` 。否则会将当前字符 < 作为普通字符处理，然后继续处理后面的字符。由此可以，在 `RCDATA` 状态下，解析器不能识别标签元素，这其实间接说明了在 `<textarea>` 内可以将字符 < 作为普通文本，解析器并不会认为字符 < 是标签开始的标志。

```html
<textarea>
	<div>asdf</div>asdfasdf
</textarea>
```

在上面这段 HTML代码中，`<textarea>` 标签内存在一个 `<div>` 标签。但解析器并不会把 `<div>` 解析为标签元素，而是作为普通文本处理。但是，由 `13.2.5.2 RCDATA state` 可知，在 `RCDATA` 模式下，解析器仍然支持 HTML 实体。因为当解析器遇到字符 & 时，会切换到字符引用状态。如下面的代码所示：

```html
<textarea>&copy;</textarea>
```

浏览器在渲染器这段 HTML 代码时，会在文本框内展示字符 `©`。

解析在 `RAWTEXT` 模式下的工作方式与在 `RCDATA` 模式下类似。唯一不同的是，在 `RAWTEXT` 模式下，解析器将不再支持 HTML 实体。下图给出了 `WAHTWG` 规范中第 `13.2.5.3` 节中所定义的 `RAWTEXT` 模式下状态机的工作方式。

<img src="./images/parser04.png" />

对比 `13.2.5.3 RAWTEXT state` 和 `13.2.5.2 RCDATA state` 可知，`RAWTEXT` 模式的确不支持 HTML 实体。在该模式下，解析器会将 HTML 尸体字符作为普通字符串处理。Vue.js 的单文件组件的解析器在遇到 `<script>` 标签时就会进入 `RAWTEXT` 模式，这时他会把 `<script>` 标签内的内容全部作为普通文本处理。

`CDATA` 模式在 `RAWTEXT` 模式的基础上更进一步。下图给出了 `WHATWG` 规范第 `13.2.5.69` 节中所定义的 `CDATA` 模式下状态机的工作方式。

<img src="./images/parser05.png" />

在 `CDATA` 模式下，解析器会把任何字符都作为普通字符处理，直到遇到 `CDATA` 的结束标志为止。

实际上，在 `WHATWG` 规范中还定义了 `PLAINTEXT` 模式，该模式与 `RAWTEXT` 模式类似。不同的是，解析器一旦进入 `PLAINTEXT` 模式，将不会再退出。另外，Vue.js 的模板 DSL 解析器是用不到 `PLAINTEXT` 模式的，因此我们也不会过多介绍它。

下图汇总了不同的模式及各自的特性。

| 模式    | 能否解析标签 | 是否支持 HTML 实体 |
| ------- | ------------ | ------------------ |
| DATA    | 能           | 是                 |
| RCDATA  | 否           | 是                 |
| RAWTEXT | 否           | 否                 |
| CDATA   | 否           | 否                 |

除了表中列出的特性之外，不同的模式还会影响解析器对于终止解析的判断，后面会继续讨论。另外，后续编写解析器代码时，我们会将上述模式定义为状态表。

```js
const TextModes = {
  DATA: 'DATA',
  RCDATA: 'RCDATA',
  RAETEXT: 'RAETEXT',
  CDATA: 'CDATA'
}
```

#### 递归下降算法构造模板 AST

> 递归下降分析法是确定的自上而下分析法，这种分析法要求文法是LL(1)文法。 为每个非终结符编制一个递归下降分析函数，每个函数名是相应的非终结符，函数体则是根据规则右部符号串的结构和顺序编写。 子程序相互递归调用。

从本节开始，我们将着手实现一个更加完善的模板解析器。解析器的基本架构模型如下：

```js
// 定义文本模式，作为状态表
const TextModes = {
  DATA: 'DATA',
  RCDATA: 'RCDATA',
  RAETEXT: 'RAETEXT',
  CDATA: 'CDATA'
}

// 解析器函数，接收模板作为参数
function parse(str) {
  // 定义上下文对象
  const context = {
    // source 是模板内容，用于解析过程中进行消费
    source: str,
    // 解析器当前处于文本模式，初始模式为 DATA
    mode: TextModes.DATA
  }
  // 调用 parseChildren 函数开始解析，它返回解析后得到的子节点
  // parseChildren 函数接收两个参数
  // 第一个参数是上下文对象 context
  // 第二个参数是由父代节点构成的节点栈，初始时栈为空
  const nodes = parseChildren(context, [])

  // 解析器返回 Root 根节点
  return {
    type: 'Root',
    // 使用 nodes 作为根节点的 children
    children: nodes
  }
}
```

上面这段代码中，我们首先定义了一个状态表 `TextModes`，它用来描述预定义的文本模式。然后，我们定义了 parse 函数，即解析器函数，在其中定义了上下文对象 `context`，用来维护解析程序执行程序中的各种状态。接着，调用 `parseChildren` 函数进行解析，该函数会返回解析后得到的子节点，并使用这些子节点作为 `children` 来创建 Root 根节点。最后，parse 函数返回根节点，完成模板 AST 的构建。

这段代码的思路与我们[之前讲述的](https://www.yueluo.club/detail?articleId=62bce6f0397c3e0980cc9649#parser__151)关于模板 AST 的构建思路有所不同。在之前的代码中，我们首先对模板内容进行标记化得到一系列 Token，然后根据这些 Token 构建模板 AST。实际上，创建 Token 与构造模板 AST 的过程可以同时进行，因为模板和模板 AST 具有同构特性。

另外，在上面这段代码中，`parseChildren` 函数是整个解析器的核心。后续我们会递归地调用它来不断地消费模板内容。`parseChildren` 函数会返回解析后得到的子节点。假设有如下模板。

```html
<p>1</p>
<p>2</p>
```

上面这段模板有两个根节点，即两个 `<p>` 标签。`parseChildren` 函数在解析这段模板后，会得到由这两个 `<p>` 节点组成的数组：

```js
[
  { type: 'Element', tag: 'p', children: [/*...*/] },
  { type: 'Element', tag: 'p', children: [/*...*/] },
]
```

之后，这个数组将作为 Root 根节点的 children。

* 第一个参数：上下文对象 context；
* 第二个参数：由父代节点构成的栈，用于维护节点间的父子级关系。

`parseChildren` 函数本质也是一个状态机，该状态机有多少种状态取决于子节点的类型数量。在模板中，元素的子节点可以是以下几种：

* 标签节点，例如 `<div>`。
* 文本插值节点，例如 `{{ val }}`。
* 普通文本节点，例如：text。
* 注释节点，例如 `<!---->`。
* `CDATA` 节点，例如 `<![CDATA[ xxx ]]>` 。

在标准的 HTML 中，节点的类型将会更多，例如 `DOCTYPE` 节点等。为了降低复杂度，我们仅考虑上述类型的节点。

<img src="./images/parser06.png" />

我们可以把上图展示的状态迁移过程总结如下：

* 当遇到 < 时，进行临时状态
  * 如果下一个字符匹配正则 `/a-z/i`，则认为是一个标签节点，于是调用 `parseElement` 函数完成标签解析。注意正则表达式 `/a-z/i` 中的 i，这里是忽略大小写（case-insensitive）。
  * 如果字符串以 `<!--` 开头，则认为是一个注释节点，于是调用 `parseComment` 函数完成注释节点的界限。
  * 如果字符串以 `<![CDATA[` 开头，则认为这是一个 `CDATA` 节点，于是调用 `parseCDATA` 函数完成 `CDATA` 节点的解析。
* 如果字符串以 `{{` 开头，则认为这是一个插值节点，于是调用 `parseInterpolation` 函数完成插值节点的解析。
* 其他情况，都作为普通文本，调用 `parseText` 函数完成文本节点的解析。

```js
function parseChildren(context, ancestors) {
  // 定义 nodes 数组存储子节点，它将作为最终的返回值
  let nodes = []
  // 从上下文对象中取得当前状态，包括模式 mode 和模板内容 source
  const { mode, source } = context

  // 开始 while 循环，只要满足条件就会一直对字符串进行解析
  while (!isEnd(context, ancestors)) {
    let node
    // 只有 DATA 模式和 RCDATA 模式才支持插值节点的解析
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      // 只有 DATA 模式才支持标签节点的解析
      if (mode === TextModes.DATA && source[0] === '<') {
        if (source[1] === '!') {
          if (source.startsWith('<!--')) {
            // 注释
            node = parseComment(context)
          } else if (source.startsWith('<![CDATA[')) {
            // CDATA
            node = parseCDATA(context, ancestors)
          }
        } else if (source[1] === '/') {
          // 结束标签，这里需要抛出错误
        } else if (/[a-z]/i.test(source[1])) {
          // 标签
          node = parseElement(context, ancestors)
        }
      } else if (source.startsWith('{{')) {
        // 解析插值
        node = parseInterpolation(context)
      }
    }

    // node 不存在，说明处理其他模式，即非 DATA 模式且非 RCDATA 模式
    // 这时一切内容作为文本处理
    if (!node) {
      // 解析文本节点
      node = parseText(context)
    }

    // 将节点添加到 nodes 数组中
    nodes.push(node)
  }

  // 当 while 循环停止后，说明子节点解析完毕，返回子节点
  return nodes
}
```

上面这段代码完整地描述了图中所示的状态迁移过程，这里有几点需要注意。

* `parseChildren` 函数的返回值是由子节点组成的数组，每次 while 循环都会解析一个或多个节点，这些节点会被添加到 nodes 数组中，并作为 `parseChildren` 函数的返回值返回；
* 解析过程中需要判断当前的文本模式。只有处于 `DATA` 模式或 `RCDATA` 模式时，解析器才会支持插值节点的解析。并且，只有处于 DATA 模式时，解析器才支持标签节点、注释节点和 `CDATA` 节点的解析。

| 模式    | 能否解析标签 | 是否支持 HTML 实体 |
| ------- | ------------ | ------------------ |
| DATA    | 能           | 是                 |
| RCDATA  | 否           | 是                 |
| RAWTEXT | 否           | 否                 |
| CDATA   | 否           | 否                 |

* 当遇到特定标签时，解析器会切换模式。一旦解析器切换到 `DATA` 模式和 `RCDATA` 模式之外的模式时，一切字符都将作为文本节点被解析。当然，即使在 `DATA` 模式或 `RCDATA` 模式下，如果无法匹配标签节点、注释节点、`CDATA` 节点、插值节点，那么也会作为文本节点解析。

你可能对这段代码仍然有疑问，例如 while 循环何时停止？`isEnd` 函数的作用是什么？这里给出简单解释，`parseChildren` 函数是用来解析子节点的，因为 `while` 循环一定要遇到父级节点的结束标签才会停止，这是正常的思路。

我们可以通过一个例子来更加直观地了解 `parseChildren` 函数，以及其他解析函数在解析模板时的工作职责和工作流程。

```js
const template = `<div>
  <p>Text1</>
  <p>Text2</>
</div>`
```

这里需要强调的是，在解析模板时，我们不能会忽略空白字符。这些空白字符包括：换行符(`\n`)，回车符(`\r`)，空格(`''`)，制表符(`\t`)以及换页符(`\f`)。如果我们用加号 (`+`) 代表换行符，用减号 (`-`) 代表空格字符。那么上面的模板可以表示为。

```js
const template = `<div>+--<p>Text1</p>+--<p>Text2</p>+</div>`
```

接下来，我们以这段模板作为输入来执行解析过程。

解析器一开始处于 `DATA` 模式。开始执行解析后，解析器遇到的第一个字符为 `<`，并且第二个字符能够匹配正则表达式 `/a-z/i`，所以解析器会进入标签节点状态，并调用 `parseElement` 函数进行解析。

`parseElement` 函数会做三件事：解析开始标签、解析子节点、解析结束标签。

```js
function parseElement() {
  // 解析开始标签
  const element = parseTag()
  // 递归调用 parseChildren 函数进行 <div> 标签子节点的解析
  element.children = parseChildren()
  // 解析结束标签
  parseEndTag()

  return element
}
```

如果一个标签不是闭合标签，则可以认为，一个完整的标签元素是由开始标签、子节点和结束标签这三部分构成的。因此，在 `parseElement` 函数内，我们分别调用三个解析函数来处理这三部分内容。

* `parseTag` 解析开始标签。`parseTag` 函数用于解析开始标签，包括开始标签上的属性和指令。因此，在 `parseTag` 解析函数执行完毕后，会消费字符串中的内容 `<div>`，处理后的模板内容将变为：

  ```js
  const template = `+--<p>Text1</p>+--<p>Text2</p>+</div>`
  ```

* 递归地调用 `parseChildren` 函数解析子节点。`parseElement` 函数在解析开始标签时，会产生一个标签节点 `element`。在 `parseElement` 函数执行完毕后，剩下的模板内容应该作为 `element` 的子节点被解析，即 `element.children`。因此，我们要递归地调用 `parseChildren` 函数。在这个过程中，`parseChildren` 函数会消费字符串中的内容：`+--<p>Text1</p>+--<p>Text2</p>+`。处理后的模板内容将变为：

  ```js
  const template = `</div>`
  ```

* `parseEngTag` 处理结束标签。在经过 `parseChildren` 函数处理后，模板内容只剩下一个结束标签。因此，只需要调用 `parseEndTag` 解析函数来消费它即可。

经过这三个步骤的处理后，这段模板就被解析完毕了，最终得到模板 AST。但这里值得注意的是，为了解析标签的子节点，我们递归地调用了 `parseChildren` 函数。这意味着，一个新的状态机开始运行，我们可以将其称之为 "状态机2"。"状态机2" 所处理的模板内容为：

```js
const template = `+--<p>Text1</p>+--<p>Text2</p>+`
```

接下来，我们解析分析 “状态机2”  的状态迁移过程。在 "状态机2" 开始运行时，模板的第一个字符是换行符（字符+ 代表换行符）。因此，解析器会进入文本节点状态，并调用 `parseText` 函数完成文本节点的解析。`parseText` 函数会将下一个 `<` 字符之前的所有字符都视为文本节点内容的内容。 `parseText` 会消费模板内容 `+--`，并产生一个文本节点。在 `parseText` 解析函数执行完毕后，剩下的模板内容为：

```js
const template = `<p>Text1</p>+--<p>Text2</p>+`
```

接着，`parseChildren` 函数继续执行。此时模板的第一个字符为 `<`，并且下一个字符能够匹配正则 `/a-z/i`。于是解析器再次进入 `parseElement` 解析函数的执行阶段，这会消费模板内容 `<p>Text1</p>`。这一步过后，剩下的模板内容为：

```js
const template = `+--<p>Text2</p>+`
```

可以看到，此时模板的第一个字符是换行符，于是调用 `parseText` 函数消费模板内容 `+--`。现在，模板中剩下的内容是：

```js
const template = `<p>Text2</p>+`
```

解析器会再次调用 `parseElement` 函数处理标签节点。在这之后，剩下的模板内容为：

```js
const template = `+`
```

可以看到，现在模板内容只剩下一个换行符。`parseChildren` 函数会继续执行并调用 `parseText` 函数消费剩下的内容，并产生一个文本节点。最终，模板被解析完毕，“状态机2” 停止运行。

在 “状态机2” 运行期间，为了处理标签节点，我们又调用了两次 `parseElement` 函数。第一次调用用于处理内容 `<p>Text1</p>`，第二次调用用于处理内容 `<p>Text2</p>`。我们知道，`parseElement` 函数会递归地调用 `parseChildren` 函数完成子节点的解析，这就意味着解析器会再开启两个新的状态机。

通过上述例子我们能够认识到，`parseChildren` 解析函数是整个状态机的核心，状态迁移操作都在该函数内完成。在 `parseChildren` 函数运行过程中，为了处理标签节点，会调用 `parseElement` 解析函数，这会间接地调用 `parseChildren` 函数，并产生一个新的状态机。随着标签嵌套层次的增加，新的状态机会随着 `parseChildren` 函数被递归地调用而不断创建，这就是 "递归下降" 中 “递归” 二字的含义。而上级 `parseChildren` 函数的调用用于构造上级模板 `AST` 节点，被递归调用的下级 `parseChildren` 函数则用于构造下级模板 AST 节点。最终，会构造出一棵树形结构的模板 AST，这就是 "递归下降" 中 “下降” 二字的含义。

#### 状态机的开启与停止

我们已经讨论了递归下降算法的含义。`parseChildren` 函数本质上是一个状态机，它会开启一个 while 循环使得状态机自动运行。

```js
function parseChildren(context, ancestors) {
  // 定义 nodes 数组存储子节点，它将作为最终的返回值
  let nodes = []
  // 从上下文对象中取得当前状态，包括模式 mode 和模板内容 source
  const { mode, source } = context

  // 开始 while 循环，只要满足条件就会一直对字符串进行解析
  while (!isEnd(context, ancestors)) {
		// ...
  }

  // 当 while 循环停止后，说明子节点解析完毕，返回子节点
  return nodes
}
```

这里的问题在于，while 玄幻应该何时停止运行？这涉及到 `isEnd()` 函数的判断逻辑。为了搞清楚这个问题，我们需要模拟状态机的运行过程。

我们知道，在调用 `parseElement` 函数解析标签节点时，会递归地的调用 `parseChildren` 函数，从而开启新的状态机。

<img src="./images/parser07.png" />

为了便于描述，我们可以把图中所示的新的状态机称为 “状态机1”。“状态机1” 开始运行，继续解析模板，直到遇到下一个 `<p>` 标签。

<img src="./images/parser08.png" />

因为遇到 `<p>` 标签，所以 “状态机1” 也会调用 `parseElement` 函数进行解析。于是有重复上述过程，即把当前解析的标签节点压入父级节点栈，然后递归地调用 `parseChildren` 函数开启新的状态机，即 "状态机2“。可以看到，此时有两个状态机在同时运行。

此时 ”状态机2“ 拥有程序执行权，它持续解析模板知道遇到结束标签 `</p>` 。因为这是一个结束标签，并且在父级节点中存在与该结束标签同名的标签节点，所以 ”状态机2“ 会停止运行，并弹出父级节点栈中处于栈顶的节点。

<img src="./images/parser09.png" />

此时 “状态机2” 已经停止运行，“状态机1” 继续工作。于是回解析解析模板，直到遇到下一个 `<p>` 标签。这是 "状态机1" 会再次调用 `parseElement` 函数解析标签节点，因此又会执行压栈并开启新的 “状态机3”。

<img src="./images/parser10.png" />

此时 “状态机3” 拥有程序的执行权，它会继续解析模板，直到遇到结束标签 `</p>`。因为这是一个结束标签，并且在父级节点栈中存在与该结束标签同名的标签节点，所以 “状态机3” 会停止运行，并弹出父级节点栈中处于栈顶的节点。

<img src="./images/parser11.png" />

当 “状态机3” 停止运行后，程序的执行权会交还给 “状态机1”。“状态机1” 会继续解析模板，直到遇到最后的 `</div>` 结束标签。这时 “状态机1” 会发现节点栈中存在与结束标签同名的标签节点，于是将该节点弹出父级节点栈，并停止运行。

<img src="./images/parser12.png" />

这时父级节点栈为空，状态机全部停止运行，模板解析完毕。

通过上面的描述，我们能够清晰地认识到，解析器会在何时开启新的状态机，以及状态机会在何时停止。结论是：当解析器遇到开始标签时，会将该标签压入父级节点栈中，同时开启新的状态机。当解析器遇到结束标签，并且父级节点栈中存在与该标签同名的开始标签节点时，会停止当前正在运行的状态机。根据上述规则，我们可以给出 `isEnd` 函数的逻辑。

```js
function isEnd(context, ancestors) {
  // 当模板内容解析完毕后，停止
  if (!context.source) return true
  // 获取父级标签节点
  const parent = ancestors[ancestors.length - 1]
  // 如果遇到结束标签，并且该标签与父级标签节点同名，则停止
  if (parent && context.source.startsWith(`</${parent.tag}`)) {
    return true
  }
}
```

上面这段代码展示了状态机的停止时机：

* 第一个停止时是当模板内容被解析完毕时；
* 第二个停止时机则是在遇到结束标签时，这时解析器会取得父级节点栈栈顶的节点作为父节点，检查该结束标签是否与父节点的标签同名，如果相同，则状态机停止运行。

这里需要注意的是，在第二个停止时机中，我们直接比较结束标签的名称与栈顶节点的标签名称。这么做确实可行，但严格来说也是有问题的。例如下面的模板所示：

```html
<div><span></div></span>
```

观察上述模板，它存在一个明显的问题。这段模板有两种解释方式，下图给出了第一种。

<img src="./images/parser13.png" />

这种解释方式的流程如下：

* “状态机1'' 遇到 `<div>` 开始标签，调用 `parseElement` 解析函数，这会开启 ”状态机 2“ 来完成子节点的解析。
* ”状态机2“ 遇到 `<span>` 开始标签，调用 `parseElement` 解析函数，这回开启 "状态机3" 来完成子节点的解析。
* "状态机3" 遇到 `</div>` 结束标签。由于此时父级节点栈顶的节点名称是 `span`，并不是 `div`，所以 `状态机3` 不会停止运行。这时，"状态机3" 遇到了不符合预期的状态，因为结束标签 `</div>` 缺少与之对应的开始标签，所以这时 "状态3" 会抛出错误：”无效的结束标签“。

上述流程的思路与我们当前的实现相符，状态机会遭遇不符合预期的状态。`parseChildren` 函数的代码可以体现这一点。

```js
function parseChildren(context, ancestors) {
  // 定义 nodes 数组存储子节点，它将作为最终的返回值
  let nodes = []
  // 从上下文对象中取得当前状态，包括模式 mode 和模板内容 source
  const { mode, source } = context

  // 开始 while 循环，只要满足条件就会一直对字符串进行解析
  while (!isEnd(context, ancestors)) {
    let node
    // 只有 DATA 模式和 RCDATA 模式才支持插值节点的解析
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      // 只有 DATA 模式才支持标签节点的解析
      if (mode === TextModes.DATA && source[0] === '<') {
        if (source[1] === '!') {
          if (source.startsWith('<!--')) {
            // 注释
            node = parseComment(context)
          } else if (source.startsWith('<![CDATA[')) {
            // CDATA
            node = parseCDATA(context, ancestors)
          }
        } else if (source[1] === '/') {
          // 结束标签，这里需要抛出错误
          console.error('无效的结束标签')
          continue
        } else if (/[a-z]/i.test(source[1])) {
          // 标签
          node = parseElement(context, ancestors)
        }
      } else if (source.startsWith('{{')) {
        // 解析插值
        node = parseInterpolation(context)
      }
    }
		
    // ...
  }

  // 当 while 循环停止后，说明子节点解析完毕，返回子节点
  return nodes
}
```

换句话来说，按照我们当前的实现思路来解析上述例子中的模板，最终得到的错误信息是：“无效的结束标签”。但其实还有另外一个更好的解析方式。观察上例中给出的模板，其实存在一段完整的内容。

<img src="./images/parser14.png" />

从图中可以看到，模板中存在一段完整的内容，我们希望解析器可以正常对其进行解析，这很可能也是符合用户意图的。但实际上，无论是哪一种解析方式，对程序的影响都不大。两者的区别体现在错误处理上。对于第一种解析方式，我们得到的错误信息是：“无效的结束标签”。而对于第二种解析方式，在 “完整的内容” 部分被解析完毕后，解析器就会打印错误信息，“`<span>`标签缺少闭合标签” 。很显然，第二种解析方式更加合理。

为了实现第二种解析方式，我们需要调整 `isEnd` 函数的逻辑。当判断状态机是否应该停止时，我们不应该总是与栈顶的父级节点做比较，而是应该与整个父级节点栈的的所有节点做比较。只要父级节点栈中存在与当前遇到的结束标签同名的节点，就停止状态机。

```js
function isEnd(context, ancestors) {
  // 当模板内容解析完毕后，停止
  if (!context.source) return true

  // 与父级节点栈中所有节点比较
  for (let i = ancestors.length - 1; i >= 0; --i) {
    // 只要栈中存在与当前结束标签同名的节点，就停止状态机
    if (context.source.startsWith(`</${ancestors[i].tag}`)) {
      return true
    }
  }
}
```

按照新的思路再次对以下模板进行解析：

```html
<div><span></div></span>
```

其流程如下：

* ”状态机1“ 遇到 `<div>` 开始标签，调用 `parseElement` 解析函数，并开启 "状态机2" 解析子节点。
* "状态机2" 遇到 `<span>` 开始标签，调用 `parseElement` 解析函数，并开启 "状态机3" 解析子节点。
* ”状态机3“ 遇到 `</div>` 结束标签，由于节点栈中存在名为 `div` 的标签节点，于是 ”状态机3“ 停止了。

在这个过程中，”状态机2“ 在调用 `parseElement` 解析函数时，`parseElement` 函数能够发现 `<span>` 缺少闭合标签，于是会打印错误信息 ”`<span>` 标签缺少闭合标签 “。

```js

function parseElement(context, ancestors) {
  // 解析开始标签
  const element = parseTag(context)
  if (element.isSelfClosing) return element

  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (context.source.startsWith(`</${element.tag}`)) {
    parseTag(context, 'end')
  } else {
    // 缺少闭合标签
    console.log(`${element.tag} 标签缺少闭合标签`)
  }

  return element
}
```

#### 解析标签节点

在上一节给出的 `parseElement` 函数的实现中，无论是解析开始标签还是闭合标签，我们都调用了 `parseTag` 函数。同时，我们使用 `parseChildren` 函数来解析开始标签和闭合标签中间的部分。

```js
function parseElement(context, ancestors) {
  // 解析开始标签
  const element = parseTag(context)
  if (element.isSelfClosing) return element

  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (context.source.startsWith(`</${element.tag}`)) {
    parseTag(context, 'end')
  } else {
    // 缺少闭合标签
    console.log(`${element.tag} 标签缺少闭合标签`)
  }

  return element
}
```

标签节点的整个解析过程如图所示：

<img src="./images/parser15.png" />

这里需要注意的是，由于开始标签与结束标签的格式非常类似，所以我们统一使用 `parseTag` 函数处理，并通过该函数的第二个参数来指定具体的处理类型。当第二个参数值为字符串 'end' 时，意外这解析的是结束标签。另外，无论处理的是开始标签还是结束标签，`parseTag` 函数都会消费对应的内容。为了实现对模板内容的消费，我们需要在上下文对象中新增两个工具函数。

```js
function parse(str) {
  // 定义上下文对象
  const context = {
    // source 是模板内容，用于解析过程中进行消费
    source: str,
    // 解析器当前处于文本模式，初始模式为 DATA
    mode: TextModes.DATA,
    // advanceBy 函数用来消费指定数量的字符，它接收一个数字作为参数
    advanceBy(num) {
      // 根据给定字符数 num，截取位置 num 后的模板内容，并替换模板内容
      context.source = context.source.slice(num)
    },
    // 无论是开始标签还是结束标签，都有可能存在无用的空白字符，例如 <div   >
    advanceSpaces() {
      // 匹配空白字符
      const match = /^[\t\r\n\f ]+/.exec(context.source)
      if (match) {
        // 调用 advanceBy 函数消费空白字符
        context.advanceBy(match[0].length)
      }
    }
  }

  // 调用 parseChildren 函数开始解析，它返回解析后得到的子节点
  // parseChildren 函数接收两个参数
  // 第一个参数是上下文对象 context
  // 第二个参数是由父代节点构成的节点栈，初始时栈为空
  const nodes = parseChildren(context, [])

  // 解析器返回 Root 根节点
  return {
    type: 'Root',
    // 使用 nodes 作为根节点的 children
    children: nodes
  }
}
```

在上面这段代码中，我们为上下文对象增加了 `advanceBy` 函数和 `advanceSpace` 函数。其中 `advanceBy` 函数用来消费指定数量的字符串。其实现原理很简单，即调用字符串的 `slice` 函数，根据指定位置截取剩余字符串，并使用截取后的结果作为新的模板内容。`advanceSpaces` 函数则用来消费无用的空白字符，因为标签中可能存在空白字符，例如在模板 `<div--->` 中减号（-）代表空白字符。

有了 `advanceBy` 和 `advanceSpaces` 函数后，我们就可以给出 `parseTag` 函数的实现了。

```js
// 由于 parseTag 既用来处理开始标签，也用来处理结束标签，因为我们设计第二个参数 type
// 用来代表当前处理的是开始标签还是结束标签，type 的默认值为 'start'，即默认作为开始标签处理
function parseTag(context, type = 'start') {
  // 从上下文对象中拿到 advanceBy 函数
  const { advanceBy, advanceSpaces } = context

  // 处理开始标签和结束标签的正则表达式不同
  const match = type === 'start'
    // 匹配开始标签
    ? /^<([a-z][^\t\r\n\f />]*)/i.exec(context.source)
    // 匹配结束标签
    : /^<\/([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  // 匹配成功后，正则表达式的第一个捕获组的值就是标签名称
  const tag = match[1]
  // 消费正则表达式匹配的全部内容，例如 '<div' 这段内容
  advanceBy(match[0].length)
  // 消费标签中无用的开白字符
  advanceSpaces()

  // 在消费匹配的内容后，如果字符串以 '/>' 开头，则说明这是一个自闭合标签
  const isSelfClosing = context.source.startsWith('/>')
  // 如果是自闭和标签，则消费 '/>'，否则消费 '>'
  advanceBy(isSelfClosing ? 2 : 1)

  // 返回标签节点
  return {
    type: 'Element',
    // 标签名称
    tag,
    // 标签的属性暂时留空
    props: [],
    // 子节点留空
    children: [],
    // 是否自闭合
    isSelfClosing
  }
}
```

上面这段代码有两个关键点。

* 由于 `parseTag` 函数即用来解析开始标签，又用来解析结束标签，因此需要一个参数来标识当前处理的标签类型，即 type。
* 对于开始标签和结束标签，用于匹配它们的正则表达式只有一点不同：结束标签是以字符串 `</` 开头的。

下图给出了用于匹配开始标签的正则表达式的含义。

<img src="./images/parser16.png" />

下面给出了几个使用图中正则来匹配的开始标签的例子。

* 对于字符串 '`<div>`' ，会匹配出字符串 '`<div`'，剩余 '`>`'。
* 对于字符串 '`<div/>`' ，会匹配出字符串 '`<div`'，剩余 '`/>`'。
* 对于字符串 '`<div---->`' ，其中减号(-) 代表空白字符，会匹配出字符串 '`<div`'，剩余 '`---->`'。

```js
console.log(/^<([a-z][^\t\r\n\f />]*)/i.exec('<div>'))
// [ '<div', 'div', index: 0, input: '<div>', groups: undefined ]
console.log(/^<([a-z][^\t\r\n\f />]*)/i.exec('<div/>'))
// [ '<div', 'div', index: 0, input: '<div/>', groups: undefined ]
console.log(/^<([a-z][^\t\r\n\f />]*)/i.exec('<div    >'))
// [ '<div', 'div', index: 0, input: '<div    >', groups: undefined ]
```

除了正则表达式外，`parseTag` 函数的另外几个关键点如下：

* 在完成正则匹配后，需要调用 `advanceBy` 函数消费由正则匹配的全部内容；
* 根据上面给出的第三个正则匹配例子可知，由于标签中可能存在无用的空白字符，例如 `<div---->` ，因此我们需要调用 `advanceSpaces` 函数消费空白字符；
* 在消费由正则匹配的的内容后，需要检查剩余模板内容是否以 `/>` 开头。如果是，则说明当前解析的是一个自闭合标签，这时需要将标签节点的 `isSelfClosing` 属性设置为 true；
* 最后，判断标签是否自闭合。如果是，则调用 `advanceBy` 函数消费内容 `/>`，否则只需要消费内容 `>` 即可。

在经过上述处理后，`parseTag` 函数会返回一个标签节点。`parseElement` 函数在得到由 `parseTag` 函数产生的标签节点后，需要根据节点的类型完成文本模式的切换。

```js
function parseElement(context, ancestors) {
  // 解析开始标签
  const element = parseTag(context)
  if (element.isSelfClosing) return element

  // 切换正确的文本模式
  if (element.tag === 'textarea' || element.tag === 'title') {
    // 如果由 parseTag 解析得到的标签是 <textarea> 或 <title>，则切换到 RCDATA 模式
    context.mode = TextModes.RCDATA
  } else if (/style|xmp|iframe|noembed|noframes|noscript/.test(element.tag)) {
    // 如果由 parseTag 解析得到的标签是
    // <style>、<xmp>、<iframe>、<noembed>、<noframes>、<noscript>
    // 则切换到 RAWTEXT 模式
    context.mode = TextModes.RAETEXT
  } else {
    // 否则切换到 DATA 模式
    context.mode = TextModes.DATA
  }

  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (context.source.startsWith(`</${element.tag}`)) {
    parseTag(context, 'end')
  } else {
    // 缺少闭合标签
    console.log(`${element.tag} 标签缺少闭合标签`)
  }

  return element
}
```

> `<noembed>` 元素是个废除的和不标准的方式，用于向不支持 `<embed>` ，或者不支持作者希望的 嵌入式内容 的浏览器提供替代（或者 “后备”）内容。这个元素在 HTML 4.01 起废除，以支持 `<object>`。后备内容应该插在 <object> 的开始和结束标签之间。

至此，我们就实现了对标签节点的解析。目前的实现不包括节点属性和指令的解析，后面我们会继续讲解。

#### 解析属性

上一节中介绍的 `parseTag` 解析函数会消费整个开始标签，这意味着该函数需要有能力处理开始标签中存在属性与指令，例如：

```vue
<div id="foo" v-show="display"></div>
```

上面这段模板中的 div 标签存在一个 `id` 属性和一个 `v-show` 属性。为了处理属性和指定，我们需要在 `parseTag` 函数中增加 `parseAttributes` 解析函数。

```js
// 由于 parseTag 既用来处理开始标签，也用来处理结束标签，因为我们设计第二个参数 type
// 用来代表当前处理的是开始标签还是结束标签，type 的默认值为 'start'，即默认作为开始标签处理
function parseTag(context, type = 'start') {
  // 从上下文对象中拿到 advanceBy 函数
  const { advanceBy, advanceSpaces } = context

  // 处理开始标签和结束标签的正则表达式不同
  const match = type === 'start'
    // 匹配开始标签
    ? /^<([a-z][^\t\r\n\f />]*)/i.exec(context.source)
    // 匹配结束标签
    : /^<\/([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  // 匹配成功后，正则表达式的第一个捕获组的值就是标签名称
  const tag = match[1]
  // 消费正则表达式匹配的全部内容，例如 '<div' 这段内容
  advanceBy(match[0].length)
  // 消费标签中无用的开白字符
  advanceSpaces()
  // 调用 parseAttributes 函数完成属性与执行的解析，并得到 props 数组
  // props 数组是由指令节点与属性节点共同组成的数组
  const props = parseAttributes(context)

  // 在消费匹配的内容后，如果字符串以 '/>' 开头，则说明这是一个自闭合标签
  const isSelfClosing = context.source.startsWith('/>')
  // 如果是自闭和标签，则消费 '/>'，否则消费 '>'
  advanceBy(isSelfClosing ? 2 : 1)

  // 返回标签节点
  return {
    type: 'Element',
    // 标签名称
    tag,
    // 标签的属性暂时留空
    props: [],
    // 子节点留空
    children: [],
    // 是否自闭合
    isSelfClosing
  }
}
```

我们需要在消费标签的 “开始部分” 和无用的空白字符之后，再调用 `parseAttribute` 函数。举个例子，假设标签的内容如下：

```vue
<div id="foo" v-show="display" ></div>
```

标签的 “开始部分” 指的是字符串 `<div`，所以当消耗标签的 “开始部分” 以及无用空白字符后，剩下的内容为：

```js
id="foo" v-show="display" >
```

 上面这段内容才是 `parseAttributes` 函数要处理的内容。由于该函数只用来解析属性和指令，因为它会不断地消费上面这段模板内容，直到遇到标签的 “结束部分” 位置。其中，结束部分指的是字符 `>` 或者字符串 `/>`。

```js
function parseAttributes(context) {
  // 用来存储解析过程中产生的属性节点和指定节点
  const props = []

  // 开始 while 循环，不断地消费模板内容，直至遇到标签的 "结束部分" 为止
  while (
    !context.source.startsWith('>') && 
    !context.source.startsWith('/>')
  ) {
    // 解析属性或指令
  }

  // 将解析结果返回
  return props
}
```

实际上，`parseAttributes` 函数消费模板内容的过程，就是不断地解析属性名称、等于号、属性值的过程。

<img src="./images/parser17.png" />

`parseAttributes` 函数会按照从左到右的顺序不断地消费字符串。该函数的解析过程如下：

首先，解析出第一个属性的名称 id，并消费字符串 'id'。此时升序模板内容为：

```js
="foo" v-show="display" >
```

在解析属性名称时，除了要消费属性名称之外，还要消费属性名称后面可能存在的空白字符。比如下面这段模板中，属性名称和等于号之间存在空白字符。

```js
id  =  "foo" v-show="display" >
```

但无论如何，在属性名称解析完毕之后，模板剩余内容一定是以等于号开头的，即

```js
=  "foo" v-show="display" >
```

如果消费属性名称之后，模板内容不以等于号开头，说明模板内容不合法，我们可以选择性抛出错误。

接着，我们需要消费等于号字符。由于等于号和属性值之间也可能存在空白字符，所以我们也需要消费对应的空白字符。在这一步操作过后，模板的剩余内容如下：

```js
"foo" v-show="display" >
```

接下来，到了处理属性值的环节。模板中的属性值存在三种情况。

* 属性值被双引号包裹：`id="foo"` 。
* 属性值被单引号包裹：`id='foo'`。
* 属性值没有引号包裹：`id=foo`。

按照上述例子，此时模板的内容一定以双引号（“）开头。因此我们可以通过检查当前模板内容是否以引号开头来确定属性值是否被引用。如果属性值被引号引用，则消费引号。此时模板的剩余内容为：

```js
foo" v-show="display" >
```

既然属性值被引号引用，就意味着在剩余模板内容中，下一个引号之前的内容都应该被解析为属性值。在这个例子中，属性值的内容是字符串 `foo`。于是，我们消费属性值及其后面的引号。当前，如果属性值没有被引号引用，那么在剩余模板内容中，下一个空白字符串之前的所有字符都应该作为属性值。

当属性值和引号被消费之后，由于属性值与下一个属性名称之间可能存在空白字符，所以我们还要消费对应的空白字符。在这一步处理过后，剩余模板内容为：

```js
v-show="display" >
```

可以看到，经过上述操作之后，第一个属性值就处理完毕了。

此时，模板中还剩下一个指令，我们只需重新执行上述步骤，即可完成 `v-show` 指令的解析。当 `v-show` 指令解析完毕后，将会遇到标签的 "结束部分"，即字符 `>`。这时，`parseAttributes` 函数的 `while` 循环将会停止，完成属性和指令的解析。

下面的 `parseAttributes` 函数给出了上述逻辑的具体实现：

```js
function parseAttributes(context) {
  const { advanceBy, advanceSpaces } = context
  // 用来存储解析过程中产生的属性节点和指定节点
  const props = []

  // 开始 while 循环，不断地消费模板内容，直至遇到标签的 "结束部分" 为止
  while (
    !context.source.startsWith('>') && 
    !context.source.startsWith('/>')
  ) {
    // 解析属性或指令
    // 该正则用于匹配属性名称
    const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)
    // 得到属性名称
    const name = match[0]
    // 消费属性名称
    advanceBy(name.length)
    // 消费属性名称与等于号之间的空白字符
    advanceSpaces()
    // 消费等于号
    advanceBy(1)
    // 消费等于号与属性值之间的空白字符
    advanceSpaces()

    // 属性值
    let value = ''

    // 获取当前模板内容的第一个字符
    const quote = context.source[0]
    // 判断属性值是否被引号引用
    const isQuoted = quote === '"' || quote === "'"

    if (isQuoted) {
      // 属性值被引号引用，消费引号
      advanceBy(1)
      // 获取下一个引号的索引
      const enQuoteIndex = context.source.indexOf(quote)
      if (enQuoteIndex > -1) {
        // 获取下一个引号之前的内容作为属性值
        value = context.source.slice(0, enQuoteIndex)
        // 消费属性值
        advanceBy(value.length)
        // 消费引号
        advanceBy(1)
      } else {
        // 缺少引号错误
        console.error('缺少引号')
      }
    } else {
      // 说明属性值没有被引号引用
      // 下一个空白字符之前的内容全部作为属性值
      const match = /^[^\t\r\n\f >]+/.exec(context.source)
      // 获取属性值
      value = match[0]
      // 消费属性值
      advanceBy(value.length)
    }
    // 消费属性值后面的空白字符
    advanceSpaces()

    // 使用属性名称 + 属性值创建一个属性节点，添加到 props 数组中
    props.push({
      type: 'Attribute',
      name,
      value
    })
  }

  // 将解析结果返回
  return props
}
```

在上面这段代码中，有两个重要的正则表达式：

* `/^[^\t\r\n\f />][^\t\r\n\f />=]*/`，用来匹配属性名称；
* `/^[^\t\r\n\f >]+/`，用来匹配没有使用引号引用的属性值。

我们分别来看下这两个正则表达式是如何工作的。

```js
/^[^\t\r\n\f />][^\t\r\n\f />=]*/
=>
A：/^[^\t\r\n\f />]
B：[^\t\r\n\f />=]*/
```

我们可以将这个正则表达式分为 A、B 两个部分来看。

* 部分 A 用于匹配一个位置，这个位置不能是空白字符，也不能是字符 / 或字符 >，并且字符串要以该位置开头。
* 部分 B 用于匹配 0 个或多个位置，这些位置不能是空白字符，也不能是 /、>、=。这些位置不允许出现等于号（=）字符，这就实现了只匹配等于号之前的内容，即属性名称。

我们再来看第二个正则表达式的匹配原理。

```js
/^[^\t\r\n\f >]+/
```

该正则表达式从字符串的开始位置开始匹配，并且会匹配一个或多个非空白字符、非字符 >。换句话说，该正则表达式会一直对字符串进行匹配，直到遇到空白字符或字符 > 为止，这就实现了属性值的提取。

配合 `parseAttributes`  函数，假设给出如下模板：

```vue
<div id="foo" v-show="display"></div>
```

解析上面这段模板，将会得到如下 AST：

```js
const ast = {
  type: 'Root'm
  children: [
  	{
  		type: 'Element',
  		tag: 'div',
  		props: [
  			{ type: 'Attribute', name: 'id', value: 'foo' },
        { type: 'Attribute', name: 'v-show', value: 'display' }
  		]
		}
  ]
}
```

可以看到，在 div 标签接的 props 中，包含两个类型为 `Attribute` 的节点，这两个点就是 `parseAttributes` 函数的解析结果。

我们可以增加更多在 `Vue.js` 中常见的属性和指令进行测试，如以下模板所示：

```vue
<div :id="dynamicId" @click="handler" v-on:mousedown="onMouseDown"></div>
```

上面这段模板经过解析后，得到如下 AST。

```js
const ast = {
  type: 'Root',
  children: [
    {
  		type: 'Element',
  		tag: 'div',
  		props: [
  			{ type: 'Attribute', name: ':id', value: 'dynamicId' },
        { type: 'Attribute', name: '@click', value: 'handler' },
        { type: 'Attribute', name: 'v-on:mousedown', value: 'onMouseDown' }
  		]
		}
  ]
}
```

可以看到，在类型为 `Attribute` 的属性节点中，其 `name` 字段完整地保留着模板中编写的属性名称。我们可以对属性名称做进一步分析，从而得到更具体的信息。例如，属性名称以字符 `@` 开头，认为它是一个 `v-on` 指令绑定。我们甚至可以把 `v-` 开头的属性看作指令绑定，从而为它赋予不同的节点类型。例如：

```js
// 指令，类型为 Directive
{ type: 'Directive', name: 'v-on:mousedown', value: 'onMouseDown' }
{ type: 'Directive', name: '@click', value: 'handler' }
// 普通属性
{ type: 'Attribute', name: 'id', value: 'foo' }
```

不仅如此，为了得到更加具体的信息，我们甚至可以进一步分析指令节点的数据，也可以设计更多语法规则，这完全取决于框架设计者在语法层面的设计，以及为框架赋予的能力。

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/compiler/index12.js)

#### 解析文本与解码 HTML 实体

##### 解析文本

本节我们将讨论文本节点的解析。

```js
const template = '<div>Text</div>'
```

解析器在解析上面这段模板时，会先经过 `parseTag` 函数的处理，这回消费标签的开始部分 '`<div>`'。处理完毕后，剩余模板内容为：

```js
const template = 'Text</div>'
```

紧接着，解析器会调用 `parseChildren` 函数，开启一个新的状态机来处理这段模板。

<img src="./images/parser18.png" />

我们来回顾一下状态机的状态迁移过程。状态机始于 "状态1"。在 ”状态1“ 下，读取模板的第一个字符 T，由于该字符既不是字符 `<`，有人不是插值定界符 `{{`，因此状态机会进入 "状态7"，即调用 `parseText` 函数处理文本内容。此时解析器会在模板中寻找下一个 `<` 字符或插值定界符 `{{` 的位置索引，记为索引 `I`。然后，解析器会从模板的头部到索引 `I` 的位置截取位置，这段截取出来的字符串将作为文本节点的内容。以下面的模板内容为例：

```js
const template = 'Text</div>'
```

`parseText` 函数会尝试在这段模板内容中找到第一个出现的字符 < 的位置索引。在这个例子中，字符 < 的索引值为 4。然后，`parseText` 函数会截取介于索引 `[0, 4)` 的内容作为文本内容。在这个例子中，文本内容就是字符串 'Text'。

假设模板存在插值，如下面的模板所示：

```js
const template = 'Text-{{ val }}</div'
```

在处理这段模板时，`parseText` 函数会找到第一个插值定界符 `{{` 出现的位置索引。在这个例子中，定界符的索引为 `5`。于是，`parseText` 函数会截取介于索引 `[0, 5)` 的内容作为文本内容。在这个例子中，文本内容就是字符串 'Text-'。

下面是 `parseText` 函数具体实现：

```js
function parseText(context) {
  // endIndex 为文本内容得结尾索引，默认将整个模板剩余内容都作为文本内容
  let endIndex = context.source.length
  // 寻找字符 < 的位置索引
  const ltIndex = context.source.indexOf('<')
  // 寻找定界符 {{ 的位置索引
  const delimiterIndex = context.source.indexOf('{{')

  // 取 ltIndex 和当前 endIndex 中较小的一个作为新的结尾索引
  if (ltIndex > -1 && ltIndex < endIndex) {
    endIndex = ltIndex
  }
  // 取 delimiterIndex 和当前 endIndex 中较小的一个作为新的结尾索引
  if (delimiterIndex > -1 && delimiterIndex < endIndex) {
    endIndex = delimiterIndex
  }

  // 此时 endIndex 是最终的文本内容的结尾索引，调用 slice 函数截取文本内容
  const content = context.source.slice(0, endIndex)
  // 消耗文本内容
  context.advanceBy(content.length)

  // 返回文本节点
  return {
    // 节点类型
    type: 'Text',
    // 文本内容
    content
  }
}
```

如上面的代码所示，由于字符 `<` 与定界符 `{{` 的出现顺序是未知的，所以我们需要取两者中较小的一个作为文本截取的终点。有了截取终点后，只需要调用字符串的 `slice` 函数对字符串进行截取即可，截取出来的内容就是文本节点的文本内容。最后，我们创建一个类型为 Text 的文本节点，将其作为 `parseText` 函数的返回值。

配合上述 `parseText` 函数解析如下模板：

```js
const ast = parse('<div>Text</div>')
```

可以得到如下 AST：

```js
const ast = {
  type: 'Root',
  children: [
    {
      type: 'Element',
      tag: 'div',
      props: [],
      isSelfConfig: false,
      children: [
        // 文本节点
        { type: 'Text', content: 'Text' }
      ]
    }
  ]
}
```

这样，我们就实现了对文本节点的解析。解析文本节点本身并不复杂，复杂点在于，我们需要对解析后的文本内容进行 HTML 实体的解码工作，为此，我们有必要先了解什么是 HTML 实体。

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/compiler/index13.js)

##### 解码命名字符引用

HTML 实体是一段以字符 `&` 开始的文本内容。实体用来描述 HTML 中的保留字符和一些难以通过普通键盘输入的字符，以及一些不可见的字符。例如，在 HTML 中，字符 < 具有特殊含义，如果希望以普通文本的方式显示字符 <，需要通过实体来表达。

```html
<div>A&lt;B</div>
```

其中字符 `A&lt;B`  就是一个字符实体，用来表达字符 <。如果我们不用 HTML 实体，而是直接使用字符 <，那么将会产生非法的 HTML 内容：

```html
<div>A<B</div>
```

这会导致浏览器的解析结果不符合预期。

HTML 实体总是以字符 `&` 开头，以字符 `;` 结尾。在 Web 诞生初期，HTML 实体的数量较少，因此允许省略其中的尾分号。但随着 HTML 字符集越来越大，HTML 实体出现了包含的情况，例如 `&lt` 和 `&ltcc` 都是合法的实体，如果不加分号，浏览器将无法区分它们。因此，`WHATWG` 规范中明确规定，如果不为实体加很好，将会产生解析错误。但考虑到历史原因，现在浏览器都能够解析早期规范中定义的那些可以省略分号的 HTML 实体。

HTML 实体有两类，一类叫做**命名字符引用（named character reference）**，也叫做**命名实体（named entity）**，顾名思义，这类实体具有特定的名称，例如上文中的 `&lt`。`WHATWG` 规范中给出了全部的命名字符引用，有 2000 多个，可以通过命名字符引用表查询。

> https://html.spec.whatwg.org/entities.json

除了命名字符引用之外，还有一类字符引用没有特定的名称，只能用数字表示，这类实体叫做**数字字符引用（numeric character reference）**。与命名字符引用不同，数字字符引用以字符串 `&#` 开头，比命名字符引用的开头部分多出了字符 `#`，例如 `&#60;` 。实际上，`&#60;` 对应的字符也是 `<`，换句话说，`&#60;` 与 `&lt` 是等价的。数字字符引用即可以用十进制来表示，也可以使用十六进制来表示。例如，十进制数字的 60 对应的十六进制值为 `3c`，因此实体 `&#60;` 也可以表示为 `&#x3c;` 。可以看到，当使用十六进制表示实体时，需要以字符串 `&#x` 开头。

理解了 HTML 实体后，我们再来讨论为什么 Vue.js 模板的解析器要对文本节点中的 HTML 实体进行解码。为了理解这个问题，我们需要先明白一个大前提：在 Vue.js 模板中，文本节点所包含的 HTML 实体不会被浏览器解析。这是因为模板中的文本节点最终将通过 `el.textContent` 等文本操作方法设置到页面，而通过 `el.textContent` 设置的文本内容是不会经过 HTML 实体解码的。

```js
el.textContent = '&lt';
```

最终 el 的文本内容将会原封不动地呈现为字符串 `'&lt;'`，而不会呈现字符 `<`。这就意味着，如果用户在 `Vue.js` 模板中编写了 `HTML` 实体，而模板解析器不对其进行解码，那么最终渲染到页面的内容将不符合用户的预期。因此，我们应该在解析阶段对文本节点中存在的 HTML 实体进行解码。

模板解析器的解码行为应该与浏览器的行为一致。因此，我们应该按照 `WHATWG` 规范实现解码逻辑。规范中明确定义了解码 HTML 实体状态机的状态迁移流程。下图给出了简化版的状态状态迁移流程，我们会在后文中对其进行补充。

<img src="./images/parser19.png" />

假定状态机当前处于初始的 `DATA` 模式。由图可知，当解析器遇到字符 `&` 时，会进入 “字符引用状态”，并消费字符 `&` ，接着解析下一个字符。如果下一个字符是 `ASCII` 字母或数字 `ASCII alphanumeric` ，则进入 "命名字符引用状态"，其中 `ASCII` 字母或数字指的是 `0~9` 这十个数字以及字符集合 `a~z` 再加上字符集合 `A~z`。当然，如果下一个字符是 `#`，则进入 “数字字符引用状态”。

一旦状态机进入命名字符引用状态，解析器会执行比较复杂的匹配流程。我们通过几个例子来直观地感受一个过程。假设文本内容为：

```js
a&ltb
```

上面这段文本会被解析为：

```js
a<b
```

我们可以来分析整个解析过程。

* 首先，当解析器遇到字符 `&` 时，会进入字符引用状态。接着，解析下一个字符 `l`，这会使得解析器进入命名字符引用状态，并在命名引用表（简称 “引用表”）中查找以字符 `l` 开头的项。由于引用表中存在诸多以字符 `l` 开头的项，例如 `lt`、`lg`、`le` 等，因此解析器认为此时是 “匹配的”。
* 于是开始解析下一个字符 `t`，并尝试去引用表中查找以 `lt` 开头的项。由于引用表中也存在多个以 `lt` 开头的项，例如 `lt`、`ltcc;`、`ltri;` 等，因此解析器认为此时是 “匹配的”。
* 于是又开始解析下一个字符 `b`，并尝试引用表中的查找以 `ltb` 开头的项，结果发现引用表中不存在符合条件的项，至此匹配结束。

当匹配结束时，解析器会检查最后一个匹配的字符。如果该字符是分号（`;`），则会产生一个合法的匹配，并渲染对应字符。但在上例中，最后一个匹配的字符是字符 `t`，并不是分号 (`;`)，因此会生成一个解析错误，但由于历史原因，浏览器仍然能够解析它。在这种情况下，浏览器的解析规则是：最短原则。其中 “最短” 指的是命名字符引用的名称最短。举个例子，假设文本内容为：

```js
a&ltcc;
```

我们知道 `&ltcc;` 是一个合法的命名字符引用，因此上述文本会被渲染为：`a⪦`。但如果去掉上述文本中的很好，即：

```js
a&ltcc
```

解析器在处理这段文本中的实体时，最后匹配的字符将不再是分号，而是字符 c。按照 “最短原则”，解析器只会渲染名称更短的字符引用。在字符串 `&ltcc` 中，`&lt` 的名称要短于 `&ltcc`，因此最终会将 `&lt` 作为合法的字符引用来渲染，而字符串 `cc` 将作为普通字符来渲染。所以上面的文本最终渲染为：`a<cc`。

需要说明的是，上述解析过程仅限于不用做属性值的普通文本。换句话说，用作属性值的文本会有不同的解析规则。举例来说，给出如下 HTML 文本：

```html
<a href="foo.com?a=1&lt=2">foo.com?a=1&lt=2</a>
```

可以看到，a 标签和 `href` 属性值与它的文本子节点具有同样的内容，但它们被解析之后的结果不同。其中属性值中出现的 `&lt` 将原封不动地展示，而文本子节点中出现的 `&lt` 将会被解析为字符 `<`。这也是符合期望的，很明显，`&lt=2` 将构成链接中的查询参数，如果将其中的 `&lt` 解码为字符 `<`，将会破坏用户的 URL。实际上，WHATWG 规范中对此也有完整的定义，处于历史原因的考虑，对于属性值中的字符引用，如果最后一个匹配的字符不是分号，并且该匹配的字符的下一个字符是等于号、ASCII 字母或数字，那么该匹配项将作为普通文本被解析。

明白了原理，我们就着手实现。我们面临的第一个问题是，如何处理省略分号的情况？关于字符引用中的分号，我们可以总结如下：

* 当存在分号时，执行完整匹配。
* 当省略分号时，执行最短匹配。

为此，我们需要精心设计命名字符引用表。由于命名字符引用的数量非常多，因此我们这里只取一部分作为命名字符引用表的内容。

```js
const namedCharacterReferences = {
  "gt": ">",
  "gt;": ">",
  "lt": "<",
  "lt;": "<",
  "ltcc;": "⪦"
}
```

上面这张表是经过精心设计的。观察 `namedCharacterReferences` 对象可以发现，相同的字符对应的实体会有多个，即带分号的版本和不带分号的版本，例如 "`gt`" 和 "`gt;`"。另外一些实体规则只有带分号的版本，因为这些实体不允许省略分号，例如 "`ltcc;`"。我们可以根据这张表来实现实体的解码逻辑。假设我们有如下文本内容：

```js
a&ltccbbb
```

在解码这段文本时，我们首先根据字符 `&` 将文本分为两部分。

* 一部分是普通文本 `a`。
* 一部分则是：`&ltccbbb`。

对于普通文本，由于它不需要被解码，因此索引原封不动地保留。而对于可能是字符引用的部分，执行解码工作：

* 第一步：计算出命名字符引用表中的实体名称的最大长度。由于在 `namedCharacterReferences` 对象中，名称最长的实体是 `ltcc;`，它具有 5 个字符，因此最大长度是 5。

* 第二步：根据最大长度截取字符串 "`ltccbbb`"，即 `'ltccbbb'.slice(0, 5)`，最终结果是：`ltccb`。

* 第三步：用截取后的字符串 `ltccb` 作为键去字符引用表中查询对应的值，即解码。由于引用表 `namedCharacterReferences` 中不存在键值为 `ltccb` 的项，因此不匹配。

* 第四步：当发现不匹配时，我们将最大长度减 1，并重新执行第二步，直到知道匹配项位置。在上面这个例子中，最终的匹配项将会是 `lt`。因此，上述文本会被解码为：

  ```js
  a<ccbbb
  ```

这样，我们就实现了当字符引用省略分号时按照 “最短原则” 进行解码。

下面的 `decodeHtml` 函数给出了上述逻辑的具体实现：

```js
// 第一个参数是要被解码的文本内容
// 第二个参数是一个布尔值，代表文本内容是否作为属性值
function decodeHtml(rawText, asAttr = false) {
  let offset = 0
  const end = rawText.length
  // 经过解码后的文本将作为返回值被返回
  let decodedText = ''
  // 引用表中的实体名称的最大长度
  let maxCRNameLength = 0

  // advance 函数用于消费指定长度的文本
  function advance(length) {
    offset += length
    rawText = rawText.slice(length)
  }

  // 消费字符串，知道处理完毕为止
  while (offset < end) {
    // 用于匹配字符引用的开始部分，如果匹配成功，那么 head[0] 的值会有三种可能
    // 1. head[0] === '&'，这说明该字符引用是命名字符引用
    // 2. head[0] === '&#，这说明该字符引用是用十进制表示的数字字符引用
    // 3. head[0] === '&#x，这说明该字符引用是用十六进制表示的数字字符引用
    const head = /&(?:#x?)?/i.exec(rawText)
    // 如果没有匹配，说明已经没有需要解码内容
    if (!head) {
      // 计算剩余内容长度
      const remaining = end - offset
      // 将剩余内容加到 decodedText 上
      decodedText += rawText.slice(0, remaining)
      // 消费剩余内容
      advance(remaining)
      break
    }

    // head.index 为匹配的字符 & 在 rawText 中的位置索引
    // 截取字符 & 之前的内容加到 decodedText 上
    decodedText += rawText.slice(0, head.index)
    // 消费字符 & 之前的内容
    advance(head.index)

    // 如果满足条件，则说明是命名字符引用，否则为数字字符引用
    if (head[0] === '&') {
      let name = ''
      let value
      // 字符 & 的下一个字符必须是 ASCII 字母或数字，这样才是合法的命名字符引用
      if (/[0-9a-z]/i.test(rawText[1])) {
        // 根据引用表计算实体名称的最大长度
        if (!maxCRNameLength) {
          maxCRNameLength = Object.keys(namedCharacterReferences).reduce(
            (max, name) => Math.max(max, name.length),
            0
          )
        }
        // 从最大长度开始对文本进行截取，并试图去引用表中找到对应的项
        for (let length = maxCRNameLength; !value && length > 0; --length) {
          // 截取字符 & 到最大长度之间的字符作为实体名称
          name = rawText.substring(1, length)
          // 使用实体名称去索引表中查找对应项的值
          value = (namedCharacterReferences)[name]
        }
        // 如果找到对应项的值，说明解码成功
        if (value) {
          // 检查实体名称的最后一个匹配字符是否是分号
          const semi = name.endsWith(';')
          // 如果解码的文本作为属性值，最后一个匹配的字符不是分号
          // 并且最后一个匹配字符的下一个字符是等于号（=）、ASCII 字母或数字
          // 由于历史原因，将字符 & 和实体名称 name 作为普通文本
          if (
            asAttr &&
            !semi &&
            /[-a-z0-9]/i.test(rawText[name.length + 1] || '')
          ) {
            decodedText += '&' + name
            advance(1 + name.length)
          } else {
            // 其他情况下，正常使用解码后的内容拼接到 decodedText 上
            decodedText += value
            advance(1 + name.length)
          }
        } else {
          // 如果没有找到对应的值，说明解码失败
          decodedText += '&' + name
          advance(1 + name.length)
        }
      } else {
        // 如果字符 & 的下一个字符不是 ASCII 字母或数字，将字符 & 作为普通文本
        decodedText += '&'
        advance(1)
      }
    }
  }
  return decodedText
}
```

有了 `decodeHtml` 函数之后，我们就可以在解析文本节点时通过它对文本内容进行解码：

```js
function parseText(context) {
 	// ...
  
  // 返回文本节点
  return {
    // 节点类型
    type: 'Text',
    // 文本内容
    content: decodeHtml(content) // 调用 decodeHtml 函数解码内容
  }
}
```

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/compiler/index14.js)

##### 解码数字字符引用

上一节中，我们使用下面的正则表达式来匹配一个文本引用的开始部分：

```js
const head = /&(?:#x?)?/i.exec(rawText)
```

我们可以根据该正则的匹配结果，来判断字符引用的类型。

* 如果 `head[0] === '&'`，则说明匹配的是命名字符引用。
* 如果 `head[0] === '&#'`，则说明匹配的是以十进制表示的数字字符引用。
* 如果 `head[0] === '&#x'`，则说明匹配的是以十六进制表示的数字字符引用。

数字字符引用的格式是：前缀 + Unicode 码点。解码数字字符引用的关键在于，如何提取字符引用中的 Unicode 码点。考虑到数字字符引用的前缀可以是以十进制表示（&#），也可以是以十六进制表示（&#x），所以我们使用下面的代码来完成码点的提取。

```js
// 判断是以十进制表示还是以十六进制表示
const hex = head[0] === '&#x'
// 根据不同进制表示法，选用不同的正则
const pattern = hex ? /^&#x([0-9a-f]+);?/i : /^&#([0-9]+);?/
// 最终，body[1] 的值就是 Unicode 码点
const body = pattern.exec(rawText)
```

有了 Unicode 码点之后，只需要调用 `String.fromCodePoint` 函数即可将其解码为对应的字符：

```js
if (body) {
  // 根据对应的进制，将码点字符串转换为数字
  const cp = parseInt(body[1], hex : 16 : 10)
  // 解码
  const char = String.fromCodePoint(cp)
}
```

不过，在真正进行解码之前，需要对码点的值进行合法性检查。WHATWG 规范中对此也有明确的定义。

* 如果码点为 `0x00`，即十进制的数字为 0，它在 `Unicode` 中代表空字符（NULL），这将是一个解析错误，解析器会将码点值替换成 `0xFFFD`。
* 如果码点值大于 `0x10FFFF` (`0x10FFFF` 为 Unicode 的最大值)，这也是一个解析错误，解析器会将码点值替换为 `0xFFFD`。 
* 如果码点值处于 **代理对（surrogate pair）** 范围内，这也是一个解析错误，解析器会将码点值替换为 `0xFFFD`，其中 `surrogate pair` 是预留给 `UFT-16` 的的码位，其范围是：`[0xD800, 0xDFFF]`。
* 如果码点值是 `noncharacter`，这也是一个解析错误，但什么都不需要做。这里的 `noncharacter` 代表 Unicode 永久保留的码点，用于 Unicode 内部，它的取值范围是：`[0xFDD0, 0xFDEF]`，还包括：`0xFFFE`、`0xFFFF`、`0x1FFFE`、`0x1FFFF`、`0x2FFFE`、`0x3FFFE`、`0x3FFFF`、`0x4FFFE`、`0x4FFFF`、`0x5FFFE`、`0x5FFFF`、`0x6FFFE`、`0x6FFFF`、`0x7FFFE`、`0x7FFFF`、`0x8FFFE`、`0x8FFFF`、`0x9FFFE`、`0x9FFFF`、`0x10FFFE`、`0x10FFFF`、`0xAFFFE`、`0xAFFFF`、`0xBFFFE`、`0xBFFFF`、`0xCFFFE`、`0xCFFFF`、`0xDFFFE`、`0xDFFFF`、`0xEFFFE`、`0xEFFFF`、`0xFFFFE`、`0xFFFFF`。
* 如果码点对应的字符是回车符（`0x0D`），或者码点值为 `控制字符集（control character）` 中的非 ASCII 空白符（ASCII whitespace），则是一个解析错误。这时需要将码点作为索引，在下表中查找对应的替换码点:

```js
const CCR_REPLACEMENTS = {
  0x80: 0x20ac,
  0x82: 0x201a,
  0x83: 0x0192,
  0x84: 0x201e,
  0x85: 0x2026,
  0x86: 0x2020,
  0x87: 0x2021,
  0x88: 0x02c6,
  0x89: 0x2030,
  0x8a: 0x0160,
  0x8b: 0x2039,
  0x8c: 0x0152,
  0x8e: 0x017d,
  0x91: 0x2018,
  0x92: 0x2019,
  0x93: 0x201c,
  0x94: 0x201d,
  0x95: 0x2022,
  0x96: 0x2013,
  0x97: 0x2014,
  0x98: 0x02dc,
  0x99: 0x2122,
  0x9a: 0x0161,
  0x9b: 0x203a,
  0x9c: 0x0153,
  0x9e: 0x017e,
  0x9f: 0x0178
}
```

如果存在对应的替换码点，则渲染该替换码点对应的字符，否则直接渲染原码点对应的字符。

上述关于码点合法性检查的代码具体实现如下：

```js
if (body) {
  // 根据对应的进制，将码点字符串转换为数字
  let cp = parseInt(body[1], hex ? 16 : 10)

  // 检查码点的合法性
  if (cp === 0) {
    // 如果码点值为 0x00，替换为 0xfffd
    cp = 0xfffd
  } else if (cp > 0x10ffff) {
    // 如果码点值超过 Unicode 的最大值，替换为 0xfffd
    cp = 0xfffd
  } else if (cp >= 0xd800 && cp <= 0xdfff) {
    // 如果码点值处于 surrogdate pair 范围内，替换为 0xfffd
    cp = 0xfffd
  } else if ((cp >= 0xfdd0 && cp <= 0xfdef) || (cp & 0xfffe) === 0xfffe) {
    // 如果码点值处于 noncharacter 范围内，则什么都不做，交给平台处理
    // noop
  } else if (
    // 控制字符集的范围是：[0x01, 0x1f] 加上 [0x7f, 0x9f]
    // 去掉 ASICC 空白符：0x09(TAB)、0x0A(LF)、0x0c(FF)
    // 0x0D(CR) 虽然也是 ASICC 空白符，但需要包含
    (cp >= 0x01 && cp <= 0x08) || 
    cp === 0x0b || 
    (cp >= 0x0d && cp <= 0x1f) || 
    (cp >= 0x7f && cp <= 0x9f)
    ) {
      // 在 CCR_REPLACEMENTS 表中查找替换码点，如果找不到，则使用原码点
      cp = CCR_REPLACEMENTS[cp] || cp
    }
  }
  
  // 解码
  const char = String.fromCodePoint(cp)
} 
```

在这段代码中，我们完整地还原了码点合法性检查的逻辑，它有如下几个关键点。

* 其中控制字符集（control character）的码点范围是：`[0x01, 0x1f]` 和 `[0x7f, 0x9f]`。这个码点范围包含了 ASCII 空白符：`0x09(TAB)`、`0x0A(LF)`、`0x0C(FF)` 和 `0x0D(CR)` ，但 WHATWG 规范中要求包含 `0x0D(CR)`。
* 码点 `0xfffd` 对应的符号是 �。你一定在出现 “乱码” 的情况下见过这个字符，它是 Unicode 中的替换字符，通常表示在解码过程中出现 “错误”，例如使用了错误的解码方式等。

最后，我们将上述代码整合到 `decodeHtml` 函数中，这样就实现了一个完善的 HTML 文本解码函数。

```js
// 第一个参数是要被解码的文本内容
// 第二个参数是一个布尔值，代表文本内容是否作为属性值
function decodeHtml(rawText, asAttr = false) {
  let offset = 0
  const end = rawText.length
  // 经过解码后的文本将作为返回值被返回
  let decodedText = ''
  // 引用表中的实体名称的最大长度
  let maxCRNameLength = 0

  // advance 函数用于消费指定长度的文本
  function advance(length) {
    offset += length
    rawText = rawText.slice(length)
  }

  // 消费字符串，知道处理完毕为止
  while (offset < end) {
    // ...

    // 如果满足条件，则说明是命名字符引用，否则为数字字符引用
    if (head[0] === '&') {
     	// ...
    } else {
      // 数字字符引用

      // 判断是以十进制表示还是以十六进制表示
      const hex = head[0] === '&#x'
      // 根据不同进制表示法，选用不同的正则
      const pattern = hex ? /^&#x([0-9a-f]+);?/i : /^&#([0-9]+);?/
      // 最终，body[1] 的值就是 Unicode 码点
      const body = pattern.exec(rawText)

      if (body) {
        // 根据对应的进制，将码点字符串转换为数字
        let cp = parseInt(body[1], hex ? 16 : 10)

        // 检查码点的合法性
        if (cp === 0) {
          // 如果码点值为 0x00，替换为 0xfffd
          cp = 0xfffd
        } else if (cp > 0x10ffff) {
          // 如果码点值超过 Unicode 的最大值，替换为 0xfffd
          cp = 0xfffd
        } else if (cp >= 0xd800 && cp <= 0xdfff) {
          // 如果码点值处于 surrogdate pair 范围内，替换为 0xfffd
          cp = 0xfffd
        } else if ((cp >= 0xfdd0 && cp <= 0xfdef) || (cp & 0xfffe) === 0xfffe) {
          // 如果码点值处于 noncharacter 范围内，则什么都不做，交给平台处理
          // noop
        } else if (
          // 控制字符集的范围是：[0x01, 0x1f] 加上 [0x7f, 0x9f]
          // 去掉 ASICC 空白符：0x09(TAB)、0x0A(LF)、0x0c(FF)
          // 0x0D(CR) 虽然也是 ASICC 空白符，但需要包含
          (cp >= 0x01 && cp <= 0x08) || 
          cp === 0x0b || 
          (cp >= 0x0d && cp <= 0x1f) || 
          (cp >= 0x7f && cp <= 0x9f)
          ) {
            // 在 CCR_REPLACEMENTS 表中查找替换码点，如果找不到，则使用原码点
            cp = CCR_REPLACEMENTS[cp] || cp
          }
  
          // 解码后追加到 decodedText 上
          decodedText += String.fromCodePoint(cp)
          // 消费整个数字字符引用的内容
          advance(body[0].length)
      } else{
        // 如果没有匹配，则不进行解码操作，只是把 head[0] 追加到 decodedText 上并消费
        decodedText += head[0]
        advance(head[0].length)
      }
    }
  }
  return decodedText
}
```

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/compiler/index15.js)

#### 解析插值

文本插值是 Vue.js 模板中用来渲染动态数据的常用方法：

```vue
{{ count }}
```

默认情况下，插值以字符串 `{{` 开头，并以字符串 `}}`  结尾。我们通常将这个两个特殊的字符串称为定界符。定界符中间的内容可以是任意合法的 JavaScript 表达式，例如：

```vue
{{ obj.foo }}
```

或

```vue
{{ obj.fn() }}
```

解析器在遇到文本插值的起始定界符 `({{)` 时，会进入文本 "插值状态6"，并调用 `parseInterpolation` 函数来解析插值内容。

<img src="./images/parser18.png" />



解析器在解析插值时，只需要将文本插值的开始定界符和结束定界符之间的内容提取出来作为 JavaScript 表达式即可。

```js
function parseInterpolation(context) {
  // 消费开始定界符
  context.advanceBy('{{'.length)
  // 找到结束定界符的位置索引
  closeIndex = context.source.indexOf('}}')
  if (closeIndex < 0) {
    console.error('插值缺少结束定界符')
  }
  // 截取开始定界符和结束定界符之间的内容作为插值表达式
  const content = context.source.slice(0, closeIndex)
  // 消费表达式的内容
  context.advanceBy(content.length)
  // 消费结束定界符
  context.advanceBy('}}'.length)

  // 返回类型为 Interpolation 的节点，代表插值节点
  return {
    type: 'Interpolation',
    // 插值节点的 content 是一个 Expression 的表达式节点
    content: {
      type: 'Expression',
      // 表达式节点的内容则是经过 HTML 解码后的插值表达式
      content: decodeHtml(content)
    }
  }
}
```

配合上面的 `parseInterpolation` 函数，解析如下模板内容：

```js
const ast = parse(`<div>foo {{ bar }}</div>`)
```

最终得到如下 AST：

```js
{
  type: 'Root',
  children: [
    {
      type: 'Element',
      tag: 'div',
      props: [],
      children: [
        { type: 'Text', content: 'foo ' },
        {
          type: 'Interpolation',
          content: { type: 'Expression', content: ' bar ' }
        },
        { type: 'Text', content: ' baz' }
      ],
      isSelfClosing: false
    }
  ]
}
```

实现上述效果，我们还需要修改 `parseChildren` 的一处代码。我们需要实时获取 source 的值，不然在某些场景下，程序会陷入死循环。比如 `'<div>foo {{ bar }} baz</div>`，当我们消费 `<div>foo ` 后，如果不实时获取 `souce` ，得到的值永远是 `foo {{ bar }}`，就永远不会走到 ` parseInterpolation` 解析插值逻辑。

```diff
function parseChildren(context, ancestors) {
  // 定义 nodes 数组存储子节点，它将作为最终的返回值
  let nodes = []
  
- // 从上下文对象中取得当前状态，包括模式 mode 和模板内容 source
- const { mode, source } = context

  // 开始 while 循环，只要满足条件就会一直对字符串进行解析
  while (!isEnd(context, ancestors)) {
    let node

+ 	// 从上下文对象中取得当前状态，包括模式 mode 和模板内容 source
+   const { mode, source } = context
    
    // 只有 DATA 模式和 RCDATA 模式才支持插值节点的解析
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {

      // 只有 DATA 模式才支持标签节点的解析
      if (mode === TextModes.DATA && source[0] === '<') {
        if (source[1] === '!') {
          if (source.startsWith('<!--')) {
            // 注释
            node = parseComment(context)
          } else if (source.startsWith('<![CDATA[')) {
            // CDATA
            node = parseCDATA(context, ancestors)
          }
        } else if (source[1] === '/') {
          // 结束标签，这里需要抛出错误
          console.error('无效的结束标签')
          continue
        } else if (/[a-z]/i.test(source[1])) {
          // 标签
          node = parseElement(context, ancestors)
        }
      } else if (source.startsWith('{{')) {
        // 解析插值
        node = parseInterpolation(context)
      }
    }

    // node 不存在，说明处理其他模式，即非 DATA 模式且非 RCDATA 模式
    // 这时一切内容作为文本处理
    if (!node) {
      // 解析文本节点
      node = parseText(context)
    }

    // 将节点添加到 nodes 数组中
    nodes.push(node)
  }

  // 当 while 循环停止后，说明子节点解析完毕，返回子节点
  return nodes
}
```

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/compiler/index16.js)

#### 解析注释

解析注释的思路和解析插值非常相似，如下面的 `parseComment` 函数所示：

```js
// 解析注释
function parseComment(context) {
  // 消费开始定界符
  context.advanceBy('<!--'.length)
  // 找到结束定界符的位置索引
  closeIndex = context.source.indexOf('-->')
  // 截取注释节点的内容
  const content = context.source.slice(0, closeIndex)
  // 消费内容
  context.advanceBy(content.length)
  // 消费注释结束部分
  context.advanceBy('-->'.length)

  // 返回类型为 Comment 的节点
  return {
    type: 'Comment',
    // 插值节点的 content 是一个 Expression 的表达式节点
    content
  }
}
```

配合 `parseComment` 函数，解析如下模板内容：

```js
const ast = parse('<div><!-- comments --></div>')
```

最终得到如下 AST：

```js
{
  type: 'Root',
  children: [
    {
      type: 'Element',
      tag: 'div',
      props: [],
      children: [
        { type: 'Comment', content: ' comments ' }
      ],
      isSelfClosing: false
    }
  ]
}
```

[代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/compiler/index17.js)

#### 总结

本篇文章中，我们首先讨论了解析器的文本模式及其对解析器的影响。文本模式指的是解析器在工作时缩进如的一些特殊状态，如 `RCDATA` 模式、`CDATA` 模式、`RAWTEXT` 模式，以及初始的 `DATA` 模式等。在不同模式下，解析器对文本的解析行为会有所不同。

接着，我们讨论了如何使用递归下降算法构造模板 AST。在 `parseChildren` 函数运行的过程中，为了处理标签节点，会调用 `parseElement` 解析函数，这会间接地调用 `parseChildren` 函数，并产生一个新的状态机。随着标签嵌套层次的增加，新的状态机也会随着 `parseChildren` 函数被递归地调用而不断创建，这就是 "递归下降" 中 “递归” 二字的含义。而上级 `parseChildren` 函数的调用用于构造上级模板 AST 节点，被递归调用的下级 `parseChildren` 函数则用于构造下级模板 AST 节点。最终会构造出一棵树形结构的模板 AST，这就是 “递归下降” 中 “下降” 两字的含义。

在解析模板构建 AST 的过程中，`parseChildren` 函数是核心。每次调用 `parseChildren` 函数，就意味着新状态机的开始。状态机的结束时机有两个。

* 第一个停止时机是当模板内容解析完毕时。
* 第二个停止时机是遇到结束标签时，这时解析器会取得父级节点栈栈顶的节点作为父节点，检查该结束标签是否与父节点的标签同名，如果相同，则状态机停止运行。

我们还讨论了文本节点的解析。解析文本节点本身并不复杂，它的复杂点在于，我们需要对解析后的文本内容进行 HTML 实体的解码工作。WHATWG 规范中也定义了解码 HTML 实体过程中的状态迁移流程。HTML 实体类型有两种，分别是命名字符引用和数字字符引用。命名字符引用的解码方案可以总结为两种。

* 当存在分号时：执行完整匹配。
* 当省略分号时：执行最短匹配。

对于数字字符引用，则需要按照 WHATWG 规范中定义的规则逐步实现。

### 编译优化

编译优化指的是编译器将模板编译为渲染函数的过程中，尽可能地提取关键信息，并以此指导生成最优代码的过程。编译优化的与具体实现是由框架的设计思路决定的，不同的框架具有不同的设计思路，因此编译优化的策略也不尽相同。但优化的思路基本一致，即尽可能地区分动态内容和静态内容，并针对不同的内容采用不同的优化策略。

#### 动态节点收集与补丁标志

##### 传统 Diff 算法的问题

我们之前讲渲染器的时候，介绍了三种关于传统虚拟 DOM 的 Diff 算法。但无论哪一种 Diff 算法，当它在对比新旧两种虚拟 DOM 树的时候，总是要按照虚拟 DOM 的层级结构 “一层一层” 地编译。举个例子，假设我们有如下模板：

```vue
<div id="foo">
  <p class="bar">{{ text }}</p>
</div>
```

在上面这段模板中，唯一可能变化的就是 p 标签的文本子节点的内容。也就是说，当响应式数据 text 的值发生变化时，最高效的更新方式就是直接设置 p 标签的文本内容。但传统 Diff 算法显然做不到如此高效，当响应式数据 text 发生变化时，会产生一棵新的虚拟 DOM 树，传统 Diff 算法对比新旧两棵虚拟 DOM 树的过程如下：

* 对比 div 节点，以及该节点的属性和子节点
* 对比 p 节点，以及该节点的属性和子节点
* 对比 p 节点的文本子节点，如果文本子节点的内容变了，则更新，否则什么都不做。

可以看到，与直接更新 p 标签的文本内容相比，传统 Diff 算法存在很多无意义的对比操作。如果能够跳过这些无意义的操作，性能将会大幅提升。而这就是 Vue.js 3 编译优化的思路来源。

实际上，模板的结构非常稳定。通过编译手段，我们可以分析出很多关键信息，例如哪些节点是静态的，哪些节点是动态的。结合这些关键信息，编译器可以直接生成原生 DOM 操作的代码，这样甚至能够抛掉虚拟 DOM，从而避免虚拟 DOM 带来的性能开销。但是，考虑到渲染函书的灵活性，以及 Vue.js 2 的兼容问题，Vue.js 3 最后还是选择保留虚拟 DOM。这样一来，就必然要面临它带来的额外性能开销。

那么，为什么虚拟 DOM 会产生额外的性能开销呢？根本原因在于，渲染在运行时得不到足够的信息。传统 Diff 算法无法利用编译时提取到的任何关键信息，这导致渲染器在运行时不能去做相关的优化。而 Vue.js 3 的编译器会将编译时得到的关键信息 “附着” 在它生成的虚拟 DOM 上，这些信息会通过虚拟 DOM 传递给渲染器。最终，渲染器会根据这些关键信息执行 “快捷路径”，从而提升运行时的性能。

##### Block 与 PatchFlags

之所以说传统 Diff 算法无法避免新旧虚拟 DOM 树之间的比较操作，是因为它在运行时得不到足够的关键信息，从而无法区分动态内容和静态内容。换句话说，只要运行时能够区分动态内容和静态内容，即可实现极致的优化策略。假设我们有如下模板：

```html
<div id="foo">
  <div>foo</div>
  <p>{{ bar }}</p>
</div>
```

在上面这段模板中，只有 `{{ bar }}` 是动态内容。因此，在理想情况下，当响应式数据 bar 的值变化时，只需要更新 p 标签的文本节点即可。为了实现这个目标，我们需要提供更多信息给运行时，这需要我们从虚拟 DOM 的结构入手。下面我们来看一下传统的虚拟 DOM 是如何描述上面那段模板的：

```js
const vnode = {
  tag: 'div',
  children: [
		{ tag: 'div', children: 'foo' },
    { tag: 'p', children: ctx.bar }
  ]
}
```

传统的虚拟 DOM 中没有任何标志能够体现出节点的动态性。但经过编译优化之后，编译器会将它提取到的关键信息 “附着” 到虚拟 DOM 节点上，如下面的代码所示：

```js
const vnode = {
  tag: 'div',
  children: [
		{ tag: 'div', children: 'foo' },
    { tag: 'p', children: ctx.bar, patchFlag: 1 } // 动态节点
  ]
}
```

可以看到，用来描述 p 标签的虚拟节点拥有一个额外的属性，即 `patchFlag`，它的值是一个数字。只要虚拟节点存在该属性，我们就认为它是一个动态节点。这里的 `patchFlag` 属性就是所谓的补丁标志。

* 数字 1：代表节点有动态的 `textContent`。
* 数字 2：代表元素有动态的 `class` 绑定。
* 数字 3：代表元素有动态的 `style` 绑定。
* 数字 4：其他 ...。

通常，我们会在运行的代码中定义补丁标志的映射，例如：

```js
cosnt PatchFlags = {
  TEXT: 1, // 代表节点有动态的 textContent
  CLASS: 2, // 代表元素有动态的 class 绑定
  STYLE: 3, // 代表元素有动态的 style 绑定
  // ....
}
```

有了这项信息，我们就可以在虚拟节点的创建阶段，把它的动态子节点提取出来，并将其存储到该虚拟节点的 `dynamicChildren` 数组内：

```js
const vnode = {
  tag: 'div',
  children: [
		{ tag: 'div', children: 'foo' },
    { tag: 'p', children: ctx.bar, patchFlag: PatchFlags.TEXT } // 动态节点
  ],
  // children 的动态节点提取到 dynamicChildren 数组中
  dynamicChildren: [
    // p 标签具有 patchFlag 属性，因此它是动态节点
    { tag: 'p', children: ctx.bar, patchFlag: PatchFlags.TEXT }
  ]
}
```

我们会在下一节讨论如何提取动态节点。观察上面的 vnode 对象可以发现，与普通虚拟节点相比，它多出一个额外的 `dynamicChildren` 属性。我们把带有该属性的虚拟节点称为 “块”，即 Block。所以，一个 Block 本质上也是一个虚拟 DOM 节点，只不过它比普通的虚拟节点多出一个用来存储动态子节点的 `dynamicChildren`  属性。这里需要注意的是，一个 `Block` 不仅能够收集它的直接动态子节点，还能够收集所有动态子代节点。举个例子，假设我们有如下模板：

```vue
<div>
  <div>
    <p>{{ bar }}</p>
  </div>
</div>
```

在这段模板中，p 标签并不是最外层的直接子节点，而是它的子代节点。因此，最外层的 div 标签对应的 Block 能够将 p 标签收集到其 `dynamicChildren` 数组中，如下面的代码所示：

```js
const vnode = {
  tag: 'div',
  children: [
		{
      tag: 'div',
      children: [
        { tag: 'p', children: ctx.bar, patchFlag: PatchFlags.TEXT } // 动态节点
      ] 
    },
  ],
  dynamicChildren: [
    // Block 可以收集所有动态子代节点
    { tag: 'p', children: ctx.bar, patchFlag: PatchFlags.TEXT }
  ]
}
```

有了 Block 这个概念后，渲染器的更新操作将会以 Block 为维度。也就是说，当渲染器在更新一个 Block 时，回忽略虚拟节点的 `children` 数组，而是直接就找到该虚拟节点的 `dynamicChildren` 数组，并只更新该数组中的动态节点。这样，在更新时就实现了跳过静态内容，只更新静态内容。同时，由于动态节点中存在对应的补丁标志，所以在更新动态节点的时候，也能够做到靶向更新。例如，当一个动态节点的 `patchFlag` 值为数字 1 时，我们知道它只存在动态的文本节点，所以只需要更新它的文本内容即可。

既然 Block 的好处这么多，那么什么情况下需要将一个普通的虚拟节点变成 `Block` 节点呢？实际上，当我们在编写模板代码的时候，所有模板的根结点都会是一个 Block 节点，如下面的代码所示：

```vue
<template>
	<!-- 这个 div 标签是一个 Block -->
	<div>
    <!-- 这个 p 标签不是 Block，因为它不是根节点 -->
    <p>{{ bar }}</p>
  </div>
	<!-- 这个 h1 标签是一个 Block -->
	<h1>
    <!-- 这个 span 标签不是 Block，因为它不是根节点 -->
    <span :id="dynamicId"></span>
  </h1>
</template>
```

实际上，除了模板中的根节点需要作为 Block 角色之外，任何带有 `v-for`、`v-if/v-else-if/v-else` 等指令的节点都需要作为 Block 节点。

##### 收集动态节点

在编译器生成的渲染函数代码中，并不会直接包含用来描述虚拟节点的数据结构，而是包含用来创建虚拟 DOM 节点的辅助函数。

```js
render() {
  return createVNode('div', { id: 'foo' }, [
    createVnode('p', null, 'text')
  ])
}
```

其中 `createVNode` 函数就是用来创建虚拟 DOM 节点的辅助函数，它的基本实现类似于：

```js
function createVNode(tag, props, children) {
  const key = props && props.key
  props && delete props.key
  
  return {
  	tag,
    props,
    children,
    key
  }
}
```

可以看到，`createVNode` 函数的返回值是一个虚拟 DOM 节点。在 `createVNode` 函数内部，通常还对 props 和 children 做一些额外的处理工作。

编译器在优化阶段提取的关键信息会影响最终生成的代码，具体体现在用于创建虚拟 DOM 节点的辅助函数上。假设我们有如下模板：

```vue
<div id="foo">
  <p class="bar">{{ text }} </p>
</div>
```

编译器在对这段模板进行编译优化后，会生成带有**补丁标志（patch flag）** 的渲染函数，如下所示：

```js
render() {
  return createVNode('div', { id: 'foo' }, [
    // PatchFlags.TEXT 就是补丁标志
    createVnode('p', { class: 'bar' }, 'text', PatchFlags.TEXT)
  ]) 
}
```

在上面这段代码中，用于创建 p 标签的 `createVNode` 函数调用存在的第四个参数，即 `PatchFlags.TEXT`。这个参数就是所谓的补丁标志，它代表当前虚拟 DOM 节点是一个动态节点，并且动态因素是：具有动态的文本子节点。这样就实现了对动态节点的标记。

下一步我们要思考的是如何将根节点变成一个 `Block`，以及如何将动态子代节点收集到该 `Block` 的 `dynamicChildren` 数组中。这里有一个重要的事实，即在渲染函数内，对 `createVNode` 函数的调用时层层的嵌套结构，并且该函数的执行顺序时 “内层先执行，外层后执行”。

当外层 `createVNode` 函数执行时，内层的 `createVNode` 函数已经执行完毕了。因此，为了让外层 `Block` 节点能够收集到内层动态节点，就需要一个栈结构的数据来临时存储内容的动态节点。

```js
// 动态节点栈
const dynamicChildrenStack = []
// 当前动态节点集合
let currentDynamicChildren = null
// openBlock 用来创建一个新的动态节点集合，并将该集合压入栈中
function openBlock() {
  dynamicChildrenStack.push({currentDynamicChildren = []})
}
// closeBlock 用来将通过 openBlock 创建的动态节点集合从栈中弹出
function closeBlock() {
  currentDynamicChildren = dynamicChildrenStack.pop()
}
```

接着，我们还需要调整 `createVNode` 函数，如下面的代码所示：

```js
function createVNode(tag, props, children, flags) {
  const key = props && props.key
  props && delete props.key
  
  const vnode = {
  	tag,
    props,
    children,
    key,
    patchFlags: flags
  }

  if (typeof flags !== 'undefined' && currentDynamicChildren) {
    // 动态节点，将其添加到当前动态集合中
    currentDynamicChildren.push(vnode)
  }

  return vnode
}
```

在 `createVNode` 函数内部，检测节点是否存在补丁标志。如果存在，则说明该节点是动态节点，于是将其添加到当前动态集合 `currentDynamicChildren` 中。

最后，我们需要重新设计渲染函数的执行方式。

```js
function createBlock(tag, props, children) {
  // block 本质上也是一个 vnode
  const block - createVNode(tag, props, children)
  // 将当前动态节点集合作为 block.dynamicChildren
  block.dynamicChildren = currentDynamicChildren

  // 关闭 block
  closeBlock()
  // 返回 block
  return block
}

render() {
  // 1. 使用 createBlock 代替 createVNode 来创建 Block
  // 2. 每当调用 createBlock 之前，先调用 openBlock
  return (openBlock(), createBlock('div', null, [
    createVNode('p', { class: 'foo' }, null, 1),
    createVNode('p', { class: 'bar' }, null)
  ]))
}
```

观察渲染函数内的代码可以发下吗，我们利用逗号运算符的性质来保证渲染函数的返回仍然是 `VNode` 对象。这里的关键点是 `createBlock` 函数，任何应该作为 `Block` 角色的虚拟节点，都应该使用该函数来完成虚拟节点的创建。由于 `createVNode` 函数和 `createBlock` 函数的执行顺序是从内向外，所以当 `createBlock` 函数执行时，内层的所有 `createVNode` 函数都已经执行完毕了。这时，`currentDynamicChildren` 数组中所存储的就是属于当前 `Block` 的所有动态子代节点。因此，我们只需要将 `currentDynamicChildren` 数组作为 `block.dynamicChildren` 属性的值即可。这样，我们就完成了动态节点的收集。

##### 渲染器的运行时支持

现在，我们已经有了动态节点集合 `vnode.dynamicChildren` ，以及附着其上的补丁标志。基于这两点，即可在渲染器中实现靶向更新。

回顾一下传统的节点更新方式，如下面的 `patchElement` 函数所示。

```js
function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props
  
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patchProps(el, key, oldProps[key], newProps[key])
    }
  }
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patchProps(el, key, oldProps[key], null)
    }
  }

  patchChildren(n1, n2, el)
}
```

由上面的代码可知，浏览器在更新标签节点时，使用 `patchChildren` 函数来更新标签的子节点。但该函数会使用传统虚拟 DOM 的 Diff 算法进行更新，这样做效率比较低。有了 `dynamicChildren` 之后，我们可以直接对比动态节点。

```js
function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props

  // 省略部分代码

  if (n2.dynamicChildren) {
    // 调用 patchBlockChildren 函数，只会更新动态节点
    patchBlockChildren(n1, n2)
  } else {
    patchChildren(n1, n2, el)
  }
}

function patchBlockChildren(n1, n2) {
  // 只更新动态节点即可
  for (let i = 0; i < n2.dynamicChildren.length; i++) {
    patchElement(n1.dynamicChildrenp[i], n2.dynamicChildren[i])
  }
}
```

在修改后的 `patchElement` 函数中，我们优先检测虚拟 DOM 是否存在动态节点集合，即 `dynamicChildren` 数组。如果存在，则直接调用 `patchBlockChildren` 函数完成更新。这样，渲染器只会更新动态节点，而跳过所有静态节点。

动态节点集合能够使渲染器在执行更新时跳过静态节点，但对于单个动态节点的更新来说，由于它存在对应的补丁标志，因此我们可以针对性地完成靶向更新。

```js
function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props

  if (n2.patchFlags) {
    // 靶向更新
    if (n2.patchFlags === 2) {
      // 只需要更新 class
    } else if (n2.patchFlags === 4) {
      // 只需要更新 style
    } else if (...) {
      // ...
    }
  } else {
    // 全量更新
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patchProps(el, key, oldProps[key], newProps[key])
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProps(el, key, oldProps[key], null)
      }
    }
  }

  if (n2.dynamicChildren) {
    // 调用 patchBlockChildren 函数，只会更新动态节点
    patchBlockChildren(n1, n2)
  } else {
    patchChildren(n1, n2, el)
  }
}
```

可以看到，在 `patchElement` 函数内，我们通过检测补丁标志实现了 `props` 的靶向更新。这样就避免了全量的 `props` 更新，从而最大化地提升性能。

#### Block 树

在上一节中，我们约定了组件模板的根节点必须作为 Block 角色。这样，从根节点开始，所有动态子代节点都会被收集到根节点的 `dynamicChildren` 数组中。但是，如果只有根节点是 Block 角色，是不会形成 Block 树的。既然会形成 Block 树，那就意味着除了根节点之外，还会有其他特殊节点充当 Block 角色。实际上，带有结构化指令的节点，如带有 `v-if`、`v-for` 指令的节点，都应该作为 Block 角色。

##### 带有 v-if 指令的节点

首先，我们来看下这段模板：

```vue
<div>
  <section v-if="foo">
  	<p>{{ a }}</p>
  </section>
  <div v-else>
    <p>{{ a }}</p>
  </div>
</div>
```

假设只有最外层的 div 标签会作为 Block 角色。那么，无论变量 foo 的值是 true 还是 false，block 收集到的动态节点都是不变的。

```js
const block = {
  tag: 'div',
  dynamicChildren: [
    { tag: 'p', children: ctx.a, patchFlags: 1 }
  ]
}
```

这意味着，在 Diff 阶段不会做任何更新。但是我们也看到了，在上面的模板中，带有 v-if 指令的是 `<section>` 标签，而带有 `v-else` 指令的是 `<div>` 标签。很明显，更新前后的标签不同，如果不做任何更新，将产生严重的 bug。不仅如此，下面的模板也会出现同样的问题。

```vue
<div>
  <section v-if="foo">
  	<p>{{ a }}</p>
  </section>
  <section v-else>
    <div>
      <p>{{ a }}</p>
    </div>
  </section>
</div>
```

在上面这段模板中，即使带有 `v-if` 指令的标签与带有 `v-else` 指令的标签都是 `<section>` 标签，但由于两个分支的虚拟 DOM 树的结构不同，仍然会导致更新失败。

上述问题的根本原因在于，`dynamiChildren` 数组中收集的动态节点是忽略虚拟 DOM 树层级的。换句话来说，结构化指令会导致更新前后模板的结构发生变化，即模板结构不稳定。那么，如何让虚拟 DOM 树的结构变稳定呢？其实很简单，只需要让带有 `v-if/v-else-if/v-else` 等结构化的节点也作为 Block 角色即可。

以下面的模板为例：

```vue
<div>
  <section v-if="foo">
  	<p>{{ a }}</p>
  </section>
  <section v-else>
    <div>
      <p>{{ a }}</p>
    </div>
  </section>
</div>
```

如果上面这段模板中的两个 `<section>` 标签都作为 Block 角色，那么将构成一棵 Block 树：

```js
Block(div)
	-	Block(Section v-if)
	- Block(Section v-else)
```

父级 Block 除了会收集动态子代节点之外，也会收集子 Block。因此，两个 Block(section) 将作为父级 Block(div) 的动态节点被收集到父级 Block(div) 的 `dynamicChildren` 数组中，如下面的代码所示：

```js
const block = {
  tag: 'div',
  dynamicChildren: [
    /* Block(Section v-if) or Block(Section v-else) */
    { tag: 'section', children: { key: 0 /* key 值会根据不同的 Block 而发生变化 */ }, dynamicChildren: [...]  }
  ]
}
```

这样，当 v-if 条件为真时，父级 Block 的 `dynamicChildren` 数组中包含的是 Block(section v-if)，当 v-if 条件为假时，父级 Block 的 `dynamicChildren` 数组中包含的将是 Block(section v-else)。在 Diff 过程中，渲染器能够根据 Block 的 key 值区分处更新前后的两个 Block 是不同的，并使用新的 Block 替换旧的 Block。这样就解决了 DOM 结构不稳定引起的更新问题。

##### 带有 v-for 指令的节点

不仅带有 v-if 指令的节点会让虚拟 DOM 树的结构不稳定，带有 v-for 指令的节点也会让虚拟 DOM 树变得不稳定，而后者的情况会稍微复杂一些。以下面的模板为例：

```vue
<div>
  <p v-for="item in list">{{ item }}</p>
  <i>{{ foo }}</i>
  <i>{{ bar }}</i>
</div>
```

假设 list 是一个数组，在更新过程中，list 数组的值由 `[1, 2]` 变为 `[1]`。按照之前的思路，即只有节点会作为 Block 角色，那么，上面的模板中，只有最外层的 `<div>` 标签会作为 Block。所以，这段模板在更新前后对应的 Block 树是：

```js
// 更新前
const prevBlock = {
  tag: 'div',
  dynamicChildren: [
    { tag: 'p', children: 1, patchFlags: 1 },
    { tag: 'p', children: 2, patchFlags: 1 },
    { tag: 'i', children: ctx.foo, patchFlags: 1 }
    { tag: 'i', children: ctx.bar, patchFlags: 1 }
  ]
}

// 更新后
const prevBlock = {
  tag: 'div',
  dynamicChildren: [
    { tag: 'p', children: 1, patchFlags: 1 },
    { tag: 'i', children: ctx.foo, patchFlags: 1 }
    { tag: 'i', children: ctx.bar, patchFlags: 1 }
  ]
}
```

观察上面这段代码，更新前的 Block 树（`prevBlock`）中有四个动态节点，而更新后的 Block 树（`nextBlock`）中只有三个动态节点。这时要如何进行 `Diff` 操作呢？你可能会说，使用更新前后的两个 `dynamicChildren` 数组内的节点进行传统 `DIff` 不就可以吗？这么做渲染是不对的，因为传统 Diff 的一个非常重要的前置条件是：进行 Diff 操作的节点必须是同层级节点。但是 `dynamicChildren` 数组内的节点未必是同层级的，这一点我们之前也提到过。

实际上，解决方法也很简单，我们只需要让带有 v-for 指令的标签也作为 Block 角色即可。这样就能保证虚拟 DOM 树具有稳定的结构，即无论 v-for 在运行时怎样变化，这棵 Block 树看上去都是一样的。

```js
const block = {
  tag: 'div',
  dynamicChildren: [
    // 这是一个 Block，它有 dynamicChildren
    { tag: Fragment, dynamicChildren: [/* v-for 的节点 */] },
    { tag: 'i', children: ctx.foo, patchFlags: 1 }
    { tag: 'i', children: ctx.bar, patchFlags: 1 }
  ]
}
```

由于 v-for 指令渲染的是一个片段，所以我们需要使用类型为 `Fragment` 的节点来表达 v-for 指令的渲染结果，并作为 Block 角色。

##### Fragment 的稳定性

上一节中，我们使用了一个 `Fragment` 来表达 v-for 循环产生的虚拟节点，并让其充当 Block 的角色来解决 v-for 指令导致的虚拟 DOM 树结构不稳定的问题。但是，我们需要仔细研究这个 `Fragment` 节点本身。

给出下面这段模板：

```vue
<p v-for="item in list">{{ item }}</p>
```

当 list 数组是由 `[1, 2]` 变成 `[1]` 时，Fragment 节点在更新前后对应的内容分别是：

```js
// 更新前
const prevBlock = {
	tag: Fragment,
  dynamicChildren: [
    { tag: 'p', children: item, patchFlags: 1 }
  	{ tag: 'p', children: item, patchFlags: 1 }
  ]
}

// 更新后
const prevBlock = {
	tag: Fragment,
  dynamicChildren: [
    { tag: 'p', children: item, patchFlags: 1 }
  ]
}
```

我们发现，Fragment 本身收集的动态节点仍然面临结构不稳定的情况。所谓结构不稳定，从结果上看，指的是更新前后一个 block 的 `dynamicChildren` 数组中收集的动态节点的数量或顺序不一致。这种不一致会导致我们无法直接进行靶向更新。对于这种情况，没有更好的解决办法，我们只能放弃根据 `dynamicChildren` 数组中的动态节点进行靶向更新的思路，回退到传统虚拟 DOM 的 Diff 手段，即直接使用 Fragment 的 children 而非 `dynamicChildren` 来进行 Diff 操作。

但需要注意的是，Fragment 的子节点（children）仍然可以是由 Block 组成的数组，例如：

```js
const block = {
  tag: Fragment,
  children: [
    { tag: 'p', children: item, dynamicChildren: [/*...*/], patchFlags: 1 }
  	{ tag: 'p', children: item, dynamicChildren: [/*...*/], patchFlags: 1 }
  ]
}
```

这样，当 Fragment 的子节点进行更新时，就可以恢复优化模式。

既然有不稳定的 Fragment，那就有稳定的 Fragment。那什么样的 Fragment 是稳定的呢？有以下几种情况。

**1. v-for 指令的表达式是常量：**

```vue
<p v-for="n in 10"></p>
<!-- 或者 -->
<p v-for="s in 'abc'"></p>
```

由于表达式 10 和 `'abc'` 是常量，所以无论怎么更新，上面两个 Fragment 都不会变化，因为这两个 Fragment 是稳定的。对于稳定的 Fragment，我们不需要回退到传统 Diff 操作，这在性能上会有一定的优势。

**2. 模板有多个根节点**

Vue.js 3 不再限制组件的模板必须有且仅有一个根节点。当模板中存在多个根节点时，我们需要使用 Fragment 来描述它。

```vue
<template>
	<div></div>
	<p></p>
	<i></i>
</template>
```

同时，用于描述具有多个根节点的模板的 Fragment 也是稳定的。

#### 静态提升

理解了 Block 树之后，我们再来看其他方面的优化，其中之一就是静态提升。它能减少更新时创建虚拟 DOM 带来的性能开销和内存占用。

假设我们有如下模板：

```vue
<div>
  <p>static text</p>
  <p>{{ title }}</p>
</div>
```

在没有静态提升的情况下，它对应的渲染函数是：

```js
function render() {
  return (openBlock(), crateBlock('div', null, [
    createVNode('p', null, 'static text'),
    createVNode('p', null, ctx.title, 1)
  ]))
}
```

可以看到，在这段虚拟 DOM 的描述中存在两个 p 标签，一个是纯静态的，而另一个拥有动态文本。当响应式数据 title 的值发生变化时，整个渲染函数会重新执行，并产生新的虚拟 DOM 树。这个过程有一个很明显的问题，即纯静态的虚拟节点在更新时也会被重新创建一次。很显然，这是没有必要的，所以我们需要想办法避免由此带来的性能开销。而解决方案就是所谓的 “静态提升”，即把纯静态的节点提升到渲染之外，如下面的代码所示：

```js
// 把静态节点提升到渲染函数之外
const hoist = crateVNode('p', null, 'text')

function render() {
  return (openBlock(), crateBlock('div', null, [
    hoist, // 静态节点引用
    createVNode('p', null, ctx.title, 1)
  ]))
}
```

可以看到，当把纯静态的节点提升到渲染函数之外后，在渲染函数内只会持有对静态节点的引用。当响应式数据变化，并使得渲染函数重新执行时，并不会重新创建静态的虚拟节点，从而避免了额外的性能开销。

需要强调的是，静态提升是以树为单位的。以下面的模板为例：

```vue
<div>
  <section>
  	<p>
      <span>abc</span>
    </p>
  </section>
</div>
```

在上面这段模板中，除了根节点的 div 标签会作为 Block 角色而不可被提升之外，整个 `<section>` 元素及其子代节点都会被提升。如果我们把上面模板中的静态字符串 `abc` 换成动态绑定的 `{{ abc }}`，那么整棵树都不会被提升。

虽然包括动态绑定的节点本身不会被提升，但是该动态节点上仍然可能存在纯静态的属性，如下面的模板所示：

```vue
<div>
  <p foo="bar" a=b>{{ text }}</p>
</div>
```

在上面这段模板中，p 标签存在动态绑定的文本内容，因此整个节点都不会被静态提升。但该节点的所有 props 都是静态的，因此在最终生成渲染函数时，我们可以将纯静态的 props 提升到渲染函数之外。

```js
// 静态提升的 props 对象
const hoistProp = { foo: 'bar', a: 'b' }

function render(ctx) {
  return (openBlock(), crateBlock('div', null, [
    createVNode('p', hoistProp, ctx.title)
  ]))
}
```

这样做同样可以减少创建虚拟 DOM 产生的开销以及内存占用。

#### 预字符串化

基于静态提升，我们还可以进一步采用预字符串的优化手段。预字符串化是基于静态提升的一种优化策略。静态提升的虚拟节点或虚拟节点树本身是静态的，那么，能否将其预字符串化呢？如下面的模板所示：

```vue
<div>
  <p></p>
  <p></p>
  <!-- ... 20 个 p 标签 -->
  <p></p>
</div>
```

假设上面的模板中包含大量连续纯静态的标签节点，当采用静态提升优化策略时，其编译后的代码如下：

```js
const hoist1 = createVNode('p', null, null, PatchFlags.HOISTED)
const hoist2 = createVNode('p', null, null, PatchFlags.HOISTED)
// ...
const hoist20 = createVNode('p', null, null, PatchFlags.HOISTED)

function render() {
  return (openBlock(), crateBlock('div', null, [
    hoist1,
    hoist2,
    // ...
    hoist20
  ]))
}
```

预字符串化能够将这些静态节点序列化为字符串，并生成一个 Static 类型的 VNode：

```js
const hoistStatic = createStaticVNode('<p></p><p></p>...<p></p>')

function render() {
  return (openBlock(), crateBlock('div', null, [
 		hoistStatic
  ]))
}
```

这么做有几个很明显的优势。

* 大块的静态内容可以通过 `innerHTML` 进行设置，在性能上具有一定优势；
* 减少创建虚拟节点产生的性能开销；
* 减少内存占用。

#### 缓存内联事件处理函数

提到优化，就不得不对内联事件处理函数的缓存。缓存内联事件处理函数可以避免不必要的更新。假设模板内容如下：

```vue
<Comp @change="a + b" />
```

上面这段模板展示的是一个绑定了 change 事件的组件，并且为 change 事件绑定的事件处理程序是一个内联语句。对于这样的模板，编译器会为其创建一个内联事件处理函数，如下面的代码所示：

```js
function render(ctx) {
  return h(Comp, {
    // 内联事件处理函数
    onChange: () => (ctx.a + ctx.b)
  })
}
```

很显然，每次重新渲染时（即 render 函数重新执行时），都会为 Comp 组件创建一个全新的 props 对象。同时，props 对象中 `onChange` 属性的值也会是全新的函数。这会导致渲染器对 Comp 组件进行更新，造成额外的性能开销。为了避免这类无用的更新，我们需要对内联事件处理函数进行缓存，如下面的代码所示：

```js
function render(ctx, cache) {
  return h(Comp, {
    // 将内联事件处理函数缓存到 cache 数组中
    onChange: cache[0] || (cache[0] = ($event) => (ctx.a + ctx.b))
  })
}
```

渲染函数的第二个参数是一个数组 `cache`，该数组来自组件实例，我们可以把内联事件处理函数添加到 `cache` 数组中。这样，当渲染函书重新执行并创建新的虚拟 DOM 树时，会优先读取缓存中的事件处理函数。这样，无论执行多少次渲染函数，props 对象中 `onChange` 属性的值始终不变，于是就不会触发 Comp 组件更新了。

#### v-once

Vue.js 3 不仅会缓存内联事件处理函数，配置 v-once 还可以实现对虚拟 DOM 的缓存。Vue.js 2 也支持 v-once 指令，当编译器遇到 `v-once`　指令时，会利用我们之前介绍的 cache 数组来缓存渲染函数的全部或部分执行结果，如下面的模板所示：

```vue
<section>
	<div v-onece>{{ foo }}</div>
</section>
```

在上面这段模板中，div 标签存在动态绑定的文本内容。但是它被 v-once 指令标记，所以这段模板会被编译为：

```js
function render(ctx, cache) {
  return (openBlock(), crateBlock('div', null, [
    cache[1] || (cache[1] = createVNode('div', null, ctx.foo, 1))
  ]))
}
```

从编译结果可以看到，该 div 标签对应的虚拟节点被缓存到了 cache 数组中。既然虚拟节点已经被缓存了，那么后续更新导致渲染函数重新执行时，会优先读取缓存的内容，而不会重新创建虚拟节点。同时，由于虚拟节点被缓存，意味着更新前后的虚拟节点不会发生变化，因此就不需要这些被缓存的虚拟节点参与 Diff 操作了。所以在实际编译后的代码中经常出现下面这段内容：

```js
function render(ctx, cache) {
  return (openBlock(), crateBlock('div', null, [
    cache[1] || (
    	setBlockTracking(-1), // 阻止这段 vnode 被 Block 收集
      cache[1] = h('div', null, ctx.foo, 1),
      setBlockTracking(1), // 恢复
      cache[1] // 表达式的值
    )
  ]))
}
```

注意上面这段代码中的 `setBlockTracking(-1)` 函数调用，它用来暂停动态节点的收集。因为，使用 v-once 包裹的动态节点不会被父级 Block 收集。因此，被 v-once 包裹的动态节点在组件更新时，也不应参与 Diff 操作。

v-once 指令通常用于不会发生改变的动态绑定中，例如绑定一个常量：

```vue
<div>{{ SOME_CONSTANT }}</div>
```

为了提升性能，我们可以使用 v-once 来标记这段内容：

```vue
<div v-once>{{ SOME_CONSTANT }}</div>
```

这样，在组件更新时就会跳过这段内容的更新，从而提升性能。

实际上，v-once 指令能够从两个方面提升性能。

* 避免组件更新时重新创建 DOM 带来的性能开销。因为虚拟 DOM 被缓存，所以更新时无需重新创建；
* 避免无用的 Diff 开销。这是因为被 v-once 标记的虚拟 DOM 树会被父级 Block 节点收集。

#### 总结

本篇文章，我们主要讨论了 Vue.js 3 在编译优化方面所做的努力。编译优化指的是通过编译的手段提取关键信息，并以此指导生成最优代码的过程。具体来说，Vue.js 3 的编译器会充分分析模板，提取关键信息并将其附着到对应的虚拟节点上。在运行阶段，渲染器会通过这些关键信息执行 “快捷路径”，从而提升性能。

编译优化的核心在于，区分动态节点与静态节点。Vue.js 3 会为动态节点打上补丁标志，即 `patchFlag` 。同时，vue.js 3 还提出 Block 的概念，一个 Block 本质上也是一个虚拟节点，但与普通虚拟节点相比，会多出一个 `dynamicChildren` 数组，该数组用来收集所有动态子代节点。

> 利用 `createVNode` 函数和 `crateBlock` 函数的层层嵌套调用的特点，即以 "由内向外" 的方式执行。配合一个用来临时存储动态节点的节点栈，即可完成动态子代节点的收集。

由于 Block 会收集所有动态子代节点，所以对动态节点的对比操作是忽略 DOM 层级结构的。这会带来额外的问题，即 `v-if`、`v-for` 等结构化指令会影响 DOM 层级结构，使之不稳定。这会间接导致基于 Block 树的比对算法失效。解决方式很简单，只需要带有 `v-if`、`v-for` 等指令的节点也作为 Block 角色即可。

处理 Block 树以及补丁标志外，Vue.js 3 在编译优化方面还做了其他努力，具体如下：

* 静态提升：能够减少更新时创建虚拟 DOM 带啦的性能开销和内存占用。
* 预字符串化：在静态提升的基础上，对静态节点进行字符串化。这样做能够减少创建虚拟节点产生的性能开销以及内存占用。
* 缓存内联事件处理函数：避免造成不必要的组件更新。
* v-once 指令：缓存全部或部分虚拟节点，能够避免组件更新时重新创建虚拟 DOM 带来的性能开销，也可以避免无用的 Diff 操作。

### 六、服务端渲染

#### 同构渲染

Vue.js 可以用于构建客户端程序，组件的代码在浏览器中运行，并输出 DOM 元素。同时，Vue.js 还可以在 Node.js 环境中运行，它可以将同样的组件渲染为字符串并发送给浏览器。这实际上描述了 Vue.js 的两种渲染方式，即 **客户端渲染（client-side rendering，CSR）**，以及 **服务端渲染（server-side rendering，SSR）**。另外，Vue.js 作为现代前端框架，不仅能够独立地进行 CSR 或 SSR，还能将两者结合，形成所谓的 **同构渲染（isomorphic rendering）**。本篇文章，我们将探讨 CSR、SSR 以及同构渲染之间的异同，以及 Vue.js 同构渲染的实现机制。

##### CSR、SSR 以及同构渲染

在设计软件时，我们经常会遇到这样的问题：“是否应该使用服务端渲染？” 这个问题没有确切的答案，具体还是要看软件的需求以及场景。想要为软件选择合适的架构策略，就需要我们对不同的渲染策略做到了然于胸，知道它们各自的优缺点。

服务端渲染并不是一项新技术，也不是一个新概念。在 Web 2.0 之前，网站主要负责提供各种各样的内容，通常是一些新闻站点、个人博客、小说站点等。这些站点主要强调内容本身，而不强调于用户之间具有高强度的交互。当时的站点基本采用传统的服务端渲染技术实现。例如流行的 `PHP/JSP` 等技术。下面给出了服务端渲染的工作流程图。

<img src="./images/ssr.png" />

* 用户通过浏览器请求站点；
* 服务器请求 API 获取数据；
* 接口返回数据给服务器；
* 服务器根据模板和获取的数据拼接出最终的 HTML 字符串；
* 服务器将 HTML 字符串发送给浏览器，浏览器解析 HTML 内容并渲染。

当用户再次通过超链接进行页面跳转，会重复上述 5 个步骤。可以看到，传统的服务端渲染的用户体验非常差，任何一个微小的操作都有可能导致页面刷新。

后来以 AJAX 为代表，催生了 WEB 2.0。在这个阶段，大量的 SPA（single-page application）诞生，也就是接下来我们要介绍的 CSR 技术。与 SSR 在服务端完成模板和数据的融合不同，CSR 是在浏览器中完成模板与数据的融合，并渲染出最终的 HTML 页面。

<img src="./images/csr.png" />

* 客户端向服务器或 CDN 发送请求，获取静态的 HTML 页面。此时获取的 HTML 页面通常是空页面。在 HTML 页面中，会包含 `<style>`、`<link>` 和 `<script>` 等标签。浏览器在得到该页面后，不会渲染出任何内容，从用户的视角来看，此时页面处于 “白屏” 阶段。
* 虽然 HTML 页面是空的，但浏览器仍然会解析 HTML 内容。由于 HTML 页面中存在 `<link rel="stylesheet">` 和 `<script>` 等标签，所以浏览器会加载 HTML 中引用的资源，例如 `app.js` 和 `javascript` 代码进行解释和执行。因为页面的渲染任务是由 JavaScript 来完成的，所以只有当 JavaScript 被解析和执行后，才会渲染出页面内容，结束 “白屏” 状态。初始渲染出来的内容通常是一个 “骨架”，此时并没有请求 API 获取数据。
* 客户端通过 AJAX 技术请求 API 获取数据，一旦接口返回数据，客户端就会完成动态内容的渲染，并呈现完整页面。

当用户再次点击 “跳转” 到其他页面时，浏览器并不会真正地的进行跳转动作，即不会刷新页面，而是通过前端路由的方式动态地渲染页面，这对用户的交互体验会非常友好。但很明显的是，与 SSR 相比，CSR 会产生所谓的 “白屏” 问题。实际上，CSR 不仅仅会产生白屏问题，它对 SEO（搜索引擎优化）也不友好。

|                | SSR  | CSR    |
| -------------- | ---- | ------ |
| SEO            | 友好 | 不友好 |
| 白屏问题       | 无   | 有     |
| 占用服务器资源 | 多   | 少     |
| 用户体验       | 差   | 好     |

SSR 和 CSR 各有优缺点。SSR 对 SEO 更加友好，而 CSR 对 SEO 不太友好。由于 SSR 的内容到达时间更快，因此它不会产生白屏问题。相对地，CSR 会有白屏问题。另外，由于 SSR 是在服务端完成页面渲染的，所以它需要消耗更多服务端资源。CSR 则能够减少对服务端资源的消耗。对于用户体验，由于 CSR 不需要进行真正的 “跳转”，用户会感觉更加 “流畅”，所以 CSR 相比 SSR 具有更好的用户体验。

我们需要从项目的实际场景出发，决定到底采用哪一个。例如你的项目非常需要 SEO，那么就应该采用 SSR。

那么，我们能否融合 SSR 与 CSR 两者的优点于一身呢？答案是 “可以的”，这就是接下来我们要讨论的同构渲染。同构渲染分为首次渲染（首次访问或刷新页面）以及非首次渲染。

实际上，同构渲染中的首次渲染与 SSR 的工作流程是一致的。也就是说，当首次访问或者刷新页面时，整个页面的内容是在服务端完成渲染的，浏览器最终得到的是渲染好的 HTML 页面。但是该页面是纯静态的，这意味着用户还不能与页面进行任何交互，因为整个应用程序的脚本还没有加载和执行。另外，该静态的 HTML 页面中也会包含 `<link>`、`<script>` 等标签。除此之外，同构渲染所产生的 HTML 页面与 SSR 所产生的 HTML 页面有一点最大的不同，即前者会包含当前页面所需要的初始化数据。直白地说，服务器通过 API 请求的数据会被序列化为字符串并拼接到静态的 HTML 字符串中，最后一并发送给浏览器。这么做实际上是为了后续的激活操作。

假设浏览器已经接收到初次渲染的静态 HTML 页面，接下来浏览器会解析并渲染该页面。在解析过程中，浏览器会发现 HTML 代码中存在 `<link>` 和 `<script>` 标签，于是从 CDN 或服务器获取相应的资源，这一步与 CSR 一致。当 JavaScript 资源加载完毕后，会进行激活操作，这里的激活就是我们在 Vue.js 中常说的 "**hydration**"。激活包括两部分工作内容。

* Vue.js 在当前页面已经渲染的 DOM 元素以及 Vue.js 组件所渲染的虚拟 DOM 之间建立联系；
* Vue.js 从 HTML 页面中提取由服务端序列化后发送过来的数据，用以初始化整个 Vue.js 程序。

激活完成后，整个应用程序就会被 Vue.js 接管为 CSR 应用程序。后续操作都会按照 CSR 应用程序的流程执行。当然，如果刷新页面，仍然会进行服务端渲染，然后再进行激活。

|                | SSR  | CSR    | 同构渲染 |
| -------------- | ---- | ------ | -------- |
| SEO            | 友好 | 不友好 | 友好     |
| 白屏问题       | 无   | 有     | 无       |
| 占用服务器资源 | 多   | 少     | 中       |
| 用户体验       | 差   | 好     | 好       |

可以看到，同构渲染除了也需要部分服务端资源外，其他的方面的表现都非常好。由于同构渲染在首次渲染时和浏览器刷新时仍然需要服务端完成渲染工作，所以也需要部分服务端资源，但相比所有页面跳转都需要服务端资源完成渲染来说，同构渲染所占用的服务端资源相对较少。

另外，对同构渲染最多的误解就是，它能够提升 **可交互时间（TTI）**。事实是同构渲染仍然需要想 CSR 那样等待 JavaScript 资源加载完成，并且客户端激活完成后，才能影响用户操作。因此，理论上同构渲染无法提升可交互时间。

同构渲染的 “同构” 的含义是，同样一套代码既可以在服务端运行，也可以在客户端运行。例如，我们用 Vue.js 编写一个组件，该组件既可以在服务端运行，被渲染为 HTML 字符串；也可以在客户端运行，就像普通的 CSR 应用程序一样。

##### 将虚拟 DOM 渲染为字符串

既然 “同构” 指的是，同样的代码既能在服务端运行，也能在客户端运行。本小节我们就来讨论如何在服务端将虚拟 DOM 渲染为 HTML 字符串。

给出如下虚拟节点对象，它用来描述一个普通的 div 标签。

```js
const ElementVNode = {
  type: 'div',
  props: {
    id: 'foo'
  },
  children: [
    { type: 'p', children: 'hello' }
  ]
}
```

为了将虚拟节点 `ElementVNode` 渲染为字符串，我们需要实现 `renderElementVNode` 函数。该函数接收用来描述普通标签的虚拟节点作为参数，并返回渲染后的 HTML 字符串。

```js
function renderElementVNode(vode) {
  // 返回渲染后的结果，即 HTML 字符串
}
```

在不考虑任何边界条件的情况下，实现 `renderElementVNode` 非常简单。

```js
// 返回渲染后的结果，即 HTML 字符串
function renderElementVNode(vnode) {
  // 取出标签名称 tag 和标签属性 props，以及标签的子节点
  const { type: tag, props, children } = vnode
  // 开始标签的头部
  let ret = `<${ tag }`
  // 处理标签属性
  if (props) {
    for (const k in props) {
      ret += ` ${ k }="${ props[k] }"`
    }
  }
  // 开始标签的闭合
  ret += '>'

  // 处理子节点
  // 如果子节点的类型是字符串，则是文本内容，直接拼接
  if (typeof children === 'string') {
    ret += children
  } else if (Array.isArray(children)) {
    // 如果子节点的类型是数组，则递归地调用 renderElementVNode 完成渲染
    children.forEach(child => {
      ret += renderElementVNode(child)
    })
  }


  // 结束标签
  ret += `</${ tag }>`

  // 返回拼接好的字符串
  return ret
}
```

接着，我们可以调用 `renderElementVNode` 函数完成对 `ElementVNode` 的渲染：

```js
console.log(renderElementVNode(ElementVNode)) // <div id="foo"><p>hello</p></div>
```

可以看到，输出结果是我们所期望的 HTML 字符串。实际上，将一个普通标签类型的虚拟节点渲染为 HTML 字符串，本质上是字符串的拼接。不过，上面给出的 `renderElementVNode` 函数的实现仅仅用来展示将虚拟 DOM 渲染为 HTML 字符串的核心原理，并不满足生产要求，因为它存在以下几点缺陷。

* `renderElementVNode` 函数在渲染标签类型的虚拟节点时，还需要考虑该节点是否是自闭合标签。
* 对于属性（props）的处理会比较复杂，要考虑属性名称是否合法，还要对属性值进行 HTML 转义。
* 子节点的类型多种多样，可能是任意类型的虚拟节点，如 `Fragment`、组件、函数式组件、文本等，这些都需要处理。
* 标签的文本子节点也需要进行 HTML 转义。

上述这些问题都属于边界条件，接下来我们逐个处理。首先处理自闭合标签，它的术语叫做 `void element`，它的完整列表如下：

```js
const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'
```

可以看 WHATWG 的规范中查看完整的 void element。

对于 void element，由于它无须闭合标签，所以为此类标签生成 HTML 字符串时，无须为其生成对应的闭合标签，如下面的代码所示：

```js
const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'

// 返回渲染后的结果，即 HTML 字符串
function renderElementVNode(vnode) {
  // 取出标签名称 tag 和标签属性 props，以及标签的子节点
  const { type: tag, props, children } = vnode
  // 判断是否是 void element
  const isVoidElement = VOID_TAGS.split(',').includes(tag)

  // 开始标签的头部
  let ret = `<${ tag }`

  // 处理标签属性
  if (props) {
    for (const k in props) {
      ret += ` ${ k }="${ props[k] }"`
    }
  }

  // 开始标签的闭合，如果时 void element，则自闭合
  ret += isVoidElement ? '/>' : '>'
  // 如果是 void element，则直接返回结果，无须处理 children，因为 void element 没有 children
  if (isVoidElement) return ret

  // 处理子节点
  // 如果子节点的类型是字符串，则是文本内容，直接拼接
  if (typeof children === 'string') {
    ret += children
  } else if (Array.isArray(children)) {
    // 如果子节点的类型是数组，则递归地调用 renderElementVNode 完成渲染
    children.forEach(child => {
      ret += renderElementVNode(child)
    })
  }

  // 结束标签
  ret += `</${ tag }>`

  // 返回拼接好的字符串
  return ret
}
```

在上面这段代码中，我们增加了对 void element 的处理。需要注意的一点是，由于自闭合标签没有子节点，所以可以跳过对 children 的处理。

接下来，我们需要更加严谨地处理 HTML 属性。处理属性需要考虑多个方面，首先是对 boolean attribute 的处理。所谓 boolean attribute，并不是说这类属性的值是布尔类型，而是指，如果这类指令存在，则代表 true，否则代表 false。例如 `<input />` 标签的 `checked` 属性和 `disabled` 属性。

```html
<!-- 选中的 checkbox -->
<input type="checkbox" checked />
<!-- 未选中的 checkbox -->
<input type="checkbox" />
```

从上面这段 HTML 代码示例中可以看出，当渲染 boolean attribute 时，通常无须渲染它的属性值。

关于属性，另外一点需要考虑的是安全问题。WHATWG 规范的 13.1.2.3 节中明确定义了属性名称的组成。

属性名称必须有一个或多个非以下字符组成。

* 控制字符集（control character）的码点范围是：`[0x01, 0x1f]` 和 `[0x7f, 0x9f]`。
* U+0020（SPACE）、U+0022（”）、U+0027（‘）、U+003E（>）、U+002F（/）以及 U+002D（=）。
* nocharacters，这里的 nocharacters 代表 Unicode 永久保留的码点，这些码点在 Unicode 内部使用，它的取值范围是：`[0xFDD0, 0xFDEF]`，还包括：`0xFFFE`、`0xFFFF`、`0x1FFFE`、`0x1FFFF`、`0x2FFFE`、`0x3FFFE`、`0x3FFFF`、`0x4FFFE`、`0x4FFFF`、`0x5FFFE`、`0x5FFFF`、`0x6FFFE`、`0x6FFFF`、`0x7FFFE`、`0x7FFFF`、`0x8FFFE`、`0x8FFFF`、`0x9FFFE`、`0x9FFFF`、`0x10FFFE`、`0x10FFFF`、`0xAFFFE`、`0xAFFFF`、`0xBFFFE`、`0xBFFFF`、`0xCFFFE`、`0xCFFFF`、`0xDFFFE`、`0xDFFFF`、`0xEFFFE`、`0xEFFFF`、`0xFFFFE`、`0xFFFFF`。

考虑到 Vue.js 的模板编译器在编译过程中已经对 nocharacters 以及控制字符集做了处理，所以我们只需要小范围处理即可，任何不满足上述条件的属性名称都是不安全且不合法的。

另外，在虚拟节点中的 props 对象中，通常会包含仅用于组件运行时逻辑的相同属性。例如，key 属性仅用于虚拟 DOM 的 Diff 算法，ref 属性仅用于实现 template ref 的功能等。在进行服务端渲染时，应该忽略这些属性。初次之外，服务端渲染无须考虑事件绑定。因此，也应该忽略 props 对象中的事件处理函数。

更加严谨的属性处理方案如下：

```js
// 返回渲染后的结果，即 HTML 字符串
function renderElementVNode(vnode) {
  // 取出标签名称 tag 和标签属性 props，以及标签的子节点
  const { type: tag, props, children } = vnode
  // 判断是否是 void element
  const isVoidElement = VOID_TAGS.split(',').includes(tag)

  // 开始标签的头部
  let ret = `<${ tag }`

  // 处理标签属性
  if (props) {
    // 调用 renderAttrs 函数进行严禁处理
    ret += renderAttrs(props)
  }

  // 开始标签的闭合，如果时 void element，则自闭合
  ret += isVoidElement ? '/>' : '>'

  // 如果是 void element，则直接返回结果，无须处理 children，因为 void element 没有 children
  if (isVoidElement) return ret

  // 处理子节点
  // 如果子节点的类型是字符串，则是文本内容，直接拼接
  if (typeof children === 'string') {
    ret += children
  } else if (Array.isArray(children)) {
    // 如果子节点的类型是数组，则递归地调用 renderElementVNode 完成渲染
    children.forEach(child => {
      ret += renderElementVNode(child)
    })
  }

  // 结束标签
  ret += `</${ tag }>`

  // 返回拼接好的字符串
  return ret
}
```

可以看到，在 `renderElementVNode` 函数内，我们调用了 `renderAttrs` 函数来实现对 props 的处理。`renderAttrs` 属性的具体实现如下：

```js
// 应该忽略的属性
const shouldIgnoreProp = ['key', 'ref']

function renderAttrs(props) {
  let ret = ''
  for (const key in props) {
    if (
      // 检测属性名称，如果是事件或应该被忽略的属性，则忽略它
      shouldIgnoreProp.includes(key) || 
      /^on[^a-z]/.test(key)
    ) {
      continue
    }
    const value = props[key]
    // 调用 renderDynamicAttr 完成属性的渲染
    ret += renderDynamicAttr(key, value)
  }
  return ret
}
```

`renderDynamicAttr` 函数的实现如下：

```js
// 用来判断属性是否是 boolean attribute
const isBooleanAttr = (key) =>
  (
    `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly,` + 
    `async,autofocus,autoplay,controls,default,defer,disabled,hidden,` + 
    `loop,open,required,reversed,scoped,seamless,` + 
    `checked,muted,multiple,selected`  
  ).split(',').includes(key)

// 用来判断属性名称是否合法且安全
const isSSRSafeAttriName = (key) => !(/[>/="'\u0009\u000a\u000c\u0020]/.test(key))

function renderDynamicAttr(key, value) {
  if (isBooleanAttr(key)) {
    // 对于 boolean attribute，如果值为 false，则什么都不需要渲染，否则只需要渲染 key
    return value === false ? '' : ` ${ key }`
  } else if (isSSRSafeAttriName(key)) {
    // 对于其他安全的属性，执行完整的渲染
    // 注意：对于属性值，我们需要对它执行 HTML 转义操作
    return value === '' ? ` ${ key }` : ` ${ key }="${ escapeHtml(value) }"`
  } else {
    // 跳过不安全的属性，并打印警告信息
    console.warn(
      `[@vue/server-renderer] Skipped rendering unsafe attribute name: ${ key }`
    )
    return ``
  }
}
```

这样我们就实现了对普通元素类型的虚拟节点的渲染。实际上，在 Vue.js 中，由于 class 和 style 这两个属性可以使用多种合法的数据结构来表示，例如 class 的值可以是字符串、对象、数组，所以理论上我们还需要考虑这些情况。不过原理都是相同的，对于使用不同数据结构表示的 class 或 style，我们只需要将不同类型的数据结构序列化字符串表示即可。

另外，观察上面代码中的 `renderDynamicAttr` 函数的实现能够发现，在处理属性值时，我们调用了 `escapeHtml`　对其进行转义处理，这对于防御 XSS 攻击至关重要。HTML 转义指的是将特殊字符转换为对应的 HTML 实体。其转换规则很简单。

* 如果该字符串作为普通内容被拼接，则应该对以下字符进行转义。
  * 将字符 & 转义为实体 `&amp;` 。
  * 将字符 < 转义为实体 `&lt;`。
  * 将字符 > 转义为实体 `&gt;`。
* 如果该字符作为属性值被拼接，那么除了上述三个字符应该被转义之外，还应该转义下面讲个字符。
  * 将字符 " 转义为实体 `&quot;`。
  * 将字符 ' 转义为实体 `&#39;`。

具体实现如下：

```js
const escapeRE = /["'&<>]/
function escapeHtml(string) {
  const str = '' + string
  const match = escapeRE.exec(str)

  if (!match) return str

  let html = ''
  let escaped
  let index
  let lastIndex
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 43: // "
        escaped = '&quot;'
        break
      case 38: // &
        escaped = '&amp;'
        break
      case 39: // '
        escaped = '&#39;'
        break
      case 60: // <
        escaped = '&lt;'
        break
      case 62:
        escaped = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escaped
  }

  return lastIndex != index ? html + str.substring(lastIndex, index) : html
}
```

原理很简单，只需要在给定字符串中查找需要转义的字符，然后将其替换为对应的 HTML 实体即可。

> [代码地址](https://github.com/yw0525/notes/blob/master/books/Vue.js%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0/ssr/index01.js)

##### 将组件渲染为 HTML 字符串

我们已经讨论了如何将普通标签类型的虚拟节点渲染为 HTML 字符串。本节，我们将在此基础上，讨论如何将组件类型的虚拟节点渲染为 HTML 字符串。

假设我们有如下组件，以及用来描述组件的虚拟节点：

```js
const MyComponent = {
  setup() {
    return () => {
      // 该组件渲染一个 div 标签
      return {
        type: 'div',
        children: 'hello'
      }
    }
  }
}

// 用来描述组件的 VNode 对象
const CompVNode = {
  type: MyComponent
}
```

我们将实现 `renderComponentVNode` 函数，并用它把组件类型的虚拟节点渲染为 HTML 字符串：

```js
const html = renderComponentVNode(CompVNode)
console.log(html) // <div>hello</div>
```

实际上，把组件渲染为 HTML 字符串与把普通标签节点渲染为 HTML 字符串并没有本质区别。我们知道，组件的渲染函数用来描述组件要渲染的内容，它的返回值是虚拟 DOM。所以，我们只需要执行组件的渲染函数取得对应的虚拟 DOM，再将该虚拟 DOM 渲染为 HTML 字符串，并作为 `renderComponentVNode` 函数的返回值即可。

```js
function renderComponentVNode(vnode) {
  // 获取 setup 组件选项
  let { type: { setup } } = vnode
  // 执行 setup 函数得到渲染函数 render
  const render = setup()
  // 执行渲染函数得到 subTree，即组件要渲染的内容
  const subTree = render()
  // 调用 renderElementVNode 完成渲染，并返回结果
  return renderElementVNode(subTree)
}

const html = renderComponentVNode(CompVNode)
console.log(html) // <div>hello</div>
```

上面这段代码的逻辑非常简单，它仅仅展示了渲染组件的最基本原理，但仍然存在很多问题。

* `subTree` 本身可能是任意类型的虚拟节点，包括组件类型。因此，我们不能直接使用 `renderElementVNode` 来渲染它。
* 执行 setup 函数是，也应该提供 `setupContext` 对象。执行渲染函数 render 时，也应该将其 this 指向 `renderContext` 对象。在组件在初始化和渲染时，需要初始化 data，需要得到 setup 函数的执行结果，并检查 setup 函数的返回值是函数还是 `setupState` 等。

对于第一个问题，我们可以通过封装通用函数来解决，如下面 `renderVNode` 函数的代码所示：

```js
function renderVNode(vnode) {
  const type = typeof vnode.type

  if (type === 'string') {
    return renderElementVNode(vnode)
  } else if (type === 'object' || type === 'function') {
    return renderComponentVNode(vnode)
  } else if (vnode.type === Text) {
    // 处理文本
  } else if (vnode.type === Fragment) {
    // 处理片段
  } else {
    // 其他 VNode 类型
  }
}
```

有了 `renderVNode` 后，我们就可以在 `renderComponentVNode` 中使用它来渲染 `subTree` 。

```js
function renderComponentVNode(vnode) {
  // 获取 setup 组件选项
  let { type: { setup } } = vnode
  // 执行 setup 函数得到渲染函数 render
  const render = setup()
  // 执行渲染函数得到 subTree，即组件要渲染的内容
  const subTree = render()
  // 调用 renderVNode 完成渲染，并返回结果
  return renderVNode(subTree)
}
```

第二个问题涉及组件的初始化流程。下图是组件在客户端渲染时的整体流程。

<img src="./images/component_lifecycle.png" />

在进行服务端渲染时，组件的初始化流程与客户端渲染时组件的初始化流程基本一致，但存在两个重要的区别：

* 服务端渲染的是应用的当前快照，不存在数据变更后重新渲染的情况。因此，所有数据在服务器都无须是响应式的。利用这一点，我们可以减少服务端渲染过程中创建响应式对象的开销。
* 服务端渲染只需要获取组件要渲染的 `subTree` 即可，无须调用渲染器完成真实 DOM 的创建。因此，在服务端渲染时，可以忽略 “设置 render effect 完成渲染这一步”。

<img src="./images/component_lifecycle02.png" />

可以看到，只需要对客户端初始化组件的逻辑稍作调整，即可实现组件在服务端的渲染。另外，由于组件在服务端渲染时，不需要渲染真实 DOM 元素，所以无须创建并执行 `render effect`。这意味着，组件的 `beforeMount` 以及  `mounted` 钩子不会被触发。而且，由于服务端渲染不存在数据变更后的重新渲染逻辑，所以 `beforeUpdate` 和 `updated` 钩子也不会在服务端执行。

```js
function renderComponentVNode(vnode) {
  const isFUnctional = typeof vnode.type === 'function'
  let componentOptions = vnode.type

  if (isFUnctional) {
    componentOptions = {
      render: vnode.type,
      props: vnode.type.props
    }
  }

  let { render, data, setup, beforeCreate, created, props: propsOption } = componentOptions

  beforeCreate && beforeCreate()

  // 无须使用 reactive() 创建 data 的响应式版本
  const state = data ? data() : null
  const [props, attrs] = resolveProps(propsOption, vnode.props)

  const slots = vnode.children || {}

  const instance = {
    state,
    props, // props 无须 shallowReactive
    isMounted: false,
    subTree: null,
    slots,
    mounted: [],
    keepAliveCtx: null
  }

  function emit(event, ...payload) {
    const eventName = `on${ event[0].toUpperCase() + event.slice(1) }`
    const handler = instance.props[eventName]
    if (handler) {
      handler(...payload)
    } else {
      console.error('事件不存在')
    }
  }

  // setup
  let setupState = null
  if (setup) {
    const setupContext = { attrs, emit, slots }
    const prevInstance = setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), setupContext)
    setCurrentInstance(prevInstance)
    if (typeof setupResult === 'function') {
      if (render) console.error('setup 函数返回渲染函数，render 选项被忽略')
    } else {
      setupState = setupContext
    }
  }

  vnode.component = instance

  const renderContext = new Proxy(instance, {
    get (t, k, r) {
      const { state, props, slots } = t

      if (k === '$slots') return slots

      if (state && k in state) {
        return state[k]
      } else if (k in props) {
        return props[k]
      } else if (setupState && k in setupState) {
        return setupState[k]
      } else {
        console.error('不存在')
      }
    },
    set(t, k, v, r) {
      const { state, props } = t
      if (state && k in state) {
        return state[k]
      } else if (k in props) {
        return props[k]
      } else if (setupState && k in setupState) {
        return setupState[k]
      } else {
        console.error('不存在')
      }
    }
  })

  created && created.call(renderContext)

  const subTree = render.call(renderContext, renderContext)

  return renderVNode(subTree)
}
```

观察上面的代码可以发现，该实现与客户端渲染的逻辑基本一致。唯一的区别在于，在服务端渲染时，无需使用 `reactive` 函数为 data 数据创建响应式版本，并且 props 数据也无需是浅响应式的。

##### 客户端激活的原理

讨论完如何将组件渲染为 HTML 字符串之后，我们再来讨论客户端激活的实现原理。

对于同构渲染来说，组件的代码在服务端和客户端分别执行一次。在服务端，组件会被渲染为静态的 HTML 字符串，然后发送给浏览器，浏览器再把这段纯静态的 HTML 渲染出来。这意味着，此时页面中已经存在对应的 DOM 元素。同时，该组件还会被打包到一个 JavaScript 文件中，并在客户端被下载到浏览器中解释并执行。这时问题就来了，当组件的代码在客户端执行时，会再次创建 DOM 元素吗？答案是 “不会”。由于浏览器在渲染由服务端发送过来的 HTML 字符串之后，页面中已经存在对应的 DOM 元素，所以组件代码在客户端运行时，不需要再次创建相应的 DOM 元素。但是，组件代码在客户端运行时，仍然需要做两件重要的事：

* 在页面中的 DOM 元素与虚拟节点对象之间建立联系；
* 为页面中的 DOM 元素添加事件绑定。

我们知道，一个虚拟节点被挂载之后，为了保证更新程序能正常运行，需要通过该虚拟节点的 `vnode.el` 属性存储对真实 DOM 对象的引用。同构渲染也是一样，为了应用程序在后续更新过程中能够正常运行，我们需要在页面中已经存在的 DOM 对象与虚拟节点对象之间建立正确的联系。另外，在服务端渲染的过程中，会忽略虚拟节点中与事件相关的 props。所以，让组件代码在客户端运行时，我们需要将这些事件正确地绑定到元素上。这两个步骤就体现了客户端激活的含义。

理解客户端激活的含义后，我们再来看一下它的具体实现。当组件进行纯客户端渲染时，我们可以通过渲染器的 `renderer.render` 函数来完成渲染。

```js
renderer.render(vnode, container)
```

而对于同构应用，我们将是通过独立的 `render.hydrate` 函数来完成激活：

```js
render.hydrate(vnode, container)
```

实际上，我们可以用代码模拟从服务器渲染到客户端激活的整个过程。

```js
// html 代表服务端渲染的字符串
const html = renderComponentVNode(compVNode)

// 假设客户端已经拿到了由服务端渲染的字符串
// 获取挂载点
const container = document.querySelector('#app')
// 设置挂载点的 innerHTML，模拟由服务端渲染的内容
container.innerHTML = html

// 接着调用 hydrate 函数完成激活
render.hydrate(compVNode, container)
```

其中 `CompVNode` 的代码如下：

```js
const MyComponent = {
  name: 'App',
  steup() {
    const str = ref('foo')

    return () => {
      return {
        type: 'div',
        children: [
          {
            type: 'span',
            children: str.value,
            props: {
              onClick: () => {
                str.value = 'bar'
              }
            }
          },
          {
            type: 'span', children: 'baz'
          }
        ]
      }
    }
  }
}

const CompVNode = {
  type: MyComponent
}
```

接下来，我们着手实现 `renderer.hydrate` 函数。与 `renderer.render` 函数一样，`render.hydrate` 函数也是渲染器的一部分，因此它也会作为 `createRenderer` 函数的返回值。

```js
function createRenderer(options) {
  function hydrate(node, vnode) {
    // ...
  }

  return {
    render,
    hydrate
  }
}
```

这样，我们就可以通过 `render.hydrate` 函数来完成客户端激活了。在具体实现之前，我们先来看一下页面中已经存在的真实 DOM 元素与虚拟 DOM 对象之间的关系。

<img src="./images/ssr02.png" />

真实 DOM 元素与虚拟 DOM 对象都是树形结构，并且节点之间存在一一对应的关系。因此，我们可以认为它们是 “同构” 的。而客户端激活的原理就是基于这一事实，递归地在真实 DOM 元素与虚拟 DOM 节点之间建立关系。另外，在虚拟 DOM 中并不存在于容器元素（挂载点）对应的节点。因此，在激活的时候，应该从容器元素的第一个子节点开始。

```js
function hydrate(vnode, container) {
  // 从容器的第一个子节点开始
  hydrateNode(container.firstChild, vnode)
}
```

其中，`hydrateNode` 函数接收两个参数，分别是真实 DOM 元素和虚拟 DOM 元素。`hydrateNode` 函数的具体实现如下：

```js
function hydrateNode(node, vnode) {
  const { type } = vnode;

  // 1. 让 vnode.el 引用真实 DOM
  vnode.el = node

  // 2. 检查虚拟 DOM 的类型，如果是组件，调用 mountComponent 函数完成激活
  if (typeof type === 'object') {
    mountComponent(vnode, container, null)
  } else if (typeof type === 'string') {
    // 3. 检查真实 DOM 的类型与虚拟 DOM 的类型是否匹配
    if (node.nodeType !== 1) {
      console.error('mismatch')
      console.error('服务端渲染的真实 DOM 节点是：', node)
      console.error('客户端渲染的真实 DOM 节点是：', vnode)
    } else {
      // 4. 如果是普通元素，调用 hydrateElement 完成激活
      hydrateElement(node, vnode)
    }
  }

  // 5. hydrateNode 函数需要返回当前节点的下一个兄弟节点，以便继续进行后续的激活操作
  return node.nextSibling
}
```

`hydrateNode` 函数的关键点比较多。首先，需要在真实 DOM 元素与虚拟 DOM 元素之间建立联系，即 `vnode.el = node`。这样，才能保证后续更新操作正常进行。其次，我们需要检测虚拟 DOM 的类型，并据此判断应该执行怎样的激活操作。在上面的的代码中，我们展示了对组件和普通元素类型的虚拟节点的处理。可以看到，在激活普通元素类型的节点时，我们需要检查真实 DOM 元素的类型与虚拟 DOM 的类型是否相同，如果不同，则需要打印 `mismatch` 错误，即客户端渲染的节点与服务端渲染的节点不匹配。同时，为了能够让用户快速定位问题，保证开发体验，我们最好将客户端渲染的虚拟节点与服务端渲染的真实 DOM 节点都打印出来，供用户参考。对于组件类型节点的激活操作，可以直接通过 `mountComponent` 函数来完成。对于普通元素的激活操作，可以通过 `hydrateElement` 函数来完成。最后，`hydrateNode` 函数需要返回当前激活节点的下一个兄弟节点，以便进行后续的激活操作。`hydrateNode` 函数的返回值非常重要，它的用途体现在 `hydrateElement` 函数内。

```js
// 激活普通元素类型的节点
function hydrateElement(el, vnode) {
  // 1. 为 DOM 元素添加事件
  if (vnode.props) {
    for (const key in vnode.props) {
      // 只有事件类型的 props 需要处理
      if (/^on/.test(key)) {
        patchProps(el, key, null, vnode.props[key])
      }
    }
  }
  // 递归激活子节点
  if (Array.isArray(vnode.children)) {
    // 从第一个子节点开始
    let nextNode = el.firstChild
    const len = vnode.children.length
    for (let i = 0; i < len; i++) {
      // 激活子节点，注意，每当激活一个子节点，hydrateNode 函数都会返回当前子节点的下一个兄弟节点
      nextNode = hydrateNode(nextNode, vnode.children[i])
    }
  }
}
```

`hydrateElement` 函数有两个关键点：

* 因为服务端渲染是忽略事件的，浏览器只是渲染静态 HTML，所以激活 DOM 元素的操作之一就是为其添加事件处理程序。
* 递归地激活当前元素的子节点，从第一个子节点 `el.firstChild` 开始，递归地调用 `hydrateNode` 函数完成激活。`hydrateNode` 函数会返回当前节点的下一个兄弟节点，利用这个特点即可完成所有子节点的处理。

对于组件的激活，我们还需要针对性地处理 `mountComponent` 函数。由于服务端渲染的页面中已经存在真实 DOM 元素，所以当调用 `mountElement` 函数进行组件挂载时，无须再次创建真实 DOM 元素。

```js
function mountComponent(vnode, container, anchor) {
  // ...

  instance.update = effect(() => {
    const subTree = render.call(renderContext, renderContext)
    if (!subTree.isMounted) {
      beforeMount && beforeMount.call(renderContext)
      // 如果 vnode.el 存在，则意味着要执行激活
      if (vnode.el) {
        // 直接调用 hydrateNode 完成激活
        hydrateNode(vnode.el, subTree)
      } else {
        // 正常挂载
        patch(null, subTree, container, anchor)
      }
      instance.isMounted = true
      mounted && mounted.call(renderContext)
      instance.mounted && instance.mounted.forEach(hook => hook.call(renderContext))
    } else {
      beforeUpdate && beforeUpdate.call(renderContext)
      patch(instance.subTree, subTree, container, anchor)
      updated && updated.call(renderContext)
    }
    instance.subTree = subTree
  }, {
    schedular: queueJob
  })
}
```

可以看到，唯一需要调整的地方就是组件的渲染副作用，即 render effect。`hydrateNode` 函数可以在真实 DOM 与虚拟 DOM 之间建立联系，即 `vnode.el = node`。所以，让渲染副作用执行挂载操作时，我们优先检查虚拟节点的 `vnode.el` 属性是否已经存在，如果存在，则意味着无需进行全新挂载，只需要进行激活操作即可，否则按照之前的逻辑进行全新的挂载。最后一个关键点子啊与，组件的激活操作需要在真实 DOM 与 `subTree` 之间进行。

#### 编写同构代码

“同构” 一词指的是一份代码既能在服务端运行，又可以在客户端运行。因此，在编写组件代码时，应该额外注意因代码运行环境的不同所导致的差异。

##### 组件的生命周期

我们知道，当组件的代码在服务端余运行时，由于不会对组件进行真正的挂载操作，即不会把虚拟 DOM 渲染为真实 DOM 元素，所以组件的 `beforeMount` 与 `mounted` 这两个钩子函数不会执行。又因为服务端渲染的是应用的快照，所以不存在数据变化后的重新渲染，因此，组件的 `beforeUpdate` 与 `updated` 这两个钩子函数也不会执行。另外，在服务端渲染时，也不会发生组件被卸载的情况，所以组件的 `beforeUnmount` 与 `unmounted` 这两个钩子函数也不会执行。实际上，只有 `beforeCreate` 与 `created` 这两个钩子函数会在服务端执行，所以当你编写组件代码时需要额外注意。

下面是一段常见的问题代码：

```vue
<script>
export default {
  created() {
    this.timer = setInterval(() => {
      // 做一些事情
    }, 1000)
  },
  beforeUnmount() {
    // 清除定时器
    clearInterval(this.timer)
  }
}
</script>
```

观察上面这段代码，我们在 `created` 钩子函数中设置了一个定时器，并尝试在组件被卸载之前将其清除。如果在客户端运行这段代码，并不会产生任何问题，但如果在服务端运行，则会造成内存泄漏。因为 `beforeUnmount` 钩子函数不会在服务端运行，所以这个定时器永远不会被清除。

实际上，在 `created` 钩子函数中设置定时器对于服务器渲染没有任意意义。因为服务端渲染的是应用程序的快照，所谓快照，指的是在当前数据状态下页面应该呈现的内容。所以，在定时器被触发，修改数据状态之前，应用程序的快照已经渲染完毕了。所以我们说，在服务端渲染时，定时器内的代码没有任意意义。遇到这类问题，通常有两种解决方案：

* 方案一：将创建定时器的代码移动到 `mounted` 钩子中，即只在客户端执行定时器；
* 方案二：使用环境变量包裹这段代码，让其不再服务端运行。

方案一很好理解，方案二需要依赖项目的环境变量。例如，在通过 webpack 或 vite 等构建工具搭建的同构项目中，通常带有这种环境变量。以 Vite 为例，我们可以使用 `import.meta.env.SSR` 来判断当前代码的运行环境。

```vue
<script>
export default {
  created() {
    // 非服务端渲染时执行
    if (!import.meta.env.SSR) {
      this.timer = setInterval(() => {
        // 做一些事情
      }, 1000)
    }
  },
  beforeUnmount() {
    // 清除定时器
    clearInterval(this.timer)
  }
}
</script>
```

可以看到，我们通过 `import.meta.env.SSR` 来使代码只在特定环境中运行。实际上，构建工具会分别为客户端和服务端输出两个独立的包。构建工具在为客户端打包资源的时候，会在资源中排除被 `import.meta.env.SSR` 包裹的代码。换句话来说，上面的代码中被 `!import.meta.env.SSR` 包裹的代码只会在客户端包中存在。

##### 使用跨平台的 API

编写通过代码的另一个关键点时使用跨平台的 API。由于组件的代码既运行于浏览器，又运行于服务器，所以在编写代码的时候要避免使用平台特有的 API。例如，仅在浏览器环境中才存在的 `window`、`document` 等对象。当你不得不使用这些平台特有 API 时，你可以使用诸如 `import.meta.env.SSR` 这样的环境变量来做代码守卫。

```vue
<script>
if (!import.meta.env.SSR) {
  // 浏览器特有平台 API
  window.xxx
}
 
export default {
  // ...
}
</script>
```

类似地，Node.js 中特有的 API 也无法在浏览器中运行。因此，为了减轻开发时的心智负担，我们可以选择跨平台的第三方库。例如，使用 `Axios` 作为网络请求库。

##### 只在某一端引入模块

通常情况下，我们自己编写的组件代码是可控的，这时我们可以使用跨平台的 API 来保证代码 ’"同构"。然而，第三方模块的带么非常不可控。假设我们有如下组件：

```vue
<script>
import storage from './storage.js'
export default {
  // ...
} 
</script>
```

上面这段组件代码本身没有问题，但它以来了 `./storage.js` 模块。如果模块中存在非同构代码，就会发生错误。假设 `./storage.js` 模块的代码如下：

```js
// storage.js
export const storagee = window.localStorage
```

可以看到，`./storage.js` 模块中依赖了浏览器环境特有的 API，即 `window.localStorage` 。因此，当运行服务端渲染时就会发生错误。对于这个问题，有两种解决方案，方案一是修改第三方模块的代码，加入 `import.meta.env.SSR` 来做代码守卫，但是这样虽然能够解决问题，但是大多数情况下我们并不能这么做。因此，更多时候，我们会采用 **条件引入** 的方式来解决问题。

```vue
<script>
let stroage

// 非 SSR 才引入 stroage.js 模块
if (!import.meta.env.SSR) {
	import storage from './storage.js'  
} else {
  stroage = import('./stroage-server.js')
}

export default {
  // ...
} 
</script>
```

##### 避免交叉请求引起状态污染

编写同构代码时，额外需要注意的是，避免交查请求引起的状态污染。在服务端渲染时，我们会为每一个请求创建一个全新的应用实例。

```js
import { createSSRApp } from 'vue'
import { renderTOString } from '@vue/server-renderer'
import App from 'App.vue'

// 每个请求到来，都会执行一次 render 函数
async function render(url, mainfest) {
  // 为当前请求创建应用实例
  const app = createSSRApp(App)
  
  const ctx = {}
  const html = await renderToString(app, ctx)
  
  return html
}
```

可以看到，每次调用 render 函数进行服务端渲染时，都会为当前请求调用 `createSSRApp` 函数来创建一个新的应用实例。这是为了避免不同请求共有一个应用实例导致状态污染。

除了要为每一个请求创建独立的应用实例之外，状态污染的情况还可能发生在单个组件的代码中：

```vue
<script>
// 模块级别的全局变量
let count = 0

export default {
  create() {
    count++
  }
}
</script>
```

如果上面这段组件的代码在浏览器中运行，不会产生任何问题，因为浏览器与用户是一对一的关系，每个浏览器都是独立的。但如果这个段代码在服务器中运行，情况会有所不同，因为服务器与用户是一对多的关系。当用户 A 发送请求到服务器时，服务器会执行上面这段组件代码，执行 `count++`。接着，用户 B 也发送请求到服务器，服务器再次执行上面这段组件的代码，此时的 `count` 已经因用户 A 的请求自增了一次，因此对于用户 B 而言，已经被用户 A 的请求所影响，于是就是造成请求间的交查污染。所以，在编写组件代码时，需要额外注意组件中出现的全局变量。

##### ClientOnly 组件

最后，我们再来介绍一个对编写同构代码非常有帮助的组件，即 `<ClientOnly>` 组件。在日常开发中，我们经常会使用第三方模块，但是它们不一定对 SSR 友好，例如：

```vue
<template>
	<SsrIncompatibleComp />
</template>
```

假设 `<SsrIncompatibleComp />` 是一个不兼容 SSR 的第三方组件，我们没有办法修改它的源代码。

这时，我们就可以实现一个 `<ClientOnly>` 组件，该组件可以让模板的一部分内容仅在客户端渲染，如下面这段模板所示：

```vue
<template>
	<ClientOnly>
  	<SsrIncompatibleComp />
  </ClientOnly>
</template>
```

可以看到，我们使用 `<ClientOnly>` 组件包裹不兼容 SSR 的 `<SsrIncompatibleComp>` 组件。这样，在服务端渲染时就会忽略该组件，且该组件仅会在客户端被渲染。那么，`<ClientOnly>` 组件是如何做到这一点的呢？这其实是利用了 CSR 和 SSR 的差异。

```js
import { ref, onMounted, defineComponent } from 'vue'

export const ClientOnly = defineComponent({
  setup(_, { slots }) {
    // 标记变量，仅在客户端渲染时为 true
    const show = ref(false)
    // onMounted 钩子只会在客户端执行
    onMounted(() => {
      show.value = true
    })
    // 在服务端什么都不渲染，在客户端才会渲染 <ClientOnly> 组件的插槽内容
    return () => (show.value && slots.default ? slots.default() : nll)
  }
})
```

可以看到，整体实现非常简单。其原理是利用了 `onMounted` 钩子只会在客户端执行的特性。我们创建一个标记变量 show，初始值为 false，并且仅在客户端渲染时将其设置为 true。这意味着，在服务端渲染的时候，`<ClientOnly>` 组件的插槽内容不会被渲染。而在客户端渲染时，只有等到 `mounted` 钩子触发后才会渲染 `<ClientOnly>` 组件的插槽内容。这样就实现了被 `<ClientOnly>` 组件包裹的内容仅会在客户端被渲染。

另外，`<ClientOnly>` 组件并不会导致客户端激活失败。因为在客户端激活的时候，`mounted` 钩子还没有触发，所以服务端与客户端渲染的内容一致，即什么都不渲染。等到激活完成，且 `mounted` 钩子触发执行之后，才会在客户端将 `<ClientOnly>` 组件的插槽内容渲染出来。

#### 总结

在本篇文章中，我们讨论了 CSR、SSR 和同构渲染的工作机制，以及它们各自的优缺点。

|                | SSR  | CSR    |
| -------------- | ---- | ------ |
| SEO            | 友好 | 不友好 |
| 白屏问题       | 无   | 有     |
| 占用服务器资源 | 多   | 少     |
| 用户体验       | 差   | 好     |

当我们为应用程序选择渲染架构时，需要结合软件的需求及场景，选择适合的渲染方案。

接着，我们讨论了 Vue.js 是如何把虚拟节点渲染为字符串的。以普通标签节点为例，在将其渲染为字符串时，要考虑以下内容。

* 自闭合标签的处理。对于自闭合标签，无须为其渲染闭合标签部分，也无需处理其子节点。
* 属性名称的合法性，以及属性值的转义。
* 文本子节点的转义。

然后，我们讨论了如何将组件渲染为 HTML 字符串。在服务端渲染组件与渲染普通标签没有本质区别。我们只需要通过执行组件的 `render` 函数，得到该组件所渲染的 `subTree` 并将其渲染为 HTML 字符串即可。另外，在渲染组件时，需要考虑以下几点：

* 服务端渲染不存在数据变更后的重新渲染，所以无须调用 reactive 函数对 data 等数据进行包装，也无须使用 shallowReactive 函数对 props 数据进行包装。正因如此，我们也无需调用 `beforeUpdate` 和 `updated` 钩子。
* 服务端渲染时，由于不需要渲染真实 DOM 元素，所以无须调用组件的 `beforeMount` 和 `mounted` 钩子。

之后，我们讨论了客户端激活的原理。在同构渲染过程中，组件的代码会分别在服务端和客户端各执行一次。在服务端，组件会被渲染为静态的 HTML 字符串，并发送给浏览器。浏览器则会渲染由服务端返回的静态 HTML 内容，并下载打包在静态资源中的组件代码。当下载完毕后，浏览器回解析并执行该组件代码。当组件代码在客户端执行时，由于页面中已经存在对应的 DOM 元素，所以渲染器并不会执行创建 DOM 元素的逻辑，而是会执行激活操作。激活操作可以总结为两个步骤。

* 在虚拟节点与真实 DOM 元素之间建立联系，即 `vnode.el = el` 。这样才能保证后续更新程序正确运行。
* 为 DOM 元素添加事件绑定。

最后，我们讨论了如何编写同构的组件代码。由于组件代码既运行于服务端，也运行于客户端，所以让我们编写组件代码时要额外注意。具体可以总结为以下几点。

* 注意组件的生命周期。`beforeUpdate`、`updated`、`beforeMount`、`mounted`、`beforeUnmount`、`unmounted` 等生命周期钩子函数不会在服务端执行。
* 使用跨平台的 API。由于组件的代码既要在浏览器中运行，也要在服务器中运行，所以编写组件代码时，要额外注意代码的跨平台性。通常我们在选择第三方库的时候，会选择支持跨平台的库，例如使用 `Axios` 作为网络请求库。
* 特定端的实现。无论在客户端还是服务端，都应该保证功能的一致性。例如，组件需要读取 cookie 信息。在客户端，我们可以通过 `document.cookie` 来实现读取；而在服务端，则需要根据请求头来实现读取。所以，很多功能模块需要我们为客户端和服务端分别实现。
* 避免交查请求引起的状态污染。状态污染既可以应用级的，也可以模块级的。对于应用，我们应该为每一个请求创建一个独立的应用实例。对于模块，我们应该避免使用模块级的全局变量。这是因为在不做特殊处理的情况下，多个请求会共有模块级的全部变量，造成请求间的交叉污染。
* 仅在客户端渲染组件中的部分内容。这需要我们自行封装 `<ClientOnly>` 组件，被该组键包裹的内容仅在客户端才会被渲染。



