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

  In Chrome, we strive to deliver a smooth, 60 frames per second (FPS) visual experience.
  Although V8 already attempts to perform garbage collection in small chunks, larger garbage collection operations can and do occur at unpredictable times
  — sometimes in the middle of an animation
  — pausing execution and preventing Chrome from hitting that 60 FPS goal.
  对于Chrome，我们一直努力实现一种平滑的，每秒60帧的（FPS）的视觉体验。
  可尽管V8已经尝试在小块范围的进行垃圾回收，但是范围更广的垃圾回收操作依然可能且可以在不可预知的时间里发生。
  -有时候是在动画执行中
  -会导致暂时执行，Chrome就无法达成60FPS的目标了。

  Chrome 41 included a task scheduler for the Blink rendering engine which enables prioritization of latency-sensitive tasks to ensure Chrome remains responsive and snappy.
  As well as being able to prioritize work, this task scheduler has centralized knowledge of how busy the system is, what tasks need to be performed and how urgent each of these tasks are.
  As such, it can estimate when Chrome is likely to be idle and roughly how long it expects to remain idle.
  Chrome41 包含一个任务调度，以用于Blink渲染引擎。它可以对延迟敏感的任务高优，以确保Chrome保持可相应，且相应迅速。
  同样，为了可以做到高优任务，这个任务调度会知道当前系统有多忙，什么任务需要被执行，每个任务的紧急程度。
  例如，它可以预估，在Chrome将很可能空闲下来的时候，大致它保持空闲的时长。

  An example of this occurs when Chrome is showing an animation on a web page.
  The animation will update the screen at 60 FPS, giving Chrome around 16.6 ms of time to perform the update.
  As such, Chrome will start work on the current frame as soon as the previous frame has been displayed, performing input, animation and frame rendering tasks for this new frame.
  If Chrome completes all this work in less than 16.6 ms, then it has nothing else to do for the remaining time until it needs to start rendering the next frame.
  Chrome’s scheduler enables V8 to take advantage of this idle time period by scheduling special idle tasks when Chrome would otherwise be idle.
  这样类型的例子，发生在当Chrome正在web页面上展示一个动画。
  动画将会以60帧率在屏幕上更新，Chrome在大约16.6ms左右的时间展示更新。
  因此，Chrome在上一帧一展示完，就会在当前帧开始工作，在这一帧内会展示input，动画和帧渲染任务。
  如果Chrome在16.6ms内提前完成了这部分工作，那么直到下一帧渲染的开始之前，他都无事可做。
  Chrome的调度会使v8利用这部分空闲时间，以调度一些特别的闲置任务。
`
function GettingGarbageCollectionForFree() {
  return (
    <pre className="GettingGarbageCollectionForFree">
      {content}
    </pre>
  );
}

export default GettingGarbageCollectionForFree;