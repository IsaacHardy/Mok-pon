function LeadersTemplate(data) {
  return `
  	<ul class="ranks">
  	 	<li class="ranks-rank">${data.Rank}</li>
    	<li class="ranks-first">${data.FirstName}</li>
    	<li class="ranks-last">${data.LastName}</li>
    	<li class="ranks-score">${data.Score}</li>
  	</ul>
  `;
}

export default LeadersTemplate;