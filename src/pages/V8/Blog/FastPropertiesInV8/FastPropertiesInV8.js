const template = `
        Fast properties in V8 
        v8中的快属性 
        Published 30 August 2017 · Tagged with internals 
        发布于2017年8月30日 标签：内部 
        
        In this blog post we would like to explain how V8 handles JavaScript properties internally. 
        From a JavaScript point of view there are only a few distinctions necessary for properties. 
        JavaScript objects mostly behave like dictionaries, with string keys and arbitrary objects as values. 
        The specification does however treat integer-indexed properties and other properties differently during iteration. 
        Other than that, the different properties behave mostly the same, independent of whether they are integer indexed or not. 
        这篇文章，我们将会阐述v8的内部是如何处理js属性的。 
        从js的角度来看，有一些的属性是有不同于其他属性的。 
        js对象和字典很像，字符串作为关键词，他的含义作为他的value值； 
        但是对待整型的index属性和对待其他类型的属性是不一样的。 
        除此之外，不同的属性大致的处理方式都大同小异，区别在于他们是不是整型index。 
        
        However, under the hood V8 does rely on several different representations of properties for performance and memory reasons. 
        In this blog post we are going to explain how V8 can provide fast property access while handling dynamically-added properties. 
        Understanding how properties work is essential for explaining how optimizations such as inline caches work in V8. 
        但是，v8依赖于不同的属性表现形式以在性能和内存方面发挥帮助。 
        在这篇文章中，我们将阐述v8是如何在处理动态添加属性时，能快速获取属性。 
        了解属性是如何工作的，就能更好的理解，如果v8中的inline cache的优化了。 
        
        This post explains the difference in handling integer-indexed and named properties. 
        After that we show how V8 maintains HiddenClasses when adding named properties in order to provide a fast way to identify the shape of an object. 
        We'll then continue giving insights into how named properties are optimized for fast accesses or fast modification depending on the usage. 
        In the final section we provide details on how V8 handles integer-indexed properties or array indices. 
        这篇文章解释了是如何处理整型index和具名属性的。 
        之后，我们将会展示v8是如何维护hiddenClass的，当我们添加具名属性以提供一种快速的方式去认定一个对象的shape； 
        接着我们将会继续聚焦到具名属性如何通过使用的方式去优化，可以达到快速获取的或快速修改的目的。 
        在最后，我们将会细细讲解v8是如何处理整型index属性或数字的下标。 
        
        Named properties vs. elements 
        
        Let's start by analysing a very simple object such as {a: "foo", b: "bar"}.
        This object has two named properties, "a" and "b". 
        It does not have any integer indices for property names. 
        Array-indexed properties, more commonly known as elements, are most prominent on arrays. 
        For instance the array ["foo", "bar"] has two array-indexed properties: 0, with the value "foo", and 1, with the value "bar". 
        This is the first major distinction on how V8 handles properties in general. 
        命名属性 Vs 元素 
        
        我们先从一个简单的对象 {a: "foo", b: "bar"} 开始吧。
        这个对象有两个属性，a和b。 
        这两个属性都不是整型下标。 
        数字下标属性，也就是通常被我们所认为的元素，常常在数组中被我们所熟识。 
        例如，["foo", "bar"]有两个数组下标指向的属性，分别是：0，他的值对应的是foo，而1则对应的是bar； 
        这就是v8处理属性的最主要的区别。 
        
        The following diagram shows what a basic JavaScript object looks like in memory. 
        下面这张图就展示了一个普通的js对象在内存里是什么样的。

        Elements and properties are stored in two separate data structures which makes adding and accessing properties or elements more efficient for different usage patterns. 
        元素和对象是是存在两个不同的数据结构里面的，这样可以使得增加或者获取属性或者元素的时候可以更加的高效； 
        
        Elements are mainly used for the various Array.prototype methods such as pop or slice. 
        Given that these functions access properties in consecutive ranges, V8 also represents them as simple arrays internally — most of the time. 
        Later in this post we will explain how we sometimes switch to a sparse dictionary-based representation to save memory. 
        元素主要是用来给Array原型链上那些方法用的。 
        基于这些方法会在连续的范围内获取属性，因此v8同样会在大多数时间以一种简单数组的方式来表达他们。 
        这篇文章后面，我们将会解释一下我们是如何以一种少见的基于字典的表达方式来保存内存。 
        
        Named properties are stored in a similar way in a separate array. 
        However, unlike elements, we cannot simply use the key to deduce their position within the properties array; we need some additional metadata. 
        In V8 every JavaScript object has a HiddenClass associated. 
        The HiddenClass stores information about the shape of an object, and among other things, a mapping from property names to indices into the properties. 
        To complicate things we sometimes use a dictionary for the properties instead of a simple array. 
        We will explain this in more detail in a dedicated section. 
        命名属性以一种相似的方式存储在一个分开的数组里。 
        但是，不同于元素的是，我们不能只是通过key值来推断他们在属性数组中的位置；我们还需要一些附加的元数据。 
        在v8中，每一个js对象都有一个关联的HiddenClass； 
        这个HiddenClass中储存了关于某一个对象的shape的信息，还有一些其他东西，属性名称到索引的属性映射。 
        我们有时候会用一个属性的字典，而非一个简单的数组。 
        这个部分我们将会专门有一个小节来解释。 
        
        Takeaway from this section: 
        这一小节的要点： 
        
        1. Array-indexed properties are stored in a separate elements store. 
            数组的索引属性是存在一个单独的元素中的； 
        2. Named properties are stored in the properties store. 
            命名的属性是存在属性中的； 
        3. Elements and properties can either be arrays or dictionaries. 
            元素和属性既可以是数组，也可以是字典； 
        4. Each JavaScript object has a HiddenClass associated that keeps information about the object shape. 
            每个js对象都有一个用于存储他们的对象shape信息的hiddenclass 
        
        HiddenClasses and DescriptorArrays 

        After explaining the general distinction of elements and named properties we need to have a look at how HiddenClasses work in V8. 
        This HiddenClass stores meta information about an object, including the number of properties on the object and a reference to the object’s prototype.  
        HiddenClasses are conceptually similar to classes in typical object-oriented programming languages. 
        However, in a prototype-based language such as JavaScript it is generally not possible to know classes upfront. 
        Hence, in this case V8, HiddenClasses are created on the fly and updated dynamically as objects change. 
        HiddenClasses serve as an identifier for the shape of an object and as such a very important ingredient for V8's optimizing compiler and inline caches. 
        The optimizing compiler for instance can directly inline property accesses if it can ensure a compatible objects structure through the HiddenClass. 
        在解释元素与命名属性的区别之后，我们需要了解一下hiddenClass在v8中是如何工作的。 
        这个hiddenClass保存关于一个对象的元信息，其中包括，对象的属性的数量，和对象的原型对象的引用。 
        hiddenClass从概念上来说，和典型的面向对象的编程语言中的类很相似。 
        但是，在基于原型的语言中，例如说js，坦白说，他并不知道类是什么。 
        因此，hiddenclasss其实是会随着对象的变化而动态更新的。 
        hiddenClass充当了一个标识一个对象的shape的作用，并且也是v8优化编译器和inline caches的一个重要角色之一。 
        例如，优化编译器可以直接内嵌属性访问，如果他可以通过hiddenclass来确保他是一个可兼容对象结构。 
        
        Let's have a look at the important parts of a HiddenClass. 
        我们来看下hiddenclass的重点部分 
        

        In V8 the first field of a JavaScript object points to a HiddenClass. 
        (In fact, this is the case for any object that is on the V8 heap and managed by the garbage collector.) 
        In terms of properties, the most important information is the third bit field, which stores the number of properties, and a pointer to the descriptor array. 
        The descriptor array contains information about named properties like the name itself and the position where the value is stored. 
        Note that we do not keep track of integer indexed properties here, hence there is no entry in the descriptor array. 
        在v8中，js对象的第一部分就指向了hiddenclass。 
        （实际上，在v8堆上，并且被gc管理的对象确实是如此） 
        在属性方面，最重要的信息就是第三bit位的，也就是存储这属性数量，并有一个指向描述符数组。 
        描述符数组中包括了关于命名属性的一些信息，比如：名称和对应值所存的位置。 
        注意，我们并没有在这里记录追踪整型搜索属性，因此在描述符数组中是没有入口的。 
        
        The basic assumption about HiddenClasses is that objects with the same structure — e.g. the same named properties in the same order — share the same HiddenClass. 
        To achieve that we use a different HiddenClass when a property gets added to an object. 
        In the following example we start from an empty object and add three named properties. 
        对hiddenClass的基本假定就是对象都有相同的结构 - 例如，同样的命名属性都是以同样的顺序排列的 - 他们会共享同样的hidden class； 
        当把一个属性加到一个对象上的时候，我们用了一个不同的hiddenclass。 
        在接下来的例子中，我们将会对一个空的对象中，加入三个命名属性。 
        ￼ 
        
        Every time a new property is added, the object's HiddenClass is changed. 
        In the background V8 creates a transition tree that links the HiddenClasses together. 
        V8 knows which HiddenClass to take when you add, for instance, the property "a" to an empty object. 
        This transition tree makes sure you end up with the same final HiddenClass if you add the same properties in the same order. 
        The following example shows that we would follow the same transition tree even if we add simple indexed properties in between. 
        每次只要新的对象加进去，对象的hiddenClass也会随着改变。 
        V8会创建一个过渡树用来把hiddenclass联系在一起。 
        V8知道，当你加入新的属性的时候，应该去取哪一个hiddenclass，例如，你将属性a加入到一个空的对象中。 
        这个过渡树会确保，如果你将以相同的顺序去加入的是相同的属性，那么你最终会得到同样的最终hiddenclass。 
        接下来的例子，会展示尽管我们将简单的搜索属性加入到其中，我们会得到同样的过渡树。 
        ￼ 
        However, if we create a new object that gets a different property added, in this case property "d", V8 creates a separate branch for the new HiddenClasses. 
        但是，如果我们创建了一个新的对象，并且增加了不同的属性，在这个例子中d，v8将会创建一个新的分支用于新的hiddenclass 
        ￼ 
        Takeaway from this section: 
        这一节的要点如下： 
        
        1. Objects with the same structure (same properties in the same order) have the same HiddenClass 
            有着同样接口的对象（比如说同样的属性，并且有着同样的顺序）会拥有同样的hiddenclass 
        2. By default every new named property added causes a new HiddenClass to be created. 
            默认情况下，每个新的命名属性的加入都会导致新的hiddenclass的创建。 
        3. Adding array-indexed properties does not create new HiddenClasses. 
            添加数组索引型的属性并不会创建新的hiddenclass 
        
        The three different kinds of named properties 
        3种不同类型的命名属性

        After giving an overview on how V8 uses HiddenClasses to track the shape of objects let’s dive into how these properties are actually stored.
        As explained in the introduction above, there are two fundamental kind of properties: named and indexed.
        The following section covers named properties.
        在我们给出v8是如果使用hiddenclass以追踪对象的shape的概要之前，让我们先深挖一下这些属性真正是如何被储存的。
        就像是上面介绍章节所说的，现在有两种基础类型的属性：具名属性和索引属性。
        接下来的小节谈的是具名属性。

        A simple object such as {a: 1, b: 2} can have various internal representations in V8.
        While JavaScript objects behave more or less like simple dictionaries from the outside, V8 tries to avoid dictionaries because they hamper certain optimizations such as inline caches which we will explain in a separate post.
        一个简单对象，例如{a: 1, b: 2}在v8种有许多内部表示。
        然而js对象的行为从外部来看或多或少的像是简单字典一般，v8试着去避免字典般的（…）因为他们会束缚住某种特定的优化，比方说inline caches，这个我们将会在另外一个单独的文章中说。

        In-object vs. normal properties:

        V8 supports so-called in-object properties which are stored directly on the object themselves.
        These are the fastest properties available in V8 as they are accessible without any indirection.
        The number of in-object properties is predetermined by the initial size of the object.
        If more properties get added than there is space in the object, they are stored in the properties store.
        The properties store adds one level of indirection but can be grown independently.
        in-object 与 普通属性：
        V8支持所谓的in-object属性，这种属性是直接存储在对象中的。
        在v8中，他们是最快捷的获取的属性，因为可以直接获取他们。
        In-object属性的数量是预先由对象的初始大小所决定的。
        如果加入的属性多于对象的空间，那么他们就会被存储在属性仓中。
        属性仓中就增加了一层间接获取，他们可以自主的大增空间。
        ￼
        Fast vs. slow properties:
        The next important distinction is between fast and slow properties.
        Typically we define the properties stored in the linear properties store as "fast".
        Fast properties are simply accessed by index in the properties store.
        To get from the name of the property to the actual position in the properties store, we have to consult the descriptor array on the HiddenClass, as we've outlined before.
        快属性 vs 慢属性：
        还有一个重要的区别就是快慢属性；
        我们一般定义的属性都存储在线性属性中，是属于“快”属性；
        快属性都是通过索引的方式在属性库中获取。
        为了能在属性库的真实位置中获取属性，我们必须要问上面我们所提到的hiddenclass中的描述数组。
        ￼


        However, if many properties get added and deleted from an object, it can generate a lot of time and memory overhead to maintain the descriptor array and HiddenClasses.
        Hence, V8 also supports so-called slow properties.
        An object with slow properties has a self-contained dictionary as a properties store.
        All the properties meta information is no longer stored in the descriptor array on the HiddenClass but directly in the properties dictionary.
        Hence, properties can be added and removed without updating the HiddenClass.
        Since inline caches don’t work with dictionary properties, the latter, are typically slower than fast properties.
        但是，在一个对象上做多次添加或删除操作，他会消耗很多时间和空间去维护描述符数组和hiddenclass；
        因此，v8同样也支持所谓的慢属性。
        一个拥有慢属性的对象他自己有一套独立的属性仓库。
        所有属性的元信息都不会存在在hiddenclass的描述符数组中，而是直接存在属性字典中。
        因此，属性可以在不更新hiddenclass的条件下添加或删除很多次。
        因为inline cache不与字典属性一起工作，因为后者比快属性慢。

        Takeaway from this section:
        这个章节的要点：

        There are three different named property types: in-object, fast and slow/dictionary.
        In-object properties are stored directly on the object itself and provide the fastest access.
        Fast properties live in the properties store, all the meta information is stored in the descriptor array on the HiddenClass.
        Slow properties live in a self-contained properties dictionary, meta information is no longer shared through the HiddenClass.
        Slow properties allow for efficient property removal and addition but are slower to access than the other two types.
        现在有三种命名属性类型：in-object、快属性、慢属性；
        1. In-object属性是直接存在在对象本身，并且是最快能获取到的属性。
        2. 快属性在属性仓库中，所有的元信息都存在hiddenclass的描述符数组中；
        3. 慢属性在有独立的属性字典，元信息不通过hiddenclass读取；
        慢属性允许有效的删除和增加属性，但是比另外两种都要慢；

        Elements or array-indexed properties

        So far we have looked at named properties and ignored integer indexed properties commonly used with arrays. 
        Handling of integer indexed properties is no less complex than named properties.
        Even though all indexed properties are always kept separately in the elements store, there are 20 different types of elements!
        到目前为止，我们已经了解了命名属性和忽略的整型索引属性。
        处理整型索引的属性也不比命名属性简单。
        尽管所有的索引属性都是分开在元素仓库中存储的，但是现在有20种不同类型的元素。

        Packed or Holey Elements:
        包装 或者 漏洞元素：

        The first major distinction V8 makes is whether the elements backing store is packed or has holes in it.
        You get holes in a backing store if you delete an indexed element, or for instance, you don't define it.
        A simple example is [1,,3] where the second entry is a hole.
        The following example illustrates this issue:
        第一个最主要的v8所做的区分，就是是否元素的备份存储是满的 还是 有漏洞的；
        如果你删除了一个索引元素，或者你没有定义它，那么你将在backing store中获得一个洞。
        简单的里面就是[1,,3],第二个入口是一个洞。
        下面的例子就解释了这个问题：

        const o = ['a', 'b', 'c'];
        console.log(o[1]);          // Prints 'b'.
                            打印b
        delete o[1];                // Introduces a hole in the elements store.
                            在元素仓库中，引入一个洞
        console.log(o[1]);          // Prints 'undefined'; property 1 does not exist.
                            打印是的是undefined；属性1不存在；
        o.__proto__ = {1: 'B'};     // Define property 1 on the prototype.
                            定义一个1在原型上；
        console.log(o[0]);          // Prints 'a'.
        console.log(o[1]);          // Prints 'B'.
        console.log(o[2]);          // Prints 'c'.
        console.log(o[3]);          // Prints undefined
        ￼
        In short, if a property is not present on the receiver we have to keep on looking on the prototype chain.
        Given that elements are self-contained, e.g. we don't store information about present indexed properties on the HiddenClass, we need a special value, called the_hole, to mark properties that are not present.
        This is crucial for the performance of Array functions.
        If we know that there are no holes, i.e. the elements store is packed, we can perform local operations without expensive lookups on the prototype chain.
        简单来说，如果一个属性没有在对象上找到， 我们就要去查找原型链；
        考虑到元素是独立的，例如，我们不会在hiddenclass上存储现在的索引属性的信息，因此我们需要一个特殊的值，称之为🕳️洞，用来标记那些没有展示的属性。
        这对于Array的函数的性能来说是很重要的。
        如果我们知道，这没有洞，例如，元素仓库是完整的，那么我们就可以不用用很大的开销向上查找原型链去做本地的操作。

        Fast or Dictionary Elements: The second major distinction made on elements is whether they are fast or dictionary-mode.
        Fast elements are simple VM-internal arrays where the property index maps to the index in the elements store.
        However, this simple representation is rather wasteful for very large sparse/holey arrays where only few entries are occupied.
        In this case we used a dictionary-based representation to save memory at the cost of slightly slower access:
        快元素 还是 字典元素：
        这是元素的第二个主要的区分，他们是否是快元素还是字典模式。
        快元素其实就是单纯的vm-内部数组，在这里，属性索引会映射到对应元素仓库的索引中。
        但是，这种简单的表示方式对于没有稀疏的或是有洞的数组是很浪费的，因为只有很少的实例会被占用。
        因此，我们就会使用字典型表达方式来节省内存空间，当然代价就是获取的速度有一点点慢；

        const sparseArray = [];
        sparseArray[9999] = 'foo'; // Creates an array with dictionary elements.
                                这样就会创建一个字典型元素。

        In this example, allocating a full array with 10k entries would be rather wasteful.
        What happens instead is that V8 creates a dictionary where we store a key-value-descriptor triplets.
        The key in this case would be '9999' and the value 'foo' and the default descriptor is used.
        Given that we don't have a way to store descriptor details on the HiddenClass, V8 resorts to slow elements whenever you define an indexed properties with a custom descriptor:
        在这个例子中，分配一个能装得下10k个元素的数组是相当浪费的。
        那么在v8中，则会创建一个字典，这个字典中有 key-value-描述符。
        9999就是他的key，value是foo，然后使用默认的描述符。
        考虑到我们没有不能把descriptor细节存在hiddenclass上，v8就诉诸于一个慢对象，当你定义了一个带有自定义描述符的索引属性。

        const array = [];
        Object.defineProperty(array, 0, {value: 'fixed' configurable: false});
        console.log(array[0]);      // Prints 'fixed'.
        array[0] = 'other value';   // Cannot override index 0.
        console.log(array[0]);      // Still prints 'fixed'.

        In this example we added a non-configurable property on the array.
        This information is stored in the descriptor part of a slow elements dictionary triplet.
        It is important to note that Array functions perform considerably slower on objects with slow elements.
        在这个例子中，我们添加了一个不可配置属性到数组上。
        这个信息被存储到一个慢元素到字典册中。
        需要注意的是Array函数，在执行一个带着慢元素的对象是很慢的。

        Smi and Double Elements:
        小整型和双精度元素
        For fast elements there is another important distinction made in V8.
        For instance if you only store integers in an Array, a common use-case, the GC does not have to look at the array, as integers are directly encoded as so called small integers (Smis) in place.
        Another special case are Arrays that only contain doubles.
        Unlike Smis, floating point numbers are usually represented as full objects occupying several words.
        However, V8 stores raw doubles for pure double arrays to avoid memory and performance overhead.
        The following example lists 4 examples of Smi and double elements:
        对于快元素来说，v8并没没有做什么特别重要的区分。
        例如，如果你在array中只存了整数，这种一般用法，gc都不一定需要去看数字，因为数字会直接被编码成小整型（Smis）。
        另一个特别的例子是，数组中只存了双精度数字。
        与smis不同，浮点数通常都被
        但是，v8存储raw doubles来存纯双精度数组以避免过多的空间与性能的开销。
        下面4个例子列举了4个关于小整型和双精度元素：

        const a1 = [1,   2, 3];  // Smi Packed
                                完整小整型
        const a2 = [1,    , 3];  // Smi Holey, a2[1] reads from the prototype
                            漏洞小整型，a2[1]是从原型链上读取
        const b1 = [1.1, 2, 3];  // Double Packed
                            完整双浮点
        const b2 = [1.1,  , 3];  // Double Holey, b2[1] reads from the prototype
                            漏洞双浮点，b2[1]从原型链上读取

        Special Elements:
        With the information so far we covered 7 out of the 20 different element kinds.
        For simplicity we excluded 9 element kinds for TypedArrays, two more for String wrappers and last but not least, two more special element kinds for arguments objects.
        特殊元素：
        上面提到的20种不同的元素类型中的7种。
        为了方便起见，我们排除了9种TypedArrays类型，2种字符串包裹器，还有2种特殊参数对象元素。

        The ElementsAccessor:
        元素存取器：

        As you can imagine we are not exactly keen on writing Array functions 20 times in C++, once for every elements kind.
        That's where some C++ magic comes into play.
        Instead of implementing Array functions over and over again, we built the ElementsAccessor where we mostly have to implement only simple functions that access elements from the backing store.
        The ElementsAccessor relies on CRTP to create specialized versions of each Array function.
        So if you call something like slice on an array, V8 internally calls a builtin written in C++ and dispatches through the ElementsAccessor to the specialized version of the function:

        正如你所想的那样，我们并不想在c++中写对每一个类型的元素写20次Array函数。
        而这也就是c++上场的时候。
        我们构建了元素存取器，依赖于他，我们只需要实现简单的函数，然后传入从备份库中取出的元素，而无需一次又一次的去实现数组的函数。
        元素存取器依赖于 CRTP创建不同版本的Array函数。
        因此如果你对一个数组调用一个方法，比方是slice，v8的内部会调用一个用c++写的内建函数，并且通过元素存取器去派遣特定版本的函数
        ￼

        Takeaway from this section:
        这个章节的要点：

        There are fast and dictionary-mode indexed properties and elements.
        Fast properties can be packed or they can contain holes which indicate that an indexed property has been deleted.
        Elements are specialized on their content to speed up Array functions and reduce GC overhead.
        Understanding how properties work is key to many optimizations in V8.
        For JavaScript developers many of these internal decisions are not visible directly, but they explain why certain code patterns are faster than others.
        Changing the property or element type typically causes V8 to create a different HiddenClass which can lead to type pollution which prevents V8 from generating optimal code.
        Stay tuned for further posts on how the VM-internals of V8 work.
        现有快属性、快元素、字典模式索引的属性和元素。
        快属性可以是完整的或者也可以是有洞的，有洞就表示，一个索引属性被删除了。

        能理解属性是如何工作的是在v8中优化的关键。
        对于js开发者们来说，很多内部的这些决策都不是直接可见的，也就是他们，可以解释为什么某些代码的模式是快与其他的模式的。
        改变属性或类型是典型的会导致v8创造不同hiddenclass的方式，也是如此，他可能会导致类型污染，从而使得难以写出最佳代码。
        继续关注我们，来了解v8内部的vm-内部是怎么工作的。
`;

function FastPropertiesInV8() {
    return (
      <pre className="FastPropertiesInV8">
        {template}
      </pre>
    );
  }
  
  export default FastPropertiesInV8;