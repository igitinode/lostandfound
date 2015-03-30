Date.prototype.format = function(format)
{
        var o =
        {
                "m+" : this.getMonth()+1, //month
                "d+" : this.getDate(),        //day
                "h+" : this.getHours(),     //hour
                "M+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3),    //quarter
                "S" : this.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format))
                format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
                if(new RegExp("("+ k +")").test(format))
                        format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
};

//object 转 stirng
function obj2str(o){
   var r = [];
   if(typeof o == "string" || o == null) {
     return o;
   }
   if(typeof o == "object"){
     if(!o.sort){
       r[0]="{" ;
       for(var i in o){
         r[r.length]=i;
         r[r.length]=":";
         r[r.length]=obj2str(o[i]);
         r[r.length]=",";
       }
       r[r.length-1]="}";
     }else{
       r[0]="[";
       for(var i =0;i<o.length;i++){
         r[r.length]=obj2str(o[i]);
         r[r.length]=",";
       }
       r[r.length-1]="]";
     }
     return r.join("");
   }
   return o.toString();
}
//string 转 object
function str2Obj(json){
   return eval("("+json+")");
}


function jsonToString (obj){   
        var THIS = this;    
        switch(typeof(obj)){   
            case 'string':   
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';   
            case 'array':   
                return '[' + obj.map(THIS.jsonToString).join(',') + ']';   
            case 'object':   
                 if(obj instanceof Array){   
                    var strArr = [];   
                    var len = obj.length;   
                    for(var i=0; i<len; i++){   
                        strArr.push(THIS.jsonToString(obj[i]));   
                    }   
                    return '[' + strArr.join(',') + ']';   
                }else if(obj==null){   
                    return 'null';   
  
                }else{   
                    var string = [];   
                    for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));   
                    return '{' + string.join(',') + '}';   
                }   
            case 'number':   
                return obj;   
            case false:   
                return obj;   
        }   
    }

function stringToJSON(obj){   
        return eval_r('(' + obj + ')');   
} 

function DoClick(id)  
{  
   if(document.all){
      document.getElementById(id).click();    
   }        
   else
   {
	  var evt = document.createEvent("MouseEvents");
	   evt.initEvent("click",true,true);
	   document.getElementById(id).dispatchEvent(evt);
   }  
}   
/*
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
*/
/**
 * 判断浏览器类型
 */
function browser(type){
	if(type=='firefox'){
		return /firefox/.test(navigator.userAgent.toLowerCase());
	}
	else if(type=='webkit'){
		return /webkit/.test(navigator.userAgent.toLowerCase());
	}
	else if(type=='opera'){
		return /opera/.test(navigator.userAgent.toLowerCase());
	}
	else if(type=='msie'){
		return /msie/.test(navigator.userAgent.toLowerCase());
	}
	else if(type=='chrome'){
		return /chrome/.test(navigator.userAgent.toLowerCase());
	}
	//ie6
	else if(type=='ie6'){
		return 'undefined' == typeof(document.body.style.maxHeight);
	}
	//ie
	else if(type=='ie'){
		return !$.support.leadingWhitespace;
	}
	else{
		return false;
	}
	
}

/**
 * 去除 html 的标签
 * @param strText
 * @returns
 */
function removeHTML( strText ) {
	var regEx = /<[^>]*>/g;  
	return strText.replace(regEx,'' );
}




function formatCurrency(num) { 
	var sign=""; 
	if(isNaN(num)) 
	{ 
	num = 0; 
	} 
	if(num<0) 
	{ 
	sign="-"; 
	} 
	var strNum=num+""; 
	var arr1 = strNum.split("."); 
	var hasPoint=false;//是否有小数部分 
	var piontPart="";//小数部分 
	var intPart=strNum;//整数部分 
	if(arr1.length>=2) 
	{ 
	hasPoint=true; 
	piontPart= arr1[1]; 
	intPart=arr1[0]; 
	} 

	var res='';//保存添加逗号的部分 
	var intPartlength=intPart.length;//整数部分长度 
	var maxcount=Math.ceil(intPartlength/3);//整数部分需要添加几个逗号 
	for (var i = 1; i <=maxcount;i++)//每三位添加一个逗号 
	{ 
	var startIndex=intPartlength-i*3;//开始位置 
	if(startIndex<0)//开始位置小于0时修正为0 
	{ 
	startIndex=0; 
	} 
	var endIndex=intPartlength-i*3+3;//结束位置 
	var part=intPart.substring(startIndex,endIndex)+","; 
	res=part+res; 
	} 
	res=res.substr(0,res.length-1);//去掉最后一个逗号 
	if(hasPoint) 
	{ 
	//return "￥"+sign+res+"."+piontPart; 
		return  sign+res+"."+piontPart; 
	} 
	else 
	{ 
	return  sign+res; 
//	return "￥"+sign+res; 
	} 

	} 





