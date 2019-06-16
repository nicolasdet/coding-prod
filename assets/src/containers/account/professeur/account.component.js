import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import {NavLink, withRouter, Redirect} from 'react-router-dom';
import classNames from 'classnames';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//import themeStyles from './login.theme.style';
import scss from './account.module.scss';

import styles from './account.style';

import LineChartWidget from '../../../components/line-chart-widget/line-chart-widget.component';
import ActiveUsersWidget from '../../../components/active-users-widget/active-users-widget.component';
import DailySalesWidget from '../../../components/daily-sales-widget/daily-sales-widget.component';
import TableWidget from '../../../components/table-widget/table-widget.component';
import RegionSalesWidget from '../../../components/region-sales-widget/region-sales-widget.component';
import { getUser, getUserByToken } from '../../../actions/auth.actions.js';
import { getClassStats } from '../../../actions/classes.actions.js';

import history from '../../../history';



class AccountProff extends React.Component {

  constructor(props) {
    super(props);
    this.props.getUserByToken();
    this.props.getClassStats();
    console.log(this.props);
  }
  voirMesClasses(){
        history.push('/professeur/classes');
  }
  
  voirMesEleves(){
        history.push('/apps/contacts');
  }
  

  render() {
    console.log(this.props);
    const { classes } = styles;
      return (
        
    <div className={styles.portalDashboardPageWrapper}>
      <section className="portal-pages__header">
      <div  className={scss['header']}>
      </div>
    </section>
    <Grid container spacing={0}>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Paper className="portal-pages__content-inner">
          <Grid
              container
              container
              direction="row"
              justify="space-between"
              alignItems="center">
            <h2>Mon Profile</h2>
            <Button color="primary" className={scss['button']}>
              Editer Mon profile >>
            </Button>
          </Grid>
          <p>Nom:            {this.props.data.user != null ?this.props.data.user.lastName[0].toUpperCase() + this.props.data.user.lastName.substring(1).toLowerCase(): ""}</p>
          <p>Prenom:         {this.props.data.user != null ?this.props.data.user.firstName[0].toUpperCase() + this.props.data.user.firstName.substring(1).toLowerCase(): ""}</p>
          <p>Email:          {this.props.data.user != null ?this.props.data.user.email: ""}</p>
          <p>Mot de passe:   ***</p>
            
          <Grid
              container
              container
              direction="row"
              justify="space-between"
              alignItems="center">
            <h2>Mes classes</h2>
            <Button color="primary" className={scss['button']} onClick={() => {this.voirMesClasses()}}>
              Voir mes classes >>
            </Button>
          </Grid>
          <p>Vous gerez actuelement <span className={scss['info']}> {this.props.data.stats != null ?this.props.data.stats.class_count: ""} </span> classes</p>
          <p>Votre classes la plus nombreuse est <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.biggest_class.name: ""}</span>. Elle contient <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.biggest_class.count: ""}</span> eleves.</p>
          <p>Votre classes la moins nombreuse est <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.smallest_class.name: ""}</span>. Elle contient <span className={scss['info']}> {this.props.data.stats != null ?this.props.data.stats.smallest_class.count: ""}</span> eleves.</p>
          <p>Votre classes la plus forte est <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.strongest_class.name: ""}</span> avec un score de <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.strongest_class.grade: ""}</span>.</p>
          <p>Votre classes la moins faible est <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.weakest_class.name: ""}</span> avec un score de <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.weakest_class.grade: ""}</span>.</p>

            <Grid
              container
              container
              direction="row"
              justify="space-between"
              alignItems="center">
            <h2>Mes eleves</h2>
            <Button color="primary" className={scss['button']}  onClick={() => {this.voirMesEleves()}}>
              Voir mes eleves >>
            </Button>
          </Grid>          
          <p>Vous gerez actuelement <span className={scss['info']}> {this.props.data.stats != null ?this.props.data.stats.student_count: ""} </span> eleves</p>
          <p>Votre eleve le plus faible est <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.weakest_student.name: ""}</span> avec un score de <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.weakest_student.grade: ""}</span>.</p>
          <p>Votre eleve le plus fort est <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.strongest_student.name: ""}</span> avec un score de <span className={scss['info']}>{this.props.data.stats != null ?this.props.data.stats.strongest_student.grade: ""}</span>.</p>
        </Paper>
      </Grid>
      <Grid item xs={1} />
    </Grid>
    </div>

      );
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {
    data: {
      user:  state.authData.user,
      stats: state.classData.stats,
    }
  };
}



/*
LoginForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,

};
*/
export default compose(
  withWidth(),
  connect(mapStateToProps, { getUserByToken, getClassStats}),
)(AccountProff);


