d3.csv("data.csv",type,function(data){//csv文件获取的数据 回调函数
	console.log('data:',data);

	// var data = [1,4,4,5,3,34,5,7,44],
	var bar_width = 50,
		bar_padding = 10,
		svg_height = 500,//svg的宽
		svg_width =(bar_padding+bar_width)*data.length;//svg的高

	var scale = d3.scale.linear()
	.domain([0,d3.max(data,function(d){return d.population})])
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
		"y":function(d){return scale(d.population);},
		"width":bar_width,
		"height":function(d){return svg_height-scale(d.population);}
	})
	.style("fill","steelblue")

	bar.append("text")
	.text(function(d){return d.year;})
	.attr({
		"x":bar_width/2,
		"y":function(d){return scale(d.population);},
		"dy":15,
		"text-anchor":"middle" //文字对齐最后（此例右边）
	})

});//d3的读取csv文件传入路径(url,type,回调)
function type(d){//处理数据文件格式为数字(原来是字符串)
	d.population = +d.population;
	return d;
}