const content = `
  Getting garbage collection for free
  垃圾回收
  Published 07 August 2015 · Tagged with internals memory
  发布于2015年8月7日 标签：内部 内存

  JavaScript performance continues to be one of the key aspects of Chrome’s values, especially when it comes to enabling a smooth experience.
  Starting in Chrome 41, V8 takes advantage of a new technique to increase the responsiveness of web applications by hiding expensive memory management operations inside of small, otherwise unused chunks of idle time.
  As a result, web developers should expect smoother scrolling and buttery animations with much reduced jank due to garbage collection.
  js性能依然是Chrome特色的关键之一，尤其是提到平稳体验时。
  从Chrome41开始，v8利用新技术去提高web应用的相应，通过不再使用（hiding）代价昂贵的内存管理操作，取而代之使用的小块的，且未被使用的空闲时间。
  因此，也因为有了垃圾回收，web开发者期望通过减少“jank”使得得到更平滑的滚动与像黄油一般的移动的动画。

  Many modern language engines such as Chrome’s V8 JavaScript engine dynamically manage memory for running applications so that developers don’t need to worry about it themselves.
  The engine periodically passes over the memory allocated to the application, determines which data is no longer needed, and clears it out to free up room.
  This process is known as garbage collection.
  许多现在语言引擎，例如：Chrome v8的js引擎动态的管理内存以运行应用，因此开发者自己不用去担心内存的问题。
  引擎会定期地扫描（pass over）分配给应用的内存，决定什么数据是不再需要的，并把他们清理出去，释放他们。
  这个过程就是被熟知的垃圾回收。
`
function GettingGarbageCollectionForFree() {
  return (
    <pre className="GettingGarbageCollectionForFree">
      {content}
    </pre>
  );
}

export default GettingGarbageCollectionForFree;