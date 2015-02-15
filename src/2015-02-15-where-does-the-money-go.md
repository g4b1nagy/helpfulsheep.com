===========================================================================
categories: 'experiments'
date: 2015-02-15 19:31
description: 'Like most people, I dream of a magical time when I am blessed with a passive monthly income that allows me to spend approximately zero amount of time working'
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Where does the money go?'
===========================================================================

Like most people, I dream of a magical time when I am blessed with a passive monthly income that allows me to spend approximately zero amount of time working. Like most people again, I have done absolutely nothing to make this happen. Well, except for one thing.

Starting from the 18th of June, 2013, I have kept track of more or less every ounce of currency leaving my pocket. That's exactly 1 year, 7 months, 28 days and, in case you're wondering, 2,315 entries in a spreadsheet.

The purpose, you might ask? Well, for one, I wanted to see how much money would need to flow my way before I could become free from work and I also thought this would paint a really interesting and objective picture of my spending habits.

<div class="code-container" style="height: 610px;">
  <div id="chart1" style="height: 600px;"></div>
</div>

Before you ask, allow me to clear up some of those categories:

* friends: money spent on friends and family i.e. gifts, drinks, etc.
* internet: hosting, domains, etc.
* people: donations, charity, etc.
* supplies: things that you run out of i.e. soap, detergent, etc.

It's interesting to note that although 59.6% of my entries fall in the food category, they only account for 18.5% of my spending. It's also interesting that I have spent more money on internet items than on the people around me. I must really not like people as much as I thought.

Now as much as I'd like my private data to be publicly available on the internet, I took the liberty of converting the numbers below from my local currency to SheepCoin&reg;&trade; at the rate set forth by the Wooolsey-Mutton Federal Bank.

Since these charts are quite cramped, you might want to check out the [full page version](charts.html) as well.

<div class="code-container" style="height: 610px;">
  <div id="chart2" style="height: 600px;"></div>
</div>

It's interesting how events in my life such as changing home and buying musical instruments ('13-10), buying a new bike ('14-03) and traveling ('14-12) account for the biggest of my spending spikes. The drops usually coincide with the times I spent visiting my parents.

<div class="code-container" style="height: 610px;">
  <div id="chart3" style="height: 600px;"></div>
</div>

The categories are toggleable on this last chart. Not much to say about this one, except for the fact that I seem to be spending progressively more money on food and drinks. Hurray for inflation?







<script src="https://www.google.com/jsapi"></script>
<script>
google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(function() {
  drawChart1();
  drawChart2();
  drawChart3();
});

function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['category', 'spent'],
    ['rent and utilities', 4396.56],
    ['food', 3227.28],
    ['bike', 1463.89],
    ['music gear', 1220.2],
    ['travel', 1174.15],
    ['friends', 919.9],
    ['internet', 714.92],
    ['people', 626.22],
    ['clothes', 612.51],
    ['electronics', 482.55],
    ['home', 408.21],
    ['drinks', 392.39],
    ['supplies', 337.68],
    ['events', 320.88],
    ['taxi', 283.81],
    ['concerts', 260.18],
    ['books', 242.68],
    ['health', 135.94],
    ['work', 95.79],
    ['uni', 64.25],
    ['sports', 60.88],
    ['bus', 34.61],
  ]);
  var options = {
    title: 'Where the money went',
    chartArea: {
      width: '87%',
    },
    tooltip: {
      text: 'percentage',
    },
  };
  var chart = new google.visualization.PieChart(document.getElementById('chart1'));
  chart.draw(data, options);
}

function drawChart2() {
  var data = google.visualization.arrayToDataTable([
    ['month', 'spent', 'average', 'median'],
    ["'13-07", 774.31, 887.15, 774.31],
    ["'13-08", 559.58, 887.15, 774.31],
    ["'13-09", 571.84, 887.15, 774.31],
    ["'13-10", 1407.52, 887.15, 774.31],
    ["'13-11", 1357.78, 887.15, 774.31],
    ["'13-12", 654.53, 887.15, 774.31],
    ["'14-01", 594.39, 887.15, 774.31],
    ["'14-02", 777.78, 887.15, 774.31],
    ["'14-03", 1851.24, 887.15, 774.31],
    ["'14-04", 580.27, 887.15, 774.31],
    ["'14-05", 1038.28, 887.15, 774.31],
    ["'14-06", 802.56, 887.15, 774.31],
    ["'14-07", 763.53, 887.15, 774.31],
    ["'14-08", 770.82, 887.15, 774.31],
    ["'14-09", 959.84, 887.15, 774.31],
    ["'14-10", 456.36, 887.15, 774.31],
    ["'14-11", 970.12, 887.15, 774.31],
    ["'14-12", 1360.25, 887.15, 774.31],
    ["'15-01", 605.02, 887.15, 774.31],
  ]);
  var options = {
    title: 'Monthly expenses',
    chartArea: {
      width: '87%',
    },
    legend: {
      position: 'bottom',
    },
    curveType: 'function',
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart2'));
  chart.draw(data, options);
}

function drawChart3() {
  var data = google.visualization.arrayToDataTable([
    ['month', 'rent and utilities', 'food', 'bike', 'music gear', 'travel', 'friends', 'internet', 'people', 'clothes', 'electronics', 'home', 'drinks', 'supplies', 'events', 'taxi', 'concerts', 'books', 'health', 'work', 'uni', 'sports', 'bus'],
    ["'13-07", 0, 132.31, 41.03, 235.76, 49.44, 193.12, 0, 9.43, 7.08, 3.46, 0, 10.2, 1.83, 0, 0, 27.81, 0, 0, 0, 58.2, 4.63, 0],
    ["'13-08", 200.54, 110.07, 0, 6.18, 50.52, 12.33, 0, 1.54, 100.64, 13.9, 0, 26.86, 15.35, 0, 21.63, 0, 0, 0, 0, 0, 0, 0],
    ["'13-09", 213.21, 137.57, 0, 8.35, 0, 8.04, 5.2, 11.74, 9.92, 40.05, 1.08, 5.25, 15.19, 0, 2.17, 0, 107.91, 0, 0, 0, 6.18, 0],
    ["'13-10", 536.74, 141.72, 23.18, 393.05, 38.01, 0, 157.9, 2.17, 0, 0, 20.55, 12.34, 6.83, 73.81, 0, 0, 0, 0, 0, 0, 0, 1.24],
    ["'13-11", 370.8, 158.66, 30.9, 0, 17.0, 67.98, 86.89, 326.2, 0, 0, 68.7, 15.45, 7.49, 29.73, 21.16, 0, 61.02, 0, 95.79, 0, 0, 0],
    ["'13-12", 183.39, 82.09, 0, 87.44, 21.01, 93.86, 30.04, 3.09, 0, 83.12, 1.35, 17.55, 9.24, 1.54, 22.86, 4.63, 12.05, 0, 0, 0, 0, 1.24],
    ["'14-01", 217.22, 176.65, 0, 9.35, 17.0, 10.81, 76.39, 9.89, 0, 1.24, 3.33, 7.72, 19.36, 7.11, 32.13, 6.18, 0, 0, 0, 0, 0, 0],
    ["'14-02", 79.56, 148.84, 0, 0, 0, 375.19, 20.28, 0.93, 0, 0, 0, 33.37, 3.92, 73.97, 21.63, 0, 0, 20.09, 0, 0, 0, 0],
    ["'14-03", 202.09, 164.14, 1251.45, 0, 39.86, 11.74, 79.62, 5.25, 0, 0, 41.55, 4.33, 18.46, 0, 26.89, 4.63, 0, 0, 0, 0, 0, 1.24],
    ["'14-04", 240.2, 161.54, 70.76, 0, 21.01, 19.46, 19.97, 0.62, 0, 0, 0, 13.59, 3.4, 19.16, 4.63, 0, 5.0, 0, 0, 0, 0.93, 0],
    ["'14-05", 197.34, 287.85, 18.51, 0.83, 0, 0, 5.04, 41.72, 233.35, 135.34, 7.57, 17.42, 31.14, 17.0, 21.01, 0, 1.0, 0, 0, 0, 23.18, 0],
    ["'14-06", 209.5, 194.38, 0, 247.82, 14.83, 4.63, 7.72, 4.95, 29.0, 14.47, 12.73, 12.55, 24.24, 11.74, 3.09, 0, 10.89, 0, 0, 0, 0, 0],
    ["'14-07", 377.6, 181.94, 0, 34.93, 14.83, 23.8, 75.54, 0, 0, 0, 1.54, 14.21, 17.64, 0, 14.21, 0, 0, 4.82, 0, 0, 0, 2.47],
    ["'14-08", 98.14, 94.75, 14.53, 159.41, 4.17, 29.38, 30.77, 71.65, 0, 13.59, 183.24, 12.61, 19.96, 14.21, 6.18, 0, 0, 17.0, 0, 0, 0, 1.24],
    ["'14-09", 488.01, 57.91, 0, 8.65, 29.59, 0.49, 0, 132.74, 174.74, 0, 0, 41.09, 13.62, 1.54, 6.8, 4.63, 0, 0, 0, 0, 0, 0],
    ["'14-10", 8.46, 164.84, 13.54, 10.2, 8.04, 3.09, 18.86, 2.47, 0, 73.75, 8.2, 32.76, 27.8, 45.42, 13.6, 15.45, 0, 0, 0, 0, 0, 9.89],
    ["'14-11", 21.94, 373.04, 0, 12.05, 29.36, 29.36, 50.51, 1.85, 26.26, 0, 21.54, 46.34, 41.05, 17.0, 24.72, 196.84, 13.9, 58.2, 0, 0, 0, 6.18],
    ["'14-12", 260.19, 126.15, 0, 0, 819.5, 28.34, 11.57, 0, 31.52, 8.71, 7.31, 20.7, 6.72, 4.01, 23.18, 0, 0, 4.95, 0, 0, 0, 7.42],
    ["'15-01", 257.09, 195.96, 0, 6.18, 0, 8.28, 0, 0, 0, 3.09, 20.24, 40.95, 17.61, 4.63, 13.6, 0, 0, 30.9, 0, 0, 2.78, 3.71],
  ]);
  var chart = new google.visualization.LineChart(document.getElementById('chart3'));
  google.visualization.events.addListener(chart, 'select', toggleSeries);
  var columns = [];
  var defaultSeries = [1, 2];
  var series = {};
  for (var i = 0; i < data.getNumberOfColumns(); i++) {
    if (i == 0 || defaultSeries.indexOf(i) != -1) {
      columns.push(i);
    } else {
      columns.push({
        label: data.getColumnLabel(i),
        type: data.getColumnType(i),
        sourceColumn: i,
        calc: function() {
          return null;
        },
      });
    }
    if (i > 0) {
      series[i - 1] = {};
      if (defaultSeries.indexOf(i) == -1) {
        if (typeof(series[i - 1].color) !== 'undefined') {
          series[i - 1].backupColor = series[i - 1].color;
        }
        series[i - 1].color='#ccc';
      }
    }
  }
  function toggleSeries() {
    var selection = chart.getSelection();
    if (selection.length > 0) {
      if (selection[0].row == null) {
        var col = selection[0].column;
        if (typeof(columns[col]) == 'number') {
          var src = columns[col];
          columns[col] = {
            label: data.getColumnLabel(src),
            type: data.getColumnType(src),
            sourceColumn: src,
            calc: function() {
              return null;
            }
          };
          series[src - 1].color = '#ccc';
        } else {
          var src = columns[col].sourceColumn;
          columns[col] = src;
          series[src - 1].color = null;
        }
        var view = new google.visualization.DataView(data);
        view.setColumns(columns);
        chart.draw(view, options);
      }
    }
  }
  var options = {
    title: 'Monthly expenses by category',
    chartArea: {
      width: '87%',
    },
    legend: {
      position: 'bottom',
    },
    curveType: 'function',
    series: series,
  };
  var view = new google.visualization.DataView(data);
  view.setColumns(columns);
  chart.draw(view, options);
}
</script>
