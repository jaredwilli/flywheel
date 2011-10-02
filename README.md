# Flywheel

Flywheel is a micro-lib (maybe even micro-micro lib) for making animation- and game-loops, implementing HTML5's RequestAnimationFrame while maintaining backwards compatibility.

It's available standalone (just use src/flywheel.js), or via ender:

    ender build flywheel


## Example

See [the example](http://hughfdjackson.github.com/flywheel/example/) for a demo usage of flywheel.


## API

This API section is going to focus on the non-ender API.  If you're using ender, you can simply use `var flywheel = require("flywheel")`
### Basic Usage

#### setting up a function to loop:

    // Sets up flywheel to report the time difference between this frame and the last
    var fw = flywheel(function(time_delta){
                        console.log(time_delta)
                    })


#### start it spinning:

    fw.start()
    
    
#### stop it again:
    
    fw.stop()
    
#### step through a single frame:

    fw.step()
    
    
### Extra Options

#### setting a framerate-cap

In times of exceptional load, or when a user clicks away from the window and back again, the time difference between two frames can be large enough to effect any physics logic negatively.  Capping the framerate helps with this by substituting a fake value for any long delays.  There is a default cap of 30fps.

	// in setup.  
	fw = flywheel(function(time_delta){
    	console.log(time_delta)
    ), 40) 	// if the framerate drops below 40fps, cap it
    
	// after setup
	fw.set_framerate_cap(20)	// if the framerate drops below 20fps, cap it
	
#### changing the callback

    // tries to write "blip" 60 times a second, where possible
    fw.set_callback(function(time_delta){
        console.log("blip")     
    })

#### step with an arbitrary time_delta

	fw.step_by(100)	// the callback's time_delta will be '100'
	
### Feature Requests

If you have any suggestions, feel free to add a ticket, or tweet at [@hughfdjackson](http://twitter.com/#!/hughfdjackson).



## Test suite and compatability

The src-test directory holds a test-suite designed ensure that flywheel is working properly.  The following browsers have been used with this test suite, and passed:

* Opera 11
* Safari 5
* Firefox 4-6
* IE 6-9
* Chrome 13

You're very welcome to [test it yourself](http://hughfdjackson.github.com/flywheel/src-test/SpecRunner.html).  If you're feeling particularly generous, you could even drop me a line to tell me if there are any problems, or if there's another webbrowser I can add to the compatibility list!

## Legal and Licensing

This software is available under the MIT license:

Copyright (c) 2011 Hugh FD Jackson (@hughfdjackson)


>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 


