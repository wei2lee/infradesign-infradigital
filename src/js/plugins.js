(function( $ ) {
 
    $.fn.portfolioSlider = function(config) {
        $sel = this;
        $seldiv = this.find('>div');
        
        
        
        var count = $seldiv.length;
        function updateD(){
            $seldiv.each(function(j){
                var d = $(this).attr('d');
                var tf = 'translateX('+(d*100)+'%)';
                $(this).css('transform', tf);
            });
        }
        $seldiv.each(function(j){
            var d = j;
            $(this).attr('d', d);
        });
        updateD();


        setInterval(function(){
            $sel.find('>div').each(function(j){
                $(this).addClass('animating');
                var d = parseInt($(this).attr('d'));
                d--;
                $(this).attr('d', d);
            });
            updateD();


            setTimeout(function(){
                $sel.find('>div').each(function(j){
                    var d = parseInt($(this).attr('d'));
                    if(d+j<0){
                        d += count;
                        $(this).attr('d', d);
                        $(this).removeClass('animating');
                        $(this).appendTo($sel);
                    }
                });
                updateD();
            },350);
        }, 5000);
        
        return this;
    };
}( jQuery ));