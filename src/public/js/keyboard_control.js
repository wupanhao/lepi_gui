// import $ from  'jquery';
// let div1 = document.getElementsByClassName("s-main-l"); //选取要操作的元素
// console.log('div1 : ', div1);
// if(div1.length > 0){
//     div1.each(function(i,obj){
//         $(obj).onkeydown(function(event){
//             event = event || window.event;
//             var iekey = event.keyCode; //获取你键盘按下的的什么键（得到数字）
//
//             //上下切换(div1[i+2]：2是列数)
//             if(iekey == 40 && typeof(div1[i+2])!= 'undefined') {
//                 setTimeout(function(){div1[i+2].select();},10);
//             }else if(iekey == 38 && typeof(div1[i-2])!= 'undefined'){
//                 setTimeout(function(){div1[i-2].select();},10);
//             }
//
//             //左右切换
//             if (iekey == 37 || iekey == 39) {
//
//                 //获取当前光标在表单的位置
//                 if (document.selection) {
//                     var sel = document.selection.createRange();
//                     sel.setEndPoint("StartToStart", this.createTextRange())
//                     var s = sel.text.length //获取光标在表单的位置
//                 }else{
//                     var s = this.selectionStart; //获取光标在表单的位置
//                 }
//
//                 if (iekey == 39 && typeof(div1[i+1])!= 'undefined' && s == this.value.length) {
//                     setTimeout(function(){div1[i+1].select();},10);
//                     //setCaretPosition(div1[i+1],div1[i+1].value.length);
//                 }else if(iekey == 37 && typeof(div1[i-1])!= 'undefined' && s == 0){
//                     setTimeout(function(){div1[i-1].select();},10);
//                     //setCaretPosition(div1[i-1],0);
//                 }
//             }
//         });
//     });
// }
//
// //控制光标的初始化位置
// function setCaretPosition(obj, pos){
//
//     if(obj.setSelectionRange){
//         obj.setSelectionRange(pos,pos);
//     }else if(obj.createTextRange) {
//         var range = obj.createTextRange();
//         range.collapse(true);
//         range.moveEnd('character', pos);
//         range.moveStart('character', pos);
//         range.select();
//     }
// }