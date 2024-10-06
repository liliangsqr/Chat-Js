
function EnvoyerMessage(_utilisateur) {

    //Je crée un objet avec 'utilisateur et le contenu de la text aréa puis je supprime le contenu de
    //la textaréa
    const Envoyeur_Contenu = {
        utilisateur: _utilisateur,
        texte: document.getElementById("message").value
    };
    if(Envoyeur_Contenu.texte === ""){
        return ; // empéche d'envoyer des messages vides
    }
    document.getElementById("message").value = "";

    let conversation = JSON.parse(localStorage.getItem("discussion")) || [];
    conversation.push(Envoyeur_Contenu);

    localStorage.setItem("discussion", JSON.stringify(conversation));
    Affichage_Discussion(Envoyeur_Contenu);
}

function Affichage_Discussion(_message) {
    if(_message.text !== ""){
        //création d'un élément p avec le message
        const newMessage = document.createElement("pre");
        newMessage.textContent = _message.texte;

        //condition pour savoir qui a envoyer le message
        if (_message.utilisateur === "user1") {
            newMessage.classList.add("message-u1");
        } else if (_message.utilisateur === "user2") {
            newMessage.classList.add("message-u2");
        }
        //envoi du message dans le chat
        document.querySelector('.boite-dialogue').appendChild(newMessage)
    }
}

function F5Conversation(){
    let conversation = JSON.parse(localStorage.getItem("discussion")) || [];
    conversation.forEach(Envoyeur_Contenu => {Affichage_Discussion(Envoyeur_Contenu)});
}

window.onload = function () {
    F5Conversation();
}

window.addEventListener('storage', (event) => {
    if (event.key === 'discussion') {
        document.querySelector('.boite-dialogue').innerHTML = "";
        F5Conversation();
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('discussion');
});

//fonction qui quand on appuis sur entré envoi le message qu lieu d'appuyer sur le bouton (c'etait chiant)
document.getElementById('message').addEventListener('keydown', function (event) {
    if (event.key === 'Enter'&& !event.shiftKey) {
        event.preventDefault();
        let utilisateur = document.querySelector('.conversation-globale').id
        if( utilisateur==="user1"){
            EnvoyerMessage("user1");
        }
        else if (utilisateur==="user2"){
            EnvoyerMessage("user2");
        }
    }
});