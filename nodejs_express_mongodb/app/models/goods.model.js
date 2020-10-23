module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          title: String,
          price: String,
          in_stock: Boolean,
          category: String,
          supplier: String,
          quantity: Number
        },
        { timestamps: true }
      
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Goods = mongoose.model("goods", schema);
  
    return Goods;
  };