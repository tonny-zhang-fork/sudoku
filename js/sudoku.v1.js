function $(id) {
	return document.getElementById(id);
}

//生成数独矩阵使用挖洞算法
var counter = 0;
var sudoku = {
	array_init: new Array(),
	complexity: 0.5,
	tableId: "boxGrid",
	
	rndBg: function() {
		var bg_num = Math.ceil(Math.random() + Math.random());

		$(this.tableId).className = "bg_" + bg_num;
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

	//递归
    fillInit: function(x, y) {
        x = arguments[0] || 1;
        y = arguments[1] || 0;
        if(x > 8 || y > 8)
            return true;

        for(var n = 1; n < 10; n++)
        {
            var setted = true;
            if(!this.chkRow(x, n))
                setted = false;

            if(setted)
            {
                if(!this.chkCol(x, y, n))
                    setted = false;
            }

            if(setted)
            {
                if(!this.chkUnit(x, y, n))
                    setted = false;
            }

            if(setted)
            {
                this.array_init[x][y] = n;
                console.log(x,y, n, setted);
                if(y < 8) //先设置列
                {
                    if(this.fillInit(x, y + 1))
                        return true;
                }
                else
                {
                    //再设置行
                    if(x < 8)
                    {
                        if(y == 8)
                            y = 0;
                        if(this.fillInit(x + 1, y))
                            return true;
                    }
                    else
                        return true;
                }


            }
        }

		return false;
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

	//获取九宫格域
	getDistrict: function(n) {
		return parseInt(n/3) * 3;
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
				trEle += "class='boldBottom'";
			trEle += ">";
			for(var j = 0; j < 9; j++)
			{
				trEle += "<td ";
				//纵向
				if(j < 8 && (j+1)%3 == 0 )
					trEle += "class='boldRight'";

				trEle += ">";
				var disable = '';
				var val = '';
                //if(!false && Math.random() > this.complexity)
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
