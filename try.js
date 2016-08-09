function test(obj) {
    console.log(obj.foo());
}

let fruz = new class {
    foo() { this.x = 42; return this.bar(); }
    bar() { return this.x; }
};

test(fruz);

test(new class {
    foo() { this.x = 42; return this.bar(); }
    bar() { return this.x; }
});

test({
    foo: function () { this.x = 42; return this.bar(); },
    bar: function () { return this.x; }
});

test({
    foo: () => { this.x = 42; return this.bar(); },
    bar: () => { return this.x; }
});
