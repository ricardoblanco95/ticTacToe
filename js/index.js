$(document).ready(function(){
 //alert(Math.round(5*Math.random()));
 var you = ' ';
 var op = ' ';
 var countYou = 0;
 var countOp = 0;
 var begin = false;
 var noWin = false;
 var tempHtml = '';
 var addHtml = "<div class='addCont'> <h2 id='addTitle'>Choose your side:</h2> <div class='row'> <div id='x' class='col-xs-6'> X </div><div id='y' class='col-xs-6'> O </div></div></div>";
 var boardHtml= "<div style='font-size:30px; font-weight=bold;'>You: <span id='youCount'>"+countYou+"</span></div><div style='font-size:30px; font-weight=bold;'>Computer: <span id='opCount'>"+countOp+"</span></div><div id='reset' class='btn btn-danger'>RESET</div><div class='boardCont container-fluid'><div class='row row1'><div class='col-xs-4 sq1'> </div><div class='col-xs-4 sq2'> </div><div class='col-xs-4 sq3'> </div></div><div class='row row2'><div class='col-xs-4  sq4'> </div><div class='col-xs-4 sq5'> </div><div class='col-xs-4 sq6'> </div></div><div class='row row3'><div class='col-xs-4 sq7'> </div><div class='col-xs-4 sq8'> </div><div class='col-xs-4 sq9'> </div></div></div>";
 var winHtml = "<div class='addCont winCont'> <h2 id='addTitle'><span id='winner'>--</span> the winner!</h2> <div id='continue' class='btn btn-primary' style='text-align:center;'>CONTINUE</div></div>";
 var nobodyHtml="<div class='addCont nobodyCont'> <h2 id='addTitle'>Oops! Nobody Wins.</h2> <div id='continue' class='btn btn-primary' style='text-align:center;'>CONTINUE</div></div>";
 var resetHtml = "<div class='addCont'> <h2 id='addTitle'>Do you want to reset the game?</h2> <div class='row'> <div id='yes' class='col-xs-6'> YES </div><div id='no' class='col-xs-6'> NO </div></div></div>";;
 var strArrRow = ['.sq1','.sq2','.sq3','.sq4','.sq5','.sq6','.sq7','.sq8','.sq9'];
 var strArrCol = ['.sq1','.sq4','.sq7','.sq2','.sq5','.sq8','.sq3','.sq6','.sq9'];
 var strArrDiag = ['.sq1','.sq5','.sq9','.sq3','.sq5','.sq7'];
 var verifyForEmpty = function(str,indexArr,count){
   var b = false;
   while(!b){
    if($(str).text()!==' '){
	//alert(['str.text:',$(str).text()]);
	var a = getRangeInt(0,count.length-1);
    //alert(['a:',a]);
    str = indexArr[count[a]];
    alert(['str:',str]); 
   }else{
    b = true;
	$(str).text(op);
    $(str).text() === 'X' ? $(str).css('color','rgb(100,100,255)') : $(str).css('color','rgb(255,62,62)');
   }
   }
 };
 var resetVar = function(){
	you = ' ';
	op = ' ';
	begin = false;
	noWin = false;
	tempHtml = '';
	//alert([countYou,countOp]);
	$('.container-fluid').html(addHtml);
 };
 var getRangeInt = function(min,max){
 	return Math.floor(Math.random() * (max - min + 1)) + min;
 };
 var searchWinner = function(){
   var tempYou = 0;
   var tempOp = 0;
   var count=0;
   var winner = '';
   //ROW SEARCH
   for(var i = 0; i<3; i++){
     tempYou=0;
     tempOp=0;
     if($(strArrRow[count]).text()===you){
       tempYou++;
     }else if($(strArrRow[count]).text()===op){
       tempOp++;
     }
     for(var j = 0; j<2;j++){
	  count++;
      if($(strArrRow[count]).text()===you){
       tempYou++;
     }else if($(strArrRow[count]).text()===op){
       tempOp++;
     }
    }
     if(tempYou===3){
       i=3;
       countYou++;
       winner = 'You are';
     }else if(tempOp===3){
       i=3;
       countOp++;
       winner = 'Computer is';
     }
	 count++;
	 }
	 
   //COLUMNS SEARCH
   if(tempYou !== 3 && tempOp !== 3){
     count = 0;
     for(var i = 0; i<3; i++){
      tempYou=0;
      tempOp=0;
      if($(strArrCol[count]).text()===you){
        tempYou++;
      }else if($(strArrCol[count]).text()===op){
         tempOp++;
      }
      for(var j = 0; j<2;j++){
		  count++;
          if($(strArrCol[count]).text()===you){
          tempYou++;
          }else if($(strArrCol[count]).text()===op){
          tempOp++;
          }
        }
        if(tempYou===3){
          i=3;
          countYou++;
          winner = 'You are';
        }else if(tempOp===3){
           i=3;
          countOp++;
          winner = 'Computer is';
      }
	  count++;
	  }
   }
   
   //DIAGONAL SEARCH
   if(tempYou !== 3 && tempOp !== 3){
     count = 0;
     for(var i = 0; i<2; i++){
      tempYou=0;
      tempOp=0;
      if($(strArrDiag[count]).text()===you){
        tempYou++;
      }else if($(strArrDiag[count]).text()===op){
         tempOp++;
      }
      for(var j = 0; j<2;j++){
		  count++;
          if($(strArrDiag[count]).text()===you){
          tempYou++;
          }else if($(strArrDiag[count]).text()===op){
          tempOp++;
          }
        }
        if(tempYou===3){
           i=3;
          countYou++;
          winner = 'You are';
        }else if(tempOp===3){
           i=3;
           countOp++;
           winner = 'Computer is';
      }
	  count++;
	  }
   }
   
   if(tempYou === 3 || tempOp === 3){
     var c = 0;
     noWin = true;
     winner === 'You are' ? c=countYou : c=countOp;
     $('.container-fluid').html(winHtml);
     $('#winner').text(winner);
     //$('#youCount').text(countYou);
     //$('#opCount').text(countOp);
   }
   
   
 };
 var opSearch = function(){
   var count=0;
   var flag = false;
   var filled = 0;
   //Search for 'op' in the grid. If it's found, flag=true, else flag=false.
   for(var i = 1; i <10; i++){
     var str ='.sq'+i;
     if($(str).text()===op){
        flag=true;
      }
     if($(str).text()!==' '){
        filled++;
      }
   }
  //alert(filled);
  if(flag && filled < 9){
    var sqCount=0;
	var sqArr=[];
	var countEmpty=0;
	var countYou=0;
	var countOp=0;
    var indexArr = []; //Save the indexes of the current row/column/diagonal.
    var search = 0; //1 for rows, 2 for columns, 3 for first diagonal, 4 for second diagonal.
	  //-ROW SEARCH-//
    for(var i = 0; i<3; i++){
	  var tempSq=[];
	  var tempEmpty=0;
	  var tempYou=0;
	  var tempOp=0;
    var tempIndex = [];
	  switch($(strArrRow[sqCount]).text()){
			case ' ': tempEmpty++; break;
			case ' X ': tempYou++; break;
			case ' Y ': tempOp++; break;
		  	}
	  tempSq.push($(strArrRow[sqCount]).text());
    tempIndex.push(strArrRow[sqCount]);
	  for(var j = 0; j<2;j++){
		sqCount++; //Count Increment for the strArr index.
		switch($(strArrRow[sqCount]).text()){
			case ' ': tempEmpty++; break;
			case ' X ': tempYou++; break;
			case ' Y ': tempOp++; break;
	     		   } 
      tempSq.push($(strArrRow[sqCount]).text());
      tempIndex.push(strArrRow[sqCount]);
	   }
     //alert([tempSq,tempYou,tempOp]);
     if(tempEmpty>0 && tempOp>countOp){
	  sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
	   }else if(tempEmpty>0 && tempOp===countOp && tempYou>countYou){
      sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
     }else if(tempEmpty>0){
	  sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
	 }
	   sqCount++; //Count Increment for the strArr index.
	 }
    //alert(['sqArr:',sqArr]);
    //alert(['indexArr:',indexArr]);
   
   //-COLUMN SEARCH-//
    sqCount=0;
    for(var i = 0; i<3; i++){
	  var tempSq=[];
	  var tempEmpty=0;
	  var tempYou=0;
	  var tempOp=0;
    var tempIndex = [];
	  switch($(strArrCol[sqCount]).text()){
			case ' ': tempEmpty++; break;
			case ' X ': tempYou++; break;
			case ' Y ': tempOp++; break;
		  	}
	tempSq.push($(strArrCol[sqCount]).text());
    tempIndex.push(strArrCol[sqCount]);
	  for(var j = 0; j<2;j++){
		sqCount++; //Count Increment for the strArr index.
		switch($(strArrCol[sqCount]).text()){
			case ' ': tempEmpty++; break;
			case ' X ': tempYou++; break;
			case ' Y ': tempOp++; break;
	     		   } 
      tempSq.push($(strArrCol[sqCount]).text());
      tempIndex.push(strArrCol[sqCount]);
	   }
     //alert([tempSq,tempYou,tempOp]);
     if(tempEmpty>0 && tempOp>countOp){
	  sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
	   }else if(tempEmpty>0 && tempOp===countOp && tempYou>countYou){
      sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
     }else if(tempEmpty>0){
	  sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
	 }
	   sqCount++; //Count Increment for the strArr index.
	 }
    //alert(['sqArr:',sqArr]);
    //alert(['indexArr:',indexArr]);
   
   //-DIAGONAL SEARCH-//
   sqCount=0;
    for(var i = 0; i<2; i++){
	  var tempSq=[];
	  var tempEmpty=0;
	  var tempYou=0;
	  var tempOp=0;
      var tempIndex = [];
	  switch($(strArrDiag[sqCount]).text()){
			case ' ': tempEmpty++; break;
			case ' X ': tempYou++; break;
			case ' Y ': tempOp++; break;
		  	}
	  tempSq.push($(strArrDiag[sqCount]).text());
    tempIndex.push(strArrDiag[sqCount]);
	  for(var j = 0; j<2;j++){
		sqCount++; //Count Increment for the strArr index.
		switch($(strArrDiag[sqCount]).text()){
			case ' ': tempEmpty++; break;
			case ' X ': tempYou++; break;
			case ' Y ': tempOp++; break;
	     		   } 
      tempSq.push($(strArrDiag[sqCount]).text());
      tempIndex.push(strArrDiag[sqCount]);
	   }
     //alert([tempSq,tempYou,tempOp]);
     if(tempEmpty>0 && tempOp>countOp){
	  sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
	   }else if(tempEmpty>0 && tempOp===countOp && tempYou>countYou){
      sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
     }else if(tempEmpty>0){
	  sqArr = tempSq.slice(0,tempSq.length);
      indexArr = tempIndex.slice(0,tempIndex.length);
      countYou = tempYou;
      countOp = tempOp;
	 }
	   sqCount++; //Count Increment for the strArr index.
	 }
   //alert(['sqArr:',sqArr]);
   //alert(['indexArr:',indexArr]);
   
   //-'op' INSERTION-//
   var countArr = [];
   for(i=0;i<sqArr.length;i++){
     if(sqArr[i]===' '){
       countArr.push(i);
     }
   }
   //alert(['count:',count]);
   if(countArr.length > 1){
     var a = getRangeInt(0,countArr.length-1);
     //alert(['a:',a]);
     var str = indexArr[countArr[a]];
     //alert(['str:',str]);
	 verifyForEmpty(str,indexArr,countArr);
     //$(str).text(op);
     //$(str).text() === 'X' ? $(str).css('color','rgb(100,100,255)') : $(str).css('color','rgb(255,62,62)');
   }else{
     var str = indexArr[countArr[0]];
     //alert(str);
     $(str).text(op);
     $(str).text() === 'X' ? $(str).css('color','rgb(100,100,255)') : $(str).css('color','rgb(255,62,62)');
   }
   searchWinner();
	}else if(!flag){
    var temp=getRangeInt(1,10); //To set 'op' in a random place of the grid.
    str='.sq'+temp;
    if($(str).text()===you && $('.sq5').text()!==' '){
      switch(temp){
        case 0: temp+=1; str='.sq'+temp; break;
        case 9: temp-=1; str='.sq'+temp; break;
        default: temp+=1; str='.sq'+temp;
                 }
      $(str).text(op);
      $(str).text() === 'X' ? $(str).css('color','rgb(100,100,255)') : $(str).css('color','rgb(255,62,62)');
    }else if($('.sq5').text()!==' '){
      $(str).text(op);
      $(str).text() === 'X' ? $(str).css('color','rgb(100,100,255)') : $(str).css('color','rgb(255,62,62)');
    }else{
      $('.sq5').text(op);
      $('.sq5').text() === 'X' ? $('.sq5').css('color','rgb(100,100,255)') : $('.sq5').css('color','rgb(255,62,62)');
    }
   }else if(filled===9){
     //alert('ok');
	 searchWinner();
	 if(!noWin){
		$('.container-fluid').html(nobodyHtml);
	}
   }
 };
  
 $('.container-fluid').html(addHtml);
 
 $(document).on('click','#x, #y',function(){
     if(!begin){
       switch($(this).text()){
          case ' X ': you = $(this).text(); op = 'O'; break;
          case ' O ': you = $(this).text(); op = 'X'; break;
                             }
       //alert([you,op,begin]);
       begin = true;
       $('.container-fluid').html(boardHtml);
	   $('#youCount').text(countYou);
	   $('#opCount').text(countOp);
	 }
   });
 
 $(document).on('click','.col-xs-4',function(){
   //alert($(this).text());
   if($(this).text()===' '){
    $(this).text(you);
    $(this).text() === ' X ' ? $(this).css('color','rgb(100,100,255)') : $(this).css('color','rgb(255,62,62)');
    opSearch(); 
   }
   
   
   
  });
 
 $(document).on('click', '#continue', function(){
   resetVar();
 });
   
 $(document).on('click', '#reset', function(){
   tempHtml = $('.container-fluid').html();
   $('.container-fluid').html(resetHtml);
 }); 
 
 $(document).on('click', '#yes', function(){
   resetVar();
   countYou=0;
   countOp=0;
 }); 
 
 $(document).on('click', '#no', function(){
   $('.container-fluid').html(tempHtml);
   tempHtml = '';
 });
   
});