import Backbone from 'backbone';
import LeadersModel from './leaders_model';

let LeadersCollection = Backbone.Collection.extend({
 
  url: 'https://api.parse.com/1/classes/LeaderBoard',

  model: LeadersModel,

  parse: function(data) {
    return data.results;
  }

});

export default LeadersCollection;