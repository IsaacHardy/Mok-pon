import Backbone from 'backbone';

let LeadersModel = Backbone.Model.extend({

  urlRoot: 'https://api.parse.com/1/classes/LeaderBoard',

  idAttribute: 'objectId'

});


export default LeadersModel;