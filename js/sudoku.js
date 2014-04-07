function $(id) {
	return document.getElementById(id);
}

//生成数独矩阵使用挖洞算法
var array_init 		= new Array(); 		//程序生成的矩阵初始化
var array_current 	= new Array(); 		//当前矩阵
var array_user 		= new Array();		//用户输入
var counter = 0;
var sudoku = {
	array_init: new Array(),
	complexity: 0.5,
	tableId: "boxGrid",
	
	rndBg: function() {
		var bg_num = Math.ceil(Math.random() + Math.random());

		$(this.tableId).className = "bg_" + bg_num;
	},

	//获取九宫格域
	getDistrict: function(n) {
		return parseInt(n/3) * 3;
	},
	init: function() {
		//横向行
		for(var i = 0; i < 9; i++)
		{
			this.array_init[i] = new Array();
			for(var j=0; j < 9; j++)
			{
				this.array_init[i][j] = '';
			}
		}
	},
	//初始化矩阵数据
	initialize: function() {

		//横向行
		for(var i = 0; i < 9; i++)
		{
			var tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			
 			for(var j = 0; j < 9; j++)
 			{ 				
 				//第一行不做重复检测
 				if(i == 0)
 				{
 					var rndIndex = Math.floor(Math.random() * (9 - j));
 					this.array_init[i][j] = tempArr[rndIndex];
 					tempArr.splice(rndIndex, 1);
 					continue;
 				}
 				else
 				{
 					var temp = [];
 					for(var k = 0; k < tempArr.length; k++)
 					{
 						flag = this.chkRepeat(i, j, tempArr[k]);
 						
 						if(flag == true)
 						{
 							temp.push(tempArr[k]);
 							break;
 						}
 					}
 					 
 					if(temp.length == 0)
 					{
 						counter++;
 						console.log("counter:",counter);
 						//this.initialize();
 						/*
 						setTimeout(function(){
							location.reload();
 						}, 200);
 						*/

 						//return;
 					}
 					 
 					var rndIndex2 = Math.floor(Math.random() * temp.length);
 					this.array_init[i][j] = temp[rndIndex2];
 					//console.log(temp, '/', rndIndex2, '/' , temp[rndIndex2]);
 				}
 			}
		}
		//console.log(this.array_init);
	},
	//检测重复
	chkRepeat: function(x, y, num) {
		//行重复
		if((this.array_init[x] && this.array_init[x].indexOf(num) > -1 ))
		{
			//若重复则不可设置
			return false;
		}
		
		for(var i = 0; i < this.array_init.length; i++)
		{
			//列重复
			if(this.array_init[i][y] == num)
			{
				return false;
			}
		}
		//九宫格检测
		var unit = this.getUnitNumbers(x, y);
		//console.log('unit:', unit);
		if(unit.indexOf(num) > -1)
		{
			return false;
		}

		return true;
	},
	getUnitNumbers: function(x, y) {
		var d_x = this.getDistrict(x);
		var d_y = this.getDistrict(y);
		var temp = new Array(9);
		for(var i = 0; i < this.array_init.length; i++)
		{
			var d_i = this.getDistrict(i);

			for(var j = 0; j < this.array_init[i].length; j++)
			{
				//j所在区域
				var d_j = this.getDistrict(j);
				if(d_i == d_x && d_j == d_y)
				{
					temp.push(this.array_init[i][j]);
				}
			}
		}
		return temp;
	},
					
	fillTable: function() {
		
		//填充行
		var trEle = "";
		for(var i = 0; i < 9; i++)
		{
			trEle += "<tr ";
			//横向
			if(i < 8 && (i+1)%3 == 0)
			{
				trEle += "class='boldBottom'";
			}
			trEle += ">";
			for(var j = 0; j < 9; j++)
			{


				trEle += "<td ";
				//纵向
				if(j < 8 && (j+1)%3 == 0 )
				{
					trEle += "class='boldRight'";
				}

				trEle += ">";
				var disable = '';
				var val = '';
				if(this.array_init[i] && this.array_init[i][j] != '')
				{
					disable = 'disabled';
					val = this.array_init[i][j];
				}
				trEle += "<input type='text' value='" + val + "' " + disable + " maxlength=1 id='g_" + i + j + "'/>";
				trEle += "</td>";
			}
			trEle += "</tr>";
			
		}
		$(this.tableId).innerHTML = trEle;
	},
	release: function() {
		this.array_init = new Array();
	},
	exec: function() {
		this.init();
		this.initialize();
		this.fillTable();
		this.rndBg();
		this.release();
	}
}
sudoku.exec();
