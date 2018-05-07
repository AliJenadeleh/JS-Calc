/// /// <reference path="jquery-2.1.1.min.js" />

 $(function(){
               $('button').each(function(index){
                  $(this).attr('title',$(this).text());
               });
               
               $('button').click(function(){
                   var _val = $(this).text();
                    calc.Direction(_val);
                   });   
                                          
});

var Calculator = function()
{
    var _cur = 0;
    var _oper = '';
    
    var SetResult = function(result)
    {
        $('#lbl').text(result);
    } 
    var GetResult = function()
    {
        return $('#lbl').text();
    }
    
    var SetInput = function(input)
    {
        document.getElementById('input').value = input;
    }
    var GetInput = function()
    {
        var input = document.getElementById('input').value;
        return input;
    }
    
    this.Direction =  function (value)
            {
                 switch(value)
                     {
                         case '+':
                         case '-':
                         case '*':
                         case '/':
                         Operation(value);
                         break;
                         case '=':
                         this.Equal();
                         break;
                         case '0':
                         case '1':
                         case '2':
                         case '3':
                         case '4':
                         case '5':
                         case '6':
                         case '7':
                         case '8':
                         case '9':
                         this.SetNumber(value);
                         break;
                         case 'C':
                         Clear();
                         break;
                         case 'Del':
                         default:
                         this.Back();
                         break;
                     }
            }
            
            this.Back = function()
            {
                var val = $('#input').val();
                if(val.length > 1)
                {
                 val = val.substring(0,val.length -1);
                 SetInput(val);
                } 
                else
                {
                    SetInput('');
                }
            }
            function Clear()
            {
                //_output(0);
                _cur = 0;
                _oper = '';
                SetInput('');
                SetResult('');
            }
            function Operation(opr)
            {
                if(opr == '+')
                {
                    Add();
                }
                if(opr == '-')
                {
                    Sub();
                }
                if(opr == '/')
                {
                    Div();
                }
                if(opr == '*')
                {
                    Mul();
                }
            }
            // --------- math part
            
            var XCalc = function(loper)
            {
              var val = GetInput();
              if(_oper == '' && val != '')
              {
                _cur = Number(val);
                _oper = loper;
                SetInput('');
                SetResult(_cur + ' ' + loper);
              }
              else if(_oper == '' && val == '')
              {
                  _oper = loper;
                  SetResult(_cur + ' ' + loper);
              }
              else if(_oper != '' && val != '' && _oper != loper )
              {
                  Operation(_oper);
                  _oper = loper;
                  SetResult(_cur + ' ' + loper);
                  SetInput('');
              }
              else if(_oper == loper && val != '')
              {
                  if(loper == '+')
                   _cur += Number(GetInput());
                  else if (loper == '-')
                   _cur -= Number(GetInput());
                  else if (loper == '/')
                   _cur /= Number(GetInput());
                  else if (loper == '*')
                   _cur *= Number(GetInput());
                  
                  _oper = loper;
                  SetInput('');
                  SetResult(_cur + ' ' + loper);
              }
              else if(_oper != '' && val == '' )
              {
                  _oper = loper;
                  SetResult(_cur + ' ' + loper);
              }
            }
            
            var Add = function()
            {
              XCalc('+');
            }          
            
            var Sub = function()
            {
             XCalc('-');
            }
            var Div = function()
            {
                XCalc('/');
            }
            var Mul = function()
            {
                XCalc('*');
            }
            
            this.Equal = function()
            {
                var val = GetInput();
                if(_oper != '' && val != '' )
                {
                    Operation(_oper);
                    SetResult(_cur);
                    SetInput('');
                    _oper = '';
                }
                else if(_oper == '' && val != '')
                {
                    _cur = Number(val);
                    SetResult(val);
                    SetInput('');
                }
            }
            this.SetNumber = function(num)
            {
                var val = GetInput();
                if(val == '' || val == '0' || val == null)
                {
                 SetInput(num);
                }
                else
                {
                  SetInput(val + num);
                }
            }
              
};
var calc = new Calculator();