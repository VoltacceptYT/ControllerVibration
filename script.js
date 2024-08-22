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
            if (this.go) this.startTest();
        },

        startTest() {
            var triggerPrecisionTooltip = document.getElementById("triggerPrecisionTooltip");
            this.gamepad.vibrationActuator.playEffect('dual-rumble', {
                duration: 100,
                strongMagnitude: this.gamepad.buttons[7].value,
                weakMagnitude: this.gamepad.buttons[7].value
            })
                .then(() => {
                    if (this.go) this.startTest();
                })
                .catch(err => console.log(err))
            this.triggerPrecision = Math.round(this.gamepad.buttons[7].value * 100);

            var val = Math.round(this.triggerPrecision);
            var min = this.triggerPrecision.min ? this.triggerPrecision.min : 0;
            var max = this.triggerPrecision.max ? this.triggerPrecision.max : 100;
            var newVal = Number((((val - min) * 100) / (max - min)));
            triggerPrecisionTooltip.innerText = val;
            
            triggerPrecisionTooltip.style.left = newVal + "%";
        }

    },
    computed: {

        button() {
            return this.go ? 'Stop' : 'Start'
        }
    }
});
