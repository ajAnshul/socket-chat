var socket = io();
socket.on('connect',function(){
  console.log("connected to server");
});

socket.on('disconnect',function(){
  console.log("disconnected to server");
})

function scrollToBotton(){
  var messages = jQuery('#message-list');
  var newMessage = messages.children('li:last-child');
  var scrollTop = messages.prop('scrollTop');
  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(scrollTop + clientHeight + lastMessageHeight + newMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }


}

socket.on('newMessage',function(msg){
  // console.log("GOT MSG",msg);
  var formatedTime = moment(msg.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    from:msg.from,
    createdAt:formatedTime,
    text:msg.text
  });
  jQuery('#message-list').append(html);
  scrollToBotton();
  // var li = jQuery('<li></li>')
  // li.text(`${msg.from}, ${formatedTime}: ${msg.text}`);
  // jQuery('#message-list').append(li);
})

socket.on('newLocationMessage',function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    createdAt:formatedTime,
    url:message.url
  });
  jQuery('#message-list').append(html);
  scrollToBotton()
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current location</a> ')
  // a.attr('href',message.url);
  // li.text(`${message.from}, ${formatedTime}: `);
  // li.append(a);
  // jQuery('#message-list').append(li);
  locationButton.prop('disabled',false);
})


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageText =jQuery('[name=message]');
  socket.emit('creatMessage',{
    from:"User",
    text:messageText.val()
  },function(){
    messageText.val('');
  })
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert("Allow geolocation it is not supported to your browser")
  }

  locationButton.attr('disabled','disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocation',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send location');

    alert("unable to fetch location")
  })
})
