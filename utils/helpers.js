const handlebars = require('handlebars');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // Format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  formatDate: function(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleDateString('en-US', options);
  }
};

// Register the formatDate helper with Handlebars
handlebars.registerHelper('formatDate', module.exports.formatDate);