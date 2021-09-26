
var django_order = document.getElementById("order").value.replace(/[\[\]]/g, '').split(',');
django_order = django_order.map(i => {return (+i)});
//console.log(django_order)


var id;
var idNext;
var myAudio, audio;
const firstOrder = [1, 2, 3];
const order = firstOrder.concat(django_order);


function instruction() {
  if (idNext === undefined){
    const url = a;
    window.location.href = url;
  } else {
    document.getElementById('instructions_1').style.display = 'block';
    document.getElementById("popup_"+id).style.display = "none";
  }
};


function* iterateArray(array) {
  for (const entry of array) {
    yield entry;
  }
}
const iterator = iterateArray(order);

const adapter = iterator => () => {
  const entry = iterator.next();
  return entry.value;
};

const next = adapter(iterator);


//console.log(order)
//console.log(id, idNext, myAudio)
const loadWatingHref = document.querySelector('a'),
      load = document.getElementById('load');

function nextpart() {
  window.id = next();
  var index = order.indexOf(id);
  window.idNext = order[index + 1];
  window.myAudio = document.getElementById('Player_'+id);
  //console.log('id audio', id, myAudio);
  window.path = myAudio.firstElementChild.src;
}



function audioplay() {
        loadWatingHref.style.display = 'none';
        load.style.display = 'block';
        var request = new XMLHttpRequest();
        request.open("GET", path, true);
        request.responseType = "blob"; 
        request.onload = function() {
          if (this.status == 200) {
            url = URL.createObjectURL(this.response);
            window.audio = document.createElement('audio');
            var sourceElement = document.createElement('source');
            audio.appendChild(sourceElement);
            sourceElement.src = url;
            sourceElement.type = 'audio/wav'
            audio.load();
            audio.play();
            // console.log(audio)
            loadWatingHref.style.display = 'none';
            load.style.display = 'block';
            window.isPlaying = true;
            document.getElementById('instructions_1').style.display = 'none';
            document.getElementById('practice_'+id).style.display = 'block';
          }
          audio.addEventListener('ended', audioend);
        };
        request.send();
    }



    function togglePlay() {
      if (window.isPlaying) {
        audio.pause();
        window.isPlaying = false;
        document.getElementById('text_'+id).style.display='none';
      }  else {
        audio.play();
        window.isPlaying = true;
        document.getElementById('text_'+id).style.display='block';
      }

    }


    function audioend() {
        setTimeout(goFurther, 1000);
        //console.log(audio, 'ended')
    }

    function goFurther() {
        document.getElementById("popup_"+id).style.display = "block";
        document.getElementById("practice_"+id).style.display = "none";
        loadWatingHref.style.display = 'block';
        load.style.display = 'none';
    }


var num = 1;
function nextstep() {
    if (idNext === undefined) {
        num = 53;
    } else {
    num++;
    var step = document.getElementById('step');
    step.innerHTML = "Step "+num+"/53";
}
}

    function handler(lnkObj){
      lnkObj.innerHTML = (lnkObj.innerHTML == 'Pause') ? 'Continue' : 'Pause' ;
    }


const forms = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input[type=submit]');

forms.forEach(item => {
    postData(item);
});

inputs.forEach(input => {
    getQuestion(input);
});

function getQuestion(input) {
  input.addEventListener('click', (e) => {
    window.question = e.target.value;
  });
}

function postData(form) {
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      formData.append('question', question);
      formData.append('index', id);
      // console.log(form)
      
      fetch('/data/', {
        method: "POST",
        // headers: {
        //   'X-CSRFToken': object.csrfmiddlewaretoken
        // },
        body: formData
      }).then(data => {
        if (!data.ok){
          throw Error(data.status);
        }
        //console.log('так')
      }).catch(() => {
        var object = {};
        var csrf = document.querySelector('input[name=csrfmiddlewaretoken]').value;
        var check = Array.from(document.querySelectorAll('input[name=check]:checked')).map(i => +i.defaultValue);
        // check.forEach(ch => {checkboxes.append(ch.defaultValue)})
        object = {
          question: question,
          index: id,
          check: check
        };
        // console.log(JSON.stringify(object))
        fetch('/data/', {
          method: "POST",
          headers: {
            'X-CSRFToken': csrf,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: JSON.stringify(object)
        });
      }).finally(() => {
        form.reset();
      });
  });
} 