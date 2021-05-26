const content = `
V8 release v8.7
v8 发布了8.7版本
Published 23 October 2020 · Tagged with release
本文发布于2020年10月23日，关键词：发布

Every six weeks, we create a new branch of V8 as part of our release process. 
每六个月，我们都会创建一个新的v8分支，作为我们的发布的一部分。
Each version is branched from V8’s Git master immediately before a Chrome Beta milestone. 
每个版本在一个Chrome的beta发布之前，从v8的git主分支切出来的。
Today we’re pleased to announce our newest branch, V8 version 8.7, which is in beta until its release in coordination with Chrome 87 Stable in several weeks. 
今天，我们很开心地发现最新分支，V8 8.7版本，
V8 v8.7 is filled with all sorts of developer-facing goodies. 
V8 v8.7更新了许多面向开发者的一些“好东西”
This post provides a preview of some of the highlights in anticipation of the release.
这篇文章，旨在一览这一版本中的一些亮点

JavaScript
Unsafe fast JS calls
V8 v8.7 comes with an enhanced API for doing native calls from JavaScript.

The feature is still experimental and can be enabled through the --turbo-fast-api-calls flag in V8 or the corresponding --enable-unsafe-fast-js-calls flag in Chrome. It is designed to improve performance of some native graphics APIs in Chrome, but can also be used by other embedders. It provides new means for developers to create instances of v8::FunctionTemplate, as is documented in this header file. Functions created using the original API will remain unaffected.

For more information and a list of available features, please see this explainer.

Atomics.waitAsync
Atomics.waitAsync is now available in V8 v8.7.

Atomics.wait and Atomics.notify are low-level synchronization primitives useful for implementing mutexes and other means of synchronization. However, since Atomics.wait is blocking, it’s not possible to call it on the main thread (trying to do so will throw a TypeError). The non-blocking version, Atomics.waitAsync, is usable also on the main thread.

Check out our explainer on Atomics APIs for more details.

V8 API
Please use git log branch-heads/8.6..branch-heads/8.7 include/v8.h to get a list of the API changes.

Developers with an active V8 checkout can use git checkout -b 8.7 -t branch-heads/8.7 to experiment with the new features in V8 v8.7. Alternatively you can subscribe to Chrome’s Beta channel and try the new features out yourself soon.
`