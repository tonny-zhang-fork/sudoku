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
		for(var i = 0; i < 9; i++)
		{
			this.array_init[i] = new Array();
            var tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for(var j=0; j < 9; j++)
            {
                //随机初始第一行
                if(i == 0)
                {
                    var rndIndex = Math.floor(Math.random() * (9 - j));

                    this.array_init[i][j] = tempArr[rndIndex];
                    tempArr.splice(rndIndex, 1);

                    continue;
                }
                this.array_init[i][j] = 0;
            }
		}
	},

	//初始化矩阵数据
    fillInit: function() {
        //从i = 1行开始
		var i = 1;
        var able = true;
		do
		{
			for(var j = 0; j < 9; j++)
 			{
                var flag = false; //判断(i,j)是否可以存放
                var conflict = 9;
                for(var n = 1; n < 10; n++)
                {
                    flag = this.chkRow(i, n);
                    if(flag)
                        flag = this.chkCol(i, j, n);

                    if(flag)
                        flag = this.chkUnit(i, j, n);
                    if(flag)
                    {
                        this.array_init[i][j] = n;
                        break;//跳出循环进行下一列
                    }
                }
                if(!flag)
                {
                    do
                    {
                        var rt = false;

                        //和本行前面的数字进行交换
                        for(var k = 0; k < j; k++)
                        {
                            //如果i行前面已经出现此conflict;
                            if(!this.chkRow(i, conflict))
                            {
                                rt = false;
                                break;
                            }
                            //不检测同行,检测col和unit
                            //检测被交换的数字是否在(i, j)冲突
                            var flag_col = this.chkCol(i, j, this.array_init[i][k]); 
                            if(!flag_col)
                                continue;
                            var flag_unit = this.chkUnit(i, j, this.array_init[i][k]);
                            if(!flag_unit)
                                continue;

                            //检测是否冲突的数字(i, k)是否冲突
                            flag_col = this.chkCol(i, k, conflict);
                            if(!flag_col)
                                continue;
                            flag_unit = this.chkUnit(i, k, conflict);
                            if(!flag_unit)
                                continue;

                            //将(i,k)的数字赋值(i, j)
                            this.array_init[i][j] = this.array_init[i][k];
                            this.array_init[i][k] = conflict;
                            rt = true;
                            
                            break;
                        }

                        if(rt)
                            break;

                        conflict--;
                    }
                    while(conflict > 0);
                }
 			}

			i++;
		}
		while(i < 9);
		return;
	},
    //行重复检测
    chkRow: function(x, num) {
        if((this.array_init[x] && this.array_init[x].indexOf(num) > -1 ))
        {
            return false;
        }
        return true;
    },
    //列重复
    chkCol: function(x, y, num) {
        for(var i = 0; i < x; i++)
        {
            if(this.array_init[i][y] == num)
            {
                return false;
            }
        }
        return true;
    },

    //九宫格检测
    chkUnit: function(x, y, num) {
        var unit = this.getUnitNumbers(x, y);
        if(unit.indexOf(num) > -1)
        {
            return false;
        }
        return true;
    },

    //获取九宫格内的数字
	getUnitNumbers: function(x, y) {
		var d_x = this.getDistrict(x);
		var d_y = this.getDistrict(y);
		var temp = [];
		for(var i = 0; i < x; i++)
		{
			var d_i = this.getDistrict(i);

			for(var j = 0; j < (d_y+3); j++)
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
				//if(this.array_init[i] && this.array_init[i][j] != '')
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
	exec: function() {
		this.init();
		this.fillInit();
		this.fillTable();
		this.rndBg();
	}
}
sudoku.exec();
