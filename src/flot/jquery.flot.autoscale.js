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
            var maxX = 0, maxY = 0, minX = 0, minY = 0;

            $.each(data, function (index, s) {
                var max = autoScale(plot, s, s.data, s.datapoints);
                maxX = Math.max(maxX, max['maxX']);
                maxY = Math.max(maxY, max['maxY']);
                minX = Math.max(minX, min['minX']);
                minY = Math.max(minY, min['minY']);
            });

            optsX.min = minX;
            optsX.max = maxX;
            optsY.min = minY;
            optsY.max = maxY;

            plot.setupGrid();
            plot.draw();

            return {
                minY: optsY.min,
                maxY: optsY.max,
                minX: optsX.min,
                maxX: optsX.max,
            };
        }

        function autoScale(plot, series, data, datapoints) {
            var options = plot.getOptions();

            // limit to visible serie
            if (series.lines.show || series.points.show || series.bars.show) {
                var maxX = Number.NEGATIVE_INFINITY;
                var maxY = Number.NEGATIVE_INFINITY;
                var minX = Number.POSITIVE_INFINITY;
                var minY = Number.POSITIVE_INFINITY;

                for (var i = 0; i < data.length; i++) {
                    maxX = Math.max(maxX, data[i][0]);
                    maxY = Math.max(maxY, data[i][1]);
                    minX = Math.min(minX, data[i][0]);
                    minY = Math.min(minY, data[i][1]);
                }

                maxX += 2;
                maxY += maxY * options.yaxis.autoscaleMargin * 10;

                minY -= 2;
                minY -= minY * options.yaxis.autoscaleMargin * 10;
                return {
                    minX: minX,
                    minY: minY,
                    maxX: maxX,
                    maxY: maxY
                };
            } else {
                return {
                    minX: 0,
                    minY: 0,
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
