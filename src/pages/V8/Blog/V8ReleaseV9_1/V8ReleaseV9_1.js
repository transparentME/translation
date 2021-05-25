const content = `
  V8 release v9.1
  v8 正式发布v9.1
  Published 04 May 2021 · Tagged with release
  发布于2021年5月4日 标签：发布
  Every six weeks, we create a new branch of V8 as part of our release process.
  Each version is branched from V8’s Git master immediately before a Chrome Beta milestone.
  Today we’re pleased to announce our newest branch, V8 version 9.1, which is in beta until its release in coordination with Chrome 91 Stable in several weeks. V8 v9.1 is filled with all sorts of developer-facing goodies. This post provides a preview of some of the highlights in anticipation of the release.
  JavaScript
  FastTemplateCache improvements
  The v8 API exposes a Template interface to the embedders from which new instances can be created.
  Creating and configuring new object instances requires several steps which is why it’s often faster to clone existing objects instead. V8 uses a two level cache strategy (small fast array cache and a large slow dictionary cache) to lookup recently created objects based on the templates and clone them directly.
  Previously, the cache index for templates was assigned when the templates were created, rather than when they were inserted into the cache. This resulted in the fast array cache being reserved for the templates that were often never instantiated at all. Fixing this resulted in a 4.5% improvement in the Speedometer2-FlightJS benchmark.

  FastTemplateCache的提升
  v8 Api 提供了一个Template接口给embedders，从这个接口我们可以知道哪个新的实例可以被创造。
  创建并配置新的对象实例需要好几个步骤，这也就是为什么相比起创建对象，克隆现有的对象会更快的原因。v8使用一种2级缓存的策略（小而快的数组缓存和一个大而慢的字段缓存）以查询最近创建的基于templates对象并直接克隆他们。

  在早前，当模版创建的时候，模版的缓存索引就分配好了，而不是当他们插入到缓存中时才分配的。这也就导致了可快速取值的数组缓存已经为模版保存了，但是常常这模版根本都没初始化。解决这个问题使得在Speedometer2-FlightJS的benchmark中提高了4.5%。
  Top-level await
  Top-level await is enabled by default in V8 starting with v9.1 and is available without 
  --harmony-top-level-await.
  在v8从9.1版本开始，顶级await是默认支持，并在不写--harmony-top-level-await也依然可用。
  Please note that for the Blink rendering engine, top-level await was already enabled by default in version 89.
  请注意Blink渲染引擎，顶级await已经在89版本中默认支持了。
  Embedders should note that with this enablement, v8::Module::Evaluate
  always returns a v8::Promise object instead of the completion value. The Promise
  is resolved with the completion value if module evaluation succeeds and rejected with the error if evaluation fails. If the evaluated module is not asynchronous (i.e. does not contain top-level await) and does not have any asynchronous dependencies, the returned Promise will either be fulfilled or rejected. Otherwise the returned Promise will be pending.
  Embedders应该注意这个，v8::Module::Evaluate总是返回一个v8::Promise对象，而不是完成的值。如果模块评估成功这个Promise会resolve一个完成值，否则失败了会reject一个错误。如果被评估的模块不是异步（例如它不包含顶级await）并且不包含任何异步的依赖，那么所返回的值可能是完成也可能是失败。否则返回的Promise将会pending。
  Please see our explainer for more details.
  如果想了解更多请查看我们的解释。

  Private brand checks a.k.a. #foo in obj
  私有brand检查
  The private brands check syntax is enabled by default in v9.1 without requiring  --harmony-private-brand-checks. This feature extends the in operator to also work with private fields' # -names, such as in the following example.
  私有brands检查语法在无需输入harmony-private-brand-checks的情况下可以在v9.1版本中默认被支持。
  class A {
    static test(obj) {
      console.log(#foo in obj);
    }

    #foo = 0;
  }

  A.test(new A()); // true
  A.test({}); // false

  For a deeper dive, be sure to check out our explainer.
  想了解更多，请移步到我们的解释器了解更多。
  Short builtin calls
  简介的内置调用
  In this release we have temporarily turned unembed builtins (undoing embedded builtins) on 64-bit desktop machines. The performance benefit of unembedding builtins on those machines outweighs the memory costs. This is due to architectural as well as micro-achitectural details.
  在这个发布版本中，我们已暂时将
  We'll publish a separate blog post with more details soon.
  我们不久将会发布一篇单独的文档来阐述更多细节。
  V8 API
  Please use  git log branch-heads/9.0..branch-heads/9.1 include/v8.h
  to get a list of the API changes.
  Developers with an active V8 checkout can use  git checkout -b 9.1 -t branch-heads/9.1 to experiment with the new features in V8 v9.1.
  Alternatively you can subscribe to Chrome’s Beta channel and try the new features out yourself soon.
  v8 api
  请使用git log branch-heads/9.0..branch-heads/9.1 include/v8.h命令来获取有改变的api的列表。
  有有效v8分支的开发者们可以使用git checkout -b 9.1 -t branch-heads/9.1来体验V8 v9.1中的新特性。
  或者你可以订阅Chrome的Beta channel并且自己尝试体验新的分支。

`
function V8ReleaseV9_1() {
  return (
    <pre className="V8ReleaseV9_1">
      {content}
    </pre>
  );
}

export default V8ReleaseV9_1;