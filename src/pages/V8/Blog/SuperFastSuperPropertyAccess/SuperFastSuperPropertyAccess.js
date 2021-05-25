const content = `
Super fast super property access
Published 18 February 2021 · Tagged with JavaScript
超快的super属性通道
发表于 2021年2月18日 标签：javascript

The super keyword can be used for accessing properties and functions on an object’s parent.
Previously, accessing a super property (like super.x) was implemented via a runtime call.
Starting from V8 v9.0, we reuse the inline cache (IC) system in non-optimized code and generate the proper optimized code for super property access, without having to jump to the runtime.
super这个关键词可用于获取对象父级属性和函数；
在早期，通过运行时调用来实现获取super属性（例如super.x）。
从v8 v9.0版本开始，我们在未优化的代码中复用内联缓存（IC）系统，生成适宜的已优化的代码，用于给super属性获取，这样以来我们就不需要跳到运行时来实现这个功能。

As you can see from the graphs below, super property access used to be an order of magnitude slower than normal property access because of the runtime call.
Now we’re much closer to being on par.
正如你从下面中所看到，super属性的获取放
Compare super property access to regular property access, optimizedCompare super property access to regular property access, unoptimizedSuper property access is difficult to benchmark, since it must happen inside a function. We can’t benchmark individual property accesses, but only bigger chunks of work. Thus the function call overhead is included in the measurement. The above graphs somewhat underestimate the difference between super property access and normal property access, but they’re accurate enough for demonstrating the difference between the old and new super property access.
In the unoptimized (interpreted) mode, super property access will always be slower than normal property access, since we need to do more loads (reading the home object from the context and reading the __proto__ from the home object). In the optimized code, we already embed the home object as a constant whenever possible. This could be further improved by embedding its __proto__ as a constant too.
Prototypal inheritance and superLet’s start from the basics - what does super property access even mean?
classA{}
A.prototype.x =100;

classBextendsA{
m(){
returnsuper.x;
}
}
const b =newB();
b.m();Now A is the super class of B and b.m() returns 100 as you’d expect.
Class inheritance diagramThe reality of JavaScript’s prototypal inheritance is more complicated:
Prototypal inheritance diagramWe need to distinguish carefully between the __proto__ and prototype properties - they don’t mean the same thing! To make it more confusing, the object b.__proto__ is often referred to as "b’s prototype".
b.__proto__ is the object from which b inherits properties. B.prototype is the object which will be the __proto__ of objects created with new B(), that is b.__proto__ === B.prototype.
In turn, B.prototype has its own __proto__ property that equals to A.prototype. Together, this forms what’s called a prototype chain:
b ->  b.__proto__ === B.prototype ->   B.prototype.__proto__ === A.prototype ->    A.prototype.__proto__ === Object.prototype ->     Object.prototype.__proto__ === null Through this chain, b can access all properties defined in any of those objects. The method m is a property of B.prototype — B.prototype.m — and this is why b.m() works.
Now we can define super.x inside m as a property lookup where we start looking for the property x in the home object’s __proto__ and walk up the prototype chain until we find it.
The home object is the object where the method is defined - in this case the home object for m is B.prototype. Its __proto__ is A.prototype, so that’s where we start looking for the property x. We’ll call A.prototype the lookup start object. In this case we find the property x immediately in the lookup start object, but in general it might also be somewhere further up the prototype chain.
If B.prototype had a property called x, we’d ignore it, since we start looking for it above it in the prototype chain. Also, in this case super property lookup doesn’t depend on the receiver - the object that is the this value when calling the method.
B.prototype.m.call(some_other_object);// still returns 100If the property has a getter though, the receiver will be passed to the getter as the this value.
To summarize: in a super property access, super.x, the lookup start object is the __proto__ of the home object and the receiver is the receiver of the method where the super property access occurs.
In a normal property access, o.x, we start looking for the property x in o and walk up the prototype chain. We’ll also use o as the receiver if x happens to have a getter - the lookup start object and the receiver are the same object (o).
Super property access is just like regular property access where the lookup start object and the receiver are different.
Implementing faster superThe above realization is also the key for implementing fast super property access. V8 is already engineered to make property access fast - now we generalized it for the case where the receiver and the lookup start object differ.
V8’s data-driven inline cache system is the core part for implementing fast property access. You can read about it in the high-level introduction linked above, or the more detailed descriptions of V8’s object representation and how V8’s data-driven inline cache system is implemented.
To speed up super, we’ve added a new Ignition bytecode, LdaNamedPropertyFromSuper, which enables us to plug into the IC system in the interpreted mode and also generate optimized code for super property access.
With the new byte code, we can add a new IC, LoadSuperIC, for speeding up super property loads. Similar to LoadIC which handles normal property loads, LoadSuperIC keeps track of the shapes of the lookup start objects it has seen and remembers how to load properties from objects which have one of those shapes.
LoadSuperIC reuses the existing IC machinery for property loads, just with a different lookup start object. As the IC layer already distinguished between the lookup start object and the receiver, the implementation should’ve been easy. But as the lookup start object and the receiver were always the same, there were bugs where we’d use the lookup start object even though we meant the receiver, and vice versa. Those bugs have been fixed and we now properly support cases where the lookup start object and the receiver differ.
Optimized code for super property access is generated by the JSNativeContextSpecialization phase of the TurboFan compiler. The implementation generalizes the existing property lookup machinery (JSNativeContextSpecialization::ReduceNamedAccess) to handle the case where the receiver and the lookup start object differ.
The optimized code got even more optimal when we moved the home object out of the JSFunction where it was stored. It’s now stored in the class context, which makes TurboFan embed it into the optimized code as a constant whenever possible.
Other usages of supersuper inside object literal methods works just like inside class methods, and is optimized similarly.
const myproto ={
  __proto__:{'x':100},
m(){returnsuper.x;}
};
const o ={ __proto__: myproto };
o.m();// returns 100There are of course corner cases which we didn’t optimize for. For example, writing super properties (super.x = ...) is not optimized. In addition, using mixins turns the access site megamorphic, leading into slower super property access:
functioncreateMixin(base){
classMixinextendsbase{
m(){returnsuper.m()+1;}
//                ^ this access site is megamorphic
}
return Mixin;
}

classBase{
m(){return0;}
}

const myClass =createMixin(
createMixin(
createMixin(
createMixin(
createMixin(Base)
)
)
)
);
(newmyClass()).m();There’s still work to be done to ensure all object-oriented patterns are as speedy as they can be - stay tuned for further optimizations!
`
function ShortBuiltinCalls() {
    return (
      <pre className="ShortBuiltinCalls">
        {content}
      </pre>
    );
  }
  
  export default ShortBuiltinCalls;