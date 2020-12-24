function 棒グラフ (数値: number) {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (y * 5 + x < 数値 / 10) {
                led.plot(x, 4 - y)
            } else {
                led.unplot(x, 4 - y)
            }
        }
    }
}
input.onSound(DetectedSound.Loud, function () {
    input.setSoundThreshold(SoundThreshold.Loud, 255)
    if (input.soundLevel() > 128) {
        pins.analogWritePin(AnalogPin.P1, 1023)
        basic.pause(200)
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (input.soundLevel() > 96) {
        pins.analogWritePin(AnalogPin.P1, 1023)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(100)
    } else {
        pins.analogWritePin(AnalogPin.P1, 1023)
        basic.pause(50)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(150)
    }
    input.setSoundThreshold(SoundThreshold.Loud, 72)
})
let b = 0
let g = 0
let r = 0
let voice = 0
let strip = neopixel.create(DigitalPin.P0, 4)
strip.clear()
input.setSoundThreshold(SoundThreshold.Loud, 72)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
basic.forever(function () {
    voice = input.soundLevel()
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        watchfont.showIcon(
        "01110",
        "10001",
        "01110",
        "10001",
        "01110"
        )
    } else if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        watchfont.showNumber2(12)
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        watchfont.showNumber2(13)
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        watchfont.showNumber2(16)
    } else {
        棒グラフ(voice)
    }
    r = voice
    g = voice / 1
    b = voice / 1
    strip.setPixelColor(0, neopixel.rgb(r, 0, 0))
    strip.setPixelColor(1, neopixel.rgb(r, g, 0))
    strip.setPixelColor(2, neopixel.rgb(r, 0, b))
    strip.setPixelColor(3, neopixel.rgb(0, g, b))
    strip.show()
    basic.pause(10)
})
