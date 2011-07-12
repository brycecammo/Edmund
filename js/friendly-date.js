function FriendlyDate(str_date,str_format) {
       <!-- Friendly Date Converter -->
       <!-- © James Kanjo 2011 -->

       var obj_date = {raw:str_date.replace(/(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):\d\d([\+-])(\d\d):(\d\d)/,'year:$1;month:$2;day:$3;hour:$4;minute:$5;z:$6;zhour:$7;zminute:$8;')};

       obj_date = {raw:obj_date["raw"], year:/year:([^;]+);/.exec(obj_date["raw"])[1], month:/month:([^;]+);/.exec(obj_date["raw"])[1], day:/day:([^;]+);/.exec(obj_date["raw"])[1], hour:/hour:([^;]+);/.exec(obj_date["raw"])[1], minute:/minute:([^;]+);/.exec(obj_date["raw"])[1], z:/z:([^;]+);/.exec(obj_date["raw"])[1], zhour:/zhour:([^;]+);/.exec(obj_date["raw"])[1], zminute:/zminute:([^;]+);/.exec(obj_date["raw"])[1]};

       var int_tmp = eval(obj_date["zminute"]);
       obj_date["zhour"] = eval(obj_date["zhour"]) + (int_tmp>=60)*Math.floor(int_tmp/60);
       obj_date["zminute"] = (int_tmp<60)*int_tmp + (int_tmp>=60)*(int_tmp%60);

       int_tmp = eval(obj_date["minute"]);
       obj_date["minute"] = int_tmp + eval('0'+obj_date["z"]+obj_date["zminute"]);
       int_tmp = eval(obj_date["minute"]);
       obj_date["hour"] = eval(obj_date["hour"])+(int_tmp>=60)+(int_tmp<0)*-1;
       obj_date["minute"] = (int_tmp>=0&&int_tmp<60)*int_tmp+(int_tmp<0)*(60-Math.abs(int_tmp))+(int_tmp>=60)*(int_tmp-60);

       int_tmp = eval(obj_date["hour"]);
       obj_date["hour"] = int_tmp + eval('0'+obj_date["z"]+obj_date["zhour"]);
       int_tmp = eval(obj_date["hour"]);
       obj_date["day"] = eval(obj_date["day"])+(int_tmp>=24)+(int_tmp<0)*-1;
       obj_date["hour"] = (int_tmp>=0&&int_tmp<24)*int_tmp+(int_tmp<0)*(24-Math.abs(int_tmp))+(int_tmp>=24)*(int_tmp-24);

       var tmp_date = new Date(eval(obj_date["year"]), eval(obj_date["month"])-1, eval(obj_date["day"]));
       obj_date["year"] = tmp_date.getFullYear();
       obj_date["month"] = tmp_date.getMonth()+1;
       obj_date["day"] = tmp_date.getDate();

       var fmt_yy = obj_date["year"].toString().replace(/\d\d(\d\d)/,'$1');
       var fmt_yyyy = obj_date["year"];
       var fmt_m = obj_date["month"];
       var fmt_mm = ('0'+obj_date["month"]).replace(/^0(..)/,'$1');
       var fmt_mmmm = ["January","February","March","April","May","June","July","August","September","October","November","December"][eval(obj_date["month"])-1];
       var fmt_mmm = /^(...)/.exec(fmt_mmmm)[1];
       var fmt_d = obj_date["day"];
       var fmt_dd = ('0'+obj_date["day"]).replace(/^00/,'0');
       var fmt_h = obj_date["hour"];
       var fmt_hh = obj_date["hour"];
       var fmt_M = obj_date["minute"];
       var fmt_MM = ('0'+obj_date["minute"]).replace(/^0(..)/,'$1');
       var fmt_P = "AM";
       var fmt_p = "am";
       if (eval(obj_date["hour"])>12) {
           fmt_P = "PM";
           fmt_p = "pm";
           fmt_h = eval(obj_date["hour"])-12;
       }

       str_format = str_format.replace(/\[yyyy]/gi,fmt_yyyy);
       str_format = str_format.replace(/\[yy]/gi,fmt_yy);
       str_format = str_format.replace(/\[mmmm]/gi,fmt_mmmm);
       str_format = str_format.replace(/\[mmm]/gi,fmt_mmm);
       str_format = str_format.replace(/\[mm]/g,fmt_mm);
       str_format = str_format.replace(/\[m]/g,fmt_m);
       str_format = str_format.replace(/\[dd]/gi,fmt_dd);
       str_format = str_format.replace(/\[d]/gi,fmt_d);
       str_format = str_format.replace(/\[hh]/gi,fmt_hh);
       str_format = str_format.replace(/\[h]/gi,fmt_h);
       str_format = str_format.replace(/\[MM]/g,fmt_MM);
       str_format = str_format.replace(/\[M]/g,fmt_M);
       str_format = str_format.replace(/\[P]/g,fmt_P);
       str_format = str_format.replace(/\[p]/g,fmt_p);

       return str_format;
   }