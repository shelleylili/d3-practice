var data = [1,4,4,5,3,34,5,7,44],
	bar_height = 50,
	bar_padding = 10,
	svg_width = 500,//svg的宽
	svg_height =(bar_padding+bar_height)*data.length;//svg的高

var scale = d3.scale.linear()
.domain([0,d3.max(data)])
.range([0,svg_width])	

var svg = d3.select("#container")
.append("svg")
.attr("width",svg_width)
.attr("height",svg_height)

var bar = svg.selectAll("g")//现在还没有g的元素
.data(data)//绑定数据//循环
.enter()//指定数据比元素多的时候(因为此处是g还没有创建)
.append("g")
.attr("transform",function(d,i){return "translate(0,"+i*(bar_height+bar_padding)+")"})

bar.append("rect")
.attr({
	"width":function(d){return scale(d);},
	"height":bar_height
})
.style("fill","steelblue")

bar.append("text")
.text(function(d){return d;})
.attr({
	"x":function(d){return scale(d);},
	"y":bar_height/2,
	"text-anchor":"end" //文字对齐最后（此例右边）
})