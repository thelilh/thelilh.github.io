document.getElementById('map').addEventListener('load', function () {
    // Will get called after embed element was loaded
    var options = {
        zoomEnabled: true
        , controlIconsEnabled: true
        , customEventsHandler: {
            // Halt all touch events
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']

            // Init custom events handler
            , init: function (options) {
                // Init Hammer
                this.hammer = Hammer(options.svgElement)

                // Handle double tap
                this.hammer.on('doubletap', function (ev) {
                    options.instance.zoomIn()
                })
            }

            // Destroy custom events handler
            , destroy: function () {
                this.hammer.destroy()
            }
        }
    }

    svgPanZoom(document.getElementById('map'), options);
})
