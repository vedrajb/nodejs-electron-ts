import ffi from 'ffi-napi';
import ref from 'ref-napi';

export class fibo_ffi {
    ffilib = ffi.Library("./server/bin/binding.dll", {
        fibonacci_init: [ref.types.void, [ ref.types.int, ref.types.int ]],
        fibonacci_next: [ref.types.bool, []],
        fibonacci_current: [ref.types.int, []],
        fibonacci_index: [ref.types.int, []],
    });

    init() {
        this.ffilib.fibonacci_init(0, 1);  // initialize the sequence to 0, 1
    }

    next() {
        return this.ffilib.fibonacci_next();
    }

    current() {
        return this.ffilib.fibonacci_current();
    }

    index() {
        return this.ffilib.fibonacci_index();
    }
}
