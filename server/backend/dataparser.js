

const theParser = (text_to_parse) => {
try {
// La date de naissance est la 2eme date systématiquement
var dates = text_to_parse.match(/(\d{2}\/){2}\d{4}/g);
var date_naissance = dates[1];

// la date d'entree et de sortie sont les 2 dernières dates
// date de entrée
var date_entre = dates[dates.length-2];
// date de sortie
var date_sortie = dates[dates.length-1];

// Les 2 numéros des SS
var ss = text_to_parse.match(/[12][\d ]{10,}\d/g);
// On vire les espaces 
ss = ss.map((el, i, arr) => {
	return el.replace(/\s/g, '');
});
// Cette fois on check bien la taille des nombres sans espaces
ss = ss.filter((el) => {
	return /^[12]\d{10}\d$/g.test(el);
})
// Si ce sont les mêmes
console.log(ss);
ss = ss.length > 1 ? (ss[0] == ss[1] ? ss[0] : ss[1]) : ss[0];

// // IEP
// var iep = text_to_parse.match(/0\d{8}\s/g);
// iep[0] = iep[0].replace(/\s/g, '');
// iep = iep[0];


// Nom et prenom --CHAUD PATATE -- on extrait le format IEP - NOM PRENOM du header -- on doit obtenir un seul résultat
var noms_material = text_to_parse.match(/(0[ \d]{8,16})\s.[A-Z]{2,12} {1,3}[A-Z]{2,12}.*/g);
console.log(noms_material);
// On split le résultat - array univaleur
var noms_material = noms_material[0].split(' ');
// On enlève l'IEP de l'array - 1ere valeur ET on le récupère par la même occasion !!
var iep = noms_material.filter((el) => {
	return /\d/g.test(el);
}).join(' ');
// On vire les eventuels espaces
var iep = iep.replace(/\s/g, "");
// On enlève le premier 0 
var iep = iep.charAt(0) == "0" ? iep.replace(/0/, "") : iep;
console.log(iep);
// on prend les noms 
var noms = noms_material.filter((el) => {
	return /[A-Z]/g.test(el);
});
// On extrait le prenom qui est le dernier élément ET on modifie l'array
var prenom = noms.pop();
// On extrait le nom en un seul string - fonctionne également si il y a 2 noms de familles !
var nom = noms.join(' ');

console.log(nom);

// DMT -- même process qu'avec IEP
var dmt_material = text_to_parse.match(/UF\s*\d{4}([,\s]{0,2}[A-Z]{2,15}){1,2}/g);
var dmt_material = dmt_material ? dmt_material[0] : text_to_parse.match(/\s\d{4}([,\s]{0,2}[A-Z]{2,15}){1,2}/g)[1];
// On trie pour n'avoir que la DMT - on vire les numéros et l'UF
var dmt = dmt_material.split(' ').filter((el) => {
	return /(?!UF)(?!DOURDAN)(?!SUDETAMPES)(?!ETAMPES)^[A-Z]{2,15}$/g.test(el); 
}).join(' ');
console.log(dmt);

// Mutuelle -- on cherche puis on split selon les espaces pour les retraiter derrière
var mut_material = text_to_parse.match(/rang\s*[12].*/gi);
// En fonction de si on a le Rang 1 ou 2 on prend le 2 en prio
var mutuelle_material = mut_material.length === 1 ? mut_material[0].split(' ') : mut_material[1].split(' ');
// On enlève les chiffres et tout PUIS on clean tt ça en un seul string avec join
var mutuelle = mutuelle_material.filter((el) => {
	return /^[A-Z]{2,15}$/g.test(el);
}).join(' ');

var identifiant_mutuelle = mutuelle_material.filter((el) => {
	return /(\d{6})/g.test(el);
}).join(' ');

} catch (e) {
	console.log("Erreur in the DATAPARSER function");
	console.log(e);
} finally {
// 

var obj = {
		ss: ss || "",
		adherent: "",
		iep: iep || "",
		identifiant_mutuelle: identifiant_mutuelle || "",
		mutuelle: mutuelle || "",
		date_entre: date_entre || "",
		date_sortie: date_sortie || "",
		prenom: prenom || "",
		nom: nom || "",
		date_naissance: date_naissance || "",
		dmt: dmt || ""
	}

console.log(obj);
return obj;
}
}
// Excel

module.exports = theParser;