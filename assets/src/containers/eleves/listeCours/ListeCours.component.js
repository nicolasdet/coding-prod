import React from 'react';
import { connect } from 'react-redux';
import scss from './ListeCours.module.scss';

import { getExercicesEleve, setCurrentExoUser } from '../../../actions/exercice.actions';


class ListeCours extends React.Component {

  	constructor(props) {
    	super(props);

    	this.state = {
    		eleve: null
	    }
	 }

   showExercice(i) {
     this.props.setCurrentExoUser(i);
   }

   getDateLimit(exo) {
    if(exo.dateEnd == null) {
      return 'Pas de date limite';
    } 

      return 'Disponible le : '+this.parseDate(exo.dateEnd);
    //console.log(exo.dateEnd);
   }


   parseDate(uneDate) {
    if(uneDate != null){
      return uneDate.substring(0, 10);
    }
   }
   
   getTentatives(reponses) {
    return reponses.length;
   }

   getListeExercices() {
    // si pas d'exerice
    if(typeof(this.props.data.liste_exercice_user) == undefined || typeof(this.props.data.liste_exercice_user) == 'undefined'){
      return;
    }

        // on loop sur les exo
       return this.props.data.liste_exercice_user.map((i) => {

          if(i.exercice.archive === true) {
            return;
          }

          //on loop sur les reponses 
          var BonneReponse = false;
          i.reponse.map((i) =>{
            console.log(i);
            if(i.success == true) {
              BonneReponse  = true;
            } 
          });

          // si une bonne reponse
          if(BonneReponse == true){
              return (
                      <div key={i.exercice.name} className={scss['un-cour-valider']} onClick={() => this.showExercice(i)} >
                          <div>
                          {i.exercice.name}
                          </div>
                         <div>
                          Exercice Valider le {this.parseDate(i.reponse[0].updatedAt)}
                         </div>
                      </div>
              );
          }

          //if()
          //if(this.datePassedExercice(i.exercice))
          // si la date n'est pas encore passée 
          return (

            <div key={i.exercice.name} className={scss['un-cour']} onClick={() => this.showExercice(i)} >
                <div>
                {i.exercice.name}
                </div>
               <div className={scss['date-tentatives']}>
                  <div>
                   {this.getDateLimit(i.exercice)}
                   </div>
                   <div>
                    nombre de tentatives :{this.getTentatives(i.reponse)}
                   </div>
               </div>


            </div>
            );
        });
   }

	 render() {
	 	return(
      <div>
	 		 <div className={scss['liste-exercice']}> 
        {this.getListeExercices()}
	 		 </div>
      </div>
	 	);
	 }
}

function mapStateToProps(state) {
  return {
    data: {
      FormDataUpdateClassNom:           state.classData.FormDataUpdateClassNom,  
      classeUser:                       state.classData.classeUser,
      liste_exercice_user:              state.exerciceData.liste_exercice_user,
    }
  };
}
export default 
  connect(mapStateToProps, {getExercicesEleve, setCurrentExoUser})(ListeCours);