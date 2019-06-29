import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import scss from './contact-details.module.scss';
import { connect } from 'react-redux';
import { elevesExerciceAction, elevesScoreAction } from '../../../../actions/exercice.actions';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

class ContactDetails extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        eleve: null,
        composantClicker: null,
      }
      this.props.elevesExerciceAction();
      this.props.elevesScoreAction();
    }

    

  render() {
      return (<Grid className={classNames(scss['portal-contact-details'] )}>
          <Grid 
          container
          direction="row"
          justify="space-between"

          className={classNames(scss['portal-contact-details-header'] )}>
          <div>
            <Typography variant="headline">{this.props.selectedContact.firstName.toUpperCase()} {this.props.selectedContact.lastName.toUpperCase()}</Typography>
            <Typography variant="subtitle1"><b>email : </b>{this.props.selectedContact.email}</Typography>
          </div>
          <div>
              <Grid 
              container
              direction="row"
              justify="flex-end"
              >
              <div>
                  <div>Exercices Reussi : {this.props.data.grade[1] || 0}</div>
                  <div>Exercices Realisé : {this.props.data.grade[2] || 0}</div>
              </div>
              <div className={classNames(scss['portal-contact-details-header-score'] )}>{this.props.data.grade[0] || 0} %</div>
          </Grid>
          </div>
          </Grid>

          <div>


             { this.props.data.exerciceTexte.map(element=>{ 
              //console.log(element);
              var { name, description, endDate, createdAt } = element.exercice;
              if (createdAt){
                createdAt = (new Date(createdAt.date)).toLocaleDateString();
              }
              if (endDate){
                endDate = (new Date(endDate.date)).toLocaleDateString();
              }
              return(
                
                <Paper className={classNames(scss['portal-contact-content-paper'])}>
                  <div><b>Nom : </b>{name}</div>
                  <div><b>Description: </b>{description}</div>
                  <div><b>fin: </b>{endDate}</div>
                  <div><b>creation: </b>{createdAt}</div>
                </Paper>
              );
            })}
          </div>

        </Grid>);
  };

};


function mapStateToProps(state) {
  return {
    data: {
      exerciceTexte: state.exerciceData.current_student_data,
      grade: state.exerciceData.grade
    }
  };
}

ContactDetails.defaultProps = {
  selectedContact: null
};

ContactDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedContact: PropTypes.shape({})
};

export default compose(withWidth(), withStyles( { withTheme: true }),
  connect(mapStateToProps, {elevesExerciceAction, elevesScoreAction}))(ContactDetails);