
const main = document.getElementById('main')
const textContainer = document.getElementById('text-container')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('btn-close')
const selectVoices = document.getElementById('voices')
const readBtn = document.getElementById('btn-read')
const textArea = document.getElementById('text')

let data = [
    {
        image: '/img/happy.jpg',
        text:'I am Happy'
    },
    {
        image: '/img/angry.jpg',
        text:'I am Angry'
    },
    {
        image: '/img/sad.jpg',
        text:'I am Sad'
    },
    {
        image: '/img/tired.jpg',
        text:'I am Tired'
    },
    {
        image: '/img/sick.jpg',
        text:'I am feeling Sick'
    },
    {
        image: '/img/Hungry.jpg',
        text:'I am Hungry'
    },
    {
        image: '/img/Thirsty.jpg',
        text:'I am Thirsty'
    },
    {
        image: '/img/playing.jpg',
        text:'I want to Play'
    },
    {
        image: '/img/scared.jpg',
        text:'I am Scared'
    },
    {
        image: '/img/school.jpg',
        text:'I am want to go to School'
    },
    {
        image: '/img/Home.jpg',
        text:'I want to go Home'
    },
    {
        image: '/img/grandma.jpg',
        text:'I want to visit Grandma'
    }

]


data.forEach(createBox)

let voices = []

function createBox(item){
    const box = document.createElement('div')
    box.classList.add('box')

    const {image,text} = item

    box.innerHTML=`<img src="${image}" alt=${text}><p class="info">${text}</p>` 

    box.addEventListener('click', ()=>{
        textMessage(text)
        speakText()

        box.classList.add('active')

        setTimeout(()=>box.classList.remove('active'),800)
    })

    main.appendChild(box)
}

const message = new SpeechSynthesisUtterance()

function textMessage(text){
    message.text = text
}

function speakText(){
    speechSynthesis.speak(message)
}

function getVoice(){
    voices = speechSynthesis.getVoices()

    voices.forEach(voice => {
        const option = document.createElement('option')

        option.value = voice.name
        option.innerHTML=`${voice.name} ${voice.lang}`

        selectVoices.appendChild(option)
    })
}

function changedVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value)
}


toggleBtn.addEventListener('click',()=> textContainer.classList.toggle('show'))

closeBtn.addEventListener('click',()=> textContainer.classList.remove('show'))

speechSynthesis.addEventListener('voiceschanged',getVoice)

selectVoices.addEventListener('change',changedVoice)

readBtn.addEventListener('click',()=>{
    textMessage(textArea.value)
    speakText()
})

getVoice()