const content = `
  Code caching
  代码缓存
  Published 27 July 2015 · Tagged with internals
  发布于2015年7月27日 标签：内部

  V8 uses just-in-time compilation (JIT) to execute JavaScript code.
  This means that immediately prior to running a script, it has to be parsed and compiled — which can cause considerable overhead.
  As we announced recently, code caching is a technique that lessens this overhead.
  When a script is compiled for the first time, cache data is produced and stored.
  The next time V8 needs to compile the same script, even in a different V8 instance, it can use the cache data to recreate the compilation result instead of compiling from scratch.
  As a result the script is executed much sooner.
  v8使用即时编译(JIT)来执行js代码。
  这表示立即优先运行脚本，且他必须要被解析和编译 - 这会造成相当大的开销。
  正如我们近期所说，代码缓存是可以减少这开销的一种技术。
  当脚本在第一次被编译的时候，缓存数据就产生并被保存起来了。
  那么在下一次，v8需要编译同样的脚本的时候，甚至在不同的v8的实例中编译，他都会使用缓存数据去再次生成编译结果，而不是从头开始编译。
  也就因为这样，脚本的执行就会更快一些。

  Code caching has been available since V8 version 4.2 and not limited to Chrome alone.
  It is exposed through V8’s API, so that every V8 embedder can take advantage of it.
  The test case used to exercise this feature serves as an example of how to use this API.
  代码缓存这一技术在v8的4.2版本中就已经可用，并且并不仅限用于Chrome。
  你可以通过v8的api获取它，所以每个v8 embedder都能好好的利用它。
  用于运行这一特性的测试用例也可以作为如果使用这个api的例子。

  When a script is compiled by V8, cache data can be produced to speed up later compilations by passing v8::ScriptCompiler::kProduceCodeCache as an option.
  If the compilation succeeds, the cache data is attached to the source object and can be retrieved via v8::ScriptCompiler::Source::GetCachedData.
  It can then be persisted for later, for example by writing it to disk.
  当一段脚本被v8编译时，通过传递v8::ScriptCompiler::kProduceCodeCache生成缓存数据，以帮助后面的编译加速。
  如果编译成功，那么缓存数据就会附属于源代码对象中，并且它也可以通过v8::ScriptCompiler::Source::GetCachedData找到。
  它也在后面被持续储存（persisted），例如可以将它写入磁盘中。

  During later compilations, the previously produced cache data can be attached to the source object and passed v8::ScriptCompiler::kConsumeCodeCache as an option.
  This time, code will be produced much faster, as V8 bypasses compiling the code and deserializes it from the provided cache data.
  在后期的编译中，之前所生成的缓存数据可以被附属在源码对象上，并将v8::ScriptCompiler::kConsumeCodeCache作为选项参数传递。
  此时，代码将会以更快的速度生成代码，因为v8通过之前提供的缓存数据可绕过编译代码并反序列化。

  Producing cache data comes at a certain computational and memory cost.
  For this reason, Chrome only produces cache data if the same script is seen at least twice within a couple of days.
  This way Chrome is able to turn script files into executable code twice as fast on average, saving users valuable time on each subsequent page load.
  生成缓存数据会产生一定的计算和内容成本。
  也因为如此，Chrome只会在相同的代码在几天内被发现至少2次才会生成缓存数据。
  这样以来，Chrome平均需要将脚本文件转为可执行代码两次，以节省用户之后加载页面的宝贵时间。
`
function CodeCache() {
  return (
    <pre className="CodeCache">
      {content}
    </pre>
  );
}

export default CodeCache;