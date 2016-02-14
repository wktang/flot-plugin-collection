/**
 * Flot plugin for adding additional auto scalling modes.
 *
 * @author Joel Oughton
 */
(function ($) {
    function init(plot) {

        plot.autoScale = function () {
            var opts = plot.getYAxes()[0].options;
            var optsx = plot.getXAxes()[0].options;
            var data = plot.getData();
            var maxx = 0, maxy = 0;

            $.each(data, function (index, s) {
                var max = autoScale(plot, s, s.data, s.datapoints);
                maxx = Math.max(maxx, max['maxx']);
                maxy = Math.max(maxy, max['maxy']);
            });

            optsx.min = 0;
            optsx.max = maxx;
            opts.min = 0;
            opts.max = maxy;

            plot.setupGrid();
            plot.draw();

            return {
                min: opts.min,
                max: opts.max
            };
        }

        function autoScale(plot, series, data, datapoints) {
            var options = plot.getOptions();

            // limit to visible serie
            if (series.lines.show || series.points.show || series.bars.show) {
                var maxx = Number.NEGATIVE_INFINITY;
                var maxy = Number.NEGATIVE_INFINITY;

                for (var i = 0; i < data.length; i++) {
                    maxx = Math.max(maxx, data[i][0]);
                    maxy = Math.max(maxy, data[i][1]);
                }

                maxx += 2;
                maxy += maxy * options.yaxis.autoscaleMargin * 10;
                return {
                  maxx: maxx,
                  maxy: maxy
                };
            } else {
                return {
                  maxx: 0,
                  maxy: 0
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
