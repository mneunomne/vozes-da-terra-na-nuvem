const EventEmitter = require('events')
var firebase = require('firebase');

import $ from 'jquery';

class DB extends EventEmitter {
	constructor () {
		super();
		var config = {
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			databaseURL: process.env.DATABASE_URL,
			projectId: process.env.PROJECT_ID,
			storageBucket: "",
			messagingSenderId: process.env.MESSAGING_SENDER_ID
		};
		
		var app = firebase.initializeApp(config);
		
		this.ref = firebase.app().database().ref('/teste')

		// global db events
		this.load();
	}

	load(){
		var self = this;
		this.ref.once('value', function(snapshot){
            snapshot.forEach(function(childSnapshot) {               
	            // iterar cada criatura
	            console.log('for each')
	            var data = childSnapshot.val();	            
	            self.append_audio(data)
            });
            self.addEvents();
        });   
	}

	addEvents(){
		var self = this; 
		this.ref.limitToLast(1).on('value', function(snapshot) {
            console.log('for each')            
            for(var i in snapshot.val()){
            	var data = snapshot.val()[i];
            	console.log(snapshot)
            	self.append_audio(data)
            }	                        
		});
	}

	append_audio(data){
		console.log('data', data)
        var src = 'http://aurora.webfactional.com/vozes/data/'+data.id+'.wav' 
 		
         var text =  data.text != "" ? '<span>'+data.text+'</span>' : ""

         $.get(src)

		var dom = '<tr id="'+data.id+'">'+
				    '<td valign="middle">'+
				    	'<audio controls preload="none">'+
	        		  		'<source src="'+src+'" type="audio/mpeg">'+
	        		  	'</audio>'+
				    '</td>'+				    
				    '<td class="transcription" valign="middle">'+
				    	text 
				    '</td>'+
				  '</tr>'
                  
        // var dom = '<audio controls><source src="audio/' + $files[$x] + '" type="audio/mpeg"></audio></br>';
        $('#audio-list table').append(dom)

        //var text = '<span>'+data.text+'</span>'

        //if(data.text != "") $('#'+data.id + ' .transcription').append(text)
	}
}
export default DB
