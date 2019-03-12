function handleClick(evt) {
    // get the value from the text input
    const message = document.querySelector("#message").value;
    
    // post to api end point
    const req = new XMLHttpRequest();

    // configure the request
    req.open('POST', 'api/message');

    // send POST body as if it were form submission
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.addEventListener('load', function(evt) {
        console.log(req.status, req.responseText);
        // in some cases, we wait for the response on post
        // as shown below... however, we're also already polling
        // so this part can remain commented out

        // if(req.status >= 200 && req.status < 300) {
        //    const msg = JSON.parse(req.responseText); 
        //    const div = document.body.appendChild(document.createElement('div'));
        //    div.textContent = msg.sent + ' ' + msg.text;
        // }
    });

    // construct the body of our request
    // name=value
    // create body so that it fits expected format
    req.send('message=' + message);

}

// tsk tsk. global for the date of the last message
let lastSentDate;

function getMessages() {
    const req = new XMLHttpRequest();
    let url = 'api/messages';
    if(lastSentDate) {
        url += '?lastSentDate=' + lastSentDate; 
    }

    req.open('GET', url);
    req.addEventListener('load', function(evt) {
        console.log(req.status, req.responseText);
        if(req.status >= 200 && req.status < 300) {
            const messages = JSON.parse(req.responseText); 
            for(const m of messages) {
                const div = document.body.appendChild(document.createElement('div'));
                div.textContent = m.sent + ' ' + m.text;
            }

            if(messages.length >= 1) {
                lastSentDate = messages[messages.length - 1].sent;
            }
        }
    });

    // setTimeout - delay call 
    // setInterval - repeat call with specific interval
    // use setTimeout to avoid race conditions
    setTimeout(getMessages, 500);

    req.send();
}

function main() {
    getMessages();
    const btn = document.querySelector("#btn");
    btn.addEventListener('click', handleClick);
}

document.addEventListener("DOMContentLoaded", main);








