/*
  Programmer: Shelby Kauth
  Date: 19 July 2018
  Requires:
    JQuery <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    Google Charts <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  To modify this for your own usage:
    Set whatever global variable you're using to equal chartWidget, at the very bottom.
*/

var chartWidget = {
    // Takes an array of chart objects, or a single chart object.
    process : function(chart) {
      console.log(chart);
      if (Array.isArray(chart)) {
        chart.forEach(chartWidget.process)
      } else {
        // Input Validation
        if (chart.id == null) {
          console.log("chart object must have an element id");
          return false;
        }
        if (!Array.isArray(chart.columns)) {
          console.log("chart object must have a columns array");
          return false;
        }
        if (!Array.isArray(chart.rows) || !Array.isArray(chart.rows[0])) {
          console.log("chart object must have a rows 2D array");
          return false;
        }
        if (chart.options == null) {
          chart.options = {};
        }
        // Default Options if options not specified.
        if (!chart.options.chartType) {
          chart.options.chartType = "ColumnChart";
          console.log("You didn't specify a chartType.  Please check out https://developers.google.com/chart/interactive/docs/gallery to find possible chart types!  Setting chart.options.chartType to 'ColumnChart'");
        }
        chart.options.title = chart.options.title || "My Chart";
        chart.options.width = chart.options.width || 400;
        chart.options.height = chart.options.height || 300;

        // Begin Process
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = new google.visualization.DataTable();
          chart.columns.forEach(function(obj, index) {
            if (Array.isArray(obj)) {
              data.addColumn(obj[0], obj[1]);
            } else {
              var type = typeof chart.rows[0][index];
              data.addColumn(type, obj);
            }
          });
          data.addRows(chart.rows);
          if (!google.visualization[chart.options.chartType]) {
            console.log("Hey, you put an invalid chart.options.chartType.  Setting it to 'ColumnChart'.  Please check out https://developers.google.com/chart/interactive/docs/gallery to find all the possible chart types!");
            chart.options.chartType = 'ColumnChart';
          }
          var gChart = new google.visualization[chart.options.chartType](document.getElementById(chart.id));
          gChart.draw(data, chart.options);
        }

      }
    }
};


if (!window.kauthTools) {
  kauthTools = {};
}
kauthTools.ChartWidget = chartWidget;
