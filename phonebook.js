window.onload = function(){
	
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');

	var phnBookDiv = document.querySelector('.phnbook');

	quickAddBtn.addEventListener("click", function(){
		
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	phnBookDiv.addEventListener("click", removeEntry);


	var phoneBook = [];


	function jsonStructure(fullname,phone){
		this.fullname = fullname;
		this.phone = phone;
	
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='';
		if(isNull){
			var obj = new jsonStructure(fullname.value,phone.value);
			phoneBook.push(obj);
			localStorage['phnbook'] = JSON.stringify(phoneBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showphoneBook();
		}
	}

	function removeEntry(e){
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			phoneBook.splice(remID,1);
			localStorage['phnbook'] = JSON.stringify(phoneBook);
			showphoneBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showphoneBook(){
		if(localStorage['phnbook'] === undefined){
			localStorage['phnbook'] = '';
		} else {
			phoneBook = JSON.parse(localStorage['phnbook']);
			phnBookDiv.innerHTML = '';
			for(var n in phoneBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + phoneBook[n].fullname + '</p></div>';
					str += '<div class="phone"><p>' + phoneBook[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				phnBookDiv.innerHTML += str;
			}
		}
	}

	showphoneBook();

}