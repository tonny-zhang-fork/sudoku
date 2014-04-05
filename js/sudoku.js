function $(id) {
	return document.getElementById(id);
}


var array_init 		= new Array(); 		//程序生成的矩阵初始化
var array_current 	= new Array(); 		//当前矩阵
var array_user 		= new Array();		//用户输入

var sudoku = {
	array_init: new Array(),
	complexity: 0.5,
	tableId: "boxGrid",
	
	rndBg: function() {
		var bg_num = Math.ceil(Math.random() + Math.random());

		$(this.tableId).className = "bg_" + bg_num;
	},

	rndNum: function() {
		//随机数字1-9
		return parseInt(Math.random() * 8 + 1);
	},
	//获取九宫格域
	getDistrict: function(n) {
		return parseInt(n/3) * 3;
	},
	//初始化矩阵数据
	initialize: function() {
		//横向行
		for(var i = 0; i < 9; i++)
		{
			this.array_init[i] = new Array();
			//纵向列
			for(var j = 0; j < 9; j++)
			{
				this.array_init[i][j] = '';
				var newNum = this.rndNum();
		 
				if(this.chkRepeat(i, j, newNum))
				{
					
					this.array_init[i][j] = newNum;
				}
			}
			
		}
		//alert(this.array_init.length);
	},
	//检测重复
	chkRepeat: function(x, y, num) {
		//检测所属九宫格区域内是否重复
		var d_x = this.getDistrict(x);
		var d_y = this.getDistrict(y);
		
		for(var i = 0; i < 9; i++)
		{
			//列重复 //行重复
			if((x in this.array_init && i in this.array_init[x] && this.array_init[x][i] == num) || (i in this.array_init && y in this.array_init[i] && this.array_init[i][y] == num) )
			{
				//若重复则不可设置
				return false;
			}
			//九宫格内检测
			//i所在区域
			var d_i = this.getDistrict(i);
				
			for(var j = 0; j < 9; j++)
			{
				//j所在区域
				var d_j = this.getDistrict(j);
				if(d_i == d_x && d_j == d_y && i in this.array_init && j in this.array_init[i] && this.array_init[i][j] == num)
				{
					//若重复则不可设置
					return false;
				}
			}
		}
		
		return true;
	},
					
	fillTable: function() {
		
		//填充行
		var trEle = "";
		for(var i = 0; i < 9; i++)
		{
			trEle += "<tr>";
			
			for(var j = 0; j < 9; j++)
			{

				trEle += "<td>";
				var disable = '';
				if(this.array_init[i][j] != '')
				{
					disable = 'disabled';
				}
				trEle += "<input type='text' value='" + this.array_init[i][j] + "' " + disable + " maxlength=1 id='g_" + i + j + "'/>";
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
		this.initialize();
		this.fillTable();
		this.rndBg();
		this.release();
	}
}
sudoku.exec();
