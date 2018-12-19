class Watcher {
  vm: any
  expOrFn: any
  cb?: Function

  constructor(vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
  }

  update() {
    this.run()
  }

  run() {
    
  }
}