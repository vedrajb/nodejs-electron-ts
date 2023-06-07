import ffi from 'ffi-napi';
import ref from 'ref-napi';

function strToPtr(text: string): Buffer {
    
    //setup buffer
    var maxLength = text.length + 1;
    var buffer = Buffer.alloc(maxLength);
    buffer.fill(0); 
    buffer.write(text, 0, "utf-8"); 
    
    return buffer;
}

export class fibo_ffi {
    ffilib: any;
    
    constructor() {
        this.ffilib = ffi.Library("./server/bin/binding.dll", {
            fibonacci_init: [ref.types.void, [ ref.types.CString, ref.types.int, ref.types.int ]],
            fibonacci_next: [ref.types.bool, [ ref.types.CString ]],
            fibonacci_current: [ref.types.int, [ ref.types.CString ]],
            fibonacci_index: [ref.types.int, [ ref.types.CString ]],
        });
        
        this.init = this.init.bind(this);
        this.next = this.next.bind(this);
        this.current = this.current.bind(this);
        this.index = this.index.bind(this);
    }
    
    init(id: string) {
        const buffer = strToPtr(id);
        this.ffilib.fibonacci_init(buffer, 0, 1);  // initialize the sequence to 0, 1
    }
    
    next(id: string) {
        const buffer = strToPtr(id);
        return this.ffilib.fibonacci_next(buffer);
    }
    
    current(id: string) {
        const buffer = strToPtr(id);
        return this.ffilib.fibonacci_current(buffer);
    }
    
    index(id: string) {
        const buffer = strToPtr(id);
        return this.ffilib.fibonacci_index(buffer);
    }
}
