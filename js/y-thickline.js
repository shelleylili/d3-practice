var data = [1,4,4,5,3,34,5,7,44],
	bar_width = 50,
	bar_padding = 10,
	svg_height = 500,//svg的宽
	svg_width =(bar_padding+bar_width)*data.length;//svg的高

var scale = d3.scale.linear()
.domain([0,d3.max(data)])
.range([svg_height,0])	

var svg = d3.select("#container")
.append("svg")
.attr("width",svg_width)
.attr("height",svg_height)

var bar = svg.selectAll("g")//现在还没有g的元素
.data(data)//绑定数据//循环
.enter()//指定数据比元素多的时候(因为此处是g还没有创建)
.append("g")
.attr("transform",function(d,i){return "translate("+i*(bar_width+bar_padding)+",0)"})

bar.append("rect")
.attr({
	"y":function(d){return scale(d);},
	"width":bar_width,
	"height":function(d){return svg_height-scale(d);}
})
.style("fill","steelblue")

bar.append("text")
.text(function(d){return d;})
.attr({
	"x":bar_width/2,
	"y":function(d){return scale(d);},
	"dy":15,
	"text-anchor":"middle" //文字对齐最后（此例右边）
})