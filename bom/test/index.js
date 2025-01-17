// const immediateId = setImmediate(() => {
// 	console.log('over'); 
//   console.log('over'); 
//   console.log('over'); 
//   console.log('over'); 
// });

// console.log('starting', immediateId);

// Immediate {
//   _idleNext: null,
//   _idlePrev: null,
//   _onImmediate: [Function (anonymous)],
//   _argv: undefined,
//   _destroyed: false,
//   [Symbol(refed)]: true,
//   [Symbol(asyncId)]: 2,
//   [Symbol(triggerId)]: 1
// }


// const fs = require('fs');

// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });


// const channel = new MessageChannel();

// const { port1, port2 } = channel;


// port1.postMessage('I am PORT-1');
// port2.postMessage('I am PORT-2');




// console.log(port1);
// console.log(port2);

// MessageChannel {
//   port1: MessagePort [EventTarget] {
//     active: true,
//     refed: false,
//     [Symbol(kEvents)]: SafeMap(2) [Map] {
//       'newListener' => [Object],
//       'removeListener' => [Object]
//     },
//     [Symbol(events.maxEventTargetListeners)]: 10,
//     [Symbol(events.maxEventTargetListenersWarned)]: false,
//     [Symbol(kNewListener)]: [Function (anonymous)],
//     [Symbol(kRemoveListener)]: [Function (anonymous)],
//     [Symbol(nodejs.internal.kCurrentlyReceivingPorts)]: undefined
//   },
//   port2: MessagePort [EventTarget] {
//     active: true,
//     refed: false,
//     [Symbol(kEvents)]: SafeMap(2) [Map] {
//       'newListener' => [Object],
//       'removeListener' => [Object]
//     },
//     [Symbol(events.maxEventTargetListeners)]: 10,
//     [Symbol(events.maxEventTargetListenersWarned)]: false,
//     [Symbol(kNewListener)]: [Function (anonymous)],
//     [Symbol(kRemoveListener)]: [Function (anonymous)],
//     [Symbol(nodejs.internal.kCurrentlyReceivingPorts)]: undefined
//   }
// }



// import port2 from './demo.js';

// ;(() => {
//   port2.postMessage('This is new title');

//   port2.onmessage = (e) => {
//     console.log(e.data);
//   }
// })();



// const oElem = document.getElementById('box');

// let start;

// function step (timestamp) {
//   if (start === undefined) start = timestamp;
    
//   const elapsed = timestamp - start;

//   oElem.style.transform = `translateX(${ Math.min(0.1 * elapsed, 200) }px)`;

//   if (elapsed < 2000) {
//     window.requestAnimationFrame(step);
//   }
// }

// window.requestAnimationFrame(step);

// const oElem = document.getElementById('box');

// let px = 0;
// let t = null

// function step () {
//   px++;

//   oElem.style.transform = `translateX(${ px }px)`;

//   if (px >= 200) {
//     clearInterval(t);
//   }
// }

// t = setInterval(step, 1000 / 60);


// function callback (target) {
//   console.log(target);
// }

// function cb (mutationList, observer) {
//   mutationList.forEach(mutation => {
//     callback(mutation.target);
//   });
// }

// const oTarget = document.getElementById('app');
// const oTitle = oTarget.querySelector('h1');

// const observer = new MutationObserver(cb);

// observer.observe(oTarget, {
//   attributes: true, // 监视元素属性变更
//   childList: true, // 监视目标节点添加或删新的子节点
//   subtree: true, // 将监视范围扩展至目标节点整个节点树中的所有节点
// });

// oTitle.innerText = 'This is a title';
// oTitle.className = 'title';

// const oParent = document.createElement('p');

// oParent.innerText = 'This is content';

// oTarget.appendChild(oParent);

// process.nextTick(() => {
//   console.log('nextTick1');
// });

// Promise.resolve().then(() => {
//   console.log('Promise');
// });

// process.nextTick(() => {
//   console.log('nextTick2');
// });

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// process.nextTick(() => {
//   console.log('nextTick3');
// });


// const fs = require('fs');
// const { readFile } = fs;

// Promise.resolve().then(() => {
//   console.log(1);
// });

// process.nextTick(() => {
//   console.log(2);
// });

// console.log('start');

// readFile('1.txt', 'utf-8', () => {
//   setTimeout(() => {
//     console.log(3);
//   }, 0);

//   process.nextTick(() => {
//     console.log(4);
//   });

//   setImmediate(() => {
//     console.log(5);
//   });

//   console.log(6);
// });

// console.log(7);

// setTimeout(() => {
//   console.log(8);
// }, 0);

// setImmediate(() => {
//   console.log(9);
// });

// console.log('end');


const fs = require('fs');
const { readFile } = fs;

process.nextTick(() => {
  console.log(1);
});

console.log('start');

setTimeout(() => {
  console.log(2);
}, 0);

setTimeout(() => {
  console.log(3);
}, 0);

setImmediate(() => {
  console.log(4);

  process.nextTick(() => {
    console.log(5);

    Promise.resolve().then(() => {
      console.log(6);
    });
  })
});

readFile('1.txt', 'utf-8', () => {
  process.nextTick(() => {
    console.log(7);
  });

  setTimeout(() => {
    console.log(8);
  }, 0);

  setImmediate(() => {
    console.log(9);
  });
});

readFile('2.txt', 'utf-8', () => {
  process.nextTick(() => {
    console.log(10);
  });

  setTimeout(() => {
    console.log(11);
  }, 0);

  setImmediate(() => {
    console.log(12);
  });
});

console.log('end');
