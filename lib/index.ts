import { observe } from "./core/observe";

interface VLoption {
  data?: object
}

class VueLike {
  public $options: VLoption

  private _data: object 

  constructor(options: VLoption = {}) {
    this.$options = options

    const data = this._data = this.$options.data
    
    Object.keys(data).forEach(key => this.proxyData(key))

    observe(data, this)
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