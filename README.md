# translation

好吧，既然如此，那就每周翻译一篇文章，就从手边的开始做起吧。

要求：
1. 文章在发布之前，自己都要仔细斟酌用词，不能含糊带过；
2. 如果有不确定不合适的地方，需要保留原文，记录时间，尽快确定；
3. 翻译结束之后，给国辉小朋友看一遍，看看是否有不专业的地方，顺便让他涨涨见识！嘻嘻嘻。。。

不要被打脸啊。。。。我已经6个月没更新了。。。呜呜呜。。。。

文件结构也会以此为依据。
# Documentation overview
  ## Building V8 from source
    Checking out the V8 source code
    Building with GN
    Cross-compiling and debugging for ARM/Android
    Cross-compiling for iOS
    GUI and IDE setup
  ## Contributing
    V8’s public API and its stability
    Becoming a V8 committer
    Committer’s responsibility
    Blink web tests (a.k.a. layout tests)
    Evaluating code coverage
    Release process
    Design review guidelines
    Implementing and shipping JavaScript/WebAssembly language features
    Checklist for staging and shipping of WebAssembly features
    Flake bisect
    Handling of ports
    Merging & patching
    Node.js integration build
    Reporting security bugs
    Running benchmarks locally
    Testing
    Triaging issues
  ## Debugging
    Arm debugging with the simulator
    Cross-compiling and debugging for ARM/Android
    Debugging builtins with GDB
    Debugging over the V8 Inspector Protocol
    GDB JIT Compilation Interface integration
    Investigating memory leaks
    Stack trace API
    Using D8
  ## Embedding V8
    Guide to embedding V8
    Version numbers
    Built-in functions
    i18n support
    Untrusted code mitigations
  ## Under the hood
    Ignition
    TurboFan
    Torque user manual
    Writing Torque built-ins
    Writing CSA built-ins
    Adding a new WebAssembly opcode
  ## Writing optimizable JavaScript
    Using V8’s sample-based profiler
    Profiling Chromium with V8
    Using Linux perf with V8
    Tracing V8
    Using Runtime Call Stats
