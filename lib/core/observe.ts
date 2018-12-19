class Observer {
  data: object
  proxy: any

  constructor(data) {
    this.data = data
    this.walk(data)
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    })
  }

  convert(key, val) {
    this.defineReactive(this.data, key, val)
  }

  defineReactive(data, key, val) {
    const dep = new Dep()
    let childObj = observe(val)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        if (Dep.target) {
          dep.depend()
        }

        return val
      },
      set: function(newval) {
        if (newval === val) {
          return
        }

        val = newval

        childObj = observe(newval)
        dep.notify()
      }
    })
  }
}

export function observe(value, vm?) {
  if (!value || typeof value !== 'object') {
    return
  }

  return new Observer(value)
}

let uid = 0

class Dep {
  id: number
  subs: Array<any>

  static target = null

  constructor() {
    this.id = uid++
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  depend() {
    Dep.target.addDep(this);
  }

  removeSub(sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  }

  notify() {
    this.subs.forEach(function (sub) {
      sub.update();
    })
  }
}