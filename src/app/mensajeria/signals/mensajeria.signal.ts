import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MensajeriaSignal {

    toggle = signal( true );

    setToggle() {
        this.toggle.update( toggle => !toggle);
    }

}