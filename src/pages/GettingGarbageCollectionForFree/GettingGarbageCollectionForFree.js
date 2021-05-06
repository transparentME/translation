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
  Figure 1: Frame rendering with idle tasks

  Idle tasks are special low-priority tasks which are run when the scheduler determines it is in an idle period.
  Idle tasks are given a deadline which is the scheduler’s estimate of how long it expects to remain idle.
  In the animation example in Figure 1, this would be the time at which the next frame should start being drawn.
  In other situations (e.g., when no on-screen activity is happening) this could be the time when the next pending task is scheduled to be run, with an upper bound of 50 ms to ensure that Chrome remains responsive to unexpected user input.
  The deadline is used by the idle task to estimate how much work it can do without causing jank or delays in input response.

  Garbage collection done in the idle tasks are hidden from critical, latency-sensitive operations.
  This means that these garbage collection tasks are done for “free”.
  In order to understand how V8 does this, it is worth reviewing V8’s current garbage collection strategy.
  闲置任务的优先级特别低，它都是在调度器判定此刻正处于空闲阶段才会运行他们。
  调度器会估测保持空闲的时长以作为闲置任务的deadline。
  在图1中，deadline即下一帧将要被描绘的那个时间点。
  在其他场景中（例如：当没有on-screen活动发生时），那deadline就是当下一个pending尚未有结果的任务将要被调度执行之前，会保留至少50ms以确保Chrome能对意想不到的用户input交互有响应。
  闲置任务会根据deadline来估测在这段时间内，在不对输入框响应造成jank和延迟的情况下，它能做什么。

  在空闲任务中所做的垃圾回收都是隐藏在重要的、延迟敏感的操作中。
  这也就意味着这些gc任务都是无代价的（free）。
  为了了解v8是如何做到的，那么回顾v8先有的gc策略就是值得一做的事情。

  Deep dive into V8’s garbage collection engine
  V8 uses a generational garbage collector with the Javascript heap split into a small young generation for newly allocated objects and a large old generation for long living objects.
  Since most objects die young, this generational strategy enables the garbage collector to perform regular, short garbage collections in the smaller young generation (known as scavenges), without having to trace objects in the old generation.

  The young generation uses a semi-space allocation strategy, where new objects are initially allocated in the young generation’s active semi-space.
  Once that semi-space becomes full, a scavenge operation will move live objects to the other semi-space.
  Objects which have been moved once already are promoted to the old generation and are considered to be long-living.
  Once the live objects have been moved, the new semi-space becomes active and any remaining dead objects in the old semi-space are discarded.

  The duration of a young generation scavenge therefore depends on the size of live objects in the young generation.
  A scavenge will be fast (<1 ms) when most of the objects become unreachable in the young generation.
  However, if most objects survive a scavenge, the duration of the scavenge may be significantly longer.

  A major collection of the whole heap is performed when the size of live objects in the old generation grows beyond a heuristically-derived limit.
  The old generation uses a mark-and-sweep collector with several optimizations to improve latency and memory consumption.
  Marking latency depends on the number of live objects that have to be marked, with marking of the whole heap potentially taking more than 100 ms for large web applications.
  In order to avoid pausing the main thread for such long periods, V8 has long had the ability to incrementally mark live objects in many small steps, with the aim to keep each marking steps below 5 ms in duration.

  After marking, the free memory is made available again for the application by sweeping the whole old generation memory.
  This task is performed concurrently by dedicated sweeper threads.
  Finally, memory compaction is performed to reduce memory fragmentation in the old generation.
  This task may be very time-consuming and is only performed if memory fragmentation is an issue.

  In summary, there are four main garbage collection tasks:

  Young generation scavenges, which usually are fast
  Marking steps performed by the incremental marker, which can be arbitrarily long depending on the step size
  Full garbage collections, which may take a long time
  Full garbage collections with aggressive memory compaction, which may take a long time, but clean up fragmented memory

  In order to perform these operations in idle periods, V8 posts garbage collection idle tasks to the scheduler.
  When these idle tasks are run they are provided with a deadline by which they should complete.
  V8’s garbage collection idle time handler evaluates which garbage collection tasks should be performed in order to reduce memory consumption, while respecting the deadline to avoid future jank in frame rendering or input latency.

  The garbage collector will perform a young generation scavenge during an idle task if the application’s measured allocation rate shows that the young generation may be full before the next expected idle period.
  Additionally, it calculates the average time taken by recent scavenge tasks in order to predict the duration of future scavenges and ensure that it doesn’t violate idle task deadlines.

  When the size of live objects in the old generation is close to the heap limit, incremental marking is started.
  Incremental marking steps can be linearly scaled by the number of bytes that should be marked.
  Based on the average measured marking speed, the garbage collection idle time handler tries to fit as much marking work as possible into a given idle task.

  A full garbage collection is scheduled during an idle tasks if the old generation is almost full and if the deadline provided to the task is estimated to be long enough to complete the collection.
  The collection pause time is predicted based on the marking speed multiplied by the number of allocated objects. Full garbage collections with additional compaction are only performed if the webpage has been idle for a significant amount of time.
  为了能在闲置阶段执行这些操作，v8推送gc闲置任务到调度中。
  当这些闲置任务运行时，他们都需要在被提供都deadline之前完成任务。
  v8的gc闲置时间处理器评估应该执行哪个gc任务来减轻内存消耗，还会考虑deadline以避免对帧渲染所产生的jank或对input延迟。

  如果应用被检测到分配速率表明新生代位可能会在下一个预期的闲置时间来临之前满了，gc将会在闲置任务中执行一个新生代scavenge。
  除此之外，他还会计算近期的scavenge任务所花费的平均，以预测未来的scavenge会持续的时长，并确保它不会扰乱闲置任务deadline。

  当老生代中存储live对象的内存大小接近与堆限制大小，

  Performance evaluation
  In order to evaluate the impact of running garbage collection during idle time, we used Chrome’s Telemetry performance benchmarking framework to evaluate how smoothly popular websites scroll while they load.
  We benchmarked the top 25 sites on a Linux workstation as well as typical mobile sites on an Android Nexus 6 smartphone, both of which open popular webpages (including complex webapps such as Gmail, Google Docs and YouTube) and scroll their content for a few seconds.
  Chrome aims to keep scrolling at 60 FPS for a smooth user experience.

  Figure 2 shows the percentage of garbage collection that was scheduled during idle time.
  The workstation’s faster hardware results in more overall idle time compared to the Nexus 6, thereby enabling a greater percentage of garbage collection to be scheduled during this idle time (43% compared to 31% on the Nexus 6) resulting in about 7% improvement on our jank metric.

  Figure 2: The percentage of garbage collection that occurs during idle time
  As well as improving the smoothness of page rendering, these idle periods also provide an opportunity to perform more aggressive garbage collection when the page becomes fully idle.
  Recent improvements in Chrome 45 take advantage of this to drastically reduce the amount of memory consumed by idle foreground tabs.
  Figure 3 shows a sneak peek at how memory usage of Gmail’s JavaScript heap can be reduced by about 45% when it becomes idle, compared to the same page in Chrome 43.

  Figure 3: Memory usage for Gmail on latest version of Chrome 45 (left) vs. Chrome 43
  These improvements demonstrate that it is possible to hide garbage collection pauses by being smarter about when expensive garbage collection operations are performed.
  Web developers no longer have to fear the garbage collection pause, even when targeting silky smooth 60 FPS animations.
  Stay tuned for more improvements as we push the bounds of garbage collection scheduling.
`
function GettingGarbageCollectionForFree() {
  return (
    <pre className="GettingGarbageCollectionForFree">
      {content}
    </pre>
  );
}

export default GettingGarbageCollectionForFree;