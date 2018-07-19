# BootStrapGoogleBarChart
Create a Google Bar Chart formated in Bootstrap - See Private Doc

## Purpose
 - Easily add google charts to your page.

## How to Use
 - Add Script Link to the ChartWidget.js script.
 - Make sure you also have a script link to JQuery (https://code.jquery.com/jquery-3.3.1.min.js)
 - Make sure you also have a script link to Google Charts (https://www.gstatic.com/charts/loader.js)
 - In the body, make sure there is a div with a unique id where you want your chart to be.  For now we'll call it "ChartID".
 - In the header, make a script tag.
  - In the script, make an object, let's call it "chart".  It should look like this:
```javascript
var chart = {
    id : "ChartID",
    columns : ["label", "col1", "col2"],
    rows : [
      ["r1Label", r1c1, r1c2],
      ["r2label", r2c1, r2c2],
      ["r3label", r3c1, r3c2]
      // and so on.  Columns 1 and 2 in this case are numbers.
      // please make sure the datatypes are consistent within each column.
      // The datatype for each column is selected for you based on the datatypes of the first row.
    ],
    // optional.  If you do not include this, or skip certain fields inside,
    // the default values will replace it.
    options : {
      title : "My Title", //very important, what end user sees.  Defaults to "My Chart"
      colors : ["#e0440e", "#f00", "blue"], //colors selected automatically by Google
      // any valid color works.
      legend : "bottom", // or top, left, right.  right is default.
      chartType : "PieChart", // defaults to "ColumnChart".  Read up on chart types at
      // https://developers.google.com/chart/interactive/docs/gallery
      width : 400,
      height : 300
      // and so on.
    }
    // Please remember that javascript doesn't like arrays that have an ending comma!
}
```
  - Then, still in the same script tag, call to the chartWidget.function function.
```javascript
kauthTools.ChartWidget.process(chart)
```
  - This also works:
```javascript
var charts = [chart1, chart2, chart3];
kauthTools.ChartWidget.process(charts);
```
  - Please remember!  Make sure there's a div in the body with the same id property as `chart.id`!
  
## Advanced
 - If you don't want `kauthTools` muddying up your global javascript object, you
 can edit the bottom of the ChartWidget.js file to set the global variable to something else.
```javascript
if (!window.kauthTools) {
  kauthTools = {};
}
kauthTools.ChartWidget = chartWidget;
```
 - If you would like a different set of default values, you can edit the middle of the ChartWidget.js file.
```javascript
if (!chart.options.chartType) {
    chart.options.chartType = "ColumnChart";
    console.log("You didn't specify a chartType.  Please check out https://developers.google.com/chart/interactive/docs/gallery to find possible chart types!  Setting chart.options.chartType to 'ColumnChart'");
}
chart.options.title = chart.options.title || "My Chart";
chart.options.width = chart.options.width || 400;
chart.options.height = chart.options.height || 300;
```
