const template = `
  Digging into the TurboFan JIT
  深挖TurboFan JIT
  Published 13 July 2015 · Tagged with internals
  发布于2015年7月13日 标签：内部

  Last week we announced that we’ve turned on TurboFan for certain types of JavaScript.
  In this post we wanted to dig deeper into the design of TurboFan.
  上周，我们就宣布，现在在处理js的某些类型时，将会启动TurboFan。
  这篇文章，我们想深挖一下TurboFan的设计。
  Performance has always been at the core of V8’s strategy.
  TurboFan combines a cutting-edge intermediate representation with a multi-layered translation and optimization pipeline to generate better quality machine code than what was previously possible with the CrankShaft JIT.
  Optimizations in TurboFan are more numerous, more sophisticated, and more thoroughly applied than in CrankShaft, enabling fluid code motion, control flow optimizations, and precise numerical range analysis, all of which were more previously unattainable.
  性能一直以来都是V8选取策略的核心。
  TurboFan将带有多层翻译和优化管道的前沿中间表示层来生成比CrankShaft JIT处理的更优质的机器代码。
  TurboFan中所做的优化相比起CrankShaft的优化，数量更多，更精细，更全面的应用，使得代码的可顺畅地移动，优化控制流程，精确的数值极差分析，这一切的一切都是之前所难以达成的。

  A layered architecture
  分层架构
  Compilers tend to become complex over time as new language features are supported, new optimizations are added, and new computer architectures are targeted.
  With TurboFan, we've taken lessons from many compilers and developed a layered architecture to allow the compiler to cope with these demands over time.
  A clearer separation between the source-level language (JavaScript), the VM's capabilities (V8), and the architecture's intricacies (from x86 to ARM to MIPS) allows for cleaner and more robust code.
  Layering allows those working on the compiler to reason locally when implementing optimizations and features, as well as write more effective unit tests.
  It also saves code.
  Each of the 7 target architectures supported by TurboFan requires fewer than 3,000 lines of platform-specific code, versus 13,000-16,000 in CrankShaft.
  This enabled engineers at ARM, Intel, MIPS, and IBM to contribute to TurboFan in a much more effective way.
  TurboFan is able to more easily support all of the coming features of ES6 because its flexible design separates the JavaScript frontend from the architecture-dependent backends.
  编译器因对新语言的支持也变得越来越复杂，新的优化也会随之增加，新的计算机结构自然而然也是目标之一。
  拿TurboFan来说，分层架构是从过往的许多编译器中汲取了经验而开发得来的，使得编译器可以处理在目前为止的需求。
  为了更简洁、更强壮的代码，现在将源代码级别的语言（例如：js）与虚拟机的能力（v8）和（从x86到ARM再到MIPS）架构的复杂有了一个更清晰的划分。
  分层允许当执行优化或特性的时候，他们在编译器上执行的同时，还可以编写有效的单元测试，也可以保存代码。
  TurboFan所支持的任意7种目标结构之一都要求特定平台代码要少于3000行，而在CrankShaft中，则大致在要13000-16000。
  也因为如此，使得ARM、Intel、MIPS和IBM的工程师们需要在TurboFan以一种更有效的方式来实现功能。
  TurboFan因为他们弹性设计，将前端js与架构依赖的后端分离开，才得以更加简单方便的方式去支持所有es6未来所提供的功能。

  More sophisticated optimizations
  更精细的优化
  The TurboFan JIT implements more aggressive optimizations than CrankShaft through a number of advanced techniques.
  JavaScript enters the compiler pipeline in a mostly unoptimized form and is translated and optimized to progressively lower forms until machine code is generated.
  The centerpiece of the design is a more relaxed sea-of-nodes internal representation (IR) of the code which allows more effective reordering and optimization.
  TurboFan JIT通过一系列高级的方法来实现比CrankShaft所有的更积极的优化。
  当js以一种未优化的形式进入到编译器管道中的时候，它在生成机器语言之前，被解释再被优化成一种相对来说较为底层的形式。
  设计的核心主要是让代码以一种宽松的海量节点的内部表示方式以达到更有效的重排和优化的目的。

  Numerical range analysis helps TurboFan understand number-crunching code much better.
  The graph-based IR allows most optimizations to be expressed as simple local reductions which are easier to write and test independently.
  An optimization engine applies these local rules in a systematic and thorough way.
  Transitioning out of the graphical representation involves an innovative scheduling algorithm that makes use of the reordering freedom to move code out of loops and into less frequently executed paths.
  Finally, architecture-specific optimizations like complex instruction selection exploit features of each target platform for the best quality code.
  数值范围分析帮忙TurboFan能更好的了解数学运算代码。
  基于图的内部表达方式也使得大多数的优化以一种简单的本地标示（simple local reductions），这让写代码与测试代码互不依赖。
  优化引擎应用系统且彻底使用这些本地的规则。
  用于过渡的图解法中包括创新的调度算法，它利用重排自由来将代码移出到循环之外并将它移入低频执行路径之中。（这句没翻译好。）
  最后，一些像是复杂的指令选择这样的特定结构的优化，可使得每个目标平台上的特性都以一种超高质量的代码得以实现。

  Delivering a new level of performance
  让性能提升到一个新的台阶

  We're already seeing some great speedups with TurboFan, but there's still a ton of work to do.
  Stay tuned as we enable more optimizations and turn TurboFan on for more types of code!
  我们逐步在看见TurboFan所做的一些加速优化，但是除此之外，仍然还有很多很多的工作要做。
  请继续关注，因为我们将实现更多优化，并会让TurboFan用于更多场景之中。
`

function DiggingIntoTheTurboFanJIT() {
    return (
      <pre className="DiggingIntoTheTurboFanJIT">
        {template}
      </pre>
    );
  }
  
  export default DiggingIntoTheTurboFanJIT;