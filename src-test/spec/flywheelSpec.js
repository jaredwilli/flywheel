describe("flywheel", function(){
    
    describe("eteration properties", function(){
        it("should eterate over a callback", function(){

            var e = 0;
            
            flywheel(function(){
                e += 1      
            }).start()

            waitsFor(function() {
              return e > 100
            }, "flywheel to reach 100 eterations", 5000);

            runs(function () {
                expect(e).toBeGreaterThan(100)
            })

        })
        
        it("should cap at the default framerate", function(){
            
            var time_delta,
                fly = flywheel(function(timeDelta){
                    var len = 100000
                    while ( len ) {
                        len--
                    }
                    time_delta = timeDelta
                }).step().step()
                
            expect(time_delta).toEqual(fly._max_frame_duration)
        
        
        })
        
        it("should cap at any user-set framerate", function(){
            
            var time_delta,
                fly = flywheel(function(timeDelta){
                    var len = 100000
                    while ( len ) {
                        len--
                    }
                    time_delta = timeDelta
                }, 20).step().step()
                
            expect(time_delta).toEqual(1000/20)
            
        })
        
        
            // I have reservations about this test, since it's js measuring
            // js.  
         it("timeDelta should be within 10% of the timeout time", function(){
            
            var total_time = 0,
                fly = flywheel(function(timeDelta){
                    total_time += timeDelta            
                }).start()
            
            waits(1000)
                            
            runs(function(){
                expect(total_time).toBeGreaterThan(1000 - 100)
                expect(total_time).toBeLessThan(1000 + 100)
            })
        })
        
    })
    
    describe("controls", function(){

        var e = 0,
            fly = flywheel(function(){
                e += 1
                })

        it("should stop and restart when told", function(){
            fly.start()

            waitsFor(function(){
                return e > 10
            }, "e > 10", 1000)

            
            runs(function () {
                fly.stop()
                expect(e).toBeGreaterThan(10)
                fly.start()
            })

            waitsFor(function(){
                return e > 20
            }, "e > 20", 1000)

            runs(function () {

                fly.stop()
                expect(e).toBeGreaterThan(20)
            })
        })
        
        it("should be able to step through frames", function(){
        
            e = 0
            
            fly.step()  // Mah step's so fly
            expect(e).toEqual(1)
            fly.step()
            expect(e).toEqual(2)
            
            // 2-step now
            fly.step().step()
            expect(e).toEqual(4)
        
        })
        
        it("should let you swap callback whenever", function(){
        
            e = 0
            ecopy = e
            
            fly.callback = function(){
                e += 5
            }
            
            fly.step()
            
            expect(ecopy+5).toEqual(e)
                        
        
        })
    });
});
