import { observe } from "./core/observe";
import { Compile } from './core/compiler'

interface VLoption {
  data?: object
  el?: Element | string
}

class VueLike {
  public $options: VLoption
  public $compile: any

  private _data: object 

  constructor(options: VLoption = {}) {
    const vm = this

    this.$options = options

    const data = this._data = this.$options.data
    
    Object.keys(data).forEach(key => this.proxyData(key))

    observe(data, vm)

    this.$compile = new Compile(options.el || document.body, this)
  }

  private proxyData(key) {
    const vm = this

    Object.defineProperty(vm, key, {
      get() {
        return vm._data[key]
      },
      set(newval) {
        vm._data[key] = newval
      }
    })
  }

  $watch() {
    return 
  }
}

export default VueLike