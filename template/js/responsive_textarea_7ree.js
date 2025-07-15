/**
 * 响应式textarea宽度调整功能
 * 当窗口大小改变时，自动调整textarea和相关元素的宽度
 */
(function($) {
    'use strict';
    
    var ResponsiveTextarea_7ree = {
        init: function() {
            this.bindEvents();
            this.adjustWidth(); // 初始化时调整一次
        },
        
        bindEvents: function() {
            var self = this;
            
            // 监听窗口大小变化
            $(window).on('resize.responsiveTextarea_7ree', function() {
                self.adjustWidth();
            });
            
            // 监听页面加载完成
            $(document).ready(function() {
                self.adjustWidth();
            });
        },
        
        adjustWidth: function() {
            var $textarea = $('#textarea');
            var $textareaGroup = $('.textarea-group');
            var $textareaWrap = $('.textarea-wrap');
            var $main = $('main');
            
            if ($textarea.length && $textareaGroup.length) {
                // 获取main容器的实际可用宽度
                var mainWidth = $main.innerWidth();
                var lineNumberWidth = 32; // 行号区域宽度（包括margin）
                
                // 计算textarea-group的宽度（占满main容器）
                var groupWidth = mainWidth;
                
                // 计算textarea的实际可用宽度
                // 需要减去行号区域宽度、textarea的margin-left等
                var textareaMarginLeft = parseInt($textarea.css('margin-left')) || 32;
                var textareaMarginRight = parseInt($textarea.css('margin-right')) || 0;
                
                // 计算最终的textarea宽度（使用box-sizing: border-box，所以border和padding已包含在内）
                var textareaWidth = mainWidth - textareaMarginLeft - textareaMarginRight;
                
                // 确保宽度不会太小
                if (textareaWidth < 200) {
                    textareaWidth = 200;
                }
                
                // 更新textarea-group的宽度
                $textareaGroup.css({
                    'width': groupWidth + 'px'
                });
                
                // 更新textarea的宽度
                $textarea.css({
                    'width': textareaWidth + 'px'
                });
                
                // 确保行号区域的高度与textarea一致
                if ($textareaWrap.length) {
                    $textareaWrap.css({
                        'height': $textarea.height() + 'px'
                    });
                }
            }
        },
        
        destroy: function() {
            $(window).off('resize.responsiveTextarea_7ree');
        }
    };
    
    // 自动初始化
    $(document).ready(function() {
        // 延迟初始化，确保行号插件已经加载完成
        setTimeout(function() {
            ResponsiveTextarea_7ree.init();
        }, 100);
    });
    
    // 暴露到全局，方便调试和手动控制
    window.ResponsiveTextarea_7ree = ResponsiveTextarea_7ree;
    
})(jQuery);