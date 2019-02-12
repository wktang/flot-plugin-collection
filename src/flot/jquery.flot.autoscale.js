/**
 * Flot plugin for adding additional auto scalling modes.
 *
 * @author Joel Oughton
 */
(function ($) {
    function init(plot) {

        plot.autoScale = function () {
            var optsY = plot.getYAxes()[0].options;
            var optsX = plot.getXAxes()[0].options;
            var data = plot.getData();
            var maxX = 0, maxY = 0;

            $.each(data, function (index, s) {
                var max = autoScale(plot, s, s.data, s.datapoints);
                maxX = Math.max(maxX, max['maxX']);
                maxY = Math.max(maxY, max['maxY']);
            });

            optsX.min = 0;
            optsX.max = maxX;
            optsY.min = 0;
            optsY.max = maxY;

            plot.setupGrid();
            plot.draw();

            return {
                min: optsY.min,
                max: optsY.max
            };
        }

        function autoScale(plot, series, data, datapoints) {
            var options = plot.getOptions();

            // limit to visible serie
            if (series.lines.show || series.points.show || series.bars.show) {
                var maxX = Number.NEGATIVE_INFINITY;
                var maxY = Number.NEGATIVE_INFINITY;

                for (var i = 0; i < data.length; i++) {
                    maxX = Math.max(maxX, data[i][0]);
                    maxY = Math.max(maxY, data[i][1]);
                }

                maxX += 2;
                maxY += maxY * options.yaxis.autoscaleMargin * 10;
                return {
                    maxX: maxX,
                    maxY: maxY
                };
            } else {
                return {
                    maxX: 0,
                    maxY: 0
                };
            }
        }
    }

    $.plot.plugins.push({
        init: init,
        name: "autoscalemode",
        version: "0.6"
    });
})(jQuery);
