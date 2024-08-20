new Vue({
    el: '#app',
    data() {
        return {
            gamepad: null,
            triggerPrecision: 0,
            go: false
        }
    },
    created() {
        const pollGamepads = setInterval(() => {
            const gamepad = navigator.getGamepads()[0]
            console.log(gamepad)
            if (gamepad) {
                this.gamepad = gamepad
            }
        }, 1)
    },
    
    methods: {

        toggleGo() {
            this.go = !this.go;
            if (this.go) this.vibrate();
        },

        vibrate() {
            this.gamepad.vibrationActuator.playEffect('dual-rumble', {
                duration: 100,
                strongMagnitude: this.gamepad.buttons[7].value,
                weakMagnitude: this.gamepad.buttons[7].value
            })
                .then(() => {
                    if (this.go) this.vibrate();
                })
                .catch(err => console.log(err))
            
            this.triggerPrecision = this.gamepad.buttons[7].value * 100;
        }

    },
    computed: {

        button() {
            return this.go ? 'Stop' : 'Start'
        }
    }
});
