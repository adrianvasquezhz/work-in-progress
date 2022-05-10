const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
   content: {type: String},
   date: Date,
   important: Boolean,
   age: {
      type: Number,
      min: [18, 'Must be at least 18, not {VALUE}'],
      max: [25, 'Must be at most 25, not {VALUE}']
   }
});


// noteSchema.add({asd: String})  -  Add more key - values to the document.


// instace methods (documents)
noteSchema.method('show', function() {
   const msg = this.content + ' is ' + this.important;
   console.log(msg);
});

// static methods for models (collection - model)
noteSchema.static('findAll', function(content) {
   return this.find({content}).then(res => {
      return res.map(el => {
         const {__v, ...rest} = el._doc;
         return rest
      })
   })
});

noteSchema.virtual('isImportant')
   .get(function() {
     return `Este documento es important: ${this.important}`;
})
   .set(function(important){
     this.important = important
})

noteSchema.set('toJSON', {
   transform: function(doc, returnObj) {  // doc is a mongoose document, osea tiene los metodos save, validate, etc.
      const {__v, _id, ...rest} = returnObj;
      return {id: _id, ...rest}
   }
});

noteSchema.set('toObject', {
   transform: function(doc, returnObj) {
      const {__v, _id, ...rest} = returnObj;
      return {id: _id, ...rest}
   }
});


/* (COLLECTION) */
const Notes = mongoose.model('myNotes', noteSchema);

module.exports = Notes;