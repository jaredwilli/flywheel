void function(root){
    
    // shim for cross-browser requestAnimationFrame, 
    // with setTimeout for a backup for older browsers
    var request_animation_frame = function () {
        return  window.requestAnimationFrame       
            ||  window.webkitRequestAnimationFrame 
            ||  window.mozRequestAnimationFrame
            ||  window.oRequestAnimationFrame
            ||  window.msRequestAnimationFrame
            ||  function (callback) {
                setTimeout(function () {
                    callback(+new Date())
                }, 1000 / 60)
            } 
    }()
    

    //// controller : Object
    // 
    // gets returned from flywheel to let the
    // user manipulate the looping
    var controller = {
        
        // --- Attributes --- // 
        callback:           undefined,
        element:            undefined,
        framerate_cap:      33,
        default_framerate:  16,
        
        _last_timestamp:    undefined,
        _running:           false,
        

        // --- Methods --- //
        start: function(){
            this._running = true
            this._next_frame(undefined, this.default_framerate) 
            return this
        },

        stop: function(){
            this._running = false
            return this
        },
        
        toggle: function(){
            this._running ? this.stop()
            : /*otherwise*/ this.start()
            return this
        },

        step: function(time_delta){
            this._next_frame(undefined, time_delta || this.default_framerate)
            return this
        },

        //// (timestamp : Number || undefined [, time_delta : Number]) -> undefined
        //
        // This is the function that is looped over. `time_delta` lets methods
        // such as `step` pass a time_delta directly in.
        _next_frame: function(timestamp, time_delta){
            
            // set up next frame
            if ( this._running ) 
                request_animation_frame(this._next_frame.bind(this), this.element)
            
            // calculate time_delta from timestamp if a time_delta was not passed in
            if ( typeof time_delta === "undefined" ) {
                time_delta = timestamp - this._last_timestamp
                if ( time_delta > this.framerate_cap ) time_delta = this.framerate_cap
                this._last_timestamp = timestamp
            }  
            
            // if time_delta is 0 or NaN (etc), we may not want to call callback
            if ( time_delta ) this.callback(time_delta)
            
        }
    }


    //// (callback : Function[, element : HTMLElement ]) -> controller : Object
    //
    //  Public API for flywheel.  Just a wrapper around
    //  an instance of the controller object, really.
    function flywheel(callback, element){
        
        var ret_controller = Object.create(controller)
        
        ret_controller.callback = callback
        ret_controller.element  = element
        
        return ret_controller 
    }

    //// export using commonjs or into the global scope
    if ( typeof module !== "undefined" && module["exports"] )
        module["exports"] = flywheel
    else
        root["flywheel"] = flywheel

}(this)
