const content = `ts的主要卖点之一就是，它能让你在现有仅支持（es3 或 es5）的js引擎像现代的浏览器和nodejs一样，使用es6或者更新的语法；
因此我们通过深挖这些性能是如何在ts中实现的同时，也能告诉你为什么这些新特性有用；

备注：
    在这些特性之中，并不是所有特性都是为了js而添加的，但都对组织和维护你的代码有帮助；
    同时，请记得，你可以忽略那些对你现在的项目没有任何意义的结构，尽管到最后都终会使用到他们：）

classes
    为什么class在js如此重要的原因有以下几点：
        1. class可以了一种很有用的结构化抽象
        2. 提供了一种不论使用任何框架都可以有统一的使用class的方法；
        3. 面向对象的开发者能很容易理解class
    最终，js开发者有了class，看看下面这个point的例子：
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        add(point: Point) {
            return new Point(this.x + point.x, this.y + point.y);
        }
    }

    var p1 = new Point(0, 10);
    var p2 = new Point(10, 20);
    var p3 = p1.add(p2); // {x:10,y:30}

    如果使用es5，我们会这样实现它：
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.add = function (point) {
            return new Point(this.x + point.x, this.y + point.y);
        };
        return Point;
    })();

    这就是作为一等语言结构的惯用的jsclass的模式；

Inheritance
    ts的class（和其他语言一样）用extends关键词来继承，如下面这个例子：
    class Point3D extends Point {
        z: number;
        constructor(x: number, y: number, z: number) {
            super(x, y);
            this.z = z;
        }
        add(point: Point3D) {
            var point2D = super.add(point);
            return new Point3D(point2D.x, point2D.y, this.z + point.z);
        }
    }
    如果在你的class中有一个constructor，那么你必须在你的constructor 里面调用父类的constructor（ts也会提醒你）。这样就可以确保给你的this赋值；
    然后通过调用super，你可以在你的constructor里面调用你想要调用的方法（这里，我们添加了z）

    记住，如果你要重写父级的方法（在这个例子里面我们重写了add方法），也是需要你使用super这个语法；

静态方法：
    ts支持静态属性，这样，所有的类的实例可以使用它；
    class Something {
        static instances = 0;
        constructor() {
            Something.instances++;
        }
    }

    var s1 = new Something();
    var s2 = new Something();
    console.log(Something.instances); // 2

    你当然也可以用静态方法啦～

Access Modifiers：
    ts也支持方法权限设置：public、private，protect，这三个选项决定了类的成员的权限；
    accessible on	public	protected	private
    class	        yes	    yes	        yes
    class children	yes	    yes	        no
    class instances	yes	    no	        no

    如果访问权限没有明确说明的话，它默认是public，这就和js一样了；

    注意，如果你没有正确使用他们的，在运行时（生产环境的js）不会有任何意义（不会报错），而在编译时，则会报错；
    class FooBase {
        public x: number;
        private y: number;
        protected z: number;
    }

    // EFFECT ON INSTANCES
    var foo = new FooBase();
    foo.x; // okay
    foo.y; // ERROR : private
    foo.z; // ERROR : protected

    // EFFECT ON CHILD CLASSES
    class FooChild extends FooBase {
        constructor() {
        super();
            this.x; // okay
            this.y; // ERROR: private
            this.z; // okay
        }
    }

Abstract ？？？？
    abstract可以被视为是权限设置的方法；
    我们之所以把它与前面的权限设置分开讲，是因为它和后者是互斥的；
    它可以用于class上，也可以用于class的某个属性、方法上；（members）
    abstruct 设置器主要是用来表明，这个功能不能被直接调用，并且子类必要provide the functionality.
    abstruct class不能直接初始化。开发者必须让另外一个class来继承这个abstruct的类；
    abstruct members 不可以直接调用，并且它的子类必须提供 provide the functionality.

constructor是可有可无的
    例子：
        class Foo {}
        var foo = new Foo();

定义using constructor 

    class中有一个变量，并这样初始化它：
        class Foo {
            x: number;
            constructor(x:number) {
                this.x = x;
            }
        }
    这其实是个很相见的例子；ts提供了一些快捷方式，可以简化设置权限；它会自动的在class上声明，然后从constructor上复制；所以之前的那个例子也可以写成这样：
    class Foo {
        constructor(public x:number) {
        }
    }
Property initializer 属性的初始化

    这是一个有意思的特性（来自es7），你可以在class的constructor之外初始化任何参数，这个方法用来设置默认值，非常有用；
    class Foo {
        members = [];  // Initialize directly
        add(x) {
            this.members.push(x);
        }
    }
`
