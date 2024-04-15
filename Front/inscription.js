const addInscription = () => {
  let nom = document.getElementById("nom_utilisateur").value;
  let mail = document.getElementById("email").value;
  let mdp = document.getElementById("mdp").value;
  const inscription = { "nom": nom, "mail": mail, "mdp": mdp };

  
  console.log(JSON.stringify(inscription));

  axios
    .post("http://10.4.255.119:3000/inscription/add", inscription)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    });
};



