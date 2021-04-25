const TetraApp = require('@tetrajs/app')
const app = new TetraApp(__dirname)
module.exports = app.export()

// class ClassWithStaticMethod {
//   static global;

//   static staticProperty = 'someValue';
//   static staticMethod() {
//     return 'static method has been called.';
//   }

// }

// console.log(ClassWithStaticMethod.staticProperty);
// // output: "someValue"
// console.log(ClassWithStaticMethod.staticMethod());
// // output: "static method has been called."

// console.log('global' in ClassWithStaticMethod);
