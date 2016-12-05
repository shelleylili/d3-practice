var width=500,//svg width
	height=250,//svg height
	margin={left:50,top:30,right:20,bottom:20},
	g_width = width-margin.left-margin.right,//g width
	g_height = height-margin.top-margin.bottom;// g height

//svg
var svg=d3.select("#container")//select 或选择第一个符合的元素
.append("svg:svg")//添加子元素
//width height
.attr("width",width)//添加属性
.attr("height",height);

//g
var g = svg//一个元素调用
.append("g")//元素添加子元素
.attr("transform","translate("+margin.left+","+margin.top+")");
// var g1 =svg.append("g")

var data=[1,3,4,5,7,0,5,1];

var scale_x=d3.scale.linear()//缩放X
.domain([0,data.length-1])//输入范围
.range([0,g_width])//输出范围
var scale_y=d3.scale.linear()//缩放Y
.domain([0,d3.max(data)])//输入范围
.range([g_height,0])//输出范围 y轴要底部小值到顶部大值


var line_generator = d3.svg.line()//M0,28.57142857142857Q49.14285714285714,77.14285714285714,61.42857142857142,85.71428571428571C79.85714285714286,98.57142857142857,104.42857142857142,105.71428571428571,122.85714285714285,114.28571428571428S165.85714285714283,129.99999999999997,184.28571428571428,142.85714285714283S227.28571428571428,221.42857142857142,245.7142857142857,200S288.71428571428567,8.571428571428577,307.1428571428571,0S350.1428571428571,138.57142857142856,368.57142857142856,142.85714285714283Q380.85714285714283,145.7142857142857,430,28.57142857142857
.x(function(d,i){return scale_x(i);})//数组下表
.y(function(d){return scale_y(d);})//数组项值
.interpolate("cardinal")//使折线圆滑

// d3.selectAll("g")
g
.append("path")
.attr("d",line_generator(data))//path划线


var x_axis=d3.svg.axis().scale(scale_x)
	y_axis=d3.svg.axis().scale(scale_y).orient("left")

g.append("g")
.call(x_axis)
.attr("transform","translate(0,"+g_height+")")

g.append("g")
.call(y_axis)
.append("text")
.text("Price($)")
.attr("transform","rotate(-90)")
.attr("text-anchor","end")
.attr("dy","1em")//y(针对字)轴偏移,单位是em