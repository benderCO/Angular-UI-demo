# AngularUiDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Code Challenge Requirements

Company wants to test the ability of the candidate to create a simple Web UI page with fields, button,
widgets, charts, and a tabular view. Company will provide a couple of REST API Calls to pull data from
its current product database. Company expects the candidate to be able to understand the basics of
the API call, and display that data in a chart and table form. Selecting or clicking into a row should result
into a drill down from one level of resolution into a detail level of resolution filtered by the identifier of
the row selected.


## Details

The candidate will create a simple UI using Angular to display current Selection Criteria bar with an
action button to fetch data, a summary chart displaying a summary of data received, followed by a table
view of the same data.

The Selection Criteria bar for starters can assume it will pull data for ‘yesterday’ and then provide a
button to execute a simple web based REST API Call 1 (provided below) to pull information.

The data for the chart and table will be received through the API call that pulls a list of metrics for all
users over a particular time frame like ‘yesterday’. In addition to metrics such as CPU Used, RAM Used,
Page File Used, IOPs, etc. the API also pulls in additional information items such as machines.

The candidate must display a table with rows and columns which show the metrics for each user name.
The Table will be sorted by the Workload Ranking column in descending order. The Chart will display a
bar graph with the same data by user name (x-axis) sorted by the workload ranking score on y-axis in
descending order.

If the user clicks on a user row or user bar in the chart, the UI must drill down into the data by filtering
by the user on the selected row, and then provide data for that user in an hourly breakdown for
‘yesterday’. This would involve using API Call 2 (provided below), and receiving the new data with a new
column for hours along with the same metric columns, only now broken out in an hourly form over
yesterday.

The Chart must then refresh as well, showing hourly data (x-axis) for that one user, sorting the data by
hour in an ascending order.


## Resources
The candidate will use the following resources:
1. Angular to create a Web UI with buttons, fields, widgets and tables of information.
1. Incorporate a graphical charting library, preferably using AMCHARTS, to render graphs and charts of the data.
1. Use the Company REST API to pull data from a database.
    1. If you want an overview or help on its usage, please click on this Company API link.
        There are many areas of help along with examples on how to use the API. It provides a
        test area where you can test and modify existing calls.
    1. API Call 1: The first API Call to get data for all users over ‘yesterday’ is available in this
        Yesterday API Call link. This call provides a list of all users, for yesterday without
        specifying a time resolution. Here are the details:
        demo.**INSERT COMPANY NAME**.com/lwl/api?json={
        "inspector":"0",
        "basis":"users",
        "date":"yesterday",
        "limit":"0",
        "columns":"record_count,cpu_used_mhz,rank_score,memory_used_mb,page_u
        sed_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swa
        p_page_faults,page_faults,node_count,user_count,cid_seconds",
        "sort_col":"rank_score",
        "sort_order":"2"}
    1. API Call 2: The second API Call to get data filtered by user for yesterday but broken out
        hourly is available in this User filtered Hourly link. This call provides a list of rows by
        hour for selected user i.e. ‘db’ in this example but needs to be replaced by the row
        selected/clicked on – and with the resolution specified to be Hourly. Here are the
        updated parameters in this call compared to the first one:
        demo.**INSERT COMPANY NAME**.com/lwl/api?json={
        "inspector":"0",
        "basis":"users",
        "date":"yesterday",
        "resolution":"hourly",
        "limit":"0",
        "columns":"record_count,cpu_used_mhz,rank_score,memory_used_mb,page_u
        sed_mb,total_io_bps,total_iops,net_total_bps,cpu_context_switching_avg,swa
        p_page_faults,page_faults,node_count,user_count,cid_seconds",
        "user_name":"db"}
    1. The API output provides a cross reference for column names matched to their pretty
        names.
