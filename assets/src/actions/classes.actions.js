import history from '../history';
import { API_URL } from '../api';
import { getExercicesEleve } from './exercice.actions';
import { login_snack } from './auth.actions';
export const ADD_CLASS_BY_PROFF       = 'add class by professeur';
export const EDIT_CLASS_BY_PROFF      = 'supprile les proff selectionnée';
export const SUPPRIMER_CLASS_BY_ID    = 'supprime une class ';
export const GET_ALL_CLASS__BY_PROFF  = 'montre le form ';
export const UPDATE_CLASS_LIST        = 'modifier l\'ordre de la liste';
export const UPDATE_CLASS_NOM         = 'modifier le nom de la classe';
export const SETCURRENTCLASS          = 'SET CURRENT CLASS';
export const SET_CLASS_STATS          = 'sets stats for teacher';
export const UPDATE_CLASS_USER        = 'UPDATE_CLASS_USER';
       const ID_PROFF                 = '/users/1';

//export const ADD_CLASS_BY_PROFF = 'Ajoute  à la selection';

export const setClasseAction = classe => ({
  type: SETCURRENTCLASS,
  payload: classe
});

// On ajoute une class pour un Nom avec L'id d'un proff ( en dur pour l'instant )
export const addClass = (nom, id) => {
  var details = {
    'name': nom,
    'teacher': id
  }
  
  var formBody = JSON.stringify(details);
 
  return (dispatch, getState) => { 
    fetch(API_URL + '/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization'  : 'Bearer ' + localStorage.getItem('token')
      },
      body: formBody
    })
    .then(response => response.json())
    .then(json => {
 
      dispatch(getClass());
      dispatch(login_snack("La classe a été crée"));

    })
    .catch((e) => login_snack("Une erreur est survenue"));
  }
};

// On modifie le nom d'une classe par son id
export const updateClass = (nom, id) => {

  var details = {
    'name': nom
  }
  var formBody = JSON.stringify(details);

  return (dispatch, getState) => { 
    fetch(API_URL + '/classes/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formBody
    })
    .then(response => response.json())
    .then(json => {
        dispatch(login_snack("Le nom de la class a été modifié"));
        dispatch(getClass());
    })
    .catch((e) => {});
  }
};

// Supprime une classe 
export const deleteClass = (id) => {

  return (dispatch, getState) => { 
    fetch(API_URL + '/classes/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
          'Authorization'  : 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => response)
    .then(json => {
      //dispatch(login_snack("Le nom de la class a été modifié"));
      history.push('/professeur/classes');
      //dispatch(getClass());
    })
    .catch((e) => {});
  }
};

// Get all classes
export const getClass = () => {
  return (dispatch, getState) => { 
    fetch(API_URL + '/classes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization'  : 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(json => {
   // Une fois fini, on affiche toute les classes

      dispatch(getClassAction(json["hydra:member"]));
    })
    .catch((e) => {});
  }
};

export const getClassStats = () => {
  return (dispatch, getState) => { 
    fetch(API_URL + '/stats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization'  : 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(json => {
   // Une fois fini, on affiche toute les classes
    
      dispatch(getClassStatsAction(json));
    })
    .catch((e) => {});
  }
};

// Get all classes
export const getClassUser = () => {
  return (dispatch, getState) => { 
    fetch(API_URL + '/user/classe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'Authorization'  : 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(response => response.json())
    .then(json => {
   // Une fois fini, on affiche toute les classes
      //dispatch(getExercicesEleve(json));
      dispatch(GetClassUser(json));
      dispatch(getExercicesEleve(json));
    })
    .catch((e) => {});
  }
};



export const GetClassUser = (classeUser) => ({
  type: UPDATE_CLASS_USER,
  payload: classeUser
});



// Le nom est modifier dans le TextField
export const FormUpdateClassNom = (nom) => ({
  type: UPDATE_CLASS_NOM,
  payload: nom
});

// Affiche toute les stats d'une classes
export const getClassStatsAction = arrayStats => ({
  type: SET_CLASS_STATS,
  payload: arrayStats
});
// Affiche toute les classes
export const getClassAction = arrayClass => ({
  type: GET_ALL_CLASS__BY_PROFF,
  payload: arrayClass
});

// Ce n'est pas un update de la classe, c'est l'update de la liste dans la search bar.
export const UpdateClass = updatedList => ({
  type: UPDATE_CLASS_LIST,
  payload: updatedList
});


